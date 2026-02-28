'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// ── Default logo (replace with real SVG when available) ──────────────────
function SparkLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group select-none">
      {/* Placeholder SVG mark — swap with real asset */}
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="36" rx="10" fill="#3B4FCC" />
        <path
          d="M18 6l2.5 7.5H28l-6.25 4.58 2.5 7.5L18 21l-6.25 4.58 2.5-7.5L8 11.5h7.5L18 6z"
          fill="white"
          opacity="0.95"
        />
        <circle cx="18" cy="30" r="1.5" fill="white" opacity="0.6" />
      </svg>
      <div className="flex flex-col leading-none">
        <span
          className="font-bold text-gray-900 tracking-tight group-hover:text-[#3B4FCC] transition-colors duration-200"
          style={{ fontSize: '1.1rem', fontFamily: 'Poppins, sans-serif' }}
        >
          Sandy's
        </span>
        <span
          className="font-semibold text-[#3B4FCC] tracking-widest uppercase"
          style={{ fontSize: '0.6rem', fontFamily: 'Poppins, sans-serif', letterSpacing: '0.18em' }}
        >
          Sparkle Touch
        </span>
      </div>
    </Link>
  );
}

// ── Services dropdown items ──────────────────────────────────────────────
const services = [
  {
    label: 'Residential Cleaning',
    href: '/services/residential',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    desc: 'Regular home cleaning packages',
  },
  {
    label: 'Commercial Cleaning',
    href: '/services/commercial',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    desc: 'Offices, retail & workspaces',
  },
  {
    label: 'Deep Cleaning',
    href: '/services/deep-cleaning',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    desc: 'Thorough top-to-bottom clean',
  },
  {
    label: 'Move-In/Out Cleaning',
    href: '/services/move-in-out',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12H19M12 5l7 7-7 7" />
      </svg>
    ),
    desc: 'Fresh start for every transition',
  },
];

const navLinks = [
  { label: 'Book', href: '/book' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

// ── Chevron ──────────────────────────────────────────────────────────────
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform duration-200"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

// ── Main Navbar ──────────────────────────────────────────────────────────
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);

  // Shadow on scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        servicesButtonRef.current && !servicesButtonRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const linkCls = `relative text-gray-600 hover:text-[#3B4FCC] font-medium transition-colors duration-200 after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-[#3B4FCC] after:transition-all after:duration-200 hover:after:w-full`;

  return (
    <>
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');`}</style>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_24px_rgba(59,79,204,0.09)] border-b border-gray-100'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <SparkLogo />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {/* Book link — highlighted */}
              <Link
                href="/book"
                className="font-semibold text-[#3B4FCC] hover:text-[#2f42b8] transition-colors duration-200 relative after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-[#3B4FCC] after:transition-all after:duration-200 hover:after:w-full"
                style={{ fontSize: '1rem' }}
              >
                Book
              </Link>

              <Link href="/about" className={linkCls} style={{ fontSize: '1rem' }}>About</Link>

              {/* Services Dropdown */}
              <div className="relative">
                <button
                  ref={servicesButtonRef}
                  onClick={() => setServicesOpen(o => !o)}
                  onMouseEnter={() => setServicesOpen(true)}
                  className={`flex items-center gap-1 ${linkCls}`}
                  style={{ fontSize: '1rem' }}
                  aria-expanded={servicesOpen}
                >
                  Services
                  <Chevron open={servicesOpen} />
                </button>

                {/* Dropdown panel */}
                <div
                  ref={dropdownRef}
                  onMouseLeave={() => setServicesOpen(false)}
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[360px] bg-white rounded-2xl shadow-[0_8px_40px_rgba(59,79,204,0.13)] border border-gray-100 overflow-hidden transition-all duration-200 origin-top ${
                    servicesOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  {/* Decorative top accent */}
                  <div className="h-1 bg-gradient-to-r from-[#3B4FCC] via-[#6675e0] to-[#3B4FCC]" />
                  <div className="p-3">
                    {services.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={() => setServicesOpen(false)}
                        className="flex items-start gap-3.5 px-4 py-3 rounded-xl hover:bg-[#EEF2FF] group transition-colors duration-150"
                      >
                        <span className="mt-0.5 text-[#3B4FCC] group-hover:scale-110 transition-transform duration-150 shrink-0">
                          {s.icon}
                        </span>
                        <div>
                          <p className="font-semibold text-gray-800 group-hover:text-[#3B4FCC] transition-colors" style={{ fontSize: '0.95rem' }}>
                            {s.label}
                          </p>
                          <p className="text-gray-400 mt-0.5" style={{ fontSize: '0.82rem' }}>{s.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="px-5 py-3 bg-[#f8f9ff] border-t border-gray-100">
                    <Link
                      href="/services"
                      onClick={() => setServicesOpen(false)}
                      className="text-[#3B4FCC] font-semibold hover:underline flex items-center gap-1"
                      style={{ fontSize: '0.88rem' }}
                    >
                      View all services
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </Link>
                  </div>
                </div>
              </div>

              <Link href="/gallery" className={linkCls} style={{ fontSize: '1rem' }}>Gallery</Link>
              <Link href="/blog" className={linkCls} style={{ fontSize: '1rem' }}>Blog</Link>
              <Link href="/contact" className={linkCls} style={{ fontSize: '1rem' }}>Contact</Link>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 bg-[#3B4FCC] hover:bg-[#2f42b8] active:scale-[.97] transition-all duration-150 text-white font-semibold rounded-xl px-5 py-2.5 shadow-[0_4px_14px_rgba(59,79,204,0.3)] hover:shadow-[0_6px_20px_rgba(59,79,204,0.4)]"
                style={{ fontSize: '0.95rem' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Book Now
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden flex flex-col gap-[5px] p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <span className={`block h-[2px] w-6 bg-gray-700 rounded transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block h-[2px] w-6 bg-gray-700 rounded transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-[2px] w-6 bg-gray-700 rounded transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
          style={{ background: 'white', borderTop: mobileOpen ? '1px solid #f0f0f0' : 'none' }}
        >
          <div className="px-4 py-4 space-y-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {/* Book */}
            <Link
              href="/book"
              className="flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-[#3B4FCC] hover:bg-[#EEF2FF] transition-colors"
              onClick={() => setMobileOpen(false)}
              style={{ fontSize: '1.05rem' }}
            >
              Book
            </Link>

            <Link href="/about" className="flex items-center px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setMobileOpen(false)} style={{ fontSize: '1.05rem' }}>
              About
            </Link>

            {/* Mobile Services accordion */}
            <div>
              <button
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setMobileServicesOpen(o => !o)}
                style={{ fontSize: '1.05rem' }}
              >
                Services
                <Chevron open={mobileServicesOpen} />
              </button>
              <div className={`overflow-hidden transition-all duration-200 ${mobileServicesOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-[#EEF2FF] pl-4">
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-gray-600 hover:text-[#3B4FCC] hover:bg-[#EEF2FF] transition-colors"
                      onClick={() => { setMobileOpen(false); setMobileServicesOpen(false); }}
                      style={{ fontSize: '0.98rem' }}
                    >
                      <span className="text-[#3B4FCC] opacity-80">{s.icon}</span>
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/gallery" className="flex items-center px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setMobileOpen(false)} style={{ fontSize: '1.05rem' }}>Gallery</Link>
            <Link href="/blog" className="flex items-center px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setMobileOpen(false)} style={{ fontSize: '1.05rem' }}>Blog</Link>
            <Link href="/contact" className="flex items-center px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setMobileOpen(false)} style={{ fontSize: '1.05rem' }}>Contact</Link>

            {/* Mobile CTA */}
            <div className="pt-2 pb-1">
              <Link
                href="/book"
                className="flex items-center justify-center gap-2 bg-[#3B4FCC] text-white font-semibold rounded-xl py-3 shadow-md hover:bg-[#2f42b8] transition-colors"
                onClick={() => setMobileOpen(false)}
                style={{ fontSize: '1.1rem' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer so page content doesn't hide behind fixed nav */}
      <div style={{ height: '72px' }} />
    </>
  );
}