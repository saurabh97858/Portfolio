import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, MessageSquare } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error("Failed to send message", error);
            setStatus('error');
            alert(`Failed to send message: ${error.message}. Check console for details.`);
        } finally {
            setLoading(false);
        }
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section id="contact" className="bg-slate-950 pb-32 relative font-sans overflow-hidden">
            {/* SPACER: Minimized for tighter layout */}
            <div className="w-full h-16 md:h-20 shrink-0" aria-hidden="true" />

            {/* Background Atmosphere */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] -z-10 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] -z-10 animate-pulse" />
            </div>

            <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid lg:grid-cols-2 gap-12 items-center"
                >
                    {/* Left Side: Contact Info & CTA */}
                    <motion.div variants={itemVariants} className="space-y-10">
                        <div>
                            <span className="inline-block py-2 px-6 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md shadow-lg">
                                Get in Touch
                            </span>
                            <h2 className="text-xl md:text-3xl font-black text-white tracking-tight mb-6 drop-shadow-2xl">
                                Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Collaboration</span> Begin.
                            </h2>
                            <p className="text-slate-400 text-xl font-light leading-relaxed max-w-lg">
                                Have a project in mind or just want to explore new possibilities? I'm always open to discussing new ideas and opportunities.
                            </p>
                        </div>

                        <div className="grid gap-6">
                            <ContactCard
                                icon={Mail}
                                title="Email Me"
                                value="saurabhgupta24979@gmail.com"
                                href="mailto:saurabhgupta24979@gmail.com"
                                color="violet"
                            />
                            <ContactCard
                                icon={Phone}
                                title="Call Me"
                                value="+91 96967 43829"
                                href="tel:+919696743829"
                                color="cyan"
                            />
                            <ContactCard
                                icon={MapPin}
                                title="Location"
                                value="Gallamandi Naubasta, Kanpur Nagar"
                                color="emerald"
                            />
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-6 pt-4">
                            <SocialButton icon={Github} href="https://github.com/saurabh" />
                            <SocialButton icon={Linkedin} href="https://linkedin.com/in/saurabh" />
                            <SocialButton icon={Twitter} href="https://twitter.com/saurabh" />
                        </div>
                    </motion.div>

                    {/* Right Side: Glass Contact Form */}
                    <motion.div variants={itemVariants} className="relative">
                        {/* Glow effect behind form */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-[2.5rem] blur-xl opacity-20 animate-tilt"></div>

                        <div className="relative bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-[2rem] shadow-2xl">
                            <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                                <MessageSquare className="text-violet-400" />
                                Send a Message
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-400 ml-1">Your Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-slate-600"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-400 ml-1">Your Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400 ml-1">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-slate-600"
                                        placeholder="Project Inquiry..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400 ml-1">Message</label>
                                    <textarea
                                        name="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none placeholder:text-slate-600"
                                        placeholder="Tell me about your project..."
                                    ></textarea>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-3 transition-all ${loading ? 'bg-slate-700 cursor-not-allowed' :
                                        status === 'success' ? 'bg-emerald-600 hover:bg-emerald-500' :
                                            'bg-gradient-to-r from-violet-600 to-cyan-600 hover:shadow-violet-500/25'
                                        }`}
                                >
                                    {loading ? 'Sending...' : status === 'success' ? 'Message Sent!' : (
                                        <>Send Message <Send size={20} /></>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

const ContactCard = ({ icon: Icon, title, value, href, color }) => {
    const colorClasses = {
        violet: "text-violet-400 bg-violet-500/10 group-hover:bg-violet-500 group-hover:text-white",
        cyan: "text-cyan-400 bg-cyan-500/10 group-hover:bg-cyan-500 group-hover:text-white",
        emerald: "text-emerald-400 bg-emerald-500/10 group-hover:bg-emerald-500 group-hover:text-white"
    };

    const Wrapper = href ? 'a' : 'div';

    return (
        <Wrapper
            href={href}
            className="group flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all"
        >
            <div className={`p-4 rounded-xl transition-all duration-300 ${colorClasses[color]}`}>
                <Icon size={24} />
            </div>
            <div>
                <h4 className="text-sm font-medium text-slate-400 mb-1 uppercase tracking-wider">{title}</h4>
                <p className="text-lg md:text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">{value}</p>
            </div>
        </Wrapper>
    );
};

const SocialButton = ({ icon: Icon, href }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:-translate-y-1 transition-all duration-300"
    >
        <Icon size={24} />
    </a>
);

export default Contact;
