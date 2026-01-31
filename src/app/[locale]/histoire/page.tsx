import type { Metadata } from 'next';
import { HistoireContent } from '@/components/HistoireContent';

export const metadata: Metadata = {
    title: 'Histoire Roll\'Air Câble | Tyrolienne Orcières depuis 2009',
    description: 'Découvrez l\'histoire de Roll\'Air Câble, la plus grande tyrolienne des Hautes-Alpes depuis 2009. 1870m, 130km/h à Orcières Merlette.',
    alternates: {
        canonical: 'https://www.latyrolienne.fr/fr/histoire',
    },
    openGraph: {
        title: 'Notre Histoire | La Tyrolienne d\'Orcières',
        description: 'Depuis 2009, Roll\'Air Câble propose la plus grande tyrolienne des Alpes.',
        images: ['/og-image.jpg'],
    },
};

export default function HistoirePage() {
    return <HistoireContent />;
}
