import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, Github, Linkedin, MessageSquare } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Contact = () => {
    const { portfolioData } = usePortfolio();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const itemLeft = {
        hidden: { x: -50, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const itemRight = {
        hidden: { x: 50, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section id="contact" className="relative z-10 font-sans text-slate-300 bg-transparent py-16 md:py-28 my-10 overflow-hidden">
            <div className="w-full h-8 md:h-12 shrink-0" aria-hidden="true" />
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] -z-10 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] -z-10 animate-pulse" />
            </div>

            <div className="layout-wrapper relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid lg:grid-cols-2 gap-10 items-start"
                >
                    {/* Left Side: Contact Info & CTA */}
                    <motion.div variants={itemLeft} className="space-y-8">
                        <div>
                            <span className="inline-block py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-3 backdrop-blur-md shadow-lg">
                                Get in Touch
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4 drop-shadow-2xl leading-tight">
                                Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Collaborate</span>.
                            </h2>
                            <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed max-w-lg">
                                Have a project in mind or want to discuss full-stack opportunities? Reach out directly or connect via LinkedIn and GitHub!
                            </p>
                        </div>

                        {/* Contact Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ContactCard
                                icon={Mail}
                                title="Email Me"
                                value={portfolioData?.email || "saurabhgupta24979@gmail.com"}
                                href={`mailto:${portfolioData?.email || "saurabhgupta24979@gmail.com"}`}
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
                                icon={Linkedin}
                                title="LinkedIn"
                                value="Connect on LinkedIn"
                                href={portfolioData?.socialLinks?.linkedin || "https://linkedin.com"}
                                color="cyan"
                            />
                            <ContactCard
                                icon={Github}
                                title="GitHub"
                                value="Explore Projects"
                                href={portfolioData?.socialLinks?.github || "https://github.com"}
                                color="violet"
                            />
                        </div>
                    </motion.div>

                    {/* Right Side: Glass Contact Form with Generous Internal Padding (No Bottom Overlap!) */}
                    <motion.div variants={itemRight} className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-3xl blur-xl opacity-20 animate-tilt"></div>

                        <div className="relative bg-slate-900/50 backdrop-blur-2xl border border-white/10 p-7 sm:p-9 md:p-10 pb-12 md:pb-14 rounded-3xl shadow-2xl space-y-6 overflow-hidden">
                            <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                <MessageSquare className="text-violet-400 shrink-0" size={22} />
                                Send a Message
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-slate-400 ml-1">Your Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-slate-600 text-sm"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-slate-400 ml-1">Your Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 text-sm"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-400 ml-1">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-slate-600 text-sm"
                                        placeholder="Project Inquiry..."
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-400 ml-1">Message</label>
                                    <textarea
                                        name="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none placeholder:text-slate-600 text-sm"
                                        placeholder="Tell me about your project..."
                                    ></textarea>
                                </div>

                                <div className="pt-2">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full py-3.5 rounded-xl font-bold text-sm text-white shadow-lg flex items-center justify-center gap-2 transition-all ${loading ? 'bg-slate-700 cursor-not-allowed' :
                                            status === 'success' ? 'bg-emerald-600 hover:bg-emerald-500' :
                                                'bg-gradient-to-r from-violet-600 to-cyan-600 hover:shadow-violet-500/25'
                                            }`}
                                    >
                                        {loading ? 'Sending...' : status === 'success' ? 'Message Sent!' : (
                                            <>Send Message <Send size={18} /></>
                                        )}
                                    </motion.button>
                                </div>
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
    };

    const Wrapper = href ? 'a' : 'div';

    return (
        <Wrapper
            href={href}
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="group flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-violet-500/40 hover:bg-slate-900/90 transition-all duration-300 shadow-md backdrop-blur-md"
        >
            <div className={`p-3 rounded-xl transition-all duration-300 ${colorClasses[color]}`}>
                <Icon size={18} />
            </div>
            <div className="min-w-0 flex-1">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{title}</h4>
                <p className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">{value}</p>
            </div>
        </Wrapper>
    );
};

export default Contact;
