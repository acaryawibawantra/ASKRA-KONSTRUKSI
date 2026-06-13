"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";

export function About() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const isMobile = useIsMobile();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Only apply parallax transforms on desktop
    const imageScale = useTransform(scrollYProgress, [0, 0.5], isMobile ? [1, 1] : [1.2, 1]);
    const textY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [100, -100]);

    const stats = [
        { number: "10", suffix: "+", label: "Years" },
        { number: "100", suffix: "+", label: "Projects" },
        { number: "50", suffix: "+", label: "Clients" },
    ];

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative min-h-screen overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #0F4040 0%, #1A5F5F 50%, #2A7F7F 100%)'
            }}
        >
            {/* Subtle grain overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                }}
            />

            {/* Floating gradient orbs - simplified on mobile */}
            {!isMobile && (
                <>
                    <motion.div
                        animate={{
                            x: [0, 50, 0],
                            y: [0, -30, 0],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
                        style={{ background: 'radial-gradient(circle, #2A7F7F 0%, transparent 70%)' }}
                    />
                    <motion.div
                        animate={{
                            x: [0, -30, 0],
                            y: [0, 50, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute bottom-20 left-20 w-80 h-80 rounded-full opacity-20 blur-3xl"
                        style={{ background: 'radial-gradient(circle, #0F4040 0%, transparent 70%)' }}
                    />
                </>
            )}
            {/* Static subtle glow for mobile */}
            {isMobile && (
                <div
                    className="absolute inset-0 opacity-10"
                    style={{ background: 'radial-gradient(ellipse at center, #2A7F7F 0%, transparent 70%)' }}
                />
            )}

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 md:px-12 md:py-40 lg:px-16">

                {/* Top Section - Label */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-20"
                >
                    <span
                        className="inline-block text-xs uppercase tracking-widest border-b pb-4"
                        style={{
                            color: 'rgba(255,255,255,0.5)',
                            letterSpacing: '0.3em',
                            borderColor: 'rgba(255,255,255,0.2)'
                        }}
                    >
                        About Us
                    </span>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left - Big Headline */}
                    <motion.div style={{ y: textY }}>
                        <motion.h2
                            initial={{ opacity: 0, y: 60 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 1, delay: 0.1 }}
                            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] mb-8"
                            style={{
                                fontWeight: 200,
                                letterSpacing: '-0.03em',
                                color: '#FFFFFF'
                            }}
                        >
                            We Build
                            <br />
                            <span style={{ color: 'rgba(255,255,255,0.4)' }}>
                                Dreams
                            </span>
                        </motion.h2>

                        {/* Stats - Horizontal */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex gap-10 md:gap-14 mt-16"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                                >
                                    <div className="flex items-baseline">
                                        <span
                                            className="text-4xl md:text-5xl lg:text-6xl"
                                            style={{ fontWeight: 100, color: '#FFFFFF' }}
                                        >
                                            {stat.number}
                                        </span>
                                        <span
                                            className="text-2xl md:text-3xl ml-0.5"
                                            style={{ fontWeight: 100, color: 'rgba(255,255,255,0.4)' }}
                                        >
                                            {stat.suffix}
                                        </span>
                                    </div>
                                    <span
                                        className="text-[10px] uppercase tracking-widest mt-2 block"
                                        style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}
                                    >
                                        {stat.label}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right - Description & Image */}
                    <motion.div>
                        <motion.p
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg md:text-xl lg:text-2xl mb-12 leading-relaxed"
                            style={{
                                lineHeight: 1.7,
                                color: 'rgba(255,255,255,0.7)',
                                fontWeight: 300
                            }}
                        >
                            Kami mentransformasi ruang menjadi pengalaman.
                            Dengan dedikasi lebih dari satu dekade, setiap
                            proyek adalah cerita yang kami bangun bersama.
                        </motion.p>

                        {/* Image with parallax */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 1.2, delay: 0.3 }}
                            className="relative aspect-[4/3] overflow-hidden rounded-lg"
                        >
                            <motion.div
                                style={{ scale: imageScale }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src="/images/about/about-image.png"
                                    alt="ASKRA Interior"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover"
                                />
                            </motion.div>
                            {/* Teal overlay */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(15,64,64,0.3) 0%, transparent 100%)'
                                }}
                            />
                        </motion.div>

                        {/* CTA */}
                        <motion.a
                            href="/contact"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="group inline-flex items-center gap-4 mt-10"
                        >
                            <span
                                className="text-sm uppercase tracking-widest transition-all duration-300 group-hover:tracking-[0.3em]"
                                style={{ letterSpacing: '0.15em', color: 'rgba(255,255,255,0.7)' }}
                            >
                                Mulai Proyek
                            </span>
                            <span
                                className="relative flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500 group-hover:w-16 group-hover:bg-white overflow-hidden"
                                style={{ borderColor: 'rgba(255,255,255,0.3)' }}
                            >
                                <svg
                                    className="h-4 w-4 transition-all duration-300 group-hover:text-[#0F4040] group-hover:translate-x-1"
                                    style={{ color: 'rgba(255,255,255,0.7)' }}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </motion.a>
                    </motion.div>
                </div>
            </div>

            {/* Bottom line */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute bottom-0 left-0 right-0 h-px origin-left"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            />
        </section>
    );
}
