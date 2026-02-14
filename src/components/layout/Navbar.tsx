"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "transition-all duration-700 ease-luxury",
          isScrolled
            ? "bg-brand-navy-900/95 backdrop-blur-sm shadow-soft"
            : "bg-transparent"
        )}
        role="navigation"
        aria-label="ניווט ראשי"
      >
        <div className="content-wide flex items-center justify-between py-5">
          {/* Logo — MS monogram icon, right side in RTL */}
          <Link href="/" aria-label="מיכל סיימון - עמוד הבית">
            <Image
              src="/images/logo-icon.png"
              alt="מיכל סיימון - עורכת דין"
              width={44}
              height={44}
              className="h-10 w-10 rounded-full transition-all duration-700 ease-luxury lg:h-11 lg:w-11"
              priority
            />
          </Link>

          {/* Desktop Links — left side in RTL */}
          <ul className="hidden items-center gap-8 lg:flex xl:gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "group relative text-xs font-light uppercase tracking-[0.2em]",
                    "transition-colors duration-500 ease-luxury",
                    isScrolled
                      ? "text-terracotta-500/80 hover:text-terracotta-500"
                      : "text-white/80 hover:text-white"
                  )}
                >
                  {link.label}
                  {/* Underline micro-interaction — expands from center */}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-[1px] w-full origin-center",
                      "scale-x-0 transition-transform duration-500 ease-luxury",
                      "group-hover:scale-x-100",
                      isScrolled ? "bg-terracotta-500" : "bg-white"
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger — mobile only */}
          <button
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "סגור תפריט" : "פתח תפריט"}
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={cn(
                "block h-[1.5px] w-6 transition-all duration-500 ease-luxury",
                isScrolled && !isMobileMenuOpen
                  ? "bg-terracotta-500"
                  : "bg-white",
                isMobileMenuOpen &&
                  "translate-y-[7.5px] rotate-45 bg-white"
              )}
            />
            <span
              className={cn(
                "block h-[1.5px] w-6 transition-all duration-500 ease-luxury",
                isScrolled && !isMobileMenuOpen
                  ? "bg-terracotta-500"
                  : "bg-white",
                isMobileMenuOpen &&
                  "-translate-y-[7.5px] -rotate-45 bg-white"
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
