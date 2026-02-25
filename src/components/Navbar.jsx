import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
import Button from './Button';
import logo from '../assets/JericoWebLogo.png';

const navLinks = [
    { name: 'About', href: 'about' },
    { name: 'Services', href: 'services' },
    { name: 'Projects', href: 'projects' },
];

const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Navbar = ({ onOpenSidebar, onOpenDialog, onOpenSchedule }) => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            const allSections = ['home', ...navLinks.map(l => l.href)];
            let current = '';
            for (const section of allSections) {
                const el = document.getElementById(section);
                if (el && window.scrollY >= el.offsetTop - 150) current = section;
            }
            setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-[5%] py-4 flex justify-between items-center transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-sm' : 'bg-gray-900'}`}
        >
            <div>
                <button onClick={() => scrollTo('home')} className="bg-transparent border-none cursor-pointer">
                    <img src={logo} alt="Jerico De Jesus" className="h-8" />
                </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
                <ul className="flex items-center gap-8 list-none m-0 p-0">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <button
                                onClick={() => scrollTo(link.href)}
                                className={`font-medium text-base transition-colors bg-transparent border-none cursor-pointer ${activeSection === link.href ? 'text-[#FFB000]' : 'text-white hover:text-gray-300'}`}
                            >
                                {link.name}
                            </button>
                        </li>
                    ))}
                    <li>
                        <Button onClick={onOpenDialog}>Get in Touch</Button>
                    </li>
                </ul>
            </nav>

            {/* Mobile Burger */}
            <div className="block md:hidden">
                <button
                    onClick={onOpenSidebar}
                    className="bg-transparent border-none text-white text-3xl focus:outline-none hover:text-[#FFB000] transition-colors"
                >
                    <FiMenu />
                </button>
            </div>
        </motion.header>
    );
};

export default Navbar;
