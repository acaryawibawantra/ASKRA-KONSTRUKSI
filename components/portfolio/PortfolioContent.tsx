"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PORTFOLIO_PROJECTS } from "@/lib/constants";

type FilterType = "all" | "residential" | "commercial";

export function PortfolioContent() {
    // Filter states
    const [activeCategory, setActiveCategory] = useState<FilterType>("all");
    const [activeService, setActiveService] = useState<string>("all");
    const [activeYear, setActiveYear] = useState<string>("all");
    const [activeLocation, setActiveLocation] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");

    // Featured carousel state
    const [currentFeatured, setCurrentFeatured] = useState(0);

    // Mobile filter modal state
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Top 5 Projects for Featured Section
    const featuredProjects = PORTFOLIO_PROJECTS.slice(0, 5);

    // Get unique values for filters
    const uniqueServices = useMemo(() =>
        Array.from(new Set(PORTFOLIO_PROJECTS.map(p => p.services))).sort()
        , []);

    const uniqueYears = useMemo(() =>
        Array.from(new Set(PORTFOLIO_PROJECTS.map(p => p.year))).sort((a, b) => b.localeCompare(a))
        , []);

    const uniqueLocations = useMemo(() =>
        Array.from(new Set(PORTFOLIO_PROJECTS.map(p => p.location))).sort()
        , []);

    // Multi-criteria filtering
    const filteredProjects = useMemo(() => {
        return PORTFOLIO_PROJECTS.filter((project) => {
            const matchesCategory = activeCategory === "all" || project.category === activeCategory;
            const matchesService = activeService === "all" || project.services === activeService;
            const matchesYear = activeYear === "all" || project.year === activeYear;
            const matchesLocation = activeLocation === "all" || project.location === activeLocation;
            const matchesSearch =
                searchQuery === "" ||
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesCategory && matchesService && matchesYear && matchesLocation && matchesSearch;
        });
    }, [activeCategory, activeService, activeYear, activeLocation, searchQuery]);

    // Reset all filters
    const resetFilters = () => {
        setActiveCategory("all");
        setActiveService("all");
        setActiveYear("all");
        setActiveLocation("all");
        setSearchQuery("");
    };

    const hasActiveFilters = activeCategory !== "all" || activeService !== "all" || activeYear !== "all" || activeLocation !== "all" || searchQuery !== "";

    // Carousel navigation
    const nextSlide = () => {
        setCurrentFeatured((prev) => (prev + 1) % featuredProjects.length);
    };

    const prevSlide = () => {
        setCurrentFeatured((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
    };

    return (
        <main className="min-h-screen bg-[#F4F1EE] text-charcoal">
            {/* Full Screen Featured Projects Carousel */}
            <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#6B2D2E] to-[#9E4244]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentFeatured}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={featuredProjects[currentFeatured].image}
                            alt={featuredProjects[currentFeatured].title}
                            fill
                            sizes="100vw"
                            className="object-cover"
                            priority
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                    </motion.div>
                </AnimatePresence>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-12 xl:px-20 2xl:px-32 pointer-events-none">
                    <div className="max-w-[1600px] mx-auto w-full flex flex-col items-start text-left gap-6 pointer-events-auto">
                        {/* Title & Info */}
                        <div className="space-y-4 md:space-y-6">
                            <motion.div
                                key={`text-${currentFeatured}`}
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                <div className="flex items-center justify-start gap-3 text-white/90 mb-2 md:mb-4">
                                    <span className="w-8 md:w-12 h-[1px] bg-teal"></span>
                                </div>

                                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium text-white leading-tight tracking-tight mb-3 md:mb-4">
                                    {featuredProjects[currentFeatured].title}
                                </h1>
                                <div className="flex flex-wrap justify-start gap-4 md:gap-6 text-white/80 text-xs md:text-base font-light mb-6">
                                    <span className="flex items-center gap-2">
                                        {featuredProjects[currentFeatured].location}
                                    </span>
                                    <span className="text-white/30">|</span>
                                    <span className="flex items-center gap-2">
                                        {featuredProjects[currentFeatured].year}
                                    </span>
                                    <span className="text-white/30">|</span>
                                    <span className="uppercase tracking-widest text-teal font-semibold">
                                        {featuredProjects[currentFeatured].category}
                                    </span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Description & Action */}
                        <motion.div
                            key={`desc-${currentFeatured}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="max-w-2xl"
                        >
                            <p className="text-sm md:text-lg text-white/90 mb-6 leading-relaxed font-light line-clamp-3 md:line-clamp-none drop-shadow-md">
                                {featuredProjects[currentFeatured].description}
                            </p>
                            <div className="flex items-center justify-start">
                                <Link
                                    href={`/portfolio/${featuredProjects[currentFeatured].slug}`}
                                    className="group inline-flex items-center gap-2 text-white hover:text-teal transition-all duration-300 transform hover:translate-x-1 text-sm md:text-base border-b border-white/30 pb-1 hover:border-teal"
                                >
                                    View Details
                                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Custom Navigation */}
                <div className="absolute bottom-24 md:bottom-10 right-6 md:right-12 xl:right-20 2xl:right-32 z-20 flex justify-end items-center gap-4 pointer-events-auto">
                    <button
                        onClick={prevSlide}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 active:scale-95 bg-black/10 backdrop-blur-sm"
                    >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className="flex items-baseline gap-2 text-white font-mono mx-2">
                        <span className="text-xl md:text-3xl font-light">0{currentFeatured + 1}</span>
                        <span className="text-white/40 text-xs md:text-sm">/ 0{featuredProjects.length}</span>
                    </div>
                    <button
                        onClick={nextSlide}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 active:scale-95 bg-black/10 backdrop-blur-sm"
                    >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </section>

            <div className="max-w-[1600px] mx-auto px-6 md:px-12 xl:px-20 2xl:px-32 py-16 md:py-24">
                {/* Page Header */}
                <div className="mb-8 md:mb-16">
                    <span className="text-teal font-medium tracking-widest uppercase text-sm mb-4 block">Our Portfolio</span>
                    <h1 className="text-4xl md:text-6xl font-medium text-charcoal mb-6 leading-tight">
                        Crafting spaces that<br className="hidden md:block" /> inspire and endure.
                    </h1>
                    <p className="text-charcoal/60 text-lg leading-relaxed max-w-3xl">
                        Explore our diverse portfolio of residential and commercial projects, each reflecting our commitment to design excellence and functional innovation.
                    </p>
                </div>

                {/* Mobile Filter Navbar - Only visible on mobile */}
                <div className="lg:hidden mb-6 sticky top-0 z-30 bg-[#F4F1EE] pb-4 -mx-6 px-6">
                    <div className="flex items-center gap-3">
                        {/* Filter Button */}
                        <button
                            onClick={() => setShowMobileFilters(true)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-charcoal/10 rounded-lg text-sm font-medium text-charcoal hover:border-teal/50 transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            Filter
                            {hasActiveFilters && (
                                <span className="ml-1 px-2 py-0.5 bg-teal text-white text-xs rounded-full">
                                    {[activeCategory !== "all", activeService !== "all", activeYear !== "all", activeLocation !== "all", searchQuery !== ""].filter(Boolean).length}
                                </span>
                            )}
                        </button>

                        {/* Results Count */}
                        <div className="px-4 py-3 bg-white border border-charcoal/10 rounded-lg text-sm text-charcoal/60 whitespace-nowrap">
                            {filteredProjects.length} proyek
                        </div>
                    </div>
                </div>

                {/* Mobile Filter Modal */}
                {showMobileFilters && (
                    <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)}>
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="sticky top-0 bg-white border-b border-charcoal/10 px-6 py-4 flex items-center justify-between rounded-t-3xl">
                                <h3 className="text-lg font-semibold text-charcoal">Filter Proyek</h3>
                                <button
                                    onClick={() => setShowMobileFilters(false)}
                                    className="p-2 hover:bg-charcoal/5 rounded-full transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="px-6 py-6 space-y-6">
                                {/* Search */}
                                <div>
                                    <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-3">
                                        Cari Proyek
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Nama, lokasi..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full bg-[#F4F1EE] px-4 py-3 pl-10 text-sm border border-charcoal/10 rounded-lg focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/10"
                                        />
                                        <svg className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-3">Kategori</label>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            { value: "all", label: "Semua" },
                                            { value: "residential", label: "Residential" },
                                            { value: "commercial", label: "Commercial" }
                                        ].map((cat) => (
                                            <button
                                                key={cat.value}
                                                onClick={() => setActiveCategory(cat.value as FilterType)}
                                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.value
                                                    ? "bg-gradient-to-r from-[#6B2D2E] to-[#9E4244] text-white"
                                                    : "bg-charcoal/5 text-charcoal/70"
                                                    }`}
                                            >
                                                {cat.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Service */}
                                <div>
                                    <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-3">Layanan</label>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => setActiveService("all")}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeService === "all"
                                                ? "bg-gradient-to-r from-[#6B2D2E] to-[#9E4244] text-white"
                                                : "bg-charcoal/5 text-charcoal/70"
                                                }`}
                                        >
                                            Semua
                                        </button>
                                        {uniqueServices.map((service) => (
                                            <button
                                                key={service}
                                                onClick={() => setActiveService(service)}
                                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeService === service
                                                    ? "bg-gradient-to-r from-[#6B2D2E] to-[#9E4244] text-white"
                                                    : "bg-charcoal/5 text-charcoal/70"
                                                    }`}
                                            >
                                                {service}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Year */}
                                <div>
                                    <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-3">Tahun</label>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => setActiveYear("all")}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeYear === "all"
                                                ? "bg-gradient-to-r from-[#6B2D2E] to-[#9E4244] text-white"
                                                : "bg-charcoal/5 text-charcoal/70"
                                                }`}
                                        >
                                            Semua
                                        </button>
                                        {uniqueYears.map((year) => (
                                            <button
                                                key={year}
                                                onClick={() => setActiveYear(year)}
                                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeYear === year
                                                    ? "bg-gradient-to-r from-[#6B2D2E] to-[#9E4244] text-white"
                                                    : "bg-charcoal/5 text-charcoal/70"
                                                    }`}
                                            >
                                                {year}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-3">Lokasi</label>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => setActiveLocation("all")}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeLocation === "all"
                                                ? "bg-gradient-to-r from-[#6B2D2E] to-[#9E4244] text-white"
                                                : "bg-charcoal/5 text-charcoal/70"
                                                }`}
                                        >
                                            Semua
                                        </button>
                                        {uniqueLocations.map((location) => (
                                            <button
                                                key={location}
                                                onClick={() => setActiveLocation(location)}
                                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeLocation === location
                                                    ? "bg-gradient-to-r from-[#6B2D2E] to-[#9E4244] text-white"
                                                    : "bg-charcoal/5 text-charcoal/70"
                                                    }`}
                                            >
                                                {location}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="sticky bottom-0 bg-white border-t border-charcoal/10 px-6 py-4 flex gap-3">
                                {hasActiveFilters && (
                                    <button
                                        onClick={resetFilters}
                                        className="flex-1 px-4 py-3 text-sm font-medium text-charcoal border border-charcoal/20 rounded-lg hover:bg-charcoal/5 transition-all"
                                    >
                                        Reset
                                    </button>
                                )}
                                <button
                                    onClick={() => setShowMobileFilters(false)}
                                    className="flex-1 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-[#6B2D2E] to-[#9E4244] rounded-lg hover:shadow-lg transition-all"
                                >
                                    Tampilkan {filteredProjects.length} Proyek
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Two Column Layout: Sidebar + Grid */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Left Sidebar - Filters (Hidden on mobile, visible on desktop) */}
                    <aside className="hidden lg:block lg:w-72 lg:flex-shrink-0">`
                        <div className="lg:sticky lg:top-24 space-y-6">
                            {/* Search Bar */}
                            <div>
                                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-3">
                                    Cari Proyek
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Nama, lokasi..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-white px-4 py-3 pl-10 text-sm border border-charcoal/10 rounded-lg focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/10 transition-all"
                                    />
                                    <svg
                                        className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-teal transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div>
                                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-3">
                                    Kategori
                                </label>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => setActiveCategory("all")}
                                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-300 ${activeCategory === "all"
                                            ? "bg-gradient-to-r from-[#6B2D2E] to-[#9E4244] text-white shadow-md"
                                            : "text-charcoal/70 hover:text-charcoal hover:bg-charcoal/5"
                                            }`}
                                    >
                                        Semua
                                    </button>
                                    <button
                                        onClick={() => setActiveCategory("residential")}
                                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-300 ${activeCategory === "residential"
                                            ? "bg-gradient-to-r from-[#6B2D2E] to-[#9E4244] text-white shadow-md"
                                            : "text-charcoal/70 hover:text-charcoal hover:bg-charcoal/5"
                                            }`}
                                    >
                                        Residential
                                    </button>
                                    <button
                                        onClick={() => setActiveCategory("commercial")}
                                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-300 ${activeCategory === "commercial"
                                            ? "bg-gradient-to-r from-[#6B2D2E] to-[#9E4244] text-white shadow-md"
                                            : "text-charcoal/70 hover:text-charcoal hover:bg-charcoal/5"
                                            }`}
                                    >
                                        Commercial
                                    </button>
                                </div>
                            </div>

                            {/* Service Filter */}
                            <div>
                                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-3">
                                    Layanan
                                </label>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => setActiveService("all")}
                                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-300 ${activeService === "all"
                                            ? "bg-gradient-to-r from-[#6B2D2E] to-[#9E4244] text-white shadow-md"
                                            : "text-charcoal/70 hover:text-charcoal hover:bg-charcoal/5"
                                            }`}
                                    >
                                        Semua
                                    </button>
                                    {uniqueServices.map((service) => (
                                        <button
                                            key={service}
                                            onClick={() => setActiveService(service)}
                                            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-300 ${activeService === service
                                                ? "bg-gradient-to-r from-[#6B2D2E] to-[#9E4244] text-white shadow-md"
                                                : "text-charcoal/70 hover:text-charcoal hover:bg-charcoal/5"
                                                }`}
                                        >
                                            {service}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Year Filter */}
                            <div>
                                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-3">
                                    Tahun
                                </label>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => setActiveYear("all")}
                                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-300 ${activeYear === "all"
                                            ? "bg-gradient-to-r from-[#6B2D2E] to-[#9E4244] text-white shadow-md"
                                            : "text-charcoal/70 hover:text-charcoal hover:bg-charcoal/5"
                                            }`}
                                    >
                                        Semua
                                    </button>
                                    {uniqueYears.map((year) => (
                                        <button
                                            key={year}
                                            onClick={() => setActiveYear(year)}
                                            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-300 ${activeYear === year
                                                ? "bg-gradient-to-r from-[#6B2D2E] to-[#9E4244] text-white shadow-md"
                                                : "text-charcoal/70 hover:text-charcoal hover:bg-charcoal/5"
                                                }`}
                                        >
                                            {year}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Location Filter */}
                            <div>
                                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-3">
                                    Lokasi
                                </label>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => setActiveLocation("all")}
                                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-300 ${activeLocation === "all"
                                            ? "bg-gradient-to-r from-[#6B2D2E] to-[#9E4244] text-white shadow-md"
                                            : "text-charcoal/70 hover:text-charcoal hover:bg-charcoal/5"
                                            }`}
                                    >
                                        Semua
                                    </button>
                                    {uniqueLocations.map((location) => (
                                        <button
                                            key={location}
                                            onClick={() => setActiveLocation(location)}
                                            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-300 ${activeLocation === location
                                                ? "bg-gradient-to-r from-[#6B2D2E] to-[#9E4244] text-white shadow-md"
                                                : "text-charcoal/70 hover:text-charcoal hover:bg-charcoal/5"
                                                }`}
                                        >
                                            {location}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Results & Reset */}
                            <div className="pt-4 border-t border-charcoal/10">
                                <p className="text-xs text-charcoal/60 mb-3">
                                    <span className="font-semibold text-charcoal">{filteredProjects.length}</span> dari {PORTFOLIO_PROJECTS.length} proyek
                                </p>
                                {hasActiveFilters && (
                                    <button
                                        onClick={resetFilters}
                                        className="w-full px-4 py-2 text-sm font-medium text-teal hover:text-white bg-teal/10 hover:bg-teal rounded-lg transition-all duration-300"
                                    >
                                        Reset Filter
                                    </button>
                                )}
                            </div>
                        </div>
                    </aside>

                    {/* Right Content - Projects Grid */}
                    <motion.div
                        layout
                        className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map((project, index) => (
                                    <motion.div
                                        layout
                                        key={project.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                        className="group"
                                    >
                                        <Link href={`/portfolio/${project.slug}`} className="block">
                                            {/* Image Container */}
                                            <div className="relative aspect-[4/5] overflow-hidden bg-charcoal/5 mb-4 rounded-lg shadow-sm">
                                                <Image
                                                    src={project.image}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />

                                                {/* Hover Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center text-white">
                                                    <span className="text-teal font-medium tracking-widest text-xs uppercase mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                                        Lihat Detail
                                                    </span>
                                                    <h3 className="text-xl font-medium mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                                                        {project.title}
                                                    </h3>
                                                    <p className="text-white/80 text-sm font-light transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                                                        {project.location} • {project.year}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Project Info */}
                                            <div className="space-y-1">
                                                <h3 className="text-base font-semibold text-charcoal group-hover:text-teal transition-colors line-clamp-1">
                                                    {project.title}
                                                </h3>
                                                <p className="text-sm text-charcoal/50">
                                                    {project.location}
                                                </p>
                                                <p className="text-xs text-charcoal/40 uppercase tracking-wider">
                                                    {project.category}
                                                </p>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="col-span-1 md:col-span-2 xl:col-span-3 py-20 text-center"
                                >
                                    <div className="inline-block p-6 rounded-full bg-charcoal/5 mb-6">
                                        <svg className="w-12 h-12 text-charcoal/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-medium text-charcoal mb-3">Tidak ada proyek ditemukan</h3>
                                    <p className="text-charcoal/50 mb-6">Coba ubah filter atau reset untuk melihat proyek lainnya</p>
                                    <button
                                        onClick={resetFilters}
                                        className="px-6 py-3 bg-gradient-to-r from-[#6B2D2E] to-[#9E4244] text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-300"
                                    >
                                        Reset Semua Filter
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
