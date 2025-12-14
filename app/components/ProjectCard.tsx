"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { Project } from "../data/projects";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const textMuted = isDark ? "#9ca3af" : "#6b7280";
    const bgCard = isDark ? "#1a1a1a" : "#ffffff";
    const borderColor = isDark ? "rgba(255,255,255,0.08)" : "#e5e7eb";

    return (
        <div
            style={{
                backgroundColor: bgCard,
                border: `1px solid ${borderColor}`,
                borderRadius: "16px",
                overflow: "hidden",
                transition: "transform 0.3s",
                boxShadow: isDark ? "none" : "0 1px 3px rgba(0,0,0,0.1)",
            }}
        >
            <div
                style={{
                    height: "160px",
                    background: "linear-gradient(135deg, #dc2626, #991b1b)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <span style={{ fontSize: "48px" }}>{project.image}</span>
            </div>
            <div style={{ padding: "20px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}>{project.title}</h3>
                <p style={{ fontSize: "13px", color: textMuted, marginBottom: "12px", lineHeight: "1.5" }}>
                    {project.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
                    {project.tags.map((tag, i) => (
                        <span
                            key={i}
                            style={{
                                padding: "4px 10px",
                                backgroundColor: isDark ? "#262626" : "#f3f4f6",
                                borderRadius: "6px",
                                fontSize: "11px",
                                color: textMuted,
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <Link
                    href={`/project/${project.id}`}
                    style={{ color: "#dc2626", fontSize: "13px", fontWeight: "500", textDecoration: "none" }}
                >
                    View Project →
                </Link>
            </div>
        </div>
    );
}
