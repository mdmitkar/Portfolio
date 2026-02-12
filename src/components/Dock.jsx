import React, { useRef } from 'react';
import { User, Briefcase, Mail, Terminal as TerminalIcon, Grid } from 'lucide-react';
import gsap from 'gsap';

const DockItem = ({ icon: Icon, label, onClick, isOpen }) => {
    const itemRef = useRef(null);

    const handleMouseEnter = () => {
        gsap.to(itemRef.current, {
            y: -5,
            duration: 0.2,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = () => {
        gsap.to(itemRef.current, {
            y: 0,
            duration: 0.2,
            ease: "power2.out"
        });
    };

    return (
        <div className="flex flex-col items-center gap-2 group">
            <button
                ref={itemRef}
                className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                    ${isOpen ? 'bg-os-accent/20 border-os-accent/50' : 'bg-white/5 hover:bg-white/10 border-white/10'}
                    border backdrop-blur-md shadow-lg
                `}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={onClick}
            >
                <Icon size={22} className={isOpen ? 'text-os-accent' : 'text-gray-300 group-hover:text-white'} />

                {/* Active Indicator (Linux style bar) */}
                {isOpen && (
                    <span className="absolute -bottom-1 w-4 h-1 bg-os-accent rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
                )}
            </button>

            {/* Tooltip */}
            <span className="text-[10px] font-medium text-white/90 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 px-3 py-1 bg-gray-900 rounded shadow-lg border border-white/10 pointer-events-none whitespace-nowrap">
                {label}
            </span>
        </div>
    );
};

const Dock = ({ openWindow, windows }) => {
    return (
        <div className="fixed top-7 left-0 bottom-0 w-16 bg-[#181818]/90 backdrop-blur-md z-40 flex flex-col items-center py-2 gap-2 border-r border-white/5 shadow-2xl">
            {/* Ubuntu App Grid */}
            <DockItem
                icon={Grid}
                label="Show Applications"
                onClick={() => { }}
                isOpen={false}
                isGrid={true}
            />

            <div className="w-8 h-[1px] bg-white/10 my-1"></div>

            <DockItem
                icon={TerminalIcon}
                label="Terminal"
                onClick={() => openWindow('terminal')}
                isOpen={windows.find(w => w.id === 'terminal')?.isOpen}
            />
            <DockItem
                icon={Briefcase}
                label="Projects"
                onClick={() => openWindow('work')}
                isOpen={windows.find(w => w.id === 'work')?.isOpen}
            />
            <DockItem
                icon={User}
                label="Profile"
                onClick={() => openWindow('about')}
                isOpen={windows.find(w => w.id === 'about')?.isOpen}
            />
            <DockItem
                icon={Mail}
                label="Contact"
                onClick={() => openWindow('contact')}
                isOpen={windows.find(w => w.id === 'contact')?.isOpen}
            />

            {/* Separator for open windows */}
            {windows.some(win => win.isOpen) && <div className="w-8 h-[1px] bg-white/10 my-1"></div>}

            {/* Dynamically rendered dock items for open windows */}
            {windows.filter(win => win.isOpen).map(win => (
                <div key={win.id} className="flex flex-col items-center gap-2 group">
                    <button
                        onClick={() => {
                            // This logic assumes openWindow will handle un-minimizing if the window is already open but minimized
                            openWindow(win.id);
                        }}
                        className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                            ${win.active && !win.minimized ? 'bg-os-accent/20 border-os-accent/50' : 'bg-white/5 hover:bg-white/10 border-white/10'}
                            border backdrop-blur-md shadow-lg
                            ${win.minimized ? 'opacity-50 grayscale' : ''}
                        `}
                        title={win.title}
                    >
                        {/* Assuming win.icon is available, otherwise use a default or placeholder */}
                        {win.icon && <win.icon size={22} className={win.active && !win.minimized ? 'text-os-accent' : 'text-gray-300 group-hover:text-white'} />}
                        {!win.icon && <TerminalIcon size={22} className={win.active && !win.minimized ? 'text-os-accent' : 'text-gray-300 group-hover:text-white'} />} {/* Fallback icon */}

                        {/* Active Indicator */}
                        {win.active && !win.minimized && (
                            <span className="absolute -bottom-1 w-4 h-1 bg-os-accent rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
                        )}
                    </button>
                    {/* Tooltip */}
                    <span className="text-[10px] font-medium text-white/90 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 px-3 py-1 bg-gray-900 rounded shadow-lg border border-white/10 pointer-events-none whitespace-nowrap">
                        {win.title}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Dock;
