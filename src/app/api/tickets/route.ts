import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createTicketsBatch, getTicketsBySession, getAllTickets } from '@/lib/ticketStore';

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

        // Retrieve the session from Stripe to know expected ticket count
        const session = await stripe.checkout.sessions.retrieve(stripeSessionId);

        if (!session) {
            return NextResponse.json({ error: 'Session not found' }, { status: 404 });
        }

        const metadata = session.metadata;
        let items: { season: string; label: string; qty: number; price: number }[] = [];

        if (metadata?.items) {
            try {
                items = JSON.parse(metadata.items);
                console.log('Parsed items from Stripe metadata:', JSON.stringify(items));
            } catch (e) {
                console.error('Error parsing items metadata:', e);
            }
        } else {
            console.error('No items metadata found in session:', stripeSessionId);
        }

        // Calculate expected total tickets from Stripe metadata
        let expectedTotal = 0;
        for (const item of items) {
            expectedTotal += Number(item.qty) || 1;
        }
        console.log(`Expected total tickets: ${expectedTotal}`);

        // Check existing tickets for this session
        const existingTickets = await getTicketsBySession(stripeSessionId);
        console.log(`Existing tickets for session: ${existingTickets.length}`);

        // If we already have the right number, return them
        if (existingTickets.length >= expectedTotal) {
            console.log('All tickets already exist, returning them');
            return NextResponse.json({ tickets: existingTickets });
        }

        // Calculate how many tickets are missing
        const missingCount = expectedTotal - existingTickets.length;
        console.log(`Missing ${missingCount} tickets, creating them...`);

        // Build ticket data only for missing tickets
        const ticketDataList = [];
        let remaining = missingCount;
        for (const item of items) {
            const qty = Number(item.qty) || 1;
            // Figure out how many of this item type already exist
            const existingOfType = existingTickets.filter(t => t.season === item.season && t.price === item.price).length;
            const toCreate = Math.min(qty - existingOfType, remaining);

            for (let i = 0; i < toCreate && remaining > 0; i++) {
                ticketDataList.push({
                    stripeSessionId,
                    season: item.season || 'unknown',
                    price: item.price || 0,
                    quantity: 1,
                    customerEmail: session.customer_details?.email || '',
                    customerName: session.customer_details?.name || 'Client',
                });
                remaining--;
            }
        }

        if (ticketDataList.length > 0) {
            console.log(`Creating ${ticketDataList.length} new tickets`);
            const newTickets = await createTicketsBatch(ticketDataList);
            const allTickets = [...existingTickets, ...newTickets];
            console.log(`Total tickets now: ${allTickets.length}, IDs: ${allTickets.map(t => t.id).join(', ')}`);
            return NextResponse.json({ tickets: allTickets });
        }

        return NextResponse.json({ tickets: existingTickets });
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
