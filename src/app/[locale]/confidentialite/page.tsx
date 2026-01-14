'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function ConfidentialitePage() {
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
                        {t('privacy')}
                    </h1>

                    <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold uppercase mb-4">Collecte des données personnelles</h2>
                            <p className="text-muted-foreground">
                                Roll Air Cable collecte des données personnelles dans le cadre de la réservation de billets et de l'utilisation
                                de ses services. Les données collectées peuvent inclure : nom, prénom, adresse email, numéro de téléphone,
                                date de naissance, et informations de paiement.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold uppercase mb-4">Utilisation des données</h2>
                            <p className="text-muted-foreground">
                                Vos données personnelles sont utilisées pour :
                            </p>
                            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                                <li>Traiter vos réservations et paiements</li>
                                <li>Vous envoyer des confirmations et informations relatives à votre réservation</li>
                                <li>Assurer votre sécurité lors de l'activité</li>
                                <li>Améliorer nos services et votre expérience client</li>
                                <li>Vous informer de nos offres et actualités (si vous y avez consenti)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold uppercase mb-4">Conservation des données</h2>
                            <p className="text-muted-foreground">
                                Vos données personnelles sont conservées pendant une durée n'excédant pas celle nécessaire aux finalités
                                pour lesquelles elles sont collectées et traitées. Les données relatives aux transactions sont conservées
                                pendant la durée légale de conservation comptable (10 ans).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold uppercase mb-4">Vos droits</h2>
                            <p className="text-muted-foreground">
                                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
                            </p>
                            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                                <li>Droit d'accès à vos données personnelles</li>
                                <li>Droit de rectification de vos données</li>
                                <li>Droit à l'effacement de vos données</li>
                                <li>Droit à la limitation du traitement</li>
                                <li>Droit à la portabilité de vos données</li>
                                <li>Droit d'opposition au traitement</li>
                            </ul>
                            <p className="text-muted-foreground mt-4">
                                Pour exercer ces droits, contactez-nous à : <strong>privacy@rollaircable.com</strong>
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold uppercase mb-4">Cookies</h2>
                            <p className="text-muted-foreground">
                                Ce site utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont de petits fichiers
                                texte stockés sur votre appareil. Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
                            </p>
                            <p className="text-muted-foreground mt-4">
                                Types de cookies utilisés :
                            </p>
                            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                                <li><strong>Cookies essentiels</strong> : nécessaires au fonctionnement du site</li>
                                <li><strong>Cookies de préférences</strong> : mémorisent vos choix (langue, thème)</li>
                                <li><strong>Cookies analytiques</strong> : nous aident à comprendre l'utilisation du site</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold uppercase mb-4">Sécurité</h2>
                            <p className="text-muted-foreground">
                                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger
                                vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction.
                                Toutes les transactions de paiement sont chiffrées via le protocole SSL.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold uppercase mb-4">Contact</h2>
                            <p className="text-muted-foreground">
                                Pour toute question concernant cette politique de confidentialité, contactez notre délégué à la protection des données :<br /><br />
                                Email : privacy@rollaircable.com<br />
                                Adresse : Roll Air Cable, Station d'Orcières Merlette 1850, 05170 Orcières, France
                            </p>
                        </section>

                        <section className="border-t border-border pt-8">
                            <p className="text-sm text-muted-foreground">
                                Dernière mise à jour : Janvier 2026
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
