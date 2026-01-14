'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FAQSection() {
    const t = useTranslations('faq');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const questions = [
        { q: t('q1'), a: t('a1') },
        { q: t('q2'), a: t('a2') },
        { q: t('q3'), a: t('a3') },
        { q: t('q4'), a: t('a4') },
        { q: t('q5'), a: t('a5') },
    ];

    return (
        <section className="py-24 bg-zinc-50">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                        <HelpCircle className="w-5 h-5" />
                        <span className="text-sm font-black uppercase tracking-widest leading-none">Questions Fréquentes</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-zinc-900">
                        {t('title')}
                    </h2>
                </div>

                <div className="space-y-4">
                    {questions.map((item, index) => (
                        <div key={index} className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm hover:border-primary/30 transition-colors duration-300">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="text-lg font-bold text-zinc-900 pr-8">{item.q}</span>
                                <ChevronDown
                                    className={`w-6 h-6 text-primary transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-zinc-600 font-medium leading-relaxed border-t border-zinc-100 pt-4 bg-zinc-50/50">
                                            {item.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
