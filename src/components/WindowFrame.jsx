import React, { useRef, useEffect } from 'react';
import { X, Minus, Square } from 'lucide-react';
import gsap from 'gsap';
import { Draggable } from 'gsap/all';

gsap.registerPlugin(Draggable);

const WindowFrame = ({ title, onClose, isActive, onFocus, children, initialPos = { x: 50, y: 50 }, width = '600px', height = '400px', isMinimized, isMaximized, onMinimize, onMaximize }) => {
    const windowRef = useRef(null);
    const dragHandleRef = useRef(null);

    const onFocusRef = useRef(onFocus);
    const [isDraggableMobile, setIsDraggableMobile] = React.useState(false);

    // Keep callback ref updated
    useEffect(() => {
        onFocusRef.current = onFocus;
    }, [onFocus]);

    useEffect(() => {
        const d = Draggable.create(windowRef.current, {
            trigger: dragHandleRef.current,
            // Allow windows to go slightly off-screen for realism (user can still grab them)
            bounds: { top: 0, left: -200, width: window.innerWidth + 400, height: window.innerHeight + 200 },
            inertia: true,
            edgeResistance: 0.5,
            type: "x,y",
            zIndexBoost: false,
            allowContextMenu: true,
            onPress: () => {
                onFocusRef.current?.();
                // Smooth lift
                gsap.to(windowRef.current, {
                    scale: 1.01,
                    duration: 0.2,
                    boxShadow: '0 40px 80px -15px rgba(0, 0, 0, 0.7)',
                    ease: "power2.out"
                });
            },
            onRelease: () => {
                // Smooth drop
                gsap.to(windowRef.current, {
                    scale: 1,
                    duration: 0.3,
                    boxShadow: '0 15px 40px -5px rgba(0, 0, 0, 0.5)',
                    ease: "power2.out"
                });
            }
        });
        return () => d[0].kill();
    }, []); // Empty dependency array allows Draggable to stay alive across renders

    // Handle Maximize/Minimize State
    useEffect(() => {
        const tracker = Draggable.get(windowRef.current);
        if (isMaximized) {
            tracker?.disable();
            gsap.to(windowRef.current, {
                top: 0, left: 0, x: 0, y: 0,
                width: '100vw', height: '100vh',
                borderRadius: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        } else {
            tracker?.enable();
            if (tracker) {
                // Restore previous transform if dragged, or default
                gsap.to(windowRef.current, {
                    width: width,
                    height: height,
                    x: tracker.x,
                    y: tracker.y,
                    borderRadius: '0.75rem',
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        }
    }, [isMaximized, width, height]);

    useEffect(() => {
        if (isMinimized) {
            gsap.to(windowRef.current, {
                opacity: 0,
                scale: 0.8,
                y: 100,
                duration: 0.3,
                ease: "power2.in",
                pointerEvents: 'none'
            });
        } else {
            gsap.to(windowRef.current, {
                opacity: 1,
                scale: 1,
                y: isMaximized ? 0 : (Draggable.get(windowRef.current)?.y || 0),
                duration: 0.3,
                ease: "power2.out",
                pointerEvents: 'auto'
            });
        }
    }, [isMinimized, isMaximized]);

    // Open Animation
    useEffect(() => {
        gsap.fromTo(windowRef.current,
            { opacity: 0, scale: 0.92, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
        );
    }, []);

    const handleClose = () => {
        gsap.to(windowRef.current, {
            opacity: 0,
            scale: 0.95,
            y: 10,
            duration: 0.15,
            onComplete: onClose
        });
    };

    return (
        <div
            ref={windowRef}
            className={`absolute rounded-xl overflow-hidden flex flex-col transition-colors duration-200
                ${isActive ? 'border border-blue-500/50 ring-1 ring-blue-500/30' : 'border border-gray-700/50'}`}
            style={{
                left: initialPos.x,
                top: initialPos.y,
                width: width,
                height: height,
                maxWidth: '100vw',
                maxHeight: '100vh',
                zIndex: isActive ? 50 : 10,
                background: 'rgba(20, 20, 20, 0.98)', // Even darker for better contrast
                backdropFilter: 'blur(12px)',
                boxShadow: isActive ? '0 0 0 1px rgba(59, 130, 246, 0.5), 0 30px 60px rgba(0,0,0,0.8)' : '0 0 0 1px rgba(255,255,255,0.1), 0 10px 30px rgba(0,0,0,0.5)',
                minWidth: '320px',
                minHeight: '200px'
            }}
            onMouseDown={onFocus}
            onTouchStart={onFocus}
        >
            {/* Title Bar - Yaru Style */}
            <div
                ref={dragHandleRef}
                className={`flex items-center justify-between px-4 py-3 md:py-3 py-4 select-none cursor-grab active:cursor-grabbing touch-none
                    ${isActive ? 'bg-[#2c2c2c]' : 'bg-[#2c2c2c]/90'} border-b border-[#111] transition-colors rounded-t-xl`}
                onDoubleClick={onMaximize}
            >
                {/* Branding / Title */}
                <div className="flex items-center gap-3 pointer-events-none">
                    <span className="text-sm font-bold text-gray-200 tracking-wide">
                        {title}
                    </span>
                </div>

                {/* Yaru Controls (Right side) */}
                <div className="flex items-center gap-2"
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onMinimize}
                        onTouchEnd={(e) => { e.stopPropagation(); onMinimize(); }}
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-colors">
                        <Minus size={12} />
                    </button>
                    <button
                        onClick={onMaximize}
                        onTouchEnd={(e) => { e.stopPropagation(); onMaximize(); }}
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-colors">
                        <Square size={10} />
                    </button>
                    <button
                        onClick={handleClose}
                        onTouchEnd={(e) => {
                            e.stopPropagation();
                            handleClose();
                        }}
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-[#E95420] hover:bg-[#d94612] text-white shadow-md transition-colors"
                    >
                        <X size={14} />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto bg-[#0f172a]/80 relative">
                {children}
            </div>
        </div>
    );
};

export default WindowFrame;
