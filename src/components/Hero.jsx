import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useScramble } from '../hooks/useScramble';
import { BadgeCheck, Zap } from 'lucide-react';

const ScrambleText = ({ text, className, delay = 0 }) => {
    const { displayText, scramble } = useScramble(text, 40); // Slower speed for better matrix feel

    useEffect(() => {
        const timer = setTimeout(() => {
            scramble();
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <span
            className={`inline-block cursor-crosshair hover:text-cinema-accent transition-colors duration-300 ${className}`}
            onMouseEnter={scramble}
        >
            {displayText}
        </span>
    );
};

const Hero = () => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const glowRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Initial State - Hidden
        gsap.set([contentRef.current.children], { opacity: 0, y: 30 });

        // Animate Content In with Stagger
        tl.to(contentRef.current.children, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power4.out",
            delay: 0.5 // Wait for Preloader
        });

        // Spotlight Logic - Optimized with ticker for performance
        const pos = { x: 0, y: 0 };
        const mouse = { x: 0, y: 0 };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const updateGlow = () => {
            // Smooth lerp for glow following
            pos.x += (mouse.x - pos.x) * 0.1;
            pos.y += (mouse.y - pos.y) * 0.1;

            if (glowRef.current) {
                gsap.set(glowRef.current, { x: pos.x, y: pos.y });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        gsap.ticker.add(updateGlow);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            gsap.ticker.remove(updateGlow);
        };
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-cinema-black selection:bg-cinema-accent selection:text-black">

            {/* Optimized Spotlight Glow */}
            <div
                ref={glowRef}
                className="fixed top-0 left-0 w-[800px] h-[800px] bg-cinema-accent/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0 mix-blend-screen will-change-transform"
            />

            <div ref={contentRef} className="relative z-10 text-center px-4 flex flex-col items-center">

                {/* Cyber Badge */}
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cinema-accent/30 bg-cinema-accent/5 mb-10 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,157,0.1)]">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cinema-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-cinema-accent"></span>
                    </span>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-cinema-accent flex items-center gap-2">
                        System Online <Zap size={12} className="fill-current" />
                    </span>
                </div>

                <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-display font-black tracking-tighter mb-6 text-white uppercase leading-[0.9] mix-blend-screen">
                    <div className="overflow-hidden">
                        <ScrambleText text="Muhammad" delay={800} />
                    </div>
                    <div className="overflow-hidden">
                        <ScrambleText text="Mitkar" delay={1400} />
                    </div>
                </h1>

                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mt-8">
                    <p className="flex items-center gap-3 text-lg md:text-xl font-mono text-cinema-white/80 tracking-widest uppercase bg-white/5 px-6 py-2 rounded-lg border border-white/5">
                        <span className="text-cinema-accent font-bold">&lt;</span>
                        Full Stack
                        <span className="text-cinema-accent font-bold">/&gt;</span>
                    </p>
                    <span className="hidden md:block w-px h-8 bg-white/20"></span>
                    <p className="flex items-center gap-3 text-lg md:text-xl font-mono text-cinema-secondary/90 tracking-widest uppercase bg-white/5 px-6 py-2 rounded-lg border border-white/5 shadow-[0_0_15px_rgba(255,0,255,0.1)]">
                        [ AI Engineer ]
                    </p>
                </div>

                {/* Tactical Buttons */}
                <div className="flex flex-col md:flex-row gap-6 mt-16 w-full max-w-md">
                    <button className="group relative w-full h-14 bg-white text-black font-bold font-mono text-sm uppercase tracking-wider overflow-hidden clip-path-slant hover:scale-105 transition-transform duration-300">
                        <div className="absolute inset-0 bg-cinema-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                        <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-black transition-colors">
                            Initiate Sequence
                        </span>
                    </button>
                    <button className="group relative w-full h-14 bg-transparent border border-white/20 text-white font-bold font-mono text-sm uppercase tracking-wider overflow-hidden hover:border-cinema-secondary/50 transition-colors duration-300">
                        <div className="absolute inset-0 bg-cinema-secondary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Connect Network
                        </span>
                    </button>
                </div>
            </div>

        </section>
    );
};

export default Hero;
