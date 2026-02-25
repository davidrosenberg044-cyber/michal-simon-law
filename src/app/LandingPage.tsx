"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"

/* ═══════════════════════════════════════════════════════════════
   MICHAL SIMON LAW — v8 SKY-TO-SKY
   Fixed city skyline background — glassmorphism sections float over it
   Page begins in the sky and ends in the sky.
   ═══════════════════════════════════════════════════════════════ */

const C = {
  name: "מיכל סיימון",
  title: "עו״ד מיכל סיימון",
  heroSub: "עורכת דין | נדל״ן ומקרקעין",
  heroCta: "לתיאום פגישה",
  desc: "מעטפת משפטית אסטרטגית המעניקה הגנה מלאה לנכס היקר לכם מכל. מהחוזה ועד למפתח — אני כאן כדי להבטיח שתגיעו לכל עסקה בביטחון מוחלט, בראש שקט ובעיניים פקוחות.",
  phone: "054-7850530",
  whatsapp: "9720547850530",
  email: "office@michalsimon.law",
  address: "רח׳ רבי יצחק נפחא 28, בית שמש",

  stats: [
    { target: 500, suffix: "+", label: "עסקאות שהושלמו" },
    { target: 15, suffix: "+", label: "שנות ניסיון" },
    { target: 100, suffix: "%", label: "מחויבות ללקוח" },
    { target: 24, suffix: "h", label: "זמן תגובה" },
  ],

  services: [
    { num: "01", title: "מכר ורכישה", en: "Purchase & Sale", desc: "ליווי צמוד מהמשא ומתן ועד העברת בעלות בטאבו. בדיקת כל סעיף בחוזה, הגנה על האינטרסים שלכם.", icon: "M3 21h18M3 7v14M21 7v14M5 7V4a1 1 0 011-1h12a1 1 0 011 1v3M9 21v-4a1 1 0 011-1h4a1 1 0 011 1v4" },
    { num: "02", title: "בדיקת נאותות", en: "Due Diligence", desc: "בדיקה מקיפה של המצב המשפטי, התכנוני והרישומי של הנכס לפני כל חתימה.", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
    { num: "03", title: "ייצוג בפרויקטים", en: "New Projects", desc: "ייצוג רוכשים ומשקיעים מול יזמים וקבלנים בפרויקטים חדשים מהתכנון ועד האכלוס.", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
    { num: "04", title: "עסקאות קומבינציה", en: "Combination", desc: "ליווי בעסקאות מורכבות — מכירה, בנייה ותמ״א. ניהול מו״מ מול כל הצדדים.", icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" },
    { num: "05", title: "הסכמי שכירות", en: "Lease Agreements", desc: "חוזי שכירות מקצועיים שמגנים עליכם לטווח ארוך. הגנה על שוכר ומשכיר כאחד.", icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" },
    { num: "06", title: "ייעוץ למשקיעים", en: "Investment Advisory", desc: "אסטרטגיה משפטית, תכנון מס ומבנה עסקה מותאם למשקיעי נדל״ן מתחילים ומנוסים.", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
  ],

  about: {
    headline: "מקצועיות ללא פשרות.\nיחס אישי בכל עסקה.",
    text: "אני מלווה לקוחות פרטיים, משקיעים ויזמים בעסקאות נדל״ן מורכבות. הגישה שלי משלבת מקצועיות משפטית חדה עם תשומת לב אישית לכל פרט — כי כשמדובר בנכס שלכם, אין מקום לפשרות.",
    quote: "אני כאן כדי להבטיח שתגיעו לכל עסקה בביטחון מוחלט, בראש שקט ובעיניים פקוחות.",
  },

  process: [
    { num: "01", title: "פגישת היכרות", desc: "שיחה אישית להבנת הצרכים והמטרות שלכם." },
    { num: "02", title: "בדיקה מעמיקה", desc: "בדיקת נאותות מקיפה של הנכס והעסקה." },
    { num: "03", title: "משא ומתן", desc: "ייצוג האינטרסים שלכם בחדות ובנחישות." },
    { num: "04", title: "חתימה ומפתח", desc: "ליווי עד הסוף — חתימה, העברה, מפתח ביד." },
  ],

  testimonials: [
    { text: "מיכל זיהתה בעיות בחוזה שאף אחד לא שם לב אליהן. חסכה לנו מאות אלפי שקלים.", name: "דוד ושרה כ.", role: "רוכשי דירה, ירושלים" },
    { text: "כמשקיע עם 12 נכסים, אני צריך עו״ד שמבינה את התמונה הגדולה. מיכל בדיוק כזו.", name: "אבי מ.", role: "משקיע נדל״ן" },
    { text: "עסקת קומבינציה עם תמ״א — מיכל ניהלה הכל בצורה מושלמת מול 4 צדדים.", name: "רחל ויוסי ל.", role: "בעלי קרקע, בית שמש" },
  ],

  formServices: ["מכר / רכישת דירה", "בדיקת נאותות", "ייצוג בפרויקט", "שכירות", "קומבינציה", "ייעוץ למשקיעים", "אחר"],
}

const t = {
  navy: "#0B1A2F", navyMid: "#132840", navyLight: "#1C3352",
  copper: "#B5654A", copperLight: "#CD8468", copperMuted: "rgba(181,101,74,0.08)",
  white: "#FFFFFF", snow: "#FDFBF8", cream: "#F6F1EA", linen: "#EDE6DB",
  sand: "#D8CFBF", warmGray: "#8A7F72", textBody: "#4A453D", textDark: "#1A1814",
  border: "#E4DDD3",
  serif: "'Frank Ruhl Libre', Georgia, serif",
  sans: "'Heebo', system-ui, sans-serif",
  display: "'Cormorant Garamond', Georgia, serif",
  // Sky-to-Sky: the color at the very top of the bg image (sampled)
  skyTop: "#4A6278",
  skyGlow: "#6B8299",
}

/* ─── Glass Panel: the core visual unit for sections ─── */
const glass = {
  dark: {
    background: "rgba(11, 26, 47, 0.72)",
    backdropFilter: "blur(32px) saturate(1.3)",
    WebkitBackdropFilter: "blur(32px) saturate(1.3)",
    border: "1px solid rgba(255,255,255,0.06)",
  } as React.CSSProperties,
  medium: {
    background: "rgba(11, 26, 47, 0.55)",
    backdropFilter: "blur(28px) saturate(1.2)",
    WebkitBackdropFilter: "blur(28px) saturate(1.2)",
    border: "1px solid rgba(255,255,255,0.08)",
  } as React.CSSProperties,
  light: {
    background: "rgba(253, 251, 248, 0.75)",
    backdropFilter: "blur(32px) saturate(1.4)",
    WebkitBackdropFilter: "blur(32px) saturate(1.4)",
    border: "1px solid rgba(255,255,255,0.5)",
  } as React.CSSProperties,
  subtle: {
    background: "rgba(11, 26, 47, 0.35)",
    backdropFilter: "blur(20px) saturate(1.15)",
    WebkitBackdropFilter: "blur(20px) saturate(1.15)",
    border: "1px solid rgba(255,255,255,0.05)",
  } as React.CSSProperties,
}

function useCounter(target: number, active: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let n = 0; const step = target / 125
    const timer = setInterval(() => { n += step; if (n >= target) { setCount(target); clearInterval(timer) } else setCount(Math.floor(n)) }, 16)
    return () => clearInterval(timer)
  }, [active, target])
  return count
}

function GlassSection({ children, id, variant = "dark", style }: {
  children: React.ReactNode; id?: string; variant?: "dark" | "medium" | "light" | "subtle"; style?: React.CSSProperties
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.section ref={ref} id={id} initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      style={{ position: "relative", zIndex: 2, padding: "0 32px", marginBottom: 2, ...style }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        borderRadius: 16,
        padding: "80px 56px",
        boxShadow: "0 8px 60px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1)",
        ...glass[variant],
      }}>
        {children}
      </div>
    </motion.section>
  )
}

function Wrap({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 2, ...style }}>{children}</div>
}

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.85, ease: [0.16, 1, 0.3, 1] } }) }
const scaleIn = { hidden: { opacity: 0, scale: 0.92 }, visible: (i: number = 0) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }) }

export default function MichalSimonLanding() {
  const [formData, setFormData] = useState({ name: "", phone: "", service: "" })
  const [sent, setSent] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [activeTesti, setActiveTesti] = useState(0)

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  useEffect(() => {
    const h = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])

  useEffect(() => {
    const iv = setInterval(() => setActiveTesti((p) => (p + 1) % C.testimonials.length), 5500)
    return () => clearInterval(iv)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) return
    try { setSent(true) } catch {}
  }

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  const scrolled = scrollY > 60

  return (
    <div dir="rtl" style={{ fontFamily: t.sans, color: t.textBody, background: t.navy, overflowX: "hidden" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Frank+Ruhl+Libre:wght@300;400;500;700;900&family=Heebo:wght@300;400;500;600;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        ::selection{background:${t.copper}25}
      `}</style>

      {/* ═══════════════════════════════════════════════════════
          FIXED BACKGROUND — City skyline stays behind everything
          The entire page scrolls OVER this background
         ═══════════════════════════════════════════════════════ */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
      }}>
        <img src="/images/bg.jpg" alt="" style={{
          width: "100%", height: "100%", objectFit: "cover",
          objectPosition: "center 30%",
        }} />
        {/* Subtle gradient to darken lower portion of fixed bg */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(180deg, 
            transparent 0%, 
            transparent 30%, 
            rgba(11,26,47,0.15) 50%, 
            rgba(11,26,47,0.35) 70%, 
            rgba(11,26,47,0.5) 100%)`,
        }} />
      </div>

      {/* ═══════ HEADER — Real MS logo ═══════ */}
      <motion.header
        initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0 48px", height: 72,
          background: scrolled ? `rgba(11,26,47,0.88)` : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(1.2)" : "none",
          borderBottom: scrolled ? `1px solid rgba(255,255,255,0.06)` : "none",
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="/images/logo-white.png" alt="MS - מיכל סיימון עורכת דין"
            style={{ height: 36, objectFit: "contain", opacity: 0.9 }} />
        </div>
        <nav style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {[
            { l: "ראשי", id: "hero" },
            { l: "אודות", id: "about" },
            { l: "תחומי עיסוק", id: "services" },
            { l: "תהליך", id: "process" },
            { l: "צור קשר", id: "contact" },
          ].map(({ l, id }) => (
            <button key={id} onClick={() => scrollTo(id)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 13, color: `${t.white}60`, fontFamily: t.sans,
              transition: "color 0.3s",
            }}
              onMouseOver={(e) => (e.currentTarget.style.color = t.white)}
              onMouseOut={(e) => (e.currentTarget.style.color = `${t.white}60`)}
            >{l}</button>
          ))}
        </nav>
      </motion.header>

      {/* ═══════════════════════════════════════════════════════
          HERO — Full-screen city skyline + portrait
          This section has its OWN bg image (parallax zoom)
          so the hero feels grander than the fixed bg
         ═══════════════════════════════════════════════════════ */}
      <section ref={heroRef} id="hero" style={{
        position: "relative", width: "100%", height: "100vh",
        overflow: "hidden", zIndex: 1,
      }}>
        {/* BG — City skyline, parallax zoom */}
        <motion.div style={{ scale: heroScale, position: "absolute", inset: 0, zIndex: 0 }}>
          <img src="/images/bg.jpg" alt="" style={{
            width: "100%", height: "100%", objectFit: "cover",
          }} />
        </motion.div>

        {/* Gradient overlays */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: `linear-gradient(180deg, 
            rgba(11,26,47,0.4) 0%, 
            rgba(11,26,47,0.2) 35%, 
            rgba(11,26,47,0.3) 65%, 
            rgba(11,26,47,0.7) 100%)`,
        }} />
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: `linear-gradient(to left, transparent 40%, rgba(11,26,47,0.5) 100%)`,
        }} />

        {/* Content grid: text right (RTL), portrait left */}
        <div style={{
          position: "relative", zIndex: 2,
          width: "100%", height: "100%",
          display: "grid", gridTemplateColumns: "1fr 1fr",
        }}>
          {/* RIGHT — Name + CTA */}
          <motion.div style={{
            opacity: heroOpacity,
            display: "flex", flexDirection: "column",
            justifyContent: "center",
            padding: "120px 64px 80px",
          }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 style={{
                fontFamily: t.serif,
                fontSize: "clamp(3rem, 6vw, 5.5rem)",
                fontWeight: 700,
                color: t.white,
                lineHeight: 1.05,
                textShadow: "0 2px 40px rgba(0,0,0,0.3)",
                marginBottom: 20,
              }}>
                {C.name}
              </h1>
            </motion.div>

            <motion.div
              initial={{ width: 0 }} animate={{ width: 60 }}
              transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: 1.5, background: `${t.copper}cc`, marginBottom: 18 }}
            />

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              style={{
                fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
                color: `${t.white}80`,
                letterSpacing: "0.1em",
                fontWeight: 300,
                textShadow: "0 1px 20px rgba(0,0,0,0.3)",
                marginBottom: 36,
              }}
            >
              {C.heroSub}
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              onClick={() => scrollTo("contact")}
              style={{
                alignSelf: "flex-start",
                background: "transparent",
                color: t.white,
                border: `1px solid ${t.white}40`,
                padding: "14px 40px",
                borderRadius: 0,
                fontSize: 14,
                fontWeight: 400,
                cursor: "pointer",
                fontFamily: t.sans,
                letterSpacing: "0.08em",
                transition: "all 0.4s",
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = `${t.white}15`; e.currentTarget.style.borderColor = `${t.white}70` }}
              onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = `${t.white}40` }}
            >
              {C.heroCta}
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 12 }}
            >
              <span style={{ fontSize: 15, color: `${t.white}50`, letterSpacing: "0.04em" }}>{C.phone}</span>
            </motion.div>
          </motion.div>

          {/* LEFT — Portrait with copper frame + fade (UNTOUCHED) */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              padding: "80px 48px 0",
              height: "100%",
            }}
          >
            <div style={{ position: "relative", width: "75%", height: "82%" }}>
              {/* Outer copper glow ring */}
              <div style={{
                position: "absolute", inset: -8, borderRadius: 12,
                border: `1px solid ${t.copper}25`,
                boxShadow: `0 0 40px ${t.copper}15, 0 0 80px ${t.copper}08`,
                pointerEvents: "none", zIndex: 2,
              }} />
              {/* Main copper frame */}
              <div style={{
                position: "absolute", inset: -3, borderRadius: 8,
                border: `2px solid ${t.copper}70`,
                boxShadow: `0 0 20px ${t.copper}30, inset 0 0 20px ${t.copper}10`,
                pointerEvents: "none", zIndex: 2,
              }} />
              {/* Corner accents */}
              {[
                { pos: { top: -8, left: -8 }, sides: "borderTop,borderLeft", radius: "6px 0 0 0", opacity: "90" },
                { pos: { top: -8, right: -8 }, sides: "borderTop,borderRight", radius: "0 6px 0 0", opacity: "90" },
                { pos: { bottom: -8, left: -8 }, sides: "borderBottom,borderLeft", radius: "0 0 0 6px", opacity: "50" },
                { pos: { bottom: -8, right: -8 }, sides: "borderBottom,borderRight", radius: "0 0 6px 0", opacity: "50" },
              ].map((c, i) => (
                <div key={i} style={{
                  position: "absolute", ...c.pos, width: 28, height: 28,
                  ...Object.fromEntries(c.sides.split(",").map(s => [s, `2.5px solid ${t.copper}${c.opacity}`])),
                  borderRadius: c.radius,
                  pointerEvents: "none", zIndex: 3,
                }} />
              ))}
              {/* Inner image area */}
              <div style={{
                position: "relative", width: "100%", height: "100%",
                borderRadius: 5, overflow: "hidden",
                boxShadow: `0 8px 60px rgba(0,0,0,0.4), inset 0 0 30px rgba(0,0,0,0.1)`,
              }}>
                <img src="/images/portrait.jpg" alt={C.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "18%", background: `linear-gradient(to bottom, rgba(11,26,47,0.35), transparent)`, pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: `linear-gradient(to top, rgba(11,26,47,0.95) 0%, rgba(11,26,47,0.6) 35%, rgba(11,26,47,0.15) 65%, transparent)`, pointerEvents: "none" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, rgba(11,26,47,0.45) 0%, transparent 22%)`, pointerEvents: "none" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to left, rgba(11,26,47,0.15) 0%, transparent 15%)`, pointerEvents: "none" }} />
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, transparent 50%, rgba(11,26,47,0.25) 100%)`, pointerEvents: "none" }} />
              </div>
            </div>
            <div style={{
              position: "absolute", top: "10%", right: "5%", bottom: "5%", left: "5%",
              borderRadius: 10,
              background: `radial-gradient(ellipse at center, ${t.copper}12, transparent 70%)`,
              filter: "blur(25px)", pointerEvents: "none", zIndex: -1,
            }} />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
          style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}
            style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${t.white}50, transparent)`, margin: "0 auto" }} />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          BELOW-HERO CONTENT — Glassmorphism panels over fixed bg
          The skyline is always visible behind these sections
         ═══════════════════════════════════════════════════════════ */}

      {/* ═══════ STATS BAR ═══════ */}
      {(() => {
        const ref = useRef(null); const inV = useInView(ref, { once: true })
        return (
          <section ref={ref} style={{ position: "relative", zIndex: 2, padding: "0 32px", marginTop: -1 }}>
            <div style={{
              maxWidth: 1200, margin: "0 auto",
              borderRadius: "0 0 16px 16px",
              ...glass.dark,
              boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
                {C.stats.map((s, i) => {
                  const c = useCounter(s.target, inV)
                  return (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.12, duration: 0.6 }}
                      style={{ padding: "42px 0", textAlign: "center", borderRight: i > 0 ? `1px solid ${t.white}08` : "none" }}>
                      <div style={{ fontFamily: t.display, fontSize: 44, fontWeight: 400, color: t.white, letterSpacing: "-0.02em" }}>{c}{s.suffix}</div>
                      <div style={{ fontSize: 12, color: `${t.white}35`, marginTop: 6 }}>{s.label}</div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </section>
        )
      })()}

      {/* Spacer — let the skyline breathe */}
      <div style={{ height: 80, position: "relative", zIndex: 1 }} />

      {/* ═══════ INTRO TAGLINE ═══════ */}
      <GlassSection variant="medium">
        <Wrap style={{ maxWidth: 780, textAlign: "center" }}>
          <motion.div variants={fadeUp}>
            <h2 style={{
              fontFamily: t.serif, fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
              fontWeight: 700, color: t.white, lineHeight: 1.3, marginBottom: 18,
            }}>
              עסקה בטוחה — בעיניים פקוחות.
            </h2>
            <div style={{ width: 48, height: 1.5, background: `${t.copper}cc`, margin: "0 auto 24px" }} />
            <p style={{ fontSize: 16.5, lineHeight: 2, color: `${t.white}70` }}>{C.desc}</p>
          </motion.div>
        </Wrap>
      </GlassSection>

      <div style={{ height: 48, position: "relative", zIndex: 1 }} />

      {/* ═══════ SERVICES ═══════ */}
      <GlassSection id="services" variant="dark">
        <Wrap>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", marginBottom: 12 }}>
              <div style={{ width: 32, height: 1, background: `${t.copper}80` }} />
              <span style={{ fontSize: 11, letterSpacing: "0.15em", color: `${t.copper}cc`, fontWeight: 500 }}>תחומי התמחות</span>
              <div style={{ width: 32, height: 1, background: `${t.copper}80` }} />
            </div>
            <h2 style={{ fontFamily: t.serif, fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 700, color: t.white }}>
              כל סוגי עסקאות הנדל״ן.
            </h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {C.services.map((s, i) => (
              <motion.div key={i} variants={scaleIn} custom={i}
                onMouseEnter={() => setHoveredService(i)} onMouseLeave={() => setHoveredService(null)}
                style={{
                  padding: "40px 32px",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 12,
                  background: hoveredService === i ? `rgba(181,101,74,0.15)` : `rgba(255,255,255,0.04)`,
                  border: hoveredService === i ? `1px solid ${t.copper}40` : `1px solid rgba(255,255,255,0.06)`,
                  transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "default",
                  backdropFilter: "blur(8px)",
                }}>
                {/* SVG icon */}
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: hoveredService === i ? `${t.copper}20` : `rgba(255,255,255,0.05)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 20, transition: "all 0.4s",
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={hoveredService === i ? t.copper : `${t.white}50`}
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transition: "stroke 0.4s" }}>
                    <path d={s.icon} />
                  </svg>
                </div>
                {/* Watermark number */}
                <div style={{
                  position: "absolute", top: -10, left: -6,
                  fontFamily: t.display, fontSize: 100, fontWeight: 300,
                  color: hoveredService === i ? `${t.copper}08` : `${t.white}03`,
                  lineHeight: 1, transition: "color 0.5s", pointerEvents: "none",
                }}>{s.num}</div>
                <span style={{ fontSize: 10, letterSpacing: "0.14em", color: hoveredService === i ? `${t.copper}cc` : `${t.white}30`, transition: "color 0.4s" }}>{s.en}</span>
                <h3 style={{ fontFamily: t.serif, fontSize: 20, fontWeight: 700, color: t.white, margin: "8px 0 12px", transition: "color 0.4s" }}>{s.title}</h3>
                <div style={{ width: 28, height: 1.5, background: hoveredService === i ? t.copper : `${t.copper}40`, marginBottom: 14, transition: "background 0.4s" }} />
                <p style={{ fontSize: 14, lineHeight: 1.8, color: `${t.white}50`, margin: 0, transition: "color 0.4s" }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </Wrap>
      </GlassSection>

      <div style={{ height: 48, position: "relative", zIndex: 1 }} />

      {/* ═══════ ABOUT ═══════ */}
      <GlassSection id="about" variant="dark">
        <Wrap style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <motion.div variants={fadeUp}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 32, height: 1, background: `${t.copper}80` }} />
              <span style={{ fontSize: 11, letterSpacing: "0.15em", color: `${t.copper}cc`, fontWeight: 500 }}>אודות</span>
            </div>
            <h2 style={{
              fontFamily: t.serif, fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              fontWeight: 700, color: t.white, lineHeight: 1.3,
              whiteSpace: "pre-line", marginBottom: 20,
            }}>{C.about.headline}</h2>
            <div style={{ width: 48, height: 1.5, background: `${t.copper}80`, marginBottom: 20 }} />
            <p style={{ fontSize: 15.5, lineHeight: 1.95, color: `${t.white}65`, marginBottom: 28 }}>{C.about.text}</p>
            <div style={{
              padding: "20px 24px",
              borderRight: `2px solid ${t.copper}80`,
              background: `${t.copper}08`,
              borderRadius: "0 8px 8px 0",
            }}>
              <p style={{ fontFamily: t.serif, fontSize: 16, fontStyle: "italic", color: `${t.white}90`, lineHeight: 1.7, margin: 0 }}>
                {"\u201E"}{C.about.quote}{"\u201C"}
              </p>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} custom={1}>
            <div style={{
              width: "100%", aspectRatio: "4/5",
              borderRadius: 12, overflow: "hidden",
              boxShadow: `0 20px 60px rgba(0,0,0,0.4)`,
              border: `1px solid rgba(255,255,255,0.08)`,
            }}>
              <img src="/images/portrait-full.jpg" alt={C.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </motion.div>
        </Wrap>
      </GlassSection>

      <div style={{ height: 48, position: "relative", zIndex: 1 }} />

      {/* ═══════ PROCESS ═══════ */}
      <GlassSection id="process" variant="subtle">
        <Wrap>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 11, letterSpacing: "0.15em", color: `${t.copper}cc` }}>תהליך העבודה</span>
            <h2 style={{ fontFamily: t.serif, fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 700, color: t.white, marginTop: 10 }}>
              מהפגישה הראשונה — ועד המפתח
            </h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
            {C.process.map((p, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}
                style={{
                  padding: "40px 28px",
                  borderRight: i > 0 ? `1px solid ${t.white}08` : "none",
                  textAlign: "center",
                }}>
                <div style={{
                  fontFamily: t.display, fontSize: 56, fontWeight: 300,
                  color: `${t.copper}30`, lineHeight: 1, marginBottom: 16,
                }}>{p.num}</div>
                <h3 style={{ fontFamily: t.serif, fontSize: 18, fontWeight: 600, color: t.white, marginBottom: 10 }}>{p.title}</h3>
                <div style={{ width: 20, height: 1, background: `${t.copper}40`, margin: "0 auto 12px" }} />
                <p style={{ fontSize: 13, lineHeight: 1.75, color: `${t.white}45`, margin: 0 }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </Wrap>
      </GlassSection>

      <div style={{ height: 48, position: "relative", zIndex: 1 }} />

      {/* ═══════ TESTIMONIALS ═══════ */}
      <GlassSection id="testimonials" variant="medium">
        <Wrap style={{ maxWidth: 700, textAlign: "center" }}>
          <motion.div variants={fadeUp}>
            <span style={{ fontSize: 11, letterSpacing: "0.15em", color: `${t.copper}cc` }}>המלצות</span>
            <h2 style={{ fontFamily: t.serif, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: t.white, margin: "10px 0 44px" }}>
              מה אומרים הלקוחות שלנו
            </h2>
          </motion.div>
          <motion.div variants={fadeUp} style={{ minHeight: 180 }}>
            <AnimatePresence mode="wait">
              <motion.div key={activeTesti} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }}>
                <div style={{ fontFamily: t.display, fontSize: 64, color: `${t.copper}20`, lineHeight: 1, marginBottom: -8 }}>{"\u201D"}</div>
                <p style={{ fontSize: 18, fontFamily: t.serif, lineHeight: 1.85, color: `${t.white}90`, margin: "0 0 24px" }}>{C.testimonials[activeTesti].text}</p>
                <div style={{ width: 24, height: 1, background: t.copper, margin: "0 auto 16px" }} />
                <div style={{ fontSize: 14, fontWeight: 600, color: t.white }}>{C.testimonials[activeTesti].name}</div>
                <div style={{ fontSize: 12, color: `${t.white}40` }}>{C.testimonials[activeTesti].role}</div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 32 }}>
            {C.testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveTesti(i)} style={{
                width: activeTesti === i ? 24 : 6, height: 6, borderRadius: 3,
                border: "none", cursor: "pointer",
                background: activeTesti === i ? t.copper : `${t.white}20`,
                transition: "all 0.4s",
              }} />
            ))}
          </div>
        </Wrap>
      </GlassSection>

      <div style={{ height: 48, position: "relative", zIndex: 1 }} />

      {/* ═══════ CONTACT ═══════ */}
      <GlassSection id="contact" variant="dark">
        <Wrap>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 72, alignItems: "start" }}>
            <motion.div variants={fadeUp}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 32, height: 1, background: `${t.copper}80` }} />
                <span style={{ fontSize: 11, letterSpacing: "0.15em", color: `${t.copper}cc`, fontWeight: 500 }}>יצירת קשר</span>
              </div>
              <h2 style={{ fontFamily: t.serif, fontSize: "clamp(1.7rem, 3vw, 2.3rem)", fontWeight: 700, color: t.white, lineHeight: 1.25, marginBottom: 16 }}>
                בואו נדבר על{"\n"}העסקה שלכם.
              </h2>
              <div style={{ width: 48, height: 1.5, background: `${t.copper}80`, marginBottom: 20 }} />
              <p style={{ fontSize: 15, lineHeight: 1.8, color: `${t.white}55`, marginBottom: 40 }}>
                השאירו פרטים ונחזור אליכם תוך 24 שעות — ללא עלות וללא התחייבות.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { label: C.phone, sub: "ראשון-חמישי, 9:00-18:00" },
                  { label: C.email, sub: "מענה תוך יום עסקים" },
                  { label: C.address, sub: "בתיאום מראש" },
                ].map(({ label, sub }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 5, height: 5, borderRadius: 1, background: `${t.copper}80`, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: `${t.white}90` }}>{label}</div>
                      <div style={{ fontSize: 11, color: `${t.white}30` }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} custom={1}>
              {sent ? (
                <div style={{
                  padding: 60, textAlign: "center", borderRadius: 12,
                  background: `rgba(255,255,255,0.06)`,
                  border: `1px solid rgba(255,255,255,0.08)`,
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    border: `2px solid ${t.copper}`, display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 16px",
                  }}>
                    <span style={{ color: t.copper, fontSize: 17, fontWeight: 700 }}>V</span>
                  </div>
                  <h3 style={{ fontFamily: t.serif, fontSize: 22, color: t.white, marginBottom: 6 }}>תודה.</h3>
                  <p style={{ fontSize: 14, color: `${t.white}55` }}>הפרטים נשלחו. מיכל תחזור אליכם בהקדם.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{
                  padding: "44px 40px", borderRadius: 12,
                  background: `rgba(255,255,255,0.06)`,
                  border: `1px solid rgba(255,255,255,0.08)`,
                  display: "flex", flexDirection: "column", gap: 18,
                }}>
                  <div style={{ marginBottom: 4 }}>
                    <h3 style={{ fontFamily: t.serif, fontSize: 21, fontWeight: 700, color: t.white }}>פגישת ייעוץ ראשונית</h3>
                    <p style={{ fontSize: 12, color: `${t.white}35`, marginTop: 2 }}>ללא עלות · ללא התחייבות</p>
                  </div>
                  {[
                    { name: "name", label: "שם מלא", type: "text", ph: "השם שלכם" },
                    { name: "phone", label: "טלפון", type: "tel", ph: "050-0000000" },
                  ].map(({ name, label, type, ph }) => (
                    <div key={name}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: `${t.white}70`, marginBottom: 6 }}>{label}</label>
                      <input type={type} placeholder={ph} value={formData[name as keyof typeof formData]}
                        onChange={(e) => setFormData((p) => ({ ...p, [name]: e.target.value }))}
                        style={{
                          width: "100%", padding: "14px 16px", borderRadius: 8,
                          border: `1px solid rgba(255,255,255,0.1)`,
                          background: `rgba(255,255,255,0.05)`,
                          fontSize: 15, fontFamily: t.sans, color: t.white,
                          outline: "none", boxSizing: "border-box", transition: "border-color 0.3s",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = `${t.copper}80`)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = `rgba(255,255,255,0.1)`)}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: `${t.white}70`, marginBottom: 6 }}>סוג שירות</label>
                    <select value={formData.service} onChange={(e) => setFormData((p) => ({ ...p, service: e.target.value }))}
                      style={{
                        width: "100%", padding: "14px 16px", borderRadius: 8,
                        border: `1px solid rgba(255,255,255,0.1)`,
                        background: `rgba(255,255,255,0.05)`,
                        fontSize: 15, fontFamily: t.sans, color: t.white,
                        outline: "none", boxSizing: "border-box", cursor: "pointer",
                      }}>
                      <option value="" style={{ background: t.navy }}>בחרו שירות</option>
                      {C.formServices.map((s) => <option key={s} value={s} style={{ background: t.navy }}>{s}</option>)}
                    </select>
                  </div>
                  <button type="submit" style={{
                    width: "100%", padding: "15px", borderRadius: 8,
                    border: `1px solid ${t.copper}40`,
                    background: `${t.copper}20`, color: t.white,
                    fontSize: 14, fontWeight: 600, fontFamily: t.sans,
                    cursor: "pointer", transition: "all 0.3s",
                  }}
                    onMouseOver={(e) => { e.currentTarget.style.background = t.copper; e.currentTarget.style.borderColor = t.copper }}
                    onMouseOut={(e) => { e.currentTarget.style.background = `${t.copper}20`; e.currentTarget.style.borderColor = `${t.copper}40` }}
                  >שליחת פרטים</button>
                  <p style={{ fontSize: 10, color: `${t.white}20`, textAlign: "center", margin: 0 }}>הפרטים שלכם מאובטחים ומוגנים בהתאם לחוק הגנת הפרטיות.</p>
                </form>
              )}
            </motion.div>
          </div>
        </Wrap>
      </GlassSection>

      {/* ═══════ SKY-TO-SKY FADE — Return to sky ═══════ */}
      <div style={{
        position: "relative", zIndex: 2,
        height: 200,
        background: `linear-gradient(to top, ${t.skyTop} 0%, ${t.skyTop}dd 30%, ${t.skyTop}80 55%, transparent 100%)`,
        marginTop: 48,
      }}>
        {/* Subtle glow at the horizon line */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
          background: `linear-gradient(to top, ${t.skyGlow}20, transparent)`,
        }} />
      </div>

      {/* ═══════ FOOTER — Inside the sky color ═══════ */}
      <footer style={{
        background: t.skyTop,
        padding: "0 32px 32px",
        position: "relative", zIndex: 2,
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)`,
        }} />
        <Wrap>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            paddingBottom: 28, borderBottom: `1px solid rgba(255,255,255,0.06)`, marginBottom: 20,
          }}>
            <img src="/images/logo-white.png" alt="MS" style={{ height: 28, opacity: 0.5 }} />
            <div style={{ fontSize: 12, color: `${t.white}25`, lineHeight: 2, textAlign: "left" }}>
              {C.phone} · {C.email}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 10, color: `${t.white}12` }}>{"\u00A9"} {new Date().getFullYear()} {C.title}</span>
            <span style={{ fontSize: 10, color: `${t.white}12` }}>FERDI AI</span>
          </div>
        </Wrap>
      </footer>

      {/* ═══════ WHATSAPP ═══════ */}
      <motion.a href={`https://wa.me/${C.whatsapp}`} target="_blank" rel="noopener noreferrer"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}
        style={{
          position: "fixed", bottom: 24, left: 24, zIndex: 100,
          width: 46, height: 46, borderRadius: 8,
          background: `rgba(11,26,47,0.8)`, backdropFilter: "blur(12px)",
          color: `${t.white}70`,
          display: "flex", alignItems: "center", justifyContent: "center",
          textDecoration: "none", border: `1px solid ${t.white}10`,
          transition: "all 0.3s", fontSize: 11, fontWeight: 500,
        }}
        onMouseOver={(e: any) => { e.currentTarget.style.background = "#25D366"; e.currentTarget.style.color = t.white; e.currentTarget.style.borderColor = "#25D366" }}
        onMouseOut={(e: any) => { e.currentTarget.style.background = `rgba(11,26,47,0.8)`; e.currentTarget.style.color = `${t.white}70`; e.currentTarget.style.borderColor = `${t.white}10` }}
      >WA</motion.a>

      {/* ═══════ RESPONSIVE ═══════ */}
      <style jsx global>{`
        @media (max-width: 900px) {
          header nav { display: none !important; }
          header { padding: 0 20px !important; }
        }
        @media (max-width: 768px) {
          #hero > div:last-of-type { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 1fr 1.1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
