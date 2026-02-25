import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaLock, FaCloud, FaTools, FaLaptopCode, FaDownload, FaMobileAlt, FaServer, FaDatabase } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { FiSmartphone } from 'react-icons/fi';
import Button from '../components/Button';

const AboutSection = () => {
    return (
        <section id="about" className="py-20 px-6 md:px-[5%] bg-white text-gray-800">
            <div className="max-w-[1100px] mx-auto w-full text-center">

                {/* --- ABOUT PART --- */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6 font-bold">
                        About <span className="text-[#FFB000]">Me</span>
                    </h2>
                    <h3 className="text-2xl font-serif text-primary font-bold mb-6">Hi, my name is Jerico.</h3>

                    <p className="text-lg leading-[1.8] mb-8 max-w-[1000px] mx-auto text-primary/80 font-medium">
                        I'm a freelance full-stack developer who started my career in the Hospitality Industry but discovered my true passion in building mobile and web applications. A self-trained developer, I create scalable systems using Express.js backends, SQL and NoSQL databases, Flutter mobile apps, and React web platforms. My background in customer service shaped my focus on user experience, while my technical skills allow me to deliver efficient, responsive, and reliable software solutions. I'm always eager to learn new technologies and push the boundaries of what's possible to create impactful, user-friendly applications.
                    </p>

                    {/* Icons row */}
                    <div className="flex justify-center items-center gap-6 mb-8 text-3xl">
                        <FaCode className="text-primary hover:text-[#FFB000] transition-colors" />
                        <MdSecurity className="text-primary hover:text-[#FFB000] transition-colors" />
                        <FiSmartphone className="text-primary hover:text-[#FFB000] transition-colors" />
                    </div>

                    <p className="italic text-gray-500 mb-12 font-serif text-base">
                        "Striving for excellence in every project."
                    </p>
                </motion.div>

                <div className="w-full h-[1px] bg-black/10 mb-12" />

                {/* --- WHAT I BRING TO THE TABLE --- */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="text-3xl font-serif text-primary font-bold mb-6">What I Bring to the <span className="text-[#FFB000]">Table</span></h2>

                    <p className="text-lg leading-[1.8] mb-12 max-w-[1000px] mx-auto text-primary/80 font-medium">
                        With a strong foundation in full-stack development, I bring a balance of technical architecture and user-focused design thinking to every project. My experience in API architecture, real-time data systems, and scalable backend infrastructure allows me to build seamless applications that not only meet business requirements but also provide a smooth user experience. I'm committed to creating reliable, maintainable systems and continuously improving performance and usability.
                    </p>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {/* Item 1 */}
                        <div className="flex flex-col items-center text-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <FaMobileAlt className="text-4xl text-[#FFB000] mb-4" />
                            <h4 className="font-bold text-gray-900 text-base mb-2 font-serif">Mobile Development</h4>
                            <p className="text-sm text-gray-600">Flutter cross-platform apps</p>
                        </div>
                        {/* Item 2 */}
                        <div className="flex flex-col items-center text-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <FaLaptopCode className="text-4xl text-[#FFB000] mb-4" />
                            <h4 className="font-bold text-gray-900 text-base mb-2 font-serif">Web Platforms</h4>
                            <p className="text-sm text-gray-600">React & modern frontends</p>
                        </div>
                        {/* Item 3 */}
                        <div className="flex flex-col items-center text-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <FaServer className="text-4xl text-[#FFB000] mb-4" />
                            <h4 className="font-bold text-gray-900 text-base mb-2 font-serif">API Architecture</h4>
                            <p className="text-sm text-gray-600">Express.js scalable backends</p>
                        </div>
                        {/* Item 4 */}
                        <div className="flex flex-col items-center text-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <FaDatabase className="text-4xl text-[#FFB000] mb-4" />
                            <h4 className="font-bold text-gray-900 text-base mb-2 font-serif">Database Systems</h4>
                            <p className="text-sm text-gray-600">SQL & NoSQL solutions</p>
                        </div>
                    </div>

                    <a href="https://drive.google.com/file/d/1GMQH71fa3Vv8PP7yBm1luorfkGIuOruG/view?usp=sharing" target="_blank" rel="noreferrer" className="inline-block">
                        <Button variant="outline">
                            <FaDownload />
                            Download CV
                        </Button>
                    </a>
                </motion.div>

            </div>
        </section>
    );
};

export default AboutSection;
