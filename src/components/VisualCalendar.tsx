'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { isInSeason, getOpeningHours, isClosedDate } from '@/config/closures';
import { useTranslations } from 'next-intl';
import { Closure, ClosureReason, closureReasons, getClosureIcons } from '@/types/closures';

interface VisualCalendarProps {
    className?: string;
    customClosures?: Closure[] | string[] | any[];
    onDateClick?: (date: string) => void;
}

export function VisualCalendar({ className, customClosures: propCustomClosures, onDateClick }: VisualCalendarProps) {
    const t = useTranslations('calendar');
    const DAYS = t.raw('days') as string[];
    const MONTHS = t.raw('months') as string[];

    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [fetchedClosures, setFetchedClosures] = useState<Closure[]>([]);
    const [hoveredDate, setHoveredDate] = useState<string | null>(null);

    useEffect(() => {
        if (!propCustomClosures) {
            fetch('/data/custom-closures.json')
                .then(res => res.json())
                .then(data => {
                    setFetchedClosures(normalizeClosures(data));
                })
                .catch(() => { });
        }
    }, [propCustomClosures]);

    // Normalize closures to new format (with reasons array)
    const normalizeClosures = (closures: any[] | undefined): Closure[] => {
        if (!closures || !Array.isArray(closures)) return [];
        return closures.map((item: any) => {
            if (typeof item === 'string') {
                // Very old format: just date string
                return { date: item, reasons: ['other'] as ClosureReason[] };
            } else if (item.reason && !item.reasons) {
                // Old format: single reason
                return { date: item.date, reasons: [item.reason] as ClosureReason[] };
            } else if (item.reasons) {
                // New format: array of reasons
                return item as Closure;
            }
            return { date: item.date || item, reasons: ['other'] as ClosureReason[] };
        });
    };

    const activeCustomClosures = propCustomClosures ? normalizeClosures(propCustomClosures) : fetchedClosures;

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

    const getClosureInfo = (dateStr: string): Closure | undefined => {
        return activeCustomClosures.find(c => c.date === dateStr);
    };

    // Format date to YYYY-MM-DD without timezone conversion
    const formatDateStr = (year: number, month: number, day: number): string => {
        const m = String(month + 1).padStart(2, '0');
        const d = String(day).padStart(2, '0');
        return `${year}-${m}-${d}`;
    };

    const getDayStatus = (day: number): 'open' | 'closed' | 'exception' | 'today' => {
        const date = new Date(currentYear, currentMonth, day);
        const dateStr = formatDateStr(currentYear, currentMonth, day);
        const isToday = date.toDateString() === today.toDateString();

        // Check if it's in the static config OR in the custom closures
        const closure = getClosureInfo(dateStr);
        if (isClosedDate(date) || closure) return 'exception';

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
            const dateStr = formatDateStr(currentYear, currentMonth, day);
            const hours = getOpeningHours(date);
            const closure = getClosureInfo(dateStr);

            let bgColor = '';
            let textColor = 'text-foreground';
            let title = '';

            switch (status) {
                case 'open':
                    bgColor = 'bg-green-500/20 hover:bg-green-500/30';
                    textColor = 'text-green-700 dark:text-green-400';
                    title = `${t('open')} ${hours}`;
                    break;
                case 'closed':
                    bgColor = 'bg-muted/50';
                    textColor = 'text-muted-foreground';
                    title = t('seasonalClosure');
                    break;
                case 'exception':
                    bgColor = 'bg-red-500/20 hover:bg-red-500/30';
                    textColor = 'text-red-700 dark:text-red-400';
                    if (closure) {
                        const reasonLabels = closure.reasons.map(r => closureReasons[r].labelFr).join(', ');
                        title = `${t('exceptionalClosure')} - ${reasonLabels}`;
                    } else {
                        title = t('exceptionalClosure');
                    }
                    break;
                case 'today':
                    bgColor = 'bg-primary hover:bg-primary/90';
                    textColor = 'text-primary-foreground';
                    title = `${t('today')} - ${hours || t('closed')}`;
                    break;
            }

            const isHovered = hoveredDate === dateStr;

            days.push(
                <motion.div
                    key={day}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onDateClick?.(dateStr)}
                    onMouseEnter={() => setHoveredDate(dateStr)}
                    onMouseLeave={() => setHoveredDate(null)}
                    className={`h-10 w-10 sm:h-11 sm:w-11 rounded-xl flex items-center justify-center text-sm sm:text-base font-bold transition-all relative ${bgColor} ${textColor} ${onDateClick ? 'cursor-pointer active:scale-95' : 'cursor-default'}`}
                    title={title}
                >
                    {/* Show icons for exceptional closures */}
                    {status === 'exception' && closure && (
                        <span className="absolute -top-2 -right-2 text-sm drop-shadow-md">
                            {getClosureIcons(closure.reasons)}
                        </span>
                    )}
                    {day}

                    {/* Tooltip on hover for exceptional closures */}
                    {isHovered && status === 'exception' && closure && !onDateClick && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-900 text-white text-[10px] rounded whitespace-nowrap z-10 shadow-lg">
                            {getClosureIcons(closure.reasons)} {closure.reasons.map(r => closureReasons[r].labelFr).join(', ')}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900" />
                        </div>
                    )}
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
                        <h3 className="text-base sm:text-lg font-bold">{t('calendarTitle')}</h3>
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
                    {season === 'winter' ? t('winterSeasonLabel') :
                        season === 'summer' ? t('summerSeasonLabel') :
                            t('annualClosure')}
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
                    <p className="text-xs font-bold text-muted-foreground mb-3">{t('legend')}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-green-500/20" />
                            <span>{t('open')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-red-500/20" />
                            <span>{t('closed')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-muted/50" />
                            <span>{t('offSeason')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-primary" />
                            <span>{t('today')}</span>
                        </div>
                    </div>

                    {/* Closure reasons legend */}
                    {activeCustomClosures.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-border/50">
                            <p className="text-xs font-bold text-muted-foreground mb-2">Fermetures exceptionnelles :</p>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(closureReasons).map(([key, value]) => (
                                    <span key={key} className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                                        {value.icon} {value.labelFr}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Opening Hours */}
                <div className="mt-4 p-3 bg-muted/30 rounded-lg text-xs">
                    <p className="font-bold mb-2">{t('datesAndHours')}</p>
                    <p className="mb-1">❄️ <strong>{t('winter2025')}</strong></p>
                    <p className="text-muted-foreground mb-2">{t('winter2025Hours')}</p>
                    <p className="mb-1">☀️ <strong>{t('summer2026')}</strong></p>
                    <p className="text-muted-foreground">{t('summer2026Hours')}</p>
                </div>
            </CardContent>
        </Card>
    );
}
