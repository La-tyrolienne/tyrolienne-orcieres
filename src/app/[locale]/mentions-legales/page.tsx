import type { Metadata } from 'next';
import { MentionsLegalesContent } from '@/components/MentionsLegalesContent';

export const metadata: Metadata = {
    title: 'Mentions Légales',
    description: 'Mentions légales du site La Tyrolienne d\'Orcières. Éditeur, hébergement, propriété intellectuelle.',
    alternates: {
        canonical: 'https://www.latyrolienne.fr/fr/mentions-legales',
    },
};

export default function MentionsLegalesPage() {
    return <MentionsLegalesContent />;
}
