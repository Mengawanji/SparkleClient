'use client';

import React from "react";

const services = [
  {
    title: "House Cleaning",
    description:
      "Buscipit tincidunt duis antino gravidia tellusy nascetur neque vulpuits pointings scelerisque ultrces muscle mass pers order commounication pointing.",
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="56" height="56" rx="28" fill="#EEF2FF"/>
        <g stroke="#3B4FCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M18 28h2v10h16V28h2l-10-9-10 9z"/>
          <path d="M24 38v-6h8v6"/>
          <path d="M34 20v-2h3v5"/>
          <path d="M36 24l2-2M32 16l2 2M28 22c1-1 3-1 3 1"/>
          <circle cx="36" cy="21" r="1" fill="#3B4FCC"/>
        </g>
      </svg>
    ),
  },
  {
    title: "Kitchen Cleaning",
    description:
      "Buscipit tincidunt duis antino gravidia tellusy nascetur neque vulpuits pointings scelerisque ultrces muscle mass pers order commounication pointing.",
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="56" height="56" rx="28" fill="#EEF2FF"/>
        <g stroke="#3B4FCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="16" y="26" width="24" height="14" rx="1"/>
          <path d="M16 30h24"/>
          <path d="M22 26v-4a4 4 0 018 0v4"/>
          <circle cx="26" cy="34" r="2"/>
          <path d="M34 16l2-2M36 20l2-2M32 18l2-2"/>
        </g>
      </svg>
    ),
  },
  {
    title: "Office Cleaning",
    description:
      "Buscipit tincidunt duis antino gravidia tellusy nascetur neque vulpuits pointings scelerisque ultrces muscle mass pers order commounication pointing.",
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="56" height="56" rx="28" fill="#EEF2FF"/>
        <g stroke="#3B4FCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <circle cx="28" cy="22" r="5"/>
          <path d="M18 40c0-5.5 4.5-10 10-10s10 4.5 10 10"/>
          <path d="M33 20c1.5-1 4-1 4 2v3l-2 1"/>
          <path d="M36 26l2 2M34 28l1 3"/>
        </g>
      </svg>
    ),
  },
  {
    title: "Window Cleaning",
    description:
      "Buscipit tincidunt duis antino gravidia tellusy nascetur neque vulpuits pointings scelerisque ultrces muscle mass pers order commounication pointing.",
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="56" height="56" rx="28" fill="#EEF2FF"/>
        <g stroke="#3B4FCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="17" y="17" width="22" height="22" rx="1"/>
          <path d="M17 28h22"/>
          <path d="M28 17v22"/>
          <path d="M14 20l3 2M14 26l3 1M14 32l3-1"/>
          <path d="M37 38l3 2"/>
        </g>
      </svg>
    ),
  },
  {
    title: "Residential Cleaning",
    description:
      "Buscipit tincidunt duis antino gravidia tellusy nascetur neque vulpuits pointings scelerisque ultrces muscle mass pers order commounication pointing.",
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="56" height="56" rx="28" fill="#EEF2FF"/>
        <g stroke="#3B4FCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="17" y="18" width="22" height="22" rx="1"/>
          <path d="M22 18v22M17 24h22M17 30h22M17 36h22"/>
          <path d="M27 18v6M32 18v6"/>
        </g>
      </svg>
    ),
  },
  {
    title: "Carpet Cleaning",
    description:
      "Buscipit tincidunt duis antino gravidia tellusy nascetur neque vulpuits pointings scelerisque ultrces muscle mass pers order commounication pointing.",
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="56" height="56" rx="28" fill="#EEF2FF"/>
        <g stroke="#3B4FCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M16 38l6-6 4 4 4-4 6 6"/>
          <path d="M20 30a4 4 0 118 0"/>
          <path d="M36 26l2-4M34 24l-2-4M32 28l4-2"/>
          <circle cx="34" cy="22" r="2"/>
        </g>
      </svg>
    ),
  },
];

export default function ServicesSection() {
  return (
    <section
      style={{
        padding: "64px 0",
        background: "#fff",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "80rem",
          margin: "0 auto",
          padding: "0 1rem",
        }}
        className="sm:px-6 lg:px-8"
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "48px",
            color: "#111827",
          }}
        >
          Our Cleaning Services
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {services.map((service) => (
            <div
              key={service.title}
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "36px 32px",
                transition: "box-shadow 0.2s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(0,0,0,0.10)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ marginBottom: "24px" }}>{service.icon}</div>
              <h3
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "700",
                  color: "#111827",
                  marginBottom: "12px",
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  fontSize: "1rem",
                  color: "#6b7280",
                  lineHeight: "1.7",
                  margin: 0,
                }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}