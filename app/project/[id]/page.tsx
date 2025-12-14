"use client";

import { useParams, useRouter } from "next/navigation";
import {
    ThemeProvider,
    useTheme,
    Navbar,
    Card,
    SectionHeader,
    Footer,
} from "../../components";
import { getProjectById } from "../../data/projects";

function ProjectDetailContent() {
    const params = useParams();
    const router = useRouter();
    const { theme } = useTheme();

    const projectId = Number(params.id);
    const project = getProjectById(projectId);

    const isDark = theme === "dark";
    const bgMain = isDark ? "#0a0a0a" : "#ffffff";
    const bgAlt = isDark ? "#0f0f0f" : "#f9fafb";
    const textMain = isDark ? "#ffffff" : "#1a1a1a";
    const textMuted = isDark ? "#9ca3af" : "#6b7280";

    if (!project) {
        return (
            <div style={{ minHeight: "100vh", backgroundColor: bgMain, color: textMain, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center" }}>
                    <h1 style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</h1>
                    <h2 style={{ fontSize: "24px", marginBottom: "8px" }}>Project Not Found</h2>
                    <p style={{ color: textMuted, marginBottom: "24px" }}>The project you&apos;re looking for doesn&apos;t exist.</p>
                    <button className="btn btn-primary" onClick={() => router.push("/")}>
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: "100vh", backgroundColor: bgMain, color: textMain }}>
            {/* Navbar */}
            <Navbar
                isScrolled={true}
                showBackButton
                onBack={() => router.push("/")}
            />

            {/* Hero Section */}
            <section style={{ paddingTop: "120px", paddingBottom: "60px", backgroundColor: bgAlt }}>
                <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 20px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "48px", alignItems: "center" }}>
                        {/* Project Image */}
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <div style={{ width: "200px", height: "200px", background: "linear-gradient(135deg, #dc2626, #991b1b)", borderRadius: "24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "80px", boxShadow: "0 20px 40px rgba(220, 38, 38, 0.2)" }}>
                                {project.image}
                            </div>
                        </div>

                        {/* Project Info */}
                        <div style={{ textAlign: "center" }}>
                            <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
                                {project.tags.map((tag, i) => (
                                    <span key={i} style={{ padding: "6px 14px", backgroundColor: "rgba(220, 38, 38, 0.15)", color: "#dc2626", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: "bold", marginBottom: "16px" }}>{project.title}</h1>
                            <p style={{ color: textMuted, fontSize: "18px", maxWidth: "600px", margin: "0 auto 24px", lineHeight: "1.6" }}>
                                {project.longDescription}
                            </p>
                            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                    Live Demo →
                                </a>
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                                    View Code
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Details Section */}
            <section style={{ padding: "60px 0", backgroundColor: bgMain }}>
                <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 20px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
                        {/* Project Info Card */}
                        <Card padding="md">
                            <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px", color: "#dc2626" }}>Project Info</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                <div>
                                    <p style={{ fontSize: "12px", color: textMuted, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Year</p>
                                    <p style={{ fontWeight: "500" }}>{project.year}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: "12px", color: textMuted, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Role</p>
                                    <p style={{ fontWeight: "500" }}>{project.role}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: "12px", color: textMuted, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Category</p>
                                    <p style={{ fontWeight: "500" }}>{project.tags[0]}</p>
                                </div>
                            </div>
                        </Card>

                        {/* Features Card */}
                        <Card padding="md">
                            <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px", color: "#dc2626" }}>Key Features</h3>
                            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                                {project.features.map((feature, i) => (
                                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px" }}>
                                        <span style={{ color: "#22c55e" }}>✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        {/* Technologies Card */}
                        <Card padding="md">
                            <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px", color: "#dc2626" }}>Technologies</h3>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                {project.technologies.map((tech, i) => (
                                    <span key={i} style={{ padding: "8px 16px", backgroundColor: isDark ? "#262626" : "#f3f4f6", borderRadius: "8px", fontSize: "13px", fontWeight: "500" }}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ padding: "60px 0", backgroundColor: bgAlt }}>
                <div style={{ maxWidth: "640px", margin: "0 auto", padding: "0 20px", textAlign: "center" }}>
                    <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "16px" }}>Interested in working together?</h2>
                    <p style={{ color: textMuted, marginBottom: "24px" }}>Let&apos;s discuss your next project and bring your ideas to life.</p>
                    <button className="btn btn-primary" onClick={() => router.push("/#contact")}>
                        Get In Touch
                    </button>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default function ProjectPage() {
    return (
        <ThemeProvider>
            <ProjectDetailContent />
        </ThemeProvider>
    );
}
