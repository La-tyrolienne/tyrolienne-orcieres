import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createTicketsBatch, getTicketsBySession, getAllTickets } from '@/lib/ticketStore';

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-01-27.acacia' as any,
    })
    : null;

// In-memory lock to prevent concurrent ticket creation for the same session
const processingSessions = new Map<string, Promise<any>>();

async function createTicketsForSession(stripeSessionId: string): Promise<any> {
    // Check if tickets already exist for this session
    const existingTickets = await getTicketsBySession(stripeSessionId);
    if (existingTickets.length > 0) {
        console.log(`Found ${existingTickets.length} existing tickets for session ${stripeSessionId}`);
        return { tickets: existingTickets };
    }

    if (!stripe) {
        return { error: 'Stripe not initialized' };
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(stripeSessionId);

    if (!session) {
        return { error: 'Session not found' };
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

    // Build all ticket data first, then create in a single batch write
    const ticketDataList = [];
    for (const item of items) {
        const qty = Number(item.qty) || 1;
        console.log(`Processing item: ${item.label}, qty=${qty}`);
        for (let i = 0; i < qty; i++) {
            ticketDataList.push({
                stripeSessionId,
                season: item.season || 'unknown',
                price: item.price || 0,
                quantity: 1,
                customerEmail: session.customer_details?.email || '',
                customerName: session.customer_details?.name || 'Client',
            });
        }
    }

    console.log(`Total tickets to create: ${ticketDataList.length}`);
    const tickets = await createTicketsBatch(ticketDataList);
    console.log(`Tickets created: ${tickets.length}, IDs: ${tickets.map(t => t.id).join(', ')}`);

    return { tickets };
}

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

        // Use lock to prevent concurrent creation for the same session
        let processingPromise = processingSessions.get(stripeSessionId);
        if (processingPromise) {
            console.log(`Session ${stripeSessionId} already being processed, waiting...`);
            const result = await processingPromise;
            return NextResponse.json(result);
        }

        // Create and store the promise
        processingPromise = createTicketsForSession(stripeSessionId);
        processingSessions.set(stripeSessionId, processingPromise);

        try {
            const result = await processingPromise;
            return NextResponse.json(result);
        } finally {
            // Clean up the lock after a delay to handle rapid retries
            setTimeout(() => processingSessions.delete(stripeSessionId), 5000);
        }
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
