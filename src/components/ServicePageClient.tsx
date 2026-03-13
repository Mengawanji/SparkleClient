"use client";

import { useState } from "react";
import Link from "next/link";
import type { Service } from "@/lib/services-data";
import {
  House,
  Monitor,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Star,
  Phone,
  CalendarCheck,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>> = {
  house: House,
  monitor: Monitor,
  sparkles: Sparkles,
  "arrow-right": ArrowRight,
};

export default function ServicePageClient({ service }: { service: Service }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const Icon = ICON_MAP[service.iconName] ?? House;

  return (
    <main
      className="min-h-screen font-sans"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-6 py-24 md:py-36"
        style={{ background: service.accentColor }}
      >
        {/* decorative circles */}
        <div
          className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20"
          style={{ background: "rgba(255,255,255,0.3)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-10"
          style={{ background: "rgba(255,255,255,0.5)" }}
        />

        <div className="relative max-w-4xl mx-auto text-white">
          {/* breadcrumb */}
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm opacity-70 hover:opacity-100 transition-opacity mb-8"
          >
            <ArrowRight size={14} className="rotate-180" />
            Back to Home
          </Link>

          {/* icon badge */}
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >
            <Icon size={32} color="white" strokeWidth={1.5} />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            {service.title}
          </h1>
          <p className="text-lg md:text-2xl opacity-80 mb-4 font-light">
            {service.tagline}
          </p>
          <p className="text-base md:text-lg opacity-70 max-w-2xl leading-relaxed">
            {service.heroDesc}
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm bg-white transition-all hover:scale-105 hover:shadow-xl"
              style={{ color: service.accentColor }}
            >
              <CalendarCheck size={16} />
              Book This Service
            </Link>
            <a
              href="tel:+15195771711"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm border-2 border-white/40 text-white hover:border-white transition-all"
            >
              <Phone size={16} />
              Call Us
            </a>
          </div>
        </div>
      </section>

      {/* ── What We Clean ─────────────────────────────────────────────────── */}
      <section className="px-6 py-20" style={{ background: service.accentLight }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ color: service.accentColor }}
          >
            What We Clean
          </h2>
          <p className="text-gray-500 mb-10 text-sm">
            Every visit covers the following areas, thoroughly.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {service.whatWeClean.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100"
              >
                <CheckCircle2 size={18} style={{ color: service.accentColor }} />
                <span className="text-sm font-medium text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────────────── */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ color: service.accentColor }}
          >
            Why Choose Us
          </h2>
          <p className="text-gray-500 mb-10 text-sm">
            The Sandy's Sparkle Touch difference.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {service.features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                style={{ borderLeft: `4px solid ${service.accentColor}` }}
              >
                <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────────────── */}
      <section className="px-6 py-20" style={{ background: service.accentLight }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ color: service.accentColor }}
          >
            Pricing
          </h2>
          <p className="text-gray-500 mb-10 text-sm">
            Simple, transparent pricing. No surprises.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {service.pricing.map((tier, i) => (
              <div
                key={tier.label}
                className={`rounded-2xl p-7 flex flex-col gap-4 transition-all hover:scale-[1.02] ${
                  i === 1
                    ? "text-white shadow-2xl scale-[1.03]"
                    : "bg-white border border-gray-100 shadow-sm text-gray-900"
                }`}
                style={i === 1 ? { background: service.accentColor } : {}}
              >
                <div>
                  <p
                    className={`text-xs font-bold uppercase tracking-widest mb-1 ${
                      i === 1 ? "text-white/60" : "text-gray-400"
                    }`}
                  >
                    {tier.label}
                  </p>
                  <p className="text-4xl font-extrabold">{tier.price}</p>
                  {tier.price !== "Custom" && (
                    <p className={`text-xs mt-0.5 ${i === 1 ? "text-white/60" : "text-gray-400"}`}>
                      per visit
                    </p>
                  )}
                </div>
                <ul className="space-y-2 flex-1">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm">
                      <Star
                        size={13}
                        className={`mt-0.5 flex-shrink-0 ${i === 1 ? "text-yellow-300" : ""}`}
                        style={i !== 1 ? { color: service.accentColor } : {}}
                        fill="currentColor"
                      />
                      {perk}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`text-center text-sm font-semibold py-3 px-5 rounded-full transition-all hover:opacity-90 ${
                    i === 1
                      ? "bg-white"
                      : "border-2"
                  }`}
                  style={
                    i === 1
                      ? { color: service.accentColor }
                      : { borderColor: service.accentColor, color: service.accentColor }
                  }
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ color: service.accentColor }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 mb-10 text-sm">
            Got questions? We've got answers.
          </p>
          <div className="space-y-3">
            {service.faq.map((item, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                >
                  {item.q}
                  {openFaq === i ? (
                    <ChevronUp size={18} style={{ color: service.accentColor }} />
                  ) : (
                    <ChevronDown size={18} className="text-gray-400" />
                  )}
                </button>
                {openFaq === i && (
                  <div
                    className="px-6 pb-5 text-sm text-gray-500 leading-relaxed border-t"
                    style={{ borderColor: service.accentLight }}
                  >
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <section
        className="px-6 py-20 text-white text-center"
        style={{ background: service.accentColor }}
      >
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for a Sparkle-Clean Space?
          </h2>
          <p className="opacity-75 mb-8 text-base">
            Book your {service.title.toLowerCase()} today and experience the Sandy's Sparkle Touch difference.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm bg-white transition-all hover:scale-105 hover:shadow-2xl"
            style={{ color: service.accentColor }}
          >
            <CalendarCheck size={16} />
            Book Now — It's Easy
          </Link>
        </div>
      </section>
    </main>
  );
}