import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="py-6 border-t border-slate-800 bg-slate-950">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-500 text-sm">
                    © {new Date().getFullYear()} Saurabh Gupta. All rights reserved.
                </p>

                <p className="flex items-center gap-2 text-slate-500 text-sm">
                    Made with <Heart size={16} className="text-red-500 fill-red-500" /> using React & Tailwind
                </p>
            </div>
        </footer>
    );
};

export default Footer;
