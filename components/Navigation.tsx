"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";

import Image from "next/image";

const menuItems = [
    { label: "About", href: "/about" },
    { label: "Services", href: "/#services" },
    { label: "Portfolio", href: "/portfolio" },
    //{ label: "Testimonials", href: "/#testimonials" },
    //{ label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
];

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showNav, setShowNav] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const isMobile = useIsMobile();

    useEffect(() => {
        const hasVisited = sessionStorage.getItem("hasVisitedAskra");
        const delay = hasVisited ? 100 : 1800;
        const timer = setTimeout(() => setShowNav(true), delay);
        return () => clearTimeout(timer);
    }, []);

    // Detect scroll position for background change + hide/show
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 60);

            if (currentScrollY < 100) {
                setIsHidden(false);
            } else if (currentScrollY > lastScrollY + 5) {
                setIsHidden(true);
            } else if (currentScrollY < lastScrollY - 5) {
                setIsHidden(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const handleLinkClick = () => setIsOpen(false);

    // On hero (not scrolled): transparent bg, white text - DESKTOP ONLY
    // After scroll or on mobile: white bg, dark text
    const isTransparent = !scrolled && !isOpen && !isMobile;

    return (
        <>
            {/* ── Main Navbar ── */}
            <motion.header
                className="fixed top-0 left-0 right-0 z-40"
                initial={{ opacity: 0, y: -20 }}
                animate={{
                    opacity: showNav ? 1 : 0,
                    y: isHidden && !isOpen ? -80 : 0,
                }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                style={{ pointerEvents: showNav ? "auto" : "none" }}
            >
                <div
                    className="transition-all duration-300"
                    style={{
                        backgroundColor: isTransparent ? "transparent" : "rgba(255,255,255,0.97)",
                        backdropFilter: isTransparent ? "none" : "blur(12px)",
                        boxShadow: isTransparent ? "none" : "0 1px 0 rgba(0,0,0,0.08)",
                    }}
                >
                    <div className="flex items-center justify-between px-6 md:px-10 h-16 md:h-[72px]">

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 shrink-0 group">
                            <div className="relative w-10 h-10 md:w-11 md:h-11">
                                <Image
                                    src="/images/logo-fix.png"
                                    alt="ASKRA KONSTRUKSI Logo"
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 40px, 44px"
                                />
                            </div>
                            <div className="flex flex-col justify-center">
                                <span
                                    className="text-lg md:text-xl font-bold tracking-wide leading-none transition-colors duration-300"
                                    style={{
                                        color: isTransparent ? "#FFFFFF" : "#1a1a1a",
                                        letterSpacing: "0.02em",
                                    }}
                                >
                                    ASKRA KONSTRUKSI
                                </span>
                                <span
                                    className="text-[9px] md:text-[10px] uppercase tracking-widest leading-none transition-colors duration-300 mt-1"
                                    style={{
                                        color: isTransparent ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.55)",
                                        letterSpacing: "0.05em"
                                    }}
                                >
                                    CV ADI SARANA KREASI
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Nav Links */}
                        <nav className="hidden md:flex items-center gap-1">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="px-4 py-2 text-sm font-medium transition-colors duration-200 hover:opacity-70"
                                    style={{
                                        color: isTransparent ? "rgba(255,255,255,0.85)" : "#2C2C2C",
                                        letterSpacing: "0.03em",
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Desktop CTA Button */}
                        <div className="hidden md:flex items-center">
                            <Link
                                href="/contact"
                                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 hover:opacity-85"
                                style={{
                                    backgroundColor: isTransparent ? "#FFFFFF" : "#1a1a1a",
                                    color: isTransparent ? "#1a1a1a" : "#FFFFFF",
                                    letterSpacing: "0.06em",
                                }}
                            >
                                KONSULTASI GRATIS
                                <span className="text-base leading-none">→</span>
                            </Link>
                        </div>

                        {/* Mobile Hamburger */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden flex flex-col items-center justify-center gap-[6px] w-10 h-10 hover:opacity-70"
                            aria-label="Toggle menu"
                        >
                            <motion.span
                                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="h-[2px] w-6 block"
                                style={{ backgroundColor: isTransparent ? "#FFFFFF" : "#1a1a1a" }}
                            />
                            <motion.span
                                animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                                transition={{ duration: 0.2 }}
                                className="h-[2px] w-6 block"
                                style={{ backgroundColor: isTransparent ? "#FFFFFF" : "#1a1a1a" }}
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="h-[2px] w-6 block"
                                style={{ backgroundColor: isTransparent ? "#FFFFFF" : "#1a1a1a" }}
                            />
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* ── Mobile Full-Screen Overlay ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="fixed inset-0 z-30 flex flex-col"
                        style={{ backgroundColor: "#C94B48" }}
                    >
                        <nav className="flex flex-col items-end justify-center flex-1 pr-10 gap-1">
                            {menuItems.map((item, index) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 40 }}
                                    transition={{ duration: 0.4, delay: 0.05 + index * 0.07 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={handleLinkClick}
                                        className="block py-2 text-4xl font-light text-white/40 hover:text-white transition-colors duration-200"
                                        style={{ letterSpacing: "-0.02em" }}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Mobile CTA */}
                            <motion.div
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 40 }}
                                transition={{ duration: 0.4, delay: 0.05 + menuItems.length * 0.07 }}
                                className="mt-6"
                            >
                                <Link
                                    href="/contact"
                                    onClick={handleLinkClick}
                                    className="inline-flex items-center gap-2 border border-white text-white text-sm uppercase tracking-widest px-6 py-3 hover:bg-white hover:text-black transition-all duration-300"
                                >
                                    KONSULTASI GRATIS →
                                </Link>
                            </motion.div>
                        </nav>

                        {/* Social links bottom */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.4, delay: 0.5 }}
                            className="flex gap-6 px-10 pb-10"
                        >
                            <a href="mailto:info@dbr.id" className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors">Email</a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors">Instagram</a>
                            <a href="https://wa.me/6281289777917" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors">WhatsApp</a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
