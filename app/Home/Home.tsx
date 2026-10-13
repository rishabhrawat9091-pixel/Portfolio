'use client';

import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { StatsBanner } from '../components/StatsBanner';
import { AboutSection } from '../components/AboutSection';
import { SkillsSection } from '../components/SkillsSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { MiniGame2D } from '../components/MiniGame2D';
import { ExperienceTimeline } from '../components/ExperienceTimeline';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';

export const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans selection:bg-pink-500 selection:text-white">
            {/* 2D Fixed Header */}
            <Navbar />

            {/* Main Content Sections */}
            <main>
                {/* Hero Section with Interactive 2D Mascot */}
                <Hero />

                {/* Arcade Stats Ribbon */}
                <StatsBanner />

                {/* RPG Character Sheet & Story */}
                <AboutSection />

                {/* Tech Stack & Animated Superpowers */}
                <SkillsSection />

                {/* Interactive Inventions & Projects Showcase */}
                <ProjectsSection />

                {/* 2D Arcade Mini-Game: Bug Blaster */}
                <MiniGame2D />

                {/* Progression Roadmap */}
                <ExperienceTimeline />


                <ContactSection />
            </main>

            {/* Footer & Rocket */}
            <Footer />
        </div>
    );
};