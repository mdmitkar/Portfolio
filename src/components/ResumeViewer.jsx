import React from 'react';

const ResumeViewer = () => {
    return (
        <div className="w-full h-full bg-[#525659] flex flex-col">
            <div className="h-12 bg-[#323639] flex items-center justify-between px-4 shadow-md z-10 shrink-0">
                <span className="text-gray-300 text-xs font-medium">Muhammad Mitkar (4).pdf</span>
                <div className="flex items-center gap-2">
                    <button className="bg-black/20 hover:bg-black/40 text-white rounded p-1.5 transition-colors" title="Zoom Out">-</button>
                    <span className="text-white/50 text-xs">100%</span>
                    <button className="bg-black/20 hover:bg-black/40 text-white rounded p-1.5 transition-colors" title="Zoom In">+</button>
                    <div className="w-[1px] h-4 bg-white/10 mx-1"></div>
                    <a href="/Muhammad Mitkar (4).pdf" download className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded transition-colors shadow">
                        Download
                    </a>
                </div>
            </div>
            <iframe
                src="/Muhammad Mitkar (4).pdf#toolbar=0"
                className="w-full flex-1 border-none"
                title="Resume PDF"
            />
        </div>
    );
};

export default ResumeViewer;
