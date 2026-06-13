"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BeforeAfterSlider } from "@/components/portfolio/BeforeAfterSlider";
import { CTA } from "@/components/sections/CTA";

interface PortfolioClientProps {
    project: any;
    relatedProjects: any[];
}

export function PortfolioClient({ project, relatedProjects }: PortfolioClientProps) {
    const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

    return (
        <main className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
            <Navigation />

            {/* Hero Section */}
            <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute inset-0"
                >
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </motion.div>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <span className="text-white/70 text-sm md:text-base tracking-widest uppercase mb-4 block">
                            {project.services}
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
                            {project.title}
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Project Info Section */}
            <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16 md:mb-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="text-xs md:text-sm text-charcoal/50 tracking-widest uppercase mb-2">
                                Location
                            </h3>
                            <p className="text-lg md:text-xl text-charcoal font-medium">
                                {project.location}
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h3 className="text-xs md:text-sm text-charcoal/50 tracking-widest uppercase mb-2">
                                Category
                            </h3>
                            <p className="text-lg md:text-xl text-charcoal font-medium capitalize">
                                {project.category}
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h3 className="text-xs md:text-sm text-charcoal/50 tracking-widest uppercase mb-2">
                                Floor Area
                            </h3>
                            <p className="text-lg md:text-xl text-charcoal font-medium">
                                {project.area}
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <h3 className="text-xs md:text-sm text-charcoal/50 tracking-widest uppercase mb-2">
                                Year
                            </h3>
                            <p className="text-lg md:text-xl text-charcoal font-medium">
                                {project.year}
                            </p>
                        </motion.div>
                    </div>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <p className="text-2xl md:text-3xl lg:text-4xl text-charcoal font-light leading-relaxed">
                            {project.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Before & After Section - Only for Renovation Projects */}
            {project.beforeAfter && project.beforeAfter.length > 0 && (
                <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-gradient-to-b from-[#F4F1EE] to-transparent">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-charcoal mb-2 ">
                                Transformasi Luar Biasa
                            </h2>
                            <p className="text-lg text-charcoal/60 max-w-2xl">
                                Lihat perubahan dramatis dari kondisi sebelum dan sesudah renovasi
                            </p>
                        </motion.div>

                        <div className="space-y-12 md:space-y-16">
                            {project.beforeAfter.map((item: any, index: number) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.2 }}
                                >
                                    <BeforeAfterSlider
                                        before={item.before}
                                        after={item.after}
                                        title={item.title}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Gallery Section */}
            <section className="pb-16 md:pb-24 px-6 md:px-12 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {project.gallery.map((image: string, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                onClick={() => setSelectedMedia(image)}
                                className={`relative flex items-center justify-center cursor-pointer group overflow-hidden rounded-lg ${index === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
                                    }`}
                            >
                                {image.endsWith('.mp4') ? (
                                    <video
                                        src={image}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="object-cover w-full h-full absolute inset-0 transition-transform duration-700 hover:scale-105"
                                    />
                                ) : (
                                    <Image
                                        src={image}
                                        alt={`${project.title} - Image ${index + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                                        className="object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
                <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 border-t border-charcoal/10">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between mb-12">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-2xl md:text-3xl font-medium text-charcoal"
                            >
                                Related Projects
                            </motion.h2>
                            <Link
                                href="/#portfolio"
                                className="text-teal text-sm font-medium tracking-wider uppercase hover:underline"
                            >
                                View All
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedProjects.map((related: any, index: number) => (
                                <motion.div
                                    key={related.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    <Link
                                        href={`/portfolio/${related.slug}`}
                                        className="group block"
                                    >
                                        <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
                                            <Image
                                                src={related.image}
                                                alt={related.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs text-charcoal/50 tracking-widest uppercase">
                                                {related.category}
                                            </span>
                                            <span className="text-charcoal/30">•</span>
                                            <span className="text-xs text-charcoal/50">
                                                {related.year}
                                            </span>
                                        </div>
                                        <h3 className="text-lg md:text-xl font-medium text-charcoal group-hover:text-teal transition-colors">
                                            {related.title}
                                        </h3>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <CTA />

            <Footer />

            {/* Lightbox Overlay */}
            <AnimatePresence>
                {selectedMedia && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedMedia(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8 cursor-zoom-out backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-6xl max-h-[90vh] aspect-auto flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()} // Prevent close when clicking the media
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedMedia(null)}
                                className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors p-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {selectedMedia.endsWith('.mp4') ? (
                                <video
                                    src={selectedMedia}
                                    controls
                                    autoPlay
                                    loop
                                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                                />
                            ) : (
                                <div className="relative w-full h-[85vh]">
                                    <Image
                                        src={selectedMedia}
                                        alt="Gallery Full Image"
                                        fill
                                        sizes="100vw"
                                        className="object-contain"
                                    />
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
