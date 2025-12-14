"use client";

import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { getStoredImages, deleteStoredImage, StoredImage } from "./ImageUpload";

interface ImageGalleryProps {
    onImageSelect?: (image: StoredImage) => void;
    showDelete?: boolean;
}

export function ImageGallery({ onImageSelect, showDelete = true }: ImageGalleryProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [images, setImages] = useState<StoredImage[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const textMuted = isDark ? "#9ca3af" : "#6b7280";
    const borderColor = isDark ? "rgba(255,255,255,0.1)" : "#e5e7eb";

    useEffect(() => {
        loadImages();
    }, []);

    const loadImages = () => {
        setImages(getStoredImages());
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this image?")) {
            deleteStoredImage(id);
            loadImages();
        }
    };

    const handleSelect = (image: StoredImage) => {
        setSelectedId(image.id);
        onImageSelect?.(image);
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (images.length === 0) {
        return (
            <div
                style={{
                    padding: "40px",
                    textAlign: "center",
                    backgroundColor: isDark ? "#1a1a1a" : "#f9fafb",
                    borderRadius: "16px",
                    border: `1px solid ${borderColor}`,
                }}
            >
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🖼️</div>
                <p style={{ color: textMuted }}>No images uploaded yet</p>
            </div>
        );
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <p style={{ color: textMuted, fontSize: "14px" }}>{images.length} image(s) stored</p>
                <button
                    onClick={loadImages}
                    style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        border: "none",
                        backgroundColor: isDark ? "#262626" : "#f3f4f6",
                        color: textMuted,
                        cursor: "pointer",
                        fontSize: "12px",
                    }}
                >
                    🔄 Refresh
                </button>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                    gap: "16px",
                }}
            >
                {images.map((image) => (
                    <div
                        key={image.id}
                        onClick={() => handleSelect(image)}
                        style={{
                            position: "relative",
                            borderRadius: "12px",
                            overflow: "hidden",
                            border: selectedId === image.id ? "2px solid #dc2626" : `1px solid ${borderColor}`,
                            cursor: "pointer",
                            backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
                            transition: "all 0.2s",
                        }}
                    >
                        <img
                            src={image.data}
                            alt={image.name}
                            style={{
                                width: "100%",
                                height: "120px",
                                objectFit: "cover",
                            }}
                        />
                        <div style={{ padding: "10px" }}>
                            <p
                                style={{
                                    fontSize: "12px",
                                    fontWeight: "500",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    marginBottom: "4px",
                                }}
                            >
                                {image.name}
                            </p>
                            <p style={{ fontSize: "10px", color: textMuted }}>{formatFileSize(image.size)}</p>
                            <p style={{ fontSize: "10px", color: textMuted }}>{formatDate(image.uploadedAt)}</p>
                        </div>

                        {showDelete && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(image.id);
                                }}
                                style={{
                                    position: "absolute",
                                    top: "8px",
                                    right: "8px",
                                    width: "28px",
                                    height: "28px",
                                    borderRadius: "50%",
                                    border: "none",
                                    backgroundColor: "rgba(220, 38, 38, 0.9)",
                                    color: "#fff",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                ×
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
