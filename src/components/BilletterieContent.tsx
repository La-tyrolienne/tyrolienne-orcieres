'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Ticket, Shield, CreditCard, Calendar, Check, Users, Clock, Snowflake, Sun, Info, ShoppingCart, Minus, Plus, CheckCircle } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { useCart } from '@/context/CartContext';
import { VisualCalendar } from '@/components/VisualCalendar';
import Image from 'next/image';
import { useState } from 'react';

export function BilletterieContent() {
    const t = useTranslations('tickets');
    const { season } = useTheme();
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [showAdded, setShowAdded] = useState(false);

    const price = season === 'winter' ? 40 : 0.01;
    const seasonLabel = season === 'winter' ? 'Hiver' : 'Été';
    const SeasonIcon = season === 'winter' ? Snowflake : Sun;

    const includes = [
        'Vol de 1min 20s à 130km/h',
        'Équipement professionnel inclus',
        'Briefing sécurité complet',
        'Encadrement par équipe qualifiée',
        'Billet nominatif',
        'Valable 2 saisons (hiver ou été selon le billet)',
    ];

    const conditions = [
        { label: 'Âge minimum', value: '6-7 ans*' },
        { label: 'Poids', value: '20 à 130 kg' },
        { label: 'Durée du vol', value: '~1min 20' },
    ];

    const guarantees = [
        { icon: Shield, title: 'Paiement 100% sécurisé', desc: 'Protocole SSL et 3D Secure' },
        { icon: Clock, title: 'Confirmation immédiate', desc: 'Billet reçu par email instantanément' },
        { icon: CreditCard, title: 'Multiples moyens de paiement', desc: 'CB, PayPal, Apple Pay, Google Pay' },
        { icon: Calendar, title: 'Validité 2 saisons', desc: 'Billet hiver valable 2 saisons d\'hiver, billet été valable 2 saisons d\'été' },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Banner */}
            <div className="relative h-[40vh] min-h-[350px] flex items-center justify-center overflow-hidden">
                <Image
                    src={season === 'winter' ? '/hero-winter-new.jpg' : '/hero-summer-optimized.png'}
                    alt="Billetterie Tyrolienne"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
                <div className="relative z-10 text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-[family-name:var(--font-bebas)] text-5xl md:text-7xl text-white drop-shadow-2xl mb-4"
                    >
                        {t('title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-white/80 max-w-2xl mx-auto"
                    >
                        {t('subtitle')}
                    </motion.p>
                </div>
            </div>

            {/* Main Ticket Card */}
            <section className="py-12 md:py-24 px-4">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/30">
                            {/* Season Badge */}
                            <div className="absolute top-0 right-0">
                                <Badge className="rounded-none rounded-bl-xl bg-primary text-white border-0 px-4 py-1.5 font-bold uppercase tracking-wider flex items-center gap-2 text-[10px] md:text-sm">
                                    <SeasonIcon className="w-3 h-3 md:w-4 md:h-4" />
                                    {seasonLabel}
                                </Badge>
                            </div>

                            <CardHeader className="pb-4 pt-10">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                    <div>
                                        <CardTitle className="text-2xl md:text-4xl font-black uppercase mb-2">
                                            Tarif unique
                                        </CardTitle>
                                        <p className="text-sm md:text-base text-muted-foreground">
                                            Un seul prix pour tous, équipement inclus
                                        </p>
                                    </div>
                                    <div className="md:text-right">
                                        <span className="text-5xl md:text-7xl font-black">{price}€</span>
                                        <span className="text-muted-foreground block text-sm">/personne</span>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="pt-0">
                                {/* Group Discount */}
                                <div className="bg-primary/10 rounded-xl p-4 mb-8 flex items-center gap-4">
                                    <Users className="w-6 h-6 md:w-8 md:h-8 text-primary flex-shrink-0" />
                                    <div>
                                        <p className="font-bold text-sm md:text-base">Tarif groupe : -3€ / ticket</p>
                                        <p className="text-xs md:text-sm text-muted-foreground">À partir de 10 personnes</p>
                                    </div>
                                </div>

                                {/* What's included */}
                                <h3 className="font-bold uppercase tracking-wider text-[10px] md:text-sm mb-4 text-muted-foreground">Inclus dans le tarif</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                                    {includes.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                                <Check className="w-3 h-3 text-green-500" />
                                            </div>
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Conditions */}
                                <h3 className="font-bold uppercase tracking-wider text-[10px] md:text-sm mb-4 text-muted-foreground">Conditions</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                    {conditions.map((condition, i) => (
                                        <div key={i} className="flex sm:flex-col items-center justify-between sm:justify-center p-3 md:p-4 bg-muted/30 rounded-xl">
                                            <p className="text-base md:text-lg font-bold order-2 sm:order-1">{condition.value}</p>
                                            <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider order-1 sm:order-2">{condition.label}</p>
                                        </div>
                                    ))}
                                </div>

                                <p className="text-[10px] md:text-xs text-muted-foreground mb-6 flex items-start gap-2">
                                    <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                    <span>*L'âge minimum dépend de l'adaptation du harnais de sécurité à l'enfant</span>
                                </p>

                                {/* Quantity Selector */}
                                <div className="flex items-center justify-center gap-4 mb-4">
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="w-12 h-12 rounded-xl bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
                                        aria-label="Réduire la quantité"
                                    >
                                        <Minus className="w-5 h-5" />
                                    </button>
                                    <span className="text-3xl font-black w-16 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(q => q + 1)}
                                        className="w-12 h-12 rounded-xl bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
                                        aria-label="Augmenter la quantité"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>

                                <p className="text-center text-sm text-muted-foreground mb-4">
                                    Total: <strong className="text-foreground">{price * quantity}€</strong>
                                </p>

                                <Button
                                    onClick={() => {
                                        addItem({
                                            season,
                                            price,
                                            quantity,
                                            label: `Tyrolienne ${seasonLabel}`,
                                        });
                                        setShowAdded(true);
                                        setTimeout(() => setShowAdded(false), 2500);
                                        setQuantity(1);
                                    }}
                                    className="w-full py-7 text-lg font-bold uppercase tracking-wider rounded-xl bg-primary hover:bg-primary/90 shadow-[0_0_30px_rgba(var(--primary),0.3)] hover:shadow-[0_0_40px_rgba(var(--primary),0.5)] transition-all flex items-center justify-center gap-3"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Ajouter au panier
                                </Button>

                                {/* Added notification */}
                                <AnimatePresence>
                                    {showAdded && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="mt-4 flex items-center justify-center gap-2 text-green-600 bg-green-50 rounded-xl p-3"
                                        >
                                            <CheckCircle className="w-5 h-5" />
                                            <span className="font-semibold text-sm">Ajouté au panier !</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Secure Payment Badges */}
                                <div className="mt-6 pt-6 border-t border-border/50">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Shield className="w-4 h-4 text-green-500" />
                                            <span>Paiement 100% sécurisé via <strong className="text-foreground">Stripe</strong></span>
                                        </div>
                                        <div className="flex flex-wrap items-center justify-center gap-3">
                                            {/* Payment method badges */}
                                            <div className="flex items-center gap-1 px-3 py-1.5 bg-muted/50 rounded-lg">
                                                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                                                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                                                </svg>
                                                <span className="text-xs font-medium">CB</span>
                                            </div>
                                            <div className="flex items-center gap-1 px-3 py-1.5 bg-muted/50 rounded-lg">
                                                <span className="text-xs font-bold text-blue-600">VISA</span>
                                            </div>
                                            <div className="flex items-center gap-1 px-3 py-1.5 bg-muted/50 rounded-lg">
                                                <span className="text-xs font-bold text-orange-500">Mastercard</span>
                                            </div>
                                            <div className="flex items-center gap-1 px-3 py-1.5 bg-muted/50 rounded-lg">
                                                <span className="text-xs font-medium">PayPal</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
                                                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                                                </svg>
                                                SSL/TLS
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
                                                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                                                </svg>
                                                3D Secure
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* Booking Info + Calendar */}
            <section className="py-16 md:py-24 bg-muted/20">
                <div className="container mx-auto max-w-6xl px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="font-[family-name:var(--font-bebas)] text-3xl md:text-5xl mb-4">
                            {season === 'winter' ? 'Pas de réservation en hiver' : 'Réservation par téléphone'}
                        </h2>
                        <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto px-4">
                            {season === 'winter'
                                ? 'L\'activité est tributaire des conditions météorologiques. Présentez-vous directement sur place et vérifiez l\'ouverture avant de venir (nous appeler de préférence).'
                                : 'En été, les réservations se font uniquement par téléphone. Notre équipe est à votre disposition pour vous trouver le meilleur créneau.'}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Opening Calendar - Centered and Large */}
                        <motion.div
                            id="calendrier"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="col-span-1 md:col-span-2 max-w-2xl mx-auto w-full"
                        >
                            <VisualCalendar />
                            <div className="mt-6 text-center p-6 bg-muted/30 rounded-2xl">
                                <p className="text-xs md:text-sm text-muted-foreground mb-2">
                                    Appelez-nous pour vérifier l'ouverture du jour :
                                </p>
                                <a href="tel:+33684448810" className="inline-flex items-center justify-center gap-2 text-xl md:text-2xl font-bold text-primary hover:underline">
                                    📞 06 84 44 88 10
                                </a>
                            </div>
                            <div className="mt-4 mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                <p className="font-bold text-amber-800 mb-2 text-sm md:text-base">💳 Paiement sur place</p>
                                <p className="text-amber-700 text-xs md:text-sm mb-2">
                                    Au départ de la tyrolienne : <strong>Chèques, Chèques vacances, Espèces</strong>
                                </p>
                                <p className="text-amber-600 text-[10px] md:text-xs">
                                    ⚠️ Réseau très limité sur site - L'achat en ligne est recommandé
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="pt-16 md:pt-48 pb-24">
                <div className="container mx-auto max-w-6xl px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-[family-name:var(--font-bebas)] text-3xl md:text-4xl text-center mb-8"
                    >
                        Vos garanties
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {guarantees.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="bg-muted/30 border-none text-center h-full">
                                    <CardContent className="p-6">
                                        <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-4 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                            <item.icon className="w-6 h-6 md:w-7 md:h-7" />
                                        </div>
                                        <h3 className="font-bold text-sm md:text-base mb-2">{item.title}</h3>
                                        <p className="text-xs md:text-sm text-muted-foreground">{item.desc}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
