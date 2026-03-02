'use client';
import Link from 'next/link';
import { useState } from 'react';
import {
  ChevronDown,
  Search,
  Calendar,
  MessageCircle,
  ArrowRight,
  HelpCircle,
  Clock,
  ShieldCheck,
  Leaf,
  CreditCard,
  RefreshCw,
  Star,
  Users,
  Radio,
} from 'lucide-react';

/* ─── types ─────────────────────────────────────────────── */
interface FAQItem {
  q: string;
  a: string;
}
interface Category {
  id: string;
  label: string;
  icon: React.ElementType;
  items: FAQItem[];
}

/* ─── data ───────────────────────────────────────────────── */
const categories: Category[] = [
  {
    id: 'general',
    label: 'General',
    icon: HelpCircle,
    items: [
      { q: 'What areas do you service?', a: 'We currently service the greater New York metropolitan area, including Manhattan, Brooklyn, Queens, the Bronx, Staten Island, and parts of New Jersey. Enter your zip code on the booking page to confirm availability in your neighbourhood.' },
      { q: 'Are your cleaners background-checked?', a: 'Absolutely. Every single member of our team undergoes a thorough criminal background check, identity verification, and reference review before their first day. Your safety and trust are non-negotiable for us.' },
      { q: 'Do I need to be home during the clean?', a: 'Not at all. Many of our clients provide a key or door code. If you prefer to be home, that is perfectly fine too. We just ask that pets are secured in a separate room so our team can work efficiently.' },
      { q: 'How long does a typical clean take?', a: 'A standard clean for a 2-bedroom apartment takes roughly 2–3 hours. Deep cleans and move-in/move-out cleans take longer — typically 4–6 hours depending on the size and condition of the property.' },
    ],
  },
  {
    id: 'booking',
    label: 'Booking',
    icon: Calendar,
    items: [
      { q: 'How do I book a clean?', a: 'Simply click "Book a Clean" from any page, fill in your address and preferred date, choose your cleaning type, and confirm. The whole process takes under 60 seconds. You will receive an email confirmation immediately.' },
      { q: 'Can I reschedule or cancel my booking?', a: 'Yes, free of charge up to 24 hours before your scheduled clean. Cancellations made less than 24 hours in advance may be subject to a small fee. You can manage all bookings from your account dashboard.' },
      { q: 'How far in advance should I book?', a: 'We recommend booking at least 48 hours ahead to guarantee your preferred time slot. That said, we do offer same-day cleans subject to availability — check the booking page for open slots.' },
      { q: 'Can I request the same cleaner every time?', a: 'Yes! Once you have had a clean you love, you can request that team member for all future visits. We will do our best to accommodate, though availability can occasionally vary.' },
    ],
  },
  {
    id: 'pricing',
    label: 'Pricing',
    icon: CreditCard,
    items: [
      { q: 'How is pricing calculated?', a: 'Pricing is based on the number of bedrooms and bathrooms, the type of clean (regular, deep, or move-in/out), and any add-ons you select. You will always see a full price breakdown before confirming — no hidden fees.' },
      { q: 'When do I pay?', a: 'Payment is taken after the clean is completed, not upfront. We accept all major credit and debit cards. First-time customers get 15% off their initial booking automatically applied at checkout.' },
      { q: 'Do you offer recurring discounts?', a: 'Yes. Clients who book weekly cleans save 20%, bi-weekly clients save 15%, and monthly clients save 10% compared to one-off rates. Discounts apply automatically when you select a recurring frequency.' },
      { q: 'Is there a minimum booking value?', a: 'Our minimum booking is a studio or 1-bedroom clean. There is no minimum number of sessions — you can book a one-off clean or a recurring plan, and switch between them at any time.' },
    ],
  },
  {
    id: 'eco',
    label: 'Eco & Safety',
    icon: Leaf,
    items: [
      { q: 'What cleaning products do you use?', a: 'We use exclusively plant-based, biodegradable cleaning agents that are free from bleach, ammonia, and synthetic fragrances. They are certified non-toxic and safe for children, pets, and people with allergies or sensitivities.' },
      { q: 'Can I request specific products?', a: 'Of course. If you have a preferred product or a specific allergy concern, let us know in the "Special Notes" field when booking and we will accommodate your request.' },
      { q: 'Are your operations carbon neutral?', a: 'Yes. Since 2024 we have offset 100% of our operational carbon footprint through verified reforestation projects. Our cleaning equipment is energy-efficient and we are working toward an all-electric vehicle fleet.' },
    ],
  },
  {
    id: 'guarantee',
    label: 'Guarantee',
    icon: ShieldCheck,
    items: [
      { q: 'What is your satisfaction guarantee?', a: 'If you are not 100% happy with your clean, contact us within 24 hours and we will send a team back to re-clean the areas you are unhappy with, completely free of charge. No arguments, no hassle.' },
      { q: 'What if something gets damaged?', a: 'All our cleaners are fully insured. In the rare event something is accidentally damaged, contact our support team and we will arrange repair or replacement. We have never left a client out of pocket.' },
      { q: 'Do you have customer reviews I can read?', a: 'Yes — you can browse verified reviews from real clients on our homepage and on our Google Business profile. We maintain a 4.9 / 5 average across over 1,200 reviews.' },
    ],
  },
  {
    id: 'recurring',
    label: 'Recurring Plans',
    icon: RefreshCw,
    items: [
      { q: 'How do recurring plans work?', a: 'Choose your preferred frequency (weekly, bi-weekly, or monthly) at checkout. We will automatically schedule and charge each session. You can pause, skip, or cancel anytime from your dashboard with no penalty.' },
      { q: 'Can I mix and match cleaning types?', a: 'Absolutely. For example, you might book a deep clean for your first visit and then switch to regular cleans for subsequent ones. Just update your preferences in the dashboard before your next scheduled visit.' },
    ],
  },
];

/* ─── Accordion item ────────────────────────────────────── */
function AccordionItem({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        border: `1.5px solid ${open ? '#3B4FCC' : '#e8ecfb'}`,
        borderRadius: 16,
        overflow: 'hidden',
        background: open ? '#fafbff' : '#fff',
        transition: 'border-color 0.25s, background 0.25s, box-shadow 0.25s',
        boxShadow: open ? '0 6px 28px rgba(59,79,204,0.1)' : '0 2px 10px rgba(59,79,204,0.04)',
        animationDelay: `${index * 0.06}s`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: '20px 24px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          fontFamily: 'Poppins, sans-serif',
        }}
        aria-expanded={open}
      >
        <span style={{
          fontSize: '0.97rem',
          fontWeight: 600,
          color: open ? '#3B4FCC' : '#0d1340',
          lineHeight: 1.45,
          transition: 'color 0.2s',
        }}>
          {item.q}
        </span>
        <span style={{
          flexShrink: 0,
          width: 32, height: 32,
          borderRadius: '50%',
          background: open ? '#3B4FCC' : '#EEF2FF',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.25s, transform 0.35s',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          <ChevronDown size={16} color={open ? '#fff' : '#3B4FCC'} strokeWidth={2.5} />
        </span>
      </button>

      {/* answer panel */}
      <div style={{
        maxHeight: open ? 400 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <p style={{
          padding: '0 24px 22px',
          fontSize: '0.93rem',
          color: '#6B7280',
          lineHeight: 1.85,
          fontFamily: 'Poppins, sans-serif',
          margin: 0,
        }}>
          {item.a}
        </p>
      </div>
    </div>
  );
}

/* ─── Main page ─────────────────────────────────────────── */
export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');

  const currentCategory = categories.find(c => c.id === activeCategory)!;

  const filteredItems = searchQuery.trim()
    ? categories.flatMap(c => c.items).filter(
        item =>
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentCategory.items;

  const isSearching = searchQuery.trim().length > 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');

        @keyframes faq-fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes faq-spin        { from { transform: translate(-50%,-50%) rotate(0deg);  } to { transform: translate(-50%,-50%) rotate(360deg);  } }
        @keyframes faq-spinReverse { from { transform: translate(-50%,-50%) rotate(0deg);  } to { transform: translate(-50%,-50%) rotate(-360deg); } }
        @keyframes faq-pulse { 0%,100% { transform: scale(1); opacity:.6; } 50% { transform: scale(1.15); opacity:1; } }
        @keyframes faq-shimmer { from { background-position: 200% center; } to { background-position: -200% center; } }

        .faq-fade { animation: faq-fadeUp 0.6s ease both; }
        .faq-d1 { animation-delay: 0.05s; opacity: 0; }
        .faq-d2 { animation-delay: 0.14s; opacity: 0; }
        .faq-d3 { animation-delay: 0.23s; opacity: 0; }
        .faq-d4 { animation-delay: 0.32s; opacity: 0; }
        .faq-d5 { animation-delay: 0.41s; opacity: 0; }

        .faq-cat-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 18px; border-radius: 12px;
          border: 1.5px solid #e8ecfb;
          background: #fff; color: #4B5563;
          font-family: 'Poppins', sans-serif;
          font-size: 0.88rem; font-weight: 600;
          cursor: pointer; white-space: nowrap;
          transition: all 0.2s;
        }
        .faq-cat-btn:hover { background: #EEF2FF; border-color: #c7d0f8; color: #3B4FCC; }
        .faq-cat-btn.active {
          background: #3B4FCC; border-color: #3B4FCC;
          color: #fff;
          box-shadow: 0 4px 16px rgba(59,79,204,0.28);
        }

        .faq-cta-btn {
          display: inline-flex; align-items: center; gap: 9px;
          background: linear-gradient(90deg, #3B4FCC, #5a6be0, #3B4FCC);
          background-size: 200% auto;
          animation: faq-shimmer 4s linear infinite;
          color: #fff; border: none; border-radius: 14px;
          padding: 14px 32px; font-size: 1rem; font-weight: 700;
          font-family: 'Poppins', sans-serif; text-decoration: none;
          cursor: pointer;
          box-shadow: 0 6px 24px rgba(59,79,204,0.35);
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .faq-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(59,79,204,0.45); }

        .faq-ghost-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #3B4FCC;
          border: 2px solid #c7d0f8; border-radius: 14px;
          padding: 12px 28px; font-size: 1rem; font-weight: 600;
          font-family: 'Poppins', sans-serif; text-decoration: none;
          transition: all 0.2s;
        }
        .faq-ghost-btn:hover { background: #EEF2FF; border-color: #3B4FCC; }

        .faq-search-wrap {
          display: flex; align-items: center; gap: 10px;
          background: #fff; border: 1.5px solid #e8ecfb;
          border-radius: 14px; padding: 8px 10px 8px 18px;
          box-shadow: 0 4px 20px rgba(59,79,204,0.07);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .faq-search-wrap:focus-within {
          border-color: #3B4FCC;
          box-shadow: 0 4px 24px rgba(59,79,204,0.18);
        }
        .faq-search-wrap input {
          flex: 1; border: none; outline: none;
          font-size: 0.95rem; color: #0d1340;
          font-family: 'Poppins', sans-serif;
          background: transparent; min-width: 0;
        }
        .faq-search-wrap input::placeholder { color: #9CA3AF; }
        .faq-search-btn {
          background: #3B4FCC; color: #fff; border: none;
          border-radius: 10px; padding: 9px 18px;
          font-size: 0.88rem; font-weight: 600; cursor: pointer;
          font-family: 'Poppins', sans-serif;
          display: flex; align-items: center; gap: 6px;
          transition: background 0.2s, transform 0.15s; flex-shrink: 0;
        }
        .faq-search-btn:hover { background: #2f3faa; transform: scale(1.03); }

        .faq-stat-card {
          background: #fff; border: 1.5px solid #e8ecfb;
          border-radius: 20px; padding: 28px 24px; text-align: center;
          box-shadow: 0 4px 20px rgba(59,79,204,0.06);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .faq-stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(59,79,204,0.14);
        }

        @media (max-width: 768px) {
          .faq-hero-inner { flex-direction: column !important; }
          .faq-layout    { flex-direction: column !important; }
          .faq-sidebar   { width: 100% !important; }
          .faq-cats-row  { flex-wrap: wrap !important; }
        }
      `}</style>

      <section style={{
        fontFamily: 'Poppins, sans-serif',
        background: 'linear-gradient(160deg, #EEF2FF 0%, #f8f9ff 45%, #e8edff 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* ── Decorative background rings (same as 404) ── */}
        <div style={{ position:'absolute', top:'-120px', right:'-120px', width:500, height:500, borderRadius:'50%', border:'70px solid rgba(59,79,204,0.05)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-80px', left:'-80px', width:380, height:380, borderRadius:'50%', border:'55px solid rgba(59,79,204,0.04)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'40%', left:'-60px', width:240, height:240, borderRadius:'50%', border:'30px solid rgba(129,140,248,0.06)', pointerEvents:'none' }} />

        {/* Spinning orbit rings */}
        <div style={{ position:'absolute', width:600, height:600, borderRadius:'50%', border:'1.5px dashed rgba(59,79,204,0.09)', animation:'faq-spin 36s linear infinite', top:'20%', right:'-200px', pointerEvents:'none', transform:'translate(0,0)' }} />
        <div style={{ position:'absolute', width:400, height:400, borderRadius:'50%', border:'1px dashed rgba(59,79,204,0.07)', animation:'faq-spinReverse 28s linear infinite', bottom:'10%', left:'-120px', pointerEvents:'none' }} />

        {/* Floating particles */}
        {[
          { w:10, h:10, top:'8%',  left:'6%',  bg:'#3B4FCC', op:0.12, anim:'faq-pulse 2.8s ease-in-out infinite' },
          { w:6,  h:6,  top:'20%', left:'91%', bg:'#818cf8', op:0.18, anim:'faq-pulse 3.2s ease-in-out 0.5s infinite' },
          { w:8,  h:8,  top:'75%', left:'5%',  bg:'#c7d0f8', op:0.22, anim:'faq-pulse 2.5s ease-in-out 1s infinite' },
          { w:12, h:12, top:'85%', left:'88%', bg:'#3B4FCC', op:0.10, anim:'faq-pulse 3.6s ease-in-out 0.3s infinite' },
        ].map((p, i) => (
          <div key={i} style={{ position:'absolute', borderRadius:'50%', pointerEvents:'none', width:p.w, height:p.h, top:p.top, left:p.left, background:p.bg, opacity:p.op, animation:p.anim }} />
        ))}

        {/* ════════════════════════════════════════
            HERO BANNER
        ════════════════════════════════════════ */}
        <div style={{ position:'relative', zIndex:2, padding:'72px 40px 56px', maxWidth:1100, margin:'0 auto' }}>
          <div className="faq-fade faq-d1" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(59,79,204,0.08)', border:'1.5px solid #c7d0f8', borderRadius:999, padding:'6px 18px', marginBottom:20 }}>
            <Radio size={12} color="#3B4FCC" strokeWidth={2.5} style={{ animation:'faq-pulse 2s ease-in-out infinite' }} />
            <span style={{ fontSize:'0.72rem', fontWeight:700, color:'#3B4FCC', letterSpacing:'0.16em', textTransform:'uppercase' }}>Help Centre</span>
          </div>

          <div className="faq-hero-inner" style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:32, flexWrap:'wrap' }}>
            <div style={{ maxWidth:560 }}>
              <h1 className="faq-fade faq-d2" style={{ fontSize:'clamp(2rem,4.5vw,3.2rem)', fontWeight:900, color:'#0d1340', lineHeight:1.18, margin:'0 0 16px' }}>
                Got Questions?<br />
                <span style={{ color:'#3B4FCC' }}>We've Got Answers.</span>
              </h1>
              <p className="faq-fade faq-d3" style={{ fontSize:'1.05rem', color:'#6B7280', lineHeight:1.8, margin:0, maxWidth:460 }}>
                Everything you need to know about booking, pricing, our eco-friendly products, and our satisfaction guarantee — all in one place.
              </p>
            </div>

            {/* Stats cluster */}
            <div className="faq-fade faq-d4" style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
              {[
                { icon: Star,    value:'4.9/5',  label:'Avg Rating',    filled: true  },
                { icon: Clock,   value:'60s',    label:'Avg Reply Time', filled: false },
                { icon: Users,   value:'1,200+', label:'Happy Clients',  filled: false },
              ].map(({ icon: Icon, value, label, filled }) => (
                <div key={label} className="faq-stat-card" style={{ minWidth:110 }}>
                  <div style={{ width:40, height:40, borderRadius:10, background:'#EEF2FF', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 10px' }}>
                    <Icon size={20} color="#3B4FCC" strokeWidth={1.8} fill={filled ? '#3B4FCC' : 'none'} />
                  </div>
                  <div style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:'1.25rem', color:'#0d1340' }}>{value}</div>
                  <div style={{ fontSize:'0.78rem', color:'#9CA3AF', marginTop:3 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div className="faq-fade faq-d5" style={{ marginTop:36, maxWidth:560 }}>
            <div className="faq-search-wrap">
              <Search size={16} color="#9CA3AF" style={{ flexShrink:0 }} />
              <input
                type="text"
                placeholder="Search questions — e.g. 'cancel booking', 'eco products'…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <button className="faq-search-btn">
                <Search size={14} /> Search
              </button>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════
            CATEGORY TABS + ACCORDION
        ════════════════════════════════════════ */}
        <div style={{ position:'relative', zIndex:2, maxWidth:1100, margin:'0 auto', padding:'0 40px 80px' }}>

          {/* Category pills */}
          {!isSearching && (
            <div className="faq-cats-row" style={{ display:'flex', gap:10, marginBottom:36, overflowX:'auto', paddingBottom:4 }}>
              {categories.map(cat => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    className={`faq-cat-btn${activeCategory === cat.id ? ' active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    <Icon size={15} strokeWidth={2} />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          )}

          <div className="faq-layout" style={{ display:'flex', gap:32, alignItems:'flex-start' }}>

            {/* ── Accordion column ── */}
            <div style={{ flex:1, minWidth:0 }}>

              {/* Section heading */}
              {!isSearching && (
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
                  <div style={{ width:40, height:40, borderRadius:10, background:'#EEF2FF', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    {(() => { const Icon = currentCategory.icon; return <Icon size={20} color="#3B4FCC" strokeWidth={1.8} />; })()}
                  </div>
                  <div>
                    <div style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:'1.05rem', color:'#0d1340' }}>{currentCategory.label}</div>
                    <div style={{ fontSize:'0.82rem', color:'#9CA3AF' }}>{currentCategory.items.length} questions</div>
                  </div>
                </div>
              )}

              {isSearching && (
                <div style={{ marginBottom:24 }}>
                  <div style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:'1rem', color:'#0d1340' }}>
                    {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''} for "{searchQuery}"
                  </div>
                </div>
              )}

              {filteredItems.length === 0 ? (
                <div style={{ textAlign:'center', padding:'60px 20px', background:'#fff', borderRadius:20, border:'1.5px solid #e8ecfb' }}>
                  <HelpCircle size={40} color="#c7d0f8" strokeWidth={1.5} style={{ marginBottom:16 }} />
                  <div style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:'1.1rem', color:'#0d1340', marginBottom:8 }}>No results found</div>
                  <div style={{ fontSize:'0.9rem', color:'#9CA3AF' }}>Try a different search term or browse the categories above.</div>
                </div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  {filteredItems.map((item, i) => (
                    <AccordionItem key={i} item={item} index={i} />
                  ))}
                </div>
              )}
            </div>

            {/* ── Sidebar ── */}
            <div className="faq-sidebar" style={{ width:280, flexShrink:0 }}>

              {/* Still stuck card */}
              <div style={{ background:'linear-gradient(135deg,#3B4FCC 0%,#5a6be0 100%)', borderRadius:20, padding:'28px 24px', color:'#fff', marginBottom:20, boxShadow:'0 8px 32px rgba(59,79,204,0.3)' }}>
                <MessageCircle size={28} strokeWidth={1.8} style={{ marginBottom:14, opacity:0.9 }} />
                <div style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:'1.1rem', marginBottom:8 }}>Still need help?</div>
                <p style={{ fontSize:'0.88rem', lineHeight:1.7, opacity:0.82, margin:'0 0 20px' }}>
                  Our friendly support team typically replies within 60 seconds during business hours.
                </p>
                <Link href="/contact" style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.18)', borderRadius:12, padding:'11px 16px', color:'#fff', textDecoration:'none', fontWeight:600, fontSize:'0.88rem', transition:'background 0.2s', backdropFilter:'blur(4px)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.28)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.18)')}
                >
                  <MessageCircle size={14} /> Contact Support <ArrowRight size={13} style={{ marginLeft:'auto' }} />
                </Link>
              </div>

              {/* Category index */}
              <div style={{ background:'#fff', border:'1.5px solid #e8ecfb', borderRadius:20, padding:'22px 20px', boxShadow:'0 4px 16px rgba(59,79,204,0.06)' }}>
                <div style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:'0.92rem', color:'#0d1340', marginBottom:16 }}>Browse Topics</div>
                {categories.map(cat => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id && !isSearching;
                  return (
                    <button key={cat.id} onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); }}
                      style={{ width:'100%', display:'flex', alignItems:'center', gap:10, padding:'10px 12px', borderRadius:10, border:'none', background: isActive ? '#EEF2FF' : 'transparent', color: isActive ? '#3B4FCC' : '#4B5563', fontSize:'0.88rem', fontWeight: isActive ? 700 : 500, cursor:'pointer', textAlign:'left', fontFamily:'Poppins,sans-serif', marginBottom:4, transition:'all 0.18s' }}
                    >
                      <Icon size={14} strokeWidth={2} />
                      {cat.label}
                      <span style={{ marginLeft:'auto', fontSize:'0.78rem', background: isActive?'#3B4FCC':'#f3f4f6', color: isActive?'#fff':'#9CA3AF', borderRadius:20, padding:'1px 8px', fontWeight:600 }}>{cat.items.length}</span>
                    </button>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}