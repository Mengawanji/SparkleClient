'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const BUBBLES = [
  // Top-left cluster
  { left: 3,  top: 4,  size: 4.2, borderOpacity: 0.80, fill: 0.0,  delay: 0,   dur: 6   },
  { left: 11, top: 2,  size: 2.6, borderOpacity: 0.65, fill: 0.0,  delay: 1.2, dur: 7   },
  { left: 16, top: 14, size: 1.0, borderOpacity: 0.50, fill: 0.10, delay: 0.5, dur: 5   },
  // Right side scattered
  { left: 76, top: 10, size: 1.0, borderOpacity: 0.55, fill: 0.0,  delay: 2.2, dur: 6.5 },
  { left: 82, top: 42, size: 2.8, borderOpacity: 0.55, fill: 0.0,  delay: 0.8, dur: 7.5 },
  { left: 87, top: 65, size: 3.8, borderOpacity: 0.65, fill: 0.0,  delay: 1.5, dur: 8   },
  { left: 93, top: 28, size: 1.4, borderOpacity: 0.45, fill: 0.0,  delay: 3,   dur: 5.5 },
];

const slides = [
  {
    tag: 'PROFESSIONAL SANITIZING',
    title: 'Disinfecting &\nDeodorizing Services',
    // Bright, well-lit professional cleaners image
    bg: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1600&q=90&fit=crop&crop=faces,center',
  },
  {
    tag: 'BEST CLEANING SERVICE',
    title: 'Amazing quality\ncleaning service',
    // Bright close-up cleaning action shot
    bg: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=1600&q=90&fit=crop&crop=center',
  },
];

function Bubble({ left, top, size, borderOpacity, fill, delay, dur }: typeof BUBBLES[0]) {
  return (
    <span
      aria-hidden
      style={{
        position: 'absolute',
        left: `${left}%`,
        top: `${top}%`,
        width: `${size}rem`,
        height: `${size}rem`,
        borderRadius: '50%',
        border: `2.5px solid rgba(255,255,255,${borderOpacity})`,
        background: `rgba(255,255,255,${fill})`,
        animation: `bubbleFloat ${dur}s ease-in-out ${delay}s infinite`,
        pointerEvents: 'none',
        zIndex: 5,
      }}
    />
  );
}

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      if (fading || idx === current) return;
      setFading(true);
      setTimeout(() => {
        setCurrent(idx);
        setFading(false);
      }, 450);
    },
    [fading, current]
  );

  useEffect(() => {
    const id = setInterval(() => goTo((current + 1) % slides.length), 5500);
    return () => clearInterval(id);
  }, [current, goTo]);

  const slide = slides[current];

  return (
    <>
      <style>{`
        @keyframes bubbleFloat {
          0%   { transform: translateY(0px)   scale(1);    }
          50%  { transform: translateY(-16px) scale(1.05); }
          100% { transform: translateY(0px)   scale(1);    }
        }
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .hero-in { animation: heroIn 0.6s cubic-bezier(0.22,1,0.36,1) both; }

        .book-btn {
          background: #1b4ed8;
          color: #fff;
          font-weight: 700;
          font-size: clamp(0.6rem, 0.85vw, 0.74rem);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          padding: clamp(0.7rem,1.3vw,1rem) clamp(1.2rem,2vw,1.8rem);
          box-shadow: 0 4px 22px rgba(15,40,180,0.50);
          transition: background 0.2s;
        }
        .book-btn:hover { background: #1640bf; }

        .play-btn {
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          background: #f5a623;
          border: none; cursor: pointer;
          box-shadow: 0 4px 18px rgba(245,166,35,0.60);
          transition: transform 0.2s;
          flex-shrink: 0;
          width: clamp(2.8rem,4vw,3.4rem);
          height: clamp(2.8rem,4vw,3.4rem);
        }
        .play-btn:hover  { transform: scale(1.1);  }
        .play-btn:active { transform: scale(0.95); }

        .dot {
          height: 0.48rem; border-radius: 999px;
          background: rgba(255,255,255,0.45);
          border: none; cursor: pointer;
          transition: all 0.35s ease; padding: 0;
        }
        .dot.active { background: #fff; width: 1.8rem !important; }
      `}</style>

      <section
        className="relative w-full overflow-hidden"
        style={{ height: 'clamp(420px, 50vw, 640px)' }}
      >
        {/* Background images — crossfade */}
        {slides.map((s, i) => (
          <div
            key={i}
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${s.bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              // Keep image bright — only fade on transition
              opacity: i === current ? (fading ? 0 : 1) : 0,
              transition: 'opacity 0.45s ease',
              zIndex: 0,
            }}
          />
        ))}

        {/* Overlay — lighter so image stays vivid like the screenshots */}
        <div
          style={{
            position: 'absolute', inset: 0,
            background:
              'linear-gradient(105deg, rgba(16,50,180,0.72) 0%, rgba(25,68,210,0.55) 38%, rgba(12,40,160,0.38) 100%)',
            zIndex: 1,
          }}
        />

        {/* Bubbles */}
        {BUBBLES.map((b, i) => <Bubble key={i} {...b} />)}

        {/* Content */}
        <div
          style={{
            position: 'relative', zIndex: 10,
            height: '100%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', 
            paddingLeft: 'clamp(1.5rem, 6vw, 5.5rem)',
            paddingRight: 'clamp(1.5rem, 6vw, 5.5rem)',
            textAlign: 'center', 
          }}
        >
          <div style={{ width: '100%' }}> 
            <p
              key={`tag-${current}`}
              className="hero-in"
              style={{
                color: '#fff', fontWeight: 600,
                fontSize: 'clamp(0.6rem, 0.95vw, 0.78rem)',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                marginBottom: '0.7rem', animationDelay: '0.04s',
              }}
            >
              {slide.tag}
            </p>

            <h1
              key={`h1-${current}`}
              className="hero-in"
              style={{
                color: '#fff', fontWeight: 800,
                fontSize: 'clamp(2rem, 5vw, 3.9rem)',
                lineHeight: 1.1, whiteSpace: 'pre-line', margin: 0,
                textShadow: '0 2px 20px rgba(0,0,0,0.18)',
                animationDelay: '0.13s',
              }}
            >
              {slide.title}
            </h1>

            <div
              key={`cta-${current}`}
              className="hero-in"
              style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                marginTop: 'clamp(1.4rem, 2.8vw, 2rem)',
                animationDelay: '0.25s',
              }}
            >
              <Link href="/book">
                <button className="book-btn">BOOK A SCHEDULE</button>
              </Link>

              <button className="play-btn" aria-label="Watch video">
                <span style={{
                  display: 'block', width: 0, height: 0,
                  borderTop: '7px solid transparent',
                  borderBottom: '7px solid transparent',
                  borderLeft: '13px solid #fff',
                  marginLeft: '3px',
                }} />
              </button>
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div
          style={{
            position: 'absolute', bottom: '1.4rem',
            left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: '0.45rem', zIndex: 20,
          }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`dot${i === current ? ' active' : ''}`}
              style={{ width: i === current ? '1.8rem' : '0.48rem' }}
            />
          ))}
        </div>
      </section>
    </>
  );
}