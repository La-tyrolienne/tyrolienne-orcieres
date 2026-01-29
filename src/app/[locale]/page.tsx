import { HeroSection } from '@/components/HeroSection';
import { ReassuranceBanner } from '@/components/ReassuranceBanner';
import { AudienceSection } from '@/components/AudienceSection';
import { SafetySection } from '@/components/SafetySection';
import { TimelineSection } from '@/components/TimelineSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { OpeningCalendar } from '@/components/OpeningCalendar';
import { TicketSection } from '@/components/TicketSection';
import { FAQSection } from '@/components/FAQSection';
import { LocalisationSection } from '@/components/LocalisationSection';
import { FinalCTA } from '@/components/FinalCTA';
import { TestimonialsSection } from '@/components/TestimonialsSection';

// Schema.org structured data for SEO - TouristAttraction
const touristAttractionSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: "Roll'Air Câble - Tyrolienne Géante",
    description: 'Vivez une sortie en famille inoubliable sur notre tyrolienne géante dans les Alpes. Activité accessible dès 6-7 ans, vues panoramiques, sécurité maximale et sensations garanties.',
    url: 'https://www.latyrolienne.fr',
    image: 'https://www.latyrolienne.fr/og-image.jpg',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Station de ski',
        addressLocality: 'Orcières Merlette',
        postalCode: '05170',
        addressCountry: 'FR',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: 44.6947,
        longitude: 6.3264,
    },
    telephone: '+33684448810',
    priceRange: '35€ - 40€',
    openingHoursSpecification: [
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '09:30',
            closes: '15:30',
            validFrom: '2025-12-13',
            validThrough: '2026-04-12',
        },
    ],
    amenityFeature: [
        {
            '@type': 'LocationFeatureSpecification',
            name: 'Accessible aux enfants',
            value: true,
        },
        {
            '@type': 'LocationFeatureSpecification',
            name: 'Équipement de sécurité fourni',
            value: true,
        },
    ],
    isAccessibleForFree: false,
    publicAccess: true,
    touristType: ['Familles', 'Aventuriers', 'Groupes'],
};

// Schema.org Product/Service for rich snippets
const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Descente en Tyrolienne Géante - Roll\'Air Câble',
    description: 'Vol en tyrolienne géante de 1.8km à travers les Alpes. Vitesse jusqu\'à 130km/h, altitude 2650m. Activité familiale accessible dès 6-7 ans avec équipement de sécurité fourni.',
    image: 'https://www.latyrolienne.fr/og-image.jpg',
    brand: {
        '@type': 'Brand',
        name: 'Roll\'Air Câble',
    },
    offers: [
        {
            '@type': 'Offer',
            name: 'Billet Hiver',
            price: '40',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            validFrom: '2025-12-13',
            validThrough: '2026-04-12',
            url: 'https://www.latyrolienne.fr/billetterie',
        },
        {
            '@type': 'Offer',
            name: 'Billet Été',
            price: '35',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            validFrom: '2026-07-01',
            validThrough: '2026-08-31',
            url: 'https://www.latyrolienne.fr/billetterie',
        },
    ],
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.4',
        bestRating: '5',
        worstRating: '1',
        reviewCount: '36',
    },
};

export default function Home() {
    const schemas = [touristAttractionSchema, productSchema];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
            />
            <main>
                <HeroSection />
                <ReassuranceBanner />
                <AudienceSection />
                <TicketSection />
                <TestimonialsSection />
            </main>
        </>
    );
}
