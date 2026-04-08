import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { MdLocationOn } from 'react-icons/md';

function SearchBar({ onSearch }) {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city.trim());
            setCity('');
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="relative flex items-center w-full max-w-md mx-auto"
        >
            <MdLocationOn className="absolute left-4 text-white/70 text-xl" />
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Search for a city..."
                className="w-full py-4 pl-12 pr-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-lg text-lg font-medium"
            />
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="absolute right-2 p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-sm shadow-md"
            >
                <FiSearch className="text-white text-xl" />
            </motion.button>
        </motion.form>
    );
}

export default SearchBar;
