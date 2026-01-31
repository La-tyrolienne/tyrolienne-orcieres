'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Ticket,
    Clock,
    Users,
    Zap,
    Mountain,
    Ruler,
    Shield,
    Check,
    Phone,
    MapPin,
    Calendar,
    Snowflake,
    Sun,
    ArrowRight
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import Image from 'next/image';
import Link from 'next/link';
import { VisualCalendar } from '@/components/VisualCalendar';

// Schema.org for SEO
const tyrolienneSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Tyrolienne Orcières - Vol en tyrolienne géante',
    description: 'Tyrolienne géante de 1.8km à Orcières Merlette. Vol à 130km/h au-dessus des Alpes. Accessible dès 6-7 ans.',
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
        validFrom: '2025-01-01',
    },
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.4',
        reviewCount: '36',
    },
};

export default function TyroliennePage() {
    const t = useTranslations('tickets');
    const { season } = useTheme();

    const price = season === 'winter' ? 40 : 35;
    const SeasonIcon = season === 'winter' ? Snowflake : Sun;

    const stats = [
        { icon: Ruler, value: '1.8 km', label: 'Distance' },
        { icon: Zap, value: '130 km/h', label: 'Vitesse max' },
        { icon: Mountain, value: '1850 m', label: 'Altitude départ' },
        { icon: Clock, value: '1min 20', label: 'Durée du vol' },
    ];

    const inclus = [
        'Équipement de sécurité complet',
        'Briefing sécurité avec nos experts',
        'Vol de 1.8km à travers les Alpes',
        'Encadrement professionnel',
        'Billet valable 1 an',
    ];

    const conditions = [
        { icon: Users, label: 'Âge minimum', value: '6-7 ans' },
        { icon: Shield, label: 'Poids', value: '20 à 130 kg' },
        { icon: Clock, label: 'Durée totale', value: '~30 min' },
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(tyrolienneSchema) }}
            />
            <div className="min-h-screen bg-background">
                {/* Hero Section */}
                <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
                    <Image
                        src="/hero-winter-optimized.webp"
                        alt="Tyrolienne Orcières - Vue panoramique"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />

                    <div className="relative z-10 container mx-auto px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Badge className="mb-6 bg-primary/90 text-white border-0 px-4 py-2">
                                <SeasonIcon className="w-4 h-4 mr-2" />
                                {season === 'winter' ? 'Ouvert cet hiver' : 'Ouvert cet été'}
                            </Badge>

                            <h1 className="font-[family-name:var(--font-bebas)] text-4xl md:text-6xl lg:text-8xl text-white mb-6 uppercase">
                                Tyrolienne Orcières
                            </h1>

                            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
                                La plus grande tyrolienne des Alpes françaises. 1.8km de vol à 130km/h au-dessus d'Orcières Merlette.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    asChild
                                    size="lg"
                                    className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 rounded-xl text-lg"
                                >
                                    <a href="https://www.weezevent.com/widget_billeterie.php?id_evenement=774049&widget_key=E774049&locale=fr_FR&color_primary=00AEEF&code=61890&width_auto=1" target="_blank" rel="noopener noreferrer">
                                        <Ticket className="w-5 h-5 mr-2" />
                                        Réserver maintenant - {price}€
                                    </a>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="border-white text-white hover:bg-white/10 font-bold px-8 py-6 rounded-xl text-lg"
                                >
                                    <a href="tel:+33684448810">
                                        <Phone className="w-5 h-5 mr-2" />
                                        06 84 44 88 10
                                    </a>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Stats Bar */}
                <section className="py-8 bg-primary text-white">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            {stats.map((stat) => (
                                <div key={stat.label} className="flex flex-col items-center">
                                    <stat.icon className="w-6 h-6 mb-2 opacity-80" />
                                    <span className="text-2xl md:text-3xl font-black">{stat.value}</span>
                                    <span className="text-sm opacity-80">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tarifs Section */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="font-[family-name:var(--font-bebas)] text-3xl md:text-5xl mb-4">
                                Tarif Tyrolienne Orcières
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Un prix unique pour tous, équipement de sécurité inclus
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Prix principal */}
                            <Card className="relative overflow-hidden border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
                                <div className="absolute top-0 right-0">
                                    <Badge className="rounded-none rounded-bl-xl bg-primary text-white border-0 px-4 py-2">
                                        <SeasonIcon className="w-4 h-4 mr-1" />
                                        {season === 'winter' ? 'Hiver' : 'Été'}
                                    </Badge>
                                </div>
                                <CardContent className="p-8">
                                    <div className="text-center mb-6">
                                        <span className="text-6xl md:text-7xl font-black">{price}€</span>
                                        <span className="text-muted-foreground block">/personne</span>
                                    </div>

                                    <ul className="space-y-3 mb-8">
                                        {inclus.map((item, i) => (
                                            <li key={i} className="flex items-center gap-3">
                                                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                                    <Check className="w-3 h-3 text-green-500" />
                                                </div>
                                                <span className="text-sm">{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        asChild
                                        className="w-full py-6 text-lg font-bold bg-primary hover:bg-primary/90"
                                    >
                                        <a href="https://www.weezevent.com/widget_billeterie.php?id_evenement=774049&widget_key=E774049&locale=fr_FR&color_primary=00AEEF&code=61890&width_auto=1" target="_blank" rel="noopener noreferrer">
                                            Réserver en ligne
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Tarif groupe */}
                            <Card className="border-border/50">
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <Users className="w-12 h-12 text-primary" />
                                        <div>
                                            <h3 className="text-xl font-bold">Tarif Groupe</h3>
                                            <p className="text-muted-foreground text-sm">À partir de 10 personnes</p>
                                        </div>
                                    </div>

                                    <div className="text-center py-6 bg-muted/30 rounded-xl mb-6">
                                        <span className="text-4xl font-black text-primary">-3€</span>
                                        <span className="text-muted-foreground block">/billet</span>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span>10 personnes</span>
                                            <span className="font-bold">{(price - 3) * 10}€ total</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>20 personnes</span>
                                            <span className="font-bold">{(price - 3) * 20}€ total</span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-muted-foreground mt-6">
                                        Contactez-nous pour les réservations de groupe
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Conditions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                            {conditions.map((condition) => (
                                <Card key={condition.label} className="bg-muted/30 border-none">
                                    <CardContent className="p-6 flex items-center gap-4">
                                        <condition.icon className="w-8 h-8 text-primary" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">{condition.label}</p>
                                            <p className="font-bold">{condition.value}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Horaires Section */}
                <section className="py-16 md:py-24 bg-muted/20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="font-[family-name:var(--font-bebas)] text-3xl md:text-5xl mb-4">
                                Horaires Tyrolienne Orcières
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Ouverte été comme hiver, selon les conditions météo
                            </p>
                        </motion.div>

                        <VisualCalendar />

                        <div className="mt-8 text-center p-6 bg-background rounded-2xl border">
                            <p className="text-muted-foreground mb-4">
                                L'ouverture dépend des conditions météo. Appelez avant de venir :
                            </p>
                            <a
                                href="tel:+33684448810"
                                className="inline-flex items-center gap-2 text-2xl font-bold text-primary hover:underline"
                            >
                                <Phone className="w-6 h-6" />
                                06 84 44 88 10
                            </a>
                        </div>
                    </div>
                </section>

                {/* Localisation */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="font-[family-name:var(--font-bebas)] text-3xl md:text-5xl mb-4">
                                Accès Tyrolienne Orcières
                            </h2>
                        </motion.div>

                        <Card className="overflow-hidden">
                            <CardContent className="p-0">
                                <div className="grid md:grid-cols-2">
                                    <div className="p-8">
                                        <div className="flex items-start gap-4 mb-6">
                                            <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                            <div>
                                                <h3 className="font-bold mb-1">Adresse</h3>
                                                <p className="text-muted-foreground">
                                                    Station d'Orcières Merlette 1850<br />
                                                    05170 Orcières<br />
                                                    Hautes-Alpes, France
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 mb-6">
                                            <Calendar className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                            <div>
                                                <h3 className="font-bold mb-1">Saisons</h3>
                                                <p className="text-muted-foreground">
                                                    Hiver : pendant la saison de ski<br />
                                                    Été : juillet - août
                                                </p>
                                            </div>
                                        </div>

                                        <Button asChild variant="outline" className="w-full">
                                            <Link href="/informations">
                                                Voir toutes les informations pratiques
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Link>
                                        </Button>
                                    </div>
                                    <div className="relative h-64 md:h-auto">
                                        <Image
                                            src="/access-map.png"
                                            alt="Plan d'accès tyrolienne Orcières"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* CTA Final */}
                <section className="py-16 md:py-24 bg-primary text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="font-[family-name:var(--font-bebas)] text-3xl md:text-5xl mb-6">
                            Réservez votre tyrolienne à Orcières
                        </h2>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
                            Une expérience inoubliable pour toute la famille. Billet valable 1 an.
                        </p>
                        <Button
                            asChild
                            size="lg"
                            className="bg-white text-primary hover:bg-white/90 font-bold px-10 py-7 rounded-xl text-lg"
                        >
                            <a href="https://www.weezevent.com/widget_billeterie.php?id_evenement=774049&widget_key=E774049&locale=fr_FR&color_primary=00AEEF&code=61890&width_auto=1" target="_blank" rel="noopener noreferrer">
                                <Ticket className="w-6 h-6 mr-2" />
                                Réserver - {price}€/personne
                            </a>
                        </Button>
                    </div>
                </section>
            </div>
        </>
    );
}
