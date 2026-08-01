import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Briefcase, GraduationCap, Award, Sparkles, User, Calendar, X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const About = () => {
    const { portfolioData, loading } = usePortfolio();
    const [selectedCert, setSelectedCert] = useState(null);

    const scrollUpVariant = {
        hidden: { opacity: 0, y: 70, scale: 0.92, rotateX: 10 },
        visible: { opacity: 1, y: 0, scale: 1, rotateX: 0, transition: { duration: 0.7, ease: "easeOut" } }
    };

    const scrollLeftVariant = {
        hidden: { opacity: 0, x: -70, scale: 0.95 },
        visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } }
    };

    const scrollRightVariant = {
        hidden: { opacity: 0, x: 70, scale: 0.95 },
        visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } }
    };

    if (loading) {
        return (
            <div className="min-h-[50vh] bg-transparent flex items-center justify-center text-white font-mono animate-pulse">
                Loading About Section...
            </div>
        );
    }

    const aboutData = portfolioData || {};
    const experiences = aboutData?.experience || [];
    const education = aboutData?.education || [];
    const certifications = aboutData?.certifications || [];
    const defaultBio = "Passionate Full Stack Developer specializing in the MERN stack and modern web technologies. I build scalable SaaS platforms, AI-powered applications, and responsive web systems with a focus on performance and exceptional user experience.";

    return (
        <section id="about" className="relative z-10 font-sans text-slate-300 bg-transparent py-16 md:py-28 overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[140px] -z-10 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] -z-10 animate-pulse" />
            </div>

            <div className="layout-wrapper relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">

                {/* Section Header with Re-triggerable Scroll Animation */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={scrollUpVariant}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold tracking-widest uppercase mb-3 backdrop-blur-md">
                        <Sparkles size={14} className="text-violet-400 animate-spin" style={{ animationDuration: '8s' }} />
                        MY JOURNEY
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">Me.</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base font-light leading-relaxed">
                        Architecting digital realities with code, creativity, and precision.
                    </p>
                </motion.div>

                {/* SECTION 1: BIO CARD */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={scrollUpVariant}
                    className="mb-16 md:mb-24"
                >
                    <div className="relative rounded-3xl bg-slate-900/50 border border-slate-800/80 p-8 sm:p-10 md:p-12 backdrop-blur-xl shadow-2xl overflow-hidden hover:border-violet-500/40 transition-colors duration-500">
                        <div className="flex flex-col md:flex-row gap-8 sm:gap-10 items-center md:items-start relative z-10">
                            
                            {/* Profile Avatar Frame */}
                            <div className="relative group shrink-0">
                                <div className="absolute -inset-1 bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-cyan-400 rounded-3xl blur-md opacity-60 group-hover:opacity-100 transition duration-500"></div>
                                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-slate-950/80 border border-slate-700/80 p-1 flex items-center justify-center overflow-hidden shadow-2xl relative z-10">
                                    {aboutData?.profileImage ? (
                                        <img
                                            src={aboutData.profileImage}
                                            alt={aboutData.name || "Profile"}
                                            className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-950 flex flex-col items-center justify-center p-3 text-center">
                                            <div className="w-14 h-14 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center mb-2">
                                                <User className="text-violet-400" size={32} />
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">SAURABH</span>
                                        </div>
                                    )}
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-slate-950 border border-slate-700 px-3 py-1 rounded-full text-[10px] font-bold text-emerald-400 flex items-center gap-1.5 shadow-lg z-20">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    Active
                                </div>
                            </div>

                            {/* Bio Content & Metric Badges */}
                            <div className="flex-1 text-center md:text-left space-y-5">
                                <div className="px-2">
                                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                                        Hi, I'm <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">{aboutData?.name || 'Saurabh Gupta'}</span>.
                                    </h3>
                                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                                        {aboutData?.about || defaultBio}
                                    </p>
                                </div>

                                <div className="pt-3 flex flex-wrap justify-center md:justify-start gap-4 px-2">
                                    <div className="bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/50 px-6 py-4 rounded-2xl flex items-center gap-4 transition-all hover:scale-105 shadow-lg backdrop-blur-md">
                                        <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
                                            <Code2 size={24} />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-2xl font-black text-white">{aboutData?.projects?.length || 6}+</div>
                                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">PROJECTS BUILT</div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-950/60 border border-slate-800/80 hover:border-violet-500/50 px-6 py-4 rounded-2xl flex items-center gap-4 transition-all hover:scale-105 shadow-lg backdrop-blur-md">
                                        <div className="p-3 bg-violet-500/10 text-violet-400 rounded-xl border border-violet-500/20">
                                            <Briefcase size={24} />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-2xl font-black text-white">{aboutData?.yearsOfExperience || '1'}+</div>
                                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">YEARS EXP.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </motion.div>

                {/* SECTION 2: WORK EXPERIENCE & EDUCATION WITH DYNAMIC SCROLL ANIMATION */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-start mb-20">

                    {/* WORK EXPERIENCE COLUMN (SLIDES IN FROM LEFT ON SCROLL) */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.15 }}
                        variants={scrollLeftVariant}
                        className="space-y-6"
                    >
                        {/* Centered Work Experience Title */}
                        <div className="flex items-center justify-center gap-3 text-center mb-6">
                            <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/30">
                                <Briefcase size={22} />
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Work Experience</h3>
                        </div>

                        {/* Experience Outer Container */}
                        <div className="bg-slate-900/50 border border-slate-800/80 rounded-3xl p-7 sm:p-9 md:p-10 backdrop-blur-xl space-y-8 shadow-xl">
                            {experiences.length > 0 ? (
                                experiences.map((exp, idx) => (
                                    <div
                                        key={idx}
                                        className="p-7 sm:p-9 md:p-10 rounded-2xl bg-slate-950/90 border border-slate-800/90 hover:border-violet-500/50 transition-all space-y-5 shadow-lg backdrop-blur-md"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5 px-2">
                                            <div className="space-y-1.5">
                                                <h4 className="text-xl sm:text-2xl font-bold text-white leading-tight">{exp.role}</h4>
                                                <div className="text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                                    {exp.company}
                                                </div>
                                            </div>
                                            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono font-medium whitespace-nowrap w-fit shrink-0">
                                                <Calendar size={14} />
                                                {exp.duration}
                                            </span>
                                        </div>

                                        <div className="p-4 sm:p-5 bg-slate-900/40 rounded-xl border border-slate-800/50">
                                            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                                                {exp.description}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-slate-400 text-sm italic py-6 text-center">No experience entries listed.</div>
                            )}
                        </div>
                    </motion.div>

                    {/* EDUCATION & CERTIFICATIONS COLUMN (SLIDES IN FROM RIGHT ON SCROLL) */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.15 }}
                        variants={scrollRightVariant}
                        className="space-y-10"
                    >
                        {/* Education */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-center gap-3 text-center mb-6">
                                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                    <GraduationCap size={22} />
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Education</h3>
                            </div>

                            <div className="bg-slate-900/50 border border-slate-800/80 rounded-3xl p-7 sm:p-9 md:p-10 backdrop-blur-xl space-y-8 shadow-xl">
                                {education.length > 0 ? (
                                    education.map((edu, idx) => (
                                        <div
                                            key={idx}
                                            className="p-7 sm:p-9 md:p-10 rounded-2xl bg-slate-950/90 border border-slate-800/90 hover:border-emerald-500/50 transition-all space-y-5 shadow-lg backdrop-blur-md"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800/80 pb-5 px-2">
                                                <h4 className="text-lg sm:text-xl font-bold text-white leading-relaxed">{edu.institution}</h4>
                                                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium whitespace-nowrap w-fit shrink-0">
                                                    <Calendar size={14} />
                                                    {edu.year}
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900/40 rounded-xl border border-slate-800/50">
                                                <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider">{edu.degree}</p>
                                                {edu.cgpa && (
                                                    <span className="px-3.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono">
                                                        CGPA: {edu.cgpa}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-slate-400 text-sm italic py-6 text-center">No education listed.</div>
                                )}
                            </div>
                        </div>

                        {/* Certifications Container Box */}
                        {certifications.length > 0 && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-center gap-3 text-center mb-6">
                                    <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                                        <Award size={22} />
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Certifications</h3>
                                </div>

                                <div className="bg-slate-900/50 border border-slate-800/80 rounded-3xl p-7 sm:p-9 md:p-10 backdrop-blur-xl shadow-xl">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {certifications.map((cert, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => setSelectedCert(cert)}
                                                className="bg-slate-950/90 border border-slate-800/90 hover:border-amber-500/50 p-6 sm:p-7 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-lg space-y-4 group backdrop-blur-md"
                                            >
                                                <div className="flex justify-between items-center px-1">
                                                    <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-transform">
                                                        <Award size={22} />
                                                    </div>
                                                    <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                                                        {cert.date}
                                                    </span>
                                                </div>
                                                <div className="space-y-1.5 px-1">
                                                    <h5 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                                                        {cert.title}
                                                    </h5>
                                                    <p className="text-xs text-slate-400 font-medium">{cert.issuer}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                    </motion.div>

                </div>

            </div>

            {/* Certification Modal */}
            <AnimatePresence>
                {selectedCert && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCert(null)}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-4 text-center"
                        >
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>

                            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto mb-2">
                                <Award size={32} />
                            </div>

                            <h3 className="text-xl sm:text-2xl font-black text-white">{selectedCert.title}</h3>
                            <p className="text-amber-400 font-medium text-sm">{selectedCert.issuer}</p>
                            <p className="text-xs font-mono text-slate-400">Date Issued: {selectedCert.date}</p>

                            {selectedCert.image && (
                                <img
                                    src={selectedCert.image}
                                    alt={selectedCert.title}
                                    className="w-full max-h-56 object-contain rounded-xl border border-slate-800 mt-4"
                                />
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default About;
