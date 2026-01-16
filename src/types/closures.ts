// Types pour les fermetures avec raisons

export type ClosureReason = 'wind' | 'rain' | 'snow' | 'fog' | 'other';

export interface Closure {
    date: string;
    reasons: ClosureReason[]; // Changed from 'reason' to 'reasons' array
}

// Labels et icônes pour chaque raison
export const closureReasons: Record<ClosureReason, { label: string; icon: string; labelFr: string }> = {
    wind: { label: 'Too much wind', icon: '💨', labelFr: 'Trop de vent' },
    rain: { label: 'Rain', icon: '🌧️', labelFr: 'Pluie' },
    snow: { label: 'Snow', icon: '❄️', labelFr: 'Neige' },
    fog: { label: 'Fog', icon: '🌫️', labelFr: 'Brouillard' },
    other: { label: 'Other', icon: '⚠️', labelFr: 'Autre' },
};

// Helper pour obtenir le label traduit
export function getClosureReasonLabel(reason: ClosureReason, locale: string = 'fr'): string {
    const info = closureReasons[reason];
    return locale === 'fr' ? info.labelFr : info.label;
}

// Helper pour obtenir l'icône
export function getClosureReasonIcon(reason: ClosureReason): string {
    return closureReasons[reason].icon;
}

// Helper pour obtenir toutes les icônes d'une fermeture
export function getClosureIcons(reasons: ClosureReason[]): string {
    return reasons.map(r => closureReasons[r].icon).join('');
}

// Helper pour parser une date string sans problème de timezone
export function parseDateString(dateStr: string): Date {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
}

// Helper pour formater une date en français
export function formatDateFr(dateStr: string): string {
    const date = parseDateString(dateStr);
    return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
}
