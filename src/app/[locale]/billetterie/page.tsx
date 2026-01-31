import { getTranslations } from 'next-intl/server';
import { BilletterieContent } from '@/components/BilletterieContent';
import type { Metadata } from 'next';

// SSR Metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('tickets');

    return {
        title: 'Billetterie - Tyrolienne Orcières | Réserver en ligne',
        description: 'Réservez votre billet pour la tyrolienne d\'Orcières. Tarif 35-40€, équipement inclus. Paiement sécurisé, billet valable 1 an.',
        keywords: ['billetterie tyrolienne', 'réserver tyrolienne Orcières', 'tarif tyrolienne', 'billet tyrolienne'],
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
