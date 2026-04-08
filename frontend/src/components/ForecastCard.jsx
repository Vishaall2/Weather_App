import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ForecastCard({ forecastData }) {
    if (!forecastData || !forecastData.dailyForecasts || forecastData.dailyForecasts.length === 0) return null;

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        // Returns "Mon, Mar 10" format
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    const [selectedDayIndex, setSelectedDayIndex] = useState(null);

    const handleCardClick = (index) => {
        // Toggle off if clicking the already selected card
        if (selectedDayIndex === index) {
            setSelectedDayIndex(null);
        } else {
            setSelectedDayIndex(index);
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1, delayChildren: 0.7 }
                    }
                }}
                className="w-full max-w-4xl mx-auto mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 relative z-10 px-4 sm:px-0"
            >
                {forecastData.dailyForecasts.map((day, index) => (
                    <motion.div
                        key={index}
                        variants={{
                            hidden: { y: 50, opacity: 0, scale: 0.9 },
                            visible: { y: 0, opacity: 1, scale: 1 }
                        }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        onClick={() => handleCardClick(index)}
                        className={`glass p-5 flex flex-col items-center justify-center rounded-2xl text-white backdrop-blur-md border border-white/20 shadow-xl relative overflow-hidden cursor-pointer transition-colors duration-300 ${selectedDayIndex === index ? 'bg-white/30 ring-2 ring-white/50' : 'hover:bg-white/20'}`}
                    >
                        <p className="text-sm font-semibold mb-1 text-white/90 whitespace-nowrap">{formatDate(day.date)}</p>
                        <img
                            src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                            alt={day.condition}
                            className="w-20 h-20 drop-shadow-xl my-1"
                        />
                        <p className="text-3xl font-black tracking-tighter text-shadow">{Math.round(day.temp)}°</p>
                        <p className="text-xs font-medium text-white/80 capitalize mt-2 text-center leading-tight">{day.condition}</p>
                    </motion.div>
                ))}
            </motion.div>

            <AnimatePresence mode="wait">
                {selectedDayIndex !== null && forecastData.dailyForecasts[selectedDayIndex]?.hourlyData && (
                    <motion.div
                        key="hourly-timeline"
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                        className="w-full max-w-4xl mx-auto px-4 sm:px-0 relative z-10 overflow-hidden"
                    >
                        <div className="glass p-6 rounded-2xl backdrop-blur-md border border-white/20 shadow-xl flex gap-4 overflow-x-auto custom-scrollbar">
                            {forecastData.dailyForecasts[selectedDayIndex].hourlyData.map((hour, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="flex flex-col items-center min-w-[80px] p-2"
                                >
                                    <span className="text-white/80 text-sm font-medium">{hour.time}</span>
                                    <img
                                        src={`https://openweathermap.org/img/wn/${hour.icon}.png`}
                                        alt={hour.condition}
                                        className="w-12 h-12 drop-shadow-md my-1"
                                    />
                                    <span className="text-white font-bold text-lg">{Math.round(hour.temp)}°</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default ForecastCard;
