import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Home, Lock, X } from 'lucide-react';

const Browser = ({ initialUrl = '/' }) => {
    const [url, setUrl] = useState(initialUrl);
    const [isLoading, setIsLoading] = useState(false);

    const handleNavigate = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] text-gray-300 font-sans">
            {/* Top Bar */}
            <div className="h-10 bg-[#2b2b2b] flex items-center px-2 gap-2 border-b border-black/20">
                <div className="flex items-center gap-1">
                    <button className="p-1.5 hover:bg-white/5 rounded-full"><ArrowLeft size={16} /></button>
                    <button className="p-1.5 hover:bg-white/5 rounded-full"><ArrowRight size={16} /></button>
                    <button className="p-1.5 hover:bg-white/5 rounded-full" onClick={() => setIsLoading(!isLoading)}><RotateCw size={14} className={isLoading ? 'animate-spin' : ''} /></button>
                </div>

                {/* Omnibox */}
                <form onSubmit={handleNavigate} className="flex-1 max-w-2xl mx-auto">
                    <div className="bg-[#1e1e1e] rounded-full h-7 flex items-center px-3 border border-white/5 text-xs group focus-within:ring-1 ring-blue-500/50">
                        <Lock size={10} className="text-green-500 mr-2" />
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="bg-transparent border-none outline-none flex-1 text-gray-300"
                        />
                    </div>
                </form>

                <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-white/5 rounded-full"><Home size={16} /></button>
                </div>
            </div>

            {/* Content Area - Simulated */}
            <div className="flex-1 bg-white relative overflow-hidden">
                {isLoading && (
                    <div className="absolute inset-0 z-10 bg-white flex flex-col items-center justify-center">
                        <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mb-4"></div>
                        <p className="text-gray-500 text-sm">Connecting...</p>
                    </div>
                )}

                <iframe
                    src={url}
                    className="w-full h-full border-none"
                    title="Browser"
                    sandbox="allow-scripts allow-same-origin allow-popups" // Safety
                    onError={() => console.log('Iframe load error')}
                />

                {/* Fallback overlay if iframe refuses to load (common with X-Frame-Options) */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-gray-50/50 -z-10">
                    <div className="text-center p-8 bg-white border shadow-lg rounded-xl max-w-md pointer-events-auto">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Restricted Content</h3>
                        <p className="text-gray-500 text-sm mb-4">
                            Most modern websites (like Google, GitHub) prevent being loaded inside other sites for security.
                        </p>
                        <a href={url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500">
                            Open in New Tab
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Browser;
