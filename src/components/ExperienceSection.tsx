'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Weight,
    MapPin,
    ShieldCheck,
    Play,
    X,
    Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export function ExperienceSection() {
    const t = useTranslations('experience');
    const [isMapOpen, setIsMapOpen] = useState(false);

    const practicalInfo = [
        { icon: Users, label: t('usefulInfo.age'), value: t('usefulInfo.ageValue'), actionable: false },
        { icon: Weight, label: t('usefulInfo.weight'), value: t('usefulInfo.weightValue'), actionable: false },
        { icon: MapPin, label: t('usefulInfo.access'), value: t('usefulInfo.accessValue'), actionable: true },
        { icon: ShieldCheck, label: t('usefulInfo.equipment'), value: t('usefulInfo.equipmentValue'), actionable: false },
    ];

    return (
        <section id="experience" className="relative py-24 overflow-hidden bg-background/50 backdrop-blur-sm">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4">
                {/* Title Row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-12 lg:mb-20 text-center lg:text-left"
                >
                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase italic leading-[0.8] tracking-tighter max-w-4xl">
                        {t('title')}
                    </h2>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
                    {/* Video Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 relative group"
                    >
                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                            <video
                                className="w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                                poster="/hero-winter-new.jpg"
                            >
                                <source src="/experience-video.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />

                            <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg animate-pulse">
                                    <Play className="w-5 h-5 fill-current" />
                                </div>
                                <span className="text-white font-bold uppercase tracking-widest text-sm drop-shadow-md">
                                    Aperçu Vidéo
                                </span>
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 season-gradient rounded-full blur-2xl opacity-30 animate-pulse" />
                    </motion.div>

                    {/* Content Side */}
                    <div className="lg:w-1/2 flex flex-col justify-between h-full min-h-full">
                        {/* Practical Info List */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-white/5 backdrop-blur-md rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                            <h3 className="text-xl font-black uppercase italic mb-10 flex items-center gap-4">
                                <div className="w-2 h-8 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                                {t('usefulInfo.title')}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-12">
                                {practicalInfo.map((info) => (
                                    <div
                                        key={info.label}
                                        onClick={info.actionable ? () => setIsMapOpen(true) : undefined}
                                        className={`flex items-start gap-5 group/item transition-all duration-300 ${info.actionable ? 'cursor-pointer hover:bg-white/10 p-4 -m-4 rounded-2xl bg-primary/5 border border-primary/20 shadow-lg' : ''}`}
                                    >
                                        <div className={`mt-1 p-3 rounded-xl bg-background border border-border text-primary shadow-lg transition-all duration-300 ${info.actionable ? 'scale-110 bg-primary text-white border-primary shadow-primary/20' : ''}`}>
                                            <info.icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground leading-none">
                                                {info.label}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <p className="font-bold text-lg leading-tight">
                                                    {info.value}
                                                </p>
                                                {info.actionable && <Maximize2 className="w-4 h-4 text-primary animate-pulse ml-1" />}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <div className="mt-12 flex items-center gap-6">
                            <Button asChild size="lg" className="w-full sm:w-auto rounded-full px-8 md:px-12 py-6 md:py-8 text-base md:text-xl font-black uppercase italic tracking-wider season-gradient shadow-[0_10px_30px_rgba(var(--primary),0.3)] hover:scale-105 transition-all active:scale-95">
                                <Link href="/billetterie">Réserver mon vol</Link>
                            </Button>
                            <div className="hidden sm:block text-muted-foreground font-bold italic text-sm">
                                <p>Plus de 1.8km de descente pure</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Modal */}
            <AnimatePresence>
                {isMapOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-2xl"
                        onClick={() => setIsMapOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-6xl overflow-hidden bg-[#f8f9fa] rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/20"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col md:flex-row h-full">
                                {/* Map View */}
                                <div className="relative w-full md:w-2/3 aspect-square md:aspect-auto min-h-[400px] bg-white">
                                    <Image
                                        src="/access-map.png"
                                        alt="Plan d'accès Tyrolienne Orcières"
                                        fill
                                        className="object-contain p-8"
                                    />
                                </div>

                                {/* Info Sidebar */}
                                <div className="w-full md:w-1/3 p-8 md:p-12 bg-zinc-900 text-white flex flex-col justify-between border-l border-white/10">
                                    <div>
                                        <div className="flex justify-between items-start mb-10">
                                            <h4 className="text-3xl font-black uppercase italic tracking-tighter leading-none">
                                                Plan &<br />Infos Tickets
                                            </h4>
                                            <button
                                                onClick={() => setIsMapOpen(false)}
                                                className="md:hidden p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                            >
                                                <X className="w-6 h-6" />
                                            </button>
                                        </div>

                                        <div className="space-y-8">
                                            <div className="bg-primary/20 rounded-2xl p-6 border border-primary/30">
                                                <p className="text-primary font-black uppercase tracking-widest text-xs mb-3">Conseil d'accès</p>
                                                <p className="text-lg font-bold leading-snug">
                                                    Prendre les télémix Drouvet 1 & 2 pour atteindre le sommet à 2650m.
                                                </p>
                                            </div>

                                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                                <p className="text-zinc-400 font-black uppercase tracking-widest text-xs mb-3">Billetterie Remontées</p>
                                                <p className="text-lg font-bold leading-snug">
                                                    {t('ticketsInfo')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-12">
                                        <button
                                            onClick={() => setIsMapOpen(false)}
                                            className="hidden md:flex w-full items-center justify-center gap-2 py-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all font-bold uppercase tracking-widest text-sm border border-white/10"
                                        >
                                            <X className="w-4 h-4" /> Fermer le plan
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
