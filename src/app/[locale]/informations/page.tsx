'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { MapPin, Shirt, CheckCircle, Mountain, Clock, Users, AlertTriangle, ThumbsUp, Navigation, Shield, Wind, Footprints } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import Image from 'next/image';

export default function InformationsPage() {
    const t = useTranslations('info');
    const { season } = useTheme();
    const [openDialog, setOpenDialog] = useState<number | null>(null);

    const steps = [
        {
            icon: Mountain,
            number: '01',
            title: 'Accès au sommet',
            description: 'Prenez les télémix Drouvet 1 & 2 jusqu\'au point de départ à 2650m d\'altitude.',
            hasVisualRoute: true,
            details: {
                title: '🗺️ Accès piétons à la tyrolienne',
                routeSteps: [
                    { step: '1', title: 'Caisses', subtitle: 'Achat forfait', desc: 'À côté de la pharmacie, bas de station', color: 'bg-blue-500' },
                    { step: '2', title: 'Drouvet 1', subtitle: 'Télémix', desc: 'Départ front de neige', color: 'bg-gray-500' },
                    { step: '3', title: 'Drouvet 2', subtitle: 'Télémix', desc: 'Correspondance', color: 'bg-gray-500' },
                    { step: '4', title: 'Tyrolienne', subtitle: 'Arrivée', desc: 'Sommet 2650m', color: 'bg-primary' },
                ],
                info: '⚠️ Le forfait remontées mécaniques est obligatoire pour accéder à la tyrolienne. Les caisses se situent à côté de la pharmacie en bas de la station.',
            }
        },
        {
            icon: Shirt,
            number: '02',
            title: 'Équipement',
            description: 'L\'équipe vous équipe du harnais professionnel et vous brief sur les consignes de sécurité.',
            details: {
                title: '🦺 Équipement & Sécurité',
                content: [
                    { icon: Shield, label: 'Harnais', value: 'Harnais professionnel double attache' },
                    { icon: CheckCircle, label: 'Système', value: 'Freinage automatique à l\'arrivée' },
                    { icon: Users, label: 'Briefing', value: 'Consignes de sécurité avant chaque vol' },
                ],
                info: 'Tout l\'équipement est fourni et vérifié avant chaque vol. Vous n\'avez rien à apporter. L\'équipe professionnelle vous accompagne du début à la fin.'
            }
        },
        {
            icon: Clock,
            number: '03',
            title: 'Le vol',
            description: '1min 20s de vol en position Superman à plus de 120m au-dessus du sol, jusqu\'à 130km/h.',
            details: {
                title: '🚀 L\'expérience du vol',
                content: [
                    { icon: Clock, label: 'Durée', value: '1 minute 20 secondes' },
                    { icon: Wind, label: 'Vitesse max', value: 'Jusqu\'à 130 km/h' },
                    { icon: Mountain, label: 'Altitude', value: '120m au-dessus du sol' },
                ],
                info: 'Vous volerez en position "Superman" (allongé face vers le bas) pour une sensation unique. Vue panoramique exceptionnelle sur la vallée et les sommets environnants.'
            }
        },
        {
            icon: Users,
            number: '04',
            title: 'Arrivée',
            description: 'Marche de 15 minutes jusqu\'à Rocherousse pour reprendre les remontées mécaniques.',
            details: {
                title: '🚶 Retour à la station',
                content: [
                    { icon: Footprints, label: 'Marche', value: '~15 minutes de descente' },
                    { icon: MapPin, label: 'Destination', value: 'Retour vers Rocherousse' },
                    { icon: Navigation, label: 'Remontées', value: 'Reprise des télésièges' },
                ],
                info: 'Après l\'arrivée, une courte marche de 15 minutes vous ramène vers le télésiège de Rocherousse. Chemin balisé et facile, accessible à tous.'
            }
        },
    ];

    const requirements = [
        { icon: CheckCircle, text: 'Âge minimum : 6-7 ans (selon adaptation du harnais)', ok: true },
        { icon: CheckCircle, text: 'Poids : entre 20 et 130 kg', ok: true },
        { icon: ThumbsUp, text: 'Bonne condition physique recommandée', ok: true },
        { icon: AlertTriangle, text: 'Personnes à mobilité réduite : nous contacter', ok: false },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Banner */}
            <div className="relative h-[40vh] md:h-[50vh] min-h-[300px] md:min-h-[400px] flex items-center justify-center overflow-hidden">
                <Image
                    src={season === 'winter' ? '/hero-winter.png' : '/hero-summer.png'}
                    alt="Informations pratiques"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />
                <div className="relative z-10 text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl md:text-7xl text-white drop-shadow-2xl mb-4"
                    >
                        {t('title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
                    >
                        Tout ce que vous devez savoir avant votre vol
                    </motion.p>
                </div>
            </div>

            {/* How it works */}
            <section className="py-12 md:py-24 px-4">
                <div className="container mx-auto max-w-6xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-[family-name:var(--font-bebas)] text-3xl md:text-5xl text-center mb-4"
                    >
                        Comment ça marche
                    </motion.h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12 md:mt-16">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="relative"
                            >
                                <Card
                                    className="bg-muted/30 border-2 border-transparent h-full relative overflow-hidden group hover:bg-muted/50 hover:border-primary/30 transition-all cursor-pointer hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10"
                                    onClick={() => setOpenDialog(index)}
                                >
                                    {/* Expand icon indicator */}
                                    <div className="absolute top-4 left-4 w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center opacity-60 group-hover:opacity-100 group-hover:bg-primary group-hover:text-white transition-all group-hover:scale-110">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                        </svg>
                                    </div>
                                    <div className="absolute top-4 right-4 text-6xl md:text-8xl font-black text-primary/10 group-hover:text-primary/20 transition-colors">
                                        {step.number}
                                    </div>
                                    <CardContent className="p-5 md:p-6 pt-12 md:pt-14 relative z-10">
                                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all group-hover:scale-110 group-hover:rotate-3">
                                            <step.icon className="w-6 h-6 md:w-7 md:h-7" />
                                        </div>
                                        <h3 className="text-lg md:text-xl font-bold uppercase mb-2 md:mb-3">{step.title}</h3>
                                        <p className="text-sm md:text-base text-muted-foreground">{step.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Step Detail Dialogs */}
            {steps.map((step, index) => (
                <Dialog key={step.number} open={openDialog === index} onOpenChange={(open) => setOpenDialog(open ? index : null)}>
                    <DialogContent className={step.hasVisualRoute ? "max-w-2xl" : "max-w-lg"}>
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center">
                                    <step.icon className="w-5 h-5" />
                                </div>
                                {step.details.title}
                            </DialogTitle>
                        </DialogHeader>

                        {/* Visual Route for Step 1 */}
                        {step.hasVisualRoute && step.details.routeSteps ? (
                            <div className="mt-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Visual route diagram */}
                                    <div className="bg-muted/20 rounded-xl p-4">
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Parcours</p>
                                        <div className="space-y-0">
                                            {step.details.routeSteps.map((routeStep: { step: string, title: string, subtitle: string, desc: string, color: string }, i: number) => (
                                                <div key={i} className="relative">
                                                    <div className="flex items-start gap-3">
                                                        <div className="flex flex-col items-center">
                                                            <div className={`w-10 h-10 rounded-full ${routeStep.color} text-white flex items-center justify-center font-bold text-lg shadow-lg z-10`}>
                                                                {routeStep.step}
                                                            </div>
                                                            {i < step.details.routeSteps.length - 1 && (
                                                                <div className="w-0.5 h-8 bg-gradient-to-b from-gray-400 to-gray-300 my-1"></div>
                                                            )}
                                                        </div>
                                                        <div className="pt-1.5">
                                                            <p className="font-bold">{routeStep.title}</p>
                                                            <p className="text-xs text-primary font-medium">{routeStep.subtitle}</p>
                                                            <p className="text-xs text-muted-foreground">{routeStep.desc}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Info list */}
                                    <div className="space-y-3">
                                        <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                            <p className="text-xs font-bold text-blue-600 mb-1">🎫 Où acheter le forfait</p>
                                            <p className="text-sm">Caisses des remontées mécaniques</p>
                                            <p className="text-xs text-muted-foreground">À côté de la pharmacie, en bas de la station</p>
                                        </div>
                                        <div className="p-3 bg-muted/30 rounded-lg">
                                            <p className="text-xs font-bold mb-1">🚡 Remontées à prendre</p>
                                            <p className="text-sm">Télémix Drouvet 1 → Télémix Drouvet 2</p>
                                            <p className="text-xs text-muted-foreground">~15 min de montée</p>
                                        </div>
                                        <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                                            <p className="text-xs font-bold text-primary mb-1">📍 Départ tyrolienne</p>
                                            <p className="text-sm">Sommet Drouvet 2 • 2650m</p>
                                            <p className="text-xs text-muted-foreground">Équipe sur place pour vous accueillir</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Standard content layout for other steps */}
                                <div className="space-y-4 mt-4">
                                    {step.details.content?.map((item: { icon: React.ElementType, label: string, value: string }, i: number) => (
                                        <div key={i} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                                            <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">{item.label}</p>
                                                <p className="font-medium">{item.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        <DialogDescription className="mt-4 p-4 bg-orange-500/5 rounded-lg border border-orange-500/20">
                            {step.details.info}
                        </DialogDescription>
                    </DialogContent>
                </Dialog>
            ))}

            {/* Requirements & Equipment */}
            <section className="py-16 md:py-24 bg-muted/20">
                <div className="container mx-auto max-w-6xl px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                        {/* Conditions */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="font-[family-name:var(--font-bebas)] text-2xl md:text-3xl mb-6 md:mb-8">
                                {t('conditions.title')}
                            </h2>
                            <div className="space-y-3 md:space-y-4">
                                {requirements.map((req, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl ${req.ok ? 'bg-green-500/10' : 'bg-orange-500/10'
                                            }`}
                                    >
                                        <req.icon className={`w-5 h-5 md:w-6 md:h-6 ${req.ok ? 'text-green-500' : 'text-orange-500'}`} />
                                        <span className="text-sm md:font-medium">{req.text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Equipment */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="font-[family-name:var(--font-bebas)] text-2xl md:text-3xl mb-6 md:mb-8 mt-8 md:mt-0">
                                {t('equipment.title')}
                            </h2>
                            <Card className="bg-muted/30 border-none">
                                <CardContent className="p-6 md:p-8">
                                    <div className="space-y-5 md:space-y-6">
                                        <div>
                                            <h3 className="font-bold text-base md:text-lg mb-2 flex items-center gap-2">
                                                ❄️ En Hiver
                                            </h3>
                                            <p className="text-sm md:text-base text-muted-foreground">{t('equipment.winter')}</p>
                                        </div>
                                        <div className="border-t border-border pt-5 md:pt-6">
                                            <h3 className="font-bold text-base md:text-lg mb-2 flex items-center gap-2">
                                                ☀️ En Été
                                            </h3>
                                            <p className="text-sm md:text-base text-muted-foreground">{t('equipment.summer')}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
