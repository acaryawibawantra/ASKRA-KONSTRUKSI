"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function Preloader() {
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    if (typeof window !== "undefined" && !(window as any).__appLoadTime) {
        (window as any).__appLoadTime = Date.now();
    }

    useEffect(() => {
        setIsMounted(true);
        const hasVisited = sessionStorage.getItem("hasVisitedAskra");
        if (hasVisited) {
            setIsLoading(false);
            document.body.style.overflow = "unset";
            return;
        }

        // Lock scroll to top during loading
        document.body.style.overflow = "hidden";
        window.scrollTo(0, 0);

        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "unset";
            sessionStorage.setItem("hasVisitedAskra", "true");
        }, 2000);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "unset";
        };
    }, []);

    if (!isMounted) return null;

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-[#FAFAFA] flex flex-col items-center justify-center overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                    <div className="flex flex-col items-center justify-center relative z-10 w-full px-4">
                        {/* Logo Wrapper */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="mb-8 relative w-32 h-32 md:w-40 md:h-40"
                        >
                            <Image
                                src="/images/logo-fix.png"
                                alt="Askra Konstruksi Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>

                        {/* Main Text Container */}
                        <div className="overflow-hidden mb-4">
                            <motion.h1
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.7, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                                className="text-3xl md:text-5xl font-bold tracking-widest text-[#9E4244] uppercase text-center"
                            >
                                Askra Konstruksi
                            </motion.h1>
                        </div>

                        {/* Sub Text Container */}
                        <div className="overflow-hidden flex items-center justify-center gap-3 md:gap-4 w-full">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "2rem" }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="h-[1px] bg-[#9E4244]/50 hidden sm:block"
                            />
                            <motion.p
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.7, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
                                className="text-[10px] sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.2em] text-[#9E4244]/80 font-light uppercase text-center"
                            >
                                by CV Adi Sarana Kreasi
                            </motion.p>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "2rem" }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="h-[1px] bg-[#9E4244]/50 hidden sm:block"
                            />
                        </div>

                        {/* Loading Progress Line */}
                        <motion.div
                            className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-[2px] bg-[#9E4244]/10 rounded-full overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <motion.div
                                className="h-full bg-[#9E4244]"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.4, delay: 0.2, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </div>

                    {/* Decorative Background Elements */}
                    <motion.div
                        className="absolute inset-0 z-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(158,66,68,0.06)_0%,transparent_50%)]" />
                        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_100%,rgba(158,66,68,0.06)_0%,transparent_50%)]" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
