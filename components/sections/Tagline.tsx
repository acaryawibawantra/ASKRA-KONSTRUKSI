"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate, Variants, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import s from "./Tagline.module.css";

/* ─── data ─── */
const stats = [
    { value: 10, suffix: "+", desc: "Tahun berdiri dengan dedikasi penuh di industri konstruksi." },
    { value: 50, suffix: "+", desc: "Proyek selesai dari perencanaan arsitektur hingga serah terima." },
    { value: 30, suffix: "+", desc: "Tenaga ahli berpengalaman di bidang konstruksi dan arsitektur." },
];

const QUOTE = "Konstruksi bukan sekadar bangunan — ini adalah warisan yang kami bangun bersama Anda.";

/* ─── component ─── */
export function Tagline() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.9", "start 0.3"],
    });

    const width = useTransform(
        scrollYProgress,
        [0, 1],
        [isMobile ? "95%" : "90%", "100%"]
    );

    const borderTopRadius = useTransform(
        scrollYProgress,
        [0, 1],
        [isMobile ? "1.5rem" : "3rem", "0rem"]
    );

    const stagger: Variants = {
        hidden: {},
        show: { transition: { staggerChildren: 0.12 } },
    };
    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <section ref={ref} className="w-full flex justify-center relative z-10 -mt-12 md:mt-0 overflow-hidden bg-[#111111] md:bg-transparent">
            <motion.div
                id="tagline"
                className={s.section}
                style={{
                    width,
                    borderTopLeftRadius: borderTopRadius,
                    borderTopRightRadius: borderTopRadius,
                }}
            >
                <div className={s.inner}>

                    {/* ══ LEFT ══ */}
                    <motion.div
                        className={s.left}
                        variants={stagger}
                        initial="hidden"
                        animate={inView ? "show" : "hidden"}
                    >
                        <motion.div className={s.headerRow} variants={item}>
                            <h2 className={s.heading}>CV. ASKRA Konstruksi</h2>
                        </motion.div>

                        <motion.p className={s.desc} variants={item}>
                            ASKRA Konstruksi adalah perusahaan yang bergerak di bidang konstruksi dan jasa
                            arsitektur yang berdedikasi penuh untuk memberikan hasil terbaik dan solusi
                            inovatif bagi setiap klien kami.
                        </motion.p>

                        <motion.div className={s.imgWrap} variants={item}>
                            <Image
                                src="/images/hero/image-hero.jpg"
                                alt="ASKRA Konstruksi – proyek unggulan"
                                width={900}
                                height={580}
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                                className={s.img}
                            />
                        </motion.div>
                    </motion.div>

                    {/* ══ RIGHT — 2×2 grid ══ */}
                    <motion.div
                        className={s.grid}
                        variants={item}
                        initial="hidden"
                        animate={inView ? "show" : "hidden"}
                    >
                        {/* top-left */}
                        <div className={`${s.cell} ${s.cellBorderRight} ${s.cellBorderBottom}`}>
                            <div className={s.numRow}>
                                <Counter value={stats[0].value} inView={inView} />
                                <span className={s.suffix}>{stats[0].suffix}</span>
                            </div>
                            <p className={s.cellDesc}>{stats[0].desc}</p>
                        </div>

                        {/* top-right */}
                        <div className={`${s.cell} ${s.cellBorderBottom}`}>
                            <div className={s.numRow}>
                                <Counter value={stats[1].value} inView={inView} />
                                <span className={s.suffix}>{stats[1].suffix}</span>
                            </div>
                            <p className={s.cellDesc}>{stats[1].desc}</p>
                        </div>

                        {/* bottom-left */}
                        <div className={`${s.cell} ${s.cellBorderRight}`}>
                            <div className={s.numRow}>
                                <Counter value={stats[2].value} inView={inView} />
                                <span className={s.suffix}>{stats[2].suffix}</span>
                            </div>
                            <p className={s.cellDesc}>{stats[2].desc}</p>
                        </div>

                        {/* bottom-right: dark quote */}
                        <div className={s.darkCell}>
                            <p className={s.quote}>{QUOTE}</p>
                            <Link href="/about" className={s.cta}>
                                <span className={s.ctaDot} />
                                Tentang Kami
                            </Link>
                        </div>
                    </motion.div>

                </div>{/* ── close .inner ── */}
            </motion.div>
        </section>
    );
}

/* ─── counter ─── */
function Counter({ value, inView }: { value: number; inView: boolean }) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!ref.current || !inView) return;
        const ctrl = animate(0, value, {
            duration: 1.8,
            ease: "easeOut",
            onUpdate: (v) => {
                if (ref.current) ref.current.textContent = Math.round(v).toString();
            },
        });
        return () => ctrl.stop();
    }, [value, inView]);

    return <span ref={ref}>0</span>;
}
