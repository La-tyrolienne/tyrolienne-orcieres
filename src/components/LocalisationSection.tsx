'use client';

import { motion } from 'framer-motion';
import { MapPin, Navigation, Car } from 'lucide-react';
import Image from 'next/image';

export function LocalisationSection() {
    return (
        <section id="access" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-8 text-zinc-900 leading-tight">
                                Localisation <br />& Accès
                            </h2>

                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-black uppercase italic tracking-widest text-sm mb-2">Adresse</h4>
                                        <p className="text-zinc-600 font-medium text-lg">
                                            Sommet du Télémix Drouvet II<br />
                                            Station Orcières Merlette 1850<br />
                                            05170 Orcières, Hautes-Alpes
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                                        <Navigation className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-black uppercase italic tracking-widest text-sm mb-2">Accès Station</h4>
                                        <p className="text-zinc-600 font-medium text-lg">
                                            Embarquement via le Télémix Drouvet 1 puis 2.<br />
                                            Arrivée à 2650m d'altitude.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                                        <Car className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-black uppercase italic tracking-widest text-sm mb-2">Parking</h4>
                                        <p className="text-zinc-600 font-medium text-lg">
                                            Parking gratuit à disposition au pied de la station.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 w-full aspect-square md:aspect-video relative rounded-[2.5rem] overflow-hidden border border-zinc-100 shadow-2xl"
                    >
                        <Image
                            src="/access-map.png"
                            alt="Plan d'accès"
                            fill
                            className="object-contain p-8 md:p-12 hover:scale-105 transition-transform duration-700"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
