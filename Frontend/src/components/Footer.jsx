import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="py-8 bg-slate-950 border-t border-white/10 relative z-50">
            <div className="layout-wrapper flex flex-col md:flex-row justify-between items-center gap-4">
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
