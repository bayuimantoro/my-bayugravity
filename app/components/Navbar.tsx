"use client";

import { useTheme } from "./ThemeProvider";

interface NavbarProps {
    isScrolled: boolean;
    activeSection?: string;
    onNavigate?: (section: string) => void;
    showBackButton?: boolean;
    onBack?: () => void;
}

export function Navbar({ isScrolled, activeSection, onNavigate, showBackButton, onBack }: NavbarProps) {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";
    const textMuted = isDark ? "#9ca3af" : "#6b7280";
    const borderColor = isDark ? "rgba(255,255,255,0.08)" : "#e5e7eb";

    const navItems = ["home", "about", "projects", "contact"];

    return (
        <nav
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                height: "64px",
                backgroundColor: isScrolled
                    ? isDark ? "rgba(10,10,10,0.95)" : "rgba(255,255,255,0.95)"
                    : "transparent",
                backdropFilter: isScrolled ? "blur(8px)" : "none",
                borderBottom: isScrolled ? `1px solid ${borderColor}` : "none",
                transition: "all 0.3s",
            }}
        >
            <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 20px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {showBackButton ? (
                    <button
                        onClick={onBack}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: isDark ? "#fff" : "#1a1a1a",
                            fontSize: "14px",
                        }}
                    >
                        <span style={{ fontSize: "18px" }}>←</span> Back
                    </button>
                ) : (
                    <a href="/" style={{ fontSize: "20px", fontWeight: "bold", textDecoration: "none", color: isDark ? "#fff" : "#1a1a1a" }}>
                        <span style={{ color: "#dc2626" }}>B</span>ayu
                    </a>
                )}

                {!showBackButton && onNavigate && (
                    <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
                        {navItems.map((item) => (
                            <button
                                key={item}
                                onClick={() => onNavigate(item)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    fontSize: "14px",
                                    textTransform: "capitalize",
                                    color: activeSection === item ? "#dc2626" : textMuted,
                                    cursor: "pointer",
                                }}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                )}

                {showBackButton && (
                    <a href="/" style={{ fontSize: "20px", fontWeight: "bold", textDecoration: "none", color: isDark ? "#fff" : "#1a1a1a" }}>
                        <span style={{ color: "#dc2626" }}>B</span>ayu
                    </a>
                )}

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <button
                        onClick={toggleTheme}
                        style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", padding: "8px" }}
                    >
                        {isDark ? "☀️" : "🌙"}
                    </button>
                    {!showBackButton && onNavigate && (
                        <button className="btn btn-primary" onClick={() => onNavigate("contact")}>
                            Hire Me
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
