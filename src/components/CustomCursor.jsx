import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        const moveCursor = (e) => {
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
        };

        window.addEventListener('mousemove', moveCursor);

        // Hover effects
        const handleHover = () => {
            gsap.to(cursorRef.current, { scale: 3, mixBlendMode: 'difference', backgroundColor: '#fff', duration: 0.3 });
        };

        const handleHoverOut = () => {
            gsap.to(cursorRef.current, { scale: 1, mixBlendMode: 'normal', backgroundColor: '#fff', duration: 0.3 });
        };

        const links = document.querySelectorAll('a, button, .cursor-pointer');
        links.forEach(link => {
            link.addEventListener('mouseenter', handleHover);
            link.addEventListener('mouseleave', handleHoverOut);
        });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            links.forEach(link => {
                link.removeEventListener('mouseenter', handleHover);
                link.removeEventListener('mouseleave', handleHoverOut);
            });
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        />
    );
};

export default CustomCursor;
