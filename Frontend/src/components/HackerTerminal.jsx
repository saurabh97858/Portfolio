import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Minus, Square, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';

const HackerTerminal = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([
        { type: 'system', content: 'INITIALIZING SG-OS KERNEL...' },
        { type: 'system', content: 'LOADING MODULES... [OK]' },
        { type: 'welcome', content: 'Welcome to Saurabh\'s Portfolio Terminal v2.0' },
        { type: 'info', content: 'Type "help" to see available commands.' }
    ]);
    const inputRef = useRef(null);
    const bottomRef = useRef(null);

    const commands = {
        help: "Available commands: \n  • about    - Who am I? \n  • skills   - My technical arsenal \n  • projects - View my work \n  • contact  - Get in touch \n  • clear    - Clean terminal \n  • sudo     - Admin privileges?",
        about: "I am Saurabh Gupta, a Full Stack Developer passionate about building scalable, secure, and aesthetic web applications. I turn coffee into code.",
        skills: ">> FRONTEND MODULE: \n   React, Next.js, TailwindCSS, Framer Motion, Redux \n\n>> BACKEND MODULE: \n   Node.js, Express, MongoDB, PostgreSQL \n\n>> DEVOPS & TOOLS: \n   Docker, Git, AWS, Linux, CI/CD",
        projects: "Scanning project directory... \n\n[1] Portfolio (Current) - React & Framer Motion \n[2] E-commerce Platform - MERN Stack \n[3] Task Manager API - Node.js Microservices",
        contact: ">> CONNECT WITH ME: \n   Email: saurabhgupta24979@gmail.com \n   GitHub: github.com/saurabh97858 \n   LinkedIn: linkedin.com/in/saurabh-gupta-69a499265",
        whoami: "root@saurabh-portfolio:~",
        sudo: "ACCESS DENIED: You are visitor, not admin. Take a cookie instead! 🍪",
        clear: "CLEAR_ACTION"
    };

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            let response = `Command not found: "${cmd}". Type "help" for list.`;

            if (cmd === '') {
                response = '';
            } else if (commands[cmd]) {
                response = commands[cmd];
            }

            if (response === "CLEAR_ACTION") {
                setOutput([
                    { type: 'welcome', content: 'Terminal cleared.' },
                    { type: 'info', content: 'Type "help" to start again.' }
                ]);
            } else {
                setOutput([...output, { type: 'user', content: `visitor@saurabh:~$ ${input}` }, { type: 'response', content: response }]);
            }

            setInput('');
        }
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [output]);

    return (
        <section className="py-24 px-4 flex justify-center items-center bg-slate-950 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-4xl bg-[#0a0a0f]/90 backdrop-blur-xl rounded-xl overflow-hidden shadow-2xl border border-slate-700/50 shadow-violet-900/20 relative z-10 box-border"
                onClick={() => inputRef.current?.focus()}
            >
                {/* Terminal Header */}
                <div className="bg-[#15151a] px-5 py-3 flex items-center justify-between border-b border-slate-800/80 handle">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-2 mr-4 group">
                            <div className="w-3 h-3 rounded-full bg-red-500/80 group-hover:bg-red-500 transition-colors shadow-sm" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80 group-hover:bg-yellow-500 transition-colors shadow-sm" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80 group-hover:bg-green-500 transition-colors shadow-sm" />
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 font-mono text-xs select-none">
                            <TerminalIcon size={12} className="text-violet-500" />
                            <span>saurabh@dev-portfolio: ~</span>
                        </div>
                    </div>
                    <div className="text-slate-600 flex gap-2">
                        <div className="text-[10px] bg-slate-800/50 px-2 py-0.5 rounded border border-slate-700/50 hidden md:block">bash</div>
                    </div>
                </div>

                {/* Terminal Body */}
                <div className="p-6 h-[500px] overflow-y-auto custom-scrollbar font-mono text-sm md:text-base relative bg-black/50">
                    {/* Scanline Effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[5] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />

                    <div className="relative z-10">
                        {output.map((line, index) => (
                            <div key={index} className="mb-3 leading-relaxed break-words">
                                {line.type === 'user' ? (
                                    <span className="text-emerald-400 font-bold">{line.content}</span>
                                ) : line.type === 'system' ? (
                                    <span className="text-slate-500/80 text-xs uppercase tracking-wider">{line.content}</span>
                                ) : line.type === 'welcome' ? (
                                    <span className="text-violet-400 font-bold text-lg block mb-2 border-b border-violet-500/30 pb-1">{line.content}</span>
                                ) : line.type === 'info' ? (
                                    <span className="text-cyan-400">{line.content}</span>
                                ) : (
                                    <span className="text-slate-300 whitespace-pre-wrap">{line.content}</span>
                                )}
                            </div>
                        ))}

                        <div className="flex items-center gap-2 mt-4 text-emerald-400">
                            <span className="font-bold shrink-0">visitor@saurabh:~$</span>
                            <div className="relative w-full">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleCommand}
                                    className="bg-transparent border-none outline-none text-slate-100 w-full font-bold relative z-20"
                                    autoFocus
                                    spellCheck="false"
                                    autoComplete="off"
                                />
                                {input === '' && (
                                    <motion.span
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                        className="inline-block w-2.5 h-5 bg-slate-100 absolute left-0 top-0.5"
                                    />
                                )}
                            </div>
                        </div>
                        <div ref={bottomRef} />
                    </div>
                </div>
            </motion.div>
        </section>
    );
};
export default HackerTerminal;
