import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-01-27.acacia' as any,
    })
    : null;

interface CheckoutItem {
    season: string;
    label: string;
    price: number;
    quantity: number;
    isGift?: boolean;
}

export async function POST(request: NextRequest) {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            console.error('Missing STRIPE_SECRET_KEY');
            return NextResponse.json({ error: 'Config: Clé secrète manquante' }, { status: 500 });
        }
        if (!stripe) {
            console.error('Stripe failed to initialize');
            return NextResponse.json({ error: 'Stripe: Erreur d\'initialisation' }, { status: 500 });
        }

        const { items }: { items: CheckoutItem[] } = await request.json();

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'Panier vide' }, { status: 400 });
        }

        // Create Stripe line items
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(item => ({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: `Billet Tyrolienne - ${item.label}`,
                    description: `Vol en tyrolienne géante - 1870m à 130km/h - Orcières Merlette`,
                },
                unit_amount: item.price * 100, // Stripe uses cents
            },
            quantity: item.quantity,
        }));

        const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const successUrl = `${origin}/billetterie/success?session_id={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `${origin}/panier`;

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
            locale: 'fr',
            metadata: {
                type: 'billet_tyrolienne',
                items: JSON.stringify(items.map(i => ({
                    season: i.season,
                    label: i.label,
                    qty: i.quantity,
                    price: i.price,
                    isGift: !!i.isGift
                }))),
            },
            custom_text: {
                submit: {
                    message: 'Votre billet hiver est valable 2 saisons d\'hiver et votre billet été est valable 2 saisons d\'été. Présentez-vous directement sur place.',
                },
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('Stripe checkout error:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la création du paiement' },
            { status: 500 }
        );
    }
}
