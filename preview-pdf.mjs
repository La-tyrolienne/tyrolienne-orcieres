import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Import isn't working directly in mjs for a ts file, so we read the ts file and extract the string in the script to make it self-contained for the preview
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tsFile = fs.readFileSync(path.join(__dirname, 'src/lib/giftBgBase64.ts'), 'utf-8');
const giftBgBase64 = tsFile.match(/['"](.*?)['"]/)[1];


async function generatePreview() {
    try {
        const ticket = {
            id: 'TKT-PREVIEW123',
            season: 'winter',
            price: 45,
            customerEmail: 'test@example.com',
            customerName: 'Jean Dupont',
            createdAt: new Date().toISOString(),
            validUntil: new Date(Date.now() + 31536000000).toISOString(), // 1 year
            status: 'active',
            isGift: true
        };

        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // === BACKGROUND ===
        doc.setFillColor(255, 252, 247);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');

        // Subtle warm gradient at top
        for (let i = 0; i < 50; i++) {
            const alpha = 1 - (i / 50);
            doc.setFillColor(
                Math.round(255 - alpha * 10),
                Math.round(252 - alpha * 30),
                Math.round(247 - alpha * 60)
            );
            doc.rect(0, i, pageWidth, 1.2, 'F');
        }

        // === DOUBLE DECORATIVE BORDER ===
        doc.setDrawColor(212, 160, 60);
        doc.setLineWidth(2.5);
        doc.roundedRect(6, 6, pageWidth - 12, pageHeight - 12, 4, 4);
        doc.setDrawColor(230, 190, 100);
        doc.setLineWidth(0.8);
        doc.roundedRect(10, 10, pageWidth - 20, pageHeight - 20, 3, 3);

        // === CORNER STARS ===
        const drawStar = (cx, cy, size) => {
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

        // Corner dots
        doc.setFillColor(230, 190, 100);
        [
            { x: 28, y: 16 }, { x: 16, y: 28 },
            { x: pageWidth - 28, y: 16 }, { x: pageWidth - 16, y: 28 },
            { x: 28, y: pageHeight - 16 }, { x: 16, y: pageHeight - 28 },
            { x: pageWidth - 28, y: pageHeight - 16 }, { x: pageWidth - 16, y: pageHeight - 28 },
        ].forEach(d => doc.circle(d.x, d.y, 1, 'F'));

        // === LAYOUT: LEFT = IMAGE | RIGHT = CONTENT ===
        const imgW = 85;
        const imgH = 127; // Vertical aspect ratio
        const imgX = 14;
        const imgY = (pageHeight - imgH) / 2; // Vertically centered

        // Load and add the tyro photo
        try {
            doc.addImage(giftBgBase64, 'PNG', imgX, imgY, imgW, imgH);

            doc.setFillColor(255, 252, 247);
            doc.setFillColor(212, 160, 60);
            doc.rect(imgX, imgY + imgH - 3, imgW, 3, 'F');
            doc.rect(imgX, imgY, imgW, 3, 'F');
        } catch (e) {
            console.warn('Could not load hero image:', e);
        }

        // Gold border around image
        doc.setDrawColor(212, 160, 60);
        doc.setLineWidth(1.5);
        doc.rect(imgX, imgY, imgW, imgH);

        // === RIGHT SIDE CONTENT ===
        const contentX = imgX + imgW + 10;
        const contentW = pageWidth - contentX - 14;
        const centerX = contentX + contentW / 2;

        // -- Top banner --
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

        // -- Title: BON CADEAU --
        const titleY = 48;

        // Lines above
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

        // Lines below
        doc.line(centerX - halfLine - 8, titleY + 4, centerX - 8, titleY + 4);
        doc.line(centerX + 8, titleY + 4, centerX + halfLine + 8, titleY + 4);
        drawStar(centerX, titleY + 4, 2);

        // Subtitle
        doc.setTextColor(120, 110, 90);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.text(`Saison : ${ticket.season === 'winter' ? 'Hiver' : 'Été'}`, centerX, titleY + 13, { align: 'center' });

        // -- Formula card --
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

        // -- Form fields --
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

        // -- QR Code --
        const qrDataUrl = await QRCode.toDataURL(ticket.id, {
            width: 300,
            margin: 2,
            color: { dark: '#2D2D37', light: '#ffffff' }
        });
        const qrSize = 22;
        const qrX = centerX - qrSize / 2;
        const qrY = yPos + 35; // Moved up slightly from 48 since lines were tightened

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

        // === BOTTOM BANNER ===
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

        // Footer
        doc.setTextColor(160, 150, 130);
        doc.setFontSize(6);
        doc.text('06 84 44 88 10  |  www.tyrolienne-orcieres.com', centerX, pageHeight - 12, { align: 'center' });

        // Save to Desktop for user to see
        const outputPath = '/Users/noarochet/Desktop/apercu-bon-cadeau.pdf';
        const pdfOutput = doc.output('arraybuffer');
        fs.writeFileSync(outputPath, Buffer.from(pdfOutput));
        console.log(`✅ Aperçu généré avec succès dans : ${outputPath}`);
    } catch (e) {
        console.error('Erreur :', e);
    }
}

generatePreview();
