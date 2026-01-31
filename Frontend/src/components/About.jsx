import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Code2, Server, Globe, Cpu, GraduationCap, Briefcase, User, Terminal, X, ExternalLink, Award, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { usePortfolio } from '../context/PortfolioContext';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const About = () => {
    const { portfolioData, loading } = usePortfolio();
    const [selectedCert, setSelectedCert] = useState(null);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-mono animate-pulse">Initializing...</div>;

    const aboutData = portfolioData || {}; // Fallback if data is null initially
    const experiences = aboutData?.experience || [];
    const education = aboutData?.education || [];
    const certifications = aboutData?.certifications || [];
    const defaultBio = "I am a passionate Full Stack Developer dedicated to crafting robust back-ends and intuitive front-ends. My journey is defined by a relentless curiosity and a drive to build scalable, user-centric solutions.";

    return (
        <section id="about" className="relative z-10 font-sans text-slate-300 bg-slate-950 pb-6 md:pb-12 overflow-hidden">
            {/* SPACER: Micro-tuned for minimal gap */}
            <div className="w-full h-12 md:h-16 shrink-0" aria-hidden="true" />

            {/* Premium Background Atmosphere */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[150px] -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[150px] -z-10 animate-pulse" style={{ animationDuration: '10s' }} />
                <MeteorEffect number={20} />
            </div>

            {/* Main Container - Standard Width */}
            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">

                {/* Header - Premium & Compact */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 relative"
                    style={{ filter: selectedCert ? 'blur(10px)' : 'none', transition: 'filter 0.3s' }}
                >
                    <div className="inline-block relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <span className="relative inline-block py-1 px-3 rounded-full bg-slate-900 ring-1 ring-white/10 text-violet-400 text-[10px] font-bold tracking-widest uppercase mb-3 shadow-lg">
                            <Sparkles className="w-3 h-3 inline-block mr-1 -mt-0.5" />
                            My Journey
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2 md:mb-3 drop-shadow-2xl">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 animate-gradient-x">Me</span>.
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
                        Architecting digital realities with code, creativity, and precision.
                    </p>
                </motion.div>

                <div className="flex flex-col gap-8 md:gap-12 relative" style={{ filter: selectedCert ? 'blur(10px)' : 'none', transition: 'filter 0.3s' }}>

                    {/* SECTION 1: BIO (Full Width) */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <SpotlightCard className="rounded-xl p-6 md:p-8 from-violet-500/20 via-slate-900 to-slate-900 border-l-4 border-l-violet-500/40">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 p-8 opacity-5 transition-opacity transform rotate-12 scale-125 pointer-events-none">
                                <Terminal size={200} />
                            </div>

                            <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                                <div className="relative group/avatar shrink-0">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-cyan-600 rounded-full blur-xl opacity-40 animate-pulse group-hover/avatar:opacity-60 transition-opacity"></div>
                                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-slate-950 border-4 border-white/10 flex items-center justify-center overflow-hidden shadow-xl relative z-10 group-hover/avatar:scale-105 transition-transform duration-500">
                                        {aboutData?.profileImage ? (
                                            <img
                                                src={aboutData.profileImage}
                                                alt={aboutData.name || "Profile"}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <User className="text-slate-200" size={50} />
                                        )}
                                    </div>
                                </div>

                                <div className="text-center md:text-left">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
                                        Hi, I'm <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">{aboutData?.name || 'Saurabh'}</span>.
                                    </h3>
                                    <p className="text-base md:text-lg text-slate-300 leading-relaxed font-light mb-6">
                                        {aboutData?.about || defaultBio}
                                    </p>

                                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                        <StatsBadge icon={Code2} value={`${aboutData?.projects?.length || 5}+`} label="Projects" color="cyan" />
                                        <StatsBadge icon={Briefcase} value="2+" label="Years Exp." color="violet" />
                                    </div>
                                </div>
                            </div>
                        </SpotlightCard>
                    </motion.div>

                    {/* SECTION 2: SPLIT VIEW (Experience Left, Education Right) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

                        {/* Experience Column */}
                        <motion.div
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="flex flex-col h-full"
                        >
                            <SectionTitle icon={Briefcase} title="Experience" color="violet" />
                            <SpotlightCard className="rounded-xl p-6 md:p-8 h-full border-t-4 border-t-violet-500/40 flex flex-col">
                                <div className="space-y-8">
                                    {experiences.length > 0 ? experiences.map((exp, idx) => (
                                        <div key={idx} className="relative group/item pl-6 border-l-2 border-white/5 hover:border-violet-500/50 transition-colors">
                                            {/* Timeline Dot */}
                                            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-slate-800 group-hover/item:bg-violet-500 transition-colors border border-slate-600"></div>

                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                                                    <h4 className="text-lg font-bold text-white group-hover/item:text-violet-400 transition-colors">{exp.role}</h4>
                                                    <span className="text-xs font-mono text-slate-500 bg-white/5 px-2 py-1 rounded">{exp.duration}</span>
                                                </div>

                                                <div className="text-cyan-400 text-sm font-bold uppercase tracking-wider flex items-center gap-2 mb-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                                                    {exp.company}
                                                </div>

                                                <p className="text-slate-400 text-sm leading-relaxed">
                                                    {exp.description}
                                                </p>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="text-slate-500 italic">No experience entries found.</div>
                                    )}
                                </div>
                            </SpotlightCard>
                        </motion.div>

                        {/* Education & Certs Column */}
                        <motion.div
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="flex flex-col gap-8 h-full"
                        >
                            <div className="flex flex-col">
                                <SectionTitle icon={GraduationCap} title="Education" color="emerald" />
                                <SpotlightCard className="rounded-xl p-6 md:p-8 border-t-4 border-t-emerald-500/40 h-full">
                                    {education.length > 0 ? education.map((edu, idx) => (
                                        <div key={idx} className="relative group mb-8 last:mb-0">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="text-xl font-bold text-white">{edu.institution}</h4>
                                                <span className="text-xs font-mono text-slate-500 bg-white/5 px-2 py-1 rounded border border-white/5 whitespace-nowrap">{edu.year}</span>
                                            </div>
                                            <p className="text-emerald-400 text-sm font-bold uppercase tracking-wider mb-2">{edu.degree}</p>
                                            {edu.cgpa && <div className="inline-block text-xs font-bold text-emerald-500/80 bg-emerald-500/10 px-2 py-1 rounded">CGPA: {edu.cgpa}</div>}
                                        </div>
                                    )) : (
                                        <div className="text-slate-500">No education details.</div>
                                    )}
                                </SpotlightCard>
                            </div>

                            {/* Certifications (Nested here) */}
                            {certifications.length > 0 && (
                                <div className="flex flex-col flex-1">
                                    <SectionTitle icon={Award} title="Certifications" color="amber" />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {certifications.map((cert, idx) => (
                                            <CertificateCard
                                                key={idx}
                                                cert={cert}
                                                idx={idx}
                                                variants={itemVariants}
                                                onClick={() => setSelectedCert(cert)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>

                </div>

                {/* Full Screen Overlay for Certifications */}
                <AnimatePresence>
                    {selectedCert && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedCert(null)}
                                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            />
                            <CertificationDetail cert={selectedCert} onClose={() => setSelectedCert(null)} />
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

// --- Sub-Components for Effects ---

const SpotlightCard = ({ children, className = "" }) => {
    const divRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const opacity = useMotionValue(0);

    const handleMouseMove = (e) => {
        if (!divRef.current || isFocused) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        opacity.set(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        opacity.set(0);
    };

    const handleMouseEnter = () => {
        opacity.set(1);
    };

    const handleMouseLeave = () => {
        opacity.set(0);
    };

    return (
        <motion.div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "relative overflow-hidden bg-slate-900/40 border border-white/10 shadow-xl backdrop-blur-md",
                className
            )}
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.2 }}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: useMotionTemplate`
            radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(139, 92, 246, 0.15), transparent 40%)
          `,
                }}
            />
            {/* Mobile Fallback for SpotlightCard */}
            <div className="md:hidden pointer-events-none absolute -inset-px opacity-100 bg-gradient-to-br from-violet-600/10 via-slate-900/50 to-cyan-600/10 z-0" />

            <div className="relative h-full">{children}</div>
        </motion.div>
    );
};

const MeteorEffect = ({ number = 20, className }) => {
    const meteors = new Array(number).fill(true);
    return (
        <>
            {meteors.map((el, idx) => (
                <span
                    key={"meteor" + idx}
                    className={cn(
                        "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
                        "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
                        className
                    )}
                    style={{
                        top: 0,
                        left: Math.floor(Math.random() * (400 - -400) + -400) + "px",
                        animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
                        animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
                    }}
                ></span>
            ))}
        </>
    );
};

const SectionTitle = ({ icon: Icon, title, color }) => {
    const colors = {
        violet: "text-violet-400 bg-violet-500/10 ring-violet-500/20",
        emerald: "text-emerald-400 bg-emerald-500/10 ring-emerald-500/20",
        amber: "text-amber-400 bg-amber-500/10 ring-amber-500/20",
    };

    return (
        <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-4 pl-2">
            <div className={`p-2 rounded-lg ring-1 ${colors[color] || colors.violet}`}>
                <Icon size={20} />
            </div>
            <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">{title}</span>
        </h3>
    );
};

const StatsBadge = ({ icon: Icon, value, label, color }) => {
    const colors = {
        cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
        violet: "text-violet-400 bg-violet-500/10 border-violet-500/30",
    };

    return (
        <div className={cn("bg-white/5 border border-white/10 px-6 py-4 rounded-xl flex items-center gap-4 hover:bg-white/10 transition-colors hover:scale-105 duration-300 shadow-md group/badge",
            colors[color] && `hover:${colors[color].split(' ')[2]}`
        )}>
            <div className={cn("p-2 rounded-lg", colors[color]?.split(' ').slice(0, 2).join(' '))}>
                <Icon size={24} />
            </div>
            <div className="text-left">
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{label}</div>
            </div>
        </div>
    );
};

// ... keep CertificateCard and Detail components mostly as is, but maybe wrap CertCard in spotlight
const CertificateCard = ({ cert, idx, variants, onClick }) => {
    return (
        <motion.div
            layoutId={`cert-card-${idx}`}
            variants={variants}
            onClick={onClick}
            className="h-full"
        >
            <SpotlightCard className="rounded-xl p-6 flex flex-col gap-4 cursor-pointer h-full group">
                <div className="flex justify-between items-start">
                    <motion.div
                        layoutId={`cert-icon-${idx}`}
                        className="w-14 h-14 rounded-2xl bg-white/5 p-2 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform"
                    >
                        {cert.image ? (
                            <img src={cert.image} alt={cert.issuer} className="w-full h-full object-contain" />
                        ) : (
                            <Award className="text-amber-400" size={28} />
                        )}
                    </motion.div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-500/50 uppercase tracking-wider group-hover:text-amber-400 transition-colors">View</span>
                        <div className="text-xs font-mono text-slate-500 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                            {cert.date}
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-4">
                    <motion.h4
                        layoutId={`cert-title-${idx}`}
                        className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-tight"
                    >
                        {cert.title}
                    </motion.h4>
                    <motion.p
                        layoutId={`cert-issuer-${idx}`}
                        className="text-sm text-slate-400 mt-2 font-medium"
                    >
                        {cert.issuer}
                    </motion.p>
                </div>
            </SpotlightCard>
        </motion.div>
    );
};

import { createPortal } from 'react-dom';

const CertificationDetail = ({ cert, onClose }) => {
    const [showFullImage, setShowFullImage] = React.useState(false);

    return (
        <>
            <motion.div
                layoutId={`cert-card-${cert?.index}`}
                className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden z-50 backdrop-blur-xl flex flex-col"
            >
                <button
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="absolute top-6 right-6 z-50 p-3 rounded-full bg-black/20 hover:bg-white/10 text-white/70 hover:text-white transition-all backdrop-blur-md border border-white/5"
                >
                    <X size={24} />
                </button>

                <div className="relative p-10 flex flex-col items-center text-center bg-gradient-to-b from-amber-500/5 to-transparent">
                    <div
                        className="w-32 h-32 rounded-3xl bg-white/5 p-6 flex items-center justify-center border border-white/10 shadow-2xl mb-8 cursor-pointer group relative overflow-hidden transition-transform hover:scale-105"
                        onClick={() => setShowFullImage(true)}
                    >
                        {cert.image ? (
                            <>
                                <img src={cert.image} alt={cert.issuer} className="w-full h-full object-contain" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className="text-xs font-bold text-white uppercase tracking-wider">Tap to View</span>
                                </div>
                            </>
                        ) : (
                            <Award className="text-amber-400" size={64} />
                        )}
                    </div>

                    <p className="text-xs text-slate-500 mb-2 animate-pulse">Tap logo to view certificate</p>

                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                        {cert.title}
                    </h2>
                    <p className="text-xl text-amber-400 font-medium mb-8">{cert.issuer}</p>

                    <div className="flex items-center gap-4 text-sm font-mono text-slate-400 mb-8">
                        <span className="bg-white/5 px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            Issued: {cert.date}
                        </span>
                    </div>


                </div>
            </motion.div>

            {/* Full Screen Image Overlay - Portalled to body */}
            <AnimatePresence>
                {showFullImage && cert.image && createPortal(
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
                        onClick={() => setShowFullImage(false)}
                    >
                        <button
                            className="fixed top-6 right-6 p-4 bg-red-600 hover:bg-red-700 rounded-full text-white shadow-lg transition-all z-[10000] hover:scale-110 active:scale-95"
                            onClick={(e) => { e.stopPropagation(); setShowFullImage(false); }}
                        >
                            <X size={32} />
                        </button>
                        <img
                            src={cert.image}
                            alt={cert.title}
                            className="max-w-[95vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>,
                    document.body
                )}
            </AnimatePresence>
        </>
    );
};

export default About;
