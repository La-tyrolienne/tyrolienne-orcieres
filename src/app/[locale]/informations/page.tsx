import { InformationsContent } from '@/components/InformationsContent';
import type { Metadata } from 'next';

// SSR Metadata for SEO
export const metadata: Metadata = {
    title: 'Infos Pratiques Tyrolienne Orcières | Accès, Âge, Sécurité',
    description: 'Tout savoir avant votre tyrolienne à Orcières Hautes-Alpes. Accès station, âge minimum 6-7 ans, équipement fourni, conditions météo.',
    keywords: ['informations tyrolienne Hautes-Alpes', 'accès tyrolienne Orcières', 'âge minimum tyrolienne', 'sécurité tyrolienne'],
    openGraph: {
        title: 'Informations Pratiques Tyrolienne Orcières',
        description: 'Tout savoir avant votre vol en tyrolienne.',
        images: ['/og-image.jpg'],
    },
};

// Schema.org for SEO - rendered server-side
const touristAttractionSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: 'Tyrolienne Orcières',
    description: 'Tyrolienne géante de 1.8km dans les Alpes françaises. Vol à 130km/h, 120m au-dessus du sol.',
    image: 'https://www.latyrolienne.fr/og-image.jpg',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Station Orcières Merlette 1850',
        addressLocality: 'Orcières',
        postalCode: '05170',
        addressCountry: 'FR',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: 44.6947,
        longitude: 6.3264,
    },
    isAccessibleForFree: false,
    publicAccess: true,
};

// Server Component - SSR for SEO
export default function InformationsPage() {
    return (
        <>
            {/* Schema.org rendered server-side for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(touristAttractionSchema) }}
            />
            {/* Client component for interactivity */}
            <InformationsContent />
        </>
    );
}
