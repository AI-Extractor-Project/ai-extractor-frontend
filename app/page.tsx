"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuditForm from "@/components/AuditForm";
import { useAuditStore } from "@/store/useAuditStore";

export default function HomePage() {
  const router = useRouter();
  const { status, error, runAudit } = useAuditStore();

  useEffect(() => {
    if (status === "success") {
      router.push("/results");
    }
  }, [status, router]);

  async function handleSubmit(url: string) {
    console.log("entered url", url);
    await runAudit(url);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-[16px] py-[24px] relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <div
        aria-hidden
        className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)",
        }}
      />
      <div className="relative w-full max-w-[580px] z-10">
        <div className="animate-fade-up flex justify-center mb-[28px]">
          <span className="inline-flex items-center gap-[6px] bg-[rgba(99,102,241,0.12)] border border-[rgba(99,102,241,0.3)] text-[var(--accent-hover)] text-[12px] font-medium px-[14px] py-[5px] rounded-[100px] font-mono tracking-[0.04em]">
            <span className="w-[6px] h-[6px] rounded-full bg-[var(--accent)] inline-block" />
            AI-POWERED · GEMINI 2.5 FLASH
          </span>
        </div>

        <div className="animate-fade-up animate-fade-up-delay-1 text-center mb-[12px]">
          <h1 className="text-[clamp(32px,6vw,52px)] font-bold leading-[1.1] tracking-[-0.03em] text-[var(--text-primary)]">
            Audit any page.
            <br />
            <span className="text-transparent bg-clip-text" style={{ background: "linear-gradient(135deg, #6366f1 0%, #818cf8 50%, #a5b4fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Fix what matters.
            </span>
          </h1>
        </div>

        <div className="animate-fade-up animate-fade-up-delay-2 text-center mb-[40px]">
          <p className="text-[var(--text-secondary)] text-[16px] leading-[1.6] max-w-[400px] mx-auto">
            Paste a URL. Get structured SEO metrics, AI insights grounded
            in real numbers, and ranked recommendations.
          </p>
        </div>

        <div className="animate-fade-up animate-fade-up-delay-3">
          <AuditForm
            onSubmit={handleSubmit}
            isLoading={status === "loading"}
            error={error}
          />
        </div>

        <div className="flex justify-center flex-wrap gap-[8px] mt-[36px]">
          {[
            { icon: "◈", label: "12 SEO Metrics" },
            { icon: "◎", label: "AI Insights" },
            { icon: "◆", label: "Ranked Actions" },
          ].map(({ icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-[6px] bg-[var(--bg-panel)] border border-[var(--border)] text-[var(--text-secondary)] text-[12px] px-[12px] py-[6px] rounded-[6px] font-mono"
            >
              <span className="text-[var(--accent)] text-[10px]">{icon}</span>
              {label}
            </span>
          ))}
        </div>
      </div>

      <p className="absolute bottom-[20px] text-[var(--text-muted)] text-[11px] font-mono">
        Built with Next.js · Express · Gemini 2.5 Flash
      </p>
    </main>
  );
}