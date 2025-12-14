"use client";

import { useTheme } from "./ThemeProvider";

interface SkillBarProps {
    name: string;
    level: number;
}

export function SkillBar({ name, level }: SkillBarProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
                <span>{name}</span>
                <span style={{ color: "#dc2626" }}>{level}%</span>
            </div>
            <div className="skill-bar-container">
                <div className="skill-bar-fill" style={{ width: `${level}%` }} />
            </div>
        </div>
    );
}
