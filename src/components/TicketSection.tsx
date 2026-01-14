'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Ticket, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

import { useTheme } from './theme-provider';

export function TicketSection() {
    const t = useTranslations('tickets');
    const { season } = useTheme();

    const price = season === 'winter' ? t('priceWinter') : t('priceSummer');

    return (
        <section className="py-32 bg-zinc-50">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-zinc-100 overflow-hidden"
                >
                    {/* Seasonal Background Glow */}
                    <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-20 pointer-events-none ${season === 'winter' ? 'bg-blue-400' : 'bg-orange-400'}`} />

                    <div className="relative flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 text-center md:text-left">
                            <Badge className="mb-6 bg-primary font-black uppercase italic tracking-widest px-4 py-1.5 rounded-full border-0">
                                {t('groupCondition')} : {t('groupDiscount')}
                            </Badge>
                            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4 text-zinc-900 leading-none">
                                {t('title')}
                            </h2>
                            <p className="text-zinc-500 font-medium mb-8">
                                {t('subtitle')}
                            </p>

                            <div className="flex items-center justify-center md:justify-start gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100 italic">
                                <Ticket className="text-primary w-5 h-5" />
                                <span className="text-xs font-bold text-zinc-600 uppercase tracking-wider leading-relaxed">
                                    {t('reassurance')}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-6 min-w-[280px]">
                            <div className="text-center">
                                <span className="text-7xl md:text-8xl font-black italic tracking-tighter text-zinc-900 block leading-none">
                                    {price}
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                                    {t('priceNote')}
                                </span>
                            </div>

                            <Button
                                asChild
                                className="w-full py-8 text-lg font-black uppercase italic tracking-widest rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/30 hover:scale-105 transition-all"
                            >
                                <Link href="/billetterie">
                                    {t('book')}
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>

                            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                                <ShieldCheck className="w-3 h-3" />
                                {t('securePayment')}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
