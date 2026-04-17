'use client';
import { useState } from 'react';
import {
  MapPin, Phone, Clock, Send, Lock, ChevronDown, ArrowRight,
  CheckCircle2, Star, ShieldCheck, BadgeCheck, Radio, Wifi,
  Sparkles, Home, Waves, Wheat, Anchor, AlertCircle, Loader2,
} from 'lucide-react';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', service: '', message: '' });
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setErrorMsg('');

    try {
      // Falls back to port 8081 — set NEXT_PUBLIC_API_URL in .env.local to override
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8081'}/contact`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name:    form.name,
            email:   form.email,
            phone:   form.phone   || undefined,
            service: form.service || undefined,
            message: form.message,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        // NestJS validation errors arrive as string[] in data.message
        const msg = Array.isArray(data.message)
          ? data.message[0]
          : data.message ?? 'Something went wrong. Please try again.';
        throw new Error(msg);
      }

      setFormState('success');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send your message. Please try again.');
      setFormState('error');
    }
  };

  const handleReset = () => {
    setFormState('idle');
    setErrorMsg('');
    setForm({ name: '', email: '', phone: '', service: '', message: '' });
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

  const serviceAreas = [
    { icon: Home,   label: 'London, Ontario' },
    { icon: Waves,  label: 'Quebec'          },
    { icon: Wheat,  label: 'Manitoba'        },
    { icon: Anchor, label: 'Nova Scotia'     },
  ];

  const trustItems = [
    { icon: Star,        text: '4.9 · 800+ verified reviews'       },
    { icon: ShieldCheck, text: 'Fully insured & background-checked' },
    { icon: BadgeCheck,  text: '100% satisfaction guarantee'        },
  ];

  const isSubmitting = formState === 'submitting';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }

        @keyframes con-fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes con-pulse {
          0%, 100% { transform: scale(1);    opacity: 0.7; }
          50%       { transform: scale(1.12); opacity: 1;   }
        }
        @keyframes con-shimmer {
          from { background-position: 200% center; }
          to   { background-position: -200% center; }
        }
        @keyframes con-spin { to { transform: rotate(360deg); } }

        .con-fade { animation: con-fadeUp 0.7s ease both; }
        .con-d1   { animation-delay: 0.05s; opacity: 0; }
        .con-d2   { animation-delay: 0.18s; opacity: 0; }
        .con-d3   { animation-delay: 0.30s; opacity: 0; }
        .con-d4   { animation-delay: 0.42s; opacity: 0; }
        .con-d5   { animation-delay: 0.54s; opacity: 0; }
        .con-spin { animation: con-spin 0.8s linear infinite; }

        .con-cta-btn {
          background: linear-gradient(90deg, #3B4FCC, #5a6be0, #3B4FCC);
          background-size: 200% auto; animation: con-shimmer 4s linear infinite;
          color: white; border: none; border-radius: 14px;
          padding: 15px 36px; font-size: 1.05rem; font-weight: 700;
          font-family: 'Poppins', sans-serif; cursor: pointer;
          display: inline-flex; align-items: center; gap: 10px;
          text-decoration: none;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          box-shadow: 0 6px 24px rgba(59,79,204,0.35);
        }
        .con-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(59,79,204,0.45); }

        .con-outline-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: white;
          border: 2px solid rgba(255,255,255,0.35); border-radius: 14px;
          padding: 13px 30px; font-size: 1.05rem; font-weight: 600;
          font-family: 'Poppins', sans-serif; text-decoration: none;
          transition: all 0.2s;
        }
        .con-outline-btn:hover { background: rgba(255,255,255,0.10); border-color: rgba(255,255,255,0.6); }

        .info-card {
          background: #fff; border-radius: 22px; border: 1.5px solid #eaecf5;
          padding: 28px 28px 24px; display: flex; align-items: flex-start;
          gap: 18px; flex: 1; min-width: 240px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          position: relative; overflow: hidden;
        }
        .info-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #3B4FCC, #818cf8); opacity: 0; transition: opacity 0.25s;
        }
        .info-card:hover { transform: translateY(-5px); box-shadow: 0 20px 48px rgba(59,79,204,0.11); }
        .info-card:hover::before { opacity: 1; }

        .icon-wrap {
          flex-shrink: 0; width: 58px; height: 58px; border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
        }

        .submit-btn {
          background: linear-gradient(90deg, #3B4FCC, #5a6be0, #3B4FCC);
          background-size: 200% auto; animation: con-shimmer 4s linear infinite;
          color: white; border: none; border-radius: 14px; padding: 15px 36px;
          font-size: 1rem; font-weight: 700; font-family: 'Poppins', sans-serif;
          cursor: pointer; display: inline-flex; align-items: center; gap: 10px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          box-shadow: 0 6px 20px rgba(59,79,204,0.35); letter-spacing: 0.03em;
        }
        .submit-btn:hover  { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(59,79,204,0.45); }
        .submit-btn:active { transform: scale(0.97); }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; animation: none; background: #6b7cb8; }

        .area-chip {
          display: inline-flex; align-items: center; gap: 8px;
          background: #f0f2ff; color: #3B4FCC; border-radius: 999px;
          padding: 10px 20px; font-size: 0.9rem; font-weight: 600;
          border: 1.5px solid #dde2fb; transition: background 0.2s, box-shadow 0.2s;
        }
        .area-chip:hover { background: #e4e8ff; box-shadow: 0 4px 14px rgba(59,79,204,0.15); }

        .trust-row {
          display: flex; align-items: center; gap: 12px;
          background: rgba(255,255,255,0.07); border-radius: 12px;
          padding: 12px 16px; border: 1px solid rgba(255,255,255,0.1);
        }

        @media (max-width: 900px) {
          .info-cards-row     { flex-direction: column !important; }
          .form-image-grid    { grid-template-columns: 1fr !important; }
          .image-panel        { display: none !important; }
          .form-section-inner { border-radius: 24px !important; }
          .hero-h1            { font-size: 2.6rem !important; }
        }
        @media (max-width: 600px) {
          .name-email-row { grid-template-columns: 1fr !important; }
          .hero-h1        { font-size: 2rem !important; }
        }
      `}</style>

      <main style={{ fontFamily: 'Poppins, sans-serif', background: 'linear-gradient(175deg, #f0f2ff 0%, #f8f9ff 50%, #eef0fb 100%)' }}>

        {/* ══ HERO ══ */}
        <section style={{ position: 'relative', overflow: 'hidden', minHeight: '580px', display: 'flex', alignItems: 'center', padding: '110px 0 100px' }}>

          {/* Background — gallery House Cleaning photo */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url('https://res.cloudinary.com/drda6i3w6/image/upload/v1775775034/photo_2026-04-09_23-04-49_ruhpvv.jpg')`,
            backgroundSize: 'cover', backgroundPosition: 'center 40%',
            backgroundRepeat: 'no-repeat', zIndex: 0,
          }} />

          {/* Blue tint overlay — same as About page */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(110deg, rgba(50,72,200,0.62) 0%, rgba(80,100,215,0.55) 48%, rgba(110,95,190,0.48) 100%)',
            zIndex: 1,
          }} />

          {/* Decorative rings */}
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: 480, height: 480, borderRadius: '50%', border: '80px solid rgba(59,79,204,0.12)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: 360, height: 360, borderRadius: '50%', border: '60px solid rgba(129,140,248,0.08)', zIndex: 2, pointerEvents: 'none' }} />

          {/* Floating accent dots */}
          {[[8,15],[88,40],[20,75],[75,18],[55,82],[40,50]].map(([left, top], i) => (
            <div key={i} style={{
              position: 'absolute', width: i % 2 === 0 ? 7 : 5, height: i % 2 === 0 ? 7 : 5,
              borderRadius: '50%', background: '#818cf8', opacity: 0.28,
              left: `${left}%`, top: `${top}%`,
              animation: `con-pulse ${2.5 + i * 0.35}s ease-in-out infinite`,
              animationDelay: `${i * 0.25}s`, zIndex: 3, pointerEvents: 'none',
            }} />
          ))}

          {/* Content — left-aligned, matching About page layout */}
          <div style={{ position: 'relative', zIndex: 4, maxWidth: 1400, margin: '0 auto', padding: '0 24px', width: '100%' }}>
            <div style={{ maxWidth: 700 }}>

              {/* Breadcrumb */}
              <div className="con-fade con-d1" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
                <a href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</a>
                <ChevronDown size={13} color="rgba(255,255,255,0.4)" strokeWidth={2} style={{ transform: 'rotate(-90deg)' }} />
                <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>Contact Us</span>
              </div>

              {/* Eyebrow pill */}
              <div className="con-fade con-d1" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.20)', backdropFilter: 'blur(6px)', borderRadius: 999, padding: '7px 20px', marginBottom: 24 }}>
                <Radio size={12} color="#818cf8" strokeWidth={2.5} style={{ animation: 'con-pulse 2s ease-in-out infinite' }} />
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.80)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Get In Touch</span>
              </div>

              <h1 className="con-fade con-d2 hero-h1" style={{ fontSize: 'clamp(2.4rem,5vw,3.8rem)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 22, textShadow: '0 2px 24px rgba(0,0,0,0.4)' }}>
                We'd Love to<br />
                <span style={{ background: 'linear-gradient(90deg,#a5b4fc,#c7d0f8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Hear From You
                </span>
              </h1>

              <p className="con-fade con-d3" style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.82, marginBottom: 36, textShadow: '0 1px 8px rgba(0,0,0,0.3)', maxWidth: 580 }}>
                Questions, quotes, or custom schedules — reach our team and we'll craft the perfect clean for your space.
              </p>

              <div className="con-fade con-d4" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a href="#contact-form" className="con-cta-btn">
                  Send a Message <ArrowRight size={16} strokeWidth={2.5} />
                </a>
                <a href="tel:5195771711" className="con-outline-btn">
                  <Phone size={16} strokeWidth={2} /> 519 577 1711
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* ══ INFO CARDS ══ */}
        <section style={{ maxWidth: 1400, margin: '-40px auto 0', padding: '0 24px', position: 'relative', zIndex: 10 }}>
          <div className="con-fade con-d4 info-cards-row" style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <div className="info-card">
              <div className="icon-wrap" style={{ background: 'linear-gradient(135deg, #3B4FCC, #5a6be0)' }}><MapPin size={26} color="white" strokeWidth={2} /></div>
              <div style={{ position: 'absolute', right: -8, top: 4, opacity: 0.05, pointerEvents: 'none' }}><MapPin size={72} color="#3B4FCC" strokeWidth={1} /></div>
              <div>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#3B4FCC', textTransform: 'uppercase', letterSpacing: '0.13em', marginBottom: 6 }}>Our Address</p>
                <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0d1340', marginBottom: 4 }}>Head Office</p>
                <p style={{ fontSize: '0.9rem', color: '#6B7280', lineHeight: 1.6 }}>London, Ontario<br />Canada, N6A 1A1</p>
              </div>
            </div>
            <div className="info-card">
              <div className="icon-wrap" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}><Phone size={26} color="white" strokeWidth={2} /></div>
              <div style={{ position: 'absolute', right: -8, top: 4, opacity: 0.05, pointerEvents: 'none' }}><Phone size={72} color="#10B981" strokeWidth={1} /></div>
              <div>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.13em', marginBottom: 6 }}>Contact Number</p>
                <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0d1340', marginBottom: 4 }}>519 577 1711</p>
                <p style={{ fontSize: '0.9rem', color: '#6B7280', lineHeight: 1.6 }}>sandyssparkletouch@gmail.com<br /><span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>Mon–Sat · Replies in 2 hrs</span></p>
              </div>
            </div>
            <div className="info-card">
              <div className="icon-wrap" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}><Clock size={26} color="white" strokeWidth={2} /></div>
              <div style={{ position: 'absolute', right: -8, top: 4, opacity: 0.05, pointerEvents: 'none' }}><Clock size={72} color="#F59E0B" strokeWidth={1} /></div>
              <div>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.13em', marginBottom: 6 }}>Opening Hours</p>
                <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0d1340', marginBottom: 4 }}>Mon – Sat: 8:00 – 20:00</p>
                <p style={{ fontSize: '0.9rem', color: '#6B7280', lineHeight: 1.6 }}>Sunday: Closed<br /><span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>EST · All provinces</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ FORM + IMAGE ══ */}
        <section id="contact-form" style={{ maxWidth: 1400, margin: '40px auto 80px', padding: '0 24px' }}>
          <div className="form-image-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderRadius: 32, overflow: 'hidden', boxShadow: '0 32px 80px rgba(59,79,204,0.12)', border: '1.5px solid #e8eaf0' }}>

            {/* FORM SIDE */}
            <div className="form-section-inner" style={{ background: 'white', padding: '56px 52px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -60, right: -60, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,79,204,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

              {formState === 'success' ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 480, textAlign: 'center' }}>
                  <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'linear-gradient(135deg, #10B981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28, boxShadow: '0 16px 40px rgba(16,185,129,0.3)', animation: 'con-pulse 2s ease-in-out infinite' }}>
                    <CheckCircle2 size={40} color="white" strokeWidth={2.5} />
                  </div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0d1340', marginBottom: 12 }}>Message Received!</h3>
                  <p style={{ fontSize: '1rem', color: '#6B7280', lineHeight: 1.75, maxWidth: 360, marginBottom: 32 }}>
                    Thanks for reaching out, <strong style={{ color: '#0d1340' }}>{form.name || 'friend'}</strong>. One of our team members will reply to <strong style={{ color: '#3B4FCC' }}>{form.email}</strong> within 2 business hours.
                  </p>
                  <button onClick={handleReset} style={{ background: '#f0f2ff', color: '#3B4FCC', border: 'none', borderRadius: 12, padding: '12px 28px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'Poppins, sans-serif' }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: 36 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                      <Sparkles size={14} color="#3B4FCC" strokeWidth={2} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3B4FCC', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Send a Message</span>
                    </div>
                    <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: '#0d1340', marginTop: 8, lineHeight: 1.2 }}>Get In Touch</h2>
                    <p style={{ fontSize: '0.95rem', color: '#6B7280', marginTop: 8, lineHeight: 1.65 }}>Fill out the form and we'll be back to you faster than you can say "spotless."</p>
                  </div>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div className="name-email-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 7 }}>Your Name <span style={{ color: '#EF4444' }}>*</span></label>
                        <input required placeholder="e.g. Sandra Okafor" value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                          disabled={isSubmitting} style={inp('name')} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 7 }}>Email Address <span style={{ color: '#EF4444' }}>*</span></label>
                        <input required type="email" placeholder="you@example.com" value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                          disabled={isSubmitting} style={inp('email')} />
                      </div>
                    </div>

                    <div className="name-email-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 7 }}>Phone Number</label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>🇨🇦</span>
                          <input type="tel" placeholder="(555) 000-0000" value={form.phone}
                            onChange={e => setForm({ ...form, phone: e.target.value })}
                            onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)}
                            disabled={isSubmitting} style={{ ...inp('phone'), paddingLeft: '40px' }} />
                        </div>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 7 }}>Service Required</label>
                        <div style={{ position: 'relative' }}>
                          <select value={form.service}
                            onChange={e => setForm({ ...form, service: e.target.value })}
                            onFocus={() => setFocused('service')} onBlur={() => setFocused(null)}
                            disabled={isSubmitting}
                            style={{ ...inp('service'), appearance: 'none', paddingRight: 40, cursor: 'pointer' }}>
                            <option value="">Select a service…</option>
                            <option>Residential Cleaning</option>
                            <option>Commercial Cleaning</option>
                            <option>Deep Cleaning</option>
                            <option>Move-In / Out Cleaning</option>
                            <option>General Enquiry</option>
                          </select>
                          <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
                            <ChevronDown size={16} color="#9CA3AF" strokeWidth={2.5} />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 7 }}>Your Message <span style={{ color: '#EF4444' }}>*</span></label>
                      <textarea required rows={5}
                        placeholder="Tell us how we can help — cleaning schedule, specific needs, access details…"
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                        disabled={isSubmitting}
                        style={{ ...inp('message'), resize: 'vertical', lineHeight: 1.65, maxWidth: '100%', boxSizing: 'border-box' }} />
                    </div>

                    {/* Error banner */}
                    {formState === 'error' && (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: 12, padding: '12px 16px' }}>
                        <AlertCircle size={16} color="#EF4444" strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
                        <p style={{ fontSize: '0.85rem', color: '#dc2626', margin: 0, lineHeight: 1.5 }}>{errorMsg}</p>
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginTop: 6 }}>
                      <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting
                          ? <><Loader2 size={17} strokeWidth={2.2} className="con-spin" /> Sending…</>
                          : <><Send size={17} strokeWidth={2.2} /> Submit Message</>}
                      </button>
                      <p style={{ fontSize: '0.78rem', color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: 6, margin: 0 }}>
                        <Lock size={13} color="#9CA3AF" strokeWidth={2} />
                        Your data is safe with us
                      </p>
                    </div>
                  </form>
                </>
              )}
            </div>

            {/* IMAGE SIDE */}
            <div className="image-panel" style={{ position: 'relative', background: 'linear-gradient(150deg, #0d1340 0%, #1e2a80 100%)', overflow: 'hidden', minHeight: 600 }}>
              <div style={{ position: 'absolute', top: -80, right: -80, width: 340, height: 340, borderRadius: '50%', border: '60px solid rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: -60, left: -60, width: 280, height: 280, borderRadius: '50%', border: '40px solid rgba(59,79,204,0.2)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '52px 44px', zIndex: 2 }}>
                <div style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 999, padding: '8px 18px' }}>
                  <Wifi size={13} color="#10B981" strokeWidth={2.5} />
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.06em' }}>Available Mon–Sat</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                    <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                      <Sparkles size={56} color="white" strokeWidth={1.2} style={{ opacity: 0.9 }} />
                    </div>
                  </div>
                  <h3 style={{ fontSize: '1.7rem', fontWeight: 800, color: 'white', lineHeight: 1.2, marginBottom: 16 }}>Canada's Most<br />Trusted Clean</h3>
                  <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>Serving London ON, Quebec,<br />Manitoba & Nova Scotia</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {trustItems.map(({ icon: Icon, text }) => (
                    <div key={text} className="trust-row">
                      <Icon size={18} color="#a5b4fc" strokeWidth={1.8} style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ══ SERVICE AREA STRIP ══ */}
        <section style={{ maxWidth: 1400, margin: '0 auto 80px', padding: '0 24px' }}>
          <div style={{ background: 'white', borderRadius: 28, padding: '48px 52px', border: '1.5px solid #eaecf5', display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 8px 32px rgba(0,0,0,0.04)' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <MapPin size={14} color="#3B4FCC" strokeWidth={2.2} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3B4FCC', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Service Areas</span>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0d1340', margin: '0 0 6px' }}>We Come to You</h3>
              <p style={{ fontSize: '0.92rem', color: '#6B7280', margin: 0 }}>Currently serving across four Canadian provinces.</p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {serviceAreas.map(({ icon: Icon, label }) => (
                <span key={label} className="area-chip"><Icon size={15} strokeWidth={2} />{label}</span>
              ))}
            </div>
            <a href="/book"
              style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: 8, background: '#0d1340', color: 'white', fontWeight: 700, borderRadius: 14, padding: '14px 28px', fontSize: '0.95rem', textDecoration: 'none', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#3B4FCC')}
              onMouseLeave={e => (e.currentTarget.style.background = '#0d1340')}
            >
              Book a Clean <ArrowRight size={15} strokeWidth={2.5} />
            </a>
          </div>
        </section>

      </main>
    </>
  );
}