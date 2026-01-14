// Configuration des fermetures - Roll'Air Câble
// La tyrolienne suit les dates d'ouverture de la station d'Orcières Merlette
// Modifiez ce fichier pour ajouter/retirer des jours de fermeture exceptionnelle

// ===========================================
// DATES DE LA STATION ORCIÈRES MERLETTE
// ===========================================

// Saison hiver 2025-2026
export const winterSeason2526 = {
    start: new Date('2025-12-13'), // Ouverture 13 décembre 2025
    end: new Date('2026-04-12'),   // Fermeture 12 avril 2026
    hours: '9h30 - 14h30 (piétons) / 15h30 (skieurs)',
    label: 'Hiver 2025-2026',
};

// Saison été 2026 (à mettre à jour quand les dates seront connues)
export const summerSeason2026 = {
    start: new Date('2026-07-01'), // Estimation juillet
    end: new Date('2026-08-31'),   // Estimation fin août
    hours: '9h30 - 16h00',
    label: 'Été 2026',
};

// ===========================================
// FERMETURES EXCEPTIONNELLES
// Ajoutez ici les dates où la tyrolienne est fermée
// même si la station est ouverte (conditions météo, maintenance, etc.)
// Format: 'YYYY-MM-DD'
// ===========================================
export const closedDates: string[] = [
    // Exemples:
    // '2026-01-15', // Maintenance
    // '2026-02-20', // Météo défavorable prévue
];

// ===========================================
// FONCTIONS HELPERS
// ===========================================

// Vérifie si une date est dans la saison hiver
export function isInWinterSeason(date: Date): boolean {
    return date >= winterSeason2526.start && date <= winterSeason2526.end;
}

// Vérifie si une date est dans la saison été
export function isInSummerSeason(date: Date): boolean {
    return date >= summerSeason2026.start && date <= summerSeason2026.end;
}

// Vérifie si un jour est fermé exceptionnellement
export function isClosedDate(date: Date): boolean {
    const dateStr = date.toISOString().split('T')[0];
    return closedDates.includes(dateStr);
}

// Vérifie si on est en saison (hiver ou été)
export function isInSeason(date: Date): 'winter' | 'summer' | 'closed' {
    if (isInWinterSeason(date)) return 'winter';
    if (isInSummerSeason(date)) return 'summer';
    return 'closed';
}

// Obtenir les heures d'ouverture selon la saison
export function getOpeningHours(date: Date): string | null {
    if (isInWinterSeason(date)) return winterSeason2526.hours;
    if (isInSummerSeason(date)) return summerSeason2026.hours;
    return null;
}

// Obtenir le label de la saison actuelle
export function getCurrentSeasonLabel(): string {
    const today = new Date();
    if (isInWinterSeason(today)) return winterSeason2526.label;
    if (isInSummerSeason(today)) return summerSeason2026.label;
    return 'Hors saison';
}
