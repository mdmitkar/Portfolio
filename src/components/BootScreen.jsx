import React, { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';

const BootScreen = ({ onComplete }) => {
    const [lines, setLines] = useState([]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onComplete();
        }, 3000); // Faster boot (3s)

        const bootSequence = [
            { text: "Ubuntu 24.04 LTS", delay: 100 },
            { text: "[    0.002410] Linux version 6.8.0-generic (buildd@lcy02-amd64)", delay: 200 },
            { text: "[ OK ] Started GNOME Display Manager", delay: 400 },
            { text: "[ OK ] Reached target Graphical Interface", delay: 800 },
            { text: "Loading Ubuntu...", delay: 1200 },
        ];

        bootSequence.forEach(({ text, delay }) => {
            setTimeout(() => {
                setLines(prev => [...prev.slice(-14), text]);
            }, delay);
        });

        return () => clearTimeout(timeout);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-black z-[100] flex flex-col items-start justify-end p-8 font-mono text-sm md:text-base text-gray-400 select-none">
            <div className="w-full max-w-4xl flex flex-col gap-1 items-start">
                {/* Linux Splash Style - Text only, very technical */}
                <div className="mb-4 text-white font-bold flex items-center gap-2">
                    <Terminal size={20} /> mitkarmd@boot:~$
                </div>

                {lines.map((line, i) => (
                    <div key={i} className="flex gap-3 w-full animate-fade-in-up">
                        <span className={line.includes("mitkarmd") ? "text-white font-bold" : "text-gray-400"}>
                            {line.includes("[ OK ]") ? <span className="text-green-500 font-bold mr-2">[ OK ]</span> : null}
                            {line.replace("[ OK ]", "").trim()}
                        </span>
                    </div>
                ))}
                <span className="animate-pulse text-blue-500 block mt-2">_</span>
            </div>

            {/* Progress Bar (Subtle) */}
            <div className="absolute top-0 left-0 h-1 bg-blue-600 transition-all duration-[3000ms] ease-linear w-full"></div>
        </div>
    );
};

export default BootScreen;
