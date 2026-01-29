'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Snowflake {
    id: number;
    x: number;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
}

export function Snowfall() {
    const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

    useEffect(() => {
        const flakes: Snowflake[] = Array.from({ length: 25 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 10,
            opacity: Math.random() * 0.5 + 0.3,
        }));
        setSnowflakes(flakes);
    }, []);

    return (
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
            {snowflakes.map((flake) => (
                <motion.div
                    key={flake.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: `${flake.x}%`,
                        width: flake.size,
                        height: flake.size,
                        opacity: flake.opacity,
                    }}
                    animate={{
                        y: ['0vh', '100vh'],
                        x: [0, Math.sin(flake.id) * 30],
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: flake.duration,
                        delay: flake.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            ))}
        </div>
    );
}
