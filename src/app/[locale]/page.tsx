import { HeroSection } from '@/components/HeroSection';
import { ReassuranceBanner } from '@/components/ReassuranceBanner';
import { AudienceSection } from '@/components/AudienceSection';
import { SafetySection } from '@/components/SafetySection';
import { TimelineSection } from '@/components/TimelineSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { OpeningCalendar } from '@/components/OpeningCalendar';
import { TicketSection } from '@/components/TicketSection';
import { FAQSection } from '@/components/FAQSection';
import { LocalisationSection } from '@/components/LocalisationSection';
import { FinalCTA } from '@/components/FinalCTA';

export default function Home() {
    return (
        <main>
            <HeroSection />
            <ReassuranceBanner />
            <AudienceSection />
            <TicketSection />
        </main>
    );
}
