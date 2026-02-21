import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { ThemeProvider } from '@/components/theme-provider';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import "../globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: 'swap',
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: 'swap',
});

const bebasNeue = Bebas_Neue({
    variable: "--font-bebas",
    subsets: ["latin"],
    weight: "400",
    display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const messages = await getMessages();
    const metadata = messages.metadata as Record<string, string>;

    return {
        title: {
            default: metadata.title,
            template: '%s | La Tyrolienne d\'Orcières',
        },
        description: metadata.description,
        keywords: [
            'tyrolienne Hautes-Alpes',
            'tyrolienne Orcières',
            'tyrolienne géante Alpes',
            'activité Hautes-Alpes famille',
            'tyrolienne familiale 05',
            'vol tyrolienne 130km/h',
            'Orcières Merlette 1850',
            'Roll Air Câble',
            'loisirs Hautes-Alpes',
            'tyrolienne sécurisée enfants',
            'activité montagne Champsaur',
        ],
        alternates: {
            canonical: 'https://www.latyrolienne.fr',
        },
        verification: {
            google: '4DmBmCnBfJZAkiD4DrbtuBlfS9rsRb-X6Z4C2RKfkKw',
        },
        openGraph: {
            title: metadata.title,
            description: metadata.description,
            url: 'https://www.latyrolienne.fr',
            siteName: "Roll'Air Câble - Tyrolienne Orcières",
            locale: locale === 'fr' ? 'fr_FR' : 'en_US',
            type: 'website',
            images: [
                {
                    url: 'https://www.latyrolienne.fr/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'Tyrolienne géante à Orcières - Roll\'Air Câble',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: metadata.title,
            description: metadata.description,
            images: ['https://www.latyrolienne.fr/og-image.jpg'],
        },
    };
}


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale();
    const messages = await getMessages();

    // Schema.org Organization for Google Knowledge Panel
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: "Roll'Air Câble",
        alternateName: 'La Tyrolienne Orcières',
        url: 'https://www.latyrolienne.fr',
        logo: 'https://www.latyrolienne.fr/logo-transparent.png',
        image: 'https://www.latyrolienne.fr/og-image.jpg',
        description: 'Tyrolienne géante familiale dans les Alpes françaises. 1.8km de vol à 130km/h, accessible dès 6-7 ans.',
        foundingDate: '2009',
        founders: [
            {
                '@type': 'Person',
                name: 'Régis Rochet',
            },
            {
                '@type': 'Person',
                name: 'Denis Reynier',
            },
        ],
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Station de ski Orcières Merlette 1850',
            addressLocality: 'Orcières',
            postalCode: '05170',
            addressRegion: 'Hautes-Alpes',
            addressCountry: 'FR',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 44.6947,
            longitude: 6.3264,
        },
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+33-6-84-44-88-10',
            contactType: 'customer service',
            availableLanguage: ['French', 'English'],
        },
        sameAs: [
            'https://facebook.com/rollaircable',
            'https://instagram.com/rollaircable.orcieres',
            'https://youtube.com/orcieres',
        ],
        areaServed: {
            '@type': 'Place',
            name: 'Orcières Merlette, Hautes-Alpes, France',
        },
        priceRange: '€€',
    };

    // LocalBusiness schema for local SEO
    const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'TouristAttraction',
        '@id': 'https://www.latyrolienne.fr/#attraction',
        name: 'Tyrolienne Roll\'Air Câble - Hautes-Alpes',
        alternateName: 'La Tyrolienne d\'Orcières',
        description: 'La plus grande tyrolienne des Hautes-Alpes. 1870m de vol à 130km/h au cœur du Champsaur. Activité familiale accessible dès 6-7 ans.',
        image: 'https://www.latyrolienne.fr/og-image.jpg',
        url: 'https://www.latyrolienne.fr',
        telephone: '+33684448810',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Station Orcières Merlette 1850',
            addressLocality: 'Orcières',
            postalCode: '05170',
            addressRegion: 'Hautes-Alpes',
            addressCountry: 'FR',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 44.6947,
            longitude: 6.3264,
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.4',
            reviewCount: '36',
            bestRating: '5',
            worstRating: '1',
        },
        isAccessibleForFree: false,
        publicAccess: true,
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                opens: '09:00',
                closes: '17:00',
            },
        ],
    };

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} antialiased min-h-screen`}
            >
                <NextIntlClientProvider messages={messages}>
                    <ThemeProvider>
                        <CartProvider>
                            <div className="flex flex-col min-h-screen">
                                <Header />
                                <main className="flex-1">
                                    {children}
                                </main>
                                <Footer />
                            </div>
                        </CartProvider>
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
