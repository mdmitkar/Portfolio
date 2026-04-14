import React from 'react';
import { Info, AlertTriangle, AlertCircle, X } from 'lucide-react';

const SystemAlert = ({ message, type = 'info', onClose }) => {
    const getIcon = () => {
        switch (type) {
            case 'warning': return <AlertTriangle className="text-yellow-500" size={32} />;
            case 'error': return <AlertCircle className="text-red-500" size={32} />;
            default: return <Info className="text-os-accent" size={32} />;
        }
    };

    return (
        <div className="w-full h-full bg-[#f0f0f0] text-black font-sans flex flex-col pt-2">
            <div className="flex-1 flex items-start gap-4 p-5">
                <div className="shrink-0 pt-1">
                    {getIcon()}
                </div>
                <div className="space-y-1">
                    <h3 className="font-bold text-sm">System Message</h3>
                    <p className="text-sm text-gray-700 leading-tight">
                        {message || "An unspecified system event has occurred."}
                    </p>
                </div>
            </div>
            
            <div className="h-14 bg-[#e8e8e8] border-t border-gray-300 flex items-center justify-end px-4 gap-3">
                <button 
                    onClick={onClose}
                    className="px-6 py-1.5 bg-[#dfdfdf] hover:bg-[#d0d0d0] border border-gray-400 rounded-md text-sm font-medium transition-colors shadow-sm active:shadow-inner"
                >
                    Cancel
                </button>
                <button 
                    onClick={onClose}
                    className="px-8 py-1.5 bg-os-accent hover:bg-[#d94612] text-white rounded-md text-sm font-bold transition-all shadow-sm active:scale-95"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default SystemAlert;
