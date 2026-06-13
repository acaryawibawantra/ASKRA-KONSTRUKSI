"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { motion, useScroll, useTransform } from "framer-motion";

export function Services() {
    return (
        <section id="services" className="relative w-full bg-[#F5F3F0]">
            {/* Section Header */}
            <div className="pt-8 pb-12 md:pt-16 md:pb-24 text-center relative z-10 bg-[#e8e5e0] px-6 flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-2 py-1 mb-6 text-[0.65rem] font-bold tracking-[0.14em] text-[#786e62] uppercase border border-[#b4a997] rounded-[3px]">
                    <span>LAYANAN KAMI</span>
                </div>
                <h2 className="text-[1.6rem] sm:text-3xl md:text-4xl lg:text-[2.8rem] font-medium text-[#1c1814] max-w-4xl mx-auto leading-[1.2] md:leading-[1.15] tracking-[-0.02em] text-balance">
                    Apa yang kami kerjakan <br className="hidden sm:block" /> temukan solusi untuk hunian Anda
                </h2>
            </div>

            {/* Sticky Cards Container */}
            <div className="relative w-full">
                {SERVICES.map((service, index) => (
                    <StickyCard
                        key={service.id}
                        service={service}
                        index={index}
                        total={SERVICES.length}
                    />
                ))}
            </div>

            {/* Bottom CTA Section 
            <div className="py-24 md:py-32 text-center bg-[#F5F3F0] relative z-20">
                <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    <p className="text-gray-dark text-lg">Butuh layanan khusus?</p>
                    <a
                        href="/contact"
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-teal/25 hover:scale-105 text-white"
                        style={{
                            background: 'linear-gradient(135deg, #6B2D2E 0%, #9E4244 50%, #6B2D2E 100%)',
                            backgroundSize: '200% 200%',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundPosition = '100% 100%';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundPosition = '0% 0%';
                        }}
                    >
                        <span>Hubungi Kami</span>
                        <svg
                            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
            */}
        </section>
    );
}

function StickyCard({ service, index, total }: { service: any; index: number; total: number }) {
    const targetRef = useRef<HTMLDivElement>(null);
    const isLast = index === total - 1;

    // We add an overlay wrapper so the image can scale down subtly while sticky
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    // Optional parallax/scale effects based on scroll progress of this specific card
    // Only scale and fade out if it is NOT the last card
    const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.3]);

    return (
        <motion.div
            ref={targetRef}
            className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden"
            style={{
                zIndex: index,
            }}
        >
            <motion.div style={{ scale, opacity }} className="absolute inset-0 w-full h-full transform-gpu origin-top">
                <Image
                    src={service.image || ""}
                    alt={service.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
            </motion.div>

            {/* Content centered big text */}
            <div className="relative z-10 text-center text-white px-6 w-full max-w-7xl mx-auto flex flex-col items-center">
                <h3 className="text-4xl md:text-5xl lg:text-7xl font-semibold leading-none tracking-tight mb-6">
                    {service.title}
                </h3>
                <p className="text-base md:text-lg lg:text-xl font-light max-w-2xl mb-10 text-white/90">
                    {service.description}
                </p>
                <Link
                    href={`/services/${service.id}`}
                    className="group inline-flex items-center gap-3 px-8 py-3 rounded-full font-medium transition-all duration-300 border border-white text-white text-sm tracking-widest uppercase hover:bg-white hover:text-black"
                >
                    <span>Lihat Proyek</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70">
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em]">Scroll</span>
                <div className="w-[1px] h-10 md:h-16 bg-white/20 relative overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1/2 bg-white"
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                </div>
            </div>

            {/* Number indicator */}
            <div className="absolute bottom-8 md:bottom-12 right-6 md:right-12 z-10 text-white/50 text-xl md:text-2xl font-light">
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </div>
        </motion.div>
    );
}
