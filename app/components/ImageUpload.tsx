"use client";

import { useState, useRef, ChangeEvent } from "react";
import { useTheme } from "./ThemeProvider";

interface StoredImage {
    id: string;
    name: string;
    data: string;
    size: number;
    type: string;
    uploadedAt: string;
}

interface ImageUploadProps {
    onUpload?: (image: StoredImage) => void;
    maxSizeMB?: number;
}

export function ImageUpload({ onUpload, maxSizeMB = 5 }: ImageUploadProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const textMuted = isDark ? "#9ca3af" : "#6b7280";
    const borderColor = isDark ? "rgba(255,255,255,0.15)" : "#e5e7eb";
    const bgCard = isDark ? "#1a1a1a" : "#ffffff";

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            processFile(files[0]);
        }
    };

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            processFile(files[0]);
        }
    };

    const processFile = (file: File) => {
        setError(null);

        // Validate file type
        if (!file.type.startsWith("image/")) {
            setError("Please select an image file (JPEG, PNG, GIF, etc.)");
            return;
        }

        // Validate file size
        const maxBytes = maxSizeMB * 1024 * 1024;
        if (file.size > maxBytes) {
            setError(`File size must be less than ${maxSizeMB}MB`);
            return;
        }

        setIsUploading(true);

        const reader = new FileReader();
        reader.onload = (e) => {
            const base64Data = e.target?.result as string;

            // Create stored image object
            const storedImage: StoredImage = {
                id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                name: file.name,
                data: base64Data,
                size: file.size,
                type: file.type,
                uploadedAt: new Date().toISOString(),
            };

            // Save to localStorage
            try {
                const existingImages = getStoredImages();
                existingImages.push(storedImage);
                localStorage.setItem("portfolio_images", JSON.stringify(existingImages));

                setPreview(base64Data);
                onUpload?.(storedImage);
                setIsUploading(false);
            } catch (err) {
                setError("Failed to save image. Storage might be full.");
                setIsUploading(false);
            }
        };

        reader.onerror = () => {
            setError("Failed to read file");
            setIsUploading(false);
        };

        reader.readAsDataURL(file);
    };

    const getStoredImages = (): StoredImage[] => {
        try {
            const stored = localStorage.getItem("portfolio_images");
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    };

    const clearPreview = () => {
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div>
            {/* Upload Area */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{
                    border: `2px dashed ${isDragging ? "#dc2626" : borderColor}`,
                    borderRadius: "16px",
                    padding: "40px 20px",
                    textAlign: "center",
                    cursor: "pointer",
                    backgroundColor: isDragging ? (isDark ? "rgba(220,38,38,0.1)" : "rgba(220,38,38,0.05)") : bgCard,
                    transition: "all 0.3s",
                }}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: "none" }}
                    aria-label="Upload image file"
                    title="Select an image to upload"
                />

                {isUploading ? (
                    <div>
                        <div style={{ fontSize: "32px", marginBottom: "12px" }}>⏳</div>
                        <p style={{ color: textMuted }}>Uploading...</p>
                    </div>
                ) : preview ? (
                    <div>
                        <img
                            src={preview}
                            alt="Preview"
                            style={{
                                maxWidth: "200px",
                                maxHeight: "200px",
                                borderRadius: "12px",
                                marginBottom: "12px",
                                objectFit: "cover",
                            }}
                        />
                        <p style={{ color: "#22c55e", fontWeight: "500", marginBottom: "8px" }}>✓ Image uploaded!</p>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                clearPreview();
                            }}
                            style={{
                                padding: "8px 16px",
                                borderRadius: "8px",
                                border: "none",
                                backgroundColor: isDark ? "#262626" : "#f3f4f6",
                                color: textMuted,
                                cursor: "pointer",
                                fontSize: "13px",
                            }}
                        >
                            Upload Another
                        </button>
                    </div>
                ) : (
                    <div>
                        <div style={{ fontSize: "48px", marginBottom: "16px" }}>📷</div>
                        <p style={{ fontWeight: "600", marginBottom: "8px" }}>
                            Drop your image here or <span style={{ color: "#dc2626" }}>browse</span>
                        </p>
                        <p style={{ color: textMuted, fontSize: "13px" }}>
                            Supports: JPEG, PNG, GIF, WebP (Max {maxSizeMB}MB)
                        </p>
                    </div>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <div
                    style={{
                        marginTop: "12px",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        backgroundColor: "rgba(220, 38, 38, 0.1)",
                        color: "#dc2626",
                        fontSize: "13px",
                    }}
                >
                    ⚠️ {error}
                </div>
            )}
        </div>
    );
}

// Helper function to get all stored images
export function getStoredImages(): StoredImage[] {
    if (typeof window === "undefined") return [];
    try {
        const stored = localStorage.getItem("portfolio_images");
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

// Helper function to delete a stored image
export function deleteStoredImage(id: string): boolean {
    try {
        const images = getStoredImages();
        const filtered = images.filter((img) => img.id !== id);
        localStorage.setItem("portfolio_images", JSON.stringify(filtered));
        return true;
    } catch {
        return false;
    }
}

// Helper function to clear all stored images
export function clearAllStoredImages(): boolean {
    try {
        localStorage.removeItem("portfolio_images");
        return true;
    } catch {
        return false;
    }
}

export type { StoredImage };
