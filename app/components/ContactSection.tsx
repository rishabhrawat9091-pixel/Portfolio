'use client';

import React, { useState } from 'react';
import { soundFX } from './SoundEffects';
import { MailIcon, SendIcon, CheckIcon, GithubIcon, LinkedinIcon, LeetCodeIcon, PhoneIcon, BriefcaseIcon } from './Icons';
import axios from 'axios';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    soundFX.playPowerUp();
    try {
      const res = await axios.post("/api/Contact", formState)
      console.log(res);
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        soundFX.playSuccess();
      }, 1000);
    } catch (error) {
      console.log(error);
    }

  };

  const copyToClipboard = (text: string, label: string) => {
    soundFX.playPop();
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border-2 border-cyan-400 text-cyan-300 font-bold text-xs uppercase tracking-wider mb-3 shadow-pop-cyan">
            <MailIcon size={14} />
            <span>Direct Transmission</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Connect With <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-400">Rishabh Rawat</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base max-w-xl">
            Looking for a Full Stack Developer ready to build scalable web products and integrate AI workflows? Get in touch!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Column: Quick Contact Cards */}
          <div className="lg:col-span-5 space-y-6">

            {/* Quick Card: Email */}
            <div className="p-6 bg-slate-900 rounded-3xl border-2 border-cyan-400 shadow-pop-cyan">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700 text-cyan-400">
                    <MailIcon size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Direct Email</span>
                    <h4 className="text-base font-black text-white font-mono break-all">rawatrishabh76@gmail.com</h4>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard('rawatrishabh76@gmail.com', 'email')}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 rounded-xl border border-slate-600 transition-colors flex items-center gap-1 shadow-pop-sm shrink-0 ml-2"
                >
                  {copiedItem === 'email' ? (
                    <>
                      <CheckIcon size={13} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <span>Copy</span>
                  )}
                </button>
              </div>
              <p className="text-xs text-slate-400">
                Direct inbox — feel free to send job inquiries or project collaborations.
              </p>
            </div>

            {/* Quick Card: Phone & Location */}
            <div className="p-6 bg-slate-900 rounded-3xl border-2 border-purple-400 shadow-pop-purple">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700 text-purple-400">
                    <PhoneIcon size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone / WhatsApp</span>
                    <h4 className="text-base font-black text-white font-mono">+91 8630127728</h4>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard('+918630127728', 'phone')}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-purple-300 rounded-xl border border-slate-600 transition-colors flex items-center gap-1 shadow-pop-sm shrink-0 ml-2"
                >
                  {copiedItem === 'phone' ? (
                    <>
                      <CheckIcon size={13} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <span>Copy</span>
                  )}
                </button>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-300 flex items-center gap-1.5 font-bold">
                  📍 Location
                </span>
                <span className="text-xs font-mono font-bold text-cyan-300">
                  Dehradun, Uttarakhand, India
                </span>
              </div>
            </div>

            {/* Social Buttons Matrix */}
            <div className="p-6 bg-slate-900 rounded-3xl border-2 border-pink-400 shadow-pop-pink">
              <h4 className="text-sm font-black uppercase text-slate-300 tracking-wider mb-4">
                Profiles &amp; Portals
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <a
                  href="https://github.com/rishabhrawat9091-pixel"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFX.playPop()}
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded-2xl border-2 border-slate-700 hover:border-cyan-400 flex flex-col items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-all shadow-pop-sm"
                >
                  <GithubIcon size={20} />
                  <span className="text-xs font-bold">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/rishabh-rawat-2b6357219"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFX.playPop()}
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded-2xl border-2 border-slate-700 hover:border-blue-400 flex flex-col items-center gap-1.5 text-slate-300 hover:text-blue-400 transition-all shadow-pop-sm"
                >
                  <LinkedinIcon size={20} />
                  <span className="text-xs font-bold">LinkedIn</span>
                </a>
                <a
                  href="https://leetcode.com/u/dDXdYLWDRf"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFX.playPop()}
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded-2xl border-2 border-slate-700 hover:border-amber-400 flex flex-col items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-all shadow-pop-sm"
                >
                  <LeetCodeIcon size={20} />
                  <span className="text-xs font-bold">LeetCode</span>
                </a>
                <a
                  href="https://www.naukri.com/mnjuser/profile"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFX.playPop()}
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded-2xl border-2 border-slate-700 hover:border-cyan-400 flex flex-col items-center gap-1.5 text-slate-300 hover:text-cyan-300 transition-all shadow-pop-sm"
                >
                  <BriefcaseIcon size={20} />
                  <span className="text-xs font-bold">Naukri</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 2D Message Box */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl border-2 border-cyan-400 shadow-pop-cyan p-6 sm:p-8 relative">
            {isSubmitted ? (
              <div className="py-12 flex flex-col items-center text-center animate-in fade-in duration-300">
                <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-4xl mb-4 shadow-pop animate-bounce">
                  🚀
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">Message Beamed to Rishabh!</h3>
                <p className="text-slate-300 text-sm max-w-md mb-6 leading-relaxed">
                  Thanks for reaching out, <span className="text-cyan-400 font-bold">{formState.name}</span>! Your message has been routed to <span className="text-cyan-300 font-mono">rawatrishabh76@gmail.com</span>. Rishabh will get back to you shortly.
                </p>
                <button
                  onClick={() => {
                    soundFX.playPop();
                    setIsSubmitted(false);
                    setFormState({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-sm rounded-xl border border-slate-600 transition-colors shadow-pop-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <span>✉️</span> Compose Message to Rishabh
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase px-2 py-0.5 bg-cyan-950 rounded border border-cyan-400/40">
                    DEHRADUN &bull; REMOTE READY
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-300 tracking-wider mb-1.5">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hiring Manager / Collaborator"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-300 tracking-wider mb-1.5">
                      Your Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="hiring@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-slate-300 tracking-wider mb-1.5">
                    Subject / Role Title
                  </label>
                  <input
                    type="text"
                    placeholder="Full Stack / AI Developer Opportunity"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-slate-300 tracking-wider mb-1.5">
                    Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share the project details, company role, or tech stack..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-slate-950 font-black text-base rounded-2xl border-2 border-slate-950 shadow-pop-cyan hover:-translate-y-1 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Sending Message...</span>
                  ) : (
                    <>
                      <SendIcon size={18} />
                      <span>Transmit Message to Rishabh 🚀</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
