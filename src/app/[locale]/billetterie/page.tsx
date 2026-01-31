import { getTranslations } from 'next-intl/server';
import { BilletterieContent } from '@/components/BilletterieContent';
import type { Metadata } from 'next';

// SSR Metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('tickets');

    return {
        title: 'Tarifs & Réservation Tyrolienne Orcières | 35-40€ Hautes-Alpes',
        description: 'Réservez votre tyrolienne à Orcières Hautes-Alpes. Tarif 35€ (été) ou 40€ (hiver). 1870m de vol à 130km/h. Billet valable 1 an.',
        keywords: ['tarif tyrolienne Hautes-Alpes', 'réserver tyrolienne Orcières', 'prix tyrolienne Alpes', 'billet tyrolienne'],
        openGraph: {
            title: 'Billetterie Tyrolienne Orcières',
            description: 'Réservez votre vol en tyrolienne. 1.8km à 130km/h.',
            images: ['/og-image.jpg'],
        },
    };
}

// Schema.org for SEO - rendered server-side
const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Billet Tyrolienne Orcières',
    description: 'Vol en tyrolienne géante de 1.8km à Orcières Merlette. Équipement professionnel inclus.',
    image: 'https://www.latyrolienne.fr/og-image.jpg',
    brand: {
        '@type': 'Brand',
        name: "Roll'Air Câble",
    },
    offers: {
        '@type': 'AggregateOffer',
        lowPrice: '35',
        highPrice: '40',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        seller: {
            '@type': 'Organization',
            name: "Roll'Air Câble",
        },
    },
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.4',
        reviewCount: '36',
    },
};

// Server Component - SSR for SEO
export default function BilletteriePage() {
    return (
        <>
            {/* Schema.org rendered server-side for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            {/* Client component for interactivity */}
            <BilletterieContent />
        </>
    );
}
