import { InformationsContent } from '@/components/InformationsContent';
import type { Metadata } from 'next';

// SSR Metadata for SEO
export const metadata: Metadata = {
    title: 'Informations Pratiques - Tyrolienne Orcières | Accès, Équipement, Conditions',
    description: 'Toutes les informations pratiques pour la tyrolienne d\'Orcières. Accès, conditions, équipement fourni, déroulement du vol. Âge minimum 6-7 ans.',
    keywords: ['informations tyrolienne', 'accès tyrolienne Orcières', 'équipement tyrolienne', 'conditions tyrolienne'],
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
