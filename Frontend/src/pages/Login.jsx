import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Fingerprint, ArrowRight, ShieldCheck, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden font-sans">

            {/* Hanging Lamp Component */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                {/* Cord */}
                <div className="w-[2px] h-32 bg-gradient-to-b from-slate-800 to-slate-600 shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>

                {/* Lamp Head */}
                <motion.div
                    animate={{ rotate: [-1, 1, -1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                >
                    <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
                        <path d="M5 40L15 0H45L55 40H5Z" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
                        <rect x="20" y="35" width="20" height="5" rx="2" fill="#ffd700" className="animate-pulse" />
                    </svg>

                    {/* Light Beam / Glow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(255,215,0,0.15)_0%,transparent_70%)] blur-3xl pointer-events-none -mt-4 z-0"></div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-32 h-64 bg-gradient-to-b from-yellow-500/20 to-transparent blur-2xl pointer-events-none z-0 clip-path-lamp"></div>
                </motion.div>
            </div>

            {/* Background Texture */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 w-full max-w-sm mt-20"
            >
                {/* Login Card */}
                <div className="relative group">
                    {/* Glowing Border Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/50 to-orange-500/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

                    <div className="relative bg-black/40 backdrop-blur-3xl border border-white/5 rounded-2xl p-8 shadow-2xl">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h2 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent tracking-widest uppercase">
                                System Access
                            </h2>
                            <div className="h-0.5 w-12 bg-yellow-500 mx-auto mt-2 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-red-500/5 border border-red-500/20 rounded-lg p-2.5 mb-6 flex items-center gap-3 text-red-500 text-xs font-medium"
                            >
                                <ShieldCheck size={14} />
                                {error}
                            </motion.div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Identity</label>
                                <div className="relative group/input">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-yellow-500 transition-colors">
                                        <Fingerprint size={16} />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full bg-white/[0.03] border border-white/5 text-white rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-yellow-500/30 focus:bg-white/[0.05] transition-all placeholder:text-slate-700 font-mono text-xs tracking-wider"
                                        placeholder="ADMIN_ID"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Passcode</label>
                                <div className="relative group/input">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-yellow-500 transition-colors">
                                        <Terminal size={16} />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-white/[0.03] border border-white/5 text-white rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-yellow-500/30 focus:bg-white/[0.05] transition-all placeholder:text-slate-700 font-mono text-xs tracking-wider"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full relative group/btn overflow-hidden rounded-lg py-2.5 mt-4 transition-all active:scale-[0.98] disabled:opacity-50"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-600 transition-transform group-hover/btn:scale-105"></div>
                                <div className="relative flex items-center justify-center gap-2 text-black font-black text-xs uppercase tracking-widest">
                                    {loading ? (
                                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Initialize <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </div>
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-4 opacity-30 group">
                    <div className="h-[1px] w-8 bg-slate-700"></div>
                    <p className="text-[10px] font-mono text-slate-500 tracking-tighter uppercase">
                        Master Control Interface • v3.0
                    </p>
                    <div className="h-[1px] w-8 bg-slate-700"></div>
                </div>
            </motion.div>

            {/* Custom CSS for the lamp clip-path and animations */}
            <style jsx>{`
                .clip-path-lamp {
                    clip-path: polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%);
                }
                @keyframes pulse-glow {
                    0%, 100% { opacity: 0.15; transform: scale(1); }
                    50% { opacity: 0.25; transform: scale(1.1); }
                }
            `}</style>
        </div>
    );
};

export default Login;

