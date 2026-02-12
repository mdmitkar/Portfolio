import React, { useState, useEffect } from 'react';
import { FileText, FileCode, AlertTriangle, Loader, X, Trash2 } from 'lucide-react';

const TrashItem = ({ name, type, size }) => {
    let Icon = FileText;
    let color = "text-gray-400";

    if (type === 'exe') { Icon = FileCode; color = "text-red-400"; }
    if (type === 'log') { Icon = AlertTriangle; color = "text-yellow-400"; }
    if (type === 'loading') { Icon = Loader; color = "text-blue-400"; }
    if (type === 'failed') { Icon = X; color = "text-red-500"; }

    return (
        <div className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group animate-fade-in">
            <div className={`w-12 h-12 flex items-center justify-center rounded-lg bg-white/5 group-hover:bg-white/10 border border-white/5 ${color}`}>
                <Icon size={24} className={type === 'loading' ? 'animate-spin' : ''} />
            </div>
            <span className="text-xs text-center text-gray-400 group-hover:text-white max-w-[80px] truncate">{name}</span>
            <span className="text-[10px] text-gray-600 group-hover:text-gray-500">{size}</span>
        </div>
    );
};

const TrashBin = () => {
    const [items, setItems] = useState([
        { id: 1, name: "Overthinking.exe", type: "exe", size: "999 GB" },
        { id: 2, name: "Self Doubts.log", type: "log", size: "42 TB" },
        { id: 3, name: "Procrastination", type: "loading", size: "In Progress" },
        { id: 4, name: "Unfinished Projects", type: "folder", size: "1.2 PB" },
        { id: 5, name: "Sleep Schedule.txt", type: "file", size: "0 KB" },
        { id: 6, name: "Bad Jokes.doc", type: "file", size: "12 MB" },
        { id: 7, name: "Motivation.tmp", type: "file", size: "Corrupted" }
    ]);

    // "Fix" the loading item after a few seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setItems(prev => prev.map(item =>
                item.name === "Procrastination"
                    ? { ...item, type: "failed", size: "Failed" }
                    : item
            ));
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    const handleEmptyTrash = () => {
        setItems([]);
    };

    return (
        <div className="h-full bg-[#1e1e1e] text-gray-300 font-sans flex flex-col">
            {/* Header / Options */}
            <div className="h-10 bg-[#2d2d2d] border-b border-black/20 flex items-center px-4 gap-4 text-xs shrink-0">
                <button
                    onClick={handleEmptyTrash}
                    disabled={items.length === 0}
                    className={`px-3 py-1 rounded transition-colors ${items.length === 0 ? 'opacity-50 cursor-not-allowed bg-white/5' : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'}`}
                >
                    Empty Trash
                </button>
                <div className="h-4 w-[1px] bg-white/10"></div>
                <span className="opacity-50">{items.length} items</span>
            </div>

            {/* Content Grid */}
            <div className="flex-1 p-6 overflow-y-auto">
                {items.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 content-start">
                        {items.map(item => (
                            <TrashItem key={item.id} {...item} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full opacity-30 gap-4">
                        <Trash2 size={64} />
                        <p className="text-sm font-medium">Trash is empty</p>
                    </div>
                )}
            </div>

            {/* Status Bar */}
            <div className="h-6 bg-[#252525] border-t border-black/20 flex items-center px-4 text-[10px] opacity-50 justify-between shrink-0">
                <span>Trash</span>
                <span>Free Space: {items.length === 0 ? '100%' : '0 bytes'}</span>
            </div>
        </div>
    );
};

export default TrashBin;
