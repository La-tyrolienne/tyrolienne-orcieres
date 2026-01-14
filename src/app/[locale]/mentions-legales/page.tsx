'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function MentionsLegalesPage() {
    const t = useTranslations('footer');

    return (
        <div className="min-h-screen bg-background pt-32 pb-24">
            <div className="container mx-auto max-w-4xl px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic mb-12">
                        {t('legal')}
                    </h1>

                    <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold uppercase mb-4">Éditeur du site</h2>
                            <p className="text-muted-foreground">
                                <strong>Roll Air Cable - Orcières Merlette</strong><br />
                                Station d'Orcières Merlette 1850<br />
                                05170 Orcières<br />
                                Hautes-Alpes, France<br /><br />
                                Téléphone : 06 84 44 88 10<br />
                                Email : info@latyrolienne.fr
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold uppercase mb-4">Directeur de la publication</h2>
                            <p className="text-muted-foreground">
                                Le directeur de la publication est le représentant légal de la société Roll Air Cable.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold uppercase mb-4">Hébergement</h2>
                            <p className="text-muted-foreground">
                                Ce site est hébergé par Vercel Inc.<br />
                                440 N Barranca Ave #4133<br />
                                Covina, CA 91723<br />
                                États-Unis
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold uppercase mb-4">Propriété intellectuelle</h2>
                            <p className="text-muted-foreground">
                                L'ensemble du contenu de ce site (textes, images, vidéos, logos, graphismes) est protégé par le droit d'auteur.
                                Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site,
                                quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Roll Air Cable.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold uppercase mb-4">Responsabilité</h2>
                            <p className="text-muted-foreground">
                                Les informations contenues sur ce site sont aussi précises que possible. Cependant, Roll Air Cable ne peut garantir
                                l'exactitude, la complétude et l'actualité des informations diffusées sur ce site. En conséquence, l'utilisateur
                                reconnaît utiliser ces informations sous sa responsabilité exclusive.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold uppercase mb-4">Crédits</h2>
                            <p className="text-muted-foreground">
                                Conception et développement : Roll Air Cable<br />
                                Photographies : © Roll Air Cable / Orcières Merlette
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
