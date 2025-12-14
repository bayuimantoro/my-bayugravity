"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    children: ReactNode;
    fullWidth?: boolean;
}

export function Button({
    variant = "primary",
    size = "md",
    children,
    fullWidth = false,
    className = "",
    ...props
}: ButtonProps) {
    const baseClasses =
        "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50";

    const variantClasses = {
        primary:
            "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg hover:shadow-red-500/25",
        secondary:
            "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white",
        outline:
            "border border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white",
        ghost:
            "hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white",
    };

    const sizeClasses = {
        sm: "px-4 py-1.5 text-sm",
        md: "px-6 py-2.5 text-base",
        lg: "px-8 py-3.5 text-lg",
    };

    const widthClass = fullWidth ? "w-full" : "";

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
