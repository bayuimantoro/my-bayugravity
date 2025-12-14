"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ThemeProvider,
    useTheme,
    Navbar,
    SectionHeader,
    Card,
    Footer,
    ImageUpload,
    ImageGallery,
    StoredImage,
    clearAllStoredImages,
} from "../components";

function UploadContent() {
    const router = useRouter();
    const { theme } = useTheme();
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedImage, setSelectedImage] = useState<StoredImage | null>(null);

    const isDark = theme === "dark";
    const bgMain = isDark ? "#0a0a0a" : "#ffffff";
    const bgAlt = isDark ? "#0f0f0f" : "#f9fafb";
    const textMain = isDark ? "#ffffff" : "#1a1a1a";
    const textMuted = isDark ? "#9ca3af" : "#6b7280";

    const handleUploadComplete = () => {
        setRefreshKey((prev) => prev + 1);
    };

    const handleClearAll = () => {
        if (confirm("Are you sure you want to delete all images?")) {
            clearAllStoredImages();
            setRefreshKey((prev) => prev + 1);
            setSelectedImage(null);
        }
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: bgMain, color: textMain }}>
            {/* Navbar */}
            <Navbar isScrolled={true} showBackButton onBack={() => router.push("/")} />

            {/* Header */}
            <section style={{ paddingTop: "100px", paddingBottom: "40px", backgroundColor: bgAlt }}>
                <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 20px", textAlign: "center" }}>
                    <span style={{ color: "#dc2626", fontSize: "12px", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase" }}>
                        Media Manager
                    </span>
                    <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: "bold", marginTop: "8px", marginBottom: "16px" }}>
                        Upload Images
                    </h1>
                    <p style={{ color: textMuted, maxWidth: "500px", margin: "0 auto" }}>
                        Upload and manage your images. Images are stored locally in your browser using Web Storage.
                    </p>
                </div>
            </section>

            {/* Upload Section */}
            <section style={{ padding: "60px 0", backgroundColor: bgMain }}>
                <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}>
                    <div style={{ display: "grid", gap: "32px" }}>
                        {/* Upload Form */}
                        <Card padding="lg">
                            <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px" }}>
                                📤 Upload New Image
                            </h2>
                            <ImageUpload onUpload={handleUploadComplete} maxSizeMB={5} />
                        </Card>

                        {/* Gallery */}
                        <Card padding="lg">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                                <h2 style={{ fontSize: "18px", fontWeight: "600" }}>🖼️ Image Gallery</h2>
                                <button
                                    onClick={handleClearAll}
                                    style={{
                                        padding: "8px 16px",
                                        borderRadius: "8px",
                                        border: "none",
                                        backgroundColor: "rgba(220, 38, 38, 0.1)",
                                        color: "#dc2626",
                                        cursor: "pointer",
                                        fontSize: "13px",
                                        fontWeight: "500",
                                    }}
                                >
                                    Clear All
                                </button>
                            </div>
                            <ImageGallery
                                key={refreshKey}
                                onImageSelect={(img) => setSelectedImage(img)}
                            />
                        </Card>

                        {/* Selected Image Preview */}
                        {selectedImage && (
                            <Card padding="lg">
                                <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px" }}>
                                    📋 Selected Image Details
                                </h2>
                                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "24px", alignItems: "start" }}>
                                    <img
                                        src={selectedImage.data}
                                        alt={selectedImage.name}
                                        style={{
                                            width: "200px",
                                            height: "200px",
                                            objectFit: "cover",
                                            borderRadius: "12px",
                                        }}
                                    />
                                    <div>
                                        <div style={{ marginBottom: "16px" }}>
                                            <p style={{ fontSize: "12px", color: textMuted, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>
                                                File Name
                                            </p>
                                            <p style={{ fontWeight: "500", wordBreak: "break-all" }}>{selectedImage.name}</p>
                                        </div>
                                        <div style={{ marginBottom: "16px" }}>
                                            <p style={{ fontSize: "12px", color: textMuted, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>
                                                File Type
                                            </p>
                                            <p style={{ fontWeight: "500" }}>{selectedImage.type}</p>
                                        </div>
                                        <div style={{ marginBottom: "16px" }}>
                                            <p style={{ fontSize: "12px", color: textMuted, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>
                                                File Size
                                            </p>
                                            <p style={{ fontWeight: "500" }}>{(selectedImage.size / 1024).toFixed(1)} KB</p>
                                        </div>
                                        <div style={{ marginBottom: "16px" }}>
                                            <p style={{ fontSize: "12px", color: textMuted, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>
                                                Image ID
                                            </p>
                                            <p style={{ fontWeight: "500", fontSize: "12px", fontFamily: "monospace" }}>{selectedImage.id}</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(selectedImage.data);
                                                alert("Image data copied to clipboard!");
                                            }}
                                            className="btn btn-primary"
                                            style={{ marginTop: "8px" }}
                                        >
                                            Copy Base64 Data
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section style={{ padding: "40px 0", backgroundColor: bgAlt }}>
                <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}>
                    <Card padding="md">
                        <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "12px", color: "#dc2626" }}>
                            ℹ️ About Web Storage
                        </h3>
                        <ul style={{ color: textMuted, fontSize: "14px", lineHeight: "1.8", paddingLeft: "20px" }}>
                            <li>Images are stored locally in your browser using localStorage</li>
                            <li>Data persists even after closing the browser</li>
                            <li>Storage limit is approximately 5-10MB depending on browser</li>
                            <li>Images are not uploaded to any server - fully private</li>
                            <li>Clearing browser data will remove all stored images</li>
                        </ul>
                    </Card>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default function UploadPage() {
    return (
        <ThemeProvider>
            <UploadContent />
        </ThemeProvider>
    );
}
