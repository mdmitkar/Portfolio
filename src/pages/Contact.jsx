import React, { useState } from 'react';
import { Send, Paperclip, MoreVertical, Star, Trash2, Mail, Inbox, FileText, AlertCircle } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, count }) => (
    <div className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${active ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-white/5 opacity-70 hover:opacity-100'}`}>
        <Icon size={16} />
        <span className="flex-1 text-sm font-medium">{label}</span>
        {count && <span className="text-xs opacity-50 font-mono">{count}</span>}
    </div>
);

const Contact = () => {
    const [status, setStatus] = useState('idle'); // idle, sending, sent, error
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyRfR8M2__3LsVPk9IErA-m6NVsQ5k6_phSKw6lQ-3xiRr4ZH8DLeazu2BUm7YCaNZ9/exec";

    const handleSend = async (e) => {
        e.preventDefault();

        setStatus('sending');
        const form = e.target;
        const data = new FormData(form);

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: data,
                mode: "no-cors" // Essential for Google Sheets
            });
            setStatus('sent');
            form.reset();
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            console.error('Error!', error.message);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <div className="h-full flex font-sans" style={{ color: 'var(--os-text)' }}>

            {/* Sidebar - Hidden on mobile */}
            <div className="w-56 border-r border-os-border hidden md:flex flex-col p-4 bg-black/10">
                <div className="mb-6 px-2">
                    <button onClick={handleSend} className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20">
                        <Send size={16} /> Compose
                    </button>
                </div>

                <div className="space-y-1">
                    <SidebarItem icon={Inbox} label="Inbox" active count="1" />
                    <SidebarItem icon={Star} label="Starred" />
                    <SidebarItem icon={Send} label="Sent" />
                    <SidebarItem icon={FileText} label="Drafts" count="3" />
                    <SidebarItem icon={AlertCircle} label="Spam" />
                    <SidebarItem icon={Trash2} label="Trash" />
                </div>

                <div className="mt-auto pt-4 border-t border-os-border opacity-50 text-xs">
                    <p>mitkarmd os Mail</p>
                    <p>v2.4.0</p>
                </div>
            </div>

            {/* Main Content - Compose Area */}
            <div className="flex-1 flex flex-col bg-white/5 relative">
                {/* Header */}
                <div className="h-14 border-b border-os-border flex items-center justify-between px-6 bg-os-panel/50 backdrop-blur-md z-10">
                    <div className="flex items-center gap-3 opacity-60">
                        <Mail size={18} />
                        <span className="text-sm font-semibold tracking-wide uppercase">New Message</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Paperclip size={18} /></button>
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><MoreVertical size={18} /></button>
                    </div>
                </div>

                {/* Form */}
                <form className="flex-1 flex flex-col p-4 md:p-6 overflow-y-auto" onSubmit={handleSend}>
                    <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-3 border-b border-os-border pb-2">
                            <span className="text-sm font-medium opacity-50 w-16">To:</span>
                            <div className="flex-1 flex items-center gap-2">
                                <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-sm border border-blue-500/20 flex items-center gap-1">
                                    Muhammad Mitkar <span className="opacity-50 text-xs">&lt;mmitkar22it@student.mes.ac.in&gt;</span>
                                </span>
                            </div>
                        </div>

                        {/* From (Email) Input */}
                        <div className="flex items-center gap-3 border-b border-os-border pb-2">
                            <span className="text-sm font-medium opacity-50 w-16">From:</span>
                            <input
                                required
                                name="email"
                                type="email"
                                placeholder="your.email@example.com"
                                className="flex-1 bg-transparent border-none outline-none placeholder-white/20 font-medium"
                                style={{ color: 'var(--os-text)' }}
                            />
                        </div>

                        <div className="flex items-center gap-3 border-b border-os-border pb-2">
                            <span className="text-sm font-medium opacity-50 w-16">Subject:</span>
                            <input
                                required
                                name="subject"
                                type="text"
                                placeholder="Project Inquiry / Job Opportunity"
                                className="flex-1 bg-transparent border-none outline-none placeholder-white/20 font-medium"
                                style={{ color: 'var(--os-text)' }}
                            />
                        </div>
                    </div>

                    <textarea
                        required
                        name="message"
                        className="flex-1 bg-transparent border-none outline-none resize-none placeholder-white/20 leading-relaxed font-mono text-sm"
                        placeholder="Hi Muhammad, I saw your portfolio and..."
                        style={{ color: 'var(--os-text)' }}
                    ></textarea>

                    <div className="mt-6 flex justify-end">
                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className={`px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all flex items-center gap-2 shadow-lg
                                ${status === 'sending' ? 'scale-95 opacity-80 cursor-wait' : ''}
                                ${status === 'sent' ? 'bg-green-600 hover:bg-green-500' : ''}
                                `}
                        >
                            {status === 'idle' && <><Send size={16} /> Send Message</>}
                            {status === 'sending' && 'Sending...'}
                            {status === 'sent' && 'Sent Successfully!'}
                            {status === 'error' && 'Failed. Try again.'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
