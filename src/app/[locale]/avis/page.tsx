import type { Metadata } from 'next';
import { AvisContent } from '@/components/AvisContent';
import { generateReviewSchema } from '@/lib/schemas';

const reviews = [
    {
        author: 'Marie L.',
        rating: 5,
        text: "Expérience incroyable ! Mon fils de 8 ans a adoré. L'équipe est super rassurante et professionnelle. On reviendra !",
        date: '2025-08-15',
    },
    {
        author: 'Thomas D.',
        rating: 5,
        text: 'Sensations garanties ! 130 km/h avec une vue à couper le souffle sur les Alpes. À faire absolument.',
        date: '2025-07-22',
    },
    {
        author: 'Sophie M.',
        rating: 4,
        text: "Super activité familiale. Seul bémol : l'attente en haute saison. Pensez à réserver !",
        date: '2025-08-02',
    },
    {
        author: 'Pierre R.',
        rating: 5,
        text: "On a fait la tyrolienne en hiver, avec la neige c'est magique ! Le personnel est aux petits soins.",
        date: '2025-02-10',
    },
    {
        author: 'Camille B.',
        rating: 5,
        text: 'Ma fille de 7 ans était un peu stressée au départ mais elle a adoré ! Merci à Régis pour sa patience.',
        date: '2025-07-30',
    },
    {
        author: 'Jean-Marc V.',
        rating: 4,
        text: 'Belle expérience, prix correct. Le paysage est magnifique. Je recommande pour les familles.',
        date: '2025-08-20',
    },
];

export const metadata: Metadata = {
    title: 'Avis Clients',
    description: 'Découvrez les témoignages de nos clients sur la tyrolienne d\'Orcières. Note moyenne 4.4/5. Avis vérifiés.',
    alternates: {
        canonical: 'https://www.latyrolienne.fr/fr/avis',
    },
    openGraph: {
        title: 'Avis Clients | La Tyrolienne d\'Orcières',
        description: 'Ce que nos clients disent de leur expérience. Note 4.4/5.',
    },
};

export default function AvisPage() {
    const reviewSchema = generateReviewSchema(reviews);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
            />
            <AvisContent reviews={reviews} />
        </>
    );
}
