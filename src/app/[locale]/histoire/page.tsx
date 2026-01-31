import type { Metadata } from 'next';
import { HistoireContent } from '@/components/HistoireContent';

export const metadata: Metadata = {
    title: 'Notre Histoire',
    description: 'Depuis 2009, Roll\'Air Câble propose la plus grande tyrolienne des Alpes à Orcières. 1870m, 130km/h. Découvrez notre histoire.',
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
