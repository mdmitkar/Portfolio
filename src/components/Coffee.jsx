import React, { useState, useEffect } from 'react';
import { Coffee, Copy, Check, ExternalLink, Zap, Heart } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const CoffeeISO = ({ onOpenWindow }) => {
    const [copied, setCopied] = useState(false);
    const [energy, setEnergy] = useState(25);
    
    const upiId = "mitkarmuhammad-1@okaxis";
    const name = "Muhammad Mitkar";
    const upiUri = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&cu=INR`;

    const handleCopy = () => {
        navigator.clipboard.writeText(upiId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        setEnergy(prev => Math.min(100, prev + 15));
    };

    const handlePayNow = () => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            window.location.href = upiUri;
        } else {
            if (onOpenWindow) {
                onOpenWindow('system-alert', { 
                    message: "UPI Deep Links are only supported on mobile devices. Please scan the QR code with your phone instead!",
                    type: 'warning'
                });
            }
        }
        setEnergy(100);
    };

    return (
        <div className="h-full flex flex-col font-sans overflow-hidden bg-[#2c001e]/90 text-white select-none relative">
            {/* Header / Banner */}
            <div className="p-6 bg-gradient-to-r from-[#E95420]/20 to-transparent border-b border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12">
                    <Coffee size={120} />
                </div>
                
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
                        <Coffee className="text-os-accent animate-bounce" /> Coffee.iso
                    </h2>
                    <p className="text-sm opacity-70 max-w-md">
                        Powering the developer ecosystem. Your support keeps the updates coming and the servers running.
                    </p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col items-center gap-8">
                
                {/* System Status Tracker */}
                <div className="w-full max-w-sm space-y-2">
                    <div className="flex justify-between text-[10px] font-bold tracking-widest opacity-60 uppercase">
                        <span>Developer Energy Level</span>
                        <span>{energy}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div 
                            className={`h-full transition-all duration-1000 ease-out rounded-full shadow-[0_0_15px_rgba(233,84,32,0.5)]
                                ${energy < 30 ? 'bg-red-500' : energy < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                            style={{ width: `${energy}%` }}
                        ></div>
                    </div>
                    <p className="text-[10px] italic opacity-40 text-center">
                        {energy < 30 ? "System critical. Requires immediate caffeine injection." : 
                         energy < 70 ? "Energy levels stabilizing. Developer is moderately focused." : 
                         "Maximum productivity reached! Code quality at peak levels."}
                    </p>
                </div>

                {/* Main Content: QR and Actions */}
                <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full">
                    
                    {/* QR Code Section */}
                    <div className="relative p-5 bg-white rounded-3xl shadow-2xl group transition-all hover:scale-105 duration-500 ring-4 ring-black/5">
                        <QRCodeSVG 
                            value={upiUri} 
                            size={180}
                            level="H"
                            includeMargin={false}
                        />
                        <div className="mt-3 text-center">
                            <span className="text-[9px] font-black text-black opacity-30 tracking-[0.2em]">SCAN TO PAY VIA UPI</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-4 w-full max-w-[240px]">
                        <button 
                            onClick={handlePayNow}
                            className="group flex items-center justify-center gap-3 px-6 py-4 bg-os-accent hover:bg-[#d94612] text-white rounded-2xl font-bold transition-all shadow-lg active:scale-95 shadow-os-accent/20"
                        >
                            <Zap size={20} fill="currentColor" />
                            <span className="text-sm tracking-tight">{/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 'Pay with App' : 'Pay via Mobile'}</span>
                            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>

                        <button 
                            onClick={handleCopy}
                            className={`flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all border border-white/10 active:scale-95
                                ${copied ? 'bg-green-600/20 text-green-400 border-green-500/30' : 'bg-white/5 hover:bg-white/10 text-white'}`}
                        >
                            {copied ? <Check size={20} /> : <Copy size={20} />}
                            <span className="text-sm tracking-tight">{copied ? 'Copied ID!' : 'Copy UPI ID'}</span>
                        </button>
                        
                        <p className="text-[10px] opacity-40 text-center px-4 leading-relaxed font-mono">
                            Best for GPay, PhonePe, Paytm.
                        </p>
                    </div>
                </div>

                {/* Footer Message */}
                <div className="mt-4 flex items-center gap-2 py-3 px-6 bg-white/5 rounded-full border border-white/5">
                    <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">Heartfelt Contribution</span>
                </div>
            </div>
        </div>
    );
};

export default CoffeeISO;
