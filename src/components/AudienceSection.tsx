'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Baby, User, Users } from 'lucide-react';

export function AudienceSection() {
    const t = useTranslations('audiences');

    const audiences = [
        {
            key: 'families',
            icon: Baby,
            color: 'bg-blue-50 text-blue-600 border-blue-100',
        },
        {
            key: 'adults',
            icon: User,
            color: 'bg-purple-50 text-purple-600 border-purple-100',
        },
        {
            key: 'groups',
            icon: Users,
            color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        },
    ];

    return (
        <section className="py-16 md:py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12 md:gap-20 items-center">
                    <div className="lg:w-1/2">
                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl sm:text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-8 md:mb-16 text-zinc-900 leading-[1.1] md:leading-[0.9]"
                        >
                            {t('sectionTitle')} <br />
                            <span className="text-primary text-xl sm:text-2xl md:text-5xl">{t('sectionSubtitle')}</span>
                        </motion.h2>

                        <div className="space-y-6">
                            {audiences.map((audience, index) => (
                                <motion.div
                                    key={audience.key}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`flex items-center gap-8 p-8 rounded-[2rem] border transition-all duration-300 ${audience.key === 'families'
                                        ? 'bg-zinc-900 text-white border-zinc-800 shadow-2xl scale-105 z-10'
                                        : 'bg-zinc-50 border-zinc-100 text-zinc-900'
                                        }`}
                                >
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${audience.key === 'families' ? 'bg-primary text-white' : 'bg-white shadow-sm text-primary'
                                        }`}>
                                        <audience.icon className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black uppercase italic mb-1 tracking-tight">
                                            {t(`${audience.key}.title`)}
                                        </h3>
                                        <p className={`text-sm font-medium ${audience.key === 'families' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                                            {t(`${audience.key}.description`)}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        className="lg:w-1/2 relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-black"
                    >
                        {/* Video Block - Replace src with your video file */}
                        <video
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                            poster="/hero-winter.png"
                        >
                            {/* Add your video source here */}
                            <source src="/videos/tyrolienne.mp4" type="video/mp4" />
                            {t('videoFallback')}
                        </video>
                        {/* Play overlay icon */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
                            <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                                <svg className="w-8 h-8 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
