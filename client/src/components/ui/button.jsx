import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Button({ className, variant = 'primary', size = 'md', ...props }) {
    const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 disabled:pointer-events-none disabled:opacity-50';

    const variants = {
        primary: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-sm shadow-emerald-200',
        secondary: 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200 shadow-sm',
        ghost: 'hover:bg-emerald-50 text-emerald-700',
        outline: 'border border-emerald-200 bg-white hover:bg-emerald-50 text-emerald-700',
    };

    const sizes = {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 py-2 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
    };

    return (
        <button
            className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
            {...props}
        />
    );
}
