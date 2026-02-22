'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Ticket, Calendar, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

interface TicketData {
    id: string;
    season: string;
    price: number;
    customerEmail: string;
    customerName: string;
    createdAt: string;
    validUntil: string;
    status: string;
}

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const { clearCart } = useCart();
    const [tickets, setTickets] = useState<TicketData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Clear cart on success
        clearCart();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!sessionId) {
            setLoading(false);
            return;
        }

        const fetchTickets = async () => {
            try {
                const response = await fetch('/api/tickets', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ stripeSessionId: sessionId }),
                });

                const data = await response.json();

                if (data.tickets && data.tickets.length > 0) {
                    setTickets(data.tickets);
                } else if (data.error) {
                    setError(data.error);
                }
            } catch (e) {
                console.error('Error fetching tickets:', e);
                setError('Erreur lors de la récupération des billets');
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, [sessionId]);

    const handleDownloadPDF = async (ticket: TicketData) => {
        try {
            const { jsPDF } = await import('jspdf');
            const QRCode = (await import('qrcode')).default;

            const doc = new jsPDF();

            // Header
            doc.setFillColor(0, 174, 239); // Primary color
            doc.rect(0, 0, 210, 50, 'F');

            doc.setTextColor(255, 255, 255);
            doc.setFontSize(28);
            doc.text("TYROLIENNE", 105, 25, { align: 'center' });
            doc.setFontSize(12);
            doc.text("Roll'Air Câble - Orcières Merlette", 105, 35, { align: 'center' });

            // Ticket info
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(18);
            doc.text(`Billet ${ticket.season === 'winter' ? 'Hiver' : 'Été'}`, 105, 70, { align: 'center' });

            doc.setFontSize(12);
            doc.setTextColor(100, 100, 100);
            doc.text(`Référence: ${ticket.id}`, 20, 90);
            doc.text(`Client: ${ticket.customerName}`, 20, 100);
            doc.text(`Email: ${ticket.customerEmail}`, 20, 110);
            doc.text(`Prix: ${ticket.price}€`, 20, 120);
            doc.text(`Date d'achat: ${new Date(ticket.createdAt).toLocaleDateString('fr-FR')}`, 20, 130);
            doc.text(`Valable jusqu'au: ${new Date(ticket.validUntil).toLocaleDateString('fr-FR')}`, 20, 140);

            // QR Code
            const qrDataUrl = await QRCode.toDataURL(ticket.id, { width: 200, margin: 1 });
            doc.addImage(qrDataUrl, 'PNG', 65, 155, 80, 80);

            doc.setFontSize(10);
            doc.setTextColor(150, 150, 150);
            doc.text("Présentez ce QR code à l'entrée de la tyrolienne", 105, 245, { align: 'center' });
            doc.text("1870m de vol • 130km/h • Orcières Merlette 1850", 105, 253, { align: 'center' });
            doc.text("Contact: 06 84 44 88 10", 105, 261, { align: 'center' });

            doc.save(`billet-tyrolienne-${ticket.id}.pdf`);
        } catch (e) {
            console.error('Error generating PDF:', e);
            alert('Erreur lors de la génération du PDF');
        }
    };

    const handleDownloadAllPDF = async () => {
        if (tickets.length === 0) return;
        try {
            const { jsPDF } = await import('jspdf');
            const QRCode = (await import('qrcode')).default;

            const doc = new jsPDF();

            for (let i = 0; i < tickets.length; i++) {
                const ticket = tickets[i];
                if (i > 0) doc.addPage();

                // Header
                doc.setFillColor(0, 174, 239);
                doc.rect(0, 0, 210, 50, 'F');

                doc.setTextColor(255, 255, 255);
                doc.setFontSize(28);
                doc.text("TYROLIENNE", 105, 25, { align: 'center' });
                doc.setFontSize(12);
                doc.text("Roll'Air Câble - Orcières Merlette", 105, 35, { align: 'center' });

                // Ticket info
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(18);
                doc.text(`Billet ${ticket.season === 'winter' ? 'Hiver' : 'Été'}`, 105, 70, { align: 'center' });

                doc.setFontSize(12);
                doc.setTextColor(100, 100, 100);
                doc.text(`Référence: ${ticket.id}`, 20, 90);
                doc.text(`Client: ${ticket.customerName}`, 20, 100);
                doc.text(`Email: ${ticket.customerEmail}`, 20, 110);
                doc.text(`Prix: ${ticket.price}€`, 20, 120);
                doc.text(`Date d'achat: ${new Date(ticket.createdAt).toLocaleDateString('fr-FR')}`, 20, 130);
                doc.text(`Valable jusqu'au: ${new Date(ticket.validUntil).toLocaleDateString('fr-FR')}`, 20, 140);

                // QR Code
                const qrDataUrl = await QRCode.toDataURL(ticket.id, { width: 200, margin: 1 });
                doc.addImage(qrDataUrl, 'PNG', 65, 155, 80, 80);

                doc.setFontSize(10);
                doc.setTextColor(150, 150, 150);
                doc.text("Présentez ce QR code à l'entrée de la tyrolienne", 105, 245, { align: 'center' });
                doc.text("1870m de vol • 130km/h • Orcières Merlette 1850", 105, 253, { align: 'center' });
                doc.text("Contact: 06 84 44 88 10", 105, 261, { align: 'center' });
            }

            doc.save(`billets-tyrolienne-${tickets.length}x.pdf`);
        } catch (e) {
            console.error('Error generating PDF:', e);
            alert('Erreur lors de la génération du PDF');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center pt-24">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary mb-4" />
                    <p className="text-muted-foreground">Chargement de vos billets...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-16 px-4">
            <div className="container mx-auto max-w-2xl">
                {/* Success Header */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="font-[family-name:var(--font-bebas)] text-4xl md:text-6xl mb-3">
                        Paiement confirmé !
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Merci pour votre achat. {tickets.length > 0 ? 'Vos billets sont prêts.' : ''}
                    </p>
                </motion.div>

                {error && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-700 rounded-xl p-4 mb-8 text-sm">
                        <p className="font-bold mb-1">⚠️ Note</p>
                        <p>{error}</p>
                        <p className="mt-2 text-xs">Vos billets seront envoyés par email. Si vous ne les recevez pas, contactez-nous au 06 84 44 88 10.</p>
                    </div>
                )}

                {/* Download All Button */}
                {tickets.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-6"
                    >
                        <Button
                            onClick={handleDownloadAllPDF}
                            className="w-full py-6 bg-green-600 hover:bg-green-700 rounded-xl font-bold uppercase tracking-wider text-lg"
                        >
                            <Download className="w-5 h-5 mr-2" />
                            {tickets.length === 1
                                ? 'Télécharger le billet PDF'
                                : `Télécharger tous les billets (${tickets.length}) en 1 PDF`
                            }
                        </Button>
                    </motion.div>
                )}

                {/* Tickets */}
                <div className="space-y-6">
                    {tickets.map((ticket, index) => (
                        <motion.div
                            key={ticket.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                        >
                            <Card className="overflow-hidden border-primary/20">
                                <div className="bg-primary p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-white">
                                        <Ticket className="w-5 h-5" />
                                        <span className="font-bold uppercase tracking-wider text-sm">Billet {ticket.season === 'winter' ? 'Hiver' : 'Été'}</span>
                                    </div>
                                    <span className="text-white/80 text-xs font-mono">{ticket.id}</span>
                                </div>
                                <CardContent className="p-6 space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Client</p>
                                            <p className="font-bold">{ticket.customerName}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Prix</p>
                                            <p className="font-bold text-lg">{ticket.price}€</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
                                            <div>
                                                <p className="text-muted-foreground text-xs">Acheté le</p>
                                                <p className="font-medium text-sm">{new Date(ticket.createdAt).toLocaleDateString('fr-FR')}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
                                            <div>
                                                <p className="text-muted-foreground text-xs">Valable jusqu&apos;au</p>
                                                <p className="font-medium text-sm">{new Date(ticket.validUntil).toLocaleDateString('fr-FR')}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() => handleDownloadPDF(ticket)}
                                        className="w-full py-5 bg-primary hover:bg-primary/90 rounded-xl font-bold uppercase tracking-wider"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Télécharger le billet PDF
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Next Steps */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 bg-muted/30 rounded-2xl p-6 md:p-8"
                >
                    <h2 className="font-bold text-lg mb-4">📋 Et maintenant ?</h2>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-start gap-3">
                            <span className="font-bold text-primary">1.</span>
                            <span>Téléchargez votre(vos) billet(s) PDF ci-dessus</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="font-bold text-primary">2.</span>
                            <span>Présentez-vous directement sur place avec votre billet</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="font-bold text-primary">3.</span>
                            <span>Appelez le <a href="tel:+33684448810" className="text-primary font-medium hover:underline">06 84 44 88 10</a> pour vérifier l&apos;ouverture</span>
                        </li>
                    </ul>
                </motion.div>

                <div className="text-center mt-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
                        Retour à l&apos;accueil <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
