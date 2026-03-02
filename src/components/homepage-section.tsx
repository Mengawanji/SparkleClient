"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Sparkles,
  Sofa,
  Building2,
  Home,
  Wind,
  ShowerHead,
  Shirt,
  Trash2,
  FlameKindling,
  Car,
  TreePine,
  WashingMachine,
  ChevronLeft,
  ChevronRight,
  SmilePlus,
  Trophy,
  Glasses,
  Phone,
  Shield,
  Medal,
  Users,
  Star,
  CheckCircle2,
} from "lucide-react";

// ─── Brand blue (matches ServicesSection) ───
const BLUE = "#3B4FCC";
const BLUE_LIGHT = "#EEF2FF";

// ─────────────────────────────────────────────
// COUNTER HOOK
// ─────────────────────────────────────────────
function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let start = null;
        const step = (ts) => {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return [count, ref];
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const topServices = [
  { Icon: Sparkles,       title: "Deep Cleaning",      desc: "Thorough top-to-bottom cleaning for every corner of your home." },
  { Icon: Sofa,           title: "Carpet Cleaning",     desc: "We know you enjoy family life — let us handle the dirty work." },
  { Icon: Building2,      title: "Apartment Cleaning",  desc: "As a leading company, our training truly distinguishes us." },
  { Icon: Home,           title: "Home Cleaning",       desc: "Professional home care from the most trusted team in town." },
  { Icon: Wind,           title: "Air Duct Cleaning",   desc: "Breathe easier with our certified air duct cleaning service." },
  { Icon: ShowerHead,     title: "Bathroom Cleaning",   desc: "Spotless, sanitized bathrooms you can be proud of every day." },
  { Icon: Shirt,          title: "Laundry Service",     desc: "Fresh, folded laundry delivered back to you on time." },
  { Icon: Trash2,         title: "Junk Removal",        desc: "Fast, responsible removal of unwanted clutter and rubbish." },
  { Icon: FlameKindling,  title: "Chimney Cleaning",    desc: "Safe and thorough chimney sweeping by certified experts." },
  { Icon: Car,            title: "Garage Cleaning",     desc: "Reclaim your garage space with our deep clean service." },
  { Icon: TreePine,       title: "Outdoor Cleaning",    desc: "Patios, decks, and exteriors sparkling clean year-round." },
  { Icon: WashingMachine, title: "Appliance Cleaning",  desc: "Extend appliance life with our specialist interior cleaning." },
];

const team = [
  { name: "Monica Gordon", role: "Lead Cleaner",        bg: "#b8cce4" },
  { name: "Laura James",   role: "Senior Cleaner",      bg: "#c8d8a8" },
  { name: "Sara Ryan",     role: "Cleaning Specialist", bg: "#d4b8c8" },
];

const stats = [
  { Icon: SmilePlus,  value: 385,  label: "Happy Customers"  },
  { Icon: Home,       value: 842,  label: "Houses Cleaned"   },
  { Icon: Trophy,     value: 489,  label: "Awards Received"  },
  { Icon: Glasses,    value: 1344, label: "Glass Cleaned"    },
];


const VISIBLE = 4;

// ─────────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────────
function StatItem({ Icon, value, label }) {
  const [count, ref] = useCounter(value);
  return (
    <div
      ref={ref}
      style={{
        flex: "1 1 180px",
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "24px 20px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        minWidth: 0,
      }}
    >
      <div
        style={{
          width: "52px", height: "52px", borderRadius: "50%",
          border: `2px solid ${BLUE}`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}
      >
        <Icon size={22} color={BLUE} />
      </div>
      <div>
        <div style={{ fontSize: "2rem", fontWeight: "800", color: "#1a1a2e", lineHeight: 1 }}>
          {count}+
        </div>
        <div style={{ fontSize: "0.82rem", color: "#6b7280", marginTop: 3 }}>{label}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SERVICE CAROUSEL
// ─────────────────────────────────────────────
function ServiceCarousel() {
  const [current, setCurrent] = useState(0);
  const total = topServices.length;
  const intervalRef = useRef(null);

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  useEffect(() => {
    intervalRef.current = setInterval(next, 3000);
    return () => clearInterval(intervalRef.current);
  }, [next]);

  const pause  = () => clearInterval(intervalRef.current);
  const resume = () => { intervalRef.current = setInterval(next, 3000); };

  const indices = Array.from({ length: VISIBLE }, (_, i) => (current + i) % total);

  return (
    <div onMouseEnter={pause} onMouseLeave={resume} style={{ position: "relative" }}>
      {/* Prev */}
      <button
        onClick={prev}
        style={{
          position: "absolute", left: "-24px", top: "45%", transform: "translateY(-50%)",
          zIndex: 10, background: "#fff", border: "none", borderRadius: "50%",
          width: "40px", height: "40px", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f0ff")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
      >
        <ChevronLeft size={20} color={BLUE} />
      </button>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${VISIBLE}, 1fr)`, gap: "16px" }}>
        {indices.map((idx, pos) => {
          const { Icon, title, desc } = topServices[idx];
          return (
            <div
              key={`${idx}-${pos}`}
              style={{
                background: "rgba(255,255,255,0.15)", borderRadius: "10px",
                padding: "24px 18px", textAlign: "center", color: "#fff",
                transition: "background 0.2s, transform 0.2s", cursor: "pointer",
                animation: "fadeSlide 0.4s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.25)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ width: "54px", height: "54px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                <Icon size={26} color="#fff" />
              </div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: "700", marginBottom: "8px" }}>{title}</h3>
              <p style={{ fontSize: "0.78rem", opacity: 0.88, lineHeight: 1.55 }}>{desc}</p>
            </div>
          );
        })}
      </div>

      {/* Next */}
      <button
        onClick={next}
        style={{
          position: "absolute", right: "-24px", top: "45%", transform: "translateY(-50%)",
          zIndex: 10, background: "#fff", border: "none", borderRadius: "50%",
          width: "40px", height: "40px", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f0ff")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
      >
        <ChevronRight size={20} color={BLUE} />
      </button>

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "18px" }}>
        {topServices.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? "20px" : "7px", height: "7px",
              borderRadius: "4px", border: "none", cursor: "pointer",
              background: i === current ? "#fff" : "rgba(255,255,255,0.4)",
              transition: "all 0.3s", padding: 0,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────
// NEW GENERATION SECTION
// ─────────────────────────────────────────────
const CAROUSEL_IMAGES = [
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
  "https://images.unsplash.com/photo-1527515545081-5db817172677?w=800&q=80",
  "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80",
];

const TEAL = "#20b2aa";
const TEAL_DARK = "#1a9990";
const TEAL_BG = "#c8e6e6";

function NewGenerationSection({ stats }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slideTimer = useRef(null);

  const goTo = useCallback((idx) => setActiveSlide(idx), []);

  useEffect(() => {
    slideTimer.current = setInterval(() => {
      setActiveSlide((s) => (s + 1) % CAROUSEL_IMAGES.length);
    }, 4000);
    return () => clearInterval(slideTimer.current);
  }, []);

  const pause  = () => clearInterval(slideTimer.current);
  const resume = () => { slideTimer.current = setInterval(() => setActiveSlide((s) => (s + 1) % CAROUSEL_IMAGES.length), 4000); };

  const containerStyle = { maxWidth: "80rem", margin: "0 auto", padding: "0 1rem" };

  return (
    <section style={{ position: "relative", background: "#fff", paddingTop: "72px", paddingBottom: 0, overflow: "hidden" }}>

      {/* ── Full-width teal band (lower half) ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "260px", background: TEAL_BG, zIndex: 0,
      }} />

      {/* ── Main container ── */}
      <div style={{ ...containerStyle, position: "relative", zIndex: 2 }} className="sm:px-6 lg:px-8">

        {/* ── White card ── */}
        <div
          className="new-gen-card"
          style={{
            background: "#fff",
            borderRadius: "0",
            boxShadow: "0 4px 32px rgba(0,0,0,0.09)",
            overflow: "hidden",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {/* ── Left: image carousel ── */}
          <div
            className="new-gen-image"
            style={{ flex: "0 0 320px", minHeight: "400px", position: "relative", overflow: "hidden", cursor: "pointer" }}
            onMouseEnter={pause}
            onMouseLeave={resume}
          >
            {/* Crossfading images */}
            {CAROUSEL_IMAGES.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`Cleaning ${i + 1}`}
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "center",
                  opacity: i === activeSlide ? 1 : 0,
                  transition: "opacity 0.9s ease",
                  display: "block",
                }}
              />
            ))}

            {/* Dot indicators inside photo */}
            <div style={{
              position: "absolute", bottom: "16px", left: "50%",
              transform: "translateX(-50%)",
              display: "flex", gap: "7px", zIndex: 3,
            }}>
              {CAROUSEL_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  style={{
                    width: i === activeSlide ? "22px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    border: "none",
                    background: i === activeSlide ? "#fff" : "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                    padding: 0,
                    transition: "all 0.3s",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* ── Right: text content ── */}
          <div className="new-gen-text" style={{ flex: "1 1 320px", minWidth: 0, padding: "48px 44px" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "14px", lineHeight: 1.25, color: "#0d2b3e" }}>
              The New Generation of Cleaning<br />and Restoration
            </h2>
            <p style={{ color: "#6b7280", fontSize: "1.3rem", lineHeight: 1.8, marginBottom: "28px" }}>
              World's leading non-asset-based supply chain management companies, we
              design and implement industry-leading. We specialise in intelligent &amp; effective
              search and believes in the power of partnerships to grow business…
            </p>

            {/* 2×2 checklist — teal icons */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px", marginBottom: "32px" }}>
              {[
                "Service guarantee",
                "Shifting idled planes.",
                "Tradition of trust",
                "Sustainable trade",
              ].map((label) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#374151", fontSize: "1.3rem", fontWeight: "500" }}>
                  <CheckCircle2 size={15} color={TEAL} style={{ flexShrink: 0 }} />
                  {label}
                </div>
              ))}
            </div>

            {/* Two badges */}
            <div style={{ display: "flex", gap: "28px", flexWrap: "wrap" }}>
              {[
                { Icon: Shield, label: "Service Guarantee", sub: "We are telling our team members to switch cleaning."   },
                { Icon: Medal,  label: "Awarded Company",   sub: "We encourage our customers to let us know in advance." },
              ].map(({ Icon, label, sub }) => (
                <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "14px", flex: "1 1 160px", minWidth: 0 }}>
                  <div style={{
                    width: "46px", height: "46px", borderRadius: "50%",
                    border: `2px solid ${TEAL}`,
                    flexShrink: 0, display: "flex", alignItems: "center",
                    justifyContent: "center", marginTop: "2px",
                  }}>
                    <Icon size={20} color={TEAL} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontWeight: "700", fontSize: "0.9rem", color: "#0d2b3e", marginBottom: "5px" }}>{label}</p>
                    <p style={{ fontSize: "0.775rem", color: "#6b7280", lineHeight: 1.55, margin: 0 }}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Stat cards row ── */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "16px",
          marginTop: "28px", paddingBottom: "52px",
          position: "relative", zIndex: 3,        
        }}>
          {stats.map((s:any) => <StatItem key={s.label} {...s} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .new-gen-card   { flex-direction: column !important; }
          .new-gen-image  { flex: 0 0 auto !important; width: 100% !important; min-height: 280px !important; }
          .new-gen-text   { padding: 32px 24px !important; }
        }
        @media (max-width: 768px) {
          .new-gen-stat-row { max-width: 100% !important; }
        }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function HomePageSections() {
  const [activeTeam, setActiveTeam] = useState(0);

  const container = { maxWidth: "80rem", margin: "0 auto", padding: "0 1rem" };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#1a1a2e" }}>

      {/* ── 1. SERVICE CAROUSEL ── */}
      <section style={{ background: BLUE, padding: "36px 0 28px" }}>
        <div style={{ ...container, padding: "0 2.5rem" }} className="sm:px-10 lg:px-14">
          <ServiceCarousel />
        </div>
      </section>

      {/* ── 2. HERO / ABOUT ── */}
      <section style={{ background: "#fff", padding: "80px 0" }}>
        <div
          style={{ ...container, display: "flex", alignItems: "center", gap: "64px", flexWrap: "wrap" }}
          className="sm:px-6 lg:px-8"
        >
          {/* Left: photo + overlapping badge */}
          <div style={{ position: "relative", flex: "0 0 auto", width: "320px" }}>
            {/* Main photo placeholder */}
            <div
              style={{
                width: "320px", height: "400px",
                background: "#e8f4f8", borderRadius: "8px",
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <Users size={100} color={BLUE} strokeWidth={0.8} />
            </div>

            {/* Overlapping teal badge bottom-left */}
            <div
              style={{
                position: "absolute", bottom: "32px", left: "-16px",
                background: BLUE, color: "#fff",
                borderRadius: "8px", padding: "18px 20px",
                width: "170px",
                boxShadow: "0 6px 20px rgba(59,79,204,0.35)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Trophy size={14} color="#fff" />
                </div>
                <span style={{ fontSize: "0.65rem", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.85 }}>
                  OUR VALUES
                </span>
              </div>
              <p style={{ fontSize: "0.75rem", lineHeight: 1.55, opacity: 0.92, margin: 0 }}>
                World's leading non-asset-based supply chain management companies.
              </p>
            </div>
          </div>

          {/* Right: text */}
          <div style={{ flex: "1 1 320px", minWidth: 0 }}>
            <p style={{ fontSize: "0.72rem", color: BLUE, fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "10px" }}>
              WHY CHOOSE US
            </p>
            <h2
              style={{
                fontSize: "2.4rem", fontWeight: "900", lineHeight: 1.1,
                marginBottom: "20px", color: "#1a1a2e",
                textTransform: "uppercase", letterSpacing: "-0.01em",
              }}
            >
              Cleaner Place Is A<br />Safer Place
            </h2>
            <p style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.75, marginBottom: "12px" }}>
              Customized advice to smallholder couriers with radical efficiency and scalability logistic.
            </p>
            <p style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.75, marginBottom: "28px" }}>
              Washia customers has a tremendous opportunity to answer the call of logistic needs across the globe. Has 26 affiliated state soybean associations representing 30 soybean-producing states.
            </p>

            {/* READ MORE link */}
            <p
              style={{
                fontSize: "1rem", fontWeight: "700", color: "#1a1a2e",
                letterSpacing: "0.08em", textTransform: "uppercase",
                borderBottom: `2px solid ${BLUE}`, display: "inline-block",
                paddingBottom: "2px", marginBottom: "20px", cursor: "pointer",
              }}
            >
              READ MORE
            </p>

            {/* Signature + phone row */}
            <div style={{ display: "flex", alignItems: "center", gap: "32px", flexWrap: "wrap" }}>
              <div style={{ fontFamily: "cursive", fontSize: "2.2rem", color: "#1a1a2e", lineHeight: 1 }}>
                Sandy
              </div>
              <div>
                <p style={{ fontSize: "1.1rem", fontWeight: "800", color: "#1a1a2e", marginBottom: "2px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Phone size={16} color={BLUE} />
                  519-577-1711
                </p>
                <p style={{ fontSize: "1rem", color: "#9ca3af", margin: 0 }}>Call Us for Service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. EXPERT CTA BANNER ── */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: "38%", height: "100%", background: "#f4a0b0", zIndex: 0 }} />
        <div style={{ position: "relative", zIndex: 1, background: "#1e3a4a", marginLeft: "30%", padding: "52px 48px", color: "#fff" }}>
          <div style={{ maxWidth: "680px" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: "800", marginBottom: "12px" }}>
              Expert House Cleaning Service you can trust
            </h2>
            <p style={{ color: "#a0bec8", fontSize: "1.3rem", marginBottom: "24px", lineHeight: 1.6 }}>
              Flexible cleaning service. We are a company dedicated to giving our customers back the time to focus on what matters most.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 32px" }}>
              {[
                { Icon: Shield,       label: "service insurance"       },
                { Icon: Star,         label: "expert coverage cases"    },
                { Icon: CheckCircle2, label: "cleaning accreditation"   },
                { Icon: Medal,        label: "satisfaction authorities" },
              ].map(({ Icon, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.85rem", color: "#d0e8f0" }}>
                  <Icon size={15} color={BLUE_LIGHT} style={{ flexShrink: 0 }} />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. OUR TEAM ── */}
      <section style={{ background: "#fff", padding: "72px 0" }}>
        <div style={{ ...container }} className="sm:px-6 lg:px-8">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: "800", marginBottom: "10px" }}>Our Team</h2>
            <p style={{ color: "#6b7280", fontSize: "1.3rem", maxWidth: "480px", margin: "0 auto" }}>
              The members of our highly experienced team are dedicated to providing you with only the best service we can possibly deliver.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "32px" }}>
            {team.map((member) => (
              <div key={member.name} style={{ textAlign: "center" }}>
                <div style={{ height: "280px", borderRadius: "8px", background: member.bg, marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Users size={72} color="rgba(255,255,255,0.75)" strokeWidth={1} />
                </div>
                <h3 style={{ fontWeight: "700", fontSize: "1rem", marginBottom: "4px" }}>{member.name}</h3>
                <p style={{ color: "#9ca3af", fontSize: "0.82rem" }}>{member.role}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => setActiveTeam(i)}
                style={{ width: i === activeTeam ? "24px" : "8px", height: "8px", borderRadius: "4px", border: "none", cursor: "pointer", background: i === activeTeam ? BLUE : "#d1d5db", transition: "all 0.3s", padding: 0 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. NEW GENERATION ── */}
      <NewGenerationSection stats={stats} />

    </div>
  );
}