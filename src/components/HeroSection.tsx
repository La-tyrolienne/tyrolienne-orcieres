'use client';

import { useTheme } from './theme-provider';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, Zap, Mountain, Clock, Ruler } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Lazy load animations - not critical for initial render
const SkierAnimation = dynamic(() => import('./SkierAnimation').then(mod => ({ default: mod.SkierAnimation })), {
    ssr: false,
    loading: () => null,
});

const Snowfall = dynamic(() => import('./Snowfall').then(mod => ({ default: mod.Snowfall })), {
    ssr: false,
    loading: () => null,
});

export function HeroSection() {
    const { season } = useTheme();
    const t = useTranslations('hero');
    const tStats = useTranslations('stats');
    const { scrollY } = useScroll();

    const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const scale = useTransform(scrollY, [0, 400], [1, 0.9]);

    const stats = [
        { icon: Ruler, label: tStats('length'), value: tStats('lengthValue') },
        { icon: Zap, label: tStats('speed'), value: tStats('speedValue') },
        { icon: Mountain, label: tStats('altitude'), value: tStats('altitudeValue') },
        { icon: Clock, label: tStats('duration'), value: tStats('durationValue') },
    ];

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Dynamic Background */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 z-0"
            >
                <div className="relative w-full h-full">
                    {/* Winter Image */}
                    <motion.div
                        initial={false}
                        animate={{ opacity: season === 'winter' ? 1 : 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src="/hero-winter-new.jpg"
                            alt="Tyrolienne hiver"
                            fill
                            className="object-cover"
                            priority
                            quality={85}
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
                    </motion.div>

                    {/* Summer Image */}
                    <motion.div
                        initial={false}
                        animate={{ opacity: season === 'summer' ? 1 : 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src="/hero-summer.png"
                            alt="Tyrolienne été"
                            fill
                            className="object-cover"
                            loading="lazy"
                            quality={75}
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
                    </motion.div>
                </div>
            </motion.div>

            {/* Snow/Summer particles */}
            {season === 'winter' && <Snowfall />}

            {/* Skier Animation */}
            <SkierAnimation />

            {/* Content */}
            <motion.div
                style={{ opacity, scale }}
                className="relative z-10 container mx-auto px-4 text-center pt-24 md:pt-32 pb-32 md:pb-48"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <span className="inline-block px-4 md:px-6 py-2 mb-6 md:mb-8 text-xs md:text-sm font-bold uppercase tracking-[0.2em] rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20">
                        {season === 'winter' ? '❄️ Winter Edition' : '☀️ Summer Edition'}
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl md:text-7xl lg:text-9xl text-white mb-8 md:mb-12 uppercase drop-shadow-2xl leading-[1.1] md:leading-[0.9] tracking-tight md:tracking-wide"
                >
                    {t('titleLine1')} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-accent">Roll'Air Câble</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <Button
                        asChild
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-white text-lg font-bold px-10 py-7 rounded-full shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all hover:scale-110 hover:shadow-[0_0_50px_rgba(var(--primary),0.8)] uppercase tracking-wider"
                    >
                        <Link href="/billetterie">{t('cta')}</Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="bg-white/5 border-2 border-white/50 text-white text-lg font-bold px-8 py-7 rounded-full backdrop-blur-sm hover:bg-white/20 hover:border-white transition-all uppercase tracking-wider"
                    >
                        <Link href="/histoire">{t('scroll')}</Link>
                    </Button>
                </motion.div>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent pt-12 pb-8"
            >
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 + index * 0.1 }}
                                className="flex items-center gap-4 justify-center"
                            >
                                <stat.icon className="w-8 h-8 text-accent drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                                <div className="text-left">
                                    <p className="text-3xl font-black text-white italic leading-none">{stat.value}</p>
                                    <p className="text-xs font-bold text-white/60 uppercase tracking-widest">{stat.label}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>


        </section>
    );
}
