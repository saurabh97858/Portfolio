import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, ArrowRight, ShieldCheck, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isLampOn, setIsLampOn] = useState(false);
    const [isPulling, setIsPulling] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Access Denied');
            }

            localStorage.setItem('adminToken', data.token);

            if (data.isAdmin) {
                localStorage.setItem('adminUser', JSON.stringify(data));
                navigate('/dashboard');
            } else {
                throw new Error('Not authorized as Admin');
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePull = () => {
        setIsPulling(true);
        setTimeout(() => {
            setIsPulling(false);
            setIsLampOn(!isLampOn);
        }, 300);
    };

    return (
        <div className="min-h-screen bg-[#050505] relative overflow-hidden font-sans select-none">

            {/* Hanging Lamp Component - Animates Left on Activation */}
            <motion.div
                className="absolute top-0 h-full w-full pointer-events-none flex flex-col items-center justify-start z-30"
                initial={{ left: '0%', top: '0%' }}
                animate={{
                    left: isLampOn ? (isMobile ? '0%' : '-20%') : '0%',
                    top: isLampOn && isMobile ? '-10%' : '0%'
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                {/* Interactive Area */}
                <div className="pointer-events-auto flex flex-col items-center">
                    {/* Fixed Cord - Thickened and Lengthened */}
                    <div className="w-[3px] h-32 md:h-48 bg-gradient-to-b from-slate-900 via-slate-700 to-slate-600 shadow-[0_0_15px_rgba(0,0,0,0.8)] relative z-0"></div>

                    {/* Lamp Head & Interactive Pull String */}
                    <motion.div
                        animate={{
                            rotate: isLampOn ? [-0.5, 0.5, -0.5] : 0,
                            y: isPulling ? 25 : 0
                        }}
                        transition={{
                            rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                            y: { type: "spring", stiffness: 300, damping: 10 }
                        }}
                        className="relative flex flex-col items-center"
                    >
                        {/* Scaled Up Lamp SVG */}
                        <svg width="120" height="80" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] relative z-10">
                            <path d="M5 40L15 0H45L55 40H5Z" fill={isLampOn ? "#222" : "#111"} stroke={isLampOn ? "#444" : "#222"} strokeWidth="1" />
                            <rect x="23" y="36" width="14" height="4" rx="1" fill={isLampOn ? "#ffcc00" : "#333"} className={isLampOn ? "animate-pulse" : ""} />
                        </svg>

                        {/* Pull String Cord - Lengthened */}
                        <div className="w-[2px] h-28 md:h-40 bg-slate-600/50 relative z-0 mt-[-2px]"></div>

                        {/* Pull Handle (Trigger) - Enlarged */}
                        <motion.div
                            whileHover={{ scale: 1.2, backgroundColor: "#fff" }}
                            whileTap={{ scale: 0.9, y: 15 }}
                            onClick={handlePull}
                            className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-slate-400 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-colors mt-[-4px] relative z-20"
                            title="Pull to toggle light"
                        />

                        {/* Light Beam / Glow (Visible when ON) */}
                        <AnimatePresence>
                            {isLampOn && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute top-[78px] left-1/2 -translate-x-1/2 pointer-events-none z-0"
                                >
                                    {/* Massive Soft Glow */}
                                    <div className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-[radial-gradient(circle,rgba(255,200,0,0.12)_0%,transparent_60%)] blur-3xl -mt-20"></div>
                                    {/* Focused Conical Light Beam */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 md:w-96 h-[400px] md:h-[600px] bg-gradient-to-b from-yellow-500/15 via-yellow-500/5 to-transparent blur-3xl clip-path-lamp"></div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </motion.div>

            {/* Background Texture Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

            {/* Login Interface (Revealed when Lamp is ON) */}
            <AnimatePresence>
                {isLampOn && (
                    <motion.div
                        initial={{ left: '50%', top: '50%', x: '-50%', y: '-50%', opacity: 0, scale: 0.9 }}
                        animate={{
                            left: isMobile ? '50%' : '70%',
                            top: isMobile ? '70%' : '50%',
                            opacity: 1,
                            scale: 1
                        }}
                        exit={{ left: '50%', top: '50%', opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        className="absolute z-10 w-full max-w-sm px-4 md:px-0"
                    >
                        <div className="relative group">
                            {/* Ambient Glow */}
                            <div className="absolute -inset-0.5 bg-yellow-500/10 rounded-2xl blur-2xl opacity-50"></div>

                            <div className="relative bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/5 rounded-2xl p-8 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <h2 className="text-sm font-black text-slate-500 tracking-[0.3em] uppercase mb-1">
                                        Terminal Link
                                    </h2>
                                    <div className="h-[1px] w-8 bg-yellow-500/50 mx-auto rounded-full"></div>
                                </div>

                                {/* Error Display */}
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-red-500/5 border border-red-500/10 rounded-lg p-2.5 mb-6 flex items-center gap-3 text-red-500/80 text-[10px] font-mono tracking-tighter"
                                    >
                                        <ShieldCheck size={12} />
                                        {error.toUpperCase()}
                                    </motion.div>
                                )}

                                {/* Credentials Form */}
                                <form onSubmit={handleLogin} className="space-y-5">
                                    <div className="space-y-1.5">
                                        <div className="relative group/input">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-600 group-focus-within/input:text-yellow-500 transition-colors">
                                                <Fingerprint size={14} />
                                            </div>
                                            <input
                                                type="text"
                                                required
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="w-full bg-white/[0.01] border border-white/5 text-slate-300 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-yellow-500/20 focus:bg-white/[0.03] transition-all placeholder:text-slate-800 font-mono text-[11px] tracking-widest uppercase"
                                                placeholder="ID_LOGIN"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="relative group/input">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-600 group-focus-within/input:text-yellow-500 transition-colors">
                                                <Terminal size={14} />
                                            </div>
                                            <input
                                                type="password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full bg-white/[0.01] border border-white/5 text-slate-300 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-yellow-500/20 focus:bg-white/[0.03] transition-all placeholder:text-slate-800 font-mono text-[11px] tracking-widest"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full relative group/btn overflow-hidden rounded-lg py-3 mt-6 transition-all active:scale-[0.98] disabled:opacity-50"
                                    >
                                        <div className="absolute inset-0 bg-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.2)] transition-transform group-hover/btn:scale-[1.02]"></div>
                                        <div className="relative flex items-center justify-center gap-2 text-black font-black text-[10px] uppercase tracking-[0.2em]">
                                            {loading ? (
                                                <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    Access System <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </div>
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Footer Status */}
                        <div className="mt-8 flex items-center justify-center gap-4 opacity-10">
                            <div className="h-[1px] w-6 bg-slate-500"></div>
                            <p className="text-[8px] font-mono text-slate-500 tracking-widest uppercase">
                                Root Channel Encrypted
                            </p>
                            <div className="h-[1px] w-6 bg-slate-500"></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Prompt for users when light is off */}
            <AnimatePresence>
                {!isLampOn && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-mono text-slate-500 tracking-[0.5em] uppercase w-full text-center"
                    >
                        Pull the cord to initiate
                    </motion.p>
                )}
            </AnimatePresence>

            <style jsx>{`
                .clip-path-lamp {
                    clip-path: polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%);
                }
            `}</style>
        </div>
    );
};

export default Login;

