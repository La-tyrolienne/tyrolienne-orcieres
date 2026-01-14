'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Shield, Zap, RefreshCw, UserCheck } from 'lucide-react';
import Image from 'next/image';

export function SafetySection() {
    const t = useTranslations('safety');

    const features = [
        { icon: Shield, label: t('harness') },
        { icon: Zap, label: t('braking') },
        { icon: RefreshCw, label: t('check') },
        { icon: UserCheck, label: t('staff') },
    ];

    return (
        <section className="py-24 bg-zinc-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                            <Image
                                src="/hero-summer.png"
                                alt="Sécurité Tyrolienne"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white rounded-3xl shadow-2xl p-8 flex flex-col justify-center items-center">
                            <Shield className="w-12 h-12 text-primary mb-4" />
                            <span className="text-center text-xs font-black uppercase tracking-widest text-zinc-900 leading-tight">Sécurité<br />Certifiée</span>
                        </div>
                    </motion.div>

                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-zinc-900 leading-[0.9]">
                                {t('title')}
                            </h2>
                            <p className="text-xl text-zinc-600 font-medium mb-12">
                                {t('description')}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-zinc-100 shadow-sm">
                                        <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                                            <feature.icon className="w-6 h-6" />
                                        </div>
                                        <span className="font-bold text-zinc-800 tracking-tight">
                                            {feature.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
