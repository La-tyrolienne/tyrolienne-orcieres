'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function TimelineSection() {
    const t = useTranslations('timeline');

    const steps = [
        { id: 1, label: t('step1') },
        { id: 2, label: t('step2') },
        { id: 3, label: t('step3') },
        { id: 4, label: t('step4') },
        { id: 5, label: t('step5') },
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-4 text-zinc-900">
                        {t('title')}
                    </h2>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[4.5rem] left-[10%] right-[10%] h-1 bg-zinc-100 -z-10">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="h-full bg-primary"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="flex flex-col items-center text-center relative"
                            >
                                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-black italic text-xl shadow-lg shadow-primary/30 mb-6 border-4 border-white">
                                    {step.id}
                                </div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900 px-4 py-2 bg-zinc-50 rounded-xl border border-zinc-100 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    {step.label}
                                </h3>

                                {/* Vertical Line (Mobile) */}
                                {index < steps.length - 1 && (
                                    <div className="md:hidden absolute top-[3rem] left-1/2 -translate-x-1/2 h-12 w-1 bg-zinc-100 -z-10" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
