"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface BeforeAfterSliderProps {
    before: string;
    after: string;
    title?: string;
}

export function BeforeAfterSlider({ before, after, title }: BeforeAfterSliderProps) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = (x / rect.width) * 100;

        // Clamp between 0 and 100
        const clampedPercentage = Math.max(0, Math.min(100, percentage));
        setSliderPosition(clampedPercentage);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        handleMove(e.clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        handleMove(e.touches[0].clientX);
    };

    const handleStart = () => {
        setIsDragging(true);
    };

    const handleEnd = () => {
        setIsDragging(false);
    };

    return (
        <div className="space-y-4">
            {title && (
                <h3 className="text-lg md:text-xl font-medium text-charcoal">
                    {title}
                </h3>
            )}

            <div
                ref={containerRef}
                className="relative aspect-[16/10] w-full overflow-hidden rounded-xl cursor-ew-resize select-none bg-charcoal/5"
                onMouseMove={handleMouseMove}
                onMouseDown={handleStart}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                onTouchMove={handleTouchMove}
                onTouchStart={handleStart}
                onTouchEnd={handleEnd}
            >
                {/* After Image (Background) */}
                <div className="absolute inset-0">
                    <Image
                        src={after}
                        alt="After"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1280px) 100vw, 1280px"
                    />
                    {/* After Label */}
                    <div className="absolute top-4 right-4 bg-teal text-white px-3 py-1.5 rounded-full text-xs md:text-sm font-medium shadow-lg">
                        After
                    </div>
                </div>

                {/* Before Image (Clipped) */}
                <div
                    className="absolute inset-0"
                    style={{
                        clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                    }}
                >
                    <Image
                        src={before}
                        alt="Before"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1280px) 100vw, 1280px"
                    />
                    {/* Before Label */}
                    <div className="absolute top-4 left-4 bg-charcoal/80 text-white px-3 py-1.5 rounded-full text-xs md:text-sm font-medium shadow-lg">
                        Before
                    </div>
                </div>

                {/* Slider Handle */}
                <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl"
                    style={{
                        left: `${sliderPosition}%`,
                        transform: "translateX(-50%)",
                    }}
                >
                    {/* Handle Circle */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Left Arrow */}
                        <svg
                            className="w-3 h-3 text-charcoal absolute left-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        {/* Divider */}
                        <div className="w-0.5 h-6 bg-charcoal/40" />
                        {/* Right Arrow */}
                        <svg
                            className="w-3 h-3 text-charcoal absolute right-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </motion.div>
                </div>

                {/* Instruction Hint */}
                {!isDragging && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs md:text-sm pointer-events-none"
                    >
                        <span className="hidden md:inline">Drag slider atau klik untuk membandingkan</span>
                        <span className="md:hidden">Geser untuk membandingkan</span>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
