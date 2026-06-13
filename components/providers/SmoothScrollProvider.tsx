"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { usePathname } from "next/navigation";

export function SmoothScrollProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Disable JS smooth scroll on mobile completely (use native touch scroll)
        const isMobile = window.innerWidth < 768;
        if (isMobile) return;

        const lenis = new Lenis({
            duration: 0.7, // Shorter duration (0.7s) to make it snappy, not floaty/lebay
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            infinite: false,
        });

        lenisRef.current = lenis;

        let rafId: number;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    // Reset scroll position to top on route change
    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return <>{children}</>;
}
