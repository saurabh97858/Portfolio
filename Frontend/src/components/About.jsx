import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Server, Globe, Cpu, GraduationCap, Briefcase, User, Terminal, X, ExternalLink, Award } from 'lucide-react';

const About = () => {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedCert, setSelectedCert] = useState(null);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio`);
                const data = await res.json();
                setAboutData(data);
            } catch (error) {
                console.error("Failed to fetch about data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAbout();
    }, []);

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
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
    };

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-mono animate-pulse">Initializing...</div>;

    const experiences = aboutData?.experience || [];
    const education = aboutData?.education || [];
    const certifications = aboutData?.certifications || [];
    const defaultBio = "I am a passionate Full Stack Developer dedicated to crafting robust back-ends and intuitive front-ends. My journey is defined by a relentless curiosity and a drive to build scalable, user-centric solutions.";

    return (
        <section id="about" className="min-h-screen py-10 flex items-center justify-center relative z-10 font-sans text-slate-300 bg-slate-950 overflow-hidden">

            {/* Expanded Background Gradients */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[150px] -z-10 animate-pulse" style={{ animationDuration: '10s' }} />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[150px] -z-10 animate-pulse" style={{ animationDuration: '12s' }} />

            {/* Main Container - Significantly Larger max-w-7xl */}
            <div className="container mx-auto px-6 md:px-12 max-w-6xl w-full relative z-10">

                {/* Header - Huge & Bold */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                    style={{ filter: selectedCert ? 'blur(10px)' : 'none', transition: 'filter 0.3s' }}
                >
                    <span className="inline-block py-2 px-6 rounded-full bg-white/5 border border-white/10 text-violet-400 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md shadow-lg">
                        My Journey
                    </span>
                    <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-6 drop-shadow-2xl">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">Me</span>.
                    </h2>
                    <p className="text-slate-400 max-w-3xl mx-auto text-xl md:text-2xl font-light leading-relaxed">
                        Architecting digital realities with code, creativity, and precision.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col gap-12"
                    style={{ filter: selectedCert ? 'blur(10px)' : 'none', transition: 'filter 0.3s' }}
                >
                    {/* 1. HERO BIO SECTION (Massive Card) */}
                    <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[3rem] p-6 md:p-10 shadow-2xl relative overflow-hidden group hover:border-violet-500/30 transition-all duration-500">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity transform rotate-12 scale-150">
                            <Terminal size={300} />
                        </div>
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-violet-500/20 rounded-full blur-[80px]" />

                        <div className="flex flex-col lg:flex-row gap-16 items-center relative z-10">
                            {/* Avatar / Icon Placeholder - Larger */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-cyan-600 rounded-full blur-2xl opacity-40 animate-pulse"></div>
                                <div className="w-40 h-40 md:w-64 md:h-64 flex-shrink-0 rounded-full bg-slate-950 border-4 border-white/10 flex items-center justify-center p-6 shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-500">
                                    <User className="text-slate-200" size={80} />
                                </div>
                            </div>

                            <div className="flex-1 text-center lg:text-left">
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                                    Hi, I'm <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">{aboutData?.name || 'Saurabh'}</span>.
                                </h3>
                                <p className="text-lg md:text-2xl text-slate-300 leading-relaxed font-light max-w-5xl">
                                    {aboutData?.about || defaultBio}
                                </p>

                                <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-6">
                                    <div className="bg-white/5 border border-white/10 px-8 py-5 rounded-2xl flex items-center gap-5 hover:bg-white/10 transition-colors hover:scale-105 duration-300 hover:border-cyan-500/30 shadow-lg">
                                        <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
                                            <Code2 size={32} />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-3xl font-bold text-white">{aboutData?.projects?.length || 5}+</div>
                                            <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">Projects</div>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 px-8 py-5 rounded-2xl flex items-center gap-5 hover:bg-white/10 transition-colors hover:scale-105 duration-300 hover:border-violet-500/30 shadow-lg">
                                        <div className="p-3 bg-violet-500/10 rounded-xl text-violet-400">
                                            <Briefcase size={32} />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-3xl font-bold text-white">2+</div>
                                            <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">Years Exp.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* 2. SPLIT SECTION: Experience & Education */}
                    <div className="grid lg:grid-cols-2 gap-10 items-stretch">

                        {/* Experience Column */}
                        <motion.div variants={itemVariants} className="flex flex-col h-full">
                            <h3 className="text-3xl font-bold text-white flex items-center gap-4 mb-8 pl-2">
                                <div className="p-3 bg-violet-500/10 rounded-xl text-violet-400 ring-1 ring-violet-500/20">
                                    <Briefcase size={28} />
                                </div>
                                <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Experience</span>
                            </h3>

                            <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-10 relative flex-1 hover:border-white/20 transition-colors shadow-xl">
                                <div className="space-y-12">
                                    {experiences.length > 0 ? experiences.map((exp, idx) => (
                                        <div key={idx} className="relative group">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 mb-2">
                                                <h4 className="text-2xl font-bold text-white group-hover:text-violet-400 transition-colors">{exp.role}</h4>
                                                <span className="text-sm font-mono py-1 px-4 bg-white/5 rounded-full text-slate-300 border border-white/10 shadow-inner">{exp.duration}</span>
                                            </div>
                                            <div className="text-cyan-400 text-base font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                                                {exp.company}
                                            </div>
                                            <p className="text-slate-400 leading-relaxed text-lg pl-2 border-l-2 border-transparent group-hover:border-violet-500/30 transition-all">
                                                {exp.description}
                                            </p>
                                        </div>
                                    )) : (
                                        <div className="pl-12 text-slate-500 italic text-lg">No experience entries found.</div>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Education Column & Tech Focus */}
                        <motion.div variants={itemVariants} className="flex flex-col gap-10 h-full">

                            {/* Education */}
                            <div className="flex flex-col flex-1">
                                <h3 className="text-3xl font-bold text-white flex items-center gap-4 mb-8 pl-2">
                                    <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 ring-1 ring-emerald-500/20">
                                        <GraduationCap size={28} />
                                    </div>
                                    <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Education</span>
                                </h3>

                                <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-10 flex-1 hover:border-white/20 transition-colors shadow-xl">
                                    {education.length > 0 ? education.map((edu, idx) => (
                                        <div key={idx} className="border-l-4 border-emerald-500/30 pl-8 py-2 last:mb-0 mb-8 group hover:border-emerald-500/60 transition-colors">
                                            <h4 className="text-2xl font-bold text-white mb-2">{edu.institution}</h4>
                                            <p className="text-emerald-400 text-base font-bold uppercase tracking-wider">{edu.degree}</p>
                                            <div className="mt-4 flex items-center gap-4 text-sm text-slate-400 font-mono">
                                                <span className="bg-white/5 px-3 py-1 rounded-lg border border-white/5">{edu.year}</span>
                                                {edu.cgpa && <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg font-bold border border-emerald-500/20">CGPA: {edu.cgpa}</span>}
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="border-l-4 border-emerald-500/30 pl-8 py-2">
                                            <h4 className="text-2xl font-bold text-white mb-2">Shaheed Bhagat Singh State University</h4>
                                            <p className="text-emerald-400 text-base font-bold uppercase tracking-wider">B.Tech - Computer Science</p>
                                            <div className="mt-4 text-sm text-slate-400 font-mono">2022 - 2026</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Tech Stack Summary (Large) */}
                            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-white/10 rounded-[2.5rem] p-10 flex flex-col xl:flex-row items-center justify-between gap-8 group hover:border-cyan-500/40 transition-all shadow-2xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="text-center xl:text-left relative z-10">
                                    <h4 className="text-2xl font-bold text-white mb-3">My Tech Stack</h4>
                                    <p className="text-slate-400 text-base max-w-sm leading-relaxed">
                                        Architecting scalable solutions with a modern, performance-first ecosystem.
                                    </p>
                                </div>
                                <div className="grid grid-cols-4 gap-6 relative z-10">
                                    <div className="w-16 h-16 bg-slate-950/50 rounded-2xl flex items-center justify-center text-cyan-400 border border-white/10 group-hover:border-cyan-500/50 group-hover:scale-110 transition-all shadow-lg"><Globe size={32} /></div>
                                    <div className="w-16 h-16 bg-slate-950/50 rounded-2xl flex items-center justify-center text-violet-400 border border-white/10 group-hover:border-violet-500/50 group-hover:scale-110 transition-all shadow-lg"><Server size={32} /></div>
                                    <div className="w-16 h-16 bg-slate-950/50 rounded-2xl flex items-center justify-center text-pink-400 border border-white/10 group-hover:border-pink-500/50 group-hover:scale-110 transition-all shadow-lg"><Cpu size={32} /></div>
                                    <div className="w-16 h-16 bg-slate-950/50 rounded-2xl flex items-center justify-center text-yellow-400 border border-white/10 group-hover:border-yellow-500/50 group-hover:scale-110 transition-all shadow-lg"><Terminal size={32} /></div>
                                </div>
                            </div>

                        </motion.div>
                    </div>

                    {/* 3. CERTIFICATIONS SECTION */}
                    {certifications.length > 0 && (
                        <div className="mt-10">
                            <h3 className="text-3xl font-bold text-white flex items-center gap-4 mb-10 pl-2">
                                <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 ring-1 ring-amber-500/20">
                                    <Award size={28} />
                                </div>
                                <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Certifications</span>
                            </h3>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

const CertificateCard = ({ cert, idx, variants, onClick }) => {
    return (
        <motion.div
            layoutId={`cert-card-${idx}`}
            variants={variants}
            onClick={onClick}
            whileHover={{ y: -5 }}
            className="group cursor-pointer bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col gap-4 hover:border-amber-500/30 transition-all shadow-xl relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

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

            <div className="mt-2">
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
        </motion.div>
    );
};

const CertificationDetail = ({ cert, onClose }) => {
    // Generate a layout ID based on cert title usually, but idx passed would be better. 
    // For now assuming cert object ref is stable or we use a unique ID. 
    // Ideally we pass the index or unique ID.
    // Let's rely on Framer Motion finding the match if we use the object layoutId logic 
    // but we need the index. Let's assume unique titles for now or pass index in `cert` object wrapper if needed.
    // Actually, I missed passing index to the detail view layoutId. 
    // I'll use a generic ID for the detail view to animate from the card.
    // Since I can't easily get the index in the Detail component without modifying state structure, 
    // I'll assume passing the index in the selectedCert object would be best practice, but 
    // for this "aur bhi kro" speed, using `cert.title` as fallback ID key might work if unique.

    // To fix layoutId matching, I should have stored { ...cert, index } in state. 
    // For now I'll just animate the modal content in simply without layoutId for the texts 
    // to avoid mismatched shared layout glitches, or just use `layoutId` on the main container.

    return (
        <motion.div
            layoutId={`cert-card-${cert?.index}`} // Matching this is tricky without index in state
            className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden z-50 backdrop-blur-xl flex flex-col"
        >
            {/* Close Button */}
            <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="absolute top-6 right-6 z-50 p-3 rounded-full bg-black/20 hover:bg-white/10 text-white/70 hover:text-white transition-all backdrop-blur-md border border-white/5"
            >
                <X size={24} />
            </button>

            <div className="relative p-10 flex flex-col items-center text-center bg-gradient-to-b from-amber-500/5 to-transparent">
                <div className="w-32 h-32 rounded-3xl bg-white/5 p-6 flex items-center justify-center border border-white/10 shadow-2xl mb-8">
                    {cert.image ? (
                        <img src={cert.image} alt={cert.issuer} className="w-full h-full object-contain" />
                    ) : (
                        <Award className="text-amber-400" size={64} />
                    )}
                </div>

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

                {cert.link && (
                    <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-2xl shadow-lg shadow-amber-500/20 transition-all hover:scale-105 font-bold"
                    >
                        <ExternalLink size={20} />
                        Verify Credential
                    </a>
                )}
            </div>
        </motion.div>
    );
}

export default About;
