"use client";

import { useState, useEffect } from "react";
import {
  ThemeProvider,
  useTheme,
  Navbar,
  ProjectCard,
  SkillBar,
  SectionHeader,
  Card,
  Footer,
} from "./components";
import { projects } from "./data/projects";

const skills = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js", level: 88 },
  { name: "Python", level: 85 },
  { name: "UI/UX Design", level: 82 },
  { name: "Database", level: 80 },
];

const experiences = [
  {
    role: "Senior Full Stack Developer",
    company: "Tech Corp Indonesia",
    period: "2022 - Present",
    description: "Leading enterprise-scale web apps",
  },
  {
    role: "Frontend Developer",
    company: "Startup Digital",
    period: "2020 - 2022",
    description: "Built responsive mobile-first apps",
  },
  {
    role: "Junior Developer",
    company: "Agency Creative",
    period: "2018 - 2020",
    description: "Developed and maintained websites",
  },
];

function PortfolioContent() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ["home", "about", "projects", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const isDark = theme === "dark";
  const bgMain = isDark ? "#0a0a0a" : "#ffffff";
  const bgAlt = isDark ? "#0f0f0f" : "#f9fafb";
  const bgCard = isDark ? "#1a1a1a" : "#ffffff";
  const textMain = isDark ? "#ffffff" : "#1a1a1a";
  const textMuted = isDark ? "#9ca3af" : "#6b7280";
  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "#e5e7eb";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: bgMain, color: textMain }}>
      {/* Navbar */}
      <Navbar
        isScrolled={isScrolled}
        activeSection={activeSection}
        onNavigate={scrollTo}
      />

      {/* Hero */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "64px", position: "relative" }}>
        <div style={{ position: "absolute", top: "20%", left: "30%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(220,38,38,0.12) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px", textAlign: "center", position: "relative", zIndex: 10 }}>
          {/* Avatar */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ width: "120px", height: "120px", margin: "0 auto", borderRadius: "50%", background: "linear-gradient(135deg, #dc2626, #b91c1c)", padding: "3px" }}>
              <div style={{ width: "100%", height: "100%", borderRadius: "50%", backgroundColor: bgMain, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px" }}>
                👨‍💻
              </div>
            </div>
          </div>
          <p style={{ color: "#dc2626", fontSize: "12px", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>
            Full Stack Developer
          </p>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 56px)", fontWeight: "bold", marginBottom: "16px", lineHeight: "1.2" }}>
            Hi, I&apos;m <span style={{ color: "#dc2626" }}>Bayu Imantoro</span>
          </h1>
          <p style={{ color: textMuted, fontSize: "18px", maxWidth: "500px", margin: "0 auto 32px", lineHeight: "1.6" }}>
            Passionate developer crafting beautiful digital experiences.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "48px" }}>
            <button className="btn btn-primary" onClick={() => scrollTo("projects")}>View My Work</button>
            <button className="btn btn-outline" onClick={() => scrollTo("contact")}>Get In Touch</button>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "48px" }}>
            {[{ v: "5+", l: "Years" }, { v: "50+", l: "Projects" }, { v: "30+", l: "Clients" }].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "32px", fontWeight: "bold", color: "#dc2626" }}>{s.v}</div>
                <div style={{ fontSize: "14px", color: textMuted }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ padding: "80px 0", backgroundColor: bgAlt }}>
        <div className="container-custom">
          <SectionHeader label="About Me" title="Passionate Developer" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "48px" }}>
            {/* Skills */}
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "24px" }}>My Skills</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {skills.map((skill, idx) => (
                  <SkillBar key={idx} name={skill.name} level={skill.level} />
                ))}
              </div>
            </div>
            {/* Experience */}
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "24px" }}>Experience</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {experiences.map((exp, idx) => (
                  <div key={idx} style={{ paddingLeft: "20px", borderLeft: "2px solid rgba(220,38,38,0.3)", position: "relative" }}>
                    <div style={{ position: "absolute", left: "-5px", top: "4px", width: "8px", height: "8px", backgroundColor: "#dc2626", borderRadius: "50%" }} />
                    <Card padding="md">
                      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "4px" }}>
                        <span style={{ fontWeight: "600", color: "#dc2626", fontSize: "14px" }}>{exp.role}</span>
                        <span style={{ fontSize: "11px", color: textMuted, backgroundColor: isDark ? "#262626" : "#f3f4f6", padding: "2px 8px", borderRadius: "4px" }}>{exp.period}</span>
                      </div>
                      <p style={{ fontSize: "13px", color: textMuted, marginBottom: "2px" }}>{exp.company}</p>
                      <p style={{ fontSize: "12px", color: isDark ? "#6b7280" : "#9ca3af" }}>{exp.description}</p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={{ padding: "80px 0", backgroundColor: bgMain }}>
        <div className="container-custom">
          <SectionHeader label="Portfolio" title="Featured Projects" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: "80px 0", backgroundColor: bgAlt }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", padding: "0 20px" }}>
          <SectionHeader label="Contact" title="Let's Work Together" />
          <p style={{ color: textMuted, textAlign: "center", marginTop: "-32px", marginBottom: "32px" }}>
            Have a project? Let&apos;s create something amazing.
          </p>
          <Card padding="lg">
            <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: textMuted, marginBottom: "6px" }}>Name</label>
                  <input type="text" placeholder="Your name" className="input-field" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: textMuted, marginBottom: "6px" }}>Email</label>
                  <input type="email" placeholder="your@email.com" className="input-field" />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: textMuted, marginBottom: "6px" }}>Subject</label>
                <input type="text" placeholder="Project inquiry" className="input-field" />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: textMuted, marginBottom: "6px" }}>Message</label>
                <textarea rows={4} placeholder="Tell me about your project..." className="input-field" style={{ resize: "none" }} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "14px" }}>
                Send Message
              </button>
            </form>
          </Card>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "32px" }}>
            {["📧", "💼", "🐙", "📸"].map((icon, idx) => (
              <a key={idx} href="#" style={{ width: "44px", height: "44px", borderRadius: "50%", backgroundColor: bgCard, border: `1px solid ${borderColor}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", textDecoration: "none", transition: "background 0.2s" }}>
                {icon}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
}
