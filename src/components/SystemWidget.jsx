import React, { useState, useEffect } from 'react';

const SystemWidget = () => {
    const [stats, setStats] = useState({
        cpu: 12,
        ram: 1.4,
        network: { up: 45, down: 120 },
        uptime: '2h 14m'
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                cpu: Math.min(100, Math.max(5, prev.cpu + (Math.random() * 10 - 5))),
                ram: Math.min(32, Math.max(1.2, prev.ram + (Math.random() * 0.2 - 0.1))),
                network: {
                    up: Math.floor(Math.random() * 500),
                    down: Math.floor(Math.random() * 2000)
                },
                uptime: prev.uptime // Static for demo
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute top-20 right-8 w-64 p-4 font-mono text-xs text-white/80 bg-black/40 backdrop-blur-sm rounded-lg border border-white/5 pointer-events-none select-none z-0">
            <div className="text-blue-400 font-bold mb-2 border-b border-blue-500/30 pb-1">SYSTEM MONITOR</div>

            <div className="flex justify-between mb-1">
                <span>CPU Usage:</span>
                <span className={stats.cpu > 80 ? 'text-red-400' : 'text-green-400'}>{stats.cpu.toFixed(1)}%</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded mb-3">
                <div className="h-full bg-blue-500 rounded transition-all duration-500" style={{ width: `${stats.cpu}%` }}></div>
            </div>

            <div className="flex justify-between mb-1">
                <span>Memory:</span>
                <span className="text-purple-400">{stats.ram.toFixed(1)} GB / 64 GB</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded mb-3">
                <div className="h-full bg-purple-500 rounded transition-all duration-500" style={{ width: `${(stats.ram / 64) * 100}%` }}></div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-white/5">
                <div>
                    <div className="opacity-50 text-[10px]">UPLOAD</div>
                    <div className="text-yellow-400">{stats.network.up} KB/s</div>
                </div>
                <div className="text-right">
                    <div className="opacity-50 text-[10px]">DOWNLOAD</div>
                    <div className="text-green-400">{stats.network.down} KB/s</div>
                </div>
            </div>
        </div>
    );
};

export default SystemWidget;
