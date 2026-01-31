'use client';

import { motion } from 'framer-motion';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

interface Review {
    author: string;
    rating: number;
    text: string;
    date: string;
}

interface AvisContentProps {
    reviews: Review[];
}

export function AvisContent({ reviews }: AvisContentProps) {
    const breadcrumbs = [
        { label: 'Accueil', href: '/fr' },
        { label: 'Avis', href: '/fr/avis' },
    ];

    const averageRating = 4.4;
    const totalReviews = 36;

    return (
        <main className="min-h-screen bg-background">
            {/* Hero */}
            <section className="pt-32 pb-12 bg-gradient-to-b from-accent/10 to-background">
                <div className="container mx-auto px-4">
                    <Breadcrumbs items={breadcrumbs} className="mb-6" />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="font-[family-name:var(--font-bebas)] text-4xl md:text-6xl mb-4">
                            Avis Clients
                        </h1>
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-6 h-6 ${i < Math.floor(averageRating)
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : i < averageRating
                                                    ? 'fill-yellow-400/50 text-yellow-400'
                                                    : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-2xl font-bold">{averageRating}/5</span>
                        </div>
                        <p className="text-muted-foreground">
                            Basé sur {totalReviews} avis vérifiés
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Reviews Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.map((review, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="h-full bg-card border-none shadow-lg hover:shadow-xl transition-shadow">
                                    <CardContent className="p-6">
                                        <Quote className="w-8 h-8 text-primary/30 mb-4" />
                                        <div className="flex mb-3">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < review.rating
                                                            ? 'fill-yellow-400 text-yellow-400'
                                                            : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-foreground mb-4 leading-relaxed">
                                            "{review.text}"
                                        </p>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-semibold">{review.author}</span>
                                            <span className="text-muted-foreground">
                                                {new Date(review.date).toLocaleDateString('fr-FR', {
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-primary/5">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold mb-4">Prêt à vivre l'expérience ?</h2>
                    <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                        Rejoignez les milliers de visiteurs qui ont vécu des sensations inoubliables.
                    </p>
                    <Link
                        href="/fr/billetterie"
                        className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary/90 transition-colors shadow-lg"
                    >
                        Réserver maintenant →
                    </Link>
                </div>
            </section>
        </main>
    );
}
