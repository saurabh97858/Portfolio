import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Code2, Briefcase, Mail, ArrowRight } from 'lucide-react';

const HomeNavigation = () => {
    const navItems = [
        {
            name: 'About Me',
            path: '/about',
            icon: User,
            color: 'from-violet-500 to-indigo-500',
            desc: 'My journey & story'
        },
        {
            name: 'Skills',
            path: '/skills',
            icon: Code2,
            color: 'from-cyan-500 to-blue-500',
            desc: 'Tech stack & tools'
        },
        {
            name: 'Projects',
            path: '/projects',
            icon: Briefcase,
            color: 'from-emerald-500 to-teal-500',
            desc: 'What I have built'
        },
        {
            name: 'Contact',
            path: '/contact',
            icon: Mail,
            color: 'from-pink-500 to-rose-500',
            desc: 'Get in touch'
        }
    ];

    return (
        <section className="py-20 px-6 relative overflow-hidden bg-slate-950/50 backdrop-blur-sm">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-900/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Explore More</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Dive deeper into my professional journey and technical expertise.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {navItems.map((item, index) => (
                        <Link key={index} to={item.path} className="group">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative h-full bg-slate-900/40 border border-white/5 rounded-2xl p-6 hover:bg-slate-900/60 transition-all duration-300 group-hover:-translate-y-2 group-hover:border-white/10 overflow-hidden"
                            >
                                {/* Hover Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} bg-opacity-20 flex items-center justify-center mb-6 shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-500`}>
                                        <item.icon size={32} className="text-white drop-shadow-md" />
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                                    <p className="text-slate-400 text-sm mb-6">{item.desc}</p>

                                    <span className={`text-sm font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent flex items-center gap-2 group-hover:gap-3 transition-all`}>
                                        Visit Page <ArrowRight size={16} className="text-slate-300" />
                                    </span>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeNavigation;
