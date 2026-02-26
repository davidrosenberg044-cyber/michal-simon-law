"use client"

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { motion, useInView, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion"

/* ═══════════════════════════════════════════════════════════════
   MICHAL SIMON LAW — v9 AM LAW 100
   Cinematic: custom cursor, particles, 3D cards, magnetic CTA,
   trust bar, FAQ accordion, scroll progress, border animation
   ═══════════════════════════════════════════════════════════════ */

/* ─── Content ─── */
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

  faq: [
    { q: "כמה עולה ייעוץ ראשוני?", a: "פגישת ההיכרות הראשונה ללא עלות וללא התחייבות. לאחר הפגישה אציג הצעת מחיר מפורטת ושקופה, המותאמת לסוג העסקה ולמורכבותה." },
    { q: "האם אתם מייצגים גם רוכשים מחו״ל?", a: "בהחלט. אני מלווה משקיעים ורוכשים מחו״ל בכל שלבי העסקה, כולל ייפוי כוח, העברות בנקאיות בינלאומיות וייצוג מול הרשויות בישראל." },
    { q: "כמה זמן לוקח להשלים עסקת מכר?", a: "עסקת מכר רגילה נמשכת בין 60 ל-90 יום מחתימת החוזה ועד העברת הבעלות בטאבו. עסקאות מורכבות עשויות לארוך מעט יותר." },
    { q: "מה כוללת בדיקת נאותות?", a: "בדיקת נאותות כוללת: בדיקה רישומית בטאבו ובמנהל, בדיקה תכנונית ברשות המקומית, בדיקת חובות והיטלים, ובדיקת זכויות בנייה והגבלות." },
    { q: "האם ניתן לפגוש בווידאו?", a: "כן, אני מקיימת פגישות ייעוץ בווידאו (Zoom/Google Meet) לנוחותכם. גם חתימה דיגיטלית על מסמכים מסוימים אפשרית בהתאם לצורך." },
  ],

  trustItems: ["לשכת עורכי הדין", "רישום בטאבו", "SSL מאובטח", "15+ שנות ניסיון", "ליווי מלא A-Z", "דיסקרטיות מוחלטת"],
  formServices: ["מכר / רכישת דירה", "בדיקת נאותות", "ייצוג בפרויקט", "שכירות", "קומבינציה", "ייעוץ למשקיעים", "אחר"],
}

/* ─── Design tokens ─── */
const t = {
  navy: "#0B1A2F", navyMid: "#132840", navyLight: "#1C3352",
  copper: "#B5654A", copperLight: "#CD8468", copperMuted: "rgba(181,101,74,0.08)",
  white: "#FFFFFF", snow: "#FDFBF8", cream: "#F6F1EA", linen: "#EDE6DB",
  sand: "#D8CFBF", warmGray: "#8A7F72", textBody: "#4A453D", textDark: "#1A1814",
  border: "#E4DDD3",
  serif: "'Frank Ruhl Libre', Georgia, serif",
  sans: "'Heebo', system-ui, sans-serif",
  display: "'Cormorant Garamond', Georgia, serif",
  skyTop: "#4A6278",
  skyGlow: "#6B8299",
}

/* ─── Glass styles ─── */
const glass = {
  dark: { background: "rgba(11,26,47,0.72)", backdropFilter: "blur(32px) saturate(1.3)", WebkitBackdropFilter: "blur(32px) saturate(1.3)", border: "1px solid rgba(255,255,255,0.06)" } as React.CSSProperties,
  medium: { background: "rgba(11,26,47,0.55)", backdropFilter: "blur(28px) saturate(1.2)", WebkitBackdropFilter: "blur(28px) saturate(1.2)", border: "1px solid rgba(255,255,255,0.08)" } as React.CSSProperties,
  subtle: { background: "rgba(11,26,47,0.35)", backdropFilter: "blur(20px) saturate(1.15)", WebkitBackdropFilter: "blur(20px) saturate(1.15)", border: "1px solid rgba(255,255,255,0.05)" } as React.CSSProperties,
}

/* ─── Hooks ─── */
function useIsMobile() {
  const [m, setM] = useState(false)
  useEffect(() => { const c = () => setM(window.innerWidth < 768); c(); window.addEventListener("resize", c); return () => window.removeEventListener("resize", c) }, [])
  return m
}

function useCounter(target: number, active: boolean) {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (!active) return
    let n = 0; const step = target / 125
    const timer = setInterval(() => {
      n += step
      if (n >= target) { setCount(target); setDone(true); clearInterval(timer) }
      else setCount(Math.floor(n))
    }, 16)
    return () => clearInterval(timer)
  }, [active, target])
  return { count, done }
}

/* ─── Particles ─── */
function HeroParticles({ count }: { count: number }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
    })), [count])

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ x: `${p.x}%`, y: `${p.y}%`, opacity: 0 }}
          animate={{ x: [`${p.x}%`, `${(p.x + 10) % 100}%`, `${p.x}%`], y: [`${p.y}%`, `${(p.y - 15 + 100) % 100}%`, `${p.y}%`], opacity: [0, 0.15, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", width: p.size, height: p.size, borderRadius: "50%", background: t.white }}
        />
      ))}
    </div>
  )
}

/* ─── Custom Cursor ─── */
function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 })
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 })
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => { cursorX.set(e.clientX); cursorY.set(e.clientY) }
    const over = () => setHovered(true)
    const out = () => setHovered(false)
    window.addEventListener("mousemove", move)
    const interactives = document.querySelectorAll("button, a, input, select, [data-cursor-hover]")
    interactives.forEach(el => { el.addEventListener("mouseenter", over); el.addEventListener("mouseleave", out) })
    return () => {
      window.removeEventListener("mousemove", move)
      interactives.forEach(el => { el.removeEventListener("mouseenter", over); el.removeEventListener("mouseleave", out) })
    }
  }, [cursorX, cursorY])

  const size = hovered ? 48 : 16
  return (
    <motion.div
      style={{ position: "fixed", left: springX, top: springY, width: size, height: size, borderRadius: "50%", border: `1.5px solid ${t.copper}`, pointerEvents: "none", zIndex: 9999, transform: "translate(-50%, -50%)", mixBlendMode: "difference", transition: "width 0.3s, height 0.3s" }}
    />
  )
}

/* ─── Magnetic Button ─── */
function MagneticButton({ children, onClick, style, ariaLabel }: { children: React.ReactNode; onClick: () => void; style: React.CSSProperties; ariaLabel: string }) {
  const ref = useRef<HTMLButtonElement>(null)
  const isMobile = useIsMobile()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { damping: 15, stiffness: 150 })
  const springY = useSpring(y, { damping: 15, stiffness: 150 })

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (isMobile || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.2)
    y.set((e.clientY - cy) * 0.2)
  }, [isMobile, x, y])

  const handleLeave = useCallback(() => { x.set(0); y.set(0) }, [x, y])

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ ...style, x: springX, y: springY }}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  )
}

/* ─── 3D Tilt Card ─── */
function TiltCard({ children, style, onMouseEnter, onMouseLeave }: { children: React.ReactNode; style: React.CSSProperties; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 })

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (isMobile || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width
    const cy = (e.clientY - rect.top) / rect.height
    setTilt({ x: (cy - 0.5) * -8, y: (cx - 0.5) * 8 })
    setSpotlight({ x: cx * 100, y: cy * 100 })
  }, [isMobile])

  const handleLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
    setSpotlight({ x: 50, y: 50 })
    onMouseLeave?.()
  }, [onMouseLeave])

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleLeave}
      style={{
        ...style,
        perspective: "1000px",
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.3s ease-out",
        backgroundImage: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(181,101,74,0.12) 0%, transparent 60%)`,
      }}
    >
      {children}
    </div>
  )
}

/* ─── FAQ Accordion ─── */
function FAQItem({ q, a, isOpen, toggle }: { q: string; a: string; isOpen: boolean; toggle: () => void }) {
  return (
    <div style={{ borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
      <button
        onClick={toggle}
        aria-label={`שאלה: ${q}`}
        aria-expanded={isOpen}
        style={{
          width: "100%", padding: "24px 0", background: "none", border: "none",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          cursor: "pointer", fontFamily: t.sans, textAlign: "right",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 500, color: t.white, paddingLeft: 40 }}>{q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ fontSize: 22, color: t.copper, fontWeight: 300, flexShrink: 0, width: 28, textAlign: "center" }}
        >+</motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ display: "flex", gap: 16, paddingBottom: 24 }}>
              <div style={{ width: 2, background: `${t.copper}40`, borderRadius: 1, flexShrink: 0 }} />
              <p style={{ fontSize: 14.5, lineHeight: 1.85, color: `${t.white}55`, margin: 0 }}>{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Components ─── */
/* ─── Stats — proper components (no hooks in IIFE) ─── */
function StatItem({ s, i, inV }: { s: typeof C.stats[0]; i: number; inV: boolean }) {
  const { count, done } = useCounter(s.target, inV)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inV ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.12, duration: 0.6 }}
      className={done ? "stat-glow" : ""}
      style={{ padding: "42px 0", textAlign: "center", position: "relative" }}
    >
      {i > 0 && (
        <div style={{
          position: "absolute", right: 0, top: "20%", bottom: "20%", width: 1,
          background: `linear-gradient(to bottom, transparent, ${t.copper}20, transparent)`,
        }} />
      )}
      <div style={{ fontFamily: t.display, fontSize: 44, fontWeight: 400, color: t.white, letterSpacing: "-0.02em" }}>{count}{s.suffix}</div>
      <div style={{ fontSize: 12, color: `${t.white}35`, marginTop: 6 }}>{s.label}</div>
    </motion.div>
  )
}

function StatsSection() {
  const ref = useRef(null)
  const inV = useInView(ref, { once: true })
  return (
    <section ref={ref} style={{ position: "relative", zIndex: 2, padding: "0 32px", marginTop: -1 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", borderRadius: "0 0 16px 16px", ...glass.dark, boxShadow: "0 8px 40px rgba(0,0,0,0.3)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {C.stats.map((s, i) => <StatItem key={i} s={s} i={i} inV={inV} />)}
        </div>
      </div>
    </section>
  )
}

function GlassSection({ children, id, variant = "dark", style }: {
  children: React.ReactNode; id?: string; variant?: "dark" | "medium" | "subtle"; style?: React.CSSProperties
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.section ref={ref} id={id} initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      style={{ position: "relative", zIndex: 2, padding: "0 32px", marginBottom: 2, ...style }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", borderRadius: 16, padding: "80px 56px",
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

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function MichalSimonLanding() {
  const [formData, setFormData] = useState({ name: "", phone: "", service: "" })
  const [sent, setSent] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [activeTesti, setActiveTesti] = useState(0)
  const [testiProgress, setTestiProgress] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const isMobile = useIsMobile()
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  // Global scroll progress
  const { scrollYProgress: pageProgress } = useScroll()

  useEffect(() => {
    const h = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])

  // Testimonial timer with progress
  useEffect(() => {
    const duration = 5000
    const interval = 50
    let elapsed = 0
    const timer = setInterval(() => {
      elapsed += interval
      setTestiProgress(elapsed / duration)
      if (elapsed >= duration) {
        setActiveTesti(p => (p + 1) % C.testimonials.length)
        elapsed = 0
      }
    }, interval)
    return () => clearInterval(timer)
  }, [activeTesti])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) return
    setSent(true)
  }

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  const scrolled = scrollY > 60

  return (
    <div dir="rtl" style={{ fontFamily: t.sans, color: t.textBody, background: t.navy, overflowX: "hidden", cursor: isMobile ? "auto" : "none" }}>

      {/* ═══════ JSON-LD STRUCTURED DATA ═══════ */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Attorney",
            "name": "עו״ד מיכל סיימון",
            "alternateName": "Michal Simon Law",
            "url": "https://michalsimon.law",
            "telephone": "+972-54-785-0530",
            "email": "office@michalsimon.law",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "רח׳ רבי יצחק נפחא 28",
              "addressLocality": "בית שמש",
              "addressCountry": "IL"
            },
            "geo": { "@type": "GeoCoordinates", "latitude": "31.7454", "longitude": "34.9884" },
            "areaServed": ["בית שמש", "ירושלים", "מודיעין", "ישראל"],
            "priceRange": "₪₪",
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Sunday","Monday","Tuesday","Wednesday","Thursday"],
              "opens": "09:00",
              "closes": "18:00"
            },
            "image": "https://michalsimon.law/images/og-michal.jpg",
            "description": "עורכת דין נדל״ן עם 15+ שנות ניסיון. ליווי מלא בעסקאות מכר, רכישה, בדיקת נאותות, קומבינציה ותמ״א.",
            "knowsAbout": ["נדלן","מקרקעין","מכר דירה","רכישת דירה","בדיקת נאותות","עסקת קומבינציה","תמא 38","הסכמי שכירות","ייעוץ למשקיעים"],
            "sameAs": []
          },
          {
            "@type": "FAQPage",
            "mainEntity": C.faq.map(item => ({
              "@type": "Question",
              "name": item.q,
              "acceptedAnswer": { "@type": "Answer", "text": item.a }
            }))
          },
          {
            "@type": "WebSite",
            "url": "https://michalsimon.law",
            "name": "עו״ד מיכל סיימון — משרד עורכי דין נדל״ן",
            "inLanguage": "he"
          }
        ]
      })}} />

      {/* ═══════ GLOBAL STYLES + SEO ═══════ */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Frank+Ruhl+Libre:wght@300;400;500;700;900&family=Heebo:wght@300;400;500;600;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        ::selection{background:${t.copper}25}
        body{cursor:${isMobile ? "auto" : "none"}}

        /* Portrait border animation */
        @keyframes borderDash {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -600; }
        }

        /* Trust bar marquee */
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Stat glow flash */
        @keyframes statGlow {
          0% { box-shadow: 0 0 0 rgba(181,101,74,0); }
          50% { box-shadow: 0 0 30px rgba(181,101,74,0.3); }
          100% { box-shadow: 0 0 0 rgba(181,101,74,0); }
        }
        .stat-glow { animation: statGlow 0.6s ease-out; }

        /* SVG stroke draw */
        @keyframes strokeDraw {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }
        .service-card-hover svg path {
          stroke-dasharray: 200;
          animation: strokeDraw 0.6s ease-out forwards;
        }

        @media (max-width: 900px) {
          header nav { display: none !important; }
          header { padding: 0 20px !important; }
        }
        @media (max-width: 768px) {
          #hero > div:nth-child(4) { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 1fr 1.1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ═══════ CUSTOM CURSOR (desktop only) ═══════ */}
      {!isMobile && <CustomCursor />}

      {/* ═══════ SCROLL PROGRESS BAR ═══════ */}
      <motion.div
        style={{
          position: "fixed", top: 0, left: 0, right: 0, height: 2,
          background: t.copper, transformOrigin: "0%", scaleX: pageProgress,
          zIndex: 200,
        }}
      />

      {/* ═══════ FIXED BACKGROUND ═══════ */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <img src="/images/bg.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 0%, transparent 30%, rgba(11,26,47,0.15) 50%, rgba(11,26,47,0.35) 70%, rgba(11,26,47,0.5) 100%)` }} />
      </div>

      {/* ═══════ HEADER ═══════ */}
      <motion.header
        initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed", top: 2, left: 0, right: 0, zIndex: 100,
          padding: "0 48px", height: 72,
          background: scrolled ? "rgba(11,26,47,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(1.2)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <img src="/images/logo-white.png" alt="מיכל סיימון עורכת דין — לוגו" style={{ height: 36, objectFit: "contain", opacity: 0.9 }} />
        <nav aria-label="ניווט ראשי" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {[
            { l: "ראשי", id: "hero" }, { l: "אודות", id: "about" }, { l: "תחומי עיסוק", id: "services" },
            { l: "תהליך", id: "process" }, { l: "צור קשר", id: "contact" },
          ].map(({ l, id }) => (
            <button key={id} onClick={() => scrollTo(id)} aria-label={`ניווט ל${l}`}
              style={{ background: "none", border: "none", cursor: "none", fontSize: 13, color: `${t.white}60`, fontFamily: t.sans, transition: "color 0.3s" }}
              onMouseOver={e => (e.currentTarget.style.color = t.white)}
              onMouseOut={e => (e.currentTarget.style.color = `${t.white}60`)}
            >{l}</button>
          ))}
        </nav>
      </motion.header>

      {/* ═══════════════════════════════════════════════
          HERO — Cinematic with particles + magnetic CTA
         ═══════════════════════════════════════════════ */}
      <section ref={heroRef} id="hero" style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", zIndex: 1 }}>
        <motion.div style={{ scale: heroScale, position: "absolute", inset: 0, zIndex: 0 }}>
          <img src="/images/bg.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </motion.div>

        {/* Particles */}
        <HeroParticles count={isMobile ? 15 : 40} />

        {/* Gradient overlays */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: `linear-gradient(180deg, rgba(11,26,47,0.4) 0%, rgba(11,26,47,0.2) 35%, rgba(11,26,47,0.3) 65%, rgba(11,26,47,0.7) 100%)` }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: `linear-gradient(to left, transparent 40%, rgba(11,26,47,0.5) 100%)` }} />

        {/* Content grid */}
        <div style={{ position: "relative", zIndex: 2, width: "100%", height: "100%", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}>

          {/* Mobile: portrait on top */}
          {isMobile && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", paddingTop: 90, height: "45vh" }}>
              <div style={{ width: "55%", height: "85%", borderRadius: 8, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}>
                <img src="/images/portrait.jpg" alt={C.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
              </div>
            </div>
          )}

          {/* Text side */}
          <motion.div style={{ opacity: heroOpacity, display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "32px 32px 48px" : "120px 64px 80px", alignItems: isMobile ? "center" : "flex-start", textAlign: isMobile ? "center" : "right" }}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
              <h1 style={{ fontFamily: t.serif, fontSize: "clamp(2.5rem, 6vw, 5.5rem)", fontWeight: 700, color: t.white, lineHeight: 1.05, textShadow: "0 2px 40px rgba(0,0,0,0.3)", marginBottom: 20 }}>
                {C.name}
              </h1>
            </motion.div>
            <motion.div initial={{ width: 0 }} animate={{ width: 60 }} transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: 1.5, background: `${t.copper}cc`, marginBottom: 18 }} />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              style={{ fontSize: "clamp(1rem, 1.8vw, 1.25rem)", color: `${t.white}80`, letterSpacing: "0.1em", fontWeight: 300, textShadow: "0 1px 20px rgba(0,0,0,0.3)", marginBottom: 36 }}>
              {C.heroSub}
            </motion.p>

            {/* Magnetic CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>
              <MagneticButton
                onClick={() => scrollTo("contact")}
                ariaLabel="לתיאום פגישת ייעוץ"
                style={{
                  background: "transparent", color: t.white, border: `1px solid ${t.white}40`,
                  padding: "14px 40px", borderRadius: 0, fontSize: 14, fontWeight: 400,
                  cursor: isMobile ? "pointer" : "none", fontFamily: t.sans, letterSpacing: "0.08em",
                  transition: "background 0.4s, border-color 0.4s",
                }}
              >
                {C.heroCta}
              </MagneticButton>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
              style={{ marginTop: 28 }}>
              <a href={`tel:${C.phone}`} aria-label="התקשרו אלינו" style={{ fontSize: 15, color: `${t.white}50`, letterSpacing: "0.04em", textDecoration: "none" }}>{C.phone}</a>
            </motion.div>
          </motion.div>

          {/* Desktop: Portrait with animated border */}
          {!isMobile && (
            <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "80px 48px 0", height: "100%" }}>
              <div style={{ position: "relative", width: "75%", height: "82%" }}>

                {/* Animated copper border — SVG dash animation */}
                <svg style={{ position: "absolute", inset: -6, width: "calc(100% + 12px)", height: "calc(100% + 12px)", zIndex: 4, pointerEvents: "none" }}>
                  <rect x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" rx="10" ry="10"
                    fill="none" stroke={`${t.copper}60`} strokeWidth="1.5"
                    strokeDasharray="12 8" style={{ animation: "borderDash 12s linear infinite" }} />
                </svg>

                {/* Static copper frame */}
                <div style={{ position: "absolute", inset: -3, borderRadius: 8, border: `2px solid ${t.copper}50`, boxShadow: `0 0 20px ${t.copper}20`, pointerEvents: "none", zIndex: 2 }} />

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
                    borderRadius: c.radius, pointerEvents: "none", zIndex: 3,
                  }} />
                ))}

                {/* Image */}
                <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 5, overflow: "hidden", boxShadow: "0 8px 60px rgba(0,0,0,0.4), inset 0 0 30px rgba(0,0,0,0.1)" }}>
                  <img src="/images/portrait.jpg" alt={C.name} loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "18%", background: "linear-gradient(to bottom, rgba(11,26,47,0.35), transparent)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(to top, rgba(11,26,47,0.95) 0%, rgba(11,26,47,0.6) 35%, rgba(11,26,47,0.15) 65%, transparent)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(11,26,47,0.45) 0%, transparent 22%)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, rgba(11,26,47,0.15) 0%, transparent 15%)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 50%, rgba(11,26,47,0.25) 100%)", pointerEvents: "none" }} />
                </div>
              </div>
              <div style={{ position: "absolute", top: "10%", right: "5%", bottom: "5%", left: "5%", borderRadius: 10, background: `radial-gradient(ellipse at center, ${t.copper}12, transparent 70%)`, filter: "blur(25px)", pointerEvents: "none", zIndex: -1 }} />
            </motion.div>
          )}
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
          style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}
            style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${t.white}50, transparent)`, margin: "0 auto" }} />
        </motion.div>
      </section>

      {/* ═══════ TRUST BAR — Infinite marquee ═══════ */}
      <div style={{
        position: "relative", zIndex: 2, height: 56, overflow: "hidden",
        background: `${t.copper}0a`,
        borderTop: `1px solid ${t.copper}15`,
        borderBottom: `1px solid ${t.copper}15`,
        display: "flex", alignItems: "center",
      }}>
        <div style={{ display: "flex", animation: "marquee 30s linear infinite", whiteSpace: "nowrap" }}>
          {[...C.trustItems, ...C.trustItems, ...C.trustItems, ...C.trustItems].map((item, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 16, padding: "0 32px", fontSize: 12, letterSpacing: "0.08em", color: `${t.white}35`, fontWeight: 400 }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: `${t.copper}50`, flexShrink: 0 }} />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════ STATS BAR — with glow effect ═══════ */}
      <StatsSection />

      <div style={{ height: 80, position: "relative", zIndex: 1 }} />

      {/* ═══════ INTRO TAGLINE ═══════ */}
      <GlassSection variant="medium">
        <Wrap style={{ maxWidth: 780, textAlign: "center" }}>
          <motion.div variants={fadeUp}>
            <h2 style={{ fontFamily: t.serif, fontSize: "clamp(1.6rem, 3vw, 2.5rem)", fontWeight: 700, color: t.white, lineHeight: 1.3, marginBottom: 18 }}>
              עסקה בטוחה — בעיניים פקוחות.
            </h2>
            <div style={{ width: 48, height: 1.5, background: `${t.copper}cc`, margin: "0 auto 24px" }} />
            <p style={{ fontSize: 16.5, lineHeight: 2, color: `${t.white}70` }}>{C.desc}</p>
          </motion.div>
        </Wrap>
      </GlassSection>

      <div style={{ height: 48, position: "relative", zIndex: 1 }} />

      {/* ═══════ SERVICES — 3D Tilt Cards ═══════ */}
      <GlassSection id="services" variant="dark">
        <Wrap>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", marginBottom: 12 }}>
              <div style={{ width: 32, height: 1, background: `${t.copper}80` }} />
              <span style={{ fontSize: 11, letterSpacing: "0.15em", color: `${t.copper}cc`, fontWeight: 500 }}>תחומי התמחות</span>
              <div style={{ width: 32, height: 1, background: `${t.copper}80` }} />
            </div>
            <h2 style={{ fontFamily: t.serif, fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 700, color: t.white }}>כל סוגי עסקאות הנדל״ן.</h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {C.services.map((s, i) => (
              <motion.div key={i} variants={scaleIn} custom={i}>
                <TiltCard
                  onMouseEnter={() => setHoveredService(i)}
                  onMouseLeave={() => setHoveredService(null)}
                  style={{
                    padding: "40px 32px", position: "relative", overflow: "hidden",
                    borderRadius: 12,
                    background: hoveredService === i ? "rgba(181,101,74,0.15)" : "rgba(255,255,255,0.04)",
                    border: hoveredService === i ? `1px solid ${t.copper}40` : "1px solid rgba(255,255,255,0.06)",
                    transition: "background 0.5s, border 0.5s",
                    cursor: "default", backdropFilter: "blur(8px)",
                  }}
                >
                  <div className={hoveredService === i ? "service-card-hover" : ""} style={{ width: 44, height: 44, borderRadius: 10, background: hoveredService === i ? `${t.copper}20` : "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, transition: "all 0.4s" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={hoveredService === i ? t.copper : `${t.white}50`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.4s" }}>
                      <path d={s.icon} />
                    </svg>
                  </div>
                  <div style={{ position: "absolute", top: -10, left: -6, fontFamily: t.display, fontSize: 100, fontWeight: 300, color: hoveredService === i ? `${t.copper}08` : `${t.white}03`, lineHeight: 1, transition: "color 0.5s", pointerEvents: "none" }}>{s.num}</div>
                  <span style={{ fontSize: 10, letterSpacing: "0.14em", color: hoveredService === i ? `${t.copper}cc` : `${t.white}30`, transition: "color 0.4s" }}>{s.en}</span>
                  <h3 style={{ fontFamily: t.serif, fontSize: 20, fontWeight: 700, color: t.white, margin: "8px 0 12px" }}>{s.title}</h3>
                  <div style={{ width: 28, height: 1.5, background: hoveredService === i ? t.copper : `${t.copper}40`, marginBottom: 14, transition: "background 0.4s" }} />
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: `${t.white}50`, margin: 0 }}>{s.desc}</p>
                </TiltCard>
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
            <h2 style={{ fontFamily: t.serif, fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 700, color: t.white, lineHeight: 1.3, whiteSpace: "pre-line", marginBottom: 20 }}>{C.about.headline}</h2>
            <div style={{ width: 48, height: 1.5, background: `${t.copper}80`, marginBottom: 20 }} />
            <p style={{ fontSize: 15.5, lineHeight: 1.95, color: `${t.white}65`, marginBottom: 28 }}>{C.about.text}</p>
            <div style={{ padding: "20px 24px", borderRight: `2px solid ${t.copper}80`, background: `${t.copper}08`, borderRadius: "0 8px 8px 0" }}>
              <p style={{ fontFamily: t.serif, fontSize: 16, fontStyle: "italic", color: `${t.white}90`, lineHeight: 1.7, margin: 0 }}>
                {"\u201E"}{C.about.quote}{"\u201C"}
              </p>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} custom={1}>
            <div style={{ width: "100%", aspectRatio: "4/5", borderRadius: 12, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <img src="/images/portrait-full.jpg" alt={C.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
            <h2 style={{ fontFamily: t.serif, fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 700, color: t.white, marginTop: 10 }}>מהפגישה הראשונה — ועד המפתח</h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
            {C.process.map((p, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}
                style={{ padding: "40px 28px", borderRight: i > 0 ? `1px solid ${t.white}08` : "none", textAlign: "center" }}>
                <div style={{ fontFamily: t.display, fontSize: 56, fontWeight: 300, color: `${t.copper}30`, lineHeight: 1, marginBottom: 16 }}>{p.num}</div>
                <h3 style={{ fontFamily: t.serif, fontSize: 18, fontWeight: 600, color: t.white, marginBottom: 10 }}>{p.title}</h3>
                <div style={{ width: 20, height: 1, background: `${t.copper}40`, margin: "0 auto 12px" }} />
                <p style={{ fontSize: 13, lineHeight: 1.75, color: `${t.white}45`, margin: 0 }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </Wrap>
      </GlassSection>

      <div style={{ height: 48, position: "relative", zIndex: 1 }} />

      {/* ═══════ TESTIMONIALS — Cinematic editorial ═══════ */}
      <GlassSection id="testimonials" variant="medium">
        <Wrap style={{ maxWidth: 800, textAlign: "center" }}>
          <motion.div variants={fadeUp}>
            <span style={{ fontSize: 11, letterSpacing: "0.15em", color: `${t.copper}cc` }}>המלצות</span>
            <h2 style={{ fontFamily: t.serif, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: t.white, margin: "10px 0 48px" }}>מה אומרים הלקוחות שלנו</h2>
          </motion.div>
          <motion.div variants={fadeUp} style={{ minHeight: 220 }}>
            <AnimatePresence mode="wait">
              <motion.div key={activeTesti} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                <div style={{ fontFamily: t.display, fontSize: 72, color: `${t.copper}18`, lineHeight: 1, marginBottom: -4 }}>{"\u201D"}</div>
                <p style={{ fontFamily: t.display, fontSize: "clamp(20px, 3vw, 34px)", fontStyle: "italic", lineHeight: 1.7, color: `${t.white}95`, margin: "0 0 32px", fontWeight: 400 }}>
                  {C.testimonials[activeTesti].text}
                </p>
                <div style={{ width: 32, height: 1, background: t.copper, margin: "0 auto 18px" }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: t.copper }}>{C.testimonials[activeTesti].name}</div>
                <div style={{ fontSize: 12, color: `${t.white}40`, marginTop: 4 }}>{C.testimonials[activeTesti].role}</div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Progress bar */}
          <div style={{ maxWidth: 200, margin: "36px auto 0", height: 2, background: `${t.white}10`, borderRadius: 1, overflow: "hidden" }}>
            <motion.div
              style={{ height: "100%", background: t.copper, borderRadius: 1, width: `${testiProgress * 100}%` }}
              transition={{ duration: 0.05 }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
            {C.testimonials.map((_, i) => (
              <button key={i} onClick={() => { setActiveTesti(i); setTestiProgress(0) }}
                aria-label={`עבור להמלצה ${i + 1}`}
                style={{ width: activeTesti === i ? 28 : 6, height: 6, borderRadius: 3, border: "none", cursor: isMobile ? "pointer" : "none", background: activeTesti === i ? t.copper : `${t.white}20`, transition: "all 0.4s" }} />
            ))}
          </div>
        </Wrap>
      </GlassSection>

      <div style={{ height: 48, position: "relative", zIndex: 1 }} />

      {/* ═══════ FAQ ACCORDION ═══════ */}
      <GlassSection id="faq" variant="dark">
        <Wrap style={{ maxWidth: 740 }}>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", marginBottom: 12 }}>
              <div style={{ width: 32, height: 1, background: `${t.copper}80` }} />
              <span style={{ fontSize: 11, letterSpacing: "0.15em", color: `${t.copper}cc`, fontWeight: 500 }}>שאלות נפוצות</span>
              <div style={{ width: 32, height: 1, background: `${t.copper}80` }} />
            </div>
            <h2 style={{ fontFamily: t.serif, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: t.white }}>יש לכם שאלות? יש לנו תשובות.</h2>
          </motion.div>
          <motion.div variants={fadeUp}>
            {C.faq.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} isOpen={openFaq === i} toggle={() => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </motion.div>
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
              <p style={{ fontSize: 15, lineHeight: 1.8, color: `${t.white}55`, marginBottom: 40 }}>השאירו פרטים ונחזור אליכם תוך 24 שעות — ללא עלות וללא התחייבות.</p>
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
                <div style={{ padding: 60, textAlign: "center", borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", border: `2px solid ${t.copper}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <span style={{ color: t.copper, fontSize: 17, fontWeight: 700 }}>V</span>
                  </div>
                  <h3 style={{ fontFamily: t.serif, fontSize: 22, color: t.white, marginBottom: 6 }}>תודה.</h3>
                  <p style={{ fontSize: 14, color: `${t.white}55` }}>הפרטים נשלחו. מיכל תחזור אליכם בהקדם.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} aria-label="טופס יצירת קשר" style={{ padding: "44px 40px", borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", gap: 18 }}>
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
                        aria-label={label}
                        onChange={e => setFormData(p => ({ ...p, [name]: e.target.value }))}
                        style={{ width: "100%", padding: "14px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", fontSize: 15, fontFamily: t.sans, color: t.white, outline: "none", boxSizing: "border-box", transition: "border-color 0.3s" }}
                        onFocus={e => (e.currentTarget.style.borderColor = `${t.copper}80`)}
                        onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: `${t.white}70`, marginBottom: 6 }}>סוג שירות</label>
                    <select value={formData.service} aria-label="בחירת סוג שירות"
                      onChange={e => setFormData(p => ({ ...p, service: e.target.value }))}
                      style={{ width: "100%", padding: "14px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", fontSize: 15, fontFamily: t.sans, color: t.white, outline: "none", boxSizing: "border-box", cursor: isMobile ? "pointer" : "none" }}>
                      <option value="" style={{ background: t.navy }}>בחרו שירות</option>
                      {C.formServices.map(s => <option key={s} value={s} style={{ background: t.navy }}>{s}</option>)}
                    </select>
                  </div>
                  <button type="submit" aria-label="שליחת פרטים ליצירת קשר"
                    style={{ width: "100%", padding: "15px", borderRadius: 8, border: `1px solid ${t.copper}40`, background: `${t.copper}20`, color: t.white, fontSize: 14, fontWeight: 600, fontFamily: t.sans, cursor: isMobile ? "pointer" : "none", transition: "all 0.3s" }}
                    onMouseOver={e => { e.currentTarget.style.background = t.copper; e.currentTarget.style.borderColor = t.copper }}
                    onMouseOut={e => { e.currentTarget.style.background = `${t.copper}20`; e.currentTarget.style.borderColor = `${t.copper}40` }}
                  >שליחת פרטים</button>
                  <p style={{ fontSize: 10, color: `${t.white}20`, textAlign: "center", margin: 0 }}>הפרטים שלכם מאובטחים ומוגנים בהתאם לחוק הגנת הפרטיות.</p>
                </form>
              )}
            </motion.div>
          </div>
        </Wrap>
      </GlassSection>

      {/* ═══════ SKY-TO-SKY FADE ═══════ */}
      <div style={{ position: "relative", zIndex: 2, height: 200, background: `linear-gradient(to top, ${t.skyTop} 0%, ${t.skyTop}dd 30%, ${t.skyTop}80 55%, transparent 100%)`, marginTop: 48 }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: `linear-gradient(to top, ${t.skyGlow}20, transparent)` }} />
      </div>

      {/* ═══════ FOOTER ═══════ */}
      <footer style={{ background: t.skyTop, padding: "0 32px 32px", position: "relative", zIndex: 2 }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />
        <Wrap>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 28, borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 20 }}>
            <img src="/images/logo-white.png" alt="מיכל סיימון — לוגו" style={{ height: 28, opacity: 0.5 }} />
            <div style={{ fontSize: 12, color: `${t.white}25`, lineHeight: 2, textAlign: "left" }}>{C.phone} · {C.email}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 10, color: `${t.white}12` }}>{"\u00A9"} {new Date().getFullYear()} {C.title}</span>
            <span style={{ fontSize: 10, color: `${t.white}12` }}>FERDI AI</span>
          </div>
        </Wrap>
      </footer>

      {/* ═══════ WHATSAPP ═══════ */}
      <motion.a href={`https://wa.me/${C.whatsapp}`} target="_blank" rel="noopener noreferrer"
        aria-label="שלחו הודעת וואטסאפ"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}
        style={{ position: "fixed", bottom: 24, left: 24, zIndex: 100, width: 46, height: 46, borderRadius: 8, background: "rgba(11,26,47,0.8)", backdropFilter: "blur(12px)", color: `${t.white}70`, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", border: `1px solid ${t.white}10`, transition: "all 0.3s", fontSize: 11, fontWeight: 500 }}
        onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => { (e.currentTarget as HTMLAnchorElement).style.background = "#25D366"; (e.currentTarget as HTMLAnchorElement).style.color = t.white; (e.currentTarget as HTMLAnchorElement).style.borderColor = "#25D366" }}
        onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(11,26,47,0.8)"; (e.currentTarget as HTMLAnchorElement).style.color = `${t.white}70`; (e.currentTarget as HTMLAnchorElement).style.borderColor = `${t.white}10` }}
      >WA</motion.a>
    </div>
  )
}
