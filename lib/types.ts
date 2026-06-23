/**
 * types.ts — Frontend Type Definitions
 * Mirrors the backend's AuditResponse shape exactly.
 * If the backend changes its response, update this file to match.
 */

export interface PageMetrics {
    wordCount: number;
    headings: { h1: number; h2: number; h3: number };
    paragraphCount: number;
    metaTitle: string | null;
    metaTitleLength: number;
    metaDescription: string | null;
    metaDescriptionLength: number;
    ctaCount: number;
    ctaTexts: string[];
    links: { internal: number; external: number };
    imageCount: number;
    imagesWithAlt: number;
    imagesMissingAlt: number;
    missingAltPercent: number;
    url: string;
}

export interface Insight {
    finding: string;
    metricReference: string;
    metricValue: number | string | null;
    severity: "critical" | "warning" | "info";
    recommendation: string;
}

export interface Recommendation {
    priority: number;
    action: string;
    reasoning: string;
    metricRef: string;
    effort: "low" | "medium" | "high";
}

export interface AuditInsights {
    seoStructure: Insight & { headingHierarchyOk: boolean };
    messagingClarity: Insight;
    ctaUsage: Insight;
    contentDepth: Insight;
    uxConcerns: Insight;
    recommendations: Recommendation[];
    overallScore: number;
    summary: string;
}

export interface AuditResponse {
    metrics: PageMetrics;
    insights: AuditInsights;
    cached: boolean;
    auditedAt: string;
    finalUrl: string;
    auditId?: number;
}