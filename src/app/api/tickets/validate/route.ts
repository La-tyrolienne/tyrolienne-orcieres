import { NextRequest, NextResponse } from 'next/server';
import { validateTicket, getTicket } from '@/lib/ticketStore';

// POST - Validate a ticket (mark as used)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { ticketId } = body;

        if (!ticketId) {
            return NextResponse.json(
                { error: 'Ticket ID is required' },
                { status: 400 }
            );
        }

        const result = await validateTicket(ticketId);
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error validating ticket:', error);
        return NextResponse.json(
            { error: 'Failed to validate ticket' },
            { status: 500 }
        );
    }
}

// GET - Check ticket status without validating
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const ticketId = searchParams.get('ticketId');

        if (!ticketId) {
            return NextResponse.json(
                { error: 'Ticket ID is required' },
                { status: 400 }
            );
        }

        const ticket = await getTicket(ticketId);

        if (!ticket) {
            return NextResponse.json({
                valid: false,
                message: 'Billet introuvable'
            });
        }

        const isExpired = new Date(ticket.validUntil) < new Date();

        return NextResponse.json({
            valid: ticket.status === 'active' && !isExpired,
            message: ticket.status === 'used'
                ? `Billet déjà utilisé le ${new Date(ticket.usedAt!).toLocaleDateString('fr-FR')}`
                : isExpired
                    ? 'Billet expiré'
                    : 'Billet valide',
            ticket
        });
    } catch (error) {
        console.error('Error checking ticket:', error);
        return NextResponse.json(
            { error: 'Failed to check ticket' },
            { status: 500 }
        );
    }
}
