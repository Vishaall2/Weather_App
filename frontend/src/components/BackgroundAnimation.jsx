import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

function BackgroundAnimation({ condition }) {
    const [vantaEffect, setVantaEffect] = useState(null);
    const myRef = useRef(null);

    if (!condition) condition = 'clear'; // default state
    const mainCondition = condition.toLowerCase();

    const isRainy = mainCondition.includes('rain') || mainCondition.includes('drizzle');
    const isCloudy = mainCondition.includes('cloud') || mainCondition.includes('haze') || mainCondition.includes('mist');
    const isClear = mainCondition.includes('clear') || mainCondition.includes('sun');
    const isSnowy = mainCondition.includes('snow');

    useEffect(() => {
        if (!vantaEffect && (isClear || isCloudy) && window.VANTA) {
            setVantaEffect(window.VANTA.BIRDS({
                el: myRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                backgroundColor: 0x000000,
                backgroundAlpha: 0.0, // Transparent so the tailwind gradient shows through
                color1: 0x000000,
                color2: 0xffffff,
                colorMode: "lerp",
                birdSize: 1.2,
                wingSpan: 20.00,
                speedLimit: 4.00,
                separation: 20.00,
                alignment: 20.00,
                cohesion: 20.00,
                quantity: 4.00
            }));
        }

        // Cleanup function
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect, isClear, isCloudy]);

    // Raining Animation
    if (isRainy) {
        const drops = Array.from({ length: 50 });
        return (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {drops.map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-blue-200/40 w-[2px] rounded-full"
                        style={{
                            height: `${Math.random() * 20 + 10}px`,
                            left: `${Math.random() * 100}%`,
                            top: `-50px`
                        }}
                        animate={{
                            y: ['0vh', '110vh'],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: Math.random() * 0.7 + 0.5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 2
                        }}
                    />
                ))}
            </div>
        );
    }

    // Snowing Animation
    if (isSnowy) {
        const flakes = Array.from({ length: 40 });
        return (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {flakes.map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white/80 rounded-full blur-[1px]"
                        style={{
                            width: `${Math.random() * 6 + 3}px`,
                            height: `${Math.random() * 6 + 3}px`,
                            left: `${Math.random() * 100}%`,
                            top: `-50px`
                        }}
                        animate={{
                            y: ['0vh', '110vh'],
                            x: ['-20px', '20px', '-20px'],
                            opacity: [0, 1, 0] // Fade in and out
                        }}
                        transition={{
                            y: { duration: Math.random() * 5 + 4, repeat: Infinity, ease: "linear", delay: Math.random() * 5 },
                            x: { duration: Math.random() * 3 + 2, repeat: Infinity, ease: "easeInOut", yoyo: Infinity },
                            opacity: { duration: Math.random() * 5 + 4, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }
                        }}
                    />
                ))}
            </div>
        );
    }

    // Cloudy Animation (Drifting Clouds + Vanta Birds)
    if (isCloudy) {
        const clouds = Array.from({ length: 6 });
        return (
            <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none" ref={myRef}>
                {clouds.map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white/20 rounded-full blur-[40px]"
                        style={{
                            width: `${Math.random() * 300 + 150}px`,
                            height: `${Math.random() * 150 + 80}px`,
                            top: `${Math.random() * 50}%`,
                            left: `-400px` // Start way off-screen
                        }}
                        animate={{
                            x: ['-20vw', '130vw'],
                        }}
                        transition={{
                            duration: Math.random() * 30 + 30, // Very slow drifting
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 20
                        }}
                    />
                ))}
            </div>
        );
    }

    // Sunny/Clear Animation (Glowing floating orbs + Vanta Birds)
    if (isClear) {
        const rays = Array.from({ length: 15 });
        return (
            <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none" ref={myRef}>
                {rays.map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-orange-100/20 rounded-full blur-[30px]"
                        style={{
                            width: `${Math.random() * 150 + 50}px`,
                            height: `${Math.random() * 150 + 50}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                        }}
                        animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.2, 0.6, 0.2],
                            y: [0, -40, 0],
                            x: [0, 30, 0]
                        }}
                        transition={{
                            duration: Math.random() * 6 + 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 3
                        }}
                    />
                ))}
            </div>
        );
    }

    return <div className="absolute inset-0 pointer-events-none z-0"></div>;
}

export default BackgroundAnimation;
