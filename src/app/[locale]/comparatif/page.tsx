'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Check,
    X,
    Ticket,
    Zap,
    Clock,
    Mountain,
    Users,
    Shield,
    Star,
    ArrowRight,
    TreePine,
    Cable,
    Footprints
} from 'lucide-react';
import Link from 'next/link';

// Schema.org for SEO
const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Meilleure Tyrolienne des Alpes - Comparatif Activités Orcières',
    description: 'Guide comparatif des activités montagne à Orcières. Tyrolienne vs accrobranche, randonnée. Trouvez la meilleure expérience pour vous.',
    author: {
        '@type': 'Organization',
        name: "Roll'Air Câble",
    },
    publisher: {
        '@type': 'Organization',
        name: "Roll'Air Câble",
        logo: {
            '@type': 'ImageObject',
            url: 'https://www.latyrolienne.fr/logo-transparent.png',
        },
    },
    datePublished: '2025-01-01',
    dateModified: '2026-01-31',
};

const activities = [
    {
        name: 'Tyrolienne',
        icon: Cable,
        highlight: true,
        description: 'Vol de 1.8km à 130km/h',
        duration: '~30 min',
        price: '35-40€',
        physical: 'Faible',
        age: 'Dès 6-7 ans',
        sensation: '⭐⭐⭐⭐⭐',
        view: '⭐⭐⭐⭐⭐',
        family: true,
        group: true,
        allWeather: false,
    },
    {
        name: 'Accrobranche',
        icon: TreePine,
        highlight: false,
        description: 'Parcours dans les arbres',
        duration: '2-3h',
        price: '20-35€',
        physical: 'Moyen',
        age: 'Dès 4 ans',
        sensation: '⭐⭐⭐',
        view: '⭐⭐',
        family: true,
        group: true,
        allWeather: false,
    },
    {
        name: 'Randonnée',
        icon: Footprints,
        highlight: false,
        description: 'Sentiers de montagne',
        duration: '1-6h',
        price: 'Gratuit',
        physical: 'Variable',
        age: 'Tous âges',
        sensation: '⭐⭐',
        view: '⭐⭐⭐⭐',
        family: true,
        group: true,
        allWeather: true,
    },
];

const whyChoose = [
    {
        icon: Zap,
        title: 'Sensations uniques',
        description: '130 km/h de vitesse max, la plus grande tyrolienne des Alpes françaises',
    },
    {
        icon: Mountain,
        title: 'Vue exceptionnelle',
        description: 'Panorama à 360° sur les Alpes, survol de la station d\'Orcières',
    },
    {
        icon: Clock,
        title: 'Expérience rapide',
        description: '30 minutes au total, parfait pour une activité entre deux descentes de ski',
    },
    {
        icon: Users,
        title: 'Pour toute la famille',
        description: 'Accessible dès 6-7 ans, sensations douces adaptées à tous',
    },
    {
        icon: Shield,
        title: 'Sécurité maximale',
        description: 'Équipement professionnel, personnel formé, depuis 2009',
    },
    {
        icon: Star,
        title: 'Note 4.4/5',
        description: '36 avis Google positifs, 97% de recommandation',
    },
];

export default function ComparatifPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <div className="min-h-screen bg-background pt-32 pb-24">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <Badge className="mb-6 bg-primary/10 text-primary border-0">
                            Guide Activités Montagne
                        </Badge>
                        <h1 className="font-[family-name:var(--font-bebas)] text-4xl md:text-6xl mb-4">
                            Meilleure Tyrolienne des Alpes
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Comparatif des activités montagne à Orcières Merlette. Trouvez l'expérience parfaite pour vous.
                        </p>
                    </motion.div>

                    {/* Comparison Table */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-16"
                    >
                        <h2 className="font-[family-name:var(--font-bebas)] text-2xl md:text-3xl mb-8 text-center">
                            Comparatif Activités Orcières
                        </h2>

                        {/* Mobile Cards */}
                        <div className="md:hidden space-y-4">
                            {activities.map((activity) => (
                                <Card
                                    key={activity.name}
                                    className={activity.highlight ? 'border-primary bg-primary/5' : ''}
                                >
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center gap-3">
                                            <activity.icon className={`w-6 h-6 ${activity.highlight ? 'text-primary' : 'text-muted-foreground'}`} />
                                            <CardTitle className="text-lg">{activity.name}</CardTitle>
                                            {activity.highlight && <Badge className="bg-primary">Recommandé</Badge>}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-2 text-sm">
                                        <p className="text-muted-foreground">{activity.description}</p>
                                        <div className="grid grid-cols-2 gap-2 pt-2">
                                            <div><span className="text-muted-foreground">Durée:</span> {activity.duration}</div>
                                            <div><span className="text-muted-foreground">Prix:</span> {activity.price}</div>
                                            <div><span className="text-muted-foreground">Âge:</span> {activity.age}</div>
                                            <div><span className="text-muted-foreground">Effort:</span> {activity.physical}</div>
                                            <div><span className="text-muted-foreground">Sensations:</span> {activity.sensation}</div>
                                            <div><span className="text-muted-foreground">Vue:</span> {activity.view}</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-4">Activité</th>
                                        <th className="p-4">Durée</th>
                                        <th className="p-4">Prix</th>
                                        <th className="p-4">Âge min</th>
                                        <th className="p-4">Effort</th>
                                        <th className="p-4">Sensations</th>
                                        <th className="p-4">Vue</th>
                                        <th className="p-4">Famille</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activities.map((activity) => (
                                        <tr
                                            key={activity.name}
                                            className={`border-b ${activity.highlight ? 'bg-primary/5' : ''}`}
                                        >
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <activity.icon className={`w-5 h-5 ${activity.highlight ? 'text-primary' : 'text-muted-foreground'}`} />
                                                    <span className="font-bold">{activity.name}</span>
                                                    {activity.highlight && (
                                                        <Badge className="bg-primary text-xs">Recommandé</Badge>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4 text-center">{activity.duration}</td>
                                            <td className="p-4 text-center font-bold">{activity.price}</td>
                                            <td className="p-4 text-center">{activity.age}</td>
                                            <td className="p-4 text-center">{activity.physical}</td>
                                            <td className="p-4 text-center">{activity.sensation}</td>
                                            <td className="p-4 text-center">{activity.view}</td>
                                            <td className="p-4 text-center">
                                                {activity.family ? (
                                                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                                                ) : (
                                                    <X className="w-5 h-5 text-red-500 mx-auto" />
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* Why Choose Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="font-[family-name:var(--font-bebas)] text-2xl md:text-3xl mb-8 text-center">
                            Pourquoi choisir la Tyrolienne d'Orcières ?
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {whyChoose.map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="h-full hover:shadow-md transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                                <item.icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <h3 className="font-bold mb-2">{item.title}</h3>
                                            <p className="text-sm text-muted-foreground">{item.description}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Guide Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <Card className="bg-muted/30 border-none">
                            <CardContent className="p-8">
                                <h2 className="font-[family-name:var(--font-bebas)] text-2xl md:text-3xl mb-6">
                                    Guide : Quelle activité choisir à Orcières ?
                                </h2>

                                <div className="space-y-6 text-muted-foreground">
                                    <div>
                                        <h3 className="font-bold text-foreground mb-2">🎿 En hiver</h3>
                                        <p>
                                            La <strong>tyrolienne</strong> est l'activité parfaite entre deux sessions de ski.
                                            En seulement 30 minutes, vivez une expérience unique avec une vue imprenable sur
                                            les pistes enneigées. Accessible directement depuis la station.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-foreground mb-2">☀️ En été</h3>
                                        <p>
                                            Combinez la <strong>tyrolienne</strong> avec une randonnée ! Après le vol,
                                            un sentier pédestre vous ramène à la station en passant par de magnifiques
                                            lacs de montagne. L'accrobranche est également une option pour les plus sportifs.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-foreground mb-2">👨‍👩‍👧‍👦 En famille</h3>
                                        <p>
                                            La tyrolienne d'Orcières est <strong>accessible dès 6-7 ans</strong> avec des
                                            sensations douces adaptées aux enfants. C'est l'activité idéale pour créer
                                            des souvenirs mémorables en famille, sans effort physique intense.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-foreground mb-2">⚡ Pour les amateurs de sensations</h3>
                                        <p>
                                            Avec ses <strong>130 km/h de vitesse maximale</strong> et 1.8 km de longueur,
                                            la tyrolienne d'Orcières offre l'expérience la plus intense de la région.
                                            Aucune autre activité ne combine cette vitesse avec cette vue panoramique.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <Card className="bg-primary text-white border-none">
                            <CardContent className="p-8 md:p-12">
                                <h2 className="font-[family-name:var(--font-bebas)] text-3xl md:text-4xl mb-4">
                                    Prêt à vivre l'expérience ?
                                </h2>
                                <p className="text-white/80 mb-8 max-w-xl mx-auto">
                                    Réservez votre vol en tyrolienne et découvrez pourquoi c'est la meilleure activité d'Orcières
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="bg-white text-primary hover:bg-white/90 font-bold"
                                    >
                                        <Link href="/tyrolienne">
                                            <Ticket className="w-5 h-5 mr-2" />
                                            Voir les tarifs
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        size="lg"
                                        variant="outline"
                                        className="border-white text-white hover:bg-white/10"
                                    >
                                        <Link href="/avis">
                                            <Star className="w-5 h-5 mr-2" />
                                            Lire les avis
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
