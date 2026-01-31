'use client';

import { motion } from 'framer-motion';

export function CGVContent() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-24">
            <div className="container mx-auto max-w-4xl px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic mb-12">
                        Conditions Générales de Vente
                    </h1>

                    <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold uppercase mb-4">Article 1 - Objet</h2>
                            <p className="text-muted-foreground">
                                Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre
                                Roll'Air Câble, exploitant de la tyrolienne géante d'Orcières Merlette, ci-après dénommé "le Prestataire",
                                et toute personne effectuant un achat de billet ou de prestation, ci-après dénommée "le Client".
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold uppercase mb-4">Article 2 - Prestations proposées</h2>
                            <p className="text-muted-foreground">
                                Le Prestataire propose une activité de tyrolienne géante comprenant :
                            </p>
                            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                                <li>Un vol en tyrolienne de 1.8 km de longueur</li>
                                <li>L'équipement de sécurité complet (harnais, mousquetons)</li>
                                <li>L'encadrement par du personnel qualifié</li>
                                <li>Le briefing de sécurité</li>
                            </ul>
                            <p className="text-muted-foreground mt-4">
                                <strong>Note :</strong> Le forfait remontées mécaniques pour accéder au point de départ n'est pas inclus
                                et doit être acheté séparément auprès de la station d'Orcières Merlette.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold uppercase mb-4">Article 3 - Tarifs</h2>
                            <p className="text-muted-foreground">
                                Les tarifs en vigueur sont les suivants :
                            </p>
                            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                                <li><strong>Tarif Hiver (saison ski) :</strong> 40€ par personne</li>
                                <li><strong>Tarif Été :</strong> 35€ par personne</li>
                                <li><strong>Réduction groupe :</strong> -3€ par billet à partir de 10 personnes</li>
                            </ul>
                            <p className="text-muted-foreground mt-4">
                                Les prix sont indiqués en euros TTC. Le Prestataire se réserve le droit de modifier ses tarifs
                                à tout moment, étant entendu que le tarif appliqué sera celui en vigueur au moment de la réservation.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold uppercase mb-4">Article 4 - Réservation et paiement</h2>
                            <p className="text-muted-foreground">
                                La réservation peut s'effectuer :
                            </p>
                            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                                <li>En ligne sur le site www.latyrolienne.fr</li>
                                <li>Sur place, au guichet de la tyrolienne (sous réserve de disponibilité)</li>
                            </ul>
                            <p className="text-muted-foreground mt-4">
                                Le paiement en ligne s'effectue par carte bancaire via une plateforme de paiement sécurisée.
                                La réservation est confirmée dès réception du paiement intégral.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold uppercase mb-4">Article 5 - Conditions d'accès à l'activité</h2>
                            <p className="text-muted-foreground">
                                Pour des raisons de sécurité, l'accès à la tyrolienne est soumis aux conditions suivantes :
                            </p>
                            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                                <li><strong>Âge minimum :</strong> 6-7 ans (selon adaptation du harnais)</li>
                                <li><strong>Poids :</strong> entre 20 kg et 130 kg</li>
                                <li><strong>Condition physique :</strong> bonne condition physique requise</li>
                                <li>Ne pas être sous l'emprise de l'alcool ou de substances altérant les capacités</li>
                            </ul>
                            <p className="text-muted-foreground mt-4">
                                Le Prestataire se réserve le droit de refuser l'accès à toute personne ne remplissant pas ces conditions,
                                sans possibilité de remboursement si le non-respect des conditions est imputable au Client.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold uppercase mb-4">Article 6 - Validité et conditions d'utilisation</h2>
                            <p className="text-muted-foreground">
                                <strong>Validité du billet :</strong><br />
                                Le billet est valable 1 an à partir de la date d'achat. Passé ce délai, le billet n'est plus utilisable.
                            </p>
                            <p className="text-muted-foreground mt-4">
                                <strong>Report de date :</strong><br />
                                Le Client peut modifier la date de sa réservation à tout moment, sans frais, dans la limite de la validité du billet (1 an).
                            </p>
                            <p className="text-muted-foreground mt-4">
                                <strong>Fermeture météo :</strong><br />
                                En cas de fermeture pour conditions météorologiques défavorables (vent, orage, visibilité insuffisante),
                                le billet reste valable et le Client peut revenir utiliser son billet à une date ultérieure, dans la limite de validité d'1 an.
                            </p>
                            <p className="text-muted-foreground mt-4">
                                <strong>Remboursement :</strong><br />
                                Les billets ne sont pas remboursables. Seul le report de date est possible dans la limite de validité du billet.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold uppercase mb-4">Article 7 - Responsabilité et assurance</h2>
                            <p className="text-muted-foreground">
                                Le Prestataire est titulaire d'une assurance responsabilité civile professionnelle couvrant les dommages
                                pouvant survenir dans le cadre de l'activité.
                            </p>
                            <p className="text-muted-foreground mt-4">
                                Le Client s'engage à respecter scrupuleusement les consignes de sécurité données par le personnel.
                                Le non-respect de ces consignes peut entraîner l'exclusion immédiate de l'activité sans remboursement.
                            </p>
                            <p className="text-muted-foreground mt-4">
                                Il est recommandé au Client de souscrire une assurance individuelle accident pour la pratique d'activités sportives.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold uppercase mb-4">Article 8 - Droit à l'image</h2>
                            <p className="text-muted-foreground">
                                En participant à l'activité, le Client autorise le Prestataire à utiliser les photographies et vidéos
                                prises pendant l'activité à des fins promotionnelles (site web, réseaux sociaux, supports de communication).
                            </p>
                            <p className="text-muted-foreground mt-4">
                                Le Client peut s'opposer à cette utilisation en le signalant par écrit avant le début de l'activité.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold uppercase mb-4">Article 9 - Protection des données personnelles</h2>
                            <p className="text-muted-foreground">
                                Les données personnelles collectées sont traitées conformément à notre politique de confidentialité
                                et au Règlement Général sur la Protection des Données (RGPD). Pour plus d'informations,
                                consultez notre <a href="/confidentialite" className="text-primary hover:underline">politique de confidentialité</a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold uppercase mb-4">Article 10 - Réclamations et litiges</h2>
                            <p className="text-muted-foreground">
                                Toute réclamation doit être adressée par écrit à :<br /><br />
                                Roll'Air Câble<br />
                                Station d'Orcières Merlette 1850<br />
                                05170 Orcières<br />
                                Email : info@latyrolienne.fr
                            </p>
                            <p className="text-muted-foreground mt-4">
                                En cas de litige, une solution amiable sera recherchée avant toute action judiciaire.
                                À défaut d'accord, les tribunaux compétents seront ceux du ressort de Gap (Hautes-Alpes).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold uppercase mb-4">Article 11 - Acceptation des CGV</h2>
                            <p className="text-muted-foreground">
                                La validation de la réservation implique l'acceptation pleine et entière des présentes
                                Conditions Générales de Vente.
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
