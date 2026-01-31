import type { Metadata } from 'next';
import { CGVContent } from '@/components/CGVContent';

export const metadata: Metadata = {
    title: 'CGV',
    description: 'Conditions Générales de Vente de la tyrolienne d\'Orcières. Tarifs, réservation, validité des billets, remboursement.',
    alternates: {
        canonical: 'https://www.latyrolienne.fr/fr/cgv',
    },
};

export default function CGVPage() {
    return <CGVContent />;
}
