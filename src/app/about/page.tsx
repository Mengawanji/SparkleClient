'use client';
import Link from 'next/link';

const BRAND = '#3B4FCC';

const values = [
  { icon: '🛡️', title: 'Trust First', desc: 'Every cleaner is background-checked, fully insured, and trained to our strict standards before stepping into your home.' },
  { icon: '🌿', title: 'Eco-Conscious', desc: 'We use biodegradable, non-toxic cleaning products that are safe for children, pets, and the planet.' },
  { icon: '⏱️', title: 'Punctual Always', desc: 'Your time is precious. We show up when we say we will — no vague windows, no last-minute cancellations.' },
  { icon: '💎', title: 'Detail-Obsessed', desc: 'We notice what others miss. Baseboards, light switches, grout lines — nothing escapes our attention.' },
];

const team = [
  { name: 'Sandra Okafor', role: 'Founder & CEO', initials: 'SO', bio: 'With 15 years in professional cleaning, Sandra built Sparkle Touch on one conviction: every client deserves to come home to something beautiful.' },
  { name: 'Michael Fontaine', role: 'Operations Director', initials: 'MF', bio: 'Michael keeps our teams running like clockwork across four provinces, ensuring quality is never compromised by scale.' },
  { name: 'Aya Nakamura', role: 'Head of Training', initials: 'AN', bio: 'Aya developed our proprietary 40-point cleaning protocol that sets the Sparkle Touch standard apart from the industry.' },
];

const milestones = [
  { year: '2014', event: 'Sandy starts cleaning homes in London, ON with a mop, a bucket, and a dream.' },
  { year: '2017', event: 'Team grows to 10 cleaners. First commercial contracts signed.' },
  { year: '2020', event: 'Expanded to Quebec and Manitoba despite pandemic challenges.' },
  { year: '2022', event: '5,000th client booking celebrated. Nova Scotia launch.' },
  { year: '2024', event: 'Certified Eco-Friendly by Canada Green Business Alliance.' },
  { year: '2026', event: 'Today — still growing, still obsessed with your clean.' },
];

export default function AboutPage() {
  return (
    <main style={{ fontFamily: 'Poppins, sans-serif', background: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ background: 'linear-gradient(160deg, #0d1340 0%, #1a2466 100%)', padding: '120px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,79,204,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          <div style={{ maxWidth: '680px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>✦ Our Story</span>
            <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginTop: '16px', marginBottom: '24px' }}>
              Built on Elbow Grease<br />
              <span style={{ color: '#818cf8' }}>and Genuine Care</span>
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>
              Sandy's Sparkle Touch was born from a simple belief: a truly clean space changes how you feel. We started with one mop and an unshakeable commitment to quality. Over a decade later, that commitment is still our greatest asset.
            </p>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section style={{ padding: '100px 0', background: '#f8f9ff' }}>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div style={{ background: 'linear-gradient(135deg, #EEF2FF, #c7d0f8)', borderRadius: '32px', padding: '80px 60px', fontSize: '7rem', textAlign: 'center' }}>🌟</div>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: BRAND, letterSpacing: '0.15em', textTransform: 'uppercase' }}>✦ Our Mission</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#0d1340', marginTop: '12px', marginBottom: '24px' }}>We Don't Just Clean.<br />We Restore.</h2>
              <p style={{ fontSize: '1.05rem', color: '#4B5563', lineHeight: 1.8, marginBottom: '20px' }}>
                Our mission is to create living and working environments where people genuinely thrive. Cleanliness is not a luxury — it's foundational to health, focus, and happiness.
              </p>
              <p style={{ fontSize: '1.05rem', color: '#4B5563', lineHeight: 1.8 }}>
                Every member of our team shares this philosophy. We train extensively, hire selectively, and hold ourselves to a standard that most cleaning companies simply don't attempt.
              </p>
              <div style={{ display: 'flex', gap: '32px', marginTop: '40px' }}>
                {[['12+', 'Years in Business'], ['4 Provinces', 'Served Across Canada'], ['40-Point', 'Quality Checklist']].map(([v, l]) => (
                  <div key={l}>
                    <p style={{ fontSize: '1.6rem', fontWeight: 800, color: BRAND }}>{v}</p>
                    <p style={{ fontSize: '0.82rem', color: '#9CA3AF' }}>{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ padding: '100px 0', background: 'white' }}>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: BRAND, letterSpacing: '0.15em', textTransform: 'uppercase' }}>✦ What We Stand For</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#0d1340', marginTop: '12px' }}>The Values Behind Every Visit</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {values.map((v) => (
              <div key={v.title} style={{ background: '#f8f9ff', borderRadius: '24px', padding: '36px 28px', border: '1px solid #EEF2FF' }}>
                <div style={{ fontSize: '2.4rem', marginBottom: '16px' }}>{v.icon}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0d1340', marginBottom: '10px' }}>{v.title}</h3>
                <p style={{ fontSize: '0.95rem', color: '#6B7280', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section style={{ padding: '100px 0', background: '#f8f9ff' }}>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: BRAND, letterSpacing: '0.15em', textTransform: 'uppercase' }}>✦ Our Journey</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#0d1340', marginTop: '12px' }}>A Decade of Sparkle</h2>
          </div>
          <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '76px', top: 0, bottom: 0, width: '2px', background: '#EEF2FF' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {milestones.map((m, i) => (
                <div key={m.year} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, width: '64px', textAlign: 'right' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: BRAND }}>{m.year}</span>
                  </div>
                  <div style={{ flexShrink: 0, width: '24px', height: '24px', borderRadius: '50%', background: i === milestones.length - 1 ? BRAND : '#c7d0f8', border: '3px solid white', boxShadow: '0 0 0 3px #EEF2FF', marginTop: '2px', zIndex: 1 }} />
                  <div style={{ paddingBottom: '8px' }}>
                    <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.65 }}>{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ padding: '100px 0', background: 'white' }}>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: BRAND, letterSpacing: '0.15em', textTransform: 'uppercase' }}>✦ The Team</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#0d1340', marginTop: '12px' }}>The People Behind the Polish</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
            {team.map((t, i) => (
              <div key={t.name} style={{ background: '#f8f9ff', borderRadius: '24px', padding: '40px 32px', textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: `hsl(${220 + i * 40}, 60%, 50%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.2rem', margin: '0 auto 20px' }}>{t.initials}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0d1340' }}>{t.name}</h3>
                <p style={{ fontSize: '0.82rem', color: BRAND, fontWeight: 600, marginBottom: '16px' }}>{t.role}</p>
                <p style={{ fontSize: '0.92rem', color: '#6B7280', lineHeight: 1.7 }}>{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, #3B4FCC 0%, #1a2466 100%)', padding: '80px 0', textAlign: 'center' }}>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: 'white', marginBottom: '16px' }}>Become Part of Our Story</h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', marginBottom: '36px' }}>Let us earn a spot on your trusted service list. Book your first clean today.</p>
          <Link href="/book" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'white', color: BRAND, fontWeight: 800, borderRadius: '14px', padding: '16px 40px', fontSize: '1.1rem', textDecoration: 'none' }}>
            Book Your First Clean
          </Link>
        </div>
      </section>
    </main>
  );
}