import { create } from "zustand";
import type { PageMetrics, AuditInsights } from "@/lib/types";
import { apiClient } from "@/lib/api-client";

interface AuditState {
    status: "idle" | "loading" | "success" | "error";
    url: string;
    metrics: PageMetrics | null;
    insights: AuditInsights | null;
    error: string | null;
    runAudit: (url: string) => Promise<void>;
    reset: () => void;
}

export const useAuditStore = create<AuditState>((set) => ({
    status: "idle",
    url: "",
    metrics: null,
    insights: null,
    error: null,

    runAudit: async (url: string) => {
        set({ status: "loading", url, error: null, metrics: null, insights: null });
        console.log("entered url in store", url);
        try {
            const data = await apiClient.audit(url);
            console.log("data", data);

            set({ status: "success", metrics: data.metrics, insights: data.insights });

        } catch (err) {
            set({
                status: "error",
                error: err instanceof Error ? err.message : "Something went wrong. Please try again.",
            });
        }
    },

    reset: () =>
        set({ status: "idle", url: "", metrics: null, insights: null, error: null }),
}));