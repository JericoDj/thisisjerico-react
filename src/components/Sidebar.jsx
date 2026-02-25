import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import Button from './Button';

const navLinks = [
    { name: 'Home', href: 'home' },
    { name: 'About', href: 'about' },
    { name: 'Services', href: 'services' },
    { name: 'Projects', href: 'projects' },
];

const scrollTo = (id, onClose) => {
    if (onClose) onClose();
    setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300); // small delay lets drawer close before scrolling
};

const Sidebar = ({ isOpen, onClose, onOpenDialog, onOpenSchedule }) => {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            let current = '';
            for (const link of navLinks) {
                const el = document.getElementById(link.href);
                if (el && window.scrollY >= el.offsetTop - 150) current = link.href;
            }
            setActiveSection(current);
        };
        const handleKey = (e) => { if (e.key === 'Escape' && isOpen) onClose(); };
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('keydown', handleKey);
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKey);
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-[99] backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                        className="fixed top-0 right-0 bottom-0 w-[80%] max-w-[300px] bg-white z-[100] p-8 flex flex-col border-l border-gray-100 shadow-xl"
                    >
                        <div className="flex justify-end mb-12">
                            <button
                                onClick={onClose}
                                className="bg-transparent border-none text-gray-800 text-3xl focus:outline-none hover:text-[#FFB000] transition-colors"
                            >
                                <FiX />
                            </button>
                        </div>

                        <nav className="flex-1">
                            <ul className="list-none flex flex-col gap-8 m-0 p-0">
                                {navLinks.map((link) => {
                                    const isActive = activeSection === link.href || (activeSection === '' && link.href === 'home');
                                    return (
                                        <li key={link.name}>
                                            <button
                                                onClick={() => scrollTo(link.href, onClose)}
                                                className={`text-2xl font-bold font-serif transition-colors bg-transparent border-none cursor-pointer text-left w-full ${isActive ? 'text-[#FFB000]' : 'text-gray-800 hover:text-[#FFB000]'}`}
                                            >
                                                {link.name}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        <div className="mt-auto">
                            <Button className="w-full !text-white" onClick={() => { onClose(); onOpenSchedule(); }}>
                                Schedule Meeting
                            </Button>
                            <div className="mt-6 flex flex-col gap-2 text-sm text-gray-500 border-t border-gray-100 pt-5">
                                <a href="mailto:dejesusjerico528@gmail.com" className="hover:text-[#FFB000] transition-colors break-all">
                                    ✉ dejesusjerico528@gmail.com
                                </a>
                                <a href="tel:+12345678900" className="hover:text-[#FFB000] transition-colors">
                                    ✆ +1 (234) 567-8900
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Sidebar;
