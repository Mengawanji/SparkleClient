'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inp = (name: string) => ({
    width: '100%',
    borderRadius: '14px',
    border: `2px solid ${focused === name ? '#3B4FCC' : '#e8eaf0'}`,
    padding: '14px 18px',
    fontSize: '1rem',
    fontFamily: 'Poppins, sans-serif',
    outline: 'none',
    background: focused === name ? '#f8f9ff' : '#fafbff',
    color: '#1a1f40',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box' as const,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.06); }
        }
        @keyframes shimmer {
          from { background-position: 200% center; }
          to   { background-position: -200% center; }
        }

        .contact-fade { animation: fadeUp 0.6s ease both; }
        .d1 { animation-delay: 0.05s; }
        .d2 { animation-delay: 0.15s; }
        .d3 { animation-delay: 0.25s; }
        .d4 { animation-delay: 0.38s; }

        .info-card {
          background: #ffffff;
          border-radius: 22px;
          border: 1.5px solid #eaecf5;
          padding: 28px 28px 24px;
          display: flex;
          align-items: flex-start;
          gap: 18px;
          flex: 1;
          min-width: 240px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .info-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #3B4FCC, #818cf8);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .info-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 48px rgba(59,79,204,0.11);
        }
        .info-card:hover::before { opacity: 1; }

        .icon-wrap {
          flex-shrink: 0;
          width: 58px; height: 58px;
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
        }

        .submit-btn {
          background: linear-gradient(90deg, #3B4FCC, #5a6be0, #3B4FCC);
          background-size: 200% auto;
          animation: shimmer 4s linear infinite;
          color: white;
          border: none;
          border-radius: 14px;
          padding: 15px 36px;
          font-size: 1rem;
          font-weight: 700;
          font-family: 'Poppins', sans-serif;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          box-shadow: 0 6px 20px rgba(59,79,204,0.35);
          letter-spacing: 0.03em;
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(59,79,204,0.45);
        }
        .submit-btn:active { transform: scale(0.97); }

        .floating-emoji {
          position: absolute;
          font-size: 3.5rem;
          opacity: 0.08;
          pointer-events: none;
          user-select: none;
        }

        @media (max-width: 900px) {
          .info-cards-row { flex-direction: column !important; }
          .form-image-grid { grid-template-columns: 1fr !important; }
          .image-panel { display: none !important; }
          .form-section-inner { border-radius: 24px !important; }
          .hero-h1 { font-size: 2.6rem !important; }
        }
        @media (max-width: 600px) {
          .name-email-row { grid-template-columns: 1fr !important; }
          .hero-h1 { font-size: 2rem !important; }
        }
      `}</style>

      <main style={{ fontFamily: 'Poppins, sans-serif', background: 'linear-gradient(175deg, #f0f2ff 0%, #f8f9ff 50%, #eef0fb 100%)', minHeight: '100vh' }}>

        {/* ═══════════════════════════════════════════════
            HERO HEADER — Background Image
            👉 Replace YOUR_IMAGE_URL_HERE with your image
        ═══════════════════════════════════════════════ */}
        <section style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '520px',
          display: 'flex',
          alignItems: 'center',
          padding: '100px 0 90px',
        }}>
          {/* ── Background image — swap URL when ready ── */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('YOUR_IMAGE_URL_HERE')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            zIndex: 0,
            /* Fallback colour shown until image loads */
            backgroundColor: '#0d1340',
          }} />

          {/* ── Dark gradient overlay so text stays readable ── */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(110deg, rgba(13,19,64,0.88) 0%, rgba(30,42,128,0.72) 55%, rgba(13,19,64,0.60) 100%)',
            zIndex: 1,
          }} />

          {/* ── Subtle vignette around edges ── */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }} />

          {/* ── Floating accent dots (sit above overlay) ── */}
          {[[12,18],[85,45],[25,70],[70,20],[50,80]].map(([left, top], i) => (
            <div key={i} style={{
              position: 'absolute',
              width: '7px', height: '7px',
              borderRadius: '50%',
              background: '#818cf8',
              opacity: 0.3,
              left: `${left}%`, top: `${top}%`,
              animation: `pulse ${2.5 + i * 0.4}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              zIndex: 3,
              pointerEvents: 'none',
            }} />
          ))}

          {/* ── Hero text content ── */}
          <div style={{ position: 'relative', zIndex: 4, maxWidth: '1400px', margin: '0 auto', padding: '0 24px', textAlign: 'center', width: '100%' }}>

            <div className="contact-fade d1" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.20)',
              backdropFilter: 'blur(6px)',
              borderRadius: '999px', padding: '7px 20px', marginBottom: '24px',
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#818cf8', display: 'inline-block' }} />
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.80)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Get In Touch</span>
            </div>

            <h1 className="contact-fade d2 hero-h1" style={{
              fontSize: '3.4rem', fontWeight: 900,
              color: 'white', lineHeight: 1.1, marginBottom: '20px',
              textShadow: '0 2px 24px rgba(0,0,0,0.35)',
            }}>
              We'd Love to<br />
              <span style={{ background: 'linear-gradient(90deg, #a5b4fc, #c7d0f8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Hear From You
              </span>
            </h1>

            <p className="contact-fade d3" style={{
              fontSize: '1.1rem', color: 'rgba(255,255,255,0.75)',
              maxWidth: '480px', margin: '0 auto 32px', lineHeight: 1.8,
              textShadow: '0 1px 8px rgba(0,0,0,0.3)',
            }}>
              Questions, quotes, or feedback — our team is ready to respond within 2 business hours.
            </p>

            {/* Breadcrumb / page path */}
            <div className="contact-fade d3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)' }}>
              <a href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</a>
              <span>›</span>
              <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>Contact Us</span>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            INFO CARDS  (overlapping the hero bottom edge)
        ═══════════════════════════════════════════════ */}
        <section style={{ maxWidth: '1400px', margin: '-40px auto 0', padding: '0 24px', position: 'relative', zIndex: 10 }}>
          <div className="contact-fade d4 info-cards-row" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>

            {/* Address */}
            <div className="info-card">
              <div className="icon-wrap" style={{ background: 'linear-gradient(135deg, #3B4FCC, #5a6be0)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              {/* Decorative glove emoji */}
              <span className="floating-emoji" style={{ right: '-8px', top: '4px', fontSize: '3.2rem', opacity: 0.07 }}>🧤</span>
              <div>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#3B4FCC', textTransform: 'uppercase', letterSpacing: '0.13em', marginBottom: '6px' }}>Our Address</p>
                <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0d1340', marginBottom: '4px' }}>Head Office</p>
                <p style={{ fontSize: '0.9rem', color: '#6B7280', lineHeight: 1.6 }}>London, Ontario<br />Canada, N6A 1A1</p>
              </div>
            </div>

            {/* Phone / Email */}
            <div className="info-card">
              <div className="icon-wrap" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.82 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17z" />
                </svg>
              </div>
              <span className="floating-emoji" style={{ right: '-8px', top: '4px', fontSize: '3.2rem', opacity: 0.07 }}>🫧</span>
              <div>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.13em', marginBottom: '6px' }}>Contact Number</p>
                <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0d1340', marginBottom: '4px' }}>1-800-SPARKLE</p>
                <p style={{ fontSize: '0.9rem', color: '#6B7280', lineHeight: 1.6 }}>
                  hello@sandyssparkletouch.ca<br />
                  <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>Mon–Sat · Replies in 2 hrs</span>
                </p>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="info-card">
              <div className="icon-wrap" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <span className="floating-emoji" style={{ right: '-8px', top: '4px', fontSize: '3.2rem', opacity: 0.07 }}>⏰</span>
              <div>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.13em', marginBottom: '6px' }}>Opening Hours</p>
                <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0d1340', marginBottom: '4px' }}>Mon – Sat: 8:00 – 20:00</p>
                <p style={{ fontSize: '0.9rem', color: '#6B7280', lineHeight: 1.6 }}>
                  Sunday: Closed<br />
                  <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>EST · All provinces</span>
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            FORM + IMAGE SPLIT PANEL
        ═══════════════════════════════════════════════ */}
        <section style={{ maxWidth: '1400px', margin: '40px auto 80px', padding: '0 24px' }}>
          <div className="form-image-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 32px 80px rgba(59,79,204,0.12)', border: '1.5px solid #e8eaf0' }}>

            {/* ── FORM SIDE ── */}
            <div className="form-section-inner" style={{ background: 'white', padding: '56px 52px', position: 'relative', overflow: 'hidden', borderRadius: '0' }}>
              {/* subtle background pattern */}
              <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,79,204,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

              {!sent ? (
                <>
                  <div style={{ marginBottom: '36px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3B4FCC', letterSpacing: '0.15em', textTransform: 'uppercase' }}>✦ Send a Message</span>
                    <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: '#0d1340', marginTop: '8px', lineHeight: 1.2 }}>
                      Get In Touch
                    </h2>
                    <p style={{ fontSize: '0.95rem', color: '#6B7280', marginTop: '8px', lineHeight: 1.65 }}>
                      Fill out the form and we'll be back to you faster than you can say "spotless."
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                    {/* Name + Email row */}
                    <div className="name-email-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '7px' }}>Your Name <span style={{ color: '#EF4444' }}>*</span></label>
                        <input
                          required
                          placeholder="e.g. Sandra Okafor"
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          onFocus={() => setFocused('name')}
                          onBlur={() => setFocused(null)}
                          style={inp('name')}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '7px' }}>Email Address <span style={{ color: '#EF4444' }}>*</span></label>
                        <input
                          required
                          type="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          onFocus={() => setFocused('email')}
                          onBlur={() => setFocused(null)}
                          style={inp('email')}
                        />
                      </div>
                    </div>

                    {/* Phone + Service row */}
                    <div className="name-email-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '7px' }}>Phone Number</label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.9rem', color: '#9CA3AF' }}>🇨🇦</span>
                          <input
                            type="tel"
                            placeholder="(555) 000-0000"
                            value={form.phone}
                            onChange={e => setForm({ ...form, phone: e.target.value })}
                            onFocus={() => setFocused('phone')}
                            onBlur={() => setFocused(null)}
                            style={{ ...inp('phone'), paddingLeft: '44px' }}
                          />
                        </div>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '7px' }}>Service Required</label>
                        <div style={{ position: 'relative' }}>
                          <select
                            value={form.service}
                            onChange={e => setForm({ ...form, service: e.target.value })}
                            onFocus={() => setFocused('service')}
                            onBlur={() => setFocused(null)}
                            style={{ ...inp('service'), appearance: 'none', paddingRight: '40px', cursor: 'pointer' }}
                          >
                            <option value="">Select a service…</option>
                            <option>Residential Cleaning</option>
                            <option>Commercial Cleaning</option>
                            <option>Deep Cleaning</option>
                            <option>Move-In / Out Cleaning</option>
                            <option>General Enquiry</option>
                          </select>
                          <span style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#9CA3AF' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '7px' }}>Your Message <span style={{ color: '#EF4444' }}>*</span></label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Tell us how we can help — cleaning schedule, specific needs, access details…"
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused(null)}
                        style={{ ...inp('message'), resize: 'vertical', lineHeight: 1.65 }}
                      />
                    </div>

                    {/* Submit */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginTop: '6px' }}>
                      <button type="submit" className="submit-btn">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                        Submit Message
                      </button>
                      <p style={{ fontSize: '0.78rem', color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        Your data is safe with us
                      </p>
                    </div>
                  </form>
                </>
              ) : (
                /* ── SUCCESS STATE ── */
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '480px', textAlign: 'center' }}>
                  <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'linear-gradient(135deg, #10B981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '28px', boxShadow: '0 16px 40px rgba(16,185,129,0.3)', animation: 'pulse 2s ease-in-out infinite' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                  </div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0d1340', marginBottom: '12px' }}>Message Received! 🎉</h3>
                  <p style={{ fontSize: '1rem', color: '#6B7280', lineHeight: 1.75, maxWidth: '360px', marginBottom: '32px' }}>
                    Thanks for reaching out, <strong style={{ color: '#0d1340' }}>{form.name || 'friend'}</strong>. One of our team members will reply to <strong style={{ color: '#3B4FCC' }}>{form.email}</strong> within 2 business hours.
                  </p>
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', service: '', message: '' }); }} style={{ background: '#f0f2ff', color: '#3B4FCC', border: 'none', borderRadius: '12px', padding: '12px 28px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'Poppins, sans-serif' }}>
                    Send Another Message
                  </button>
                </div>
              )}
            </div>

            {/* ── IMAGE / VISUAL SIDE ── */}
            <div className="image-panel" style={{ position: 'relative', background: 'linear-gradient(150deg, #0d1340 0%, #1e2a80 100%)', overflow: 'hidden', minHeight: '600px' }}>
              {/* Geometric decorations */}
              <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '340px', height: '340px', borderRadius: '50%', border: '60px solid rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '280px', height: '280px', borderRadius: '50%', border: '40px solid rgba(59,79,204,0.2)', pointerEvents: 'none' }} />

              {/* Content overlay */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '52px 44px', zIndex: 2 }}>
                {/* Top badge */}
                <div style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px', padding: '8px 18px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.06em' }}>Available Mon–Sat</span>
                </div>

                {/* Central visual */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '7rem', marginBottom: '24px', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }}>🧹</div>
                  <h3 style={{ fontSize: '1.7rem', fontWeight: 800, color: 'white', lineHeight: 1.2, marginBottom: '16px' }}>
                    Canada's Most<br />Trusted Clean
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
                    Serving London ON, Quebec,<br />Manitoba & Nova Scotia
                  </p>
                </div>

                {/* Bottom trust bar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { icon: '⭐', text: '4.9 · 800+ verified reviews' },
                    { icon: '🛡️', text: 'Fully insured & background-checked' },
                    { icon: '✅', text: '100% satisfaction guarantee' },
                  ].map(t => (
                    <div key={t.text} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.07)', borderRadius: '12px', padding: '12px 16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <span style={{ fontSize: '1.1rem' }}>{t.icon}</span>
                      <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{t.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            MAP / SERVICE AREA STRIP
        ═══════════════════════════════════════════════ */}
        <section style={{ maxWidth: '1400px', margin: '0 auto 80px', padding: '0 24px' }}>
          <div style={{ background: 'white', borderRadius: '28px', padding: '48px 52px', border: '1.5px solid #eaecf5', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 8px 32px rgba(0,0,0,0.04)' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3B4FCC', letterSpacing: '0.15em', textTransform: 'uppercase' }}>✦ Service Areas</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0d1340', marginTop: '6px', marginBottom: '6px' }}>We Come to You</h3>
              <p style={{ fontSize: '0.92rem', color: '#6B7280' }}>Currently serving across four Canadian provinces.</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {['🏙️ London, Ontario', '🌊 Quebec', '🌾 Manitoba', '⚓ Nova Scotia'].map(area => (
                <span key={area} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f0f2ff', color: '#3B4FCC', borderRadius: '999px', padding: '10px 20px', fontSize: '0.9rem', fontWeight: 600, border: '1.5px solid #dde2fb' }}>{area}</span>
              ))}
            </div>
            <a href="/book" style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#0d1340', color: 'white', fontWeight: 700, borderRadius: '14px', padding: '14px 28px', fontSize: '0.95rem', textDecoration: 'none', transition: 'all 0.2s' }}>
              Book a Clean
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </div>
        </section>

      </main>
    </>
  );
}