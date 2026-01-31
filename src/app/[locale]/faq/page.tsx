import type { Metadata } from 'next';
import { FAQContent } from '@/components/FAQContent';
import { generateFAQSchema } from '@/lib/schemas';

const faqItems = [
    {
        question: "Quel est l'âge minimum pour faire la tyrolienne ?",
        answer: "L'âge minimum est de 6-7 ans, selon l'adaptation du harnais à la morphologie de l'enfant. Notre équipe évalue chaque cas individuellement pour garantir la sécurité.",
    },
    {
        question: "Quel est le poids maximum autorisé ?",
        answer: "Le poids doit être compris entre 20 kg et 130 kg pour des raisons de sécurité liées au système de freinage.",
    },
    {
        question: "Combien de temps dure le vol ?",
        answer: "Le vol dure environ 1 minute 30 secondes pour parcourir les 1870 mètres de câble à une vitesse pouvant atteindre 130 km/h.",
    },
    {
        question: "La tyrolienne est-elle ouverte en hiver ?",
        answer: "Oui ! La tyrolienne fonctionne été comme hiver. En hiver, le tarif est de 40€ (saison ski) et en été de 35€.",
    },
    {
        question: "Faut-il réserver à l'avance ?",
        answer: "La réservation en ligne est recommandée pour garantir votre créneau, surtout en haute saison. Vous pouvez aussi acheter sur place selon les disponibilités.",
    },
    {
        question: "Que se passe-t-il en cas de mauvais temps ?",
        answer: "En cas de conditions météo défavorables (vent fort, orage), la tyrolienne peut être fermée. Votre billet reste valable 1 an et vous pouvez revenir à une autre date sans frais.",
    },
    {
        question: "Le forfait remontées mécaniques est-il inclus ?",
        answer: "Non, le forfait remontées mécaniques pour accéder au point de départ (sommet du Drouvet) doit être acheté séparément auprès de la station d'Orcières.",
    },
    {
        question: "Peut-on faire la tyrolienne à plusieurs en même temps ?",
        answer: "Oui, le système permet le départ de 2 personnes simultanément sur des lignes parallèles. Idéal pour partager l'expérience en famille ou entre amis !",
    },
    {
        question: "Y a-t-il une réduction pour les groupes ?",
        answer: "Oui, à partir de 10 personnes, bénéficiez de -3€ par billet. Contactez-nous pour organiser votre sortie de groupe.",
    },
    {
        question: "Comment se passe le retour après la tyrolienne ?",
        answer: "L'arrivée se fait au Lac Long à 2500m. De là, vous pouvez redescendre à pied (15 min), en ski l'hiver, ou reprendre les remontées mécaniques.",
    },
];

export const metadata: Metadata = {
    title: 'FAQ',
    description: 'Questions fréquentes sur la tyrolienne d\'Orcières : âge minimum, tarifs, réservation, météo, groupes. Toutes les réponses.',
    alternates: {
        canonical: 'https://www.latyrolienne.fr/fr/faq',
    },
    openGraph: {
        title: 'FAQ | La Tyrolienne d\'Orcières',
        description: 'Toutes les réponses à vos questions sur la tyrolienne Roll\'Air Câble.',
    },
};

export default function FAQPage() {
    const faqSchema = generateFAQSchema(faqItems);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <FAQContent items={faqItems} />
        </>
    );
}
