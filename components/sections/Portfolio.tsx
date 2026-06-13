"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { PORTFOLIO_PROJECTS } from "@/lib/constants";
import { useIsMobile } from "@/hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

type FilterType = "all" | "residential" | "commercial";

export function Portfolio() {
    const [activeFilter, setActiveFilter] = useState<FilterType>("all");
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    const filteredProjects =
        activeFilter === "all"
            ? PORTFOLIO_PROJECTS
            : PORTFOLIO_PROJECTS.filter((p) => p.category === activeFilter);

    useEffect(() => {
        if (!containerRef.current || !scrollRef.current) return;
        // Disable scroll-driven animation on mobile — let user swipe natively
        if (isMobile) return;

        // Calculate total scroll width
        const scrollWidth = scrollRef.current.scrollWidth - window.innerWidth;

        // Only create horizontal scroll if there's enough content
        if (scrollWidth > 0) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: () => `+=${scrollWidth}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            tl.to(scrollRef.current, {
                x: -scrollWidth,
                ease: "none",
            });
        }

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [filteredProjects, isMobile]);

    return (
        <section
            id="portfolio"
            ref={containerRef}
            className={`relative z-10 ${isMobile ? '' : 'min-h-screen'} overflow-hidden`}
            style={{ backgroundColor: 'var(--background)' }}
        >
            <div className="sticky top-0 flex h-screen flex-col">
                {/* Header */}
                <div
                    className="z-20 px-4 md:px-12 py-6 md:py-16"
                    style={{ backgroundColor: 'var(--background)' }}
                >
                    <div className="max-w-7xl mx-auto">
                        {/* Title row - VIEW ALL hidden on mobile, shown on md+ */}
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium">
                                <span className="text-gradient">PROJECTS</span>
                            </h2>
                            {/* Desktop VIEW ALL */}
                            <Link
                                href="/portfolio"
                                className="hidden md:inline-flex group items-center gap-2 text-charcoal/60 hover:text-teal transition-colors duration-300"
                            >
                                <span className="text-sm font-medium tracking-wider uppercase">
                                    VIEW ALL
                                </span>
                                <svg
                                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>

                        {/* Filter Pills */}
                        <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-4">
                            {[
                                { key: "all", label: "Semua" },
                                { key: "residential", label: "Residential" },
                                { key: "commercial", label: "Commercial" },
                            ].map((filter) => (
                                <button
                                    key={filter.key}
                                    onClick={() => setActiveFilter(filter.key as FilterType)}
                                    className={`px-3 md:px-5 py-1.5 md:py-2 text-[10px] md:text-xs font-medium tracking-wider uppercase transition-all duration-300 rounded-full ${activeFilter === filter.key
                                        ? "bg-white shadow-md"
                                        : "bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10"
                                        }`}
                                >
                                    <span className={activeFilter === filter.key ? "text-gradient" : ""}>
                                        {filter.label}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Mobile VIEW ALL + Scroll Hint */}
                        <div className="md:hidden flex items-center justify-between mt-6">
                            {/* Lihat Semua Link */}
                            <Link
                                href="/portfolio"
                                className="inline-flex items-center gap-2 text-teal font-medium group/link"
                            >
                                <span className="text-sm font-medium tracking-wider uppercase">
                                    VIEW ALL
                                </span>
                                <svg
                                    className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                            </Link>

                            {/* Scroll Hint */}
                            <div className="flex items-center gap-2 text-charcoal/50 animate-pulse">
                                <span className="text-xs tracking-wider uppercase">Scroll</span>
                                <svg
                                    className="w-4 h-4 animate-bounce"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Horizontal Scroll Container */}
                <div className={`flex flex-1 items-center ${isMobile ? 'overflow-x-auto' : 'overflow-hidden'}`}>
                    <div ref={scrollRef} className="flex gap-6 lg:gap-8 px-6 md:px-12">
                        {filteredProjects.map((project) => (
                            <Link
                                key={project.id}
                                href={`/portfolio/${project.slug}`}
                                className="group flex-shrink-0 w-[80vw] md:w-[50vw] lg:w-[40vw] cursor-pointer"
                                onMouseEnter={() => setHoveredId(project.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {/* Image Container */}
                                <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-5">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 40vw"
                                        className={`object-cover transition-all duration-700 ${hoveredId === project.id ? 'scale-110' : 'scale-100'
                                            }`}
                                    />

                                    {/* Hover Overlay */}
                                    <div className={`absolute inset-0 bg-teal/20 transition-opacity duration-500 ${hoveredId === project.id ? 'opacity-100' : 'opacity-0'
                                        }`} />

                                    {/* View Button on Hover */}
                                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${hoveredId === project.id ? 'opacity-100' : 'opacity-0'
                                        }`}>
                                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl transform transition-transform duration-500 group-hover:scale-100 scale-75">
                                            <svg className="w-6 h-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Project Info */}
                                <div className="flex items-start justify-between gap-4">
                                    <h3 className={`text-xl md:text-2xl font-medium transition-colors duration-300 ${hoveredId === project.id ? 'text-teal' : 'text-charcoal'
                                        }`}>
                                        {project.title}
                                    </h3>
                                    <span className="text-xs font-medium tracking-wider uppercase text-charcoal/40 pt-1.5">
                                        {project.category}
                                    </span>
                                </div>

                                {/* Location */}
                                <p className="mt-2 text-sm text-charcoal/50 flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                    {project.location}
                                </p>
                            </Link>
                        ))}

                        {/* End spacing */}
                        <div className="w-32 flex-shrink-0" />
                    </div>
                </div>
            </div>
        </section>
    );
}
