import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = () => {
    const [progress, setProgress] = useState(0);
    const containerRef = useRef(null);
    const counterRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 10) + 1;
            });
        }, 100);

        // Initial State
        gsap.set(containerRef.current, { yPercent: 0 });

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            const tl = gsap.timeline();

            tl.to(counterRef.current, {
                opacity: 0,
                duration: 0.5,
                delay: 0.2
            })
                .to(containerRef.current, {
                    yPercent: -100,
                    duration: 1.2,
                    ease: "power4.inOut",
                });
        }
    }, [progress]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-cinema-white flex items-end justify-end p-10 md:p-20 text-cinema-black"
        >
            <div className="overflow-hidden">
                <h1 ref={counterRef} className="text-9xl md:text-[12rem] font-display font-bold tracking-tighter leading-none">
                    {Math.min(progress, 100)}%
                </h1>
            </div>
        </div>
    );
};

export default Preloader;
