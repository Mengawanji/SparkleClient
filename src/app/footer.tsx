import Link from 'next/link';

// ── Logo (same default as Navbar) ────────────────────────────────────────
function FooterLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group w-fit">
      <svg width="38" height="38" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="36" rx="10" fill="white" fillOpacity="0.12" />
        <rect width="36" height="36" rx="10" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
        <path
          d="M18 6l2.5 7.5H28l-6.25 4.58 2.5 7.5L18 21l-6.25 4.58 2.5-7.5L8 11.5h7.5L18 6z"
          fill="white"
          opacity="0.95"
        />
        <circle cx="18" cy="30" r="1.5" fill="white" opacity="0.5" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-bold text-white tracking-tight" style={{ fontSize: '1.1rem' }}>Sandy's</span>
        <span className="font-semibold text-white/60 uppercase tracking-widest" style={{ fontSize: '0.58rem', letterSpacing: '0.18em' }}>Sparkle Touch</span>
      </div>
    </Link>
  );
}

// ── Social Icons ─────────────────────────────────────────────────────────
const socials = [
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.15a8.16 8.16 0 0 0 4.77 1.52V7.23a4.85 4.85 0 0 1-1-.54z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

// ── Payment method pill ──────────────────────────────────────────────────
function PaymentBadge({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 text-white/70 rounded-lg px-2.5 py-1.5"
      title={label}
      style={{ fontSize: '0.75rem', fontFamily: 'Poppins, sans-serif' }}
    >
      {children}
      <span>{label}</span>
    </span>
  );
}

// ── Footer columns config ────────────────────────────────────────────────
const columns = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Press', href: '/press' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Residential Cleaning', href: '/services/residential' },
      { label: 'Commercial Cleaning', href: '/services/commercial' },
      { label: 'Deep Cleaning', href: '/services/deep-cleaning' },
      { label: 'Move-In/Out Cleaning', href: '/services/move-in-out' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cancellation Policy', href: '/cancellation' },
    ],
  },
  {
    title: 'Service Area',
    links: [
      { label: 'London, Ontario', href: '/areas/london-ontario' },
      { label: 'Quebec', href: '/areas/quebec' },
      { label: 'Manitoba', href: '/areas/manitoba' },
      { label: 'Nova Scotia', href: '/areas/nova-scotia' },
    ],
  },
];

// ── Main Footer ──────────────────────────────────────────────────────────
export function Footer() {
  return (
    <>
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');`}</style>

      <footer
        style={{
          background: 'linear-gradient(160deg, #0d1340 0%, #1a2466 55%, #0d1340 100%)',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        {/* Top wave divider */}
        <div className="overflow-hidden leading-[0]">
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '40px' }} fill="white">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,0 L0,0 Z" />
          </svg>
        </div>

        {/* Main content */}
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 pt-14 pb-10">

          {/* Top section: logo + tagline + newsletter */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 pb-12 border-b border-white/10">
            {/* Brand */}
            <div className="max-w-xs">
              <FooterLogo />
              <p className="mt-4 text-white/55 leading-relaxed" style={{ fontSize: '0.95rem' }}>
                Professional cleaning services across Canada. Making your space shine, one clean at a time.
              </p>
              {/* Rating chip */}
              <div className="mt-5 inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2">
                <span className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#fbbf24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </span>
                <span className="text-white/70 font-medium" style={{ fontSize: '0.82rem' }}>4.9 · 800+ reviews</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="max-w-sm w-full">
              <p className="text-white font-semibold mb-1" style={{ fontSize: '1rem' }}>Stay in the loop</p>
              <p className="text-white/50 mb-3" style={{ fontSize: '0.88rem' }}>Get cleaning tips, promos & updates.</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 min-w-0 rounded-xl px-4 bg-white/10 border border-white/20 text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-[#6675e0] transition"
                  style={{ fontSize: '0.95rem', height: '2.75rem' }}
                />
                <button
                  type="submit"
                  className="shrink-0 bg-[#3B4FCC] hover:bg-[#2f42b8] text-white font-semibold rounded-xl px-5 transition-colors"
                  style={{ fontSize: '0.9rem', height: '2.75rem' }}
                >
                  Subscribe
                </button>
              </form>
              <p className="text-white/30 mt-2" style={{ fontSize: '0.78rem' }}>No spam, ever. Unsubscribe anytime.</p>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-12 border-b border-white/10">
            {columns.map((col) => (
              <div key={col.title}>
                <p
                  className="text-white font-semibold mb-5 uppercase tracking-widest"
                  style={{ fontSize: '0.72rem', letterSpacing: '0.15em' }}
                >
                  {col.title}
                </p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-white/55 hover:text-white transition-colors duration-150 leading-snug"
                        style={{ fontSize: '0.95rem' }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom strip */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Copyright */}
            <p className="text-white/40 order-3 md:order-1" style={{ fontSize: '0.88rem' }}>
              © 2026 Sandy's Sparkle Touch. All rights reserved.
            </p>

            {/* Payment methods */}
            <div className="flex flex-wrap items-center gap-2 justify-center order-2">
              {/* Visa */}
              <PaymentBadge label="Visa">
                <svg width="22" height="14" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="38" height="24" rx="4" fill="#1A1F71" fillOpacity="0" />
                  <path d="M15.6 16.8H13.1L14.6 7.2H17.1L15.6 16.8Z" fill="#fff" />
                  <path d="M24.1 7.4C23.6 7.2 22.8 7 21.8 7C19.4 7 17.7 8.2 17.7 9.9C17.7 11.2 18.9 11.9 19.8 12.4C20.7 12.9 21 13.2 21 13.6C21 14.2 20.3 14.5 19.6 14.5C18.6 14.5 18 14.3 17.2 14L16.9 13.8L16.6 16C17.2 16.3 18.3 16.5 19.4 16.5C22 16.5 23.6 15.3 23.6 13.5C23.6 12.5 23 11.8 21.7 11.2C20.9 10.7 20.4 10.4 20.4 10C20.4 9.6 20.8 9.2 21.7 9.2C22.5 9.2 23.1 9.4 23.5 9.6L23.7 9.7L24.1 7.4Z" fill="#fff" />
                  <path d="M27.3 13.5C27.5 12.9 28.4 10.4 28.4 10.4C28.4 10.4 28.6 9.9 28.7 9.5L28.9 10.3C28.9 10.3 29.5 12.9 29.6 13.5H27.3ZM31.3 7.2H29.3C28.7 7.2 28.3 7.4 28 8L24.4 16.8H27L27.5 15.3H30.6C30.7 15.7 31 16.8 31 16.8H33.3L31.3 7.2Z" fill="#fff" />
                  <path d="M12.7 7.2L10.3 13.6L10 12.4C9.5 10.8 8 9.1 6.3 8.2L8.5 16.8H11.2L15.4 7.2H12.7Z" fill="#fff" />
                  <path d="M7.7 7.2H3.7L3.6 7.4C6.7 8.2 8.8 10 9.7 12.2L8.7 8.1C8.6 7.4 8.2 7.2 7.7 7.2Z" fill="#FFAA00" />
                </svg>
              </PaymentBadge>

              {/* Mastercard */}
              <PaymentBadge label="Mastercard">
                <svg width="22" height="14" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="14" cy="12" r="8" fill="#EB001B" fillOpacity="0.85" />
                  <circle cx="24" cy="12" r="8" fill="#F79E1B" fillOpacity="0.85" />
                  <path d="M19 6.2a8 8 0 0 1 0 11.6A8 8 0 0 1 19 6.2z" fill="#FF5F00" fillOpacity="0.85" />
                </svg>
              </PaymentBadge>

              {/* PayPal */}
              <PaymentBadge label="PayPal">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#60a5fa' }}>
                  <path d="M7.6 20.9H5.2l.6-3.4h2.3c1.5 0 2.7-.8 3-2.1.3-1.4-.6-2.2-2-2.2H7.2l1.4-7.9H12c4.3 0 6.3 2.1 5.5 5.7-.6 2.8-2.8 4.7-5.7 4.7H10l-.5 3.1-.3 2.1z" />
                </svg>
              </PaymentBadge>

              {/* E-Transfer */}
              <PaymentBadge label="e-Transfer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#34d399' }}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </PaymentBadge>

              {/* Cash */}
              <PaymentBadge label="Cash">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fbbf24' }}>
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M6 12h.01M18 12h.01" />
                </svg>
              </PaymentBadge>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2 order-1 md:order-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 border border-white/15 text-white/60 hover:text-white hover:bg-[#3B4FCC] hover:border-[#3B4FCC] transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}