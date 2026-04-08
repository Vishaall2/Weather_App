import React from 'react';
import { motion } from 'framer-motion';
import { BiErrorCircle } from 'react-icons/bi';

function ErrorMessage({ message }) {
    if (!message) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 p-4 glass border-red-500/50 flex items-center gap-3 text-red-100 bg-red-500/20 max-w-md mx-auto"
        >
            <BiErrorCircle size={24} className="text-red-300 flex-shrink-0" />
            <span className="font-medium">{message}</span>
        </motion.div>
    );
}

export default ErrorMessage;
