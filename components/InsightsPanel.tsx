"use client";

import type { AuditInsights, Insight } from "@/lib/types";
import RecommendationCard from "./RecommendationCard";

interface InsightsPanelProps {
    insights: AuditInsights;
}

const SEVERITY_COLOR = {
    critical: { dot: "#ef4444", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.2)", label: "Critical" },
    warning: { dot: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)", label: "Warning" },
    info: { dot: "#6366f1", bg: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.2)", label: "Info" },
};

const CONCERN_LABELS: Record<string, { icon: string; label: string }> = {
    seoStructure: { icon: "◈", label: "SEO Structure" },
    messagingClarity: { icon: "◎", label: "Messaging Clarity" },
    ctaUsage: { icon: "◆", label: "CTA Usage" },
    contentDepth: { icon: "▣", label: "Content Depth" },
    uxConcerns: { icon: "◉", label: "UX Concerns" },
};

function ScoreRing({ score }: { score: number }) {
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    const dash = (score / 100) * circumference;

    const color =
        score >= 75 ? "#10b981" :
            score >= 50 ? "#f59e0b" :
                "#ef4444";

    return (
        <div className="flex flex-col items-center gap-[6px]">
            <svg width="110" height="110" viewBox="0 0 110 110">
                <circle
                    cx="55" cy="55" r={radius}
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="8"
                />
                <circle
                    cx="55" cy="55" r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${dash} ${circumference}`}
                    strokeDashoffset={circumference * 0.25}
                    className="transition-[stroke-dasharray] duration-1000 ease-in-out"
                />
                <text
                    x="55" y="51"
                    textAnchor="middle"
                    className="text-[22px] font-bold fill-[var(--text-primary)] font-mono"
                >
                    {score}
                </text>
                <text
                    x="55" y="66"
                    textAnchor="middle"
                    className="text-[10px] fill-[var(--text-muted)] font-mono"
                >
                    / 100
                </text>
            </svg>
            <span className="text-[11px] text-[var(--text-muted)] font-mono uppercase tracking-[0.08em]">
                Overall Score
            </span>
        </div>
    );
}

function InsightCard({ insight, area }: { insight: Insight; area: string }) {
    const meta = CONCERN_LABELS[area] ?? { icon: "◈", label: area };
    const sev = SEVERITY_COLOR[insight.severity] ?? SEVERITY_COLOR.info;

    return (
        <div
            className="bg-[var(--bg-panel)] rounded-[10px] p-[16px] flex flex-col gap-[10px]"
            style={{ border: `1px solid ${sev.border}` }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-[8px]">
                    <span className="text-[var(--accent)] text-[14px]">{meta.icon}</span>
                    <span className="text-[12px] font-semibold text-[var(--text-secondary)] uppercase tracking-[0.08em] font-mono">
                        {meta.label}
                    </span>
                </div>

                <span
                    className="text-[10px] font-semibold px-[8px] py-[2px] rounded-full font-mono uppercase tracking-[0.05em]"
                    style={{ color: sev.dot, background: sev.bg }}
                >
                    ● {sev.label}
                </span>
            </div>

            <p className="text-[13px] text-[var(--text-primary)] leading-[1.6]">
                {insight.finding}
            </p>

            <div className="flex items-center gap-[8px] px-[10px] py-[8px] bg-[var(--bg-input)] rounded-[6px] border border-[var(--border)]">
                <span className="text-[10px] text-[var(--text-muted)] font-mono">
                    METRIC
                </span>
                <span className="text-[11px] text-[#a5b4fc] font-mono font-semibold">
                    {insight.metricReference}
                </span>
                {insight.metricValue !== null && insight.metricValue !== undefined && (
                    <>
                        <span className="text-[var(--text-muted)] text-[11px]">=</span>
                        <span
                            className="text-[11px] font-mono font-bold"
                            style={{ color: sev.dot }}
                        >
                            {String(insight.metricValue)}
                        </span>
                    </>
                )}
            </div>

            <div className="border-t border-[var(--border)] pt-[10px]">
                <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.08em] font-mono block mb-[4px]">
                    Fix
                </span>
                <p className="text-[13px] text-[var(--text-secondary)] leading-[1.5]">
                    {insight.recommendation}
                </p>
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

export default function InsightsPanel({ insights }: InsightsPanelProps) {
    const insightAreas = [
        "seoStructure",
        "messagingClarity",
        "ctaUsage",
        "contentDepth",
        "uxConcerns",
    ] as const;

    return (
        <div>
            <div className="flex items-center gap-[10px] mb-[20px]">
                <div className="w-[8px] h-[8px] rounded-full bg-[#6366f1]" />
                <h2 className="text-[13px] font-semibold text-[var(--text-secondary)] uppercase tracking-[0.1em] font-mono">
                    AI Analysis
                </h2>
                <span className="text-[10px] text-[var(--text-muted)] font-mono">
                    — Gemini 2.5 Flash
                </span>
            </div>

            <div className="flex gap-[20px] items-center bg-[var(--bg-panel)] border border-[var(--border)] rounded-[12px] p-[20px] mb-[4px]">
                <ScoreRing score={insights.overallScore} />

                <div className="flex-1">
                    <p className="text-[14px] text-[var(--text-primary)] leading-[1.65]">
                        {insights.summary}
                    </p>
                </div>
            </div>

            <SectionLabel>Concern Areas</SectionLabel>
            <div className="flex flex-col gap-[10px]">
                {insightAreas.map((area) => {
                    const insight = insights[area] as Insight;
                    if (!insight) return null;
                    return <InsightCard key={area} insight={insight} area={area} />;
                })}
            </div>

            <SectionLabel>Ranked Recommendations</SectionLabel>
            <div className="flex flex-col gap-[10px]">
                {insights.recommendations
                    .sort((a, b) => a.priority - b.priority)
                    .map((rec, i) => (
                        <RecommendationCard key={i} rec={rec} index={i} />
                    ))}
            </div>
        </div>
    );
}