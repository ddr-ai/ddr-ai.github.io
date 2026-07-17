import React from "react";

/**
 * Reusable macOS-style terminal window chrome wrapping section content.
 */
export default function TerminalWindow({ title, children, testId }) {
  return (
    <div
      data-testid={testId}
      className="w-[92vw] sm:w-full max-w-4xl h-[82vh] md:h-[78vh] mx-auto flex flex-col bg-term-panel rounded-xl border border-slate-700/60 shadow-2xl shadow-black/40 overflow-hidden"
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-term-header border-b border-slate-700/60 shrink-0">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-amber-400" />
        <span className="w-3 h-3 rounded-full bg-emerald-400" />
        <span className="ml-3 text-xs sm:text-sm text-term-muted truncate">{title}</span>
      </div>
      <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 sm:py-8">{children}</div>
    </div>
  );
}
