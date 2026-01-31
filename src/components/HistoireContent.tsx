'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Mountain, Calendar, Ruler, Zap, Users, Award, MapPin, Heart } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from '@/components/theme-provider';

export function HistoireContent() {
    const t = useTranslations('histoire');
    const { season } = useTheme();

    const timeline = [
        {
            year: '2009',
            title: 'Naissance d\'un rêve',
            description: 'La tyrolienne Roll\'Air Cable voit le jour à Orcières Merlette, devenant immédiatement l\'une des attractions phares des Alpes du Sud.',
            icon: Calendar,
        },
        {
            year: '2010',
            title: 'Record d\'Europe',
            description: 'Avec ses 1870 mètres, Roll\'Air Cable est officiellement reconnue comme l\'une des plus longues tyroliennes d\'Europe.',
            icon: Award,
        },
        {
            year: 'Aujourd\'hui',
            title: 'Une aventure familiale',
            description: 'Roll\'Air Cable continue d\'émerveiller petits et grands, été comme hiver, dans un cadre exceptionnel.',
            icon: Heart,
        },
    ];

    const features = [
        { icon: Ruler, value: '1870m', label: 'de longueur' },
        { icon: Zap, value: '130 km/h', label: 'de vitesse max' },
        { icon: Mountain, value: '2655m', label: 'd\'altitude au départ' },
        { icon: MapPin, value: '155m', label: 'de dénivelé' },
    ];

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={season === 'winter' ? '/hero-winter-new.jpg' : '/hero-summer.png'}
                        alt="Tyrolienne Roll'Air Câble"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-white"
                    >
                        <span className="inline-block px-4 py-2 mb-4 md:mb-6 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-full bg-primary/80 backdrop-blur-sm">
                            Notre Histoire
                        </span>
                        <h1 className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-4 md:mb-6 uppercase tracking-tight">
                            Roll'Air Câble
                        </h1>
                        <p className="text-lg md:text-2xl text-white/80 max-w-3xl mx-auto font-light px-4">
                            Depuis 2009, la plus grande tyrolienne des Alpes vous fait vivre
                            une expérience unique à 130 km/h
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 md:py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                                    <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                                </div>
                                <p className="text-2xl md:text-4xl font-black text-foreground">{feature.value}</p>
                                <p className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">{feature.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="font-[family-name:var(--font-bebas)] text-3xl md:text-5xl text-center mb-10 md:mb-12">
                            Une aventure née dans les Alpes
                        </h2>

                        <div className="prose prose-base md:prose-lg dark:prose-invert mx-auto px-4">
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 md:mb-8">
                                Nichée au cœur de la station d'<strong>Orcières Merlette 1850</strong>, dans les Hautes-Alpes,
                                la tyrolienne <strong>Roll'Air Câble</strong> est bien plus qu'une simple attraction.
                                C'est une invitation à vivre un moment d'exception, suspendu entre ciel et terre.
                            </p>

                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 md:mb-8">
                                Inaugurée en <strong>2009</strong>, elle relie le sommet du <strong>Drouvet</strong> à 2655 mètres d'altitude
                                jusqu'au <strong>Lac Long</strong> à 2500 mètres. En moins de <strong>1 minute 30</strong>,
                                les participants survolent un panorama à couper le souffle : glaciers, sommets enneigés
                                et vallées verdoyantes selon la saison.
                            </p>

                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                                Accessible aux familles comme aux amateurs de sensations fortes,
                                Roll'Air Câble accueille chaque année des milliers de visiteurs venus du monde entier
                                pour vivre cette expérience unique. Une aventure <strong>100% sécurisée</strong>,
                                encadrée par une équipe de professionnels passionnés.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-16 md:py-24 bg-muted/20">
                <div className="container mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-[family-name:var(--font-bebas)] text-3xl md:text-5xl text-center mb-12 md:mb-16"
                    >
                        Notre parcours
                    </motion.h2>

                    <div className="max-w-6xl mx-auto">
                        {/* Horizontal Timeline Line */}
                        <div className="relative">
                            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary/20 transform -translate-y-1/2" />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {timeline.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.15 }}
                                        className="relative"
                                    >
                                        {/* Dot */}
                                        <div className="hidden md:flex absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-4 w-4 h-4 rounded-full bg-primary z-10" />

                                        <Card className="bg-card border-none shadow-lg h-full">
                                            <CardContent className="p-6 text-center">
                                                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                                                    <item.icon className="w-7 h-7 text-primary" />
                                                </div>
                                                <span className="text-2xl font-black text-primary block mb-2">{item.year}</span>
                                                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                                <p className="text-muted-foreground text-sm">{item.description}</p>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-[family-name:var(--font-bebas)] text-3xl md:text-5xl text-center mb-12 md:mb-16"
                    >
                        Notre équipe
                    </motion.h2>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    name: 'Régis Rochet',
                                    role: 'Co-fondateur & Gérant',
                                    description: 'Passionné de montagne, Régis accueille les visiteurs au départ et s\'assure que chaque vol commence en toute sécurité.',
                                },
                                {
                                    name: 'Denis Reynier',
                                    role: 'Co-fondateur & Gérant',
                                    description: 'Denis réceptionne les visiteurs à l\'arrivée et les oriente pour leur retour.',
                                },
                                {
                                    name: 'Noa Rochet',
                                    role: 'Communication & Digital',
                                    description: 'Noa gère la présence en ligne et l\'expérience client de Roll\'Air Câble.',
                                },
                            ].map((member, index) => (
                                <motion.div
                                    key={member.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Users className="w-10 h-10 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                    <p className="text-sm text-primary font-medium uppercase tracking-wider mb-3">{member.role}</p>
                                    <p className="text-muted-foreground text-sm">{member.description}</p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center text-muted-foreground mt-12 text-sm"
                        >
                            Une équipe familiale, passionnée et qualifiée, à votre service depuis 2009.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Location Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-[family-name:var(--font-bebas)] text-3xl md:text-5xl mb-6 md:mb-8">
                                Au cœur des Hautes-Alpes
                            </h2>
                            <p className="text-base md:text-lg text-muted-foreground mb-8">
                                Orcières Merlette est une station familiale des Hautes-Alpes, réputée pour son
                                ensoleillement exceptionnel (300 jours de soleil par an) et ses nombreuses activités
                                été comme hiver. La tyrolienne Roll'Air Câble est l'une des attractions phares de la station.
                            </p>
                            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                                <span className="px-3 md:px-4 py-1.5 md:py-2 bg-muted rounded-full text-xs md:text-sm font-medium">📍 Hautes-Alpes (05)</span>
                                <span className="px-3 md:px-4 py-1.5 md:py-2 bg-muted rounded-full text-xs md:text-sm font-medium">🏔️ 1850m - 2725m</span>
                                <span className="px-3 md:px-4 py-1.5 md:py-2 bg-muted rounded-full text-xs md:text-sm font-medium">☀️ 300 jours de soleil</span>
                                <span className="px-3 md:px-4 py-1.5 md:py-2 bg-muted rounded-full text-xs md:text-sm font-medium">👨‍👩‍👧‍👦 Station familiale</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}
