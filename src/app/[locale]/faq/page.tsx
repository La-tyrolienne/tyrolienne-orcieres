'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import {
    Users,
    Shield,
    Clock,
    Scale,
    CloudRain,
    Shirt,
    Baby,
    Accessibility,
    Camera,
    Ticket,
    Phone,
    HelpCircle
} from 'lucide-react';
import Link from 'next/link';

// Schema.org FAQPage for SEO
const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: "Quel est l'âge minimum pour la tyrolienne d'Orcières ?",
            acceptedAnswer: {
                '@type': 'Answer',
                text: "L'âge minimum est de 6-7 ans, selon l'adaptation du harnais de sécurité à l'enfant. Le poids minimum est de 20 kg. Nos équipes évaluent sur place si l'enfant peut être équipé en toute sécurité."
            }
        },
        {
            '@type': 'Question',
            name: 'La tyrolienne est-elle sécurisée ?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: "Oui, la sécurité est notre priorité. Équipement professionnel vérifié quotidiennement, double ligne de sécurité, personnel formé. Roll'Air Câble opère depuis 2009 sans incident majeur."
            }
        },
        {
            '@type': 'Question',
            name: 'Combien de temps dure le vol ?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Le vol dure environ 1 minute 20 secondes pour parcourir les 1.8 km. Comptez 30 minutes au total incluant l\'équipement et le briefing sécurité.'
            }
        },
        {
            '@type': 'Question',
            name: 'Quel matériel est fourni ?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Tout le matériel de sécurité est fourni et inclus dans le prix : harnais professionnel, mousquetons, système de freinage. Vous n\'avez rien à apporter.'
            }
        },
        {
            '@type': 'Question',
            name: 'La tyrolienne est-elle accessible aux personnes handicapées ?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Sous certaines conditions. Contactez-nous au 06 84 44 88 10 pour évaluer les possibilités selon votre situation. Nous faisons notre maximum pour rendre l\'expérience accessible.'
            }
        },
        {
            '@type': 'Question',
            name: 'Que faire en cas de mauvais temps ?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'En cas de vent fort, orage ou visibilité insuffisante, l\'activité est fermée pour des raisons de sécurité. Votre billet reste valable 1 an. Appelez avant de venir pour vérifier l\'ouverture.'
            }
        }
    ]
};

const faqItems = [
    {
        id: 'age',
        icon: Baby,
        question: "Quel est l'âge minimum pour la tyrolienne d'Orcières ?",
        answer: "L'âge minimum est de **6-7 ans**, selon l'adaptation du harnais de sécurité à l'enfant. Le poids minimum est de **20 kg**. Nos équipes évaluent sur place si l'enfant peut être équipé en toute sécurité. Les enfants doivent être accompagnés d'un adulte responsable.",
        keywords: ['âge minimum tyrolienne Orcières', 'tyrolienne ouverte tous âges', 'tyrolienne adultes enfants']
    },
    {
        id: 'securite',
        icon: Shield,
        question: 'La tyrolienne est-elle sécurisée ?',
        answer: "**Oui, la sécurité est notre priorité absolue.** Notre équipement est vérifié quotidiennement par des professionnels. Nous utilisons un système de double ligne de sécurité et tout notre personnel est formé aux premiers secours. Roll'Air Câble opère depuis 2009 avec un bilan exemplaire. Consultez nos règles de sécurité pour plus de détails.",
        keywords: ['sécurité tyrolienne Orcières', 'règles sécurité tyrolienne']
    },
    {
        id: 'duree',
        icon: Clock,
        question: 'Combien de temps dure le vol ?',
        answer: "Le vol lui-même dure environ **1 minute 20 secondes** pour parcourir les 1.8 km à une vitesse pouvant atteindre 130 km/h. Comptez **30 minutes au total** incluant l'équipement, le briefing sécurité et le retour. Le parcours traverse un panorama exceptionnel sur les Alpes.",
        keywords: ['durée tyrolienne Orcières', 'parcours tyrolienne Orcières']
    },
    {
        id: 'materiel',
        icon: Shirt,
        question: 'Quel matériel est fourni ?',
        answer: "**Tout le matériel de sécurité est fourni et inclus dans le prix** : harnais professionnel, mousquetons, système de freinage automatique. Vous n'avez rien à apporter. Nous recommandons simplement de porter des vêtements confortables et adaptés à la météo, ainsi que des chaussures fermées.",
        keywords: ['matériel tyrolienne fourni']
    },
    {
        id: 'poids',
        icon: Scale,
        question: 'Quel est le poids min/max autorisé ?',
        answer: "Le poids minimum est de **20 kg** et le maximum de **130 kg**. Ces limites sont établies pour garantir votre sécurité et le bon fonctionnement du système de freinage. En cas de doute, n'hésitez pas à nous contacter.",
        keywords: []
    },
    {
        id: 'preparation',
        icon: Users,
        question: 'Comment se préparer pour la tyrolienne ?',
        answer: "**Conseils de préparation :**\n\n- Portez des vêtements confortables et adaptés à la météo\n- Chaussures fermées obligatoires (pas de tongs ni sandales)\n- Attachez vos cheveux longs\n- Évitez les objets volants (casquettes, lunettes non attachées)\n- Arrivez 15 minutes avant votre créneau\n- En hiver, prévoyez gants et bonnet",
        keywords: ['préparation tyrolienne Orcières', 'conseils tyrolienne Orcières']
    },
    {
        id: 'handicap',
        icon: Accessibility,
        question: 'La tyrolienne est-elle accessible aux personnes handicapées ?',
        answer: "**Sous certaines conditions.** L'accessibilité dépend du type de handicap et de nos possibilités d'adaptation. Contactez-nous au **06 84 44 88 10** pour évaluer ensemble les possibilités selon votre situation. Nous faisons notre maximum pour rendre l'expérience accessible à tous.",
        keywords: ['tyrolienne accessible handicap']
    },
    {
        id: 'meteo',
        icon: CloudRain,
        question: 'Que faire en cas de mauvais temps ?',
        answer: "En cas de **vent fort, orage ou visibilité insuffisante**, l'activité est fermée pour des raisons de sécurité. Pas d'inquiétude : **votre billet reste valable 1 an** ! Nous vous recommandons de nous appeler avant de venir pour vérifier l'ouverture au **06 84 44 88 10**.",
        keywords: []
    },
    {
        id: 'photos',
        icon: Camera,
        question: 'Puis-je prendre des photos/vidéos ?',
        answer: "**Oui, vous pouvez filmer votre vol !** Nous recommandons d'utiliser une GoPro ou un téléphone avec une attache sécurisée (dragonne). Attention : tout objet non attaché peut tomber durant le vol. Notre équipe peut parfois vous filmer et vous envoyer la vidéo !",
        keywords: []
    },
    {
        id: 'reservation',
        icon: Ticket,
        question: 'Faut-il réserver à l\'avance ?',
        answer: "**En hiver** : pas de réservation obligatoire, présentez-vous directement. **En été** : réservation recommandée par téléphone au 06 84 44 88 10. L'achat de billets en ligne est possible via notre billetterie et votre billet sera valable 1 an.",
        keywords: ['réservation tyrolienne', 'réservation en ligne tyrolienne']
    },
];

export default function FAQPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className="min-h-screen bg-background pt-32 pb-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <HelpCircle className="w-8 h-8 text-primary" />
                            </div>
                        </div>
                        <h1 className="font-[family-name:var(--font-bebas)] text-4xl md:text-6xl mb-4">
                            Questions Fréquentes
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Tout ce que vous devez savoir sur la tyrolienne d'Orcières : âge minimum, sécurité, préparation, et plus encore.
                        </p>
                    </motion.div>

                    {/* FAQ Accordion */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Accordion type="single" collapsible className="space-y-4">
                            {faqItems.map((item, index) => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}
                                    className="border rounded-xl px-6 bg-card"
                                >
                                    <AccordionTrigger className="hover:no-underline py-6">
                                        <div className="flex items-center gap-4 text-left">
                                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <item.icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <span className="font-semibold">{item.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-6 pl-14">
                                        <div className="prose prose-sm dark:prose-invert max-w-none">
                                            {item.answer.split('\n\n').map((paragraph, i) => (
                                                <p key={i} className="text-muted-foreground mb-2 last:mb-0"
                                                    dangerouslySetInnerHTML={{
                                                        __html: paragraph
                                                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                            .replace(/\n- /g, '<br/>• ')
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </motion.div>

                    {/* Contact CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16"
                    >
                        <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="p-8 text-center">
                                <h2 className="text-2xl font-bold mb-4">
                                    Vous avez une autre question ?
                                </h2>
                                <p className="text-muted-foreground mb-6">
                                    Notre équipe est disponible pour répondre à toutes vos questions
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button asChild size="lg" className="bg-primary">
                                        <a href="tel:+33684448810">
                                            <Phone className="w-5 h-5 mr-2" />
                                            06 84 44 88 10
                                        </a>
                                    </Button>
                                    <Button asChild variant="outline" size="lg">
                                        <Link href="/tyrolienne">
                                            <Ticket className="w-5 h-5 mr-2" />
                                            Voir les tarifs
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Related Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        <Link href="/informations" className="group">
                            <Card className="h-full hover:border-primary/50 transition-colors">
                                <CardContent className="p-6">
                                    <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                                        Informations pratiques →
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Accès, équipement recommandé, déroulement de l'activité
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link href="/avis" className="group">
                            <Card className="h-full hover:border-primary/50 transition-colors">
                                <CardContent className="p-6">
                                    <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                                        Avis clients →
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Découvrez les témoignages de nos visiteurs
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
