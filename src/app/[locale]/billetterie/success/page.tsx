'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Ticket, Calendar, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { giftBgBase64 } from '@/lib/giftBgBase64';

interface TicketData {
    id: string;
    season: string;
    price: number;
    customerEmail: string;
    customerName: string;
    createdAt: string;
    validUntil: string;
    status: string;
    isGift?: boolean;
}

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const { clearCart } = useCart();
    const [tickets, setTickets] = useState<TicketData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const fetchedRef = useRef(false);

    useEffect(() => {
        // Clear cart on success
        clearCart();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!sessionId) {
            setLoading(false);
            return;
        }

        // Prevent double calls from React Strict Mode
        if (fetchedRef.current) return;
        fetchedRef.current = true;

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

            const doc = new jsPDF({
                orientation: ticket.isGift ? 'landscape' : 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            // Header
            if (ticket.isGift) {
                const pageWidth = doc.internal.pageSize.getWidth();
                const pageHeight = doc.internal.pageSize.getHeight();

                doc.setFillColor(255, 252, 247);
                doc.rect(0, 0, pageWidth, pageHeight, 'F');

                for (let i = 0; i < 50; i++) {
                    const alpha = 1 - (i / 50);
                    doc.setFillColor(
                        Math.round(255 - alpha * 10),
                        Math.round(252 - alpha * 30),
                        Math.round(247 - alpha * 60)
                    );
                    doc.rect(0, i, pageWidth, 1.2, 'F');
                }

                doc.setDrawColor(212, 160, 60);
                doc.setLineWidth(2.5);
                doc.roundedRect(6, 6, pageWidth - 12, pageHeight - 12, 4, 4);
                doc.setDrawColor(230, 190, 100);
                doc.setLineWidth(0.8);
                doc.roundedRect(10, 10, pageWidth - 20, pageHeight - 20, 3, 3);

                const drawStar = (cx: number, cy: number, size: number) => {
                    doc.setFillColor(212, 160, 60);
                    doc.triangle(cx, cy - size, cx + size * 0.35, cy, cx, cy + size, 'F');
                    doc.triangle(cx, cy - size, cx - size * 0.35, cy, cx, cy + size, 'F');
                    doc.triangle(cx - size, cy, cx, cy - size * 0.35, cx + size, cy, 'F');
                    doc.triangle(cx - size, cy, cx, cy + size * 0.35, cx + size, cy, 'F');
                };
                drawStar(20, 20, 4);
                drawStar(pageWidth - 20, 20, 4);
                drawStar(20, pageHeight - 20, 4);
                drawStar(pageWidth - 20, pageHeight - 20, 4);

                doc.setFillColor(230, 190, 100);
                [
                    { x: 28, y: 16 }, { x: 16, y: 28 },
                    { x: pageWidth - 28, y: 16 }, { x: pageWidth - 16, y: 28 },
                    { x: 28, y: pageHeight - 16 }, { x: 16, y: pageHeight - 28 },
                    { x: pageWidth - 28, y: pageHeight - 16 }, { x: pageWidth - 16, y: pageHeight - 28 },
                ].forEach(d => doc.circle(d.x, d.y, 1, 'F'));

                const imgW = 85;
                const imgH = 127;
                const imgX = 14;
                const imgY = (pageHeight - imgH) / 2;

                try {
                    doc.addImage(giftBgBase64, 'PNG', imgX, imgY, imgW, imgH);
                    doc.setFillColor(212, 160, 60);
                    doc.rect(imgX, imgY + imgH - 3, imgW, 3, 'F');
                    doc.rect(imgX, imgY, imgW, 3, 'F');
                } catch (e) {
                    console.warn(e);
                }

                doc.setDrawColor(212, 160, 60);
                doc.setLineWidth(1.5);
                doc.rect(imgX, imgY, imgW, imgH);

                const contentX = imgX + imgW + 10;
                const contentW = pageWidth - contentX - 14;
                const centerX = contentX + contentW / 2;

                doc.setFillColor(45, 45, 55);
                doc.roundedRect(contentX, 15, contentW, 20, 3, 3, 'F');
                doc.setDrawColor(212, 160, 60);
                doc.setLineWidth(1);
                doc.line(contentX, 15, contentX + contentW, 15);

                doc.setTextColor(255, 255, 255);
                doc.setFontSize(13);
                doc.setFont('helvetica', 'bold');
                doc.text('TYROLIENNE D\'ORCIÈRES', centerX, 24, { align: 'center' });
                doc.setFontSize(7);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(200, 200, 210);
                doc.text('Roll\'Air Câble - Orcières Merlette 1850', centerX, 31, { align: 'center' });

                const titleY = 48;
                doc.setDrawColor(212, 160, 60);
                doc.setLineWidth(0.8);
                const halfLine = 30;
                doc.line(centerX - halfLine - 8, titleY - 10, centerX - 8, titleY - 10);
                doc.line(centerX + 8, titleY - 10, centerX + halfLine + 8, titleY - 10);
                drawStar(centerX, titleY - 10, 2);

                doc.setTextColor(212, 160, 60);
                doc.setFontSize(32);
                doc.setFont('helvetica', 'bold');
                doc.text("BON CADEAU", centerX, titleY, { align: 'center' });

                doc.line(centerX - halfLine - 8, titleY + 4, centerX - 8, titleY + 4);
                doc.line(centerX + 8, titleY + 4, centerX + halfLine + 8, titleY + 4);
                drawStar(centerX, titleY + 4, 2);

                doc.setTextColor(120, 110, 90);
                doc.setFontSize(10);
                doc.setFont('helvetica', 'italic');
                doc.text(`Saison : ${ticket.season === 'winter' ? 'Hiver' : 'Été'}`, centerX, titleY + 13, { align: 'center' });

                const formulaY = titleY + 23;
                doc.setFillColor(45, 45, 55);
                doc.roundedRect(centerX - 55, formulaY - 6, 110, 15, 3, 3, 'F');
                doc.setDrawColor(212, 160, 60);
                doc.setLineWidth(0.5);
                doc.roundedRect(centerX - 55, formulaY - 6, 110, 15, 3, 3);

                doc.setTextColor(255, 255, 255);
                doc.setFontSize(16);
                doc.setFont('helvetica', 'bold');
                doc.text(`Descente en Tyrolienne Géante`, centerX, formulaY + 4, { align: 'center' });

                let yPos = formulaY + 16;
                doc.setTextColor(140, 130, 110);
                doc.setFontSize(8);
                doc.setFont('helvetica', 'normal');
                doc.text(`1,8km à 130km/h`, centerX, yPos, { align: 'center' });
                yPos += 7;

                const fieldX = contentX + 5;
                const fieldEndX = contentX + contentW - 5;

                doc.setTextColor(80, 75, 65);
                doc.setFontSize(9);
                doc.setFont('helvetica', 'bold');

                doc.text("De la part de :", fieldX, yPos);
                doc.setDrawColor(200, 190, 170);
                doc.setLineWidth(0.3);
                doc.line(fieldX + 22, yPos, fieldEndX, yPos);

                doc.text("Pour :", fieldX, yPos + 12);
                doc.line(fieldX + 9, yPos + 12, fieldEndX, yPos + 12);

                doc.text("Message :", fieldX, yPos + 24);
                doc.line(fieldX + 16, yPos + 24, fieldEndX, yPos + 24);
                doc.line(fieldX + 2, yPos + 31, fieldEndX, yPos + 31);

                const qrDataUrl = await QRCode.toDataURL(ticket.id, {
                    width: 300,
                    margin: 2,
                    color: { dark: '#2D2D37', light: '#ffffff' }
                });
                const qrSize = 22;
                const qrX = centerX - qrSize / 2;
                const qrY = yPos + 35;

                doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);

                doc.setTextColor(160, 150, 130);
                doc.setFontSize(7);
                doc.text('www.tyrolienne-orcieres.com', centerX, qrY + qrSize + 4, { align: 'center' });

                if (ticket.validUntil) {
                    doc.setTextColor(100, 95, 80);
                    doc.setFontSize(8);
                    doc.text(`Valable jusqu'au : ${new Date(ticket.validUntil).toLocaleDateString('fr-FR')}`, centerX, qrY + qrSize + 10, { align: 'center' });
                }

                doc.setTextColor(160, 150, 130);
                doc.setFontSize(7);
                doc.text(`Ref : ${ticket.id}`, centerX, qrY + qrSize + 15, { align: 'center' });

                const bottomY = pageHeight - 32;
                doc.setFillColor(45, 45, 55);
                doc.roundedRect(contentX, bottomY - 4, contentW, 16, 3, 3, 'F');
                doc.setDrawColor(212, 160, 60);
                doc.setLineWidth(0.5);
                doc.line(contentX, bottomY - 4, contentX + contentW, bottomY - 4);

                doc.setTextColor(212, 160, 60);
                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.text("Infos Pratiques", centerX, bottomY + 3, { align: 'center' });

                doc.setTextColor(200, 200, 210);
                doc.setFontSize(7);
                doc.setFont('helvetica', 'normal');
                doc.text("Appelez-nous pour vérifier l'ouverture et présentez ce QR code à l'entrée.", centerX, bottomY + 9, { align: 'center' });

                doc.setTextColor(160, 150, 130);
                doc.setFontSize(6);
                doc.text('06 84 44 88 10  |  www.tyrolienne-orcieres.com', centerX, pageHeight - 12, { align: 'center' });

            } else {
                doc.setFillColor(0, 174, 239); // Primary color
                doc.rect(0, 0, 210, 50, 'F');

                doc.setTextColor(255, 255, 255);
                doc.setFontSize(28);
                doc.text("TYROLIENNE", 105, 25, { align: 'center' });
                doc.setFontSize(12);
                doc.text("Roll'Air Câble - Orcières Merlette", 105, 35, { align: 'center' });

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

                const qrDataUrl = await QRCode.toDataURL(ticket.id, { width: 200, margin: 1 });
                doc.addImage(qrDataUrl, 'PNG', 65, 155, 80, 80);

                doc.setFontSize(10);
                doc.setTextColor(150, 150, 150);
                doc.text("Présentez ce QR code à l'entrée de la tyrolienne", 105, 245, { align: 'center' });
                doc.text("1870m de vol • 130km/h • Orcières Merlette 1850", 105, 253, { align: 'center' });
                doc.text("Contact: 06 84 44 88 10", 105, 261, { align: 'center' });
            }

            const fileNamePrefix = ticket.isGift ? 'bon-cadeau' : 'billet';
            doc.save(`${fileNamePrefix}-tyrolienne-${ticket.id}.pdf`);
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

            const firstIsGift = tickets[0]?.isGift;
            const doc = new jsPDF({
                orientation: firstIsGift ? 'landscape' : 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            for (let i = 0; i < tickets.length; i++) {
                const ticket = tickets[i];
                if (i > 0) doc.addPage('a4', ticket.isGift ? 'landscape' : 'portrait');

                // Header
                if (ticket.isGift) {
                    const pageWidth = doc.internal.pageSize.getWidth();
                    const pageHeight = doc.internal.pageSize.getHeight();

                    doc.setFillColor(255, 252, 247);
                    doc.rect(0, 0, pageWidth, pageHeight, 'F');

                    for (let j = 0; j < 50; j++) {
                        const alpha = 1 - (j / 50);
                        doc.setFillColor(
                            Math.round(255 - alpha * 10),
                            Math.round(252 - alpha * 30),
                            Math.round(247 - alpha * 60)
                        );
                        doc.rect(0, j, pageWidth, 1.2, 'F');
                    }

                    doc.setDrawColor(212, 160, 60);
                    doc.setLineWidth(2.5);
                    doc.roundedRect(6, 6, pageWidth - 12, pageHeight - 12, 4, 4);
                    doc.setDrawColor(230, 190, 100);
                    doc.setLineWidth(0.8);
                    doc.roundedRect(10, 10, pageWidth - 20, pageHeight - 20, 3, 3);

                    const drawStar = (cx: number, cy: number, size: number) => {
                        doc.setFillColor(212, 160, 60);
                        doc.triangle(cx, cy - size, cx + size * 0.35, cy, cx, cy + size, 'F');
                        doc.triangle(cx, cy - size, cx - size * 0.35, cy, cx, cy + size, 'F');
                        doc.triangle(cx - size, cy, cx, cy - size * 0.35, cx + size, cy, 'F');
                        doc.triangle(cx - size, cy, cx, cy + size * 0.35, cx + size, cy, 'F');
                    };
                    drawStar(20, 20, 4);
                    drawStar(pageWidth - 20, 20, 4);
                    drawStar(20, pageHeight - 20, 4);
                    drawStar(pageWidth - 20, pageHeight - 20, 4);

                    doc.setFillColor(230, 190, 100);
                    [
                        { x: 28, y: 16 }, { x: 16, y: 28 },
                        { x: pageWidth - 28, y: 16 }, { x: pageWidth - 16, y: 28 },
                        { x: 28, y: pageHeight - 16 }, { x: 16, y: pageHeight - 28 },
                        { x: pageWidth - 28, y: pageHeight - 16 }, { x: pageWidth - 16, y: pageHeight - 28 },
                    ].forEach(d => doc.circle(d.x, d.y, 1, 'F'));

                    const imgW = 85;
                    const imgH = 127;
                    const imgX = 14;
                    const imgY = (pageHeight - imgH) / 2;

                    try {
                        doc.addImage(giftBgBase64, 'PNG', imgX, imgY, imgW, imgH);
                        doc.setFillColor(212, 160, 60);
                        doc.rect(imgX, imgY + imgH - 3, imgW, 3, 'F');
                        doc.rect(imgX, imgY, imgW, 3, 'F');
                    } catch (e) {
                        console.warn(e);
                    }

                    doc.setDrawColor(212, 160, 60);
                    doc.setLineWidth(1.5);
                    doc.rect(imgX, imgY, imgW, imgH);

                    const contentX = imgX + imgW + 10;
                    const contentW = pageWidth - contentX - 14;
                    const centerX = contentX + contentW / 2;

                    doc.setFillColor(45, 45, 55);
                    doc.roundedRect(contentX, 15, contentW, 20, 3, 3, 'F');
                    doc.setDrawColor(212, 160, 60);
                    doc.setLineWidth(1);
                    doc.line(contentX, 15, contentX + contentW, 15);

                    doc.setTextColor(255, 255, 255);
                    doc.setFontSize(13);
                    doc.setFont('helvetica', 'bold');
                    doc.text('TYROLIENNE D\'ORCIÈRES', centerX, 24, { align: 'center' });
                    doc.setFontSize(7);
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(200, 200, 210);
                    doc.text('Roll\'Air Câble - Orcières Merlette 1850', centerX, 31, { align: 'center' });

                    const titleY = 48;
                    doc.setDrawColor(212, 160, 60);
                    doc.setLineWidth(0.8);
                    const halfLine = 30;
                    doc.line(centerX - halfLine - 8, titleY - 10, centerX - 8, titleY - 10);
                    doc.line(centerX + 8, titleY - 10, centerX + halfLine + 8, titleY - 10);
                    drawStar(centerX, titleY - 10, 2);

                    doc.setTextColor(212, 160, 60);
                    doc.setFontSize(32);
                    doc.setFont('helvetica', 'bold');
                    doc.text("BON CADEAU", centerX, titleY, { align: 'center' });

                    doc.line(centerX - halfLine - 8, titleY + 4, centerX - 8, titleY + 4);
                    doc.line(centerX + 8, titleY + 4, centerX + halfLine + 8, titleY + 4);
                    drawStar(centerX, titleY + 4, 2);

                    doc.setTextColor(120, 110, 90);
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'italic');
                    doc.text(`Saison : ${ticket.season === 'winter' ? 'Hiver' : 'Été'}`, centerX, titleY + 13, { align: 'center' });

                    const formulaY = titleY + 23;
                    doc.setFillColor(45, 45, 55);
                    doc.roundedRect(centerX - 55, formulaY - 6, 110, 15, 3, 3, 'F');
                    doc.setDrawColor(212, 160, 60);
                    doc.setLineWidth(0.5);
                    doc.roundedRect(centerX - 55, formulaY - 6, 110, 15, 3, 3);

                    doc.setTextColor(255, 255, 255);
                    doc.setFontSize(16);
                    doc.setFont('helvetica', 'bold');
                    doc.text(`Descente en Tyrolienne Géante`, centerX, formulaY + 4, { align: 'center' });

                    let yPos = formulaY + 16;
                    doc.setTextColor(140, 130, 110);
                    doc.setFontSize(8);
                    doc.setFont('helvetica', 'normal');
                    doc.text(`1,8km à 130km/h`, centerX, yPos, { align: 'center' });
                    yPos += 7;

                    const fieldX = contentX + 5;
                    const fieldEndX = contentX + contentW - 5;

                    doc.setTextColor(80, 75, 65);
                    doc.setFontSize(9);
                    doc.setFont('helvetica', 'bold');

                    doc.text("De la part de :", fieldX, yPos);
                    doc.setDrawColor(200, 190, 170);
                    doc.setLineWidth(0.3);
                    doc.line(fieldX + 22, yPos, fieldEndX, yPos);

                    doc.text("Pour :", fieldX, yPos + 12);
                    doc.line(fieldX + 9, yPos + 12, fieldEndX, yPos + 12);

                    doc.text("Message :", fieldX, yPos + 24);
                    doc.line(fieldX + 16, yPos + 24, fieldEndX, yPos + 24);
                    doc.line(fieldX + 2, yPos + 31, fieldEndX, yPos + 31);

                    const qrDataUrl = await QRCode.toDataURL(ticket.id, {
                        width: 300,
                        margin: 2,
                        color: { dark: '#2D2D37', light: '#ffffff' }
                    });
                    const qrSize = 22;
                    const qrX = centerX - qrSize / 2;
                    const qrY = yPos + 35;

                    doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);

                    doc.setTextColor(160, 150, 130);
                    doc.setFontSize(7);
                    doc.text('www.tyrolienne-orcieres.com', centerX, qrY + qrSize + 4, { align: 'center' });

                    if (ticket.validUntil) {
                        doc.setTextColor(100, 95, 80);
                        doc.setFontSize(8);
                        doc.text(`Valable jusqu'au : ${new Date(ticket.validUntil).toLocaleDateString('fr-FR')}`, centerX, qrY + qrSize + 10, { align: 'center' });
                    }

                    doc.setTextColor(160, 150, 130);
                    doc.setFontSize(7);
                    doc.text(`Ref : ${ticket.id}`, centerX, qrY + qrSize + 15, { align: 'center' });

                    const bottomY = pageHeight - 32;

                    doc.setFillColor(45, 45, 55);
                    doc.roundedRect(contentX, bottomY - 4, contentW, 16, 3, 3, 'F');
                    doc.setDrawColor(212, 160, 60);
                    doc.setLineWidth(0.5);
                    doc.line(contentX, bottomY - 4, contentX + contentW, bottomY - 4);

                    doc.setTextColor(212, 160, 60);
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'bold');
                    doc.text("Infos Pratiques", centerX, bottomY + 3, { align: 'center' });

                    doc.setTextColor(200, 200, 210);
                    doc.setFontSize(7);
                    doc.setFont('helvetica', 'normal');
                    doc.text("Appelez-nous pour vérifier l'ouverture et présentez ce QR code à l'entrée.", centerX, bottomY + 9, { align: 'center' });

                    doc.setTextColor(160, 150, 130);
                    doc.setFontSize(6);
                    doc.text('06 84 44 88 10  |  www.tyrolienne-orcieres.com', centerX, pageHeight - 12, { align: 'center' });
                } else {
                    doc.setFillColor(0, 174, 239); // Primary color
                    doc.rect(0, 0, 210, 50, 'F');

                    doc.setTextColor(255, 255, 255);
                    doc.setFontSize(28);
                    doc.text("TYROLIENNE", 105, 25, { align: 'center' });
                    doc.setFontSize(12);
                    doc.text("Roll'Air Câble - Orcières Merlette", 105, 35, { align: 'center' });

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

                    const qrDataUrl = await QRCode.toDataURL(ticket.id, { width: 200, margin: 1 });
                    doc.addImage(qrDataUrl, 'PNG', 65, 155, 80, 80);

                    doc.setFontSize(10);
                    doc.setTextColor(150, 150, 150);
                    doc.text("Présentez ce QR code à l'entrée de la tyrolienne", 105, 245, { align: 'center' });
                    doc.text("1870m de vol • 130km/h • Orcières Merlette 1850", 105, 253, { align: 'center' });
                    doc.text("Contact: 06 84 44 88 10", 105, 261, { align: 'center' });
                }
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
                                <div className={`bg-primary p-4 flex items-center justify-between ${ticket.isGift ? 'bg-gradient-to-r from-primary to-blue-400' : ''}`}>
                                    <div className="flex items-center gap-2 text-white">
                                        <Ticket className="w-5 h-5" />
                                        <span className="font-bold uppercase tracking-wider text-sm">
                                            {ticket.isGift ? 'Bon Cadeau' : 'Billet'} {ticket.season === 'winter' ? 'Hiver' : 'Été'}
                                        </span>
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
                                        className={`w-full py-5 rounded-xl font-bold uppercase tracking-wider ${ticket.isGift ? 'bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 text-white' : 'bg-primary hover:bg-primary/90'}`}
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        {ticket.isGift ? 'Télécharger le Bon Cadeau PDF' : 'Télécharger le billet PDF'}
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
