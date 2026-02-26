import crypto from 'crypto';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'owner/tyrolienne-orcieres';
const TICKETS_PATH = 'src/data/tickets.json';

export interface Ticket {
    id: string;
    stripeSessionId: string;
    season: string;
    price: number;
    quantity: number;
    customerEmail: string;
    customerName: string;
    createdAt: string;
    validUntil: string;
    status: 'active' | 'used' | 'expired';
    usedAt?: string;
    isGift?: boolean;
}

async function readTickets(): Promise<Ticket[]> {
    if (!GITHUB_TOKEN) {
        console.warn('GITHUB_TOKEN not configured, ticket persistence will fail');
        return [];
    }

    try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${TICKETS_PATH}`, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Cache-Control': 'no-cache'
            },
        });

        if (!response.ok) return [];

        const data = await response.json();
        const content = Buffer.from(data.content, 'base64').toString('utf-8');
        return JSON.parse(content);
    } catch (error) {
        console.error('Error reading tickets from GitHub:', error);
        return [];
    }
}

async function writeTickets(tickets: Ticket[]): Promise<void> {
    if (!GITHUB_TOKEN) {
        console.error('writeTickets: GITHUB_TOKEN not set');
        return;
    }

    try {
        // 1. Get current file SHA (if file exists)
        const getFileResponse = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${TICKETS_PATH}`, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Cache-Control': 'no-cache'
            },
        });

        const content = JSON.stringify(tickets, null, 2);
        const base64Content = Buffer.from(content).toString('base64');

        const body: Record<string, any> = {
            message: 'admin: update tickets database',
            content: base64Content,
            branch: 'main'
        };

        if (getFileResponse.ok) {
            const fileData = await getFileResponse.json();
            body.sha = fileData.sha;
        }
        // If file doesn't exist (404), we don't include sha — GitHub will create the file

        // 2. Create or update file
        const putResponse = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${TICKETS_PATH}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!putResponse.ok) {
            const errorData = await putResponse.json();
            console.error('writeTickets: GitHub API error:', putResponse.status, errorData);
        } else {
            console.log(`writeTickets: Successfully saved ${tickets.length} tickets to GitHub`);
        }
    } catch (error) {
        console.error('writeTickets: Error writing tickets to GitHub:', error);
    }
}

export function generateTicketId(): string {
    return `TKT-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

export async function createTicket(data: Omit<Ticket, 'id' | 'createdAt' | 'validUntil' | 'status'>): Promise<Ticket> {
    const tickets = await readTickets();

    const now = new Date();
    const validUntil = new Date(now);
    validUntil.setFullYear(validUntil.getFullYear() + 1);

    const ticket: Ticket = {
        id: generateTicketId(),
        ...data,
        createdAt: now.toISOString(),
        validUntil: validUntil.toISOString(),
        status: 'active'
    };

    try {
        tickets.push(ticket);
        await writeTickets(tickets);
    } catch (error) {
        console.warn('Failed to persist ticket, but continuing to return it for user download', error);
    }

    return ticket;
}

export async function createTicketsBatch(
    ticketDataList: Omit<Ticket, 'id' | 'createdAt' | 'validUntil' | 'status'>[]
): Promise<Ticket[]> {
    const existingTickets = await readTickets();

    const now = new Date();
    const validUntil = new Date(now);
    validUntil.setFullYear(validUntil.getFullYear() + 1);

    const newTickets: Ticket[] = ticketDataList.map(data => ({
        id: generateTicketId(),
        ...data,
        createdAt: now.toISOString(),
        validUntil: validUntil.toISOString(),
        status: 'active' as const
    }));

    try {
        const allTickets = [...existingTickets, ...newTickets];
        await writeTickets(allTickets);
        console.log(`createTicketsBatch: Created ${newTickets.length} tickets in one write`);
    } catch (error) {
        console.warn('Failed to persist tickets batch, but returning them for user download', error);
    }

    return newTickets;
}

export async function getTicket(id: string): Promise<Ticket | null> {
    const tickets = await readTickets();
    return tickets.find(t => t.id === id) || null;
}

export async function getTicketsBySession(sessionId: string): Promise<Ticket[]> {
    const tickets = await readTickets();
    return tickets.filter(t => t.stripeSessionId === sessionId);
}

export async function validateTicket(id: string): Promise<{ success: boolean; message: string; ticket?: Ticket }> {
    const tickets = await readTickets();
    const ticketIndex = tickets.findIndex(t => t.id === id);

    if (ticketIndex === -1) {
        return { success: false, message: 'Billet introuvable' };
    }

    const ticket = tickets[ticketIndex];

    if (ticket.status === 'used') {
        return {
            success: false,
            message: `Billet déjà utilisé le ${new Date(ticket.usedAt!).toLocaleString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`,
            ticket
        };
    }

    if (ticket.status === 'expired' || new Date(ticket.validUntil) < new Date()) {
        return { success: false, message: 'Billet expiré', ticket };
    }

    // Mark as used
    tickets[ticketIndex] = {
        ...ticket,
        status: 'used',
        usedAt: new Date().toISOString()
    };

    await writeTickets(tickets);

    return {
        success: true,
        message: 'Billet validé avec succès !',
        ticket: tickets[ticketIndex]
    };
}

export async function getAllTickets(): Promise<Ticket[]> {
    return readTickets();
}
