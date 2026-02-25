import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Cover images
import craveCoCover from '../assets/mobilePresentation/CraveCo.jpg';
import luminaraCover from '../assets/mobilePresentation/Luminara.jpg';
import posCover from '../assets/mobilePresentation/POS.jpeg';
import pawsCover from '../assets/mobilePresentation/Paws & Relax.jpg';
import taranaCover from '../assets/mobilePresentation/TaraNa.jpg';

// CraveCo gallery
import craveCoE1 from '../assets/mobilePresentation/CraveCoEach/Simulator Screenshot - iPhone 16 Pro - 2026-02-22 at 17.22.55.png';
import craveCoE2 from '../assets/mobilePresentation/CraveCoEach/Simulator Screenshot - iPhone 16 Pro - 2026-02-22 at 20.39.33.png';
import craveCoE3 from '../assets/mobilePresentation/CraveCoEach/Simulator Screenshot - iPhone 16 Pro - 2026-02-22 at 20.39.42.png';
import craveCoE4 from '../assets/mobilePresentation/CraveCoEach/Simulator Screenshot - iPhone 16 Pro - 2026-02-22 at 20.40.06.png';

// Luminara gallery
import luminaraE1 from '../assets/mobilePresentation/LuminaraEach/photo1.png';
import luminaraE2 from '../assets/mobilePresentation/LuminaraEach/photo5.png';
import luminaraE3 from '../assets/mobilePresentation/LuminaraEach/photo6.png';

// POS gallery
import posE1 from '../assets/mobilePresentation/POSEach/412768ff-0f03-4e86-b0d0-848b29a0c1e8.jpeg';
import posE2 from '../assets/mobilePresentation/POSEach/Simulator Screenshot - iPad Air 11-inch (M2) - 2026-02-24 at 14.52.36.png';
import posE3 from '../assets/mobilePresentation/POSEach/Simulator Screenshot - iPad Air 11-inch (M2) - 2026-02-24 at 14.53.50.png';

// Paws & Relax gallery
import pawsE1 from '../assets/mobilePresentation/Paws&RelaxEach/Simulator Screenshot - iPhone 16 Pro - 2026-02-24 at 02.29.06.png';
import pawsE2 from '../assets/mobilePresentation/Paws&RelaxEach/Simulator Screenshot - iPhone 16 Pro - 2026-02-24 at 14.43.25.png';
import pawsE3 from '../assets/mobilePresentation/Paws&RelaxEach/Simulator Screenshot - iPhone 16 Pro - 2026-02-24 at 14.46.56.png';

// TaraNa gallery
import taranaE1 from '../assets/mobilePresentation/TaraNaEach/Simulator Screenshot - iPhone 16 Pro - 2026-02-24 at 01.57.32.png';
import taranaE2 from '../assets/mobilePresentation/TaraNaEach/Simulator Screenshot - iPhone 16 Pro - 2026-02-24 at 14.37.11.png';
import taranaE3 from '../assets/mobilePresentation/TaraNaEach/Simulator Screenshot - iPhone 16 Pro - 2026-02-24 at 14.37.26.png';

// Website screenshots
import carveStackImg from '../assets/Website/CarveStack.png';
import islandGuideImg from '../assets/Website/Island Guide.png';
import mathCodeImg from '../assets/Website/MathCode.png';
import renderLabsImg from '../assets/Website/RenderLabs.png';
import sauceeyImg from '../assets/Website/Sauceey.png';

const projects = [
    {
        title: 'CraveCo',
        category: 'Food Delivery App',
        desc: 'A food delivery and discovery mobile app offering seamless ordering experiences.',
        cover: craveCoCover,
        gallery: [craveCoE1, craveCoE2, craveCoE3, craveCoE4],
    },
    {
        title: 'Paws & Relax',
        category: 'Mobile Service App',
        desc: 'A pet care booking app connecting pet owners with trusted sitters and groomers.',
        cover: pawsCover,
        gallery: [pawsE2, pawsE1, pawsE3],
    },
    {
        title: 'TaraNa',
        category: 'Taxi Booking App',
        desc: 'A modern ride-hailing app with real-time tracking and seamless driver matching.',
        cover: taranaCover,
        gallery: [taranaE3, taranaE1, taranaE2],
    },
    {
        title: 'Luminara',
        category: 'Health App',
        desc: 'A wellness and health-tracking app helping users monitor their daily routines.',
        cover: luminaraCover,
        gallery: [luminaraE1, luminaraE2, luminaraE3],
    },
    {
        title: 'Leos POS',
        category: 'Point of Sale App',
        desc: 'A powerful point-of-sale system for cafes and restaurants with inventory tracking.',
        cover: posCover,
        gallery: [posE2, posE1, posE3],
        widescreen: true,
    },
];

const webProjects = [
    {
        title: 'CarveStack',
        category: 'Custom Web Solution',
        desc: 'A platform to turn features into build-ready software with structured workflows.',
        cover: carveStackImg,
        url: 'https://carvestack.netlify.app/',
    },
    {
        title: 'Island Guide',
        category: 'Travel Web App',
        desc: 'Discover hidden gems of the islands with curated travel guides and itineraries.',
        cover: islandGuideImg,
        url: 'https://islandguide.netlify.app/',
    },
    {
        title: 'MathCode',
        category: 'Educational Web App',
        desc: 'Singapore Math supercharged by code — interactive learning for students.',
        cover: mathCodeImg,
        url: 'https://mathcode.web.app/',
    },
    {
        title: 'RenderLabs',
        category: 'AI SaaS Web App',
        desc: 'Start a new creation with AI-powered rendering and design tools.',
        cover: renderLabsImg,
        url: 'https://renderlabs.netlify.app/',
    },
    {
        title: 'Sauceey',
        category: 'Business Web App',
        desc: 'A bold commerce platform — feel the burn with our hot sauce marketplace.',
        cover: sauceeyImg,
        url: 'https://saucebusiness.netlify.app/',
    },
];

/* ── Flip Card ── */
const FlipCard = ({ project, isFlipped, onFlip, onClose, onViewProject }) => {

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative"
            style={{ perspective: 1200 }}
        >
            <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.55, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d', position: 'relative' }}
                className="rounded-2xl shadow-md"
            >
                {/* FRONT */}
                <div
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                    className="rounded-2xl overflow-hidden cursor-pointer"
                    onClick={onFlip}
                >
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <img
                            src={project.cover}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                            <p className="text-xs uppercase tracking-widest text-[#FFB000] font-bold mb-1">{project.category}</p>
                            <h3 className="text-xl font-bold font-serif text-white">{project.title}</h3>
                        </div>
                        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                            Tap to flip
                        </div>
                    </div>
                </div>

                {/* BACK */}
                <div
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        position: 'absolute',
                        inset: 0,
                    }}
                    className="rounded-2xl bg-white border border-gray-100 flex flex-col items-center justify-center p-6 text-center gap-4 shadow-md"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors border-none cursor-pointer text-lg leading-none"
                    >
                        ✕
                    </button>

                    <h3 className="text-xl font-bold font-serif text-gray-900">{project.title}</h3>
                    <div className="w-10 h-0.5 bg-gray-200 rounded-full" />
                    <p className="text-gray-500 text-sm leading-relaxed">{project.desc}</p>
                    <button
                        onClick={() => onViewProject(project)}
                        className="mt-2 bg-gray-900 text-white text-sm font-semibold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#FFB000] hover:text-gray-900 transition-colors cursor-pointer border-none"
                    >
                        View Project
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

/* ── Web Flip Card (16:9 with Visit Site + View Project) ── */
const WebFlipCard = ({ project, isFlipped, onFlip, onClose, onViewProject }) => {

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative"
            style={{ perspective: 1200 }}
        >
            <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.55, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d', position: 'relative' }}
                className="rounded-2xl shadow-md"
            >
                {/* FRONT */}
                <div
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                    className="rounded-2xl overflow-hidden cursor-pointer"
                    onClick={onFlip}
                >
                    <div className="relative w-full aspect-video overflow-hidden">
                        <img
                            src={project.cover}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                            <p className="text-xs uppercase tracking-widest text-[#FFB000] font-bold mb-1">{project.category}</p>
                            <h3 className="text-lg font-bold font-serif text-white">{project.title}</h3>
                        </div>
                        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                            Tap to flip
                        </div>
                    </div>
                </div>

                {/* BACK */}
                <div
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        position: 'absolute',
                        inset: 0,
                    }}
                    className="rounded-2xl bg-white border border-gray-100 flex flex-col items-center justify-center p-6 text-center gap-3 shadow-md"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors border-none cursor-pointer text-lg leading-none"
                    >
                        ✕
                    </button>

                    <h3 className="text-xl font-bold font-serif text-gray-900">{project.title}</h3>
                    <div className="w-10 h-0.5 bg-gray-200 rounded-full" />
                    <p className="text-gray-500 text-sm leading-relaxed">{project.desc}</p>
                    <div className="flex gap-3 mt-2">
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#FFB000] text-gray-900 text-sm font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-[#FFD54F] transition-colors no-underline"
                        >
                            Visit Site
                        </a>
                        <button
                            onClick={() => onViewProject(project)}
                            className="bg-gray-900 text-white text-sm font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-gray-700 transition-colors cursor-pointer border-none"
                        >
                            View Project
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

/* ── Web Image Modal ── */
const WebImageModal = ({ project, onClose }) => {
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

    if (!project) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.92, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-[#1e2435] rounded-2xl max-w-3xl w-full p-6"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-white font-bold text-lg">{project.title}</h3>
                            <p className="text-[#FFB000] text-xs uppercase tracking-widest">{project.category}</p>
                        </div>
                        <button onClick={onClose} className="text-white/60 hover:text-white text-2xl leading-none bg-transparent border-none cursor-pointer">✕</button>
                    </div>

                    <div className="rounded-xl overflow-hidden bg-black shadow-2xl" style={{ aspectRatio: '16/9' }}>
                        <img
                            src={project.cover}
                            alt={project.title}
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <div className="flex justify-center mt-5">
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#FFB000] text-gray-900 text-sm font-semibold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#FFD54F] transition-colors no-underline"
                        >
                            Visit Site
                        </a>
                    </div>

                    <p className="text-center text-white/40 text-xs mt-3">
                        Premium digital solutions crafted for excellence.
                    </p>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

/* ── Gallery Modal ── */
const GalleryModal = ({ project, onClose }) => {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

    if (!project) return null;

    const prev = (e) => { e.stopPropagation(); setIdx(i => (i - 1 + project.gallery.length) % project.gallery.length); };
    const next = (e) => { e.stopPropagation(); setIdx(i => (i + 1) % project.gallery.length); };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.92, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-[#1e2435] rounded-2xl max-w-2xl w-full p-6"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-white font-bold text-lg">{project.title}</h3>
                            <p className="text-[#FFB000] text-xs uppercase tracking-widest">{project.category}</p>
                        </div>
                        <button onClick={onClose} className="text-white/60 hover:text-white text-2xl leading-none bg-transparent border-none cursor-pointer">✕</button>
                    </div>

                    {/* Image frame: 16:9 for widescreen projects, phone for mobile */}
                    <div className="flex items-center justify-center gap-4">
                        <button onClick={prev} className="bg-white/10 hover:bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors text-lg border-none cursor-pointer flex-shrink-0">←</button>

                        {project.widescreen ? (
                            <div className="relative flex-1 rounded-xl overflow-hidden bg-black shadow-2xl" style={{ aspectRatio: '16/9' }}>
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={idx}
                                        src={project.gallery[idx]}
                                        alt={`${project.title} screenshot ${idx + 1}`}
                                        className="w-full h-full object-contain"
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -30 }}
                                        transition={{ duration: 0.25 }}
                                    />
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="relative flex-1 max-w-[260px] mx-auto">
                                {/* Phone frame */}
                                <div className="relative bg-gray-800 rounded-[2.5rem] p-2 shadow-2xl border-4 border-gray-700">
                                    <div className="rounded-[2rem] overflow-hidden aspect-[9/19.5] bg-black">
                                        <AnimatePresence mode="wait">
                                            <motion.img
                                                key={idx}
                                                src={project.gallery[idx]}
                                                alt={`${project.title} screenshot ${idx + 1}`}
                                                className="w-full h-full object-contain"
                                                initial={{ opacity: 0, x: 30 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -30 }}
                                                transition={{ duration: 0.25 }}
                                            />
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button onClick={next} className="bg-white/10 hover:bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors text-lg border-none cursor-pointer flex-shrink-0">→</button>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-5">
                        {project.gallery.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIdx(i)}
                                className={`w-2 h-2 rounded-full transition-all border-none cursor-pointer ${i === idx ? 'bg-[#FFB000] w-5' : 'bg-white/30'}`}
                            />
                        ))}
                    </div>

                    <p className="text-center text-white/40 text-xs mt-3">
                        Premium digital solutions crafted for excellence.
                    </p>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

/* ── Main Section ── */
const ProjectsSection = () => {
    const [activeProject, setActiveProject] = useState(null);
    const [activeWebProject, setActiveWebProject] = useState(null);
    const [flippedCard, setFlippedCard] = useState(null);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') setFlippedCard(null);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    return (
        <section id="projects" className="scroll-mt-20 py-10 md:py-16 px-6 md:px-16 lg:px-[10vw] bg-white relative">
            <div className="absolute inset-0 bg-[#f8f5f0]/50 -z-10" />
            <div className="max-w-[1200px] mx-auto w-full">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                        <span className="text-primary">My </span>
                        <span className="text-[#FFB000]">Projects</span>
                    </h2>
                    <p className="max-w-[600px] mx-auto text-primary/80 text-lg">
                        A selection of my recent work — tap any card to see details.
                    </p>
                </motion.div>

                {/* Mobile Projects subsection */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 flex items-center gap-3"
                >
                    <div className="w-1 h-8 bg-[#FFB000] rounded-full" />
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary">Mobile Application Portfolio</h3>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-6">
                    {projects.map((project) => (
                        <div key={project.title} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                            <FlipCard
                                project={project}
                                isFlipped={flippedCard === project.title}
                                onFlip={() => setFlippedCard(project.title)}
                                onClose={() => setFlippedCard(null)}
                                onViewProject={setActiveProject}
                            />
                        </div>
                    ))}
                </div>

                {/* Web Projects subsection */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mt-16 mb-8 flex items-center gap-3"
                >
                    <div className="w-1 h-8 bg-[#FFB000] rounded-full" />
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary">Web Application Portfolio</h3>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-6">
                    {webProjects.map((project) => (
                        <div key={project.title} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                            <WebFlipCard
                                project={project}
                                isFlipped={flippedCard === project.title}
                                onFlip={() => setFlippedCard(project.title)}
                                onClose={() => setFlippedCard(null)}
                                onViewProject={setActiveWebProject}
                            />
                        </div>
                    ))}
                </div>

            </div>

            {/* Modal */}
            {activeProject && (
                <GalleryModal project={activeProject} onClose={() => setActiveProject(null)} />
            )}
            {activeWebProject && (
                <WebImageModal project={activeWebProject} onClose={() => setActiveWebProject(null)} />
            )}
        </section>
    );
};

export default ProjectsSection;
