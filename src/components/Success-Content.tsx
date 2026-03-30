'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, Check, Copy, CheckCheck } from 'lucide-react';

// ── Sparkle icon using Lucide ─────────────────────────────────────────
const SparkleIcon = ({ size = 28 }: { size?: number }) => (
  <Sparkles size={size} color="#3B4FCC" fill="#3B4FCC" />
);

// ── Check animation using Lucide ───────────────────────────────────────────
const AnimatedCheck = () => (
  <div className="check-svg">
    <Check size={64} color="#ffffff" strokeWidth={2.5} className="check-mark" />
  </div>
);

// ── Step item ─────────────────────────────────────────────────────────────────
const Step = ({
  title,
  description,
  delay,
}: {
  title: string;
  description: string;
  delay: string;
}) => (
  <div className="step-item" style={{ animationDelay: delay }}>
    <div className="step-content">
      <p className="step-title">{title}</p>
      <p className="step-desc">{description}</p>
    </div>
  </div>
);

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId') ?? 'SST-20260228-0042';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

        :root {
          --sky:        #3B4FCC;
          --sky-light:  #ECEFFE;
          --sky-mid:    rgba(59,79,204,0.12);
          --navy:       #1A2365;
          --navy-mid:   #2D3DA8;
          --slate:      #64748B;
          --white:      #FFFFFF;
          --border:     rgba(59,79,204,0.12);
          --t:          all 0.22s cubic-bezier(0.4,0,0.2,1);
        }

        /* Page */
        .success-page {
          min-height: 100vh;
          background: #ECEFFE;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 20px;
          font-family: "Poppins", sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Decorative background blobs */
        .bg-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }
        .bg-blob-1 {
          width: 500px; height: 500px;
          background: rgba(59,79,204,0.06);
          top: -160px; right: -120px;
        }
        .bg-blob-2 {
          width: 360px; height: 360px;
          background: rgba(26,35,102,0.04);
          bottom: -100px; left: -80px;
        }

        /* Floating sparkle dots */
        .sparkle-dot {
          position: absolute;
          border-radius: 50%;
          background: var(--sky);
          pointer-events: none;
          z-index: 0;
          animation: floatDot 6s ease-in-out infinite;
        }
        @keyframes floatDot {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.2; }
          50%       { transform: translateY(-18px) scale(1.15); opacity: 0.4; }
        }

        /* Card */
        .success-card {
          position: relative;
          z-index: 1;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(26,35,102,0.08), 0 8px 20px rgba(59,79,204,0.06);
          width: 100%;
          max-width: 560px;
          overflow: hidden;
          animation: cardReveal 0.55s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Card top band */
        .card-band {
          background: #1aad50;
          padding: 10px 40px 52px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          position: relative;
          overflow: hidden;
          border-bottom: 4px solid #3B4FCC;
        }
        .card-band::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0; right: 0;
          height: 28px;
          background: var(--white);
          border-radius: 28px 28px 0 0;
        }

        /* Animated check */
        .check-svg { 
          animation: checkReveal 0.5s 0.3s ease both;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @keyframes checkReveal { 
          from { opacity:0; transform:scale(0.5) rotate(-20deg); } 
          to { opacity:1; transform:scale(1) rotate(0deg); } 
        }

        .check-mark {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: drawCheck 0.4s 0.9s ease forwards;
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }

        .band-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.7rem;
          font-weight: 700;
          color: var(--white);
          text-align: center;
          line-height: 1.2;
          animation: fadeUp 0.45s 0.5s ease both;
        }
        .band-title span { color: var(--sky); }

        .band-sub {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.7);
          text-align: center;
          max-width: 340px;
          animation: fadeUp 0.45s 0.65s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Card body */
        .card-body { padding: 32px 36px 36px; display: flex; flex-direction: column; gap: 28px; }
        @media (max-width: 500px) { .card-body { padding: 24px 20px 28px; } }

        /* Booking ID box */
        .booking-id-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          background: #F8FAFF;
          border: 1.5px dashed rgba(59,79,204,0.30);
          border-radius: 12px;
          padding: 14px 18px;
          animation: fadeUp 0.45s 0.7s ease both;
        }
        .booking-id-left { display: flex; flex-direction: column; gap: 2px; }
        .booking-id-label { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--slate); }
        .booking-id-value { font-family: 'DM Sans', monospace; font-size: 1rem; font-weight: 600; color: var(--navy); letter-spacing: 0.04em; }
        .copy-btn {
          display: flex; align-items: center; gap: 5px;
          padding: 6px 12px; border-radius: 8px;
          background: #ECEFFE; color: var(--navy);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem; font-weight: 600;
          border: 1px solid rgba(59,79,204,0.2); cursor: pointer;
          transition: var(--t); white-space: nowrap; flex-shrink: 0;
        }
        .copy-btn:hover { background: var(--sky); color: var(--white); border-color: var(--sky); }
        .copy-btn.copied { background: #22C55E; color: #fff; border-color: #22C55E; }

        /* Section label */
        .section-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--sky);
          margin-bottom: 14px;
        }

        /* Steps */
        .steps { display: flex; flex-direction: column; gap: 4px; }
        .step-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 12px 14px;
          border-radius: 10px;
          opacity: 0;
          animation: fadeUp 0.4s ease forwards;
          transition: background 0.2s;
        }
        .step-item:hover { background: #F8FAFF; }
        .step-content { display: flex; flex-direction: column; gap: 2px; padding-top: 1px; }
        .step-title { font-size: 1rem; font-weight: 600; color: var(--navy); }
        .step-desc  { font-size: 1rem; color: var(--slate); line-height: 1.5; }

        /* Divider */
        .divider { height: 1px; background: rgba(59,79,204,0.1); }

        /* Actions */
        .actions { display: flex; flex-direction: column; gap: 10px; animation: fadeUp 0.45s 1.3s ease both; }
        @media (min-width: 440px) { .actions { flex-direction: row; } }

        .btn-primary {
          flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          padding: 13px 24px; background: #1A2366; color: var(--white);
          font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 600;
          border-radius: 50px; text-decoration: none; transition: var(--t);
          border: none; cursor: pointer;
          box-shadow: 0 4px 12px rgba(26,35,102,0.2);
        }
        .btn-primary:hover { 
          background: #2D3DA8;
          transform: translateY(-2px); 
          box-shadow: 0 8px 16px rgba(59,79,204,0.25); 
        }

        .btn-secondary {
          flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          padding: 13px 24px; background: #FFFFFF; color: #2D3DA8;
          font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 500;
          border-radius: 50px; text-decoration: none; transition: var(--t);
          border: 1.5px solid rgba(59,79,204,0.2); cursor: pointer;
        }
        .btn-secondary:hover { border-color: #3B4FCC; color: #3B4FCC; background: #F8FAFF; }

        /* Logo footer inside card */
        .card-footer {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 0 36px 28px;
          animation: fadeUp 0.4s 1.5s ease both;
        }
        .card-footer-text { font-size: 0.78rem; color: #94A3B8; }
        .card-footer-brand { font-family: 'Playfair Display', serif; font-size: 0.85rem; font-weight: 700; color: var(--navy); }
        .card-footer-brand span { color: var(--sky); }
      `}</style>

      <div className="success-page">
        {/* Background decoration */}
        <div className="bg-blob bg-blob-1" />
        <div className="bg-blob bg-blob-2" />
        <div className="sparkle-dot" style={{ width: 8, height: 8, top: '18%', left: '12%', animationDelay: '0s' }} />
        <div className="sparkle-dot" style={{ width: 5, height: 5, top: '65%', left: '8%', animationDelay: '1.2s' }} />
        <div className="sparkle-dot" style={{ width: 6, height: 6, top: '25%', right: '10%', animationDelay: '0.7s' }} />
        <div className="sparkle-dot" style={{ width: 4, height: 4, top: '75%', right: '14%', animationDelay: '2s' }} />

        <div className="success-card">

          {/* ── Top Band ── */}
          <div className="card-band">
            <AnimatedCheck />
            <h1 className="band-title">Booking Confirmed!</h1>
          </div>

          {/* ── Body ── */}
          <div className="card-body">

            {/* Booking ID */}
            <div className="booking-id-box">
              <div className="booking-id-left">
                <span className="booking-id-label">Booking Reference</span>
                <span className="booking-id-value">{bookingId.slice(0, 13)}</span>
              </div>
              <button className={`copy-btn${copied ? ' copied' : ''}`} onClick={handleCopy}>
                {copied ? (
                  <><CheckCheck size={13} /> Copied</>
                ) : (
                  <>
                    <Copy size={13} />
                    Copy ID
                  </>
                )}
              </button>
            </div>
            <div>
              <p className="section-label">What happens next</p>
              <div className="steps">
                <Step
                  title="Check your inbox"
                  description="Your booking confirmation and invoice will arrive within a few minutes."
                  delay="0.8s"
                />
                <Step
                  title="We'll be there on time"
                  description="Our team will arrive at your scheduled date and time."
                  delay="0.95s"
                />
              </div>
            </div>

            <div/>
            <Link href="/" className="btn-secondary">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}