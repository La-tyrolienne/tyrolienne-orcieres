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
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
    variable: "--font-bebas",
    subsets: ["latin"],
    weight: "400",
});

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const messages = await getMessages();
    const metadata = messages.metadata as Record<string, string>;

    return {
        title: metadata.title,
        description: metadata.description,
        keywords: ['tyrolienne', 'zipline', 'Orcières', 'Merlette', 'Roll Air Cable', 'Alpes', 'ski', 'montagne'],
        verification: {
            google: '4DmBmCnBfJZAkiD4DrbtuBlfS9rsRb-X6Z4C2RKfkKw',
        },
        openGraph: {
            title: metadata.title,
            description: metadata.description,
            locale: locale === 'fr' ? 'fr_FR' : 'en_US',
            type: 'website',
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
