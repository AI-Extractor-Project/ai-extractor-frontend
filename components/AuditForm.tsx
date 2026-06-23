"use client";

import { useState, useRef, useEffect } from "react";

interface AuditFormProps {
    onSubmit: (url: string) => void;
    isLoading: boolean;
    error?: string | null;
}

export default function AuditForm({ onSubmit, isLoading, error }: AuditFormProps) {
    const [url, setUrl] = useState("");
    const [validationError, setValidationError] = useState<string | null>(null);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    function validateUrl(value: string): string | null {
        if (!value.trim()) return "Enter a URL to audit";
        try {
            const parsed = new URL(value);
            if (!["http:", "https:"].includes(parsed.protocol)) {
                return "URL must start with http:// or https://";
            }
            return null;
        } catch {
            return "That doesn't look like a valid URL — try https://example.com";
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const err = validateUrl(url);
        if (err) {
            setValidationError(err);
            inputRef.current?.focus();
            return;
        }
        setValidationError(null);
        onSubmit(url.trim());
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUrl(e.target.value);
        if (validationError) setValidationError(null);
    }

    const displayError = validationError || error;
    const showCursor = !url && !isFocused;

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div
                className="bg-[var(--bg-input)] rounded-[10px] p-0 transition-all duration-200"
                style={{
                    border: `1px solid ${isFocused ? "var(--border-focus)" : displayError ? "var(--danger)" : "var(--border)"}`,
                    boxShadow: isFocused
                        ? "0 0 0 3px var(--accent-glow)"
                        : displayError
                            ? "0 0 0 3px rgba(239, 68, 68, 0.15)"
                            : "none",
                }}
            >
                <div className="flex items-center gap-[6px] px-[16px] py-[10px] border-b border-[var(--border)]">
                    <span className="w-[10px] h-[10px] rounded-full bg-[#ff5f57] inline-block" />
                    <span className="w-[10px] h-[10px] rounded-full bg-[#febc2e] inline-block" />
                    <span className="w-[10px] h-[10px] rounded-full bg-[#28c840] inline-block" />
                    <span className="text-[var(--text-muted)] text-[11px] ml-[8px] font-mono">
                        seo-audit - bash
                    </span>
                </div>
                <div className="flex items-center px-[16px] py-[14px] gap-[10px]">
                    <span className="font-mono text-[var(--accent)] text-[15px] select-none shrink-0">
                        &gt;_
                    </span>

                    <div className="relative flex-1">
                        <input
                            ref={inputRef}
                            type="url"
                            value={url}
                            onChange={handleChange}
                            placeholder="https://yourwebsite.com"
                            disabled={isLoading}
                            autoComplete="url"
                            spellCheck={false}
                            className="w-full bg-transparent border-none outline-none focus-visible:outline-none text-[var(--text-primary)] font-mono text-[15px] tracking-[0.01em]"
                            style={{
                                opacity: isLoading ? 0.5 : 1,
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="min-h-[24px] mt-[8px]">
                {displayError && (
                    <p className="text-[var(--danger)] text-[13px] font-mono flex items-center gap-[6px]">
                        <span>✗</span> {displayError}
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="mt-[8px] w-full px-[24px] py-[14px] text-white border-none rounded-[8px] text-[15px] font-semibold font-sans tracking-[0.01em] flex items-center justify-center gap-[10px] transition-all duration-150 active:scale-[0.98]"
                style={{
                    background: isLoading ? "var(--border)" : "var(--accent)",
                    cursor: isLoading ? "not-allowed" : "pointer",
                }}
                onMouseEnter={(e) => {
                    if (!isLoading) (e.target as HTMLButtonElement).style.background = "var(--accent-hover)";
                }}
                onMouseLeave={(e) => {
                    if (!isLoading) (e.target as HTMLButtonElement).style.background = "var(--accent)";
                }}
            >
                {isLoading ? (
                    <>
                        <span className="spinner" />
                        <span>Analysing page…</span>
                    </>
                ) : (
                    <>
                        Run SEO Audit
                    </>
                )}
            </button>

            <p className="text-center text-[var(--text-muted)] text-[12px] mt-[12px] font-mono">
                Audits take 5–15 seconds · Results include AI insights grounded in real metrics
            </p>
        </form>
    );
}