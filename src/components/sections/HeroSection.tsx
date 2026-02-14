"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ============================================
   ANIMATION CONFIG
   Reuses the luxury easing from MobileMenu.tsx
   ============================================ */

const LUXURY_EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      ease: LUXURY_EASE,
    },
  },
};

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image — Ken Burns slow zoom-out */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 10, ease: "linear" }}
      >
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-brand-navy-900/90 via-brand-navy-900/70 to-brand-navy-900/95" />

      {/* Content — centered, stagger fade-in */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Headline */}
        <motion.h1
          variants={itemVariants}
          className="font-heading text-6xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl"
        >
          מיכל סיימון
        </motion.h1>

        {/* Terracotta Divider */}
        <motion.div
          variants={itemVariants}
          className="mx-auto my-8 h-[1.5px] w-16 bg-terracotta-500"
        />

        {/* Sub Headline */}
        <motion.p
          variants={itemVariants}
          className="font-body text-xl font-light tracking-widest text-gray-200 sm:text-2xl"
        >
          עורכת דין | נדל&quot;ן ומקרקעין
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="mt-10">
          <Link
            href="/contact"
            className="inline-block border border-terracotta-500 px-10 py-4 font-body text-sm font-light uppercase tracking-[0.2em] text-white transition-all duration-600 ease-luxury hover:bg-terracotta-500 hover:text-white"
          >
            לתיאום פגישה
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
