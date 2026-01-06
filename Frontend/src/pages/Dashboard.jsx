import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Database, Settings, MessageSquare, Plus, Trash2, Save, User as UserIcon, Cpu, Briefcase, Pencil, GraduationCap, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE = `${import.meta.env.VITE_API_URL}/api`;

const Dashboard = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState({ views: 0, projects: 0, messages: 0 });
    const [messages, setMessages] = useState([]);
    const [portfolioData, setPortfolioData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Fetch Initial Data
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        const user = localStorage.getItem('adminUser');

        if (!token) {
            navigate('/login');
            return;
        }
        if (user) setAdmin(JSON.parse(user));

        fetchDashboardData(token);
    }, [navigate]);

    const fetchDashboardData = async (token) => {
        setLoading(true);
        const headers = { 'Authorization': `Bearer ${token}` };

        // 1. Fetch Portfolio Data (Critical)
        try {
            console.log('Fetching Portfolio from:', `${API_BASE}/portfolio`);
            const portRes = await fetch(`${API_BASE}/portfolio`);
            if (!portRes.ok) throw new Error(`Portfolio Fetch Failed: ${portRes.status}`);
            const pf = await portRes.json();
            setPortfolioData(pf);
            setStats(prev => ({ ...prev, projects: pf?.projects?.length || 0 }));
        } catch (error) {
            console.error('Portfolio Error:', error);
            // Fallback to empty structure to prevent crashes
            setPortfolioData({ projects: [], skills: [], experience: [] });
            alert("Failed to load Portfolio Data. Server might be down.");
        }

        // 2. Fetch Messages (Non-Critical)
        try {
            const msgRes = await fetch(`${API_BASE}/messages`, { headers });
            if (msgRes.ok) {
                const msgs = await msgRes.json();
                if (Array.isArray(msgs)) {
                    setMessages(msgs);
                    setStats(prev => ({ ...prev, messages: msgs.length }));
                }
            }
        } catch (error) {
            console.warn('Messages Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/login');
    };

    const [newProjectImage, setNewProjectImage] = useState(null);

    const handleAddProject = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const newProject = {
            title: formData.get('title'),
            description: formData.get('description'),
            link: formData.get('link'),
            tags: formData.get('tags').split(',').map(t => t.trim()),
            images: newProjectImage ? [newProjectImage] : [] // Use Base64 image
        };

        const updatedProjects = [...(portfolioData.projects || []), newProject];
        await updatePortfolio({ projects: updatedProjects });
        e.target.reset();
        setNewProjectImage(null); // Reset image
    };

    const handleDeleteProject = async (index) => {
        if (!window.confirm('Delete this project?')) return;
        const updatedProjects = portfolioData.projects.filter((_, i) => i !== index);
        await updatePortfolio({ projects: updatedProjects });
    };

    const updatePortfolio = async (updates) => {
        const token = localStorage.getItem('adminToken');
        try {
            const res = await fetch(`${API_BASE}/portfolio`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updates)
            });
            const data = await res.json();
            setPortfolioData(data);
            setStats(prev => ({ ...prev, projects: data.projects?.length || 0 }));
            // Using setStats logic from previous context to keep views
            setStats(prev => ({
                ...prev,
                views: data.views || 0,
                projects: data.projects?.length || 0
            }));

            alert('Updated Successfully!');
        } catch (error) {
            alert('Update Failed');
        }
    };

    const TabButton = ({ id, icon: Icon, label }) => (
        <button
            onClick={() => { setActiveTab(id); setIsSidebarOpen(false); }}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === id
                ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
        >
            <Icon size={20} /> <span className="font-medium">{label}</span>
            {activeTab === id && <motion.div layoutId="activeTab" className="absolute left-0 w-1 h-8 bg-violet-500 rounded-r-full" />}
        </button>
    );

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans flex relative overflow-hidden">

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden animate-fade-in"
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed md:relative top-0 left-0 h-full w-64 border-r border-white/5 bg-slate-900/90 md:bg-slate-900/50 backdrop-blur-xl flex flex-col p-6 z-40 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                }`}>
                <div className="flex justify-between items-center mb-10">
                    <div className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                        Admin<span className="text-white">Panel</span>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
                    <TabButton id="overview" icon={LayoutDashboard} label="Overview" />
                    <TabButton id="messages" icon={MessageSquare} label="Messages" />
                    <TabButton id="projects" icon={Database} label="Projects" />
                    <TabButton id="skills" icon={Cpu} label="Skills" />
                    <TabButton id="experience" icon={Briefcase} label="Experience" />
                    <TabButton id="certifications" icon={GraduationCap} label="Certifications" />
                    <TabButton id="profile" icon={UserIcon} label="Profile" />

                    <div className="pt-4 mt-4 border-t border-white/5">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-cyan-400 transition-all duration-300"
                        >
                            <UserIcon size={20} /> <span className="font-medium">View Portfolio</span>
                        </button>
                    </div>
                </nav>

                <button onClick={handleLogout} className="flex items-center gap-2 text-slate-500 hover:text-red-400 transition-colors mt-auto pt-4 justify-start">
                    <LogOut size={18} /> <span className="font-medium">Logout</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen w-full relative">
                <header className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white md:hidden"
                        >
                            <Menu size={24} />
                        </button>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">Welcome, {admin?.username || 'Admin'} 👋</h1>
                            <p className="text-xs md:text-sm text-slate-400">Manage your portfolio content</p>
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/20" />
                </header>

                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
                        <span className="ml-4 text-slate-400">Loading Dashboard Data...</span>
                    </div>
                )}

                {!loading && !portfolioData && (
                    <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400">
                        Failed to load data. Please check if the Backend is running on Port 5005.
                    </div>
                )}

                {!loading && portfolioData && (
                    <AnimatePresence mode="wait">
                        {/* OVERVIEW TAB */}
                        {activeTab === 'overview' && (
                            <motion.div
                                key="overview"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                            >
                                <StatCard title="Total Views" value={stats.views.toLocaleString()} color="text-white" border="border-white/5" />
                                <StatCard title="Active Projects" value={stats.projects} color="text-violet-400" border="border-violet-500/20" />
                                <StatCard title="New Messages" value={stats.messages} color="text-cyan-400" border="border-cyan-500/20" />
                            </motion.div>
                        )}

                        {/* MESSAGES TAB */}
                        {activeTab === 'messages' && (
                            <motion.div
                                key="messages"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-xl font-bold mb-4">Inbox</h2>
                                <div className="grid gap-4">
                                    {messages.length === 0 ? (
                                        <div className="text-center p-12 text-slate-500 bg-slate-900/30 rounded-3xl border border-white/5">No messages yet.</div>
                                    ) : (
                                        messages.map(msg => (
                                            <div key={msg._id} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-bold text-lg text-violet-300">{msg.name}</h3>
                                                    <span className="text-xs text-slate-500 font-mono">{new Date(msg.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <div className="text-sm text-cyan-400 mb-1">{msg.email}</div>
                                                <div className="text-sm text-violet-400 font-bold mb-3">{msg.subject}</div>
                                                <p className="text-slate-300 leading-relaxed mb-4">{msg.message}</p>
                                                <a
                                                    href={`mailto:${msg.email}?subject=Re: ${msg.subject}&body=%0A%0A%0A> On ${new Date(msg.createdAt).toLocaleDateString()}, ${msg.name} wrote:%0A> ${msg.message}`}
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 text-violet-400 rounded-lg hover:bg-violet-500/20 hover:scale-105 transition-all text-sm font-semibold"
                                                >
                                                    <MessageSquare size={16} /> Reply via Email
                                                </a>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* PROJECTS TAB */}
                        {activeTab === 'projects' && (
                            <motion.div
                                key="projects"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <ProjectEditor
                                    portfolioData={portfolioData}
                                    updatePortfolio={updatePortfolio}
                                />
                            </motion.div>
                        )}

                        {/* SKILLS TAB */}
                        {activeTab === 'skills' && (
                            <motion.div
                                key="skills"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <SkillsEditor
                                    portfolioData={portfolioData}
                                    updatePortfolio={updatePortfolio}
                                />
                            </motion.div>
                        )}

                        {/* EXPERIENCE TAB */}
                        {activeTab === 'experience' && (
                            <motion.div
                                key="experience"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <ExperienceEditor
                                    portfolioData={portfolioData}
                                    updatePortfolio={updatePortfolio}
                                />
                            </motion.div>
                        )}

                        {/* CERTIFICATIONS TAB */}
                        {activeTab === 'certifications' && (
                            <motion.div
                                key="certifications"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <CertificationsEditor
                                    portfolioData={portfolioData}
                                    updatePortfolio={updatePortfolio}
                                />
                            </motion.div>
                        )}

                        {/* PROFILE TAB */}
                        {activeTab === 'profile' && (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="max-w-4xl"
                            >
                                <ProfileEditor
                                    portfolioData={portfolioData}
                                    updatePortfolio={updatePortfolio}
                                />
                            </motion.div>
                        )}

                    </AnimatePresence>
                )}
            </main>
        </div>
    );
};

const StatCard = ({ title, value, color, border }) => (
    <div className={`p-4 rounded-3xl bg-slate-900/50 border ${border} backdrop-blur-sm`}>
        <h3 className="text-slate-400 text-sm mb-2 uppercase tracking-wider font-semibold">{title}</h3>
        <p className={`text-4xl font-bold ${color}`}>{value}</p>
    </div>
);

// Add standard styles to index.css or use utility classes
const styles = `
    .input-field {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 12px 16px;
        border-radius: 12px;
        color: white;
        transition: all 0.2s;
        outline: none;
    }
    .input-field:focus {
        border-color: #8b5cf6;
        background: rgba(255, 255, 255, 0.08);
    }
    .label {
        display: block;
        margin-bottom: 8px;
        font-size: 0.875rem;
        color: #94a3b8;
        font-weight: 500;
    }
    .btn-primary {
        background: linear-gradient(to right, #8b5cf6, #06b6d4);
        padding: 12px 24px;
        border-radius: 12px;
        font-weight: bold;
        transition: opacity 0.2s;
    }
    .btn-primary:hover {
        opacity: 0.9;
    }
`;

export default Dashboard;

// --- Subcomponents for Cleanliness & Edit Logic ---

const ProjectEditor = ({ portfolioData, updatePortfolio }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', link: '', tags: '', description: '', images: '' });
    const [editIndex, setEditIndex] = useState(-1);

    const openModal = (project = null, idx = -1) => {
        if (project) {
            setFormData({
                title: project.title,
                link: project.link,
                tags: project.tags ? project.tags.join(', ') : '',
                description: project.description,
                images: project.images ? project.images.join(', ') : ''
            });
            setEditIndex(idx);
        } else {
            setFormData({ title: '', link: '', tags: '', description: '', images: '' });
            setEditIndex(-1);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditIndex(-1);
    };

    const handleSubmit = () => {
        if (!formData.title || !formData.description) {
            alert("Please fill in Project Title and Description.");
            return;
        }

        const newProject = {
            ...formData,
            tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
            images: formData.images.split(',').map(i => i.trim()).filter(Boolean)
        };

        let updatedProjects = [...(portfolioData.projects || [])];
        if (editIndex >= 0) {
            updatedProjects[editIndex] = newProject;
        } else {
            updatedProjects.push(newProject);
        }

        updatePortfolio({ projects: updatedProjects });
        closeModal();
    };

    const handleDelete = (idx) => {
        if (!window.confirm('Delete project?')) return;
        const updated = portfolioData.projects.filter((_, i) => i !== idx);
        updatePortfolio({ projects: updated });
    };

    return (
        <>
            <div className="mb-6">
                <h3 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    Manage Projects
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Add New Project Card */}
                <button
                    onClick={() => openModal()}
                    className="group relative flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-dashed border-white/10 hover:border-violet-500/50 hover:bg-white/5 transition-all text-slate-400 hover:text-violet-400 min-h-[250px]"
                >
                    <div className="w-16 h-16 rounded-full bg-white/5 group-hover:bg-violet-500/20 flex items-center justify-center mb-4 transition-colors">
                        <Plus size={32} />
                    </div>
                    <span className="font-bold text-lg">Add New Project</span>
                </button>

                {portfolioData?.projects?.map((project, idx) => (
                    <div key={idx} className="group relative p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-violet-500/30 transition-all hover:bg-white/10 flex flex-col">
                        <div className="absolute top-4 right-4 flex gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); openModal(project, idx); }}
                                className="p-2 rounded-full bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 hover:scale-110 transition-all"
                                title="Edit Project"
                            >
                                <Pencil size={18} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleDelete(idx); }}
                                className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:scale-110 transition-all"
                                title="Delete Project"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <h3 className="font-bold text-xl mb-2 text-white pr-16">{project.title}</h3>
                        <p className="text-sm text-slate-400 mb-4 line-clamp-3 leading-relaxed flex-1">{project.description}</p>

                        <div className="flex flex-wrap gap-2 mt-auto">
                            {project.tags?.map((tag, i) => (
                                <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-slate-900 border border-white/10 w-full max-w-2xl rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                                {editIndex >= 0 ? <Pencil className="text-cyan-400" /> : <Plus className="text-violet-400" />}
                                {editIndex >= 0 ? 'Edit Project' : 'Add New Project'}
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="label">Project Title</label>
                                    <input
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Awesome Project Name"
                                        className="input-field w-full"
                                        autoFocus
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="label">Live Link / GitHub</label>
                                        <input
                                            value={formData.link}
                                            onChange={e => setFormData({ ...formData, link: e.target.value })}
                                            placeholder="https://..."
                                            className="input-field w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="label">Tags</label>
                                        <input
                                            value={formData.tags}
                                            onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                            placeholder="React, Node, AI..."
                                            className="input-field w-full"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="label">Project Images</label>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex gap-2 overflow-x-auto pb-2">
                                            {formData.images && formData.images.split(',').map((img, i) => (
                                                <img key={i} src={img.trim()} className="h-20 w-32 object-cover rounded-lg border border-white/10" alt="Project" />
                                            ))}
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        // Append new image to existing comma-separated string
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            images: prev.images ? `${prev.images}, ${reader.result}` : reader.result
                                                        }));
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                            className="input-field w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-500/10 file:text-violet-400 hover:file:bg-violet-500/20 cursor-pointer"
                                        />
                                        <p className="text-xs text-slate-500">Upload new image to append.</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="label">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Describe your project using Markdown or plain text..."
                                        className="input-field w-full h-32 resize-none"
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={closeModal}
                                        className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:opacity-90 text-white font-bold shadow-lg shadow-violet-500/20 transition-all"
                                    >
                                        {editIndex >= 0 ? 'Save Changes' : 'Create Project'}
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={closeModal}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-slate-400 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

const SkillsEditor = ({ portfolioData, updatePortfolio }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ category: '', subtitle: '', mastery: '', items: '' });
    const [editIndex, setEditIndex] = useState(-1);

    const openModal = (skill = null, idx = -1) => {
        if (skill) {
            setFormData({
                category: skill.category,
                subtitle: skill.subtitle,
                mastery: skill.mastery,
                items: skill.items.join(', ')
            });
            setEditIndex(idx);
        } else {
            setFormData({ category: '', subtitle: '', mastery: '', items: '' });
            setEditIndex(-1);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditIndex(-1);
    };

    const handleSubmit = () => {
        if (!formData.category || !formData.items) {
            alert("Please fill in Category and Skills items.");
            return;
        }

        const newSkill = {
            ...formData,
            items: formData.items.split(',').map(s => s.trim()).filter(Boolean),
            theme: 'blue',
            color: 'from-cyan-500 to-blue-500',
            iconName: 'Code2'
        };

        let updatedSkills = [...(portfolioData.skills || [])];
        if (editIndex >= 0) {
            updatedSkills[editIndex] = { ...updatedSkills[editIndex], ...newSkill }; // Preserve theme/icons
        } else {
            updatedSkills.push(newSkill);
        }

        updatePortfolio({ skills: updatedSkills });
        closeModal();
    };

    const handleDelete = (idx) => {
        if (!window.confirm('Delete category?')) return;
        const updated = portfolioData.skills.filter((_, i) => i !== idx);
        updatePortfolio({ skills: updated });
    };

    return (
        <>
            <div className="mb-6">
                <h3 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    Manage Skills
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Add New Skill Card */}
                <button
                    onClick={() => openModal()}
                    className="group relative flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-dashed border-white/10 hover:border-violet-500/50 hover:bg-white/5 transition-all text-slate-400 hover:text-violet-400 min-h-[200px]"
                >
                    <div className="w-16 h-16 rounded-full bg-white/5 group-hover:bg-violet-500/20 flex items-center justify-center mb-4 transition-colors">
                        <Plus size={32} />
                    </div>
                    <span className="font-bold text-lg">Add New Category</span>
                </button>

                {portfolioData?.skills?.map((skill, idx) => (
                    <div key={idx} className="relative p-6 rounded-3xl bg-white/5 border border-white/5 group hover:border-violet-500/30 transition-all hover:bg-white/10 flex flex-col">
                        <div className="absolute top-4 right-4 flex gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); openModal(skill, idx); }}
                                className="p-2 rounded-full bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 hover:scale-110 transition-all"
                                title="Edit Skill"
                            >
                                <Pencil size={18} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleDelete(idx); }}
                                className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:scale-110 transition-all"
                                title="Delete Skill"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <h3 className="font-bold text-lg text-white mb-1">{skill.category}</h3>
                        <p className="text-xs text-slate-400 mb-4">{skill.subtitle}</p>

                        <div className="flex flex-wrap gap-2 mt-auto">
                            {skill.items?.map((item, i) => (
                                <span key={i} className="text-xs px-2 py-1 rounded bg-white/10 text-slate-300 border border-white/5">{item}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-slate-900 border border-white/10 w-full max-w-xl rounded-3xl p-8 shadow-2xl"
                        >
                            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                                {editIndex >= 0 ? <Pencil className="text-cyan-400" /> : <Plus className="text-violet-400" />}
                                {editIndex >= 0 ? 'Edit Skill Category' : 'Add New Category'}
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="label">Category Name</label>
                                    <input
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        placeholder="Frontend Development"
                                        className="input-field w-full"
                                        autoFocus
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="label">Subtitle</label>
                                        <input
                                            value={formData.subtitle}
                                            onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                                            placeholder="Building UIs"
                                            className="input-field w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="label">Mastery (%)</label>
                                        <input
                                            type="number"
                                            value={formData.mastery}
                                            onChange={e => setFormData({ ...formData, mastery: e.target.value })}
                                            placeholder="90"
                                            className="input-field w-full"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="label">Skills (comma separated)</label>
                                    <textarea
                                        value={formData.items}
                                        onChange={e => setFormData({ ...formData, items: e.target.value })}
                                        placeholder="React, Next.js, Tailwind..."
                                        className="input-field w-full min-h-[100px] resize-y py-3 leading-relaxed"
                                    />
                                    <p className="text-xs text-slate-500 mt-2">Separate multiple skills with commas.</p>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={closeModal}
                                        className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:opacity-90 text-white font-bold shadow-lg shadow-violet-500/20 transition-all"
                                    >
                                        {editIndex >= 0 ? 'Save Changes' : 'Add Category'}
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={closeModal}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-slate-400 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

const ExperienceEditor = ({ portfolioData, updatePortfolio }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ role: '', company: '', duration: '', tech: '', description: '' });
    const [editIndex, setEditIndex] = useState(-1);

    const openModal = (exp = null, idx = -1) => {
        if (exp) {
            setFormData({
                role: exp.role,
                company: exp.company,
                duration: exp.duration,
                tech: exp.tech ? exp.tech.join(', ') : '',
                description: exp.description
            });
            setEditIndex(idx);
        } else {
            setFormData({ role: '', company: '', duration: '', tech: '', description: '' });
            setEditIndex(-1);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditIndex(-1);
    };

    const handleSubmit = () => {
        if (!formData.role || !formData.company) {
            alert("Please fill in Role and Company.");
            return;
        }

        const newExp = {
            ...formData,
            tech: formData.tech.split(',').map(s => s.trim()).filter(Boolean)
        };

        let updatedExp = [...(portfolioData.experience || [])];
        if (editIndex >= 0) {
            updatedExp[editIndex] = newExp;
        } else {
            updatedExp.push(newExp);
        }

        updatePortfolio({ experience: updatedExp });
        closeModal();
    };

    const handleDelete = (idx) => {
        if (!window.confirm('Delete experience?')) return;
        const updated = portfolioData.experience.filter((_, i) => i !== idx);
        updatePortfolio({ experience: updated });
    };

    return (
        <>
            <div className="mb-6">
                <h3 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    Manage Experience
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Add New Experience Card */}
                <button
                    onClick={() => openModal()}
                    className="group relative flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-dashed border-white/10 hover:border-violet-500/50 hover:bg-white/5 transition-all text-slate-400 hover:text-violet-400 min-h-[200px]"
                >
                    <div className="w-16 h-16 rounded-full bg-white/5 group-hover:bg-violet-500/20 flex items-center justify-center mb-4 transition-colors">
                        <Plus size={32} />
                    </div>
                    <span className="font-bold text-lg">Add New Experience</span>
                </button>

                {portfolioData?.experience?.map((exp, idx) => (
                    <div key={idx} className="relative p-6 rounded-3xl bg-white/5 border border-white/5 flex flex-col group hover:border-violet-500/30 transition-all hover:bg-white/10">
                        <div className="absolute top-4 right-4 flex gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); openModal(exp, idx); }}
                                className="p-2 rounded-full bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 hover:scale-110 transition-all"
                                title="Edit Experience"
                            >
                                <Pencil size={18} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleDelete(idx); }}
                                className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:scale-110 transition-all"
                                title="Delete Experience"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <div className="flex-1 pr-16">
                            <h3 className="font-bold text-lg text-white">{exp.role}</h3>
                            <p className="text-violet-400 font-medium">{exp.company}</p>
                            <p className="text-xs text-slate-500 mb-2">{exp.duration}</p>
                            <p className="text-sm text-slate-300 leading-relaxed mb-4">{exp.description}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-auto">
                            {exp.tech?.map((t, i) => (
                                <span key={i} className="text-xs px-2 py-1 rounded bg-white/10 text-slate-400 font-mono">{t}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-slate-900 border border-white/10 w-full max-w-2xl rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                                {editIndex >= 0 ? <Pencil className="text-cyan-400" /> : <Plus className="text-violet-400" />}
                                {editIndex >= 0 ? 'Edit Experience' : 'Add New Experience'}
                            </h2>

                            <div className="space-y-5">
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="label">Role / Job Title</label>
                                        <input
                                            value={formData.role}
                                            onChange={e => setFormData({ ...formData, role: e.target.value })}
                                            placeholder="Senior Full Stack Dev"
                                            className="input-field w-full"
                                            autoFocus
                                        />
                                    </div>
                                    <div>
                                        <label className="label">Company Name</label>
                                        <input
                                            value={formData.company}
                                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                                            placeholder="Google"
                                            className="input-field w-full"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="label">Duration</label>
                                        <input
                                            value={formData.duration}
                                            onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                            placeholder="Jan 2023 - Present"
                                            className="input-field w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="label">Tech Stack</label>
                                        <input
                                            value={formData.tech}
                                            onChange={e => setFormData({ ...formData, tech: e.target.value })}
                                            placeholder="React, Node, AWS..."
                                            className="input-field w-full"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="label">Description / Responsibilities</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Describe your role and achievements..."
                                        className="input-field w-full h-32 resize-none"
                                        required
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={closeModal}
                                        className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:opacity-90 text-white font-bold shadow-lg shadow-violet-500/20 transition-all"
                                    >
                                        {editIndex >= 0 ? 'Save Changes' : 'Add Experience'}
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={closeModal}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-slate-400 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

const ProfileEditor = ({ portfolioData, updatePortfolio }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '', role: '', about: '', email: '', phone: '',
        github: '', linkedin: '', instagram: '', profileImage: '',
        education: []
    });

    useEffect(() => {
        if (portfolioData) {
            setFormData({
                name: portfolioData.name || '',
                role: portfolioData.role || '',
                about: portfolioData.about || '',
                email: portfolioData.email || '',
                phone: portfolioData.phone || '',
                github: portfolioData.socialLinks?.github || '',
                linkedin: portfolioData.socialLinks?.linkedin || '',
                instagram: portfolioData.socialLinks?.instagram || '',
                profileImage: portfolioData.profileImage || '',
                heroImage: portfolioData.heroImage || '',
                education: portfolioData.education || []
            });
        }
    }, [portfolioData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddEducation = () => {
        setFormData({
            ...formData,
            education: [...formData.education, { degree: '', institution: '', year: '' }]
        });
    };

    const handleEducationChange = (index, field, value) => {
        const newEducation = [...formData.education];
        newEducation[index][field] = value;
        setFormData({ ...formData, education: newEducation });
    };

    const handleDeleteEducation = (index) => {
        const newEducation = formData.education.filter((_, i) => i !== index);
        setFormData({ ...formData, education: newEducation });
    };

    const handleSubmit = () => {
        const updates = {
            name: formData.name,
            role: formData.role,
            about: formData.about,
            email: formData.email,
            phone: formData.phone,
            profileImage: formData.profileImage,
            socialLinks: {
                github: formData.github,
                linkedin: formData.linkedin,
                instagram: formData.instagram
            },
            education: formData.education
        };
        updatePortfolio(updates);
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="mb-6">
                <h3 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    Your Profile
                </h3>
            </div>

            {/* Profile Card */}
            <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 relative group hover:border-violet-500/30 transition-all">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="absolute top-6 right-6 p-2 rounded-full bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 hover:scale-110 transition-all"
                    title="Edit Profile"
                >
                    <Pencil size={20} />
                </button>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="relative group/img">
                        {formData.profileImage ? (
                            <img
                                src={formData.profileImage}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover shadow-lg shadow-violet-500/20 border-2 border-white/10"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-violet-500/20">
                                {formData.name.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div className="flex-1 space-y-4">
                        <div>
                            <h2 className="text-2xl font-bold text-white">{formData.name || 'Your Name'}</h2>
                            <p className="text-violet-400 text-lg">{formData.role || 'Full Stack Developer'}</p>
                        </div>

                        <p className="text-slate-300 leading-relaxed max-w-3xl">
                            {formData.about || 'Add a short bio about yourself...'}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                            {formData.email && (
                                <span className="flex items-center gap-2 text-sm text-slate-400 bg-white/5 px-3 py-1.5 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                    {formData.email}
                                </span>
                            )}
                            {formData.phone && (
                                <span className="flex items-center gap-2 text-sm text-slate-400 bg-white/5 px-3 py-1.5 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                    {formData.phone}
                                </span>
                            )}
                        </div>

                        {formData.education.length > 0 && (
                            <div className="pt-4 border-t border-white/5 mt-4">
                                <h4 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Education</h4>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {formData.education.map((edu, idx) => (
                                        <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/5">
                                            <h5 className="font-bold text-white">{edu.degree}</h5>
                                            <p className="text-cyan-400 text-sm">{edu.institution}</p>
                                            <span className="text-xs text-slate-500 mt-1 block">{edu.year}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-slate-900 border border-white/10 w-full max-w-4xl rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                                <Settings className="text-cyan-400" /> Edit Profile
                            </h2>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-5">
                                    <h3 className="font-semibold text-violet-400 border-b border-white/5 pb-2">Personal Info</h3>
                                    <div>
                                        <label className="label">Full Name</label>
                                        <input name="name" value={formData.name} onChange={handleChange} className="input-field w-full" />
                                    </div>
                                    <div>
                                        <label className="label">Profile Image</label>
                                        <div className="flex flex-col gap-3">
                                            {formData.profileImage && (
                                                <div className="w-full flex justify-center bg-black/20 p-2 rounded-xl border border-white/5">
                                                    <img src={formData.profileImage} alt="Profile Preview" className="h-24 w-24 rounded-full object-cover border-2 border-cyan-400/50" />
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setFormData(prev => ({ ...prev, profileImage: reader.result }));
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                                className="input-field w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-500/10 file:text-violet-400 hover:file:bg-violet-500/20 cursor-pointer"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="label">Hero Image (Home Page)</label>
                                        <div className="flex flex-col gap-3">
                                            {formData.heroImage && (
                                                <div className="w-full flex justify-center bg-black/20 p-2 rounded-xl border border-white/5">
                                                    <img src={formData.heroImage} alt="Hero Preview" className="h-24 w-auto object-cover rounded-lg border-2 border-pink-400/50" />
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setFormData(prev => ({ ...prev, heroImage: reader.result }));
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                                className="input-field w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-500/10 file:text-pink-400 hover:file:bg-pink-500/20 cursor-pointer"
                                            />
                                            <p className="text-xs text-slate-500">Recommended: High quality portrait/square image.</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label">Role / Title</label>
                                        <input name="role" value={formData.role} onChange={handleChange} className="input-field w-full" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="label">Email</label>
                                            <input name="email" value={formData.email} onChange={handleChange} className="input-field w-full" />
                                        </div>
                                        <div>
                                            <label className="label">Phone</label>
                                            <input name="phone" value={formData.phone} onChange={handleChange} className="input-field w-full" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label">About Bio</label>
                                        <textarea name="about" value={formData.about} onChange={handleChange} className="input-field w-full h-32 resize-none" />
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-cyan-400 border-b border-white/5 pb-2">Social Links</h3>
                                        <div>
                                            <label className="label">GitHub URL</label>
                                            <input name="github" value={formData.github} onChange={handleChange} className="input-field w-full" placeholder="https://github.com/..." />
                                        </div>
                                        <div>
                                            <label className="label">LinkedIn URL</label>
                                            <input name="linkedin" value={formData.linkedin} onChange={handleChange} className="input-field w-full" placeholder="https://linkedin.com/in/..." />
                                        </div>
                                        <div>
                                            <label className="label">Instagram URL</label>
                                            <input name="instagram" value={formData.instagram} onChange={handleChange} className="input-field w-full" placeholder="https://instagram.com/..." />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                            <h3 className="font-semibold text-pink-400">Education</h3>
                                            <button type="button" onClick={handleAddEducation} className="text-xs px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-1">
                                                <Plus size={14} /> Add
                                            </button>
                                        </div>

                                        <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                                            {formData.education.map((edu, index) => (
                                                <div key={index} className="grid grid-cols-1 gap-2 bg-white/5 p-3 rounded-xl relative group">
                                                    <input
                                                        value={edu.degree}
                                                        onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                                        className="input-field w-full text-sm"
                                                        placeholder="Degree"
                                                    />
                                                    <input
                                                        value={edu.institution}
                                                        onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                                                        className="input-field w-full text-sm"
                                                        placeholder="Institution"
                                                    />
                                                    <div className="flex gap-2">
                                                        <input
                                                            value={edu.year}
                                                            onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                                                            className="input-field w-full text-sm"
                                                            placeholder="Year"
                                                        />
                                                        <button
                                                            onClick={() => handleDeleteEducation(index)}
                                                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-6 mt-6 border-t border-white/10">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:opacity-90 text-white font-bold shadow-lg shadow-violet-500/20 transition-all"
                                >
                                    Save Profile Changes
                                </button>
                            </div>

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-slate-400 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

const CertificationsEditor = ({ portfolioData, updatePortfolio }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);
    const [formData, setFormData] = useState({
        title: '', issuer: '', date: '', link: '', image: ''
    });

    const openModal = (cert = null, index = -1) => {
        if (cert) {
            setFormData(cert);
            setEditIndex(index);
        } else {
            setFormData({ title: '', issuer: '', date: '', link: '', image: '' });
            setEditIndex(-1);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = () => {
        let updatedCerts = [...(portfolioData.certifications || [])];
        if (editIndex >= 0) {
            updatedCerts[editIndex] = formData;
        } else {
            updatedCerts.push(formData);
        }

        updatePortfolio({ certifications: updatedCerts });
        closeModal();
    };

    const handleDelete = (idx) => {
        if (!window.confirm('Delete certification?')) return;
        const updated = portfolioData.certifications.filter((_, i) => i !== idx);
        updatePortfolio({ certifications: updated });
    };

    return (
        <>
            <div className="mb-6">
                <h3 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    Manage Certifications
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <button
                    onClick={() => openModal()}
                    className="group flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-dashed border-white/10 hover:border-amber-500/50 hover:bg-white/5 transition-all text-slate-400 hover:text-amber-400 min-h-[200px]"
                >
                    <div className="w-16 h-16 rounded-full bg-white/5 group-hover:bg-amber-500/20 flex items-center justify-center mb-4 transition-colors">
                        <Plus size={32} />
                    </div>
                    <span className="font-bold text-lg">Add New Certification</span>
                </button>

                {portfolioData?.certifications?.map((cert, idx) => (
                    <div key={idx} className="relative p-6 rounded-3xl bg-white/5 border border-white/5 flex flex-col group hover:border-amber-500/30 transition-all hover:bg-white/10">
                        <div className="absolute top-4 right-4 flex gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); openModal(cert, idx); }}
                                className="p-2 rounded-full bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-all"
                            >
                                <Pencil size={18} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleDelete(idx); }}
                                className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <div className="mb-4">
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 mb-3">
                                <GraduationCap size={24} className="text-amber-400" />
                            </div>
                            <h3 className="font-bold text-lg text-white line-clamp-2">{cert.title}</h3>
                            <p className="text-amber-400 font-medium text-sm">{cert.issuer}</p>
                            <p className="text-xs text-slate-500 mt-1">{cert.date}</p>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && createPortal(
                <AnimatePresence>
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-slate-900 border border-white/10 w-full max-w-2xl rounded-3xl p-8 shadow-2xl"
                        >
                            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                                {editIndex >= 0 ? <Pencil className="text-cyan-400" /> : <Plus className="text-amber-400" />}
                                {editIndex >= 0 ? 'Edit Certification' : 'Add Certification'}
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="label">Certification Title</label>
                                    <input
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="AWS Certified Solutions Architect"
                                        className="input-field w-full"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="label">Issuer</label>
                                        <input
                                            value={formData.issuer}
                                            onChange={e => setFormData({ ...formData, issuer: e.target.value })}
                                            placeholder="Amazon Web Services"
                                            className="input-field w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="label">Date / Year</label>
                                        <input
                                            value={formData.date}
                                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                                            placeholder="2024"
                                            className="input-field w-full"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="label">Link URL</label>
                                    <input
                                        value={formData.link}
                                        onChange={e => setFormData({ ...formData, link: e.target.value })}
                                        placeholder="https://..."
                                        className="input-field w-full"
                                    />
                                </div>
                                <div>
                                    <label className="label">Image / Logo</label>
                                    <div className="flex flex-col gap-3">
                                        {formData.image && (
                                            <div className="w-full flex justify-center bg-black/20 p-2 rounded-xl border border-white/5">
                                                <img src={formData.image} alt="Cert Preview" className="h-24 object-contain" />
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setFormData(prev => ({ ...prev, image: reader.result }));
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                            className="input-field w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-500/10 file:text-amber-400 hover:file:bg-amber-500/20 cursor-pointer"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button onClick={closeModal} className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 font-medium">Cancel</button>
                                    <button onClick={handleSubmit} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold hover:opacity-90">
                                        {editIndex >= 0 ? 'Save Changes' : 'Add Certification'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};


