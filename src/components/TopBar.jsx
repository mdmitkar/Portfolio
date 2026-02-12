import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Volume2, Search, Power, Terminal, Layers, Shield, ChevronDown, Monitor, Cpu } from 'lucide-react';

const TopBar = ({ onOpenMenu }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 h-7 flex items-center justify-between px-4 z-50 text-sm font-medium select-none bg-[#1c1c1c] text-gray-200 border-b border-black/20 shadow-sm">
            {/* Left: Activities */}
            <div className="flex items-center h-full">
                <button
                    onClick={onOpenMenu}
                    className="flex items-center gap-2 hover:bg-white/10 px-3 py-0.5 rounded-full transition-colors cursor-pointer text-sm"
                >
                    <span>Activities</span>
                </button>
            </div>

            {/* Center: Clock */}
            <div className="absolute left-1/2 -translate-x-1/2 font-bold text-sm tracking-wide cursor-default">
                {time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}&nbsp;
                {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
            </div>

            {/* Right: System Status */}
            <div className="flex items-center gap-3 h-full px-2">
                <div className="flex items-center gap-3 px-2 py-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
                    <Wifi size={14} />
                    <Volume2 size={14} />
                    <Battery size={14} />
                    <ChevronDown size={10} />
                </div>
            </div>
        </div>
    );
};

export default TopBar;
