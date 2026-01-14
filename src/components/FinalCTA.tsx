'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="relative rounded-[3rem] overflow-hidden bg-primary p-12 md:p-24 text-center">
                    {/* Background Graphic Bits */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -ml-32 -mb-32" />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase italic leading-none tracking-tighter text-white mb-8">
                            Prêts à vivre cette expérience en famille ?
                        </h2>
                        <Button
                            asChild
                            size="lg"
                            className="bg-white text-primary hover:bg-zinc-100 font-black uppercase italic tracking-widest py-8 px-12 rounded-2xl shadow-2xl hover:scale-105 transition-all text-xl"
                        >
                            <a href="https://www.weezevent.com/widget_billeterie.php?id_evenement=774049&widget_key=E774049&locale=fr_FR&color_primary=00AEEF&code=61890&width_auto=1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                                Réserver maintenant
                                <ArrowRight className="w-6 h-6" />
                            </a>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
