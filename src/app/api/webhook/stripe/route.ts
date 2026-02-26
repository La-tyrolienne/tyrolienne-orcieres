import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createTicket } from '@/lib/ticketStore';

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-01-27.acacia' as any,
    })
    : null;

export async function POST(request: NextRequest) {
    if (!stripe) {
        return NextResponse.json({ error: 'Stripe non configuré' }, { status: 500 });
    }
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
        return NextResponse.json({ error: 'Webhook secret non configuré' }, { status: 500 });
    }
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object as Stripe.Checkout.Session;
            const metadata = session.metadata;

            console.log('=== NOUVELLE VENTE TYROLIENNE ===');
            console.log('Email:', session.customer_details?.email);
            console.log('Montant:', session.amount_total! / 100, '€');
            console.log('Items:', metadata?.items);
            console.log('================================');

            // Create tickets for each item
            if (metadata?.items) {
                try {
                    const items = JSON.parse(metadata.items);
                    for (const item of items) {
                        for (let i = 0; i < item.qty; i++) {
                            await createTicket({
                                stripeSessionId: session.id,
                                season: item.season || 'unknown',
                                price: item.price || 0,
                                quantity: 1,
                                customerEmail: session.customer_details?.email || '',
                                customerName: session.customer_details?.name || 'Client',
                                isGift: !!item.isGift,
                            });
                        }
                    }
                } catch (e) {
                    console.error('Error creating tickets from webhook:', e);
                }
            }

            break;
        }

        case 'checkout.session.expired': {
            const session = event.data.object as Stripe.Checkout.Session;
            console.log('Session expirée pour:', session.customer_details?.email);
            break;
        }

        default:
            console.log(`Événement non géré: ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
