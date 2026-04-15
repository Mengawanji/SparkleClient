"use client";

import { useState, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Category = "All" | "House Cleaning" | "Kitchen Cleaning" | "Bedroom Cleaning" | "Window Cleaning" | "Bathroom Cleaning";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: Category;
  span?: "wide" | "tall" | "normal"; // controls masonry sizing
}

// ─── Gallery Data ─────────────────────────────────────────────────────────────

const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1,  src: "https://res.cloudinary.com/drda6i3w6/image/upload/v1775775039/photo_2026-04-09_23-05-00_sej18f.jpg", alt: "Clean, spotless kitchen surfaces",          category: "Kitchen Cleaning",  span: "wide"   },
  { id: 2,  src: "https://res.cloudinary.com/drda6i3w6/image/upload/v1775775034/photo_2026-04-09_23-04-49_ruhpvv.jpg", alt: "Bright living room after house cleaning",   category: "House Cleaning",    span: "tall"   },
  { id: 3,  src: "https://res.cloudinary.com/drda6i3w6/image/upload/v1775775034/photo_2026-04-09_23-04-14_fyjk3r.jpg", alt: "Bright living room after house cleaning",   category: "House Cleaning",    span: "tall"   },
  { id: 4,  src: "https://res.cloudinary.com/drda6i3w6/image/upload/v1775775035/photo_2026-04-09_23-04-55_tdn79v.jpg", alt: "Sparkling living room",                     category: "House Cleaning",    span: "normal" },
  { id: 5,  src: "https://res.cloudinary.com/drda6i3w6/image/upload/v1775775033/photo_2026-02-21_21-29-08_2_kfj0kq.jpg", alt: "Organized shoe storage closet space",     category: "Bathroom Cleaning", span: "normal" },
  { id: 6,  src: "https://res.cloudinary.com/drda6i3w6/image/upload/v1775775031/photo_2026-02-21_21-29-08_q1aa3j.jpg", alt: "Clean, well-lit corridor walkway",          category: "House Cleaning",   span: "wide"   },
  { id: 7,  src: "https://res.cloudinary.com/drda6i3w6/image/upload/v1775775030/photo_2026-02-21_21-29-07_2_pgeduw.jpg", alt: "Clean, well-lit empty room",              category: "Bedroom Cleaning",   span: "normal" },
  { id: 8,  src: "https://res.cloudinary.com/drda6i3w6/image/upload/v1775775014/photo_2026-02-21_21-27-51_cigcbh.jpg", alt: "Polished hardwood floors",                  category: "House Cleaning",    span: "normal" },
  { id: 9,  src: "https://res.cloudinary.com/drda6i3w6/image/upload/v1775775015/photo_2026-02-21_21-27-51_2_kueaq7.jpg", alt: "Polished hardwood floors",                category: "House Cleaning",    span: "normal" },
  { id: 10, src: "https://res.cloudinary.com/drda6i3w6/image/upload/v1775775013/photo_2026-02-21_18-45-13_2_rceiu2.jpg", alt: "Freshly cleaned bedroom space",           category: "Bedroom Cleaning",   span: "tall"   },
  { id: 11, src: "https://res.cloudinary.com/drda6i3w6/image/upload/v1775775013/photo_2026-02-21_18-45-13_ldg4fz.jpg", alt: "Freshly cleaned bedroom space",             category: "Bedroom Cleaning",   span: "tall"   },
  { id: 12, src: "https://res.cloudinary.com/drda6i3w6/image/upload/v1775775012/photo_2026-02-21_18-45-12_jazigm.jpg", alt: "Freshly cleaned bedroom space",             category: "Bedroom Cleaning",   span: "tall"   },   
  { id: 13, src: "https://res.cloudinary.com/drda6i3w6/image/upload/v1775775009/photo_2026-02-21_18-45-11_2_upstrn.jpg", alt: "Organized shoe storage closet space",     category: "House Cleaning", span: "normal" },
  { id: 14, src: "https://res.cloudinary.com/drda6i3w6/image/upload/v1775775007/photo_2026-02-21_18-40-44_rmrfxk.jpg", alt: "Organized shoe storage closet space",       category: "Bathroom Cleaning", span: "normal" },
  { id: 15, src: "https://res.cloudinary.com/drda6i3w6/image/upload/v1775775003/photo_2026-02-21_18-40-42_ty6cp2.jpg", alt: "Organized shoe storage closet space",       category: "Bathroom Cleaning", span: "normal" },
  { id: 16, src: "https://res.cloudinary.com/drda6i3w6/image/upload/v1775775008/photo_2026-02-21_18-45-10_hf80hs.jpg", alt: "Organized shoe storage closet space",       category: "Bathroom Cleaning", span: "normal" },
];

const CATEGORIES: Category[] = [
  "All", "House Cleaning", "Kitchen Cleaning", "Bedroom Cleaning",
  "Window Cleaning", "Bathroom Cleaning",
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function GalleryPage() {
  const [active, setActive] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);
  const [visible, setVisible] = useState(false);

  const filtered = active === "All"
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === active);

  // Close lightbox on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Animate items in on filter change
  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [active]);

  // Navigate lightbox
  const navigate = (dir: 1 | -1) => {
    if (!lightbox) return;
    const idx = filtered.findIndex((i) => i.id === lightbox.id);
    const next = filtered[(idx + dir + filtered.length) % filtered.length];
    setLightbox(next);
  };

  return (
    <>
      {/* ── Inline styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        .gallery-root { font-family: 'Poppins', sans-serif; background: #f8f9fc; min-height: 100vh; }

        /* Hero */
        .gallery-hero {
          background: linear-gradient(135deg, #1a3c8f 0%, #2b5ce6 60%, #4f8ef7 100%);
          padding: 80px 24px 70px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .gallery-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 70% 50%, rgba(255,255,255,.08) 0%, transparent 70%);
        }
        .gallery-hero__eyebrow {
          font-size: 12px; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(255,255,255,.7); margin-bottom: 14px;
        }
        .gallery-hero__title {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(2.2rem, 5vw, 3.4rem);
          color: #fff; margin: 0 0 16px; font-weight: 600; line-height: 1.15;
        }
        .gallery-hero__sub { color: rgba(255,255,255,.75); max-width: 500px; margin: 0 auto; line-height: 1.6; font-size: 15px; }

        /* Filters */
        .gallery-filters {
          display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;
          padding: 36px 24px 28px; max-width: 900px; margin: 0 auto;
        }
        .filter-btn {
          border: 1.5px solid #d5dff5; background: #fff; color: #4a5568;
          padding: 8px 20px; border-radius: 50px; font-family: 'DM Sans', sans-serif;
          font-size: 13.5px; font-weight: 500; cursor: pointer;
          transition: all .22s ease;
        }
        .filter-btn:hover { border-color: #2b5ce6; color: #2b5ce6; background: #eef3ff; }
        .filter-btn.active { background: #2b5ce6; color: #fff; border-color: #2b5ce6; }

        /* Grid */
        .gallery-grid {
          columns: 3 280px; gap: 16px;
          max-width: 1200px; margin: 0 auto; padding: 0 24px 60px;
        }
        .gallery-item {
          break-inside: avoid; margin-bottom: 16px;
          border-radius: 12px; overflow: hidden;
          cursor: pointer; position: relative;
          box-shadow: 0 2px 12px rgba(0,0,0,.06);
          transition: transform .25s ease, box-shadow .25s ease, opacity .35s ease;
          opacity: 0;
        }
        .gallery-item.visible { opacity: 1; }
        .gallery-item:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(43,92,230,.18); }

        /* Span helpers */
        .gallery-item--wide img { aspect-ratio: 16/9; }
        .gallery-item--tall img { aspect-ratio: 3/4; }
        .gallery-item--normal img { aspect-ratio: 4/3; }

        .gallery-item img { width: 100%; display: block; object-fit: cover; transition: transform .4s ease; }
        .gallery-item:hover img { transform: scale(1.04); }

        /* Overlay */
        .gallery-item__overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(18,36,100,.65) 100%);
          opacity: 0; transition: opacity .25s ease;
          display: flex; align-items: flex-end; padding: 16px;
        }
        .gallery-item:hover .gallery-item__overlay { opacity: 1; }
        .gallery-item__label {
          color: #fff; font-size: 12.5px; font-weight: 500;
          background: rgba(255,255,255,.15); backdrop-filter: blur(4px);
          padding: 4px 10px; border-radius: 20px; letter-spacing: .3px;
        }

        /* Lightbox */
        .lightbox-backdrop {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(8,16,48,.92); backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          animation: fadeIn .2s ease;
        }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }

        .lightbox-inner {
          position: relative; max-width: 900px; width: 100%;
          border-radius: 14px; overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,.5);
          animation: scaleIn .2s ease;
        }
        @keyframes scaleIn { from { transform: scale(.94); opacity: 0 } to { transform: scale(1); opacity: 1 } }

        .lightbox-inner img { width: 100%; display: block; max-height: 80vh; object-fit: contain; background: #111; }

        .lightbox-close {
          position: absolute; top: 14px; right: 14px;
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,.15); border: none; color: #fff;
          font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background .2s;
        }
        .lightbox-close:hover { background: rgba(255,255,255,.3); }

        .lightbox-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 42px; height: 42px; border-radius: 50%;
          background: rgba(255,255,255,.15); border: none; color: #fff;
          font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background .2s;
        }
        .lightbox-nav:hover { background: rgba(255,255,255,.3); }
        .lightbox-nav--prev { left: 12px; }
        .lightbox-nav--next { right: 12px; }

        .lightbox-caption {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 14px 20px;
          background: linear-gradient(transparent, rgba(0,0,0,.7));
          color: #fff; font-size: 13px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .lightbox-caption__cat {
          font-size: 11px; background: #2b5ce6; padding: 3px 10px;
          border-radius: 20px; letter-spacing: .5px; text-transform: uppercase;
        }

        /* Empty state */
        .gallery-empty {
          text-align: center; padding: 80px 24px; color: #9aaccc;
          font-size: 15px;
        }

        /* Count badge */
        .gallery-count {
          text-align: center; color: #8a9bcc; font-size: 13px;
          margin-bottom: 20px; margin-top: -10px;
        }

        @media (max-width: 600px) {
          .gallery-grid { columns: 2 160px; }
        }
      `}</style>

      <div className="gallery-root">

        {/* Hero */}
        <div className="gallery-hero">
          <p className="gallery-hero__eyebrow">Sandy's Cleaning Service</p>
          <h1 className="gallery-hero__title">Our Work Speaks<br />For Itself</h1>
          <p className="gallery-hero__sub">Browse through real results from our professional cleaning jobs — every home left spotless.</p>
        </div>

        {/* Filters */}
        <div className="gallery-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn${active === cat ? " active" : ""}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="gallery-count">{filtered.length} photo{filtered.length !== 1 ? "s" : ""}</p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="gallery-empty">No photos in this category yet.</div>
        ) : (
          <div className="gallery-grid">
            {filtered.map((img, i) => (
              <div
                key={img.id}
                className={`gallery-item gallery-item--${img.span ?? "normal"}${visible ? " visible" : ""}`}
                style={{ transitionDelay: `${i * 40}ms` }}
                onClick={() => setLightbox(img)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.alt} loading="lazy" />
                <div className="gallery-item__overlay">
                  <span className="gallery-item__label">{img.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox */}
        {lightbox && (
          <div className="lightbox-backdrop" onClick={() => setLightbox(null)}>
            <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lightbox.src} alt={lightbox.alt} />

              <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
              <button className="lightbox-nav lightbox-nav--prev" onClick={() => navigate(-1)}>‹</button>
              <button className="lightbox-nav lightbox-nav--next" onClick={() => navigate(1)}>›</button>

              <div className="lightbox-caption">
                <span>{lightbox.alt}</span>
                <span className="lightbox-caption__cat">{lightbox.category}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}