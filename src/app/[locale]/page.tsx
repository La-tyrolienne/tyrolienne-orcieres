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

// Schema.org structured data for SEO
const jsonLd = {
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

export default function Home() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <main>
                <HeroSection />
                <ReassuranceBanner />
                <AudienceSection />
                <TicketSection />
            </main>
        </>
    );
}
