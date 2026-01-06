import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code2 } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', to: '/' },
        { name: 'About', to: '/about' },
        { name: 'Skills', to: '/skills' },
        { name: 'Projects', to: '/projects' },
        { name: 'Contact', to: '/contact' },
    ];

    return (
        <nav className={`fixed w-full z-[100] transition-all duration-300 ${scrolled || location.pathname !== '/' ? 'bg-slate-950/90 backdrop-blur-md py-4 border-b border-white/5' : 'bg-slate-950/50 backdrop-blur-sm py-4'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-2 font-bold text-2xl cursor-pointer">
                    <Code2 className="text-violet-500 w-8 h-8" />
                    <span className="tracking-tight">Saurabh Gupta<span className="text-violet-500">.</span></span>
                </div>

                {/* Desktop Menu & Admin Logo */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            className={`font-medium cursor-pointer transition-colors ${location.pathname === link.to
                                ? 'text-violet-400'
                                : 'text-slate-300 hover:text-violet-400'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Admin Dropdown/Logo */}
                    <div className="pl-6 border-l border-slate-800/50">
                        <a
                            href="/login"
                            className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-600 to-pink-600 flex items-center justify-center text-white font-bold text-sm hover:scale-110 transition-transform cursor-pointer shadow-lg shadow-violet-500/20 group relative"
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
