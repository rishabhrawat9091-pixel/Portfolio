'use client';

import React, { useState } from 'react';
import { soundFX } from './SoundEffects';
import { SparklesIcon, ExternalLinkIcon, GithubIcon, EyeIcon } from './Icons';

export type Project = {
  id: string;
  title: string;
  category: 'ai' | 'fullstack' | 'dashboard';
  period: string;
  description: string;
  longDescription: string;
  tags: string[];
  gradient: string;
  borderColor: string;
  shadowColor: string;
  demoUrl?: string;
  githubUrl: string;
  metrics: string;
  highlights: string[];
};

export const ProjectsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'ai' | 'fullstack' | 'dashboard'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 'grook-agent',
      title: 'GrookAgent (Orbit AI)',
      category: 'ai',
      period: 'Sep 2026 – Oct 2026',
      description: 'Multi-Agent AI Platform where users create, configure, and run custom autonomous AI agents.',
      longDescription: 'Built and deployed a full platform where users can spin up custom AI agents with custom personas and goals. Designed a strictly typed data layer with Drizzle ORM and TypeScript for users, agents, and conversational histories. Integrated an Ollama model as the dedicated LLM layer to power high-quality agent responses with full authentication and sign-in flows.',
      tags: ['Next.js', 'TypeScript', 'Drizzle ORM', 'Ollama', 'Tailwind CSS', 'shadcn/ui', 'Vercel'],
      gradient: 'from-cyan-950/70 via-slate-900 to-blue-950/70',
      borderColor: 'border-cyan-400',
      shadowColor: 'shadow-pop-cyan',
      demoUrl: 'https://grook-agent.vercel.app',
      githubUrl: 'https://github.com/rishabhrawat9091-pixel',
      metrics: 'Live on Vercel • Typed Drizzle ORM • Ollama LLM',
      highlights: [
        'Built and deployed a platform where users create, configure and run custom AI agents with full sign-up and sign-in flows.',
        'Designed a typed data layer with Drizzle ORM and TypeScript for users, agents and conversations.',
        'Integrated an Ollama model as the LLM layer, powering the AI agents\' contextual responses.'
      ]
    },
    {
      id: 'velozity-solutions',
      title: 'Velozity Solutions',
      category: 'dashboard',
      period: 'Jul 2026 – Present',
      description: 'Real-Time Client Project Dashboard & Role-Based Control platform for agencies and engineering teams.',
      longDescription: 'Engineered an enterprise-grade client project workspace with granular role-based access control (Admin, Project Managers, Developers). Features real-time task progression, milestone tracking, project resource analytics, and one-click demo credentials for swift evaluation.',
      tags: ['React.js', 'Vite', 'TypeScript', 'Tailwind CSS', 'Role-Based Access (RBAC)', 'Vercel'],
      gradient: 'from-purple-950/70 via-slate-900 to-blue-950/70',
      borderColor: 'border-purple-400',
      shadowColor: 'shadow-pop-purple',
      demoUrl: 'https://vfrontend-dusky.vercel.app/',
      githubUrl: 'https://github.com/rishabhrawat9091-pixel',
      metrics: 'Live on Vercel • Role-Based RBAC • Real-Time Dashboard',
      highlights: [
        'Designed role-based access control (Admin, Project Manager, Developer) with scoped permissions and workspace management.',
        'Built real-time client project tracking, task milestone oversight, and responsive analytics widgets.',
        'Deployed live on Vercel with instant 1-click test credential login flows for seamless client demos.'
      ]
    },
    {
      id: 'grossapp',
      title: 'GrossApp E-Commerce Platform',
      category: 'fullstack',
      period: 'Aug 2026',
      description: 'Full-stack grocery e-commerce application for online product discovery, category filtering, and purchasing.',
      longDescription: 'Engineered a modern end-to-end grocery shopping application. Implemented dynamic product catalogs, instant category filtering, and optimized search for lightning-fast product discovery. Used MongoDB to persist user accounts, inventory, and order transactions, managing complex shopping cart and global application state with Redux.',
      tags: ['Next.js', 'TypeScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux'],
      gradient: 'from-emerald-950/70 via-slate-900 to-teal-950/70',
      borderColor: 'border-emerald-400',
      shadowColor: 'shadow-pop',
      demoUrl: 'https://grossapp-black.vercel.app/',
      githubUrl: 'https://github.com/rishabhrawat9091-pixel',
      metrics: 'Live on Vercel • Redux State • MongoDB Persistence',
      highlights: [
        'Built a full-stack grocery e-commerce application for online product browsing and purchasing.',
        'Implemented product listing, category filtering and search for efficient product discovery.',
        'Used MongoDB to store users, products and transaction data with Redux for scalable global state.'
      ]
    }
  ];

  const filteredProjects = activeTab === 'all'
    ? projects
    : projects.filter(p => p.category === activeTab);

  const openProject = (p: Project) => {
    soundFX.playPowerUp();
    setSelectedProject(p);
  };

  const closeProject = () => {
    soundFX.playPop();
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-20 md:py-28 relative bg-slate-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border-2 border-cyan-400 text-cyan-300 font-bold text-xs uppercase tracking-wider mb-3 shadow-pop-cyan">
            <SparklesIcon size={14} />
            <span>Featured Portfolio Projects</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Shipped &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">Deployed Works</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base max-w-xl">
            Real production-grade applications built with Next.js, TypeScript, PostgreSQL, and autonomous AI agents.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {[
            { id: 'all', label: 'All Projects (3)' },
            { id: 'ai', label: 'AI Platform (GrookAgent)' },
            { id: 'dashboard', label: 'Client Dashboard (Velozity)' },
            { id: 'fullstack', label: 'E-Commerce (GrossApp)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundFX.playPop();
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all border-2 ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-pop-cyan -translate-y-1'
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white hover:border-slate-500 shadow-pop-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`bg-gradient-to-b ${project.gradient} rounded-3xl border-2 ${project.borderColor} ${project.shadowColor} hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden group`}
            >
              {/* Card Header & Mockup Banner */}
              <div className="p-6 pb-2">
                <div className="w-full h-48 rounded-2xl bg-slate-950/90 border-2 border-slate-800 p-4 relative overflow-hidden flex flex-col justify-between group-hover:border-cyan-400/60 transition-colors">
                  {/* Mock Window Dots */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-bold">
                      {project.period}
                    </span>
                  </div>

                  {/* 2D Animated Graphic in Preview */}
                  <div className="my-auto text-center flex flex-col items-center">
                    <div className="text-5xl group-hover:scale-125 transition-transform duration-300 mb-1">
                      {project.category === 'ai' ? '🤖' : project.category === 'dashboard' ? '📊' : '🛒'}
                    </div>
                    <span className="text-xs font-mono text-cyan-300 font-bold">
                      {project.metrics}
                    </span>
                  </div>

                  {/* Subtle Grid overlay */}
                  <div className="absolute inset-0 bg-dots-pattern opacity-10 pointer-events-none"></div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 pt-3 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-slate-900/90 text-slate-300 border border-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="flex items-center gap-2 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => openProject(project)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs rounded-xl shadow-pop-sm hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
                  >
                    <EyeIcon size={14} />
                    <span>Project Details</span>
                  </button>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundFX.playPop()}
                    className="p-2.5 bg-slate-900 hover:bg-slate-800 border-2 border-slate-700 text-slate-300 hover:text-white rounded-xl shadow-pop-sm"
                    title="GitHub Repository"
                  >
                    <GithubIcon size={16} />
                  </a>

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => soundFX.playPop()}
                      className="p-2.5 bg-cyan-500/20 hover:bg-cyan-500/30 border-2 border-cyan-400 text-cyan-300 rounded-xl shadow-pop-sm flex items-center gap-1 text-xs font-bold"
                      title="Live Demo"
                    >
                      <ExternalLinkIcon size={15} />
                      <span className="hidden sm:inline">Live</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Deep-Dive Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-slate-900 rounded-3xl border-2 border-cyan-400 shadow-pop-cyan p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={closeProject}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 border-2 border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition-colors shadow-pop-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="pr-12">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                  {selectedProject.category.toUpperCase()}
                </span>
                <span className="text-xs font-mono text-slate-400">{selectedProject.period}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                {selectedProject.title}
              </h3>
            </div>

            {/* Description */}
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              {selectedProject.longDescription}
            </p>

            {/* Highlights List */}
            <div className="mt-6 p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <h4 className="text-xs font-black uppercase text-cyan-400 tracking-wider mb-2">
                Resume Points &amp; Architectural Accomplishments
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold mt-0.5">✔</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="mt-6">
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2">
                Full Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-slate-800 text-cyan-300 text-xs font-bold rounded-xl border border-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t-2 border-slate-800 flex flex-wrap gap-3">
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFX.playPop()}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl border-2 border-slate-600 shadow-pop-sm"
              >
                <GithubIcon size={18} />
                <span>GitHub Repository</span>
              </a>

              {selectedProject.demoUrl && (
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFX.playPop()}
                  className="flex items-center gap-2 px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-sm rounded-xl shadow-pop-cyan"
                >
                  <ExternalLinkIcon size={18} />
                  <span>Launch Live App</span>
                </a>
              )}

              <button
                onClick={closeProject}
                className="ml-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
