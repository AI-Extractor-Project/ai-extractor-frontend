"use client";

import type { Recommendation } from "@/lib/types";

interface RecommendationCardProps {
    rec: Recommendation;
    index: number;
}

const EFFORT_COLOR = {
    low: { text: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)" },
    medium: { text: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)" },
    high: { text: "#ef4444", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.2)" },
};

const PRIORITY_GLOW: Record<number, string> = {
    1: "rgba(239,68,68,0.15)",
    2: "rgba(245,158,11,0.1)",
    3: "rgba(99,102,241,0.1)",
    4: "rgba(99,102,241,0.08)",
    5: "rgba(99,102,241,0.05)",
};

const PRIORITY_BORDER: Record<number, string> = {
    1: "rgba(239,68,68,0.3)",
    2: "rgba(245,158,11,0.25)",
    3: "rgba(99,102,241,0.25)",
    4: "var(--border)",
    5: "var(--border)",
};

export default function RecommendationCard({ rec, index }: RecommendationCardProps) {
    const effort = EFFORT_COLOR[rec.effort] ?? EFFORT_COLOR.medium;
    const priorityNum = rec.priority ?? index + 1;
    const glowBg = PRIORITY_GLOW[priorityNum] ?? "rgba(99,102,241,0.05)";
    const borderCol = PRIORITY_BORDER[priorityNum] ?? "var(--border)";

    return (
        <div
            className="rounded-[10px] px-[18px] py-[16px] flex gap-[14px] items-start"
            style={{
                background: `linear-gradient(135deg, ${glowBg} 0%, var(--bg-panel) 60%)`,
                border: `1px solid ${borderCol}`,
            }}
        >
            <div
                className="w-[32px] h-[32px] rounded-[8px] flex items-center justify-center shrink-0 font-mono font-bold text-[14px]"
                style={{
                    background: priorityNum === 1 ? "rgba(239,68,68,0.15)" : "rgba(99,102,241,0.12)",
                    border: `1px solid ${priorityNum === 1 ? "rgba(239,68,68,0.3)" : "rgba(99,102,241,0.25)"}`,
                    color: priorityNum === 1 ? "#ef4444" : "#6366f1",
                }}
            >
                {priorityNum}
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-[8px] mb-[6px]">
                    <p className="text-[14px] font-semibold text-[var(--text-primary)] leading-[1.4]">
                        {rec.action}
                    </p>

                    <span
                        className="text-[10px] font-semibold px-[8px] py-[2px] rounded-[100px] shrink-0 font-mono uppercase tracking-[0.05em]"
                        style={{
                            color: effort.text,
                            background: effort.bg,
                            border: `1px solid ${effort.border}`,
                        }}
                    >
                        {rec.effort} effort
                    </span>
                </div>

                <p className="text-[13px] text-[var(--text-secondary)] leading-[1.6] mb-[8px]">
                    {rec.reasoning}
                </p>

                <span className="inline-flex items-center gap-[5px] text-[11px] text-[var(--text-muted)] font-mono bg-[var(--bg-input)] border border-[var(--border)] px-[8px] py-[2px] rounded-[4px]">
                    <span className="text-[var(--accent)]">metric:</span>
                    {rec.metricRef}
                </span>
            </div>
        </div>
    );
}