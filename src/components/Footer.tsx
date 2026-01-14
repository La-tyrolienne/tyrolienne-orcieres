'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Footer() {
    const t = useTranslations('footer');
    const tNav = useTranslations('navigation');

    const socialLinks = [
        { icon: Facebook, href: 'https://facebook.com/rollaircable', label: 'Facebook' },
        { icon: Instagram, href: 'https://instagram.com/rollaircable.orcieres', label: 'Instagram' },
        { icon: Youtube, href: 'https://youtube.com/orcieres', label: 'YouTube' },
    ];

    const quickLinks = [
        { href: '/', label: tNav('home') },
        { href: '/billetterie', label: tNav('tickets') },
        { href: '/informations', label: tNav('info') },
        { href: '/histoire', label: tNav('histoire') },
    ];

    return (
        <footer className="bg-zinc-900 text-white overflow-hidden">
            {/* Final CTA Strip */}
            <div className="bg-primary py-12">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
                    <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter">
                        Prêt pour le grand saut ?
                    </h3>
                    <Button
                        asChild
                        size="lg"
                        className="bg-white text-zinc-900 hover:bg-zinc-100 font-black uppercase italic tracking-widest px-10 rounded-2xl shadow-xl hover:scale-105 transition-all overflow-hidden"
                    >
                        <Link href="/billetterie">{t('cta')}</Link>
                    </Button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-lg">R</span>
                            </div>
                            <h3 className="font-black uppercase italic text-lg tracking-tighter">Roll Air Cable</h3>
                        </div>
                        <p className="text-sm text-zinc-400 font-medium leading-relaxed">
                            {t('description')}
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center hover:bg-primary transition-colors duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-black uppercase italic tracking-widest text-xs mb-8 text-primary">Navigation</h4>
                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-zinc-400 hover:text-white transition-colors font-bold uppercase tracking-wider"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-black uppercase italic tracking-widest text-xs mb-8 text-primary">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4 text-sm text-zinc-400 font-bold">
                                <MapPin className="w-5 h-5 shrink-0 text-primary" />
                                <span>{t('station')}</span>
                            </li>
                            <li className="flex items-center gap-4 text-sm text-zinc-400 font-bold">
                                <Phone className="w-5 h-5 shrink-0 text-primary" />
                                <span>{t('phone')}</span>
                            </li>
                            <li className="flex items-center gap-4 text-sm text-zinc-400 font-bold">
                                <Mail className="w-5 h-5 shrink-0 text-primary" />
                                <span>info@latyrolienne.fr</span>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-black uppercase italic tracking-widest text-xs mb-8 text-primary">Légal</h4>
                        <ul className="space-y-4 text-sm text-zinc-400 font-bold">
                            <li>
                                <Link href="/mentions-legales" className="hover:text-white transition-colors uppercase tracking-wider">
                                    {t('legal')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/confidentialite" className="hover:text-white transition-colors uppercase tracking-wider">
                                    {t('privacy')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-zinc-800 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">
                        © {new Date().getFullYear()} Roll Air Cable - Orcières Merlette. {t('rights')}.
                    </p>
                </div>
            </div>
        </footer>
    );
}
