import { useNavigate } from 'react-router-dom';

// ... inside component ...
const navigate = useNavigate();

// ... inside return ...
<div className="flex flex-wrap gap-6">
    <button
        onClick={() => navigate('/projects')}
        className="btn-primary flex items-center gap-3 text-lg px-8 py-4 group"
    >
        View My Work <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
    </button>
</div>
                </motion.div >

    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative animate-float"
    >
        {/* Abstract tech background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/30 to-pink-600/30 rounded-full blur-[60px] animate-pulse"></div>

        {/* Main Hero Image - Stock Dev Image */}
        <div className="relative z-10 w-full max-w-[280px] mx-auto group perspective-1000">
            <div className="relative transform transition-transform duration-500 group-hover:rotate-y-6 group-hover:rotate-x-6 preserve-3d">
                <img
                    src={heroImage}
                    alt="Saurabh Gupta"
                    className="w-full h-auto aspect-square object-cover object-center rounded-2xl shadow-2xl border border-slate-700/50 relative z-20"
                />

                {/* Floating Tech Icons */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-6 top-10 bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-700 shadow-xl z-30"
                >
                    <Code2 className="text-cyan-400" size={32} />
                </motion.div>

                <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -left-6 bottom-20 bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-700 shadow-xl z-30"
                >
                    <Database className="text-green-400" size={32} />
                </motion.div>

                <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute right-10 bottom-10 bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-700 shadow-xl z-30 hidden md:block"
                >
                    <Globe className="text-violet-400" size={32} />
                </motion.div>
            </div>
        </div>
    </motion.div>
            </div >
        </section >
    );
};
export default Hero;
