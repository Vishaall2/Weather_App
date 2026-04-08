import React from 'react';
import { motion } from 'framer-motion';
import { WiHumidity, WiStrongWind, WiThermometer } from 'react-icons/wi';

function WeatherCard({ data }) {
    if (!data) return null;

    const { cityName, temperature, condition, humidity, windSpeed, icon, feelsLike } = data;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            className="mt-8 p-8 glass text-white w-full max-w-md mx-auto relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-black/10 rounded-full blur-3xl"></div>

            <div className="text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-4xl font-bold tracking-wider text-shadow"
                >
                    {cityName}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl mt-1 text-white/80 capitalize font-medium"
                >
                    {condition}
                </motion.p>

                <div className="flex flex-col items-center justify-center my-6">
                    <motion.img
                        initial={{ scale: 0, rotate: -45, y: -20 }}
                        animate={{ scale: 1, rotate: 0, y: 0 }}
                        transition={{ type: "spring", stiffness: 150, damping: 10, delay: 0.4 }}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        src={iconUrl}
                        alt={condition}
                        className="w-32 h-32 drop-shadow-2xl filter cursor-pointer"
                    />
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", delay: 0.6 }}
                        className="flex items-start"
                    >
                        <motion.span
                            key={temperature}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-8xl font-black tracking-tighter text-shadow"
                        >
                            {Math.round(temperature)}
                        </motion.span>
                        <span className="text-4xl mt-3 font-medium text-white/90">°C</span>
                    </motion.div>
                </div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.2, delayChildren: 0.8 }
                        }
                    }}
                    className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/20"
                >
                    <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-inner transition-transform hover:scale-105 hover:bg-white/20">
                        <WiThermometer className="text-4xl mb-1 text-red-300 drop-shadow-md" />
                        <span className="text-xs font-medium text-white/80 uppercase tracking-wider mb-1">Feels Like</span>
                        <span className="font-bold text-xl">{Math.round(feelsLike)}°</span>
                    </motion.div>
                    <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-inner transition-transform hover:scale-105 hover:bg-white/20">
                        <WiHumidity className="text-4xl mb-1 text-blue-300 drop-shadow-md" />
                        <span className="text-xs font-medium text-white/80 uppercase tracking-wider mb-1">Humidity</span>
                        <span className="font-bold text-xl">{humidity}%</span>
                    </motion.div>
                    <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-inner transition-transform hover:scale-105 hover:bg-white/20">
                        <WiStrongWind className="text-4xl mb-1 text-gray-300 drop-shadow-md" />
                        <span className="text-xs font-medium text-white/80 uppercase tracking-wider mb-1">Wind</span>
                        <span className="font-bold text-xl">{windSpeed} <span className="text-xs font-normal opacity-70">m/s</span></span>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default WeatherCard;
