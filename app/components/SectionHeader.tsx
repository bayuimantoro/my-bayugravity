"use client";

interface SectionHeaderProps {
    label: string;
    title: string;
}

export function SectionHeader({ label, title }: SectionHeaderProps) {
    return (
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span
                style={{
                    color: "#dc2626",
                    fontSize: "12px",
                    fontWeight: "600",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                }}
            >
                {label}
            </span>
            <h2 style={{ fontSize: "32px", fontWeight: "bold", marginTop: "8px" }}>{title}</h2>
        </div>
    );
}
