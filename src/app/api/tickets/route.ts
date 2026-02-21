import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createTicket, getTicketBySession, getAllTickets } from '@/lib/ticketStore';

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-01-27.acacia' as any,
    })
    : null;

// POST - Create ticket(s) from a Stripe session
export async function POST(request: NextRequest) {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            console.error('Missing STRIPE_SECRET_KEY');
            return NextResponse.json({ error: 'Config: Clé secrète manquante' }, { status: 500 });
        }
        if (!stripe) {
            return NextResponse.json({ error: 'Stripe: Erreur d\'initialisation' }, { status: 500 });
        }

        const body = await request.json();
        const { stripeSessionId } = body;

        if (!stripeSessionId) {
            return NextResponse.json({ error: 'Missing stripeSessionId' }, { status: 400 });
        }

        // Check if ticket already exists for this session
        const existingTicket = await getTicketBySession(stripeSessionId);
        if (existingTicket) {
            return NextResponse.json({ ticket: existingTicket });
        }

        // Retrieve the session from Stripe
        const session = await stripe.checkout.sessions.retrieve(stripeSessionId);

        if (!session) {
            return NextResponse.json({ error: 'Session not found' }, { status: 404 });
        }

        const metadata = session.metadata;
        let items: { season: string; label: string; qty: number; price: number }[] = [];

        if (metadata?.items) {
            try {
                items = JSON.parse(metadata.items);
            } catch (e) {
                console.error('Error parsing items metadata:', e);
            }
        }

        // Create a ticket for each item
        const tickets = [];
        for (const item of items) {
            for (let i = 0; i < item.qty; i++) {
                const ticket = await createTicket({
                    stripeSessionId,
                    season: item.season || 'unknown',
                    price: item.price || 0,
                    quantity: 1,
                    customerEmail: session.customer_details?.email || '',
                    customerName: session.customer_details?.name || 'Client',
                });
                tickets.push(ticket);
            }
        }

        // Return first ticket if only one, otherwise return array
        if (tickets.length === 1) {
            return NextResponse.json({ ticket: tickets[0] });
        }
        return NextResponse.json({ tickets });
    } catch (error: any) {
        console.error('Error creating ticket:', error);
        return NextResponse.json(
            { error: `Failed to create ticket: ${error.message}` },
            { status: 500 }
        );
    }
}

// GET - Get all tickets (for admin)
export async function GET() {
    try {
        const tickets = await getAllTickets();
        return NextResponse.json({ tickets });
    } catch (error) {
        console.error('Error getting tickets:', error);
        return NextResponse.json(
            { error: 'Failed to get tickets' },
            { status: 500 }
        );
    }
}
