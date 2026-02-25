import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';

const socials = [
    {
        href: 'https://www.facebook.com/MjericoDj',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5" fill="#1877F2">
                <path d="M24 12.073C24 5.406 18.627 0 12 0S0 5.406 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
            </svg>
        ),
    },
    {
        href: 'https://www.instagram.com/djjerico/profilecard/?igsh=YXdyaGVxNGM3b3ly',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5" fill="#E4405F">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
        ),
    },
    {
        href: 'https://www.linkedin.com/in/mjericodj',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5" fill="#0A66C2">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        href: 'https://github.com/JericoDj',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5" fill="#24292F">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
        ),
    },
];

const SocialIcons = ({ className = '' }) => (
    <div className={`flex items-center gap-3 ${className}`}>
        {socials.map(s => (
            <a key={s.href} href={s.href} target="_blank" rel="noreferrer"
                className="w-9 h-9 md:w-11 md:h-11 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                {s.icon}
            </a>
        ))}
    </div>
);

const HeroSection = ({ onOpenDialog, onOpenSchedule }) => {
    return (
        <section id="home" className="section-padding min-h-[90vh] flex flex-col justify-center pt-[100px] bg-transparent text-primary">
            <div className="max-w-[1200px] w-full mx-auto">

                {/* Two-column grid: image + text */}
                <div className="grid grid-cols-2 gap-4 md:gap-16 items-center">
                    {/* Left: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative flex justify-center items-end pb-0"
                    >
                        <img
                            src="/images/Picture-hd.png"
                            alt="Jerico De Jesus"
                            className="w-full max-w-[160px] sm:max-w-[280px] md:max-w-[500px] h-auto object-contain drop-shadow-2xl"
                        />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 aspect-square bg-secondary rounded-full -z-10 opacity-60 blur-[40px]" />
                        {/* Subtle centered line */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[110%] md:w-[140%] h-[1px] bg-gray-300" />
                    </motion.div>

                    {/* Right: Text + Buttons (desktop also shows socials here) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {/* Flat colored spinning tech icons */}
                        <div className="flex gap-1.5 md:gap-3 mb-4 md:mb-6">
                            {[
                                {
                                    color: '#61DAFB', bg: '#e8f9fd', spinDuration: '8s',
                                    svg: <svg viewBox="0 0 24 24" fill="#61DAFB" className="w-3 h-3 md:w-6 md:h-6"><path d="M12 9.861A2.139 2.139 0 1 0 12 14.139 2.139 2.139 0 1 0 12 9.861zM6.008 16.255l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.119.133.468a23.53 23.53 0 0 0 1.363 3.578l.101.213-.101.213a23.307 23.307 0 0 0-1.363 3.578l-.133.467zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.145 1.641 2.294 4.315 3.046a24.95 24.95 0 0 1 1.182-3.046A24.752 24.752 0 0 1 5.317 8.95zM17.992 16.255l-.133-.469a23.357 23.357 0 0 0-1.364-3.577l-.101-.213.101-.213a23.42 23.42 0 0 0 1.364-3.578l.133-.468.473.119c3.517.889 5.535 2.398 5.535 4.14s-2.018 3.25-5.535 4.139l-.473.12zm-.491-4.259c.48 1.039.877 2.06 1.182 3.046 2.675-.752 4.315-1.901 4.315-3.046 0-1.146-1.641-2.294-4.315-3.046a24.788 24.788 0 0 1-1.182 3.046zM5.31 8.945l-.133-.467C4.188 5.02 4.635 2.396 6.17 1.453c1.533-.942 3.953.1 6.084 2.915l.292.384-.384.292a23.47 23.47 0 0 0-2.971 2.678l-.150.168-.222-.011a23.307 23.307 0 0 0-3.479.066l-.02.001zm1.24-6.4c-.473 0-.897.1-1.259.322-1.096.675-1.452 2.806-.95 5.54a24.76 24.76 0 0 1 3.124-.066 24.58 24.58 0 0 1 2.572-2.318c-1.355-1.898-2.787-3.078-3.487-3.478zm10.16 6.4l-.458-.066a23.307 23.307 0 0 0-3.479-.066l-.221.011-.151-.168a23.47 23.47 0 0 0-2.971-2.678l-.384-.292.292-.384c2.131-2.815 4.551-3.857 6.084-2.915 1.535.942 1.982 3.566.993 7.025l-.133.467-.003.066zm-4.024-1.215a24.76 24.76 0 0 1 3.124.066c.502-2.734.146-4.865-.95-5.54-1.097-.675-3.045.18-5.058 2.316a24.58 24.58 0 0 1 2.572 2.318z" /></svg>
                                },
                                {
                                    color: '#FF6B6B', bg: '#fff0f0', spinDuration: '12s',
                                    svg: <svg viewBox="0 0 24 24" fill="#FF6B6B" className="w-3 h-3 md:w-6 md:h-6"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-1.99V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" /></svg>
                                },
                                {
                                    color: '#4CAF50', bg: '#f0faf0', spinDuration: '6s',
                                    svg: <svg viewBox="0 0 24 24" fill="#4CAF50" className="w-3 h-3 md:w-6 md:h-6"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" /></svg>
                                },
                                {
                                    color: '#FFB000', bg: '#fff8e1', spinDuration: '10s',
                                    svg: <svg viewBox="0 0 24 24" fill="#FFB000" className="w-3 h-3 md:w-6 md:h-6"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" /></svg>
                                },
                                {
                                    color: '#9C27B0', bg: '#f9f0ff', spinDuration: '8s',
                                    svg: <svg viewBox="0 0 24 24" fill="#9C27B0" className="w-3 h-3 md:w-6 md:h-6"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm1-11h-2v3H8v2h3v3h2v-3h3v-2h-3z" /></svg>
                                },
                            ].map(({ color, bg, spinDuration, svg }, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.1, type: 'spring', bounce: 0.5 }}
                                    style={{
                                        backgroundColor: bg,
                                        animation: `spin-slow ${spinDuration} linear infinite`,
                                    }}
                                    whileHover={{ scale: 1.2 }}
                                    className="w-7 h-7 md:w-11 md:h-11 rounded-xl border shadow-sm flex items-center justify-center cursor-default select-none"
                                >
                                    {svg}
                                </motion.div>
                            ))}
                        </div>

                        <h1 className="text-[clamp(1.4rem,4vw,4rem)] mb-4 md:mb-6 text-primary">
                            Turning Ideas Into
                            <span className="text-accent1 block mt-2">Reality</span>
                        </h1>

                        <p className="text-sm sm:text-base md:text-xl mb-6 md:mb-10 text-primary/80 leading-relaxed font-medium">
                            Bringing functional, user-focused applications to life with precision.
                            I design and build intuitive experiences that solve real problems.
                        </p>

                        <div className="flex flex-wrap gap-2 md:gap-4">
                            <Button onClick={onOpenSchedule} variant="primary">
                                Schedule Meeting
                            </Button>
                            <Button onClick={() => window.open('https://drive.google.com/file/d/1GMQH71fa3Vv8PP7yBm1luorfkGIuOruG/view?usp=sharing', '_blank')} variant="outline">
                                Download CV
                            </Button>
                        </div>

                        {/* Desktop only: socials below buttons */}
                        <SocialIcons className="mt-6 hidden md:flex" />
                    </motion.div>
                </div>

                {/* Mobile only: socials centered below the full grid */}
                <div className="flex justify-center mt-8 md:hidden">
                    <SocialIcons />
                </div>

            </div>
        </section >
    );
};

export default HeroSection;
