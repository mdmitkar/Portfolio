import React from 'react';
import { Github, Linkedin, Mail, MapPin, Download, Briefcase, GraduationCap } from 'lucide-react';

const TechBadge = ({ name, icon }) => (
    <div className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 group cursor-default relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <img src={icon} alt={name} className="w-8 h-8 object-contain drop-shadow-lg group-hover:scale-110 transition-transform" />
        <span className="text-xs font-medium opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--os-text)' }}>{name}</span>
    </div>
);

const ExperienceItem = ({ role, company, companyLogo, period, location, desc, color }) => (
    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group">
        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg overflow-hidden flex-shrink-0">
            {/* Fallback to text initials if logo fails, but we use CDN icons where possible */}
            {companyLogo ? (
                <img src={companyLogo} alt={company} className="w-full h-full object-contain" />
            ) : (
                <div className="text-black font-bold text-xs text-center leading-tight">{company.substring(0, 3)}</div>
            )}
        </div>
        <div className="flex-1">
            <h4 className="font-bold text-sm" style={{ color: 'var(--os-text)' }}>{role}</h4>
            <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-semibold" style={{ color }}>{company}</span>
                <span className="text-[10px] opacity-40">•</span>
                <span className="text-xs opacity-60">{location}</span>
            </div>
            <p className="text-xs font-mono mt-1 opacity-50 bg-white/5 inline-block px-2 py-1 rounded mb-2">{period}</p>
            {desc && <p className="text-xs opacity-70 leading-relaxed">{desc}</p>}
        </div>
    </div>
);

const About = () => {
    return (
        <div className="p-4 md:p-8 min-h-full flex items-center justify-center" style={{ color: 'var(--os-text)' }}>
            <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">

                {/* Left Column: Profile Card */}
                <div className="w-full md:w-80 flex flex-col items-center flex-shrink-0">
                    {/* Avatar with Status */}
                    <div className="relative group w-48 h-48 mb-6 cursor-pointer">
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-50 blur group-hover:opacity-100 transition duration-500"></div>
                        <img
                            src="/md.png"
                            alt="Profile"
                            className="relative w-full h-full rounded-2xl object-cover object-top border-[3px] border-os-border bg-black shadow-2xl"
                        />
                        <div className="absolute bottom-3 right-3 w-5 h-5 bg-green-500 border-[3px] border-black rounded-full shadow-lg" title="Online"></div>
                    </div>

                    <h2 className="text-3xl font-bold text-center tracking-tight mb-1">Muhammad Mitkar</h2>
                    <p className="text-sm opacity-60 font-mono mb-4 text-center">Final Year IT Student</p>
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                        <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold border border-blue-500/20 uppercase tracking-wider">
                            Full Stack
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-500 text-[10px] font-bold border border-purple-500/20 uppercase tracking-wider">
                            AI/ML Engineer
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-500 text-[10px] font-bold border border-orange-500/20 uppercase tracking-wider">
                            Blockchain
                        </span>
                    </div>

                    {/* Social Actions */}
                    <div className="flex gap-2 w-full justify-center mb-6">
                        <a href="https://github.com/MuhammadMitkar" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/5 hover:bg-black hover:text-white transition-all border border-os-border hover:shadow-lg hover:-translate-y-1">
                            <Github size={20} />
                        </a>
                        <a href="https://www.linkedin.com/in/muhammad-mitkar/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/5 hover:bg-[#0077b5] hover:text-white transition-all border border-os-border hover:shadow-lg hover:-translate-y-1">
                            <Linkedin size={20} />
                        </a>
                        <a href="mailto:mmitkar22it@student.mes.ac.in" className="p-3 rounded-xl bg-white/5 hover:bg-red-500 hover:text-white transition-all border border-os-border hover:shadow-lg hover:-translate-y-1">
                            <Mail size={20} />
                        </a>
                    </div>

                    {/* Education Mini Card */}
                    <div className="w-full bg-white/5 rounded-xl p-4 border border-os-border">
                        <div className="flex items-center gap-2 mb-2 opacity-60 text-xs font-bold uppercase tracking-wider">
                            <GraduationCap size={14} /> Education
                        </div>
                        <div className="text-sm font-semibold">Pillai College of Engineering</div>
                        <div className="text-xs opacity-50">B.Tech IT (8.3 CGPA)</div>
                        <div className="text-xs opacity-50 mt-1">2022 - 2026</div>
                    </div>
                </div>

                {/* Right Column: Details */}
                <div className="flex-1 flex flex-col gap-8">

                    {/* System Bio */}
                    <div className="relative overflow-hidden bg-white/5 p-6 rounded-2xl border border-os-border backdrop-blur-md">
                        <div className="relative z-10">
                            <p className="leading-relaxed text-base opacity-90 text-sm md:text-base">
                                I am a software developer with hands-on experience in <span className="text-blue-400 font-semibold">Full Stack Development</span> and <span className="text-purple-400 font-semibold">AI/ML</span>.
                                Skilled in building responsive applications and deploying intelligent systems. My passion lies in solving real-world problems through <span className="font-semibold underline decoration-orange-500/50 underline-offset-4">Web3</span> innovation and <span className="font-semibold underline decoration-green-500/50 underline-offset-4">Deep Learning</span> models.
                            </p>
                        </div>
                    </div>

                    {/* Experience Section */}
                    <div>
                        <h3 className="text-sm font-bold opacity-60 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
                            <Briefcase size={14} /> Experience
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            <ExperienceItem
                                role="Software Developer Intern"
                                company="DataMatex Technologies"
                                companyLogo="/datamatex.png"
                                period="Dec 2025"
                                location="Bhiwandi"
                                desc="Improved online visibility by ~18% and reduced page load time by 25%."
                                color="#3b82f6"
                            />
                            <ExperienceItem
                                role="Deep Learning Intern"
                                company="UptoSkills"
                                companyLogo="/uptoskill.png"
                                period="Jun 2025 - Sept 2025"
                                location="Remote"
                                desc="Led junior team in video analytics. Built chain snatching detection system (YOLO+3D-CNN) with ~90% accuracy."
                                color="#8b5cf6"
                            />
                            <ExperienceItem
                                role="Data Science Intern"
                                company="Oasis Infobyte"
                                companyLogo="/oasisinfobyte.png"
                                period="Feb 2025 - Mar 2025"
                                location="Virtual"
                                desc="Built ML models (Classification, Regression) using Python & Scikit-learn."
                                color="#10b981"
                            />
                            <ExperienceItem
                                role="Deep Learning Intern"
                                company="Infosys Springboard"
                                companyLogo="/infosysspringoard.png"
                                period="Nov 2024 - Jan 2025"
                                location="Remote"
                                desc="Worked on Multilingual NLP models (GRU/BiLSTM) and improved data preprocessing pipelines."
                                color="#007cc3"
                            />
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <h3 className="text-sm font-bold opacity-60 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Technical Skills</h3>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                            <TechBadge name="JavaScript" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
                            <TechBadge name="React" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
                            <TechBadge name="Node.js" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
                            <TechBadge name="Python" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" />
                            <TechBadge name="FastAPI" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" />
                            <TechBadge name="PostgreSQL" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" />
                            <TechBadge name="TensorFlow" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" />
                            <TechBadge name="MongoDB" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" />
                            <TechBadge name="Git" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" />
                            <TechBadge name="C++" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
