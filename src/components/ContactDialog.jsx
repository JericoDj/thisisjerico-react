import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSend } from 'react-icons/fi';
import Button from './Button';
import Snackbar from './Snackbar';

const ContactDialog = ({ isOpen, onClose }) => {
    const [result, setResult] = useState(''); // '' | 'sending'
    const [snackbar, setSnackbar] = useState({ visible: false, message: '', type: 'success' });

    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape' && isOpen) onClose(); };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult('sending');
        const formData = new FormData(event.target);

        formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
        formData.append("from_name", "Portfolio Contact Dialog");

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            }).then((res) => res.json());

            if (res.success) {
                setResult('');
                event.target.reset();
                onClose();
                setSnackbar({ visible: true, message: 'Message sent successfully! I\'ll get back to you soon.', type: 'success' });
            } else {
                setResult('');
                setSnackbar({ visible: true, message: res.message || 'Something went wrong. Please try again.', type: 'error' });
            }
        } catch {
            setResult('');
            setSnackbar({ visible: true, message: 'Something went wrong. Please try again.', type: 'error' });
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 flex justify-center items-center z-[1000]">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                            className="relative w-[90%] max-w-[500px] bg-white rounded-2xl p-8 shadow-2xl border border-gray-100"
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 bg-transparent border-none text-gray-400 text-2xl focus:outline-none hover:text-primary transition-colors"
                            >
                                <FiX />
                            </button>

                            <h2 className="mb-6 font-serif text-3xl font-bold text-gray-900">Send me a message</h2>

                            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Your Name"
                                    className="w-full p-4 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-base font-sans outline-none focus:border-[#FFB000] focus:ring-2 focus:ring-[#FFB000]/20 transition-all"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="Your Email"
                                    className="w-full p-4 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-base font-sans outline-none focus:border-[#FFB000] focus:ring-2 focus:ring-[#FFB000]/20 transition-all"
                                />
                                <textarea
                                    name="message"
                                    required
                                    placeholder="Your Message"
                                    rows="4"
                                    className="w-full p-4 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-base font-sans outline-none resize-y focus:border-[#FFB000] focus:ring-2 focus:ring-[#FFB000]/20 transition-all"
                                ></textarea>

                                <Button type="submit" disabled={result === 'sending'} className="mt-4 w-full">
                                    <FiSend /> {result === 'sending' ? 'Sending...' : 'Send Message'}
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Snackbar
                message={snackbar.message}
                type={snackbar.type}
                isVisible={snackbar.visible}
                onClose={() => setSnackbar(s => ({ ...s, visible: false }))}
            />
        </>
    );
};

export default ContactDialog;
