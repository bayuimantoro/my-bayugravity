export interface Project {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    tags: string[];
    image: string;
    features: string[];
    technologies: string[];
    demoUrl: string;
    githubUrl: string;
    year: string;
    role: string;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "Full-stack marketplace with payment integration",
        longDescription: "A comprehensive e-commerce solution featuring real-time inventory management, secure payment processing with Stripe, and an intuitive admin dashboard. The platform supports multiple vendors, product variants, and automated order fulfillment workflows.",
        tags: ["Next.js", "TypeScript", "Prisma"],
        image: "🛒",
        features: [
            "Multi-vendor marketplace",
            "Secure payment with Stripe",
            "Real-time inventory tracking",
            "Order management system",
            "Customer reviews & ratings",
            "Admin analytics dashboard"
        ],
        technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "TailwindCSS", "Redis"],
        demoUrl: "https://demo.example.com",
        githubUrl: "https://github.com/bayuimantoro",
        year: "2024",
        role: "Full Stack Developer"
    },
    {
        id: 2,
        title: "AI Dashboard",
        description: "Analytics dashboard with ML insights",
        longDescription: "An intelligent analytics platform that leverages machine learning to provide actionable business insights. Features include predictive analytics, anomaly detection, and automated report generation with natural language summaries.",
        tags: ["React", "Python", "TensorFlow"],
        image: "🤖",
        features: [
            "Predictive analytics",
            "Real-time data visualization",
            "Anomaly detection alerts",
            "Natural language reports",
            "Custom dashboard builder",
            "Data export capabilities"
        ],
        technologies: ["React", "Python", "TensorFlow", "FastAPI", "D3.js", "PostgreSQL", "Docker"],
        demoUrl: "https://demo.example.com",
        githubUrl: "https://github.com/bayuimantoro",
        year: "2023",
        role: "Lead Developer"
    },
    {
        id: 3,
        title: "Mobile Banking App",
        description: "Secure fintech with biometric auth",
        longDescription: "A mobile banking application with bank-grade security featuring biometric authentication, real-time transaction monitoring, and AI-powered fraud detection. The app provides seamless money transfers and bill payments.",
        tags: ["React Native", "Node.js"],
        image: "💳",
        features: [
            "Biometric authentication",
            "Real-time transactions",
            "AI fraud detection",
            "Bill payments",
            "Budget tracking",
            "Investment portfolio"
        ],
        technologies: ["React Native", "Node.js", "MongoDB", "Redis", "AWS", "Firebase"],
        demoUrl: "https://demo.example.com",
        githubUrl: "https://github.com/bayuimantoro",
        year: "2023",
        role: "Mobile Developer"
    },
    {
        id: 4,
        title: "Social Media Platform",
        description: "Real-time networking with live streaming",
        longDescription: "A modern social networking platform with real-time messaging, live video streaming, and content creation tools. Features include stories, reels, and an advanced content recommendation algorithm.",
        tags: ["Vue.js", "Firebase"],
        image: "💬",
        features: [
            "Real-time messaging",
            "Live video streaming",
            "Stories & reels",
            "Content recommendations",
            "Group communities",
            "Creator monetization"
        ],
        technologies: ["Vue.js", "Firebase", "WebRTC", "Node.js", "FFmpeg", "Redis"],
        demoUrl: "https://demo.example.com",
        githubUrl: "https://github.com/bayuimantoro",
        year: "2022",
        role: "Frontend Developer"
    }
];

export function getProjectById(id: number): Project | undefined {
    return projects.find(p => p.id === id);
}
