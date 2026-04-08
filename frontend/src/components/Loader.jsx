import React from 'react';
import { motion } from 'framer-motion';

function Loader() {
    return (
        <div className="flex flex-col items-center justify-center mt-12 gap-4">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full shadow-lg"
            />
            <motion.p
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                className="text-white font-medium tracking-wide text-shadow"
            >
                Fetching Weather Data...
            </motion.p>
        </div>
    );
}

export default Loader;
