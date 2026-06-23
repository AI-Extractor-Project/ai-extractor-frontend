"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MetricsPanel from "@/components/MetricsPanel";
import InsightsPanel from "@/components/InsightsPanel";
import { useAuditStore } from "@/store/useAuditStore";

export default function ResultsPage() {
    const router = useRouter();
    const { status, metrics, insights, url, reset } = useAuditStore();

    useEffect(() => {
        if (status !== "success" || !metrics || !insights) {
            router.replace("/");
        }
    }, [status, metrics, insights, router]);

    if (!metrics || !insights) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-[var(--bg-base)]">
                <p className="text-[var(--text-muted)] font-mono">
                    Redirecting…
                </p>
            </main>
        );
    }

    function handleNewAudit() {
        reset();
        router.push("/");
    }

    const auditDate = new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <main className="min-h-screen bg-[var(--bg-base)] pb-[60px]">
            <div className="border-b border-[var(--border)] bg-[rgba(10,15,30,0.9)] backdrop-blur-[12px] sticky top-0 z-50">
                <div className="max-w-[1280px] mx-auto px-[24px] py-[12px] flex items-center gap-[12px]">
                    <span className="font-mono text-[var(--accent)] font-bold text-[14px] shrink-0">
                        &gt;_ seo-audit
                    </span>

                    <div className="w-[1px] h-[16px] bg-[var(--border)]" />

                    <span className="font-mono text-[12px] text-[var(--text-secondary)] overflow-hidden text-ellipsis whitespace-nowrap flex-1">
                        {url || metrics.url}
                    </span>

                    <span className="text-[11px] text-[var(--text-muted)] font-mono shrink-0">
                        {auditDate}
                    </span>

                    <button
                        onClick={handleNewAudit}
                        className="flex items-center gap-[6px] px-[14px] py-[6px] bg-[var(--bg-panel)] border border-[var(--border)] rounded-[6px] text-[var(--text-secondary)] text-[12px] font-mono cursor-pointer shrink-0 transition-colors duration-150 hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
                    >
                        ← New Audit
                    </button>
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto px-[24px] py-[32px]">
                <div className="mb-[28px]">
                    <h1 className="text-[22px] font-bold text-[var(--text-primary)] mb-[4px]">
                        Audit Report
                    </h1>
                    <p className="text-[13px] text-[var(--text-muted)] font-mono">
                        Metrics are scraped facts · Insights are AI analysis grounded in those metrics
                    </p>
                </div>

                <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-[24px] items-start">
                    <div className="bg-[var(--bg-panel)] border border-[var(--border)] rounded-[14px] p-[24px] sticky top-[72px]">
                        <MetricsPanel metrics={metrics} />
                    </div>

                    <div className="bg-[var(--bg-panel)] border border-[rgba(99,102,241,0.2)] rounded-[14px] p-[24px]">
                        <InsightsPanel insights={insights} />
                    </div>
                </div>

                <div className="mt-[32px] flex justify-center gap-[12px]">
                    <button
                        onClick={handleNewAudit}
                        className="px-[24px] py-[10px] bg-[var(--accent)] text-white border-none rounded-[8px] text-[14px] font-semibold cursor-pointer font-sans"
                    >
                        Audit another page
                    </button>

                    <Link
                        href="/history"
                        className="px-[24px] py-[10px] bg-[var(--bg-panel)] text-[var(--text-secondary)] border border-[var(--border)] rounded-[8px] text-[14px] font-medium no-underline font-sans"
                    >
                        View history
                    </Link>
                </div>
            </div>
        </main>
    );
}