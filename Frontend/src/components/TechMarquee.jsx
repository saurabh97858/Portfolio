import React from 'react';
import { motion } from 'framer-motion';

const techs = [
    "React", "Node.js", "MongoDB", "Express", "TailwindCSS",
    "Redux", "Framer Motion", "Next.js", "JavaScript", "TypeScript",
    "Git", "GitHub", "Rest API", "GraphQL", "Docker"
];

const TechMarquee = () => {
    return (
        <div className="py-10 bg-slate-950 border-y border-slate-800/50 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950 z-10 pointer-events-none" />

            <div className="flex">
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-100%" }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="flex gap-16 pr-16 whitespace-nowrap"
                >
                    {techs.map((tech, index) => (
                        <div key={index} className="flex items-center gap-2 group cursor-default">
                            <span className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-slate-600 group-hover:from-violet-400 group-hover:to-pink-400 transition-all duration-300">
                                {tech}
                            </span>
                        </div>
                    ))}
                    {/* Duplicate for infinite loop */}
                    {techs.map((tech, index) => (
                        <div key={`dup-${index}`} className="flex items-center gap-2 group cursor-default">
                            <span className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-slate-600 group-hover:from-violet-400 group-hover:to-pink-400 transition-all duration-300">
                                {tech}
                            </span>
                        </div>
                    ))}
                </motion.div>

                {/* Second duplicated container to ensure absolutely no gaps on wide screens */}
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-100%" }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="flex gap-16 pr-16 whitespace-nowrap"
                >
                    {techs.map((tech, index) => (
                        <div key={`dup2-${index}`} className="flex items-center gap-2 group cursor-default">
                            <span className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-slate-600 group-hover:from-violet-400 group-hover:to-pink-400 transition-all duration-300">
                                {tech}
                            </span>
                        </div>
                    ))}
                    {techs.map((tech, index) => (
                        <div key={`dup3-${index}`} className="flex items-center gap-2 group cursor-default">
                            <span className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-slate-600 group-hover:from-violet-400 group-hover:to-pink-400 transition-all duration-300">
                                {tech}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default TechMarquee;
