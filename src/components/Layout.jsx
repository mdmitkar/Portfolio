import React, { useState } from 'react';
import Navbar from './Navbar';
import MenuOverlay from './MenuOverlay';
import useSmoothScroll from '../hooks/useSmoothScroll';

const Layout = ({ children }) => {
    useSmoothScroll();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="font-sans antialiased selection:bg-cinema-white selection:text-cinema-black bg-cinema-black min-h-screen text-cinema-white">
            <Navbar toggleMenu={toggleMenu} />
            <MenuOverlay isOpen={isMenuOpen} toggleMenu={toggleMenu} />
            <main className="relative z-10">
                {children}
            </main>
        </div>
    );
};

export default Layout;
