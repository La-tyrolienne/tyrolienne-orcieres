'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/components/theme-provider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, Minus, Plus, Shield, CreditCard, ArrowLeft, Loader2, Snowflake, Sun } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function PanierPage() {
    const { items, removeItem, updateQuantity, clearCart, totalPrice, totalItems } = useCart();
    const { season } = useTheme();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [error, setError] = useState('');

    const handleCheckout = async () => {
        if (items.length === 0) return;

        setIsCheckingOut(true);
        setError('');

        try {
            const lineItems = items.map(item => ({
                season: item.season,
                label: item.label,
                price: item.price,
                quantity: item.quantity,
            }));

            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: lineItems }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                setError(data.error || 'Erreur lors du paiement');
            }
        } catch {
            setError('Erreur de connexion. Veuillez réessayer.');
        } finally {
            setIsCheckingOut(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <div className="relative h-[30vh] min-h-[250px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/cable-detail.png"
                    alt="Panier"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
                <div className="relative z-10 text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-[family-name:var(--font-bebas)] text-5xl md:text-7xl text-white drop-shadow-2xl mb-2"
                    >
                        Mon Panier
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg text-white/70"
                    >
                        {totalItems > 0 ? `${totalItems} billet${totalItems > 1 ? 's' : ''}` : 'Votre panier est vide'}
                    </motion.p>
                </div>
            </div>

            <div className="container mx-auto max-w-5xl px-4 py-12 md:py-16">
                {items.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-16"
                    >
                        <div className="text-6xl mb-6">🎿</div>
                        <h2 className="text-2xl font-bold mb-3">Votre panier est vide</h2>
                        <p className="text-muted-foreground mb-8">Ajoutez des billets pour la tyrolienne !</p>
                        <Button asChild className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg rounded-xl font-bold uppercase tracking-wider">
                            <Link href="/billetterie">Voir les tarifs</Link>
                        </Button>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            <AnimatePresence>
                                {items.map((item) => {
                                    const SeasonIcon = item.season === 'winter' ? Snowflake : Sun;
                                    return (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20, height: 0 }}
                                        >
                                            <Card className="overflow-hidden">
                                                <CardContent className="p-4 md:p-6">
                                                    <div className="flex items-center gap-4 md:gap-6">
                                                        {/* Icon */}
                                                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                            <SeasonIcon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                                                        </div>

                                                        {/* Info */}
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="font-bold text-base md:text-lg">{item.label}</h3>
                                                            <p className="text-sm text-muted-foreground">{item.price}€ / personne</p>
                                                        </div>

                                                        {/* Quantity */}
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="w-9 h-9 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
                                                            >
                                                                <Minus className="w-4 h-4" />
                                                            </button>
                                                            <span className="text-lg font-bold w-8 text-center">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="w-9 h-9 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
                                                            >
                                                                <Plus className="w-4 h-4" />
                                                            </button>
                                                        </div>

                                                        {/* Price */}
                                                        <div className="text-right min-w-[60px]">
                                                            <span className="font-bold text-lg">{item.price * item.quantity}€</span>
                                                        </div>

                                                        {/* Remove */}
                                                        <button
                                                            onClick={() => removeItem(item.id)}
                                                            className="p-2 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"
                                                            aria-label="Supprimer"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>

                            <div className="flex justify-between items-center pt-4">
                                <Link href="/billetterie" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    <ArrowLeft className="w-4 h-4" />
                                    Continuer les achats
                                </Link>
                                <button
                                    onClick={clearCart}
                                    className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
                                >
                                    Vider le panier
                                </button>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-28 overflow-hidden border-primary/20">
                                <div className="bg-primary p-4">
                                    <h2 className="text-white font-bold uppercase tracking-wider text-sm">Récapitulatif</h2>
                                </div>
                                <CardContent className="p-6 space-y-4">
                                    {items.map(item => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">{item.label} × {item.quantity}</span>
                                            <span className="font-medium">{item.price * item.quantity}€</span>
                                        </div>
                                    ))}

                                    <div className="border-t pt-4 flex justify-between items-center">
                                        <span className="font-bold uppercase tracking-wider text-sm">Total</span>
                                        <span className="text-3xl font-black">{totalPrice}€</span>
                                    </div>

                                    {/* Info notice */}
                                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
                                        <p className="font-bold mb-1">📋 Bon à savoir</p>
                                        <p>Les billets <strong>Hiver</strong> sont valables <strong>2 saisons d&apos;hiver</strong> et les billets <strong>Été</strong> sont valables <strong>2 saisons d&apos;été</strong>. Présentez-vous directement sur place.</p>
                                    </div>

                                    {error && (
                                        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm">
                                            {error}
                                        </div>
                                    )}

                                    <Button
                                        onClick={handleCheckout}
                                        disabled={isCheckingOut}
                                        className="w-full py-6 text-lg font-bold uppercase tracking-wider rounded-xl bg-primary hover:bg-primary/90 shadow-lg"
                                    >
                                        {isCheckingOut ? (
                                            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Redirection...</>
                                        ) : (
                                            <><CreditCard className="w-5 h-5 mr-2" /> Payer {totalPrice}€</>
                                        )}
                                    </Button>

                                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
                                        <Shield className="w-3 h-3 text-green-500" />
                                        <span>Paiement 100% sécurisé via Stripe</span>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                                        <span className="text-[10px] px-2 py-1 bg-muted/50 rounded font-bold text-blue-600">VISA</span>
                                        <span className="text-[10px] px-2 py-1 bg-muted/50 rounded font-bold text-orange-500">Mastercard</span>
                                        <span className="text-[10px] px-2 py-1 bg-muted/50 rounded font-medium">CB</span>
                                        <span className="text-[10px] px-2 py-1 bg-muted/50 rounded font-medium">Apple Pay</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
