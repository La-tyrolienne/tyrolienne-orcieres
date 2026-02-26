'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
    id: string;
    season: 'winter' | 'summer';
    price: number;
    quantity: number;
    label: string;
    isGift?: boolean;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'id'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    toggleGift: (id: string, isGift: boolean) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('tyrolienne-cart');
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error('Error loading cart:', e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('tyrolienne-cart', JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const addItem = (item: Omit<CartItem, 'id'>) => {
        // Check if same season and gift status exist, if so increase quantity
        const existing = items.find(i => i.season === item.season && !!i.isGift === !!item.isGift);
        if (existing) {
            setItems(prev => prev.map(i =>
                i.id === existing.id
                    ? { ...i, quantity: i.quantity + item.quantity }
                    : i
            ));
        } else {
            const id = `tyro-${item.season}-${Date.now()}`;
            setItems(prev => [...prev, { ...item, id, isGift: item.isGift || false }]);
        }
    };

    const removeItem = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id);
            return;
        }
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, quantity } : item
        ));
    };

    const toggleGift = (id: string, isGift: boolean) => {
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, isGift } : item
        ));
    };

    const clearCart = () => {
        setItems([]);
    };

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{
            items,
            addItem,
            removeItem,
            updateQuantity,
            toggleGift,
            clearCart,
            totalItems,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
