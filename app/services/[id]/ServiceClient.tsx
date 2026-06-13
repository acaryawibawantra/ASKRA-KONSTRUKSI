"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PORTFOLIO_PROJECTS } from "@/lib/constants";

interface ServiceClientProps {
    service: any;
    relatedProjects: any[];
    otherServices: any[];
}

export function ServiceClient({ service, relatedProjects, otherServices }: ServiceClientProps) {
    return (
        <main className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
            <Navigation />

            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[75vh] overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute inset-0"
                >
                    <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </motion.div>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <span className="text-white/60 text-sm md:text-base tracking-widest uppercase mb-4 block">
                            Layanan
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
                            {service.title}
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Description Section */}
            <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Left - Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-sm text-teal tracking-widest uppercase mb-6">
                                Tentang Layanan
                            </h2>
                            <p className="text-2xl md:text-3xl text-charcoal font-light leading-relaxed">
                                {service.longDescription}
                            </p>
                        </motion.div>

                        {/* Right - Features */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h2 className="text-sm text-teal tracking-widest uppercase mb-6">
                                Keunggulan
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {service.features.map((feature: string, index: number) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="flex items-start gap-3 p-4 bg-white/50 rounded-lg"
                                    >
                                        <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-charcoal font-medium">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="pb-16 md:pb-24 px-6 md:px-12 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm text-teal tracking-widest uppercase mb-8"
                    >
                        Gallery
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        {service.gallery.map((image: string, index: number) => {
                            const linkedProject = PORTFOLIO_PROJECTS.find(p => p.gallery.includes(image) || p.image === image);
                            
                            const MotionDiv = (
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    className={`relative aspect-[4/3] overflow-hidden rounded-lg group ${linkedProject ? 'cursor-pointer' : ''}`}
                                >
                                    <Image
                                        src={image}
                                        alt={`${service.title} - Image ${index + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {linkedProject && (
                                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <span className="text-white text-sm font-medium tracking-wider uppercase border border-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
                                                Lihat Proyek
                                            </span>
                                        </div>
                                    )}
                                </motion.div>
                            );

                            return linkedProject ? (
                                <Link key={index} href={`/portfolio/${linkedProject.slug}`} className="block">
                                    {MotionDiv}
                                </Link>
                            ) : (
                                <div key={index}>{MotionDiv}</div>
                            );
                        })}
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
                                Proyek Terkait
                            </motion.h2>
                            <Link
                                href="/#portfolio"
                                className="text-teal text-sm font-medium tracking-wider uppercase hover:underline"
                            >
                                View All
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedProjects.map((project: any, index: number) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    <Link
                                        href={`/portfolio/${project.slug}`}
                                        className="group block"
                                    >
                                        <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                        <h3 className="text-lg md:text-xl font-medium text-charcoal group-hover:text-teal transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-charcoal/50 mt-1">{project.location}</p>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Other Services */}
            <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 border-t border-charcoal/10">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl font-medium text-charcoal mb-12"
                    >
                        Layanan Lainnya
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {otherServices.map((otherService: any, index: number) => (
                            <motion.div
                                key={otherService.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Link
                                    href={`/services/${otherService.id}`}
                                    className="group block"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
                                        <Image
                                            src={otherService.image}
                                            alt={otherService.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-medium text-charcoal group-hover:text-teal transition-colors">
                                        {otherService.title}
                                    </h3>
                                    <p className="text-sm text-charcoal/60 mt-1 line-clamp-2">{otherService.description}</p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section
                className="py-16 md:py-24 px-6 md:px-12 lg:px-16"
                style={{
                    background: 'linear-gradient(135deg, #6B2D2E 0%, #9E4244 30%, #C56B6D 60%, #9E4244 80%, #6B2D2E 100%)',
                }}
            >
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-6"
                    >
                        Tertarik dengan layanan ini?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white/70 text-lg mb-8"
                    >
                        Konsultasikan proyek Anda dengan tim profesional kami
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal font-medium rounded-full hover:bg-white/90 transition-colors"
                        >
                            Hubungi Kami
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
