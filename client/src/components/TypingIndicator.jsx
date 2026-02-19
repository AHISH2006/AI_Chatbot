import { motion } from 'framer-motion';

export function TypingIndicator() {
    return (
        <div className="flex space-x-1 p-2 bg-slate-100 rounded-2xl w-fit">
            <motion.div
                className="w-2 h-2 bg-slate-400 rounded-full"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
            />
            <motion.div
                className="w-2 h-2 bg-slate-400 rounded-full"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            />
            <motion.div
                className="w-2 h-2 bg-slate-400 rounded-full"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            />
        </div>
    );
}
