import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
    const baseClasses = "px-6 py-3 rounded-lg font-bold text-base cursor-pointer transition-all duration-300 inline-flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-gradient-to-r from-[#FFB000] to-[#FFD54F] text-gray-900 shadow-md hover:shadow-lg",
        secondary: "bg-transparent text-gray-900 border border-[#FFB000] hover:bg-[#FFB000]/10",
        outline: "bg-transparent text-[#FFB000] border border-[#FFB000]"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${baseClasses} ${variants[variant]} ${className}`}
            onClick={onClick}
        >
            {children}
        </motion.button>
    );
};

export default Button;
