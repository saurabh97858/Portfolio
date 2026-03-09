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
        <div className="min-h-screen bg-black relative overflow-hidden font-sans select-none flex items-center justify-center p-4">


            <motion.div
                layout
                className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 z-10"
            >
                {/* Desk Lamp Character */}
                <motion.div
                    layout
                    className="relative flex justify-center items-end"
                    style={{ width: 300, height: 420 }}
                >
                    {/* Light Beam */}
                    <AnimatePresence>
                        {isLampOn && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="absolute top-[180px] left-1/2 -translate-x-1/2 pointer-events-none z-0 origin-top"
                            >
                                {/* Beam */}
                                <div className="w-[350px] h-[300px] bg-gradient-to-b from-[#fef08a]/20 via-[#fef08a]/5 to-transparent blur-xl" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)' }}></div>
                                {/* Floor Glow */}
                                <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-[400px] h-[100px] bg-[radial-gradient(ellipse,rgba(253,224,71,0.15)_0%,transparent_70%)] blur-2xl"></div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Lamp SVG */}
                    <svg width="240" height="350" viewBox="0 0 240 350" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]">
                        {/* Base */}
                        <ellipse cx="120" cy="330" rx="60" ry="15" fill="#e2e8f0" />
                        <path d="M60 330 L60 340 Q120 355 180 340 L180 330 Z" fill="#cbd5e1" />

                        {/* Stand */}
                        <rect x="110" y="180" width="20" height="150" fill="#e2e8f0" />
                        <rect x="110" y="180" width="10" height="150" fill="#f8fafc" />

                        {/* Hinge Joint */}
                        <circle cx="120" cy="180" r="12" fill="#94a3b8" />

                        {/* Switch Arm Group */}
                        <motion.g
                            animate={{ rotate: isPulling ? -25 : 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            style={{ originX: '120px', originY: '250px' }}
                        >
                            {/* Arm wire */}
                            <path d="M120 250 Q75 260 65 290" stroke="#94a3b8" strokeWidth="5" fill="none" strokeLinecap="round" />
                            {/* Handle */}
                            <circle cx="65" cy="290" r="10" fill="#cbd5e1" />
                            <circle cx="65" cy="290" r="4" fill="#f8fafc" />
                        </motion.g>

                        {/* Light Bulb & Interior (under shade) */}
                        <ellipse cx="120" cy="180" rx="85" ry="20" fill={isLampOn ? "#fef08a" : "#1e293b"} className="transition-colors duration-500" />
                        {isLampOn && (
                            <ellipse cx="120" cy="180" rx="60" ry="15" fill="#fff" className="blur-sm" />
                        )}

                        {/* Lamp Shade (Olive Color) */}
                        <path d="M50 40 L190 40 L210 180 L30 180 Z" fill="#849b87" />
                        {/* Shade Highlight */}
                        <path d="M50 40 L190 40 L120 40 Z" fill="#9cae91" opacity="0.4" />

                        {/* Character Face */}
                        <g transform="translate(120, 115)">
                            {isLampOn ? (
                                <>
                                    {/* Happy Eyes ^ ^ */}
                                    <path d="M-30 -12 Q-18 -28 -8 -12" stroke="#111827" strokeWidth="7" strokeLinecap="round" fill="none" />
                                    <path d="M8 -12 Q18 -28 30 -12" stroke="#111827" strokeWidth="7" strokeLinecap="round" fill="none" />

                                    {/* Open Mouth D */}
                                    <path d="M-15 5 Q0 30 15 5 Z" fill="#111827" stroke="#111827" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                    {/* Tongue */}
                                    <path d="M-5 12 Q0 24 6 12 Z" fill="#ef4444" />
                                </>
                            ) : (
                                <>
                                    {/* Sleepy Eyes U U */}
                                    <path d="M-30 -5 Q-18 8 -8 -5" stroke="#111827" strokeWidth="6" strokeLinecap="round" fill="none" />
                                    <path d="M8 -5 Q18 8 30 -5" stroke="#111827" strokeWidth="6" strokeLinecap="round" fill="none" />

                                    {/* Sleepy Mouth o */}
                                    <circle cx="0" cy="15" r="4" fill="#111827" />
                                </>
                            )}
                        </g>

                        {/* Sleep Zzzs */}
                        <AnimatePresence>
                            {!isLampOn && (
                                <motion.g
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 0], y: [-10, -30], x: [10, 20] }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    transform="translate(160, 60)"
                                >
                                    <text fill="#cbd5e1" fontSize="24" fontWeight="bold" fontFamily="monospace">z</text>
                                </motion.g>
                            )}
                        </AnimatePresence>
                    </svg>

                    {/* Interactive Hitbox for the Switch Arm */}
                    <div
                        className="absolute bottom-[40px] left-[0px] w-[140px] h-[100px] z-50 rounded-full cursor-pointer hover:bg-white/5 transition-colors"
                        onPointerDown={() => setIsPulling(true)}
                        onPointerUp={() => {
                            if (isPulling) {
                                setIsPulling(false);
                                setIsLampOn(!isLampOn);
                            }
                        }}
                        onPointerLeave={() => setIsPulling(false)}
                        title="Pull to toggle"
                    />
                </motion.div>

                {/* Login Interface (Revealed when Lamp is ON) */}
                <AnimatePresence>
                    {isLampOn && (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9, x: -40 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: -40 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="w-full max-w-sm"
                        >
                            <div className="relative group/form mt-10">
                                {/* Ambient Form Glow - Matching the image's soft border glow */}
                                <div className="absolute -inset-0.5 bg-[#849b87]/30 rounded-3xl blur-[8px] opacity-70 group-hover/form:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative bg-[#0a0c0a] rounded-3xl p-8 px-10 shadow-2xl">
                                    {/* Header */}
                                    <div className="text-center mb-10 mt-2">
                                        <h2 className="text-[22px] font-bold tracking-wide text-white">
                                            Welcome Back
                                        </h2>
                                    </div>

                                    {/* Error Display */}
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-6 flex items-center gap-3 text-red-400 text-sm"
                                        >
                                            <ShieldCheck size={16} />
                                            {error}
                                        </motion.div>
                                    )}

                                    {/* Credentials Form */}
                                    <form onSubmit={handleLogin} className="space-y-6">
                                        <div className="space-y-2 relative">
                                            <label className="text-[11px] font-semibold text-slate-400 ml-1 tracking-wide">Username</label>
                                            <div className="relative group/input">
                                                {/* Hover Glow Background */}
                                                <div className="absolute inset-0 bg-yellow-500/0 rounded-[10px] blur-md transition-colors duration-300 group-hover/input:bg-yellow-500/10 pointer-events-none"></div>

                                                {/* Focus Glow Border Container */}
                                                <div className="absolute -inset-[1px] rounded-[10px] bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 opacity-0 group-focus-within/input:opacity-100 blur-[2px] transition-opacity duration-300 pointer-events-none"></div>

                                                <input
                                                    type="text"
                                                    required
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    className="w-full relative z-10 bg-[#161816] text-slate-200 rounded-[10px] py-4 px-4 focus:outline-none focus:ring-0 focus:bg-[#1a1c1a] transition-all placeholder:text-slate-600 text-sm font-medium border border-transparent"
                                                    placeholder="Enter your username"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2 relative">
                                            <label className="text-[11px] font-semibold text-slate-400 ml-1 tracking-wide">Password</label>
                                            <div className="relative group/input">
                                                {/* Hover Glow Background */}
                                                <div className="absolute inset-0 bg-yellow-500/0 rounded-[10px] blur-md transition-colors duration-300 group-hover/input:bg-yellow-500/10 pointer-events-none"></div>

                                                {/* Focus Glow Border Container */}
                                                <div className="absolute -inset-[1px] rounded-[10px] bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 opacity-0 group-focus-within/input:opacity-100 blur-[2px] transition-opacity duration-300 pointer-events-none"></div>

                                                <input
                                                    type="password"
                                                    required
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="w-full relative z-10 bg-[#161816] text-slate-200 rounded-[10px] py-4 px-4 focus:outline-none focus:ring-0 focus:bg-[#1a1c1a] transition-all placeholder:text-slate-600 text-sm font-medium border border-transparent"
                                                    placeholder="Enter your password"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-[#7a8c60] hover:bg-[#8da36f] text-[#0d1115] font-bold rounded-[10px] py-3.5 mt-8 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-[15px]"
                                        >
                                            {loading ? (
                                                <div className="w-5 h-5 border-2 border-[#0d1115]/30 border-t-[#0d1115] rounded-full animate-spin" />
                                            ) : (
                                                <span>Login</span>
                                            )}
                                        </button>
                                    </form>

                                    <div className="mt-6 text-center">
                                        <a href="#" className="text-[11px] font-medium text-slate-500 hover:text-[#849b87] transition-colors">Forgot Password?</a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Prompt for users when light is off */}
            <AnimatePresence>
                {!isLampOn && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-16 w-full flex flex-col items-center justify-center gap-2"
                    >
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ArrowRight size={16} className="text-slate-400 rotate-[-90deg]" />
                        </motion.div>
                        <p className="text-xs font-medium text-slate-400 tracking-widest uppercase">
                            Wake me up
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Login;
