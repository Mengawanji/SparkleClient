'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const BRAND = '#3B4FCC';
const BRAND_DARK = '#0d1340';

function StarRating() {
  return (
    <span className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FBBF24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

const services = [
  {
    title: 'Residential Cleaning',
    desc: 'Your home deserves a thorough, reliable clean every time. We treat every room like our own.',
    href: '/services/residential',
    color: '#EEF2FF',
  },
  {
    title: 'Commercial Cleaning',
    desc: 'A spotless workplace fuels productivity. We keep your business premises immaculate.',
    href: '/services/commercial',
    color: '#F0FDF4',
  },
  {
    title: 'Deep Cleaning',
    desc: 'Every corner, every crevice. Our deep clean reaches where regular cleaning never does.',
    href: '/services/deep-cleaning',
    color: '#FFF7ED',
  },
  {
    title: 'Move-In/Out Cleaning',
    desc: 'Start fresh or leave without a trace. We make transitions spotless and stress-free.',
    href: '/services/move-in-out',
    color: '#FDF4FF',
  },
];




    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
    {services.map((s) => (
        <Link key={s.href} href={s.href} className="service-card" style={{ display: 'block', background: 'white', borderRadius: '24px', padding: '36px 28px', textDecoration: 'none', border: '1px solid #f0f0f0' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0d1340', marginBottom: '10px' }}>{s.title}</h3>
        <p style={{ fontSize: '0.95rem', color: '#6B7280', lineHeight: 1.65 }}>{s.desc}</p>
        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', color: BRAND, fontWeight: 600, fontSize: '0.9rem' }}>
            Learn more
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </div>
        </Link>
    ))}
    </div>

          

const testimonials = [
  {
    name: 'Amara Osei',
    location: 'London, ON',
    text: "Sandy's team transformed my home in a single visit. I could not believe it was the same apartment. Booking was effortless and they showed up right on time.",
    avatar: 'AO',
  },
  {
    name: 'Luc Tremblay',
    location: 'Quebec City, QC',
    text: "Professional, thorough and genuinely caring. They noticed details I had overlooked for months. I have booked monthly cleanings ever since.",
    avatar: 'LT',
  },
  {
    name: 'Priya Sharma',
    location: 'Winnipeg, MB',
    text: "The move-out clean saved my damage deposit. My landlord was stunned. Worth every penny and then some.",
    avatar: 'PS',
  },
];






















const process = [
  { step: '01', title: 'Book Online', desc: 'Choose your service, date, and time in under 60 seconds.' },
  { step: '02', title: 'We Show Up', desc: 'Our vetted, trained team arrives on time with all supplies.' },
  { step: '03', title: 'Enjoy the Shine', desc: 'Walk into a spotless space and breathe easy. Every time.' },
];

export default function Testimonial() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setCount(1), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <main style={{ fontFamily: 'Poppins, sans-serif', background: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { from{background-position:200% center} to{background-position:-200% center} }
        .anim-fade-up { animation: fadeUp 0.7s ease forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.25s; opacity: 0; }
        .delay-3 { animation-delay: 0.4s; opacity: 0; }
        .delay-4 { animation-delay: 0.55s; opacity: 0; }
        .float { animation: float 4s ease-in-out infinite; }
        .service-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(59,79,204,0.12); }
        .service-card { transition: all 0.3s ease; }
        .shimmer-btn {
          background: linear-gradient(90deg, #3B4FCC, #6675e0, #3B4FCC);
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
      `}</style>

      {/* ── SERVICES ── */}
      <section style={{ padding: '100px 0', background: '#f8f9ff' }}>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: BRAND, letterSpacing: '0.15em', textTransform: 'uppercase' }}>✦ What We Offer</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#0d1340', marginTop: '12px' }}>Cleaning Solutions for Every Space</h2>
            <p style={{ fontSize: '1.1rem', color: '#6B7280', maxWidth: '500px', margin: '16px auto 0' }}>From cozy apartments to expansive offices — we have a tailored clean for every need.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {services.map((s) => (
              <Link key={s.href} href={s.href} className="service-card" style={{ display: 'block', background: 'white', borderRadius: '24px', padding: '36px 28px', textDecoration: 'none', border: '1px solid #f0f0f0' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0d1340', marginBottom: '10px' }}>{s.title}</h3>
                <p style={{ fontSize: '0.95rem', color: '#6B7280', lineHeight: 1.65 }}>{s.desc}</p>
                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', color: BRAND, fontWeight: 600, fontSize: '0.9rem' }}>
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '100px 0', background: 'white' }}>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: BRAND, letterSpacing: '0.15em', textTransform: 'uppercase' }}>✦ Simple Process</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#0d1340', marginTop: '12px', marginBottom: '48px' }}>Spotless in Three Simple Steps</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {process.map((p) => (
                  <div key={p.step} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <div style={{ flexShrink: 0, width: '52px', height: '52px', borderRadius: '14px', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: BRAND, fontSize: '0.85rem' }}>{p.step}</div>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0d1340', marginBottom: '6px' }}>{p.title}</h3>
                      <p style={{ fontSize: '0.95rem', color: '#6B7280', lineHeight: 1.65 }}>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/book" style={{ display: 'inline-flex', marginTop: '40px', alignItems: 'center', gap: '8px', background: BRAND, color: 'white', fontWeight: 700, borderRadius: '14px', padding: '14px 32px', fontSize: '1rem', textDecoration: 'none' }}>
                Get Started Now
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #EEF2FF, #e0e7ff)', borderRadius: '32px', padding: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10rem' }}>🧹</div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '100px 0', background: '#f8f9ff' }}>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: BRAND, letterSpacing: '0.15em', textTransform: 'uppercase' }}>✦ Real Stories</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#0d1340', marginTop: '12px' }}>Canadians Love the Sparkle</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {testimonials.map((t) => (
              <div key={t.name} style={{ background: 'white', borderRadius: '24px', padding: '36px', border: '1px solid #f0f0f0', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                <StarRating />
                <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.75, margin: '20px 0 24px', fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: BRAND, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.8rem' }}>{t.avatar}</div>
                  <div>
                    <p style={{ fontWeight: 700, color: '#0d1340', fontSize: '0.95rem' }}>{t.name}</p>
                    <p style={{ color: '#9CA3AF', fontSize: '0.82rem' }}>{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}