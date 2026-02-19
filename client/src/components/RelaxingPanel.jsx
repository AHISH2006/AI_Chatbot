import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wind, Sun, Cloud, Moon } from 'lucide-react';

const quotes = [
    "Breathe in deeply, breathe out slowly.",
    "You are enough just as you are.",
    "This feeling will pass.",
    "One step at a time.",
    "Peace comes from within.",
    "Your mental health is a priority."
];

export default function RelaxingPanel() {
    const [quote, setQuote] = useState(quotes[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hidden md:flex md:w-2/3 h-full relative overflow-hidden bg-gradient-to-br from-teal-50 to-emerald-100 items-center justify-center p-12">

            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-20 left-20 opacity-20 text-teal-300"
                >
                    <Cloud size={120} />
                </motion.div>
                <motion.div
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 60, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-40 right-20 opacity-20 text-emerald-300"
                >
                    <Cloud size={100} />
                </motion.div>
            </div>

            <div className="z-10 text-center max-w-lg space-y-12">
                {/* Breathing Circle */}
                <div className="relative flex justify-center items-center">
                    <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-48 h-48 rounded-full bg-teal-200/50 blur-xl absolute"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-32 h-32 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center border border-white/50 shadow-lg"
                    >
                        <Wind className="text-teal-600/70 w-12 h-12" />
                    </motion.div>
                </div>

                {/* Quote */}
                <motion.div
                    key={quote}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-3xl font-serif text-teal-800 italic leading-relaxed">
                        "{quote}"
                    </h2>
                </motion.div>
            </div>
        </div>
    );
}
