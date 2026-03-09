import React from 'react';
import { Heart, MapPin, Home, Navigation } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Footer = () => {
    const { portfolioData } = usePortfolio();

    return (
        <footer className="group relative z-50 bg-black mt-12 transition-all duration-500">
            {/* Glowing Top Border on Hover */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-center opacity-0 group-hover:opacity-100 shadow-[0_-4px_20px_rgba(250,204,21,0.6)]"></div>

            {/* Visual Separator from Contact */}
            <div className="w-full pt-16 pb-10">
                <div className="layout-wrapper">
                    <div className="h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent"></div>
                </div>
            </div>

            {/* Address Section */}
            <div className="layout-wrapper pb-8 md:pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Current Address */}
                    <div className="group relative p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 transition-all duration-300">
                        <div className="absolute -inset-[0.5px] bg-gradient-to-r from-cyan-500/0 to-violet-500/0 group-hover:from-cyan-500/10 group-hover:to-violet-500/10 rounded-xl blur-sm transition-all duration-500 pointer-events-none"></div>
                        <div className="relative flex items-start gap-3">
                            <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
                                <Navigation size={16} />
                            </div>
                            <div>
                                <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">Current Address</h4>
                                <p className="text-xs md:text-sm font-semibold text-slate-200 leading-relaxed">
                                    {portfolioData?.currentAddress || 'Not set yet'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Permanent Address */}
                    <div className="group relative p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-violet-500/30 transition-all duration-300">
                        <div className="absolute -inset-[0.5px] bg-gradient-to-r from-violet-500/0 to-pink-500/0 group-hover:from-violet-500/10 group-hover:to-pink-500/10 rounded-xl blur-sm transition-all duration-500 pointer-events-none"></div>
                        <div className="relative flex items-start gap-3">
                            <div className="p-2.5 rounded-lg bg-violet-500/10 text-violet-400 shrink-0 group-hover:bg-violet-500 group-hover:text-white transition-all duration-300">
                                <Home size={16} />
                            </div>
                            <div>
                                <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">Permanent Address</h4>
                                <p className="text-xs md:text-sm font-semibold text-slate-200 leading-relaxed">
                                    {portfolioData?.permanentAddress || 'Not set yet'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="layout-wrapper">
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>

            {/* Bottom Bar */}
            <div className="layout-wrapper py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-400 text-sm font-medium">
                    © {new Date().getFullYear()} Saurabh Gupta. All rights reserved.
                </p>
                <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <span>Built with</span>
                    <Heart size={12} className="text-red-500 fill-red-500" />
                    <span>and MERN Stack</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
