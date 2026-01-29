import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { ThemeProvider } from '@/components/theme-provider';
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
        title: metadata.title,
        description: metadata.description,
        keywords: [
            'tyrolienne familiale',
            'tyrolienne géante Alpes',
            'activité famille montagne',
            'zipline enfants',
            'Orcières Merlette',
            'Roll Air Cable',
            'sortie famille Hautes-Alpes',
            'parc aventure montagne',
            'tyrolienne sécurisée',
            'activité outdoor famille'
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
                    alt: 'Tyrolienne géante familiale dans les Alpes - Roll\'Air Câble Orcières',
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

    return (
        <html lang={locale} suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} antialiased min-h-screen`}
            >
                <NextIntlClientProvider messages={messages}>
                    <ThemeProvider>
                        <div className="flex flex-col min-h-screen">
                            <Header />
                            <main className="flex-1">
                                {children}
                            </main>
                            <Footer />
                        </div>
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
