import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { Menu, X, Code2 } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const location = useLocation();

    // Handle scroll for hiding/showing navbar
    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Add background blur/border when scrolled past top
            if (currentScrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

            // Hide navbar on scroll down, show on scroll up
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setVisible(false);
            } else {
                setVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    // Updated links with distinct colors for exact glow mapping
    const navLinks = [
        { name: 'Home', to: 'home', color: 'text-violet-400', glow: 'hover:drop-shadow-[0_0_15px_rgba(167,139,250,1)] hover:text-violet-300' },
        { name: 'About', to: 'about', color: 'text-cyan-400', glow: 'hover:drop-shadow-[0_0_15px_rgba(34,211,238,1)] hover:text-cyan-300' },
        { name: 'Skills', to: 'skills', color: 'text-emerald-400', glow: 'hover:drop-shadow-[0_0_15px_rgba(52,211,153,1)] hover:text-emerald-300' },
        { name: 'Projects', to: 'projects', color: 'text-pink-400', glow: 'hover:drop-shadow-[0_0_15px_rgba(244,114,182,1)] hover:text-pink-300' },
        { name: 'Contact', to: 'contact', color: 'text-amber-400', glow: 'hover:drop-shadow-[0_0_15px_rgba(251,191,36,1)] hover:text-amber-300' },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-[999] transition-all duration-500 group/nav ${visible ? 'translate-y-0' : '-translate-y-full'
            } ${scrolled ? 'bg-slate-950/80 backdrop-blur-md py-4 shadow-[0_0_15px_rgba(0,0,0,0.5)]' : 'bg-transparent py-8'
            }`}>
            {/* Glowing Bottom Border on Hover */}
            <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-700 ease-out origin-center ${scrolled ? 'opacity-100 shadow-[0_4px_20px_rgba(250,204,21,0.6)]' : 'opacity-0'}`}></div>

            <div className="layout-wrapper h-full flex justify-between items-center relative">
                {/* Logo Section */}
                <div className="flex items-center gap-1 cursor-pointer">
                    <span className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent tracking-tight hover:opacity-80 transition-opacity drop-shadow-md">
                        Saurabh Gupta
                    </span>
                </div>

                {/* Desktop Menu - Centered */}
                <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
                    {navLinks.map((link) => (
                        <ScrollLink
                            key={link.name}
                            to={link.to}
                            spy={true}
                            smooth={true}
                            offset={-100}
                            duration={500}
                            className={`text-lg font-bold cursor-pointer transition-all duration-300 text-slate-300 hover:text-white hover:-translate-y-1 ${link.glow}`}
                            activeClass={link.color}
                        >
                            {link.name}
                        </ScrollLink>
                    ))}
                </div>

                {/* Admin/User Section - Right Aligned */}
                <div className="hidden md:flex items-center gap-6">
                    <div className="pl-6 border-l border-slate-800/50">
                        <a
                            href="/login"
                            className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-pink-600 flex items-center justify-center text-white font-bold text-xs hover:scale-110 transition-transform cursor-pointer shadow-lg shadow-violet-500/20 group/admin relative"
                        >
                            SG
                            <span className="absolute -bottom-10 right-0 text-xs bg-slate-900 border border-slate-700 text-slate-300 px-2 py-1 rounded opacity-0 group-hover/admin:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                Admin Only
                            </span>
                        </a>
                    </div>
                </div>

                {/* Mobile Actions (Admin + Menu) */}
                <div className="flex items-center gap-4 md:hidden">
                    <RouterLink
                        to="/login"
                        className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-pink-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-violet-500/20 active:scale-95 transition-transform"
                    >
                        SG
                    </RouterLink>
                    <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white">
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 py-4 flex flex-col items-center gap-4 animate-in slide-in-from-top-5">
                    {navLinks.map((link) => (
                        <ScrollLink
                            key={link.name}
                            to={link.to}
                            spy={true}
                            smooth={true}
                            offset={-100}
                            duration={500}
                            onClick={() => setIsOpen(false)}
                            className="text-slate-300 hover:text-violet-400 font-medium cursor-pointer py-2"
                            activeClass="text-violet-400"
                        >
                            {link.name}
                        </ScrollLink>
                    ))}

                    {/* Admin Link for Mobile */}
                    <div className="w-full border-t border-slate-800/50 mt-2 pt-4 flex flex-col items-center">
                        <RouterLink
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="bg-gradient-to-r from-violet-600 to-pink-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg shadow-violet-500/20 active:scale-95 transition-transform"
                        >
                            Admin Dashboard
                        </RouterLink>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
