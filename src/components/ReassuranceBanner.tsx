'use client';

import { ShieldCheck, Users, HardHat, Info, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from './ui/button';

export function ReassuranceBanner() {
    const t = useTranslations('reassurance');

    const items = [
        { icon: Users, label: t('age') },
        { icon: ShieldCheck, label: t('team') },
        { icon: HardHat, label: t('security') },
        { icon: Info, label: t('briefing') },
    ];

    return (
        <section className="bg-zinc-50 border-y border-zinc-100 py-12">
            <div className="container mx-auto px-4 text-center">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 mb-10">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center gap-3"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black uppercase italic tracking-widest text-zinc-900 leading-tight">
                                {item.label}
                            </span>
                        </motion.div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 border-t border-zinc-100">
                    <Button
                        asChild
                        variant="outline"
                        className="w-full sm:w-auto rounded-xl border-2 border-zinc-200 hover:border-primary hover:text-primary transition-all font-black uppercase italic tracking-widest px-6 sm:px-8 text-sm"
                    >
                        <Link href="/informations" className="flex items-center gap-2">
                            {t('cta')}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="secondary"
                        className="w-full sm:w-auto rounded-xl bg-zinc-900 border-2 border-zinc-900 text-white hover:bg-zinc-800 transition-all font-black uppercase italic tracking-widest px-6 sm:px-8 text-sm"
                    >
                        <Link href="/billetterie#calendrier" className="flex items-center gap-2">
                            {t('calendar_check')}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
