import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services, getServiceBySlug } from "@/lib/services-data";
import ServicePageClient from "@/src/components/ServicePageClient";
// ── Pre-build all slugs at deploy time ───────────────────────────────────────
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

// ── Per-page SEO metadata ────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} | Sandy's Sparkle Touch`,
    description: service.heroDesc,
  };
}

// ── Page entry point ─────────────────────────────────────────────────────────
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  // Strip the Icon field — functions can't be passed to Client Components
  const { iconName, ...rest } = service;

  return <ServicePageClient service={{ ...rest, iconName }} />;
}