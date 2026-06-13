"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";

export function Hero() {
    const imageRef = useRef<HTMLDivElement>(null);
    const [showContent, setShowContent] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        // Calculate how long to wait before showing content
        let delay = 100; // Default minimal delay for instant transitions

        if (typeof window !== "undefined") {
            const hasVisited = sessionStorage.getItem("hasVisitedAskra");
            if (!hasVisited) {
                const loadTime = (window as any).__appLoadTime;
                if (loadTime) {
                    const elapsed = Date.now() - loadTime;
                    // If it's the initial load, wait for 2000ms preloader + 200ms extra
                    if (elapsed < 2000) {
                        delay = (2000 - elapsed) + 200;
                    }
                }
            }
        }

        const contentTimer = setTimeout(() => {
            setShowContent(true);
        }, delay);

        return () => clearTimeout(contentTimer);
    }, []);


    return (
        <section
            id="hero"
            className="relative h-[110vh] md:h-screen overflow-hidden"
            style={{ backgroundColor: '#1a1a1a' }}
        >

            {/* Full-Screen Background Image - FIXED POSITION */}
            <motion.div
                ref={imageRef}
                className="fixed inset-0 w-full h-full z-0 pointer-events-none"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={showContent ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <Image
                    src="/images/hero/image-hero.jpg"
                    alt="Desain Bangun Renovasi - Hero"
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                />
                {/* Dark gradient overlay - stronger at bottom-left for text legibility */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.15) 100%)'
                    }}
                />
            </motion.div>

            {/* ── TOP ROW: SHAPING ─── line ─── EXCELLENCE ── */}
            <motion.div
                className="absolute top-0 left-0 right-0 z-10 flex items-center px-6 md:px-10"
                style={{ paddingTop: '5.5rem' }}  /* sits just below the navbar */
                initial={{ opacity: 0 }}
                animate={showContent ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                {/* Left label */}
                <span
                    className="text-white/60 text-xs tracking-[0.35em] uppercase shrink-0"
                    style={{ fontFamily: 'var(--font-sans, sans-serif)' }}
                >
                    DESAIN
                </span>

                {/* Left decorative line */}
                <motion.div
                    className="flex-1 h-px mx-4"
                    style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={showContent ? { scaleX: 1 } : {}}
                    transition={{ duration: 1.2, delay: 0.6 }}
                />

                {/* Center label */}
                <span
                    className="text-white/60 text-xs tracking-[0.35em] uppercase shrink-0"
                    style={{ fontFamily: 'var(--font-sans, sans-serif)' }}
                >
                    BANGUN
                </span>

                {/* Right decorative line */}
                <motion.div
                    className="flex-1 h-px mx-4"
                    style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
                    initial={{ scaleX: 0, originX: 1 }}
                    animate={showContent ? { scaleX: 1 } : {}}
                    transition={{ duration: 1.2, delay: 0.6 }}
                />

                {/* Right label */}
                <span
                    className="text-white/60 text-xs tracking-[0.35em] uppercase shrink-0"
                    style={{ fontFamily: 'var(--font-sans, sans-serif)' }}
                >
                    RENOVASI
                </span>
            </motion.div>

            {/* ── BOTTOM-LEFT: Headline + CTA ── */}
            <motion.div
                className="absolute bottom-[15vh] md:bottom-0 left-0 z-10 px-6 pb-20 md:px-10 md:pb-24 max-w-[90vw] md:max-w-5xl lg:max-w-[70vw]"
                initial={{ opacity: 0, y: 40 }}
                animate={showContent ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <h2
                    className="text-white font-semibold tracking-tight mb-10 w-full"
                    style={{
                        fontSize: 'clamp(1.75rem, 5vw, 3rem)',
                        lineHeight: '1.2'
                    }}
                >
                    Mewujudkan Hunian Impian Melalui<br className="hidden md:block" />
                    <span className="md:hidden"> </span>Desain Presisi, Bangunan Kokoh &<br className="hidden md:block" />
                    <span className="md:hidden"> </span>Renovasi Tanpa Batas.
                </h2>

                {/* CTA Button */}
                <motion.a
                    href="#portfolio"
                    className="inline-flex items-center gap-4 bg-white text-black text-[13px] font-medium uppercase tracking-[0.15em] px-8 py-4 transition-colors duration-300 hover:bg-white/90"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <span>LIHAT PROYEK</span>
                    <span className="text-sm font-light">→</span>
                </motion.a>
            </motion.div>

        </section>
    );
}
