import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ContactDialog from './components/ContactDialog';

import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';

import logo from './assets/JericoWebLogo.png';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setIsSidebarOpen(false);
        setIsContactDialogOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f5f0] font-sans text-primary">
      <Navbar onOpenSidebar={() => setIsSidebarOpen(true)} onOpenDialog={() => setIsContactDialogOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onOpenDialog={() => setIsContactDialogOpen(true)} />

      <main>
        <HeroSection onOpenDialog={() => setIsContactDialogOpen(true)} />
        <AboutSection />
        <ServicesSection />
        <div className="section-divider"></div>
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="bg-[#0d1b2a] text-white">
        {/* Main Footer Content */}
        <div className="max-w-[1200px] mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand + Tagline */}
          <div className="col-span-2 md:col-span-1">
            <img src={logo} alt="Jerico De Jesus" className="h-8 mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering businesses with cutting-edge mobile and web solutions. We turn ideas into premium digital products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-5">Quick Links</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              {['Home', 'About', 'Services', 'Projects'].map(link => (
                <li key={link}>
                  <button
                    onClick={() => {
                      const el = document.getElementById(link.toLowerCase());
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-[#FFB000] transition-colors bg-transparent border-none cursor-pointer text-gray-400 text-sm p-0"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-5">Services</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              {['Mobile App Development', 'Web Development', 'UI/UX Design', 'E-commerce Solutions', 'SaaS Platforms'].map(s => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-5">Contact</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              <li>
                <a href="mailto:dejesusjerico528@gmail.com" className="hover:text-[#FFB000] transition-colors break-all">
                  dejesusjerico528@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+12345678900" className="hover:text-[#FFB000] transition-colors">
                  +1 (234) 567-8900
                </a>
              </li>
              <li>Philippines</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-5 px-6">
          <p className="text-center text-gray-500 text-xs">
            © {new Date().getFullYear()} Jerico De Jesus. All rights reserved.
          </p>
        </div>
      </footer>

      <ContactDialog
        isOpen={isContactDialogOpen}
        onClose={() => setIsContactDialogOpen(false)}
      />

      {/* Floating Scroll-to-Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        style={{ transition: 'opacity 0.3s, transform 0.3s' }}
        className={`fixed bottom-8 right-6 z-50 w-12 h-12 bg-[#FFB000] rounded-full flex items-center justify-center shadow-xl hover:bg-[#FFD54F] hover:scale-110 ${showScrollTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}

export default App;
