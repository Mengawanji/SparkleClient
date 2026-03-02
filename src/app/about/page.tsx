'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Leaf,
  Clock,
  Gem,
  Handshake,
  BadgeCheck,
  Users,
  Medal,
  Globe,
  PartyPopper,
  Sprout,
  Sparkles,
  Trophy,
  Star,
  MapPin,
  ChevronRight,
  Radio,
  MessageCircle,
} from 'lucide-react';

// ─── Animated counter hook ────────────────────────────────────────────────────
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

// ─── Intersection observer hook ───────────────────────────────────────────────
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
function StatCard({ value, suffix, label, color, inView }: {
  value: number; suffix: string; label: string; color: string; inView: boolean;
}) {
  const count = useCounter(value, 1800, inView);
  return (
    <div className="ab-stat-card" style={{ textAlign: 'center', padding: '36px 24px', background: 'white', borderRadius: '24px', border: '1.5px solid #eaecf5', flex: '1', minWidth: '160px' }}>
      <p style={{ fontSize: 'clamp(2.2rem,4vw,3rem)', fontWeight: 900, color, lineHeight: 1, marginBottom: 8 }}>
        {count}{suffix}
      </p>
      <p style={{ fontSize: '0.92rem', color: '#6B7280', fontWeight: 500 }}>{label}</p>
    </div>
  );
}

// ─── Section label helper ─────────────────────────────────────────────────────
function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
      <Sparkles size={13} color={dark ? 'rgba(255,255,255,0.45)' : '#3B4FCC'} strokeWidth={2} />
      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: dark ? 'rgba(255,255,255,0.45)' : '#3B4FCC', letterSpacing: '0.18em', textTransform: 'uppercase' as const }}>
        {children}
      </span>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const values = [
  { Icon: ShieldCheck, title: 'Trust Above All',               accent: '#EEF2FF', border: '#c7d0f8', iconColor: '#3B4FCC', desc: 'Every cleaner is thoroughly background-checked, fully bonded, and insured before they ever step into a client home. Your safety is non-negotiable.' },
  { Icon: Leaf,        title: 'Eco-Conscious Cleaning',        accent: '#F0FDF4', border: '#86efac', iconColor: '#16a34a', desc: 'We exclusively use certified biodegradable, non-toxic products that are safe for children, pets, and the Canadian environment.' },
  { Icon: Clock,       title: 'Punctuality is Our Promise',    accent: '#FFF7ED', border: '#fed7aa', iconColor: '#D97706', desc: 'Your time is precious. We arrive in our confirmed window — no vague "sometime between 8 and 6" windows that waste your day.' },
  { Icon: Gem,         title: 'Detail-Obsessed',               accent: '#FDF4FF', border: '#e9d5ff', iconColor: '#7C3AED', desc: 'Our proprietary 40-point checklist ensures that nothing — not a baseboard, not a door frame, not a light switch — gets missed.' },
  { Icon: Handshake,   title: 'Genuine Relationships',         accent: '#F0F9FF', border: '#7dd3fc', iconColor: '#0891B2', desc: 'We assign dedicated cleaners to recurring clients because trust and consistency matter more than simply filling a schedule.' },
  { Icon: BadgeCheck,  title: '100% Satisfaction Guaranteed',  accent: '#F0FDF4', border: '#86efac', iconColor: '#16a34a', desc: 'Not satisfied with something? We return within 48 hours and re-clean at absolutely no charge. Zero hassle, zero question.' },
];

const team = [
  { name: 'Sandra Okafor',     role: 'Founder & CEO',              initials: 'SO', color: '#3B4FCC', bio: 'With 15 years of hands-on experience, Sandy built Sparkle Touch on one unshakeable conviction: every person deserves to come home to something beautiful. She still personally reviews every new hire.' },
  { name: 'Michael Fontaine',  role: 'Operations Director',         initials: 'MF', color: '#0891B2', bio: 'Michael orchestrates our teams across four provinces with military precision, ensuring that quality is never compromised by distance, demand, or scale.' },
  { name: 'Aya Nakamura',      role: 'Head of Training & Quality',  initials: 'AN', color: '#7C3AED', bio: 'Aya developed our 40-point cleaning certification programme — the standard that separates Sparkle Touch professionals from the rest of the industry.' },
  { name: 'Dominique Pelletier', role: 'Client Experience Lead',    initials: 'DP', color: '#059669', bio: 'Dominique ensures every client touchpoint exceeds expectations — from the first booking confirmation to the follow-up after each clean.' },
];

const milestones = [
  { year: '2014', Icon: Sprout,      event: 'Sandy starts with one mop, one bucket, and an unshakeable belief that cleaning done right changes lives. First 3 clients in London, ON.' },
  { year: '2016', Icon: Users,       event: 'Team grows to 8 professional cleaners. First commercial contract signed with a downtown London accounting firm.' },
  { year: '2018', Icon: Medal,       event: 'Awarded "Best Local Service Business" by London Chamber of Commerce. Waiting list grows to 60+ households.' },
  { year: '2020', Icon: Globe,       event: 'Expanded to Quebec and Manitoba despite industry-wide pandemic disruptions. Developed new health-safe cleaning protocols.' },
  { year: '2022', Icon: PartyPopper, event: '5,000th client booking celebrated. Nova Scotia launch. Team reaches 45 full-time professionals.' },
  { year: '2024', Icon: Sprout,      event: 'Certified Eco-Friendly by the Canada Green Business Alliance. Full switch to biodegradable product lines.' },
  { year: '2026', Icon: Sparkles,    event: 'Today — 12 years of sparkle, still growing, still obsessed with your clean.' },
];

const testimonials = [
  { name: 'Amara Osei',    loc: 'London, ON',      initials: 'AO', color: '#3B4FCC', text: "Sandy's team transformed my apartment in a single afternoon. I could not believe it was the same place. They noticed things I had stopped seeing months ago." },
  { name: 'Luc Tremblay',  loc: 'Quebec City, QC', initials: 'LT', color: '#059669', text: "Professional, thorough, and genuinely caring. I have had other cleaning services before — none of them come close to the standard Sandy's team delivers every time." },
  { name: 'Priya Sharma',  loc: 'Winnipeg, MB',    initials: 'PS', color: '#7C3AED', text: "The move-out clean saved my entire damage deposit. My landlord was genuinely surprised. Worth every single penny and I would book again without hesitation." },
];

const trustItems = [
  { Icon: BadgeCheck, label: '100% Satisfaction' },
  { Icon: ShieldCheck, label: 'Fully Insured'    },
  { Icon: Leaf,        label: 'Eco-Friendly'     },
  { Icon: Clock,       label: 'On-Time Always'   },
];

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const statsSection = useInView(0.3);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');

        @keyframes ab-fadeUp   { from { opacity:0; transform:translateY(28px);  } to { opacity:1; transform:translateY(0);  } }
        @keyframes ab-fadeLeft { from { opacity:0; transform:translateX(-28px); } to { opacity:1; transform:translateX(0);  } }
        @keyframes ab-pulse    { 0%,100% { transform:scale(1); } 50% { transform:scale(1.08); } }
        @keyframes ab-float    { 0%,100% { transform:translateY(0);   } 50% { transform:translateY(-10px); } }
        @keyframes ab-shimmer  { from { background-position:200% center; } to { background-position:-200% center; } }

        .ab-fade-up   { animation: ab-fadeUp   0.7s ease both; }
        .ab-fade-left { animation: ab-fadeLeft 0.7s ease both; }
        .ab-d1 { animation-delay:0.05s; opacity:0; }
        .ab-d2 { animation-delay:0.18s; opacity:0; }
        .ab-d3 { animation-delay:0.30s; opacity:0; }
        .ab-d4 { animation-delay:0.42s; opacity:0; }
        .ab-d5 { animation-delay:0.54s; opacity:0; }

        .ab-value-card {
          border-radius:22px; padding:32px 28px; border:1.5px solid;
          transition:transform 0.25s ease, box-shadow 0.25s ease;
        }
        .ab-value-card:hover { transform:translateY(-6px); box-shadow:0 24px 52px rgba(59,79,204,0.10); }

        .ab-team-card {
          background:white; border-radius:24px; overflow:hidden;
          border:1.5px solid #eaecf5;
          transition:transform 0.25s ease, box-shadow 0.25s ease;
        }
        .ab-team-card:hover { transform:translateY(-6px); box-shadow:0 24px 52px rgba(59,79,204,0.12); }

        .ab-stat-card { transition:transform 0.25s ease, box-shadow 0.25s ease; }
        .ab-stat-card:hover { transform:translateY(-4px); box-shadow:0 16px 40px rgba(59,79,204,0.10); }

        .ab-cta-btn {
          background: linear-gradient(90deg,#3B4FCC,#5a6be0,#3B4FCC);
          background-size:200% auto;
          animation:ab-shimmer 4s linear infinite;
          color:white; border:none; border-radius:14px;
          padding:15px 36px; font-size:1.05rem; font-weight:700;
          font-family:'Poppins',sans-serif; cursor:pointer;
          display:inline-flex; align-items:center; gap:10px;
          text-decoration:none;
          transition:transform 0.15s ease, box-shadow 0.15s ease;
          box-shadow:0 6px 24px rgba(59,79,204,0.35);
        }
        .ab-cta-btn:hover { transform:translateY(-2px); box-shadow:0 12px 36px rgba(59,79,204,0.45); }

        .ab-outline-btn {
          display:inline-flex; align-items:center; gap:8px;
          background:transparent; color:white;
          border:2px solid rgba(255,255,255,0.35); border-radius:14px;
          padding:13px 30px; font-size:1.05rem; font-weight:600;
          font-family:'Poppins',sans-serif; text-decoration:none;
          transition:all 0.2s;
        }
        .ab-outline-btn:hover { background:rgba(255,255,255,0.10); border-color:rgba(255,255,255,0.6); }

        .ab-timeline-dot {
          flex-shrink:0; width:48px; height:48px; border-radius:50%;
          background:white; border:3px solid #c7d0f8;
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 0 0 5px #EEF2FF;
          transition:all 0.3s; z-index:1;
        }
        .ab-timeline-item:hover .ab-timeline-dot {
          border-color:#3B4FCC;
          box-shadow:0 0 0 5px rgba(59,79,204,0.12);
          transform:scale(1.1);
        }

        @media (max-width:1024px) {
          .ab-mission-grid { grid-template-columns:1fr !important; }
          .ab-founder-grid { grid-template-columns:1fr !important; }
        }
        @media (max-width:768px) {
          .ab-hero-h1    { font-size:2.4rem !important; }
          .ab-stats-row  { flex-direction:column !important; gap:12px !important; }
          .ab-vals-grid  { grid-template-columns:1fr !important; }
          .ab-team-grid  { grid-template-columns:1fr 1fr !important; }
          .ab-tl-line    { display:none !important; }
        }
        @media (max-width:560px) {
          .ab-hero-h1    { font-size:2rem !important; }
          .ab-team-grid  { grid-template-columns:1fr !important; }
        }
      `}</style>

      <main style={{ fontFamily: 'Poppins, sans-serif', background: '#f8f9ff', overflowX: 'hidden' }}>

        {/* ══════════════════════════════════════
            1. HERO
        ══════════════════════════════════════ */}
        <section style={{ position:'relative', overflow:'hidden', minHeight:'580px', display:'flex', alignItems:'center', padding:'110px 0 100px' }}>

          {/* ── Background: real home cleaning photo from Unsplash ── */}
          <div style={{
            position:'absolute', inset:0,
            backgroundImage:`url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1800&q=85&fit=crop&crop=center')`,
            backgroundSize:'cover',
            backgroundPosition:'center 40%',
            backgroundRepeat:'no-repeat',
            zIndex:0,
          }} />

          {/* ── Bright blue tint overlay — lighter than before, photo shows through clearly ── */}
          <div style={{
            position:'absolute', inset:0,
            background:'linear-gradient(110deg, rgba(50,72,200,0.62) 0%, rgba(80,100,215,0.55) 48%, rgba(110,95,190,0.48) 100%)',
            zIndex:1,
          }} />

          {/* ── Decorative rings ── */}
          <div style={{ position:'absolute', top:'-100px', right:'-100px', width:480, height:480, borderRadius:'50%', border:'80px solid rgba(59,79,204,0.12)', zIndex:2, pointerEvents:'none' }} />
          <div style={{ position:'absolute', bottom:'-80px', left:'-80px', width:360, height:360, borderRadius:'50%', border:'60px solid rgba(129,140,248,0.08)', zIndex:2, pointerEvents:'none' }} />

          {/* ── Floating accent dots ── */}
          {[[8,15],[88,40],[20,75],[75,18],[55,82],[40,50]].map(([left,top],i) => (
            <div key={i} style={{
              position:'absolute',
              width:i%2===0?7:5, height:i%2===0?7:5,
              borderRadius:'50%', background:'#818cf8', opacity:0.28,
              left:`${left}%`, top:`${top}%`,
              animation:`ab-pulse ${2.5+i*0.35}s ease-in-out infinite`,
              animationDelay:`${i*0.25}s`,
              zIndex:3, pointerEvents:'none',
            }} />
          ))}

          {/* ── Content ── */}
          <div style={{ position:'relative', zIndex:4, maxWidth:1400, margin:'0 auto', padding:'0 24px', width:'100%' }}>
            <div style={{ maxWidth:700 }}>

              {/* Breadcrumb */}
              <div className="ab-fade-up ab-d1" style={{ display:'flex', alignItems:'center', gap:6, fontSize:'0.8rem', color:'rgba(255,255,255,0.5)', marginBottom:20 }}>
                <Link href="/" style={{ color:'rgba(255,255,255,0.5)', textDecoration:'none' }}>Home</Link>
                <ChevronRight size={13} color="rgba(255,255,255,0.4)" strokeWidth={2} />
                <span style={{ color:'rgba(255,255,255,0.85)', fontWeight:600 }}>About Us</span>
              </div>

              {/* Eyebrow pill */}
              <div className="ab-fade-up ab-d1" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.10)', border:'1px solid rgba(255,255,255,0.20)', backdropFilter:'blur(6px)', borderRadius:999, padding:'7px 20px', marginBottom:24 }}>
                <Radio size={12} color="#818cf8" strokeWidth={2.5} style={{ animation:'ab-pulse 2s ease-in-out infinite' }} />
                <span style={{ fontSize:'0.72rem', fontWeight:700, color:'rgba(255,255,255,0.80)', letterSpacing:'0.18em', textTransform:'uppercase' }}>Our Story</span>
              </div>

              <h1 className="ab-fade-up ab-d2 ab-hero-h1" style={{ fontSize:'clamp(2.4rem,5vw,3.8rem)', fontWeight:900, color:'white', lineHeight:1.1, marginBottom:22, textShadow:'0 2px 24px rgba(0,0,0,0.4)' }}>
                Built on Elbow Grease<br />
                <span style={{ background:'linear-gradient(90deg,#a5b4fc,#c7d0f8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                  and Genuine Care
                </span>
              </h1>

              <p className="ab-fade-up ab-d3" style={{ fontSize:'1.1rem', color:'rgba(255,255,255,0.78)', lineHeight:1.82, marginBottom:36, textShadow:'0 1px 8px rgba(0,0,0,0.3)', maxWidth:580 }}>
                Sandy's Sparkle Touch was born from one unshakeable belief — a truly clean space changes how you feel. We started with one mop and a dream. Over a decade later, that commitment is still our greatest asset.
              </p>

              <div className="ab-fade-up ab-d4" style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
                <Link href="/book" className="ab-cta-btn">
                  Book a Clean <ArrowRight size={16} strokeWidth={2.5} />
                </Link>
                <Link href="/contact" className="ab-outline-btn">
                  <MessageCircle size={16} strokeWidth={2} /> Get in Touch
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            2. STATS
        ══════════════════════════════════════ */}
        <section style={{ maxWidth:1400, margin:'-44px auto 0', padding:'0 24px', position:'relative', zIndex:10 }}>
          <div ref={statsSection.ref} className="ab-stats-row" style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
            <StatCard value={12}    suffix="+"  label="Years in Business"      color="#3B4FCC" inView={statsSection.inView} />
            <StatCard value={5000}  suffix="+"  label="Happy Clients"          color="#059669" inView={statsSection.inView} />
            <StatCard value={12000} suffix="+"  label="Cleanings Completed"    color="#D97706" inView={statsSection.inView} />
            <StatCard value={4}     suffix=""   label="Provinces Served"       color="#7C3AED" inView={statsSection.inView} />
            <StatCard value={100}   suffix="%"  label="Satisfaction Guarantee" color="#0891B2" inView={statsSection.inView} />
          </div>
        </section>

        {/* ══════════════════════════════════════
            3. MISSION + IMAGE
        ══════════════════════════════════════ */}
        <section style={{ padding:'100px 0', background:'white' }}>
          <div style={{ maxWidth:1400, margin:'0 auto', padding:'0 24px' }}>
            <div className="ab-mission-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:72, alignItems:'center' }}>

              {/* Visual side */}
              <div style={{ position:'relative' }}>
                <div style={{ borderRadius:32, overflow:'hidden', background:'linear-gradient(135deg,#EEF2FF 0%,#c7d0f8 100%)', aspectRatio:'4/5', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', boxShadow:'0 32px 80px rgba(59,79,204,0.15)' }}>
                  {/* Replace with <img src="YOUR_URL" /> when ready */}
                  <div style={{ textAlign:'center' }}>
                    <div style={{ animation:'ab-float 4s ease-in-out infinite', display:'flex', justifyContent:'center' }}>
                      <Sparkles size={96} color="#3B4FCC" strokeWidth={1.2} style={{ opacity:0.5 }} />
                    </div>
                    <p style={{ fontSize:'0.82rem', color:'#6B7280', marginTop:16, fontStyle:'italic' }}>Your team photo here</p>
                  </div>
                  <div style={{ position:'absolute', top:0, right:0, width:120, height:120, background:'rgba(59,79,204,0.08)', borderBottomLeftRadius:'100%' }} />
                </div>

                {/* Floating badge — years */}
                <div style={{ position:'absolute', bottom:32, left:-24, background:'white', borderRadius:20, padding:'18px 22px', boxShadow:'0 16px 48px rgba(59,79,204,0.18)', border:'1.5px solid #eaecf5', display:'flex', alignItems:'center', gap:14 }}>
                  <div style={{ width:52, height:52, borderRadius:14, background:'linear-gradient(135deg,#3B4FCC,#5a6be0)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Trophy size={26} color="white" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p style={{ fontSize:'1.5rem', fontWeight:900, color:'#0d1340', lineHeight:1 }}>12+</p>
                    <p style={{ fontSize:'0.8rem', color:'#6B7280', marginTop:3 }}>Years of Excellence</p>
                  </div>
                </div>

                {/* Floating badge — rating */}
                <div style={{ position:'absolute', top:28, right:-20, background:'white', borderRadius:20, padding:'14px 18px', boxShadow:'0 12px 36px rgba(59,79,204,0.14)', border:'1.5px solid #eaecf5', textAlign:'center' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:4, justifyContent:'center' }}>
                    <p style={{ fontSize:'1.6rem', fontWeight:900, color:'#0d1340', lineHeight:1 }}>4.9</p>
                    <Star size={20} color="#FBBF24" fill="#FBBF24" strokeWidth={0} />
                  </div>
                  <p style={{ fontSize:'0.72rem', color:'#9CA3AF', marginTop:4 }}>800+ Reviews</p>
                </div>

                {/* Dot pattern */}
                <div style={{ position:'absolute', top:-20, left:-20, display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, zIndex:-1 }}>
                  {[...Array(16)].map((_,i) => <div key={i} style={{ width:6, height:6, borderRadius:'50%', background:'#3B4FCC', opacity:0.15 }} />)}
                </div>
              </div>

              {/* Text side */}
              <div>
                <SectionLabel>Our Mission</SectionLabel>
                <h2 style={{ fontSize:'clamp(2rem,4vw,2.8rem)', fontWeight:900, color:'#0d1340', marginTop:12, marginBottom:24, lineHeight:1.15 }}>
                  We Don't Just Clean.<br /><span style={{ color:'#3B4FCC' }}>We Restore.</span>
                </h2>
                <p style={{ fontSize:'1.05rem', color:'#4B5563', lineHeight:1.85, marginBottom:20 }}>
                  Our mission is to create living and working environments where people genuinely thrive. Cleanliness is not a luxury — it is foundational to your health, your focus, and your happiness.
                </p>
                <p style={{ fontSize:'1.05rem', color:'#4B5563', lineHeight:1.85, marginBottom:36 }}>
                  We hire selectively, train extensively, and hold ourselves to a standard that most cleaning companies simply do not attempt. When you book with us, you are not just hiring a cleaner — you are gaining a team that cares about your home as much as you do.
                </p>

                {/* Feature list */}
                <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:40 }}>
                  {[
                    'Fully insured, bonded & background-checked team',
                    'Biodegradable, pet-safe & child-safe products',
                    'Dedicated cleaners for recurring clients',
                    'Same-day and emergency cleans available',
                  ].map(item => (
                    <div key={item} style={{ display:'flex', alignItems:'center', gap:12 }}>
                      <span style={{ flexShrink:0, width:24, height:24, borderRadius:'50%', background:'#EEF2FF', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <Check size={12} color="#3B4FCC" strokeWidth={3} />
                      </span>
                      <span style={{ fontSize:'0.95rem', color:'#374151', fontWeight:500 }}>{item}</span>
                    </div>
                  ))}
                </div>

                <Link href="/book" className="ab-cta-btn">
                  Book Your First Clean <ArrowRight size={16} strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            4. VALUES GRID
        ══════════════════════════════════════ */}
        <section style={{ padding:'100px 0', background:'#f8f9ff' }}>
          <div style={{ maxWidth:1400, margin:'0 auto', padding:'0 24px' }}>
            <div style={{ textAlign:'center', marginBottom:64 }}>
              <SectionLabel>What We Stand For</SectionLabel>
              <h2 style={{ fontSize:'clamp(2rem,4vw,2.8rem)', fontWeight:900, color:'#0d1340', marginTop:12, lineHeight:1.2 }}>
                The Values Behind<br />Every Visit
              </h2>
              <p style={{ fontSize:'1.05rem', color:'#6B7280', maxWidth:480, margin:'16px auto 0', lineHeight:1.75 }}>
                These aren't words on a wall — they're the principles our entire team lives by on every single job.
              </p>
            </div>

            <div className="ab-vals-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
              {values.map(({ Icon, title, accent, border, iconColor, desc }) => (
                <div key={title} className="ab-value-card" style={{ background:accent, borderColor:border }}>
                  <div style={{ width:52, height:52, borderRadius:14, background:'rgba(255,255,255,0.7)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16 }}>
                    <Icon size={26} color={iconColor} strokeWidth={1.8} />
                  </div>
                  <h3 style={{ fontSize:'1.1rem', fontWeight:800, color:'#0d1340', marginBottom:10 }}>{title}</h3>
                  <p style={{ fontSize:'0.93rem', color:'#4B5563', lineHeight:1.75 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            5. FOUNDER STORY
        ══════════════════════════════════════ */}
        <section style={{ background:'linear-gradient(130deg,#0d1340 0%,#1e2a80 50%,#0d1340 100%)', padding:'100px 0', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:-120, right:-120, width:500, height:500, borderRadius:'50%', border:'80px solid rgba(59,79,204,0.10)', pointerEvents:'none' }} />
          <div style={{ position:'absolute', bottom:-80, left:'5%', width:320, height:320, borderRadius:'50%', border:'50px solid rgba(129,140,248,0.07)', pointerEvents:'none' }} />

          <div style={{ maxWidth:1400, margin:'0 auto', padding:'0 24px' }}>
            <div className="ab-founder-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>

              {/* Founder image area */}
              <div style={{ position:'relative' }}>
                <div style={{ borderRadius:32, overflow:'hidden', background:'rgba(255,255,255,0.06)', border:'1.5px solid rgba(255,255,255,0.12)', aspectRatio:'4/5', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(4px)' }}>
                  {/* Replace with <img src="founder-photo" /> */}
                  <div style={{ textAlign:'center' }}>
                    <div style={{ width:120, height:120, borderRadius:'50%', background:'linear-gradient(135deg,#3B4FCC,#818cf8)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2.8rem', fontWeight:900, color:'white', margin:'0 auto 20px', boxShadow:'0 20px 48px rgba(59,79,204,0.4)' }}>SO</div>
                    <p style={{ fontSize:'0.82rem', color:'rgba(255,255,255,0.4)', fontStyle:'italic' }}>Founder photo here</p>
                  </div>
                </div>

                {/* Quote bubble */}
                <div style={{ position:'absolute', bottom:-20, right:-20, background:'white', borderRadius:20, padding:'20px 24px', maxWidth:260, boxShadow:'0 16px 48px rgba(0,0,0,0.2)' }}>
                  <p style={{ fontSize:'0.88rem', color:'#374151', lineHeight:1.65, fontStyle:'italic', marginBottom:10 }}>
                    "A clean home is a quiet act of love — for yourself, and for the people you share it with."
                  </p>
                  <p style={{ fontSize:'0.78rem', fontWeight:700, color:'#3B4FCC' }}>— Sandra Okafor, Founder</p>
                </div>
              </div>

              {/* Story text */}
              <div>
                <SectionLabel dark>The Founder</SectionLabel>
                <h2 style={{ fontSize:'clamp(2rem,4vw,2.8rem)', fontWeight:900, color:'white', marginTop:12, marginBottom:28, lineHeight:1.15 }}>Sandy's Story</h2>
                <p style={{ fontSize:'1.05rem', color:'rgba(255,255,255,0.70)', lineHeight:1.85, marginBottom:20 }}>
                  In 2014, Sandra Okafor arrived in London, Ontario with 15 years of cleaning experience, a work ethic that never quit, and a conviction that professional cleaning deserved to be treated as a skilled trade — not an afterthought.
                </p>
                <p style={{ fontSize:'1.05rem', color:'rgba(255,255,255,0.70)', lineHeight:1.85, marginBottom:20 }}>
                  She started with three clients, a second-hand vacuum, and a handwritten checklist of 32 things she promised to never miss. That list became the foundation of the 40-point protocol that every Sparkle Touch professional uses to this day.
                </p>
                <p style={{ fontSize:'1.05rem', color:'rgba(255,255,255,0.70)', lineHeight:1.85, marginBottom:40 }}>
                  Today, Sandy leads a team of 45+ professionals across four provinces. She still personally reviews every new hire — because the standard she built isn't something she's willing to hand off.
                </p>
                <div style={{ display:'flex', gap:40, flexWrap:'wrap' }}>
                  {[['2014','Founded'],['45+','Team Members'],['4','Provinces']].map(([v,l]) => (
                    <div key={l}>
                      <p style={{ fontSize:'2rem', fontWeight:900, color:'white' }}>{v}</p>
                      <p style={{ fontSize:'0.82rem', color:'rgba(255,255,255,0.45)', marginTop:4 }}>{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            6. TIMELINE
        ══════════════════════════════════════ */}
        <section style={{ padding:'100px 0', background:'white' }}>
          <div style={{ maxWidth:1400, margin:'0 auto', padding:'0 24px' }}>
            <div style={{ textAlign:'center', marginBottom:72 }}>
              <SectionLabel>Our Journey</SectionLabel>
              <h2 style={{ fontSize:'clamp(2rem,4vw,2.8rem)', fontWeight:900, color:'#0d1340', marginTop:12 }}>A Decade of Sparkle</h2>
            </div>

            <div style={{ maxWidth:780, margin:'0 auto', position:'relative' }}>
              <div className="ab-tl-line" style={{ position:'absolute', left:70, top:24, bottom:24, width:2, background:'linear-gradient(to bottom,#EEF2FF,#3B4FCC,#EEF2FF)', zIndex:0 }} />

              <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
                {milestones.map(({ year, Icon, event }, i) => (
                  <div key={year} className="ab-timeline-item" style={{ display:'flex', gap:28, alignItems:'flex-start', paddingBottom: i < milestones.length-1 ? 36 : 0 }}>
                    <div style={{ flexShrink:0, width:56, textAlign:'right', paddingTop:12 }}>
                      <span style={{ fontSize:'0.82rem', fontWeight:800, color: i===milestones.length-1 ? '#3B4FCC' : '#9CA3AF' }}>{year}</span>
                    </div>
                    <div className="ab-timeline-dot" style={{ background: i===milestones.length-1 ? '#EEF2FF' : 'white', borderColor: i===milestones.length-1 ? '#3B4FCC' : '#c7d0f8' }}>
                      <Icon size={20} color={i===milestones.length-1 ? '#3B4FCC' : '#9CA3AF'} strokeWidth={1.8} />
                    </div>
                    <div style={{ paddingTop:10, flex:1 }}>
                      <p style={{ fontSize:'0.97rem', color:'#374151', lineHeight:1.75, fontWeight: i===milestones.length-1 ? 600 : 400 }}>{event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            7. TEAM GRID
        ══════════════════════════════════════ */}
        <section style={{ padding:'100px 0', background:'#f8f9ff' }}>
          <div style={{ maxWidth:1400, margin:'0 auto', padding:'0 24px' }}>
            <div style={{ textAlign:'center', marginBottom:64 }}>
              <SectionLabel>The Team</SectionLabel>
              <h2 style={{ fontSize:'clamp(2rem,4vw,2.8rem)', fontWeight:900, color:'#0d1340', marginTop:12 }}>
                The People Behind<br />the Polish
              </h2>
              <p style={{ fontSize:'1.05rem', color:'#6B7280', maxWidth:460, margin:'16px auto 0', lineHeight:1.75 }}>
                Every member of our leadership team was once on the tools. They know what great cleaning looks like — because they've done it themselves.
              </p>
            </div>

            <div className="ab-team-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
              {team.map(member => (
                <div key={member.name} className="ab-team-card">
                  <div style={{ height:200, background:`linear-gradient(135deg,${member.color}22,${member.color}44)`, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden' }}>
                    <div style={{ position:'absolute', top:-30, right:-30, width:120, height:120, borderRadius:'50%', border:`20px solid ${member.color}22`, pointerEvents:'none' }} />
                    <div style={{ width:90, height:90, borderRadius:'50%', background:`linear-gradient(135deg,${member.color},${member.color}bb)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem', fontWeight:900, color:'white', boxShadow:`0 12px 32px ${member.color}50` }}>
                      {member.initials}
                    </div>
                  </div>
                  <div style={{ padding:'24px 24px 28px' }}>
                    <h3 style={{ fontSize:'1.05rem', fontWeight:800, color:'#0d1340', marginBottom:4 }}>{member.name}</h3>
                    <p style={{ fontSize:'0.78rem', fontWeight:700, color:member.color, marginBottom:14, letterSpacing:'0.06em', textTransform:'uppercase' }}>{member.role}</p>
                    <p style={{ fontSize:'0.88rem', color:'#6B7280', lineHeight:1.72 }}>{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            8. TESTIMONIALS
        ══════════════════════════════════════ */}
        <section style={{ background:'white', padding:'80px 0', borderTop:'1.5px solid #eaecf5' }}>
          <div style={{ maxWidth:1400, margin:'0 auto', padding:'0 24px' }}>
            <div style={{ display:'flex', flexWrap:'wrap', gap:24, alignItems:'center', justifyContent:'space-between', marginBottom:48 }}>
              <div>
                <SectionLabel>What Clients Say</SectionLabel>
                <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.4rem)', fontWeight:900, color:'#0d1340', marginTop:8 }}>Canadians Love the Sparkle</h2>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                {[...Array(5)].map((_,i) => <Star key={i} size={20} color="#FBBF24" fill="#FBBF24" strokeWidth={0} />)}
                <span style={{ fontWeight:700, color:'#0d1340', fontSize:'1.1rem', marginLeft:8 }}>4.9</span>
                <span style={{ color:'#9CA3AF', fontSize:'0.88rem', marginLeft:4 }}>/ 800+ reviews</span>
              </div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:20 }}>
              {testimonials.map(t => (
                <div key={t.name} style={{ background:'#f8f9ff', borderRadius:22, padding:32, border:'1.5px solid #eaecf5' }}>
                  <div style={{ display:'flex', gap:2, marginBottom:16 }}>
                    {[...Array(5)].map((_,i) => <Star key={i} size={15} color="#FBBF24" fill="#FBBF24" strokeWidth={0} />)}
                  </div>
                  <p style={{ fontSize:'0.97rem', color:'#374151', lineHeight:1.8, fontStyle:'italic', marginBottom:24 }}>"{t.text}"</p>
                  <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                    <div style={{ width:44, height:44, borderRadius:'50%', background:`linear-gradient(135deg,${t.color},${t.color}99)`, display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:800, fontSize:'0.82rem', flexShrink:0 }}>{t.initials}</div>
                    <div>
                      <p style={{ fontWeight:700, color:'#0d1340', fontSize:'0.95rem' }}>{t.name}</p>
                      <div style={{ display:'flex', alignItems:'center', gap:4, marginTop:2 }}>
                        <MapPin size={11} color="#9CA3AF" strokeWidth={2} />
                        <span style={{ color:'#9CA3AF', fontSize:'0.8rem' }}>{t.loc}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}