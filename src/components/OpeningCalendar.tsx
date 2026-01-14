'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useTheme } from './theme-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Mock opening schedule data
const getOpeningSchedule = (year: number, month: number, season: 'winter' | 'summer') => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const schedule: Record<number, 'open' | 'closed' | 'special'> = {};

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayOfWeek = date.getDay();

        // Simple logic: weekends and holidays are open, some weekdays closed
        if (season === 'winter') {
            // Winter: open every day during peak season (Dec-March)
            if (month >= 11 || month <= 2) {
                schedule[day] = 'open';
            } else {
                // Off-season: weekends only
                schedule[day] = dayOfWeek === 0 || dayOfWeek === 6 ? 'special' : 'closed';
            }
        } else {
            // Summer: open June-September
            if (month >= 5 && month <= 8) {
                schedule[day] = 'open';
            } else {
                schedule[day] = 'closed';
            }
        }
    }

    return schedule;
};

export function OpeningCalendar() {
    const t = useTranslations('calendar');
    const { season } = useTheme();
    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const schedule = getOpeningSchedule(year, month, season);

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const monthNames = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];

    const dayNames = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const getStatusColor = (status: 'open' | 'closed' | 'special') => {
        switch (status) {
            case 'open':
                return 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
            case 'closed':
                return 'opacity-30 grayscale';
            case 'special':
                return 'bg-primary/20 text-primary border-primary/30';
        }
    };

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />
            </div>

            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    {/* Header Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-2/5"
                    >
                        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-black uppercase tracking-[0.2em] rounded-lg bg-primary/10 text-primary border border-primary/20">
                            {season === 'winter' ? t('winterSeason') : t('summerSeason')}
                        </span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase italic mb-8 leading-[0.8] tracking-tighter">
                            {t('title')}
                        </h2>
                        <div className="space-y-6 text-lg text-muted-foreground mb-12 max-w-sm">
                            <p>Planifiez votre vol en fonction des conditions d'ouverture.</p>

                            <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                    <span className="text-sm font-bold uppercase tracking-widest text-foreground">{t('open')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                                    <span className="text-sm font-bold uppercase tracking-widest text-foreground">{t('special')}</span>
                                </div>
                                <div className="flex items-center gap-3 opacity-50">
                                    <div className="w-3 h-3 rounded-full bg-zinc-500" />
                                    <span className="text-sm font-bold uppercase tracking-widest text-foreground">{t('closed')}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Calendar Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-3/5 w-full"
                    >
                        <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
                            <div className="flex items-center justify-between mb-12">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={prevMonth}
                                    className="rounded-full w-12 h-12 bg-white/5 border-white/10 hover:bg-white/10 transition-all"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </Button>
                                <div className="text-center">
                                    <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter leading-none">
                                        {monthNames[month]}
                                    </h3>
                                    <p className="text-sm font-bold text-muted-foreground tracking-[0.2em] mt-2">{year}</p>
                                </div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={nextMonth}
                                    className="rounded-full w-12 h-12 bg-white/5 border-white/10 hover:bg-white/10 transition-all"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </Button>
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-2 md:gap-4">
                                {dayNames.map((day) => (
                                    <div key={day} className="text-center text-[10px] md:text-xs font-black text-muted-foreground uppercase tracking-[0.2em] pb-6">
                                        {day}
                                    </div>
                                ))}

                                {Array.from({ length: firstDayOfMonth }, (_, i) => (
                                    <div key={`empty-${i}`} className="aspect-square" />
                                ))}

                                {Array.from({ length: daysInMonth }, (_, i) => {
                                    const day = i + 1;
                                    const status = schedule[day];
                                    const isToday =
                                        day === new Date().getDate() &&
                                        month === new Date().getMonth() &&
                                        year === new Date().getFullYear();

                                    return (
                                        <motion.div
                                            key={day}
                                            whileHover={{ scale: 1.05 }}
                                            className={`
                                                aspect-square flex items-center justify-center rounded-xl md:rounded-2xl text-base md:text-xl font-black italic
                                                border transition-all duration-300
                                                ${getStatusColor(status)}
                                                ${isToday ? 'ring-2 ring-primary ring-offset-4 ring-offset-background' : ''}
                                            `}
                                        >
                                            {day}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
