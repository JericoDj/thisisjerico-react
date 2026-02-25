import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Snackbar from '../components/Snackbar';

const ContactSection = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [snackbar, setSnackbar] = useState({ visible: false, message: '', type: 'success' });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    from_name: 'Portfolio Contact Form',
                }),
            });
            const data = await res.json();
            if (data.success) {
                setStatus('idle');
                setFormData({ name: '', email: '', message: '' });
                setSnackbar({ visible: true, message: 'Message sent successfully! I\'ll get back to you soon.', type: 'success' });
            } else {
                setStatus('idle');
                setSnackbar({ visible: true, message: 'Something went wrong. Please try again.', type: 'error' });
            }
        } catch {
            setStatus('idle');
            setSnackbar({ visible: true, message: 'Something went wrong. Please try again.', type: 'error' });
        }
    };

    const inputBase = 'w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FFB000] focus:ring-2 focus:ring-[#FFB000]/20 transition-all text-base';

    return (
        <>
            <section id="contact" className="pt-14 pb-10 px-6 md:px-16 lg:px-[10vw] text-center">
                <div className="max-w-[800px] mx-auto w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif text-primary font-bold mb-4">
                            Get In <span className="text-[#FFB000]">Touch</span>
                        </h2>
                        <p className="max-w-[600px] mx-auto text-primary/80 text-lg font-medium">
                            Have a project in mind? Let's work together.
                        </p>
                    </motion.div>

                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 md:p-12 text-left"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    required
                                    className={inputBase}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    required
                                    className={inputBase}
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell me about your project..."
                                required
                                rows={5}
                                className={`${inputBase} resize-none`}
                            />
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="bg-gray-900 text-white font-semibold uppercase tracking-widest text-sm px-10 py-4 rounded-full hover:bg-[#FFB000] hover:text-gray-900 transition-colors cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'sending' ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                    </motion.form>
                </div>
            </section>

            <Snackbar
                message={snackbar.message}
                type={snackbar.type}
                isVisible={snackbar.visible}
                onClose={() => setSnackbar(s => ({ ...s, visible: false }))}
            />
        </>
    );
};

export default ContactSection;
