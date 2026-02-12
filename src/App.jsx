import React, { useState, useRef, useEffect } from 'react';
import WindowFrame from './components/WindowFrame';
import Terminal from './components/Terminal';
import Dock from './components/Dock';
import About from './pages/About';
import Work from './components/Work';
import Contact from './pages/Contact';
import ResumeViewer from './components/ResumeViewer';
import Browser from './components/Browser';
import TopBar from './components/TopBar';
import BootScreen from './components/BootScreen';
import SystemWidget from './components/SystemWidget';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const ApplicationsMenu = ({ isOpen, onOpenApp }) => {
    if (!isOpen) return null;
    return (
        <div className="absolute top-9 left-2 w-64 bg-[#1e1e1e] border border-[#333] rounded-br-lg shadow-2xl z-[60] flex flex-col text-[#e6e6e6] text-sm overflow-hidden animate-fade-in origin-top-left">
            <div className="p-2 border-b border-[#333] font-bold bg-[#252525]">Information Gathering</div>
            <button onClick={() => onOpenApp('terminal', 'nmap -v 192.168.1.1')} className="px-4 py-2 hover:bg-blue-600 hover:text-white text-left flex items-center gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Nmap_logo.svg" className="w-4 h-4" /> Nmap
            </button>
            <button onClick={() => onOpenApp('terminal', 'wireshark')} className="px-4 py-2 hover:bg-blue-600 hover:text-white text-left flex items-center gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Wireshark_icon.svg/1024px-Wireshark_icon.svg.png" className="w-4 h-4" /> Wireshark
            </button>

            <div className="p-2 border-b border-[#333] font-bold bg-[#252525] mt-1">Web Application Analysis</div>
            <button onClick={() => onOpenApp('browser')} className="px-4 py-2 hover:bg-blue-600 hover:text-white text-left flex items-center gap-2">
                <img src="https://portswigger.net/burp/burp-suite/images/burp-suite-logo.svg" className="w-4 h-4" /> Burp Suite
            </button>

            <div className="p-2 border-b border-[#333] font-bold bg-[#252525] mt-1">System</div>
            <button onClick={() => onOpenApp('about')} className="px-4 py-2 hover:bg-blue-600 hover:text-white text-left">Task Manager</button>
            <button onClick={() => onOpenApp('terminal')} className="px-4 py-2 hover:bg-blue-600 hover:text-white text-left">Root Terminal</button>
        </div>
    );
};

const DesktopIcon = ({ label, icon, onDoubleClick, id, isPdf = false }) => {
    const iconRef = useRef(null);
    useEffect(() => {
        Draggable.create(iconRef.current, {
            type: "x,y",
            bounds: document.body,
            inertia: true,
            onPress: () => gsap.to(iconRef.current, { scale: 0.95, opacity: 0.8, duration: 0.1 }),
            onRelease: () => gsap.to(iconRef.current, { scale: 1, opacity: 1, duration: 0.1 }),
        });
    }, []);

    return (
        <div
            ref={iconRef}
            className="absolute flex flex-col items-center gap-2 group w-24 cursor-pointer p-2 rounded-xl hover:bg-white/10 transition-colors"
            onDoubleClick={onDoubleClick}
            onTouchEnd={onDoubleClick}
            id={`desktop-icon-${id}`}
        >
            <div className={`w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:-translate-y-1 transition-all duration-300
                ${isPdf ? 'bg-red-500/10 border-red-500/30' : 'bg-[#1a1a1a]/80 backdrop-blur-md'}`}>
                <span className="text-3xl filter drop-shadow-md">{icon}</span>
            </div>
            <span className="text-[11px] text-white/90 font-medium px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-sm group-hover:bg-blue-600/80 transition-colors pointer-events-none text-center leading-tight shadow-sm">
                {label}
            </span>
        </div>
    );
};

function App() {
    const [booted, setBooted] = useState(false);
    const [windows, setWindows] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleBootComplete = () => {
        setBooted(true);
        setTimeout(() => openWindow('terminal'), 500); // Auto-open terminal for hacker vibes
    };

    const bringToFront = (id) => {
        setWindows(prev => prev.map(w => ({
            ...w,
            active: w.id === id
        })));
    };

    const openWindow = (id, props = {}) => {
        setIsMenuOpen(false); // Close menu on select
        setWindows(prev => {
            if (prev.find(w => w.id === id)) {
                return prev.map(w => w.id === id ? { ...w, isOpen: true, active: true, props } : { ...w, active: false });
            }

            const isMobile = window.innerWidth < 768;
            const defaultW = isMobile ? '90vw' : '850px';
            const defaultH = isMobile ? '70vh' : '600px';
            const defaultX = isMobile ? 20 : 100 + (prev.length * 40);
            const defaultY = isMobile ? 60 : 80 + (prev.length * 40);

            let title = 'Window';
            let component = id;
            let w = defaultW, h = defaultH;


            switch (id) {
                case 'about': title = 'Home / Profile'; if (!isMobile) { w = 'min(900px, 90vw)'; h = 'min(600px, 85vh)'; } break;
                case 'work': title = 'Software Center'; if (!isMobile) { w = 'min(1000px, 90vw)'; h = 'min(650px, 90vh)'; } break;
                case 'contact': title = 'Mail'; if (!isMobile) { w = 'min(800px, 90vw)'; h = 'min(600px, 85vh)'; } break;
                case 'terminal': title = 'mitkar@linux:~'; if (!isMobile) { w = 'min(700px, 90vw)'; h = 'min(450px, 70vh)'; } break;
                case 'resume': title = 'Document Viewer'; if (!isMobile) { w = 'min(800px, 90vw)'; h = 'min(85vh, 900px)'; } break;
                case 'browser': title = 'Firefox ESR'; if (!isMobile) { w = 'min(950px, 90vw)'; h = 'min(700px, 85vh)'; } break;
            }

            return [...prev.map(w => ({ ...w, active: false })), {
                id: id === 'browser' ? `browser-${Date.now()}` : id,
                title,
                component: id === 'browser' ? 'browser' : component,
                isOpen: true,
                active: true,
                pos: { x: defaultX, y: defaultY },
                w, h,
                props
            }];
        });
    };

    const closeWindow = (id) => {
        setWindows(prev => prev.filter(w => w.id !== id));
    };

    const renderComponent = (type, props) => {
        switch (type) {
            case 'about': return <About />;
            case 'work': return <Work openBrowser={(url) => openWindow('browser', { initialUrl: url })} />;
            case 'contact': return <Contact />;
            case 'resume': return <ResumeViewer />;
            case 'browser': return <Browser {...props} />;
            case 'terminal': return <Terminal onCommand={(cmd) => {
                if (['about', 'work', 'contact', 'resume', 'browser'].includes(cmd)) openWindow(cmd);
            }} />;
            default: return null;
        }
    };

    if (!booted) {
        return <BootScreen onComplete={handleBootComplete} />;
    }

    const isMobile = window.innerWidth < 768;

    return (
        <div className="relative h-screen w-screen overflow-hidden text-[#d3dae3] font-sans selection:bg-os-accent selection:text-white" onClick={() => setIsMenuOpen(false)}>
            {/* Animated Wallpaper */}
            <img
                src="/ubantuwallpaper.png"
                alt="Ubuntu Wallpaper"
                className="fixed top-0 left-0 w-full h-full object-cover -z-10 select-none pointer-events-none"
            />
            <div className="scanlines"></div>

            {/* Desktop Watermark (User's Image) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-10 blur-sm mix-blend-overlay">
                <img src="/md.png" alt="Watermark" className="w-[40vh] h-[40vh] object-cover rounded-full grayscale" />
            </div>

            {/* Top Bar */}
            <TopBar onOpenMenu={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }} />
            <ApplicationsMenu isOpen={isMenuOpen} onOpenApp={openWindow} />
            <SystemWidget />

            {/* Desktop Icons */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="pointer-events-auto">
                    <div className={`absolute ${isMobile ? 'top-16 left-4 space-y-24' : 'top-16 left-20 space-y-28'}`}>
                        <DesktopIcon id="profile" label="User Home" icon="👤" onDoubleClick={() => openWindow('about')} />
                    </div>
                    <div className={`absolute ${isMobile ? 'top-16 right-4 space-y-24' : 'top-16 left-44 space-y-28'}`}>
                        <DesktopIcon id="projects" label="Exploits" icon="🛠️" onDoubleClick={() => openWindow('work')} />
                    </div>
                    <div className={`absolute ${isMobile ? 'top-48 left-4 space-y-24' : 'top-16 left-72 space-y-28'}`}>
                        <DesktopIcon id="terminal" label="Terminal" icon=">_" onDoubleClick={() => openWindow('terminal')} />
                    </div>
                    <div className={`absolute ${isMobile ? 'top-48 right-4 space-y-24' : 'top-16 left-96 space-y-28'}`}>
                        <DesktopIcon id="contact" label="Mail" icon="✉️" onDoubleClick={() => openWindow('contact')} />
                    </div>
                    {/* Burp Suite Shortcut */}
                    <div className={`absolute ${isMobile ? 'bottom-24 left-4' : 'top-16 left-[30rem] space-y-28'}`}>
                        <DesktopIcon id="browser" label="Firefox" icon="🌐" onDoubleClick={() => openWindow('browser')} />
                    </div>

                    <div className={`absolute ${isMobile ? 'bottom-24 right-4' : 'top-16 left-[36rem] space-y-28'}`}>
                        <DesktopIcon id="trash" label="Trash" icon="🗑️" onDoubleClick={() => { }} />
                    </div>
                </div >
            </div >

            {/* Windows */}
            {
                windows.map(win => (
                    win.isOpen && (
                        <WindowFrame
                            key={win.id}
                            title={win.title}
                            isActive={win.active}
                            onFocus={() => bringToFront(win.id)}
                            onClose={() => closeWindow(win.id)}
                            initialPos={win.pos}
                            width={win.w}
                            height={win.h}
                        >
                            {renderComponent(win.component, win.props)}
                        </WindowFrame>
                    )
                ))
            }

            {/* Dock */}
            <Dock openWindow={openWindow} windows={windows} />
        </div >
    );
}

export default App;
