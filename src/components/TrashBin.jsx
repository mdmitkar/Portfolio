import React from 'react';
import { FileText, FileCode, AlertTriangle, Loader } from 'lucide-react';

const TrashItem = ({ name, type, size }) => {
    let Icon = FileText;
    let color = "text-gray-400";

    if (type === 'exe') { Icon = FileCode; color = "text-red-400"; }
    if (type === 'log') { Icon = AlertTriangle; color = "text-yellow-400"; }
    if (type === 'loading') { Icon = Loader; color = "text-blue-400"; }

    return (
        <div className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
            <div className={`w-12 h-12 flex items-center justify-center rounded-lg bg-white/5 group-hover:bg-white/10 border border-white/5 ${color}`}>
                <Icon size={24} className={type === 'loading' ? 'animate-spin' : ''} />
            </div>
            <span className="text-xs text-center text-gray-400 group-hover:text-white max-w-[80px] truncate">{name}</span>
            <span className="text-[10px] text-gray-600 group-hover:text-gray-500">{size}</span>
        </div>
    );
};

const TrashBin = () => {
    return (
        <div className="h-full bg-[#1e1e1e] text-gray-300 font-sans flex flex-col">
            {/* Header / Options */}
            <div className="h-10 bg-[#2d2d2d] border-b border-black/20 flex items-center px-4 gap-4 text-xs">
                <button className="bg-red-500/10 text-red-400 px-3 py-1 rounded hover:bg-red-500/20 transition-colors">Empty Trash</button>
                <div className="h-4 w-[1px] bg-white/10"></div>
                <span className="opacity-50">7 items selected</span>
            </div>

            {/* Content Grid */}
            <div className="flex-1 p-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 content-start overflow-y-auto">
                <TrashItem name="Overthinking.exe" type="exe" size="999 GB" />
                <TrashItem name="Self Doubts.log" type="log" size="42 TB" />
                <TrashItem name="Procrastination" type="loading" size="In Progress" />
                <TrashItem name="Unfinished Projects" type="folder" size="1.2 PB" />
                <TrashItem name="Sleep Schedule.txt" type="file" size="0 KB" />
                <TrashItem name="Bad Jokes.doc" type="file" size="12 MB" />
                <TrashItem name="Motivation.tmp" type="file" size="Corrupted" />
            </div>

            {/* Status Bar */}
            <div className="h-6 bg-[#252525] border-t border-black/20 flex items-center px-4 text-[10px] opacity-50 justify-between">
                <span>Trash</span>
                <span>Free Space: 0 bytes</span>
            </div>
        </div>
    );
};

export default TrashBin;
