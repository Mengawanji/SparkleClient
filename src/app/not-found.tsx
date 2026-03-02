'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  Home,
  Calendar,
  Info,
  Mail,
  HelpCircle,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';

function Particle({ style }: { style: React.CSSProperties }) {
  return <div style={{ position: 'absolute', borderRadius: '50%', pointerEvents: 'none', ...style }} />;
}

export default function NotFoundPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handler = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const offsetX = mounted ? (mousePos.x / window.innerWidth - 0.5) * 18 : 0;
  const offsetY = mounted ? (mousePos.y / window.innerHeight - 0.5) * 12 : 0;

  const quickLinks = [
    { label: 'About Us', href: '/about',   icon: Info },
    { label: 'Contact',  href: '/contact', icon: Mail },
    { label: 'FAQ',      href: '/faq',     icon: HelpCircle },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');

        @keyframes nf-fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes nf-spin        { from { transform: translate(-50%,-50%) rotate(0deg);   } to { transform: translate(-50%,-50%) rotate(360deg);   } }
        @keyframes nf-spinReverse { from { transform: translate(-50%,-50%) rotate(0deg);   } to { transform: translate(-50%,-50%) rotate(-360deg);  } }
        @keyframes nf-pulse { 0%,100% { transform: scale(1);    opacity: 0.6; } 50% { transform: scale(1.15); opacity: 1; } }
        @keyframes nf-shimmer { from { background-position: 200% center; } to { background-position: -200% center; } }

        .nf-fade-up { animation: nf-fadeUp 0.65s ease both; }
        .nf-d1 { animation-delay: 0.05s; opacity: 0; }
        .nf-d2 { animation-delay: 0.15s; opacity: 0; }
        .nf-d3 { animation-delay: 0.28s; opacity: 0; }
        .nf-d4 { animation-delay: 0.40s; opacity: 0; }
        .nf-d5 { animation-delay: 0.52s; opacity: 0; }
        .nf-d6 { animation-delay: 0.64s; opacity: 0; }

        .nf-home-btn {
          display: inline-flex; align-items: center; gap: 9px;
          background: linear-gradient(90deg, #3B4FCC, #5a6be0, #3B4FCC);
          background-size: 200% auto;
          animation: nf-shimmer 4s linear infinite;
          color: white; border: none; border-radius: 14px;
          padding: 14px 32px; font-size: 1rem; font-weight: 700;
          font-family: 'Poppins', sans-serif; text-decoration: none; cursor: pointer;
          box-shadow: 0 6px 24px rgba(59,79,204,0.35);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .nf-home-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(59,79,204,0.45); }

        .nf-ghost-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #3B4FCC;
          border: 2px solid #c7d0f8; border-radius: 14px;
          padding: 12px 28px; font-size: 1rem; font-weight: 600;
          font-family: 'Poppins', sans-serif; text-decoration: none;
          transition: all 0.2s;
        }
        .nf-ghost-btn:hover { background: #EEF2FF; border-color: #3B4FCC; }

        .nf-quick-link {
          display: flex; align-items: center; gap: 10px;
          background: white; border: 1.5px solid #eaecf5; border-radius: 14px;
          padding: 14px 18px; text-decoration: none; color: #374151;
          font-weight: 600; font-size: 0.92rem;
          transition: all 0.22s ease;
        }
        .nf-quick-link:hover {
          background: #EEF2FF; border-color: #3B4FCC;
          color: #3B4FCC; transform: translateX(4px);
        }

        @media (max-width: 640px) {
          .nf-num-404    { font-size: 28vw !important; }
          .nf-quick-grid { grid-template-columns: 1fr 1fr !important; }
          .nf-btn-row    { flex-direction: column !important; align-items: stretch !important; }
          .nf-btn-row a  { text-align: center; justify-content: center; }
        }
      `}</style>

      {/* ── Scoped wrapper — no resets, no full-page overrides ── */}
      <section style={{
        fontFamily: 'Poppins, sans-serif',
        background: 'linear-gradient(160deg, #EEF2FF 0%, #f8f9ff 45%, #e8edff 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Decorative background rings */}
        {[
          { s: 500, top: '-120px', right: '-120px', bw: 70 },
          { s: 380, bottom: '-80px', left: '-80px', bw: 55 },
          { s: 240, top: '40%',  left: '-60px',  bw: 30 },
        ].map((r, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: r.s, height: r.s,
            borderRadius: '50%',
            border: `${r.bw}px solid rgba(59,79,204,0.05)`,
            top: r.top, bottom: (r as any).bottom,
            left: (r as any).left, right: (r as any).right,
            pointerEvents: 'none',
          }} />
        ))}

        {/* Floating particles */}
        {[
          { w:10, h:10, top:'12%', left:'8%',  bg:'#3B4FCC', op:0.12, anim:'nf-pulse 2.8s ease-in-out infinite' },
          { w:6,  h:6,  top:'25%', left:'88%', bg:'#818cf8', op:0.18, anim:'nf-pulse 3.2s ease-in-out infinite 0.5s' },
          { w:8,  h:8,  top:'72%', left:'6%',  bg:'#c7d0f8', op:0.22, anim:'nf-pulse 2.5s ease-in-out infinite 1s' },
          { w:12, h:12, top:'80%', left:'90%', bg:'#3B4FCC', op:0.10, anim:'nf-pulse 3.6s ease-in-out infinite 0.3s' },
          { w:7,  h:7,  top:'55%', left:'92%', bg:'#818cf8', op:0.15, anim:'nf-pulse 2.2s ease-in-out infinite 0.8s' },
        ].map((p, i) => (
          <Particle key={i} style={{ width:p.w, height:p.h, top:p.top, left:p.left, background:p.bg, opacity:p.op, animation:p.anim }} />
        ))}

        {/* Spinning orbit rings */}
        <div style={{
          position:'absolute', width:420, height:420, borderRadius:'50%',
          border:'1.5px dashed rgba(59,79,204,0.15)',
          animation:'nf-spin 28s linear infinite',
          top:'50%', left:'50%',
          transform:'translate(-50%,-50%)',
          pointerEvents:'none',
        }}>
          <div style={{ position:'absolute', top:'-5px', left:'50%', width:10, height:10, borderRadius:'50%', background:'#3B4FCC', opacity:0.35, transform:'translateX(-50%)' }} />
        </div>
        <div style={{
          position:'absolute', width:600, height:600, borderRadius:'50%',
          border:'1px dashed rgba(59,79,204,0.07)',
          animation:'nf-spinReverse 40s linear infinite',
          top:'50%', left:'50%',
          transform:'translate(-50%,-50%)',
          pointerEvents:'none',
        }} />

        {/* ── Main content ── */}
        <div style={{ position:'relative', zIndex:1, maxWidth:680, width:'100%', textAlign:'center' }}>

          {/* Giant 404 */}
          <div
            className="nf-num-404"
            style={{
              fontSize: 'clamp(9rem, 22vw, 18rem)',
              fontWeight: 900,
              lineHeight: 0.85,
              background: 'linear-gradient(135deg, #c7d0f8 0%, #EEF2FF 40%, #c7d0f8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              userSelect: 'none',
              letterSpacing: '-0.04em',
              marginBottom: '8px',
              transform: `translate(${offsetX}px, ${offsetY}px)`,
              transition: 'transform 0.15s ease-out',
              filter: 'drop-shadow(0 8px 40px #4d42e6)',
            }}
          >
            404
          </div>

          {/* Eyebrow */}
          <div className="nf-fade-up nf-d1" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(59,79,204,0.08)', border:'1.5px solid #c7d0f8', borderRadius:999, padding:'6px 18px', marginBottom:18, marginTop:24 }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'#3B4FCC', display:'inline-block', animation:'nf-pulse 2s ease-in-out infinite' }} />
            <span style={{ fontSize:'0.72rem', fontWeight:700, color:'#3B4FCC', letterSpacing:'0.16em', textTransform:'uppercase' }}>Page Not Found</span>
          </div>


          {/* Sub-copy */}
          <p className="nf-fade-up nf-d3" style={{ fontSize:'1.05rem', color:'#6B7280', lineHeight:1.8, maxWidth:480, margin:'0 auto 36px' }}>
            Oops! Page Not Found. The page you're looking for doesn’t exist or may have been moved. Let’s get you back home.
          </p>

          {/* CTA Buttons */}
          <div className="nf-fade-up nf-d4 nf-btn-row" style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', marginBottom:56 }}>
            <Link href="/" className="nf-home-btn">
              <Home size={16} strokeWidth={2.5} />
              Back to Home
            </Link>
            <Link href="/book" className="nf-ghost-btn">
              <Calendar size={15} strokeWidth={2.2} />
              Book a Clean
            </Link>
          </div>

          {/* Divider */}
          <div className="nf-fade-up nf-d5" style={{ display:'flex', alignItems:'center', gap:16, marginBottom:32 }}>
            <div style={{ flex:1, height:1, background:'linear-gradient(to right, transparent, #dde2fb)' }} />
            <span style={{ fontSize:'0.78rem', color:'#9CA3AF', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', flexShrink:0 }}>Or explore these pages</span>
            <div style={{ flex:1, height:1, background:'linear-gradient(to left, transparent, #dde2fb)' }} />
          </div>

          {/* Quick links */}
          <div className="nf-fade-up nf-d6 nf-quick-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:48 }}>
            {quickLinks.map(({ label, href, icon: Icon }) => (
              <Link key={href} href={href} className="nf-quick-link">
                <Icon size={17} strokeWidth={2} style={{ flexShrink:0, color:'#3B4FCC' }} />
                {label}
                <ArrowRight size={13} strokeWidth={2.5} style={{ marginLeft:'auto', flexShrink:0, opacity:0.4 }} />
              </Link>
            ))}
          </div>

          {/* Help strip */}
          <div className="nf-fade-up nf-d6" style={{
            background:'white', borderRadius:20, border:'1.5px solid #eaecf5',
            padding:'20px 28px', display:'flex', alignItems:'center', gap:14,
            justifyContent:'center', flexWrap:'wrap',
            boxShadow:'0 4px 20px rgba(59,79,204,0.06)',
          }}>
            <MessageCircle size={20} strokeWidth={1.8} color="#3B4FCC" style={{ flexShrink:0 }} />
            <p style={{ fontSize:'0.9rem', color:'#6B7280', margin:0 }}>
              Still lost? Our team is here to help —
            </p>
            <Link href="/contact" style={{ fontSize:'0.9rem', fontWeight:700, color:'#3B4FCC', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:5 }}>
              Contact Support
              <ArrowRight size={13} strokeWidth={2.5} />
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}