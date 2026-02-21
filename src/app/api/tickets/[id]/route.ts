import { NextRequest, NextResponse } from 'next/server';
import { getTicket } from '@/lib/ticketStore';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const ticket = await getTicket(id);

        if (!ticket) {
            return NextResponse.json(
                { error: 'Ticket not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ ticket });
    } catch (error) {
        console.error('Error getting ticket:', error);
        return NextResponse.json(
            { error: 'Failed to get ticket' },
            { status: 500 }
        );
    }
}
