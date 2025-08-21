// Create this file: src/components/PlaceholderImage.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

interface PlaceholderImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    className?: string;
    unoptimized?: boolean;
}

export function PlaceholderImage({
    src,
    alt,
    width,
    height,
    fill,
    className,
    unoptimized = true,
    ...props
}: PlaceholderImageProps) {
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleImageError = () => {
        setImageError(true);
        setIsLoading(false);
    };

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    if (imageError) {
        return (
            <div
                className={`bg-gray-200 dark:bg-gray-800 flex items-center justify-center ${className}`}
            >
                <div className="text-center p-4">
                    <div className="text-3xl mb-2">🏛️</div>
                    <span className="text-gray-400 text-sm">Heritage Site</span>
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            {isLoading && (
                <div
                    className={`absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse ${className}`}
                />
            )}
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                fill={fill}
                className={className}
                unoptimized={unoptimized}
                onError={handleImageError}
                onLoad={handleImageLoad}
                {...props}
            />
        </div>
    );
}
