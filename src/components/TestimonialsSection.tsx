'use client';

import { motion } from 'framer-motion';
import { Star, Quote, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const testimonials = [
    {
        name: 'Marie L.',
        rating: 5,
        text: "Très bonne expérience. Le plaisir du vol en toute sécurité. Des sensations douces vraiment accessibles pour tout le monde. Tyrolienne dans un cadre magnifique. Voir son ombre filer au sol, observer les marmottes de haut, un régal. Un accueil au top !",
        verified: true,
    },
    {
        name: 'Thomas B.',
        rating: 5,
        text: "La tyrolienne que nous avons testée était incroyable ! La vue était absolument spectaculaire et nous offrait un panorama à couper le souffle. La sensation de flotter au-dessus du paysage est inoubliable. On se sent vraiment tout petit en survolant le câble. Une aventure mémorable à ne pas manquer !",
        date: 'Août 2025',
        verified: true,
    },
    {
        name: 'Sophie M.',
        rating: 5,
        text: "On s'est régalés !!! On a été super bien conseillés par les deux personnes du Roll'Air Câble. Aucune sensation de vertige, juste un sentiment de bien-être, de voler comme un oiseau. La dame a pu me filmer et m'envoyer la vidéo. C'est super gentil ! Au bout, un sentier pédestre permet de découvrir de nombreux lacs. C'est très joli. Je recommande vivement !",
        verified: true,
    },
];

export function TestimonialsSection() {
    return (
        <section className="py-16 md:py-24 bg-muted/20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <span className="text-lg font-bold">4.4/5</span>
                        <span className="text-muted-foreground text-sm">(36 avis Google)</span>
                    </div>
                    <h2 className="font-[family-name:var(--font-bebas)] text-3xl md:text-5xl mb-4">
                        Ce que nos visiteurs disent
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Des milliers de visiteurs ont vécu l'expérience Roll'Air Câble
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full bg-background border-border/50 hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    {/* Quote Icon */}
                                    <Quote className="w-8 h-8 text-primary/20 mb-4" />

                                    {/* Rating */}
                                    <div className="flex gap-0.5 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>

                                    {/* Text */}
                                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                                        "{testimonial.text}"
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-sm">{testimonial.name}</p>
                                            {testimonial.date && (
                                                <p className="text-xs text-muted-foreground">{testimonial.date}</p>
                                            )}
                                        </div>
                                        {testimonial.verified && (
                                            <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                                                <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                                </svg>
                                                <span>Avis Google</span>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* CTA to Google Reviews */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-10"
                >
                    <Button
                        variant="outline"
                        asChild
                        className="gap-2"
                    >
                        <a
                            href="https://www.google.com/maps/place/Roll'Air+C%C3%A2ble/@44.6947,6.3264,17z/data=!4m8!3m7!1s0x0:0x0!8m2!3d44.6947!4d6.3264!9m1!1b1!16s"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Voir tous les avis sur Google
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
