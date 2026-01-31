'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Quote, ExternalLink, Play, Ticket, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Schema.org for SEO
const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Tyrolienne Orcières',
    description: 'Tyrolienne géante de 1.8km à Orcières Merlette',
    image: 'https://www.latyrolienne.fr/og-image.jpg',
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.4',
        reviewCount: '36',
        bestRating: '5',
        worstRating: '1',
    },
    review: [
        {
            '@type': 'Review',
            reviewRating: { '@type': 'Rating', ratingValue: '5' },
            author: { '@type': 'Person', name: 'Marie L.' },
            reviewBody: "Très bonne expérience. Le plaisir du vol en toute sécurité. Des sensations douces vraiment accessibles pour tout le monde.",
        },
        {
            '@type': 'Review',
            reviewRating: { '@type': 'Rating', ratingValue: '5' },
            author: { '@type': 'Person', name: 'Thomas B.' },
            reviewBody: "La tyrolienne était incroyable ! La vue était absolument spectaculaire. Une aventure mémorable à ne pas manquer !",
        },
        {
            '@type': 'Review',
            reviewRating: { '@type': 'Rating', ratingValue: '5' },
            author: { '@type': 'Person', name: 'Sophie M.' },
            reviewBody: "On s'est régalés ! Aucune sensation de vertige, juste un sentiment de bien-être, de voler comme un oiseau.",
        },
    ],
};

const testimonials = [
    {
        name: 'Marie L.',
        rating: 5,
        text: "Très bonne expérience. Le plaisir du vol en toute sécurité. Des sensations douces vraiment accessibles pour tout le monde. Tyrolienne dans un cadre magnifique. Voir son ombre filer au sol, observer les marmottes de haut, un régal. Un accueil au top !",
        type: 'famille',
    },
    {
        name: 'Thomas B.',
        rating: 5,
        text: "La tyrolienne que nous avons testée était incroyable ! La vue était absolument spectaculaire et nous offrait un panorama à couper le souffle. Les sensations étaient agréables et, bien que le trajet soit relativement tranquille, la sensation de flotter au-dessus du paysage est inoubliable. On se sent vraiment tout petit en survolant le câble.",
        date: 'Août 2025',
        type: 'couple',
    },
    {
        name: 'Sophie M.',
        rating: 5,
        text: "On s'est régalés !!! On a été super bien conseillés par les deux personnes du Roll'Air Câble. Aucune sensation de vertige, juste un sentiment de bien-être, de voler comme un oiseau et de vitesse. En plus, étant la dernière à passer, la dame a pu me filmer et m'envoyer la vidéo. C'est super gentil, merci encore !!!",
        type: 'solo',
    },
    {
        name: 'Jean-Pierre D.',
        rating: 5,
        text: "Expérience à vivre absolument ! Personnel très professionnel et à l'écoute. La tyrolienne offre des sensations uniques avec une vue imprenable sur les montagnes. Parfait pour toute la famille.",
        type: 'famille',
    },
    {
        name: 'Émilie R.',
        rating: 4,
        text: "Super moment en famille ! Les enfants (8 et 12 ans) ont adoré. L'équipe est très rassurante et professionnelle. Seul petit bémol : l'attente peut être longue en haute saison, mais ça vaut le coup !",
        type: 'famille',
    },
    {
        name: 'Marc V.',
        rating: 5,
        text: "Meilleure activité de nos vacances à Orcières ! L'adrénaline du départ, puis la sensation de liberté... C'est vraiment unique. Le retour à pied par les lacs est magnifique aussi.",
        type: 'groupe',
    },
];

export default function AvisPage() {
    const avgRating = 4.4;
    const totalReviews = 36;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
            />
            <div className="min-h-screen bg-background">
                {/* Hero Section */}
                <section className="relative py-24 md:py-32 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
                    <div className="container mx-auto px-4 relative">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center max-w-4xl mx-auto"
                        >
                            {/* Rating Stars */}
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-8 h-8 ${i < Math.floor(avgRating) ? 'fill-yellow-400 text-yellow-400' : 'fill-yellow-400/30 text-yellow-400/30'}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-3xl font-black">{avgRating}/5</span>
                            </div>

                            <h1 className="font-[family-name:var(--font-bebas)] text-4xl md:text-6xl mb-4">
                                Avis Tyrolienne Orcières
                            </h1>
                            <p className="text-xl text-muted-foreground mb-8">
                                Découvrez les témoignages de nos {totalReviews} visiteurs sur Google
                            </p>

                            <Button asChild variant="outline" size="lg">
                                <a
                                    href="https://www.google.com/maps/place/Roll'Air+C%C3%A2ble/@44.6947,6.3264,17z"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Voir tous les avis sur Google
                                    <ExternalLink className="w-4 h-4 ml-2" />
                                </a>
                            </Button>
                        </motion.div>
                    </div>
                </section>

                {/* Stats */}
                <section className="py-8 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div>
                                <span className="text-3xl font-black text-primary">{totalReviews}</span>
                                <p className="text-sm text-muted-foreground">Avis Google</p>
                            </div>
                            <div>
                                <span className="text-3xl font-black text-primary">{avgRating}/5</span>
                                <p className="text-sm text-muted-foreground">Note moyenne</p>
                            </div>
                            <div>
                                <span className="text-3xl font-black text-primary">97%</span>
                                <p className="text-sm text-muted-foreground">Recommandent</p>
                            </div>
                            <div>
                                <span className="text-3xl font-black text-primary">2009</span>
                                <p className="text-sm text-muted-foreground">Depuis</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Grid */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="font-[family-name:var(--font-bebas)] text-3xl md:text-4xl mb-4">
                                Témoignages Clients
                            </h2>
                            <p className="text-muted-foreground">
                                Ce que nos visiteurs disent de leur expérience
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="h-full hover:shadow-lg transition-shadow">
                                        <CardContent className="p-6">
                                            <Quote className="w-8 h-8 text-primary/20 mb-4" />

                                            <div className="flex gap-0.5 mb-4">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                ))}
                                            </div>

                                            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                                                "{testimonial.text}"
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-bold text-sm">{testimonial.name}</p>
                                                    {testimonial.date && (
                                                        <p className="text-xs text-muted-foreground">{testimonial.date}</p>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                                                    <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
                                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                                    </svg>
                                                    <span>Google</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Video Section */}
                <section className="py-16 md:py-24 bg-muted/20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="font-[family-name:var(--font-bebas)] text-3xl md:text-4xl mb-4">
                                Vidéo Tyrolienne Orcières
                            </h2>
                            <p className="text-muted-foreground">
                                Découvrez l'expérience en images
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <video
                                className="w-full h-full object-cover"
                                controls
                                poster="/hero-poster-optimized.webp"
                            >
                                <source src="/videos/tyrolienne.mp4" type="video/mp4" />
                            </video>
                        </motion.div>
                    </div>
                </section>

                {/* Photos Section */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="font-[family-name:var(--font-bebas)] text-3xl md:text-4xl mb-4">
                                Photos Tyrolienne Orcières
                            </h2>
                            <p className="text-muted-foreground">
                                Les plus belles images de l'expérience
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="relative aspect-square rounded-xl overflow-hidden">
                                <Image
                                    src="/hero-winter-optimized.webp"
                                    alt="Tyrolienne Orcières hiver"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="relative aspect-square rounded-xl overflow-hidden">
                                <Image
                                    src="/hero-summer-optimized.webp"
                                    alt="Tyrolienne Orcières été"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="relative aspect-square rounded-xl overflow-hidden">
                                <Image
                                    src="/cable-detail.png"
                                    alt="Détail câble tyrolienne"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 md:py-24 bg-primary text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="font-[family-name:var(--font-bebas)] text-3xl md:text-5xl mb-6">
                            Vivez l'expérience vous aussi !
                        </h2>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
                            Rejoignez les milliers de visiteurs satisfaits
                        </p>
                        <Button
                            asChild
                            size="lg"
                            className="bg-white text-primary hover:bg-white/90 font-bold px-10 py-7 rounded-xl text-lg"
                        >
                            <Link href="/tyrolienne">
                                <Ticket className="w-6 h-6 mr-2" />
                                Réserver maintenant
                            </Link>
                        </Button>
                    </div>
                </section>
            </div>
        </>
    );
}
