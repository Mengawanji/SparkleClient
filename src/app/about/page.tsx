'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

// ─── Animated counter hook ───────────────────────────────────────────────────
function useCounter(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ─── Intersection observer hook ──────────────────────────────────────────────
function useInView(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Stat counter card ────────────────────────────────────────────────────────
function StatCard({ value, suffix, label, color, inView }: { value: number; suffix: string; label: string; color: string; inView: boolean }) {
  const count = useCounter(value, 1800, inView);
  return (
    <div className="stat-card" style={{ textAlign: 'center', padding: '36px 24px', background: 'white', borderRadius: '24px', border: '1.5px solid #eaecf5', flex: '1', minWidth: '160px' }}>
      <p style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 900, color, lineHeight: 1, marginBottom: '8px' }}>
        {count}{suffix}
      </p>
      <p style={{ fontSize: '0.92rem', color: '#6B7280', fontWeight: 500 }}>{label}</p>
    </div>
  );
}

// ─── Value card ───────────────────────────────────────────────────────────────
const values = [
  {
    icon: '🛡️',
    title: 'Trust Above All',
    desc: 'Every cleaner is thoroughly background-checked, fully bonded, and insured before they ever step into a client . Your safety is non-negotiable.',
    accent: '#EEF2FF',
    border: '#c7d0f8',
  },
  {
    icon: '🌿',
    title: 'Eco-Conscious Cleaning',
    desc: 'We exclusively use certified biodegradable, non-toxic products that are safe for children, pets, and the Canadian environment.',
    accent: '#F0FDF4',
    border: '#86efac',
  },
  {
    icon: '⏱️',
    title: 'Punctuality is Our Promise',
    desc: 'Your time is precious. We arrive in our confirmed window — no vague "sometime between 8 and 6" windows that waste your day.',
    accent: '#FFF7ED',
    border: '#fed7aa',
  },
  {
    icon: '💎',
    title: 'Detail-Obsessed',
    desc: 'Our proprietary 40-point checklist ensures that nothing — not a baseboard, not a door frame, not a light switch — gets missed.',
    accent: '#FDF4FF',
    border: '#e9d5ff',
  },
  {
    icon: '🤝',
    title: 'Genuine Relationships',
    desc: 'We assign dedicated cleaners to recurring clients because trust and consistency matter more than simply filling a schedule.',
    accent: '#F0F9FF',
    border: '#7dd3fc',
  },
  {
    icon: '✅',
    title: '100% Satisfaction Guaranteed',
    desc: 'Not satisfied with something? We return within 48 hours and re-clean at absolutely no charge. Zero hassle, zero question.',
    accent: '#F0FDF4',
    border: '#86efac',
  },
];

// ─── Team members ─────────────────────────────────────────────────────────────
const team = [
  {
    name: 'Sandra Okafor',
    role: 'Founder & CEO',
    initials: 'SO',
    color: '#3B4FCC',
    bio: 'With 15 years of hands-on experience, Sandy built Sparkle Touch on one unshakeable conviction: every person deserves to come home to something beautiful. She still personally reviews every new hire.',
    // 👉 Replace with real image URL: image: 'https://...'
    image: null,
  },
  {
    name: 'Michael Fontaine',
    role: 'Operations Director',
    initials: 'MF',
    color: '#0891B2',
    bio: 'Michael orchestrates our teams across four provinces with military precision, ensuring that quality is never compromised by distance, demand, or scale.',
    image: null,
  },
  {
    name: 'Aya Nakamura',
    role: 'Head of Training & Quality',
    initials: 'AN',
    color: '#7C3AED',
    bio: 'Aya developed our 40-point cleaning certification programme — the standard that separates Sparkle Touch professionals from the rest of the industry.',
    image: null,
  },
  {
    name: 'Dominique Pelletier',
    role: 'Client Experience Lead',
    initials: 'DP',
    color: '#059669',
    bio: 'Dominique ensures every client touchpoint exceeds expectations — from the first booking confirmation to the follow-up after each clean.',
    image: null,
  },
];

// ─── Timeline milestones ─────────────────────────────────────────────────────
const milestones = [
  { year: '2014', icon: '🪣', event: 'Sandy starts with one mop, one bucket, and an unshakeable belief that cleaning done right changes lives. First 3 clients in London, ON.' },
  { year: '2016', icon: '👥', event: 'Team grows to 8 professional cleaners. First commercial contract signed with a downtown London accounting firm.' },
  { year: '2018', icon: '🏅', event: 'Awarded "Best Local Service Business" by London Chamber of Commerce. Waiting list grows to 60+ households.' },
  { year: '2020', icon: '🌎', event: 'Expanded to Quebec and Manitoba despite industry-wide pandemic disruptions. Developed new health-safe cleaning protocols.' },
  { year: '2022', icon: '🎉', event: '5,000th client booking celebrated. Nova Scotia launch. Team reaches 45 full-time professionals.' },
  { year: '2024', icon: '🌱', event: 'Certified Eco-Friendly by the Canada Green Business Alliance. Full switch to biodegradable product lines.' },
  { year: '2026', icon: '✨', event: 'Today — 12 years of sparkle, still growing, still obsessed with your clean.' },
];

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const statsSection = useInView(0.3);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(-28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.08); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          from { background-position: 200% center; }
          to   { background-position: -200% center; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .fade-up   { animation: fadeUp   0.7s ease both; }
        .fade-left { animation: fadeLeft 0.7s ease both; }
        .fade-right{ animation: fadeRight 0.7s ease both; }
        .d1  { animation-delay: 0.05s; opacity: 0; }
        .d2  { animation-delay: 0.18s; opacity: 0; }
        .d3  { animation-delay: 0.30s; opacity: 0; }
        .d4  { animation-delay: 0.42s; opacity: 0; }
        .d5  { animation-delay: 0.54s; opacity: 0; }

        .value-card {
          border-radius: 22px;
          padding: 32px 28px;
          border: 1.5px solid;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .value-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 52px rgba(59,79,204,0.10);
        }

        .team-card {
          background: white;
          border-radius: 24px;
          overflow: hidden;
          border: 1.5px solid #eaecf5;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .team-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 52px rgba(59,79,204,0.12);
        }

        .stat-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(59,79,204,0.10);
        }

        .cta-btn {
          background: linear-gradient(90deg, #3B4FCC, #5a6be0, #3B4FCC);
          background-size: 200% auto;
          animation: shimmer 4s linear infinite;
          color: white;
          border: none;
          border-radius: 14px;
          padding: 15px 36px;
          font-size: 1.05rem;
          font-weight: 700;
          font-family: 'Poppins', sans-serif;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          box-shadow: 0 6px 24px rgba(59,79,204,0.35);
        }
        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(59,79,204,0.45);
        }

        .outline-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: white;
          border: 2px solid rgba(255,255,255,0.35);
          border-radius: 14px;
          padding: 13px 30px;
          font-size: 1.05rem;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          text-decoration: none;
          transition: all 0.2s;
        }
        .outline-btn:hover {
          background: rgba(255,255,255,0.10);
          border-color: rgba(255,255,255,0.6);
        }

        .timeline-dot {
          flex-shrink: 0;
          width: 48px; height: 48px;
          border-radius: 50%;
          background: white;
          border: 3px solid #c7d0f8;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem;
          box-shadow: 0 0 0 5px #EEF2FF;
          transition: all 0.3s;
          z-index: 1;
        }
        .timeline-item:hover .timeline-dot {
          border-color: #3B4FCC;
          box-shadow: 0 0 0 5px rgba(59,79,204,0.12);
          transform: scale(1.1);
        }

        /* ── Responsive ─────────────────────────────── */
        @media (max-width: 1024px) {
          .mission-grid  { grid-template-columns: 1fr !important; }
          .founder-grid  { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .hero-h1       { font-size: 2.4rem !important; }
          .stats-row     { flex-direction: column !important; gap: 12px !important; }
          .values-grid   { grid-template-columns: 1fr !important; }
          .team-grid     { grid-template-columns: 1fr 1fr !important; }
          .timeline-line { display: none !important; }
        }
        @media (max-width: 560px) {
          .hero-h1       { font-size: 2rem !important; }
          .team-grid     { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <main style={{ fontFamily: 'Poppins, sans-serif', background: '#f8f9ff', overflowX: 'hidden' }}>

        {/* ═══════════════════════════════════════════════════════════
            1. HERO — Background Image
               👉 Replace YOUR_IMAGE_URL_HERE with your image URL
        ═══════════════════════════════════════════════════════════ */}
        <section style={{ position: 'relative', overflow: 'hidden', minHeight: '580px', display: 'flex', alignItems: 'center', padding: '110px 0 100px' }}>

          {/* Background image layer */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url('YOUR_IMAGE_URL_HERE')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#0d1340', /* fallback until image loads */
            zIndex: 0,
          }} />

          {/* Primary gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(110deg, rgba(13,19,64,0.92) 0%, rgba(30,42,128,0.78) 50%, rgba(13,19,64,0.65) 100%)',
            zIndex: 1,
          }} />

          {/* Vignette */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.5) 100%)',
            zIndex: 2, pointerEvents: 'none',
          }} />

          {/* Decorative ring — top right */}
          <div style={{
            position: 'absolute', top: '-100px', right: '-100px',
            width: '480px', height: '480px', borderRadius: '50%',
            border: '80px solid rgba(59,79,204,0.12)',
            zIndex: 2, pointerEvents: 'none',
          }} />
          {/* Decorative ring — bottom left */}
          <div style={{
            position: 'absolute', bottom: '-80px', left: '-80px',
            width: '360px', height: '360px', borderRadius: '50%',
            border: '60px solid rgba(129,140,248,0.08)',
            zIndex: 2, pointerEvents: 'none',
          }} />

          {/* Floating accent dots */}
          {[[8,15],[88,40],[20,75],[75,18],[55,82],[40,50]].map(([left, top], i) => (
            <div key={i} style={{
              position: 'absolute',
              width: i % 2 === 0 ? '7px' : '5px',
              height: i % 2 === 0 ? '7px' : '5px',
              borderRadius: '50%',
              background: '#818cf8',
              opacity: 0.28,
              left: `${left}%`, top: `${top}%`,
              animation: `pulse ${2.5 + i * 0.35}s ease-in-out infinite`,
              animationDelay: `${i * 0.25}s`,
              zIndex: 3, pointerEvents: 'none',
            }} />
          ))}

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 4, maxWidth: '1400px', margin: '0 auto', padding: '0 24px', width: '100%' }}>
            <div style={{ maxWidth: '700px' }}>

              {/* Breadcrumb */}
              <div className="fade-up d1" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
                <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</Link>
                <span>›</span>
                <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>About Us</span>
              </div>

              {/* Eyebrow badge */}
              <div className="fade-up d1" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(255,255,255,0.10)',
                border: '1px solid rgba(255,255,255,0.20)',
                backdropFilter: 'blur(6px)',
                borderRadius: '999px', padding: '7px 20px', marginBottom: '24px',
              }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#818cf8', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.80)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Our Story</span>
              </div>

              <h1 className="fade-up d2 hero-h1" style={{
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                fontWeight: 900, color: 'white',
                lineHeight: 1.1, marginBottom: '22px',
                textShadow: '0 2px 24px rgba(0,0,0,0.4)',
              }}>
                Built on Elbow Grease<br />
                <span style={{ background: 'linear-gradient(90deg, #a5b4fc, #c7d0f8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  and Genuine Care
                </span>
              </h1>

              <p className="fade-up d3" style={{
                fontSize: '1.1rem', color: 'rgba(255,255,255,0.72)',
                lineHeight: 1.82, marginBottom: '36px',
                textShadow: '0 1px 8px rgba(0,0,0,0.3)', maxWidth: '580px',
              }}>
                Sandy's Sparkle Touch was born from one unshakeable belief — a truly clean space changes how you feel. We started with one mop and a dream. Over a decade later, that commitment is still our greatest asset.
              </p>

              {/* CTA buttons */}
              <div className="fade-up d4" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link href="/book" className="cta-btn">
                  Book a Clean
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
                <Link href="/contact" className="outline-btn">
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            2. STATS — Overlapping cards
        ═══════════════════════════════════════════════════════════ */}
        <section style={{ maxWidth: '1400px', margin: '-44px auto 0', padding: '0 24px', position: 'relative', zIndex: 10 }}>
          <div ref={statsSection.ref} className="stats-row" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <StatCard value={12}    suffix="+"  label="Years in Business"         color="#3B4FCC" inView={statsSection.inView} />
            <StatCard value={5000}  suffix="+"  label="Happy Clients"             color="#059669" inView={statsSection.inView} />
            <StatCard value={12000} suffix="+"  label="Cleanings Completed"       color="#D97706" inView={statsSection.inView} />
            <StatCard value={4}     suffix=""   label="Provinces Served"          color="#7C3AED" inView={statsSection.inView} />
            <StatCard value={100}   suffix="%"  label="Satisfaction Guarantee"    color="#0891B2" inView={statsSection.inView} />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            3. MISSION + IMAGE
        ═══════════════════════════════════════════════════════════ */}
        <section style={{ padding: '100px 0', background: 'white' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
            <div className="mission-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'center' }}>

              {/* Visual side */}
              <div style={{ position: 'relative' }}>
                {/* Main image frame */}
                <div style={{
                  borderRadius: '32px', overflow: 'hidden',
                  background: 'linear-gradient(135deg, #EEF2FF 0%, #c7d0f8 100%)',
                  aspectRatio: '4/5',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                  boxShadow: '0 32px 80px rgba(59,79,204,0.15)',
                }}>
                  {/* 👉 Replace with <img src="YOUR_IMAGE_URL" /> when available */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '7rem', animation: 'float 4s ease-in-out infinite' }}>✨</div>
                    <p style={{ fontSize: '0.82rem', color: '#6B7280', marginTop: '16px', fontStyle: 'italic' }}>Your team photo here</p>
                  </div>

                  {/* Decorative corner accent */}
                  <div style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '120px', background: 'rgba(59,79,204,0.08)', borderBottomLeftRadius: '100%' }} />
                </div>

                {/* Floating badge — years of experience */}
                <div style={{
                  position: 'absolute', bottom: '32px', left: '-24px',
                  background: 'white', borderRadius: '20px', padding: '18px 22px',
                  boxShadow: '0 16px 48px rgba(59,79,204,0.18)',
                  border: '1.5px solid #eaecf5',
                  display: 'flex', alignItems: 'center', gap: '14px',
                }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'linear-gradient(135deg, #3B4FCC, #5a6be0)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '1.5rem' }}>🏆</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0d1340', lineHeight: 1 }}>12+</p>
                    <p style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: '3px' }}>Years of Excellence</p>
                  </div>
                </div>

                {/* Floating badge — rating */}
                <div style={{
                  position: 'absolute', top: '28px', right: '-20px',
                  background: 'white', borderRadius: '20px', padding: '14px 18px',
                  boxShadow: '0 12px 36px rgba(59,79,204,0.14)',
                  border: '1.5px solid #eaecf5',
                  textAlign: 'center',
                }}>
                  <p style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0d1340', lineHeight: 1 }}>4.9 ★</p>
                  <p style={{ fontSize: '0.72rem', color: '#9CA3AF', marginTop: '4px' }}>800+ Reviews</p>
                </div>

                {/* Decorative dots pattern */}
                <div style={{ position: 'absolute', top: '-20px', left: '-20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', zIndex: -1 }}>
                  {[...Array(16)].map((_, i) => (
                    <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3B4FCC', opacity: 0.15 }} />
                  ))}
                </div>
              </div>

              {/* Text side */}
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3B4FCC', letterSpacing: '0.18em', textTransform: 'uppercase' }}>✦ Our Mission</span>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: '#0d1340', marginTop: '12px', marginBottom: '24px', lineHeight: 1.15 }}>
                  We Don't Just Clean.<br />
                  <span style={{ color: '#3B4FCC' }}>We Restore.</span>
                </h2>
                <p style={{ fontSize: '1.05rem', color: '#4B5563', lineHeight: 1.85, marginBottom: '20px' }}>
                  Our mission is to create living and working environments where people genuinely thrive. Cleanliness is not a luxury — it is foundational to your health, your focus, and your happiness.
                </p>
                <p style={{ fontSize: '1.05rem', color: '#4B5563', lineHeight: 1.85, marginBottom: '36px' }}>
                  We hire selectively, train extensively, and hold ourselves to a standard that most cleaning companies simply do not attempt. When you book with us, you are not just hiring a cleaner — you are gaining a team that cares about your home as much as you do.
                </p>

                {/* Mini feature list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
                  {[
                    'Fully insured, bonded & background-checked team',
                    'Biodegradable, pet-safe & child-safe products',
                    'Dedicated cleaners for recurring clients',
                    'Same-day and emergency cleans available',
                  ].map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ flexShrink: 0, width: '24px', height: '24px', borderRadius: '50%', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3B4FCC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                      </span>
                      <span style={{ fontSize: '0.95rem', color: '#374151', fontWeight: 500 }}>{item}</span>
                    </div>
                  ))}
                </div>

                <Link href="/book" className="cta-btn">
                  Book Your First Clean
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            4. VALUES GRID
        ═══════════════════════════════════════════════════════════ */}
        <section style={{ padding: '100px 0', background: '#f8f9ff' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3B4FCC', letterSpacing: '0.18em', textTransform: 'uppercase' }}>✦ What We Stand For</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: '#0d1340', marginTop: '12px', lineHeight: 1.2 }}>
                The Values Behind<br />Every Visit
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#6B7280', maxWidth: '480px', margin: '16px auto 0', lineHeight: 1.75 }}>
                These aren't words on a wall — they're the principles our entire team lives by on every single job.
              </p>
            </div>

            <div className="values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {values.map((v) => (
                <div key={v.title} className="value-card" style={{ background: v.accent, borderColor: v.border }}>
                  <div style={{ fontSize: '2.4rem', marginBottom: '16px' }}>{v.icon}</div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0d1340', marginBottom: '10px' }}>{v.title}</h3>
                  <p style={{ fontSize: '0.93rem', color: '#4B5563', lineHeight: 1.75 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            5. FOUNDER STORY — Full-width cinematic strip
        ═══════════════════════════════════════════════════════════ */}
        <section style={{ background: 'linear-gradient(130deg, #0d1340 0%, #1e2a80 50%, #0d1340 100%)', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
          {/* Decorative rings */}
          <div style={{ position: 'absolute', top: '-120px', right: '-120px', width: '500px', height: '500px', borderRadius: '50%', border: '80px solid rgba(59,79,204,0.10)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-80px', left: '5%', width: '320px', height: '320px', borderRadius: '50%', border: '50px solid rgba(129,140,248,0.07)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
            <div className="founder-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

              {/* Founder image */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  borderRadius: '32px', overflow: 'hidden',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1.5px solid rgba(255,255,255,0.12)',
                  aspectRatio: '4/5',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backdropFilter: 'blur(4px)',
                }}>
                  {/* 👉 Replace with founder photo */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      width: '120px', height: '120px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, #3B4FCC, #818cf8)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '2.8rem', fontWeight: 900, color: 'white',
                      margin: '0 auto 20px',
                      boxShadow: '0 20px 48px rgba(59,79,204,0.4)',
                    }}>SO</div>
                    <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>Founder photo here</p>
                  </div>
                </div>

                {/* Quote bubble */}
                <div style={{
                  position: 'absolute', bottom: '-20px', right: '-20px',
                  background: 'white', borderRadius: '20px', padding: '20px 24px',
                  maxWidth: '260px',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
                }}>
                  <p style={{ fontSize: '0.88rem', color: '#374151', lineHeight: 1.65, fontStyle: 'italic', marginBottom: '10px' }}>
                    "A clean home is a quiet act of love — for yourself, and for the people you share it with."
                  </p>
                  <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#3B4FCC' }}>— Sandra Okafor, Founder</p>
                </div>
              </div>

              {/* Story text */}
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>✦ The Founder</span>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: 'white', marginTop: '12px', marginBottom: '28px', lineHeight: 1.15 }}>
                  Sandy's Story
                </h2>
                <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.70)', lineHeight: 1.85, marginBottom: '20px' }}>
                  In 2014, Sandra Okafor arrived in London, Ontario with 15 years of cleaning experience, a work ethic that never quit, and a conviction that professional cleaning deserved to be treated as a skilled trade — not an afterthought.
                </p>
                <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.70)', lineHeight: 1.85, marginBottom: '20px' }}>
                  She started with three clients, a second-hand vacuum, and a handwritten checklist of 32 things she promised to never miss. That list became the foundation of the 40-point protocol that every Sparkle Touch professional uses to this day.
                </p>
                <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.70)', lineHeight: 1.85, marginBottom: '40px' }}>
                  Today, Sandy leads a team of 45+ professionals across four provinces. She still personally reviews every new hire — because the standard she built isn't something she's willing to hand off.
                </p>

                <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                  {[['2014', 'Founded'], ['45+', 'Team Members'], ['4', 'Provinces']].map(([v, l]) => (
                    <div key={l}>
                      <p style={{ fontSize: '2rem', fontWeight: 900, color: 'white' }}>{v}</p>
                      <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', marginTop: '4px' }}>{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            6. TIMELINE
        ═══════════════════════════════════════════════════════════ */}
        <section style={{ padding: '100px 0', background: 'white' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '72px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3B4FCC', letterSpacing: '0.18em', textTransform: 'uppercase' }}>✦ Our Journey</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: '#0d1340', marginTop: '12px' }}>
                A Decade of Sparkle
              </h2>
            </div>

            <div style={{ maxWidth: '780px', margin: '0 auto', position: 'relative' }}>
              {/* Vertical line */}
              <div className="timeline-line" style={{ position: 'absolute', left: '70px', top: '24px', bottom: '24px', width: '2px', background: 'linear-gradient(to bottom, #EEF2FF, #3B4FCC, #EEF2FF)', zIndex: 0 }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {milestones.map((m, i) => (
                  <div key={m.year} className="timeline-item" style={{ display: 'flex', gap: '28px', alignItems: 'flex-start', paddingBottom: i < milestones.length - 1 ? '36px' : '0' }}>
                    {/* Year label */}
                    <div style={{ flexShrink: 0, width: '56px', textAlign: 'right', paddingTop: '12px' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 800, color: i === milestones.length - 1 ? '#3B4FCC' : '#9CA3AF' }}>{m.year}</span>
                    </div>
                    {/* Dot */}
                    <div className="timeline-dot" style={{ background: i === milestones.length - 1 ? '#EEF2FF' : 'white', borderColor: i === milestones.length - 1 ? '#3B4FCC' : '#c7d0f8' }}>
                      {m.icon}
                    </div>
                    {/* Text */}
                    <div style={{ paddingTop: '10px', flex: 1 }}>
                      <p style={{ fontSize: '0.97rem', color: '#374151', lineHeight: 1.75, fontWeight: i === milestones.length - 1 ? 600 : 400 }}>{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            7. TEAM GRID
        ═══════════════════════════════════════════════════════════ */}
        <section style={{ padding: '100px 0', background: '#f8f9ff' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3B4FCC', letterSpacing: '0.18em', textTransform: 'uppercase' }}>✦ The Team</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: '#0d1340', marginTop: '12px' }}>
                The People Behind<br />the Polish
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#6B7280', maxWidth: '460px', margin: '16px auto 0', lineHeight: 1.75 }}>
                Every member of our leadership team was once on the tools. They know what great cleaning looks like — because they've done it themselves.
              </p>
            </div>

            <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              {team.map((member, i) => (
                <div key={member.name} className="team-card">
                  {/* Photo / avatar area */}
                  <div style={{
                    height: '200px',
                    background: `linear-gradient(135deg, ${member.color}22, ${member.color}44)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', overflow: 'hidden',
                  }}>
                    {/* Decorative ring */}
                    <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', border: `20px solid ${member.color}22`, pointerEvents: 'none' }} />

                    {/* Avatar circle — 👉 replace with <img src={member.image} /> when available */}
                    <div style={{
                      width: '90px', height: '90px', borderRadius: '50%',
                      background: `linear-gradient(135deg, ${member.color}, ${member.color}bb)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.5rem', fontWeight: 900, color: 'white',
                      boxShadow: `0 12px 32px ${member.color}50`,
                    }}>
                      {member.initials}
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: '24px 24px 28px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0d1340', marginBottom: '4px' }}>{member.name}</h3>
                    <p style={{ fontSize: '0.78rem', fontWeight: 700, color: member.color, marginBottom: '14px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{member.role}</p>
                    <p style={{ fontSize: '0.88rem', color: '#6B7280', lineHeight: 1.72 }}>{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            8. TESTIMONIAL STRIP
        ═══════════════════════════════════════════════════════════ */}
        <section style={{ background: 'white', padding: '80px 0', borderTop: '1.5px solid #eaecf5' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3B4FCC', letterSpacing: '0.18em', textTransform: 'uppercase' }}>✦ What Clients Say</span>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 900, color: '#0d1340', marginTop: '8px' }}>Canadians Love the Sparkle</h2>
              </div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                {[...Array(5)].map((_, i) => <span key={i} style={{ fontSize: '1.3rem' }}>★</span>).map((s, i) => <span key={i} style={{ color: '#FBBF24', fontSize: '1.3rem' }}>★</span>)}
                <span style={{ fontWeight: 700, color: '#0d1340', fontSize: '1.1rem', marginLeft: '8px' }}>4.9</span>
                <span style={{ color: '#9CA3AF', fontSize: '0.88rem', marginLeft: '4px' }}>/ 800+ reviews</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {[
                { name: 'Amara Osei', loc: 'London, ON', initials: 'AO', color: '#3B4FCC', text: "Sandy's team transformed my apartment in a single afternoon. I could not believe it was the same place. They noticed things I had stopped seeing months ago." },
                { name: 'Luc Tremblay', loc: 'Quebec City, QC', initials: 'LT', color: '#059669', text: "Professional, thorough, and genuinely caring. I have had other cleaning services before — none of them come close to the standard Sandy's team delivers every time." },
                { name: 'Priya Sharma', loc: 'Winnipeg, MB', initials: 'PS', color: '#7C3AED', text: "The move-out clean saved my entire damage deposit. My landlord was genuinely surprised. Worth every single penny and I would book again without hesitation." },
              ].map(t => (
                <div key={t.name} style={{ background: '#f8f9ff', borderRadius: '22px', padding: '32px', border: '1.5px solid #eaecf5' }}>
                  <div style={{ display: 'flex', gap: '2px', marginBottom: '16px' }}>
                    {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#FBBF24', fontSize: '0.95rem' }}>★</span>)}
                  </div>
                  <p style={{ fontSize: '0.97rem', color: '#374151', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '24px' }}>"{t.text}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: `linear-gradient(135deg, ${t.color}, ${t.color}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.82rem', flexShrink: 0 }}>{t.initials}</div>
                    <div>
                      <p style={{ fontWeight: 700, color: '#0d1340', fontSize: '0.95rem' }}>{t.name}</p>
                      <p style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>📍 {t.loc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            9. BOTTOM CTA BAND
        ═══════════════════════════════════════════════════════════ */}
        <section style={{ background: 'linear-gradient(130deg, #0d1340 0%, #1e2a80 50%, #0d1340 100%)', padding: '90px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,79,204,0.20) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '20px', animation: 'float 3.5s ease-in-out infinite' }}>🌟</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'white', marginBottom: '16px', lineHeight: 1.15 }}>
              Become Part of<br />Our Story
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.65)', marginBottom: '40px', maxWidth: '480px', margin: '0 auto 40px', lineHeight: 1.8 }}>
              Let us earn a permanent spot on your trusted services list. Book your first clean today — we promise it will feel different.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/book" className="cta-btn">
                Book My First Clean
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link href="/contact" className="outline-btn">
                Talk to Our Team
              </Link>
            </div>

            {/* Trust strip */}
            <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '48px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.10)' }}>
              {[['✅', '100% Satisfaction'], ['🛡️', 'Fully Insured'], ['🌿', 'Eco-Friendly'], ['⏱️', 'On-Time Always']].map(([icon, label]) => (
                <div key={label as string} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1rem' }}>{icon}</span>
                  <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}