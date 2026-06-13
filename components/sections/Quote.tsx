"use client";

import Image from "next/image";
import { useState } from "react";

export function Quote() {
    const [sliderPosition, setSliderPosition] = useState(50);

    return (
        <section className="relative w-full bg-white pt-12 md:pt-20 pb-20 md:pb-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center max-w-[95%] sm:max-w-4xl mx-auto mb-8 md:mb-24 px-2">
                    <h4 className="text-[1.1rem] sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-700 tracking-tight leading-[1.3] text-balance">
                        Bermula dari mimpi, berakhir dengan
                        <br />
                        kehangatan ruang yang nyaman bagi Anda.
                    </h4>
                </div>
            </div>

            {/* Interactive Image Slider */}
            <div className="relative w-full max-w-5xl mx-auto h-[40vh] md:h-[65vh] px-4 md:px-0 select-none group">
                <div
                    className="relative w-full h-full overflow-hidden rounded-xl cursor-ew-resize touch-pan-y"
                    onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                        setSliderPosition((x / rect.width) * 100);
                    }}
                    onTouchMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
                        setSliderPosition((x / rect.width) * 100);
                    }}
                    onMouseLeave={() => setSliderPosition(50)}
                >
                    {/* Underlying Render Image (After) */}
                    <div className="absolute inset-0 w-full h-full">
                        <Image
                            src="/images/quote/after.png"
                            alt="Architecture Final Render"
                            fill
                            sizes="(max-width: 1024px) 100vw, 1024px"
                            className="object-cover md:object-contain object-center scale-95 md:scale-100"
                            priority={false}
                        />
                    </div>

                    {/* Overlay Sketch Image (Before) */}
                    <div
                        className="absolute inset-0 w-full h-full"
                        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                    >
                        <Image
                            src="/images/quote/before.png"
                            alt="Architecture Sketch"
                            fill
                            sizes="(max-width: 1024px) 100vw, 1024px"
                            className="object-cover md:object-contain object-center scale-95 md:scale-100"
                            priority={false}
                        />
                    </div>

                    {/* Slider Drag Handle */}
                    <div
                        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize mix-blend-difference"
                        style={{ left: `${sliderPosition}%` }}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-black font-medium shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:scale-110 transition-transform">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 18l-6-6 6-6" /><path d="M9 18l6-6-6-6" />
                            </svg>
                        </div>
                    </div>
                </div>


            </div>

            {/* Gesture/Swipe Indicator */}
            <div className="mt-8 flex flex-col items-center justify-center gap-2 text-gray-400/80 animate-pulse select-none">
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                </div>
                <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium">
                    Geser untuk membandingkan
                </span>
            </div>

            {/* Subtitle 
            <div className="max-w-3xl mx-auto px-6 mt-16 pb-8 text-center">
                <p className="text-lg md:text-l lg:text-2xl font-light text-red-900 leading-relaxed italic">
                    "Rumah bukan hanya tentang atap dan dinding, tapi tentang kehangatan pelukan yang kita bagi di dalamnya"
                </p>
            </div>
            */}
        </section>
    );
}
