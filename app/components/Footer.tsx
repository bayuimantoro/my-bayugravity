"use client";

import { useTheme } from "./ThemeProvider";

interface FooterProps {
    name?: string;
}

export function Footer({ name = "Bayu Imantoro" }: FooterProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const bgMain = isDark ? "#0a0a0a" : "#ffffff";
    const textMuted = isDark ? "#9ca3af" : "#6b7280";
    const borderColor = isDark ? "rgba(255,255,255,0.08)" : "#e5e7eb";

    return (
        <footer
            style={{
                padding: "24px 0",
                borderTop: `1px solid ${borderColor}`,
                backgroundColor: bgMain,
                textAlign: "center",
            }}
        >
            <p style={{ fontSize: "13px", color: textMuted }}>
                © 2024 <span style={{ color: "#dc2626" }}>{name}</span>. All rights reserved.
            </p>
        </footer>
    );
}
