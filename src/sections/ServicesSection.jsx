import React from 'react';
import { motion } from 'framer-motion';

import backendVideo from '../assets/animations/backend_animation.mp4';
import webVideo from '../assets/animations/web_animation.mp4';
import mobileVideo from '../assets/animations/mobile_animation.mp4';
import aiVideo from '../assets/animations/ai_animation.mp4';

const services = [
    {
        video: backendVideo,
        title: 'Backend Development',
        desc: 'Scalable server-side architecture, REST APIs, databases, and cloud infrastructure.',
    },
    {
        video: webVideo,
        title: 'Web Development',
        desc: 'Fast, accessible, and responsive websites built with modern frameworks and best practices.',
    },
    {
        video: mobileVideo,
        title: 'Mobile Development',
        desc: 'Seamless cross-platform mobile applications for iOS and Android using Flutter.',
    },
    {
        video: aiVideo,
        title: 'AI Integration',
        desc: 'Embedding AI-powered features — chatbots, recommendations, and automation — into your product.',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ServicesSection = () => {
    return (
        <section id="services" className="scroll-mt-20 py-10 md:py-16 px-6 md:px-16 lg:px-[10vw]">
            <div className="max-w-[1200px] mx-auto w-full">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl mb-4">
                        <span className="text-primary">My </span>
                        <span className="text-accent1">Services</span>
                    </h2>
                    <p className="max-w-[600px] mx-auto opacity-80 text-lg">
                        Comprehensive digital solutions to help your business grow and stand out.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {services.map((service) => (
                        <motion.div
                            key={service.title}
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                            className="glass-panel overflow-hidden flex flex-col border-t-4 border-t-transparent hover:border-t-accent1 transition-all duration-300"
                        >
                            {/* 16:9 Video */}
                            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                                <video
                                    src={service.video}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>

                            {/* Text content */}
                            <div className="p-6 flex flex-col gap-2 flex-1">
                                <h3 className="text-lg text-gray-800 font-serif font-bold">{service.title}</h3>
                                <p className="opacity-70 text-sm leading-relaxed">{service.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default ServicesSection;
