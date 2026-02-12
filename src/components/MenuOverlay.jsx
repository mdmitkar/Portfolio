import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

const MenuOverlay = ({ isOpen, toggleMenu }) => {
    const menuRef = useRef(null);
    const linksRef = useRef([]);
    const backgroundRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ paused: true });

        // Initial Set
        gsap.set(menuRef.current, { visibility: 'hidden' });

        tl.to(menuRef.current, {
            visibility: 'visible',
            duration: 0,
        })
            .to(backgroundRef.current, {
                y: '0%',
                duration: 0.8,
                ease: 'power4.inOut',
            })
            .fromTo(linksRef.current, {
                y: 100,
                opacity: 0,
                skewY: 5,
            }, {
                y: 0,
                opacity: 1,
                skewY: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
            }, "-=0.4");

        if (isOpen) {
            tl.play();
        } else {
            tl.reverse();
        }
    }, [isOpen]);

    const addToRefs = (el) => {
        if (el && !linksRef.current.includes(el)) {
            linksRef.current.push(el);
        }
    };

    return (
        <div ref={menuRef} className="fixed inset-0 z-[100] invisible">
            {/* Solid Background Curtain */}
            <div
                ref={backgroundRef}
                className="absolute top-0 left-0 w-full h-full bg-cinema-white text-cinema-black translate-y-full will-change-transform"
            >
                <div className="flex flex-col h-full justify-center items-center relative">

                    {/* Close Button */}
                    <button
                        onClick={toggleMenu}
                        className="absolute top-8 right-8 p-4 rounded-full border border-cinema-black/20 hover:bg-cinema-black hover:text-cinema-white transition-all duration-300"
                    >
                        <X size={24} />
                    </button>

                    {/* Navigation Links */}
                    <nav className="flex flex-col gap-4 text-center">
                        {['Work', 'About', 'Contact'].map((item, index) => (
                            <div key={index} className="overflow-hidden">
                                <Link
                                    to={item === 'Work' ? '/' : `/${item.toLowerCase()}`}
                                    className="text-7xl md:text-9xl font-display font-bold uppercase tracking-tighter hover:text-transparent hover:text-stroke-black transition-all block leading-none"
                                    ref={addToRefs}
                                    onClick={() => toggleMenu()}
                                    style={{ WebkitTextStroke: '2px transparent' }}
                                >
                                    {item}
                                </Link>
                            </div>
                        ))}
                    </nav>

                    {/* Footer Links */}
                    <div className="absolute bottom-10 flex gap-8 text-sm font-body uppercase tracking-widest opacity-60">
                        <a href="#" className="hover:underline">LinkedIn</a>
                        <a href="mailto:mmitkar22it@student.mes.ac.in" className="hover:underline">Email</a>
                        <a href="#" className="hover:underline">Github</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuOverlay;
