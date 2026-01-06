import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="py-6 bg-slate-950 relative z-40">
            <div className="max-w-7xl mx-auto px-6 flex justify-center items-center">
                <p className="text-slate-600 text-xs mt-2">
                    © {new Date().getFullYear()} Saurabh Gupta. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
