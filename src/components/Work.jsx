import React from 'react';
import { ExternalLink, Github, Download, Star, Share2 } from 'lucide-react';

const TechIcon = ({ name, icon }) => (
    <div className="flex flex-col items-center gap-1 group" title={name}>
        <div className="p-2 bg-white/5 rounded-lg border border-white/5 group-hover:bg-white/10 transition-colors">
            <img src={icon} alt={name} className="w-5 h-5 object-contain opacity-80 group-hover:opacity-100" />
        </div>
    </div>
);

const ProjectCard = ({ title, desc, image, role, stack, link, github, onOpen }) => (
    <div className="flex flex-col gap-4 p-5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all hover:-translate-y-1 hover:shadow-xl group">
        <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-black flex-shrink-0">
                <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg truncate" style={{ color: 'var(--os-text)' }}>{title}</h3>
                <p className="text-xs uppercase tracking-wider opacity-60 font-semibold mb-1">{role}</p>
                <div className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-[10px] opacity-40 ml-1">(5.0)</span>
                </div>
            </div>
            <button
                onClick={() => onOpen(link || 'https://google.com')}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-full transition-colors self-center shadow-lg shadow-blue-900/20"
            >
                OPEN
            </button>
        </div>

        <p className="text-sm opacity-80 leading-relaxed line-clamp-3" style={{ color: 'var(--os-text)' }}>
            {desc}
        </p>

        {/* Real Tech Stack Icons */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/5">
            {stack.map((tech, i) => (
                <TechIcon key={i} {...tech} />
            ))}
            <div className="flex-1"></div>
            <a href={github} target="_blank" rel="noopener noreferrer" className="p-2 opacity-50 hover:opacity-100 transition-opacity">
                <Github size={16} />
            </a>
            <button className="p-2 opacity-50 hover:opacity-100 transition-opacity">
                <Share2 size={16} />
            </button>
        </div>
    </div>
);

const Work = ({ openBrowser }) => {
    return (
        <div className="h-full flex flex-col font-sans" style={{ color: 'var(--os-text)' }}>
            {/* Header / Banner */}
            <div className="h-48 relative overflow-hidden flex-shrink-0 border-b border-os-border">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 opacity-80"></div>
                <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover mix-blend-overlay" />
                <div className="absolute bottom-0 left-0 p-8">
                    <h1 className="text-4xl font-bold text-white mb-2 filter drop-shadow-lg">App Store</h1>
                    <p className="text-white/80 text-sm max-w-md filter drop-shadow-md">
                        Explore my portfolio of decentralized apps and AI-powered tools.
                    </p>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8">

                {/* Featured Section */}
                <div className="mb-10">
                    <h2 className="text-sm font-bold opacity-60 uppercase tracking-widest mb-6 border-b border-os-border pb-2">Top Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ProjectCard
                            title="ChainCred"
                            desc="Decentralized Verifiable Credential Platform on opBNB. Issues tamper-proof on-chain records, reducing academic verification time from days to < 2 minutes. Integrated with DeSoc dApp and AI-driven networking."
                            role="Aug 2025"
                            image="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600&auto=format&fit=crop"
                            link="https://chaincred.com"
                            github="#"
                            onOpen={openBrowser}
                            stack={[
                                { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
                                { name: 'Solidity', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg' },
                                { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' }
                            ]}
                        />
                        <ProjectCard
                            title="GateSmart"
                            desc="AI-powered study companion for GATE CS aspirants. Features personalized revision paths, AI tutor (LLaMA 3.3), and analytics. Built with Next.js, FastAPI, and Random Forest models."
                            role="May 2025"
                            image="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop"
                            link="https://gatesmart.in"
                            github="#"
                            onOpen={openBrowser}
                            stack={[
                                { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
                                { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
                                { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' }
                            ]}
                        />
                    </div>
                </div>

                {/* More Apps */}
                <div>
                    <h2 className="text-sm font-bold opacity-60 uppercase tracking-widest mb-6 border-b border-os-border pb-2">More Apps</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ProjectCard
                            title="LingualSense"
                            desc="Multilingual Language Detection App achieving ~91% accuracy using GRU/BiLSTM models. Deployed with Streamlit and Flask for real-time predictions."
                            role="Dec 2024"
                            image="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop"
                            link="#"
                            github="#"
                            onOpen={openBrowser}
                            stack={[
                                { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
                                { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' }
                            ]}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Work;
