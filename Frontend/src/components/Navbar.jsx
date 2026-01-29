import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code2 } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', to: '/' },
        { name: 'About', to: '/about' },
        { name: 'Skills', to: '/skills' },
        { name: 'Projects', to: '/projects' },
        { name: 'Contact', to: '/contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-[999] bg-slate-950 border-b border-white/5 py-6">
            <div className="w-full px-6 md:px-12 h-full flex justify-between items-center relative">
                {/* Logo Section */}
                <div className="flex items-center gap-2 font-bold text-3xl cursor-pointer ml-4 md:ml-8">
                    <Code2 className="text-violet-500 w-10 h-10" />
                    <span className="tracking-tight">Saurabh Gupta<span className="text-violet-500">.</span></span>
                </div>

                {/* Desktop Menu - Centered */}
                <div className="hidden md:flex items-center gap-8 absolute left-[55%] top-1/2 -translate-y-1/2 -translate-x-1/2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            className={`text-lg font-medium cursor-pointer transition-colors ${location.pathname === link.to
                                ? 'text-violet-400'
                                : 'text-slate-300 hover:text-violet-400'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Admin/User Section - Right Aligned */}
                <div className="hidden md:flex items-center gap-6">
                    <div className="pl-6 border-l border-slate-800/50">
                        <a
                            href="/login"
                            className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-pink-600 flex items-center justify-center text-white font-bold text-xs hover:scale-110 transition-transform cursor-pointer shadow-lg shadow-violet-500/20 group relative"
                        >
                            SG
                            <span className="absolute -bottom-10 right-0 text-xs bg-slate-900 border border-slate-700 text-slate-300 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                Admin Only
                            </span>
                        </a>
                    </div>
                </div>

                {/* Mobile Actions (Admin + Menu) */}
                <div className="flex items-center gap-4 md:hidden">
                    <Link
                        to="/login"
                        className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-pink-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-violet-500/20 active:scale-95 transition-transform"
                    >
                        SG
                    </Link>
                    <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white">
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 py-4 flex flex-col items-center gap-4 animate-in slide-in-from-top-5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            smooth={true}
                            duration={500}
                            onClick={() => setIsOpen(false)}
                            className="text-slate-300 hover:text-violet-400 font-medium cursor-pointer py-2"
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Admin Link for Mobile */}
                    <div className="w-full border-t border-slate-800/50 mt-2 pt-4 flex flex-col items-center">
                        <Link
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="bg-gradient-to-r from-violet-600 to-pink-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg shadow-violet-500/20 active:scale-95 transition-transform"
                        >
                            Admin Dashboard
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
