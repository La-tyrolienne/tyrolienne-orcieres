'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Season = 'winter' | 'summer';
type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    season: Season;
    theme: Theme;
    setSeason: (season: Season) => void;
    setTheme: (theme: Theme) => void;
    toggleSeason: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [season, setSeason] = useState<Season>('winter');
    const [theme, setTheme] = useState<Theme>('system');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Detect current season based on date
        const month = new Date().getMonth();
        const isWinter = month >= 10 || month <= 3; // Nov-April = winter
        setSeason(isWinter ? 'winter' : 'summer');

        // Load saved preferences
        const savedSeason = localStorage.getItem('season') as Season | null;
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        if (savedSeason) setSeason(savedSeason);
        if (savedTheme) setTheme(savedTheme);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;

        // Apply season
        root.classList.remove('summer');
        if (season === 'summer') {
            root.classList.add('summer');
        }
        localStorage.setItem('season', season);

        // Apply theme
        root.classList.remove('dark');
        if (theme === 'dark') {
            root.classList.add('dark');
        } else if (theme === 'system') {
            const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (systemDark) root.classList.add('dark');
        }
        localStorage.setItem('theme', theme);
    }, [season, theme, mounted]);

    const toggleSeason = () => {
        setSeason(prev => prev === 'winter' ? 'summer' : 'winter');
    };

    // Always provide the context, but with default values before mount
    const value = {
        season,
        theme,
        setSeason,
        setTheme,
        toggleSeason
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
