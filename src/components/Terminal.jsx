import React, { useState, useEffect, useRef } from 'react';

const commands = {
    help: "Available commands: help, about, work, contact, clear, neofetch, whoami, ls",
    whoami: "mitkar",
    about: "Opening Profile...",
    work: "Opening Projects...",
    contact: "Opening Contact Info...",
    clear: "CLEAR_C",
    ls: "Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos",
    neofetch: `
            .-.           mitkar@ubuntu
        .-'  o  '.        -------------
     '-.  .  .-'          OS: Ubuntu 24.04 LTS x86_64
       '|  |  '|          Host: KVM/QEMU
       '|  |  '|          Kernel: 6.8.0-generic
     .-'  '  '-.          Uptime: 2 hours
        '-.  o  .-'       Packages: 1420 (dpkg)
           '-'            Shell: zsh 5.9
                          DE: GNOME 46
                          Theme: Yaru-dark [GTK2/3]
                          Icons: Yaru [GTK2/3]
                          CPU: Intel i9-14900K (24) @ 5.0GHz
                          Memory: 1024MiB / 64301MiB
`,
};

const Terminal = ({ onCommand }) => {
    const [history, setHistory] = useState([
        { type: 'output', content: 'mitkar@ubuntu:~$' },
        { type: 'output', content: 'neofetch' },
        { type: 'raw', content: commands.neofetch },
    ]);
    const [input, setInput] = useState('');
    const inputRef = useRef(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            const newHistory = [...history, { type: 'prompt', content: input }];

            if (cmd === 'clear') {
                setHistory([{ type: 'output', content: 'mitkar@ubuntu:~$' }]);
                // Simulate clearing but keep prompt
            } else if (commands[cmd]) {
                if (cmd === 'neofetch') {
                    newHistory.push({ type: 'raw', content: commands[cmd] });
                } else {
                    newHistory.push({ type: 'output', content: commands[cmd] });
                }

                if (['about', 'work', 'contact'].includes(cmd)) {
                    onCommand(cmd);
                }
            } else if (cmd !== '') {
                newHistory.push({ type: 'error', content: `bash: ${cmd}: command not found` });
            }
            setHistory(newHistory);
            setInput('');
        }
    };

    return (
        <div
            className="h-full w-full p-2 font-mono text-[13px] overflow-y-auto text-gray-300 selection:bg-[#E95420]/30"
            style={{
                backgroundColor: '#300a24', // Ubuntu Aubergine Terminal BG
                fontFamily: "'JetBrains Mono', monospace"
            }}
            onClick={() => inputRef.current?.focus()}
        >
            {history.map((line, i) => {
                if (line.type === 'prompt') {
                    return (
                        <div key={i} className="mb-0">
                            <span className="text-[#87ff87] font-bold">mitkar@ubuntu</span>
                            <span className="text-white">:</span>
                            <span className="text-[#5fd7ff] font-bold">~</span>
                            <span className="text-white">$ </span>
                            <span className="text-white font-bold">{line.content}</span>
                        </div>
                    );
                }
                if (line.type === 'raw') {
                    return <pre key={i} className="whitespace-pre-wrap text-gray-300 leading-tight my-2 font-bold select-text">{line.content}</pre>;
                }
                if (line.type === 'error') {
                    return <div key={i} className="text-red-400 my-1">{line.content}</div>;
                }
                return <div key={i} className="text-gray-300 my-1">{line.content}</div>;
            })}

            <div className="mt-0">
                <div className="flex items-center group">
                    <span className="text-[#87ff87] font-bold">mitkar@ubuntu</span>
                    <span className="text-white">:</span>
                    <span className="text-[#5fd7ff] font-bold">~</span>
                    <span className="text-white mr-2">$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent border-none outline-none text-white flex-1 caret-gray-400 font-bold p-0 m-0 h-5"
                        autoFocus
                        spellCheck="false"
                    />
                </div>
            </div>
            <div ref={bottomRef} />
        </div>
    );
};

export default Terminal;
