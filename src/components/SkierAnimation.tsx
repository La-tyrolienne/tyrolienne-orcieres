'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from './theme-provider';

interface Skier {
    id: number;
    startX: number;
    startY: number;
    speed: number;
    scale: number;
    delay: number;
}

export function SkierAnimation() {
    const { season } = useTheme();
    const { scrollYProgress } = useScroll();
    const [skiers, setSkiers] = useState<Skier[]>([]);

    useEffect(() => {
        // Generate multiple skiers with different properties
        const generatedSkiers: Skier[] = [
            { id: 1, startX: -5, startY: 15, speed: 1, scale: 1.2, delay: 0 },
            { id: 2, startX: -15, startY: 25, speed: 0.8, scale: 0.9, delay: 0.2 },
            { id: 3, startX: -10, startY: 35, speed: 1.1, scale: 1, delay: 0.5 },
            { id: 4, startX: -20, startY: 45, speed: 0.7, scale: 0.7, delay: 0.8 },
            { id: 5, startX: -8, startY: 55, speed: 0.9, scale: 0.85, delay: 1.2 },
        ];
        setSkiers(generatedSkiers);
    }, []);

    return (
        <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
            {skiers.map((skier) => (
                <SkierElement
                    key={skier.id}
                    skier={skier}
                    scrollYProgress={scrollYProgress}
                    season={season}
                />
            ))}
        </div>
    );
}

function SkierElement({
    skier,
    scrollYProgress,
    season
}: {
    skier: Skier;
    scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
    season: 'winter' | 'summer';
}) {
    const x = useTransform(
        scrollYProgress,
        [skier.delay / 3, (skier.delay + 1) / 3],
        [`${skier.startX}%`, `${120}%`]
    );
    const y = useTransform(
        scrollYProgress,
        [skier.delay / 3, (skier.delay + 1) / 3],
        [`${skier.startY}%`, `${skier.startY + 40}%`]
    );
    const opacity = useTransform(
        scrollYProgress,
        [skier.delay / 3, skier.delay / 3 + 0.05, (skier.delay + 0.9) / 3, (skier.delay + 1) / 3],
        [0, 1, 1, 0]
    );

    return (
        <motion.div
            style={{
                x,
                y,
                opacity,
                scale: skier.scale,
            }}
            className="absolute"
        >
            <svg
                width="60"
                height="45"
                viewBox="0 0 60 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: 'rotate(-15deg)' }}
            >
                {/* Skier body - superman position */}
                {season === 'winter' ? (
                    <>
                        {/* Winter gear */}
                        <ellipse cx="30" cy="12" rx="6" ry="5" fill="#FFE0C2" /> {/* Head */}
                        <path d="M24 10 L20 6 Q18 4 16 6 L20 12 Z" fill="#1E40AF" /> {/* Helmet */}
                        <ellipse cx="30" cy="12" rx="6" ry="5" fill="#FFE0C2" opacity="0.8" /> {/* Face */}
                        <path d="M23 11 L37 11 L35 13 L25 13 Z" fill="#0EA5E9" opacity="0.8" /> {/* Goggles */}

                        {/* Body stretched out */}
                        <path d="M24 14 L8 22 Q4 24 6 28 L12 26 L26 20 L24 14" fill="#1E40AF" /> {/* Left arm */}
                        <path d="M36 14 L52 22 Q56 24 54 28 L48 26 L34 20 L36 14" fill="#1E40AF" /> {/* Right arm */}
                        <ellipse cx="30" cy="22" rx="8" ry="6" fill="#1E40AF" /> {/* Torso */}

                        {/* Legs */}
                        <path d="M26 26 L16 42 Q14 45 18 44 L28 36 L26 26" fill="#1E3A5F" /> {/* Left leg */}
                        <path d="M34 26 L44 42 Q46 45 42 44 L32 36 L34 26" fill="#1E3A5F" /> {/* Right leg */}

                        {/* Ski boots */}
                        <ellipse cx="17" cy="43" rx="4" ry="2" fill="#FFA500" />
                        <ellipse cx="43" cy="43" rx="4" ry="2" fill="#FFA500" />
                    </>
                ) : (
                    <>
                        {/* Summer gear - hiking/adventure style */}
                        <ellipse cx="30" cy="12" rx="6" ry="5" fill="#FFE0C2" /> {/* Head */}
                        <path d="M24 8 L36 8 L34 4 L26 4 Z" fill="#22C55E" /> {/* Cap */}

                        {/* Body */}
                        <path d="M24 14 L8 22 Q4 24 6 28 L12 26 L26 20 L24 14" fill="#F97316" /> {/* Left arm */}
                        <path d="M36 14 L52 22 Q56 24 54 28 L48 26 L34 20 L36 14" fill="#F97316" /> {/* Right arm */}
                        <ellipse cx="30" cy="22" rx="8" ry="6" fill="#F97316" /> {/* Torso */}

                        {/* Legs */}
                        <path d="M26 26 L16 42 Q14 45 18 44 L28 36 L26 26" fill="#0284C7" /> {/* Left leg */}
                        <path d="M34 26 L44 42 Q46 45 42 44 L32 36 L34 26" fill="#0284C7" /> {/* Right leg */}

                        {/* Shoes */}
                        <ellipse cx="17" cy="43" rx="4" ry="2" fill="#92400E" />
                        <ellipse cx="43" cy="43" rx="4" ry="2" fill="#92400E" />
                    </>
                )}

                {/* Speed lines */}
                <line x1="0" y1="20" x2="-15" y2="20" stroke="white" strokeWidth="1" opacity="0.5" />
                <line x1="2" y1="25" x2="-12" y2="26" stroke="white" strokeWidth="1" opacity="0.3" />
                <line x1="4" y1="15" x2="-10" y2="14" stroke="white" strokeWidth="1" opacity="0.4" />
            </svg>
        </motion.div>
    );
}
