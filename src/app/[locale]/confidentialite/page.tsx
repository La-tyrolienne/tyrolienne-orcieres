import type { Metadata } from 'next';
import { ConfidentialiteContent } from '@/components/ConfidentialiteContent';

export const metadata: Metadata = {
    title: 'Confidentialité',
    description: 'Politique de confidentialité de La Tyrolienne d\'Orcières. RGPD, cookies, vos droits.',
    alternates: {
        canonical: 'https://www.latyrolienne.fr/fr/confidentialite',
    },
};

export default function ConfidentialitePage() {
    return <ConfidentialiteContent />;
}
