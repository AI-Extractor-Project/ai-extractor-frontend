import type { AuditResponse } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const apiClient = {
    async audit(url: string): Promise<AuditResponse> {

        const response = await fetch(`${API_URL}/api/v1/audit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url }),
        });

        console.log("response", response);

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.error || `Request failed with status ${response.status}`);
        }

        return response.json() as Promise<AuditResponse>;
    },
};