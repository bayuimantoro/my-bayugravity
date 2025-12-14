"use client";

import { ReactNode } from "react";
import { useTheme } from "./ThemeProvider";

interface CardProps {
    children: ReactNode;
    className?: string;
    padding?: "none" | "sm" | "md" | "lg";
    hover?: boolean;
}

export function Card({ children, className = "", padding = "none", hover = false }: CardProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const paddingStyles = {
        none: "",
        sm: "16px",
        md: "24px",
        lg: "32px",
    };

    return (
        <div
            className={className}
            style={{
                backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e5e7eb"}`,
                borderRadius: "16px",
                overflow: "hidden",
                padding: paddingStyles[padding],
                transition: hover ? "transform 0.3s, box-shadow 0.3s" : undefined,
                boxShadow: isDark ? "none" : "0 1px 3px rgba(0,0,0,0.1)",
            }}
        >
            {children}
        </div>
    );
}
