"use client";

import type { PageMetrics } from "@/lib/types";

interface MetricsPanelProps {
    metrics: PageMetrics;
}

type Status = "good" | "warn" | "critical" | "neutral";

const STATUS_COLOR: Record<Status, string> = {
    good: "#10b981",
    warn: "#f59e0b",
    critical: "#ef4444",
    neutral: "#6366f1",
};

const STATUS_BG: Record<Status, string> = {
    good: "rgba(16,185,129,0.08)",
    warn: "rgba(245,158,11,0.08)",
    critical: "rgba(239,68,68,0.08)",
    neutral: "rgba(99,102,241,0.08)",
};

const STATUS_LABEL: Record<Status, string> = {
    good: "Good",
    warn: "Review",
    critical: "Critical",
    neutral: "Info",
};

function MetricCard({
    label,
    value,
    status,
    detail,
}: {
    label: string;
    value: string | number;
    status: Status;
    detail?: string;
}) {
    return (
        <div className="bg-[var(--bg-panel)] border border-[var(--border)] rounded-[10px] p-[16px] flex flex-col gap-[6px] relative overflow-hidden">
            <div
                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[10px]"
                style={{ background: STATUS_COLOR[status] }}
            />

            <span className="text-[11px] text-[var(--text-muted)] uppercase tracking-[0.08em] font-mono">
                {label}
            </span>

            <span className="text-[26px] font-bold text-[var(--text-primary)] leading-none font-mono">
                {value}
            </span>

            <div className="flex items-center justify-between">
                {detail && (
                    <span className="text-[11px] text-[var(--text-muted)]">{detail}</span>
                )}
                <span
                    className="text-[10px] font-semibold px-[8px] py-[2px] rounded-full ml-auto"
                    style={{
                        color: STATUS_COLOR[status],
                        background: STATUS_BG[status],
                    }}
                >
                    {STATUS_LABEL[status]}
                </span>
            </div>
        </div>
    );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-[10px] mb-[12px] mt-[24px]">
            <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-[0.1em] font-mono">
                {children}
            </span>
            <div className="flex-1 h-[1px] bg-[var(--border)]" />
        </div>
    );
}

export default function MetricsPanel({ metrics }: MetricsPanelProps) {
    function titleStatus(): Status {
        if (!metrics.metaTitle) return "critical";
        if (metrics.metaTitleLength < 30 || metrics.metaTitleLength > 70) return "warn";
        return "good";
    }

    function descStatus(): Status {
        if (!metrics.metaDescription) return "critical";
        if (metrics.metaDescriptionLength < 120 || metrics.metaDescriptionLength > 165) return "warn";
        return "good";
    }

    function h1Status(): Status {
        if (metrics.headings.h1 === 0) return "critical";
        if (metrics.headings.h1 > 1) return "warn";
        return "good";
    }

    function h2Status(): Status {
        if (metrics.headings.h2 === 0) return "warn";
        if (metrics.headings.h2 >= 3) return "good";
        return "neutral";
    }

    function wordStatus(): Status {
        if (metrics.wordCount < 300) return "critical";
        if (metrics.wordCount < 800) return "warn";
        return "good";
    }

    function altStatus(): Status {
        if (metrics.missingAltPercent === 0) return "good";
        if (metrics.missingAltPercent > 50) return "critical";
        return "warn";
    }

    function ctaStatus(): Status {
        if (metrics.ctaCount === 0) return "critical";
        if (metrics.ctaCount >= 2) return "good";
        return "warn";
    }

    return (
        <div>
            <div className="flex items-center gap-[10px] mb-[4px]">
                <div className="w-[8px] h-[8px] rounded-full bg-[#10b981]" />
                <h2 className="text-[13px] font-semibold text-[var(--text-secondary)] uppercase tracking-[0.1em] font-mono">
                    Scraped Metrics
                </h2>
                <span className="text-[10px] text-[var(--text-muted)] font-mono">
                    — no AI involved
                </span>
            </div>

            <p className="text-[12px] text-[var(--text-muted)] font-mono mb-[20px] break-all">
                {metrics.url}
            </p>

            <SectionLabel>Content</SectionLabel>
            <div className="grid grid-cols-2 gap-[10px]">
                <MetricCard
                    label="Word Count"
                    value={metrics.wordCount.toLocaleString()}
                    status={wordStatus()}
                    detail="≥800 recommended"
                />
                <MetricCard
                    label="Paragraphs"
                    value={metrics.paragraphCount}
                    status={metrics.paragraphCount >= 5 ? "good" : "warn"}
                    detail="<p> tags"
                />
            </div>

            <SectionLabel>Headings</SectionLabel>
            <div className="grid grid-cols-3 gap-[10px]">
                <MetricCard
                    label="H1 Tags"
                    value={metrics.headings.h1}
                    status={h1Status()}
                    detail="Should be 1"
                />
                <MetricCard
                    label="H2 Tags"
                    value={metrics.headings.h2}
                    status={h2Status()}
                    detail="≥3 is good"
                />
                <MetricCard
                    label="H3 Tags"
                    value={metrics.headings.h3}
                    status="neutral"
                    detail="Supporting"
                />
            </div>

            <SectionLabel>Meta SEO</SectionLabel>
            <div className="grid grid-cols-2 gap-[10px]">
                <MetricCard
                    label="Title Length"
                    value={`${metrics.metaTitleLength} ch`}
                    status={titleStatus()}
                    detail="Ideal: 55–60 chars"
                />
                <MetricCard
                    label="Description Length"
                    value={`${metrics.metaDescriptionLength} ch`}
                    status={descStatus()}
                    detail="Ideal: 150–160 chars"
                />
            </div>

            {metrics.metaTitle && (
                <div className="bg-[var(--bg-input)] border border-[var(--border)] rounded-[8px] px-[14px] py-[10px] mt-[10px]">
                    <span className="text-[10px] text-[var(--text-muted)] font-mono block mb-[4px]">TITLE PREVIEW</span>
                    <span className="text-[13px] text-[#60a5fa]">{metrics.metaTitle}</span>
                </div>
            )}

            {metrics.metaDescription && (
                <div className="bg-[var(--bg-input)] border border-[var(--border)] rounded-[8px] px-[14px] py-[10px] mt-[8px]">
                    <span className="text-[10px] text-[var(--text-muted)] font-mono block mb-[4px]">DESCRIPTION PREVIEW</span>
                    <span className="text-[12px] text-[var(--text-secondary)] leading-[1.5]">
                        {metrics.metaDescription.slice(0, 160)}
                        {metrics.metaDescription.length > 160 && (
                            <span className="text-[var(--danger)]">…</span>
                        )}
                    </span>
                </div>
            )}

            <SectionLabel>Calls to Action</SectionLabel>
            <div className="grid grid-cols-2 gap-[10px]">
                <MetricCard
                    label="CTA Count"
                    value={metrics.ctaCount}
                    status={ctaStatus()}
                    detail="Buttons / links"
                />
                <MetricCard
                    label="Images"
                    value={metrics.imageCount}
                    status="neutral"
                    detail="Total img tags"
                />
            </div>

            {metrics.ctaTexts.length > 0 && (
                <div className="flex flex-wrap gap-[6px] mt-[10px]">
                    {metrics.ctaTexts.map((text, i) => (
                        <span
                            key={i}
                            className="text-[11px] bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.25)] text-[#a5b4fc] px-[10px] py-[3px] rounded-full font-mono"
                        >
                            {text}
                        </span>
                    ))}
                </div>
            )}

            <SectionLabel>Links</SectionLabel>
            <div className="grid grid-cols-2 gap-[10px]">
                <MetricCard
                    label="Internal Links"
                    value={metrics.links.internal}
                    status={metrics.links.internal >= 3 ? "good" : metrics.links.internal === 0 ? "critical" : "warn"}
                    detail="Same domain"
                />
                <MetricCard
                    label="External Links"
                    value={metrics.links.external}
                    status={metrics.links.external > 20 ? "warn" : "neutral"}
                    detail="Other domains"
                />
            </div>

            <SectionLabel>Image Accessibility</SectionLabel>
            <div className="grid grid-cols-3 gap-[10px]">
                <MetricCard
                    label="With Alt"
                    value={metrics.imagesWithAlt}
                    status="good"
                />
                <MetricCard
                    label="Missing Alt"
                    value={metrics.imagesMissingAlt}
                    status={metrics.imagesMissingAlt === 0 ? "good" : metrics.imagesMissingAlt > 5 ? "critical" : "warn"}
                />
                <MetricCard
                    label="Missing %"
                    value={`${metrics.missingAltPercent}%`}
                    status={altStatus()}
                    detail="0% = perfect"
                />
            </div>
        </div>
    );
}