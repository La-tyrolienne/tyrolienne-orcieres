'use client';

import { useTheme } from './theme-provider';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Snowflake, Sun, Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Header() {
    const { season, toggleSeason } = useTheme();
    const t = useTranslations('navigation');
    const tTheme = useTranslations('theme');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const switchLocale = () => {
        const newLocale = locale === 'fr' ? 'en' : 'fr';
        // Get the current path from window to ensure accuracy
        const currentPath = typeof window !== 'undefined' ? window.location.pathname : pathname;

        // Remove any existing locale prefix
        let pathWithoutLocale = currentPath.replace(/^\/(fr|en)(\/|$)/, '/');
        if (pathWithoutLocale === '' || pathWithoutLocale === '/en' || pathWithoutLocale === '/fr') {
            pathWithoutLocale = '/';
        }

        // Build the new path
        let newPath: string;
        if (newLocale === 'fr') {
            // French is default, no prefix needed
            newPath = pathWithoutLocale;
        } else {
            // English needs /en prefix
            newPath = pathWithoutLocale === '/' ? '/en' : `/en${pathWithoutLocale}`;
        }

        // Use window.location for reliable navigation
        window.location.href = newPath;
    };

    const navItems = [
        { href: '/', label: t('home') },
        { href: '/billetterie', label: t('tickets') },
        { href: '/informations', label: t('info') },
        { href: '/histoire', label: t('histoire') },
    ];

    const SeasonToggle = () => (
        <button
            onClick={toggleSeason}
            className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all min-h-[44px] min-w-[44px] justify-center"
        >
            <AnimatePresence mode="wait">
                {season === 'winter' ? (
                    <motion.div
                        key="winter"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2"
                    >
                        <Snowflake className="h-5 w-5 sm:h-4 sm:w-4 text-blue-300" />
                        <span className="hidden sm:block text-xs font-bold uppercase tracking-wider text-white">{tTheme('winter')}</span>
                    </motion.div>
                ) : (
                    <motion.div
                        key="summer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2"
                    >
                        <Sun className="h-5 w-5 sm:h-4 sm:w-4 text-orange-300" />
                        <span className="hidden sm:block text-xs font-bold uppercase tracking-wider text-white">{tTheme('summer')}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );

    const LocaleToggle = () => (
        <button
            onClick={switchLocale}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all text-white min-h-[44px] min-w-[44px] justify-center"
        >
            <Globe className="h-5 w-5 sm:h-4 sm:w-4" />
            <span className="uppercase text-sm sm:text-xs font-bold">{locale}</span>
        </button>
    );

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled
                ? 'bg-black/80 backdrop-blur-md py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-4">
                <nav className="flex items-center justify-between">
                    {/* Left: Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-60 h-[72px]">
                            <Image
                                src="/logo-transparent.png"
                                alt="Roll'Air Câble"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="hidden sm:block text-white font-black uppercase italic tracking-tight text-xl">
                            Roll&apos;Air Câble
                        </span>
                    </Link>

                    {/* Center: Navigation Links */}
                    <div className="hidden lg:flex items-center justify-center gap-10 absolute left-1/2 -translate-x-1/2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative text-sm font-bold uppercase tracking-widest text-white hover:text-primary transition-colors group"
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}
                    </div>

                    {/* Right: Season Toggle + Locale + CTA */}
                    <div className="hidden lg:flex items-center gap-3">
                        <SeasonToggle />
                        <LocaleToggle />
                        <Button
                            asChild
                            className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest px-6 py-5 rounded-full shadow-lg shadow-primary/30 hover:scale-105 transition-all text-sm"
                        >
                            <a href="https://www.weezevent.com/widget_billeterie.php?id_evenement=774049&widget_key=E774049&locale=fr_FR&color_primary=00AEEF&code=61890&width_auto=1" target="_blank" rel="noopener noreferrer">{t('book')}</a>
                        </Button>
                    </div>

                    {/* Mobile: Menu Button */}
                    <div className="lg:hidden flex items-center gap-2">
                        <SeasonToggle />
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-3 rounded-xl text-white min-h-[44px] min-w-[44px] flex items-center justify-center bg-white/10 hover:bg-white/20 transition-all"
                            aria-label="Menu"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/10 p-8 flex flex-col gap-8"
                    >
                        <div className="flex flex-col gap-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-2xl font-black uppercase tracking-tighter text-white"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        <div className="flex items-center justify-between pt-6 border-t border-white/10">
                            <LocaleToggle />
                            <Button
                                asChild
                                className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest px-6 rounded-full"
                            >
                                <a href="https://www.weezevent.com/widget_billeterie.php?id_evenement=774049&widget_key=E774049&locale=fr_FR&color_primary=00AEEF&code=61890&width_auto=1" target="_blank" rel="noopener noreferrer">{t('book')}</a>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
