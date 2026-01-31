'use client';

import { motion } from 'framer-motion';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQContentProps {
    items: FAQItem[];
}

export function FAQContent({ items }: FAQContentProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const breadcrumbs = [
        { label: 'Accueil', href: '/fr' },
        { label: 'FAQ', href: '/fr/faq' },
    ];

    return (
        <main className="min-h-screen bg-background">
            {/* Hero */}
            <section className="pt-32 pb-12 bg-gradient-to-b from-primary/10 to-background">
                <div className="container mx-auto px-4">
                    <Breadcrumbs items={breadcrumbs} className="mb-6" />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="font-[family-name:var(--font-bebas)] text-4xl md:text-6xl mb-4">
                            Questions Fréquentes
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Tout ce que vous devez savoir avant votre vol en tyrolienne
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Accordion */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="space-y-4">
                        {items.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="border border-border rounded-xl overflow-hidden bg-card"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors"
                                >
                                    <h2 className="font-semibold text-lg">{item.question}</h2>
                                    <ChevronDown
                                        className={`w-5 h-5 text-primary transition-transform flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>
                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: openIndex === index ? 'auto' : 0,
                                        opacity: openIndex === index ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <p className="px-6 pb-5 text-muted-foreground leading-relaxed">
                                        {item.answer}
                                    </p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-primary/5">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold mb-4">Vous avez d'autres questions ?</h2>
                    <p className="text-muted-foreground mb-6">
                        Contactez-nous par téléphone ou consultez nos informations pratiques.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="tel:+33684448810"
                            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors"
                        >
                            📞 06 84 44 88 10
                        </a>
                        <a
                            href="/fr/informations"
                            className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-full font-semibold hover:bg-primary/10 transition-colors"
                        >
                            Infos pratiques →
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
