import React from 'react';
import { Menu } from 'lucide-react';

const Navbar = ({ toggleMenu }) => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-6 mix-blend-difference text-white">
            <div className="text-2xl font-display font-bold tracking-tighter uppercase cursor-pointer hover:opacity-70 transition-opacity">
                Muhammad Mitkar
            </div>
            <button
                onClick={toggleMenu}
                className="group flex items-center gap-2 cursor-pointer"
            >
                <span className="hidden md:block text-sm font-light tracking-widest uppercase group-hover:translate-x-1 transition-transform">Menu</span>
                <div className="bg-white text-black p-2 rounded-full hover:scale-110 transition-transform">
                    <Menu size={20} />
                </div>
            </button>
        </nav>
    );
};

export default Navbar;
