'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { isInSeason, getOpeningHours, isClosedDate } from '@/config/closures';

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const MONTHS = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

interface VisualCalendarProps {
    className?: string;
    customClosures?: string[];
    onDateClick?: (date: string) => void;
}

export function VisualCalendar({ className, customClosures: propCustomClosures, onDateClick }: VisualCalendarProps) {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [fetchedClosures, setFetchedClosures] = useState<string[]>([]);

    useEffect(() => {
        if (!propCustomClosures) {
            fetch('/data/custom-closures.json')
                .then(res => res.json())
                .then(data => setFetchedClosures(data))
                .catch(() => { });
        }
    }, [propCustomClosures]);

    const activeCustomClosures = propCustomClosures || fetchedClosures;

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month: number, year: number) => {
        const day = new Date(year, month, 1).getDay();
        // Convert from Sunday=0 to Monday=0
        return day === 0 ? 6 : day - 1;
    };

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const getDayStatus = (day: number): 'open' | 'closed' | 'exception' | 'today' => {
        const date = new Date(currentYear, currentMonth, day);
        const dateStr = date.toISOString().split('T')[0];
        const isToday = date.toDateString() === today.toDateString();

        // Check if it's in the static config OR in the custom closures
        if (isClosedDate(date) || activeCustomClosures.includes(dateStr)) return 'exception';

        // Check if it's in season
        const season = isInSeason(date);
        if (season === 'closed') return 'closed';

        if (isToday) return 'today';
        return 'open';
    };

    const renderDays = () => {
        const daysInMonth = getDaysInMonth(currentMonth, currentYear);
        const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
        const days = [];

        // Empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-8 sm:h-10" />);
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const status = getDayStatus(day);
            const date = new Date(currentYear, currentMonth, day);
            const dateStr = date.toISOString().split('T')[0];
            const hours = getOpeningHours(date);

            let bgColor = '';
            let textColor = 'text-foreground';
            let title = '';

            switch (status) {
                case 'open':
                    bgColor = 'bg-green-500/20 hover:bg-green-500/30';
                    textColor = 'text-green-700 dark:text-green-400';
                    title = `Ouvert ${hours}`;
                    break;
                case 'closed':
                    bgColor = 'bg-muted/50';
                    textColor = 'text-muted-foreground';
                    title = 'Fermeture saisonnière';
                    break;
                case 'exception':
                    bgColor = 'bg-red-500/20 hover:bg-red-500/30';
                    textColor = 'text-red-700 dark:text-red-400';
                    title = 'Fermé exceptionnellement';
                    break;
                case 'today':
                    bgColor = 'bg-primary hover:bg-primary/90';
                    textColor = 'text-primary-foreground';
                    title = `Aujourd'hui - ${hours || 'Fermé'}`;
                    break;
            }

            days.push(
                <motion.div
                    key={day}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDateClick?.(dateStr)}
                    className={`h-8 w-8 sm:h-10 sm:w-10 rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${bgColor} ${textColor} ${onDateClick ? 'cursor-pointer' : 'cursor-default'}`}
                    title={title}
                >
                    {day}
                </motion.div>
            );
        }

        return days;
    };

    const season = isInSeason(new Date(currentYear, currentMonth, 15));

    return (
        <Card className={`bg-card border h-full ${className}`}>
            <CardContent className="p-4 sm:p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        <h3 className="text-base sm:text-lg font-bold">Calendrier</h3>
                    </div>
                </div>

                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-4">
                    <Button variant="ghost" size="icon" onClick={prevMonth}>
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="font-bold text-lg">
                        {MONTHS[currentMonth]} {currentYear}
                    </span>
                    <Button variant="ghost" size="icon" onClick={nextMonth}>
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>

                {/* Season Indicator */}
                <div className={`text-center text-xs font-bold uppercase tracking-wider mb-4 py-1 rounded ${season === 'winter' ? 'bg-blue-500/10 text-blue-600' :
                    season === 'summer' ? 'bg-orange-500/10 text-orange-600' :
                        'bg-muted text-muted-foreground'
                    }`}>
                    {season === 'winter' ? '❄️ Saison Hiver' :
                        season === 'summer' ? '☀️ Saison Été' :
                            '⛔ Fermeture Annuelle'}
                </div>

                {/* Days Header */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {DAYS.map(day => (
                        <div key={day} className="h-8 flex items-center justify-center text-xs font-bold text-muted-foreground">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 justify-items-center">
                    {renderDays()}
                </div>

                {/* Legend */}
                <div className="mt-6 pt-4 border-t border-border">
                    <p className="text-xs font-bold text-muted-foreground mb-3">Légende</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-green-500/20" />
                            <span>Ouvert</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-red-500/20" />
                            <span>Fermé</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-muted/50" />
                            <span>Hors saison</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-primary" />
                            <span>Aujourd'hui</span>
                        </div>
                    </div>
                </div>

                {/* Opening Hours */}
                <div className="mt-4 p-3 bg-muted/30 rounded-lg text-xs">
                    <p className="font-bold mb-2">Dates & Horaires</p>
                    <p className="mb-1">❄️ <strong>Hiver 2025-26</strong></p>
                    <p className="text-muted-foreground mb-2">13 déc → 12 avr • 9h30-14h30 (piétons) / 15h30 (skieurs)</p>
                    <p className="mb-1">☀️ <strong>Été 2026</strong></p>
                    <p className="text-muted-foreground">Juillet-Août • 9h30-16h00</p>
                </div>
            </CardContent>
        </Card>
    );
}
