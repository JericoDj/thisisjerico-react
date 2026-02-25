import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Snackbar = ({ message, type = 'success', isVisible, onClose, duration = 4000 }) => {
    useEffect(() => {
        if (isVisible && duration > 0) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    const styles = {
        success: 'bg-gray-900 border-[#FFB000]',
        error: 'bg-gray-900 border-red-400',
    };

    const iconMap = {
        success: (
            <span className="w-6 h-6 rounded-full bg-[#FFB000] flex items-center justify-center text-gray-900 text-sm font-bold flex-shrink-0">✓</span>
        ),
        error: (
            <span className="w-6 h-6 rounded-full bg-red-400 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">!</span>
        ),
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 60, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: 60, x: '-50%' }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className={`fixed bottom-8 left-1/2 z-[9999] flex items-center gap-3 px-6 py-4 rounded-xl border-l-4 shadow-2xl ${styles[type]}`}
                >
                    {iconMap[type]}
                    <span className="text-white text-sm font-medium">{message}</span>
                    <button
                        onClick={onClose}
                        className="ml-4 text-white/50 hover:text-white text-lg bg-transparent border-none cursor-pointer leading-none"
                    >
                        ✕
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Snackbar;
