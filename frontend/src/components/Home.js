import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TerminalWindow from "./TerminalWindow";
import { useSequentialReveal } from "../hooks/useSequentialReveal";

const LINES = [
  { prompt: "dain@portfolio", cmd: "whoami" },
  { output: "Dain Ramnauth", color: "text-term-indigo font-bold text-2xl sm:text-4xl" },
  { output: "Cybersecurity & AI Enthusiast", color: "text-term-cyan text-lg sm:text-xl" },
  { output: "Building AI models by day, cracking WiFi handshakes by night.", color: "text-term-muted" },
];

export default function Home() {
  const visible = useSequentialReveal(LINES.length, 380, 250);

  return (
    <div className="w-full h-full flex items-center justify-center px-2">
      <TerminalWindow title="dain@portfolio:~" testId="home-terminal">
        <div className="h-full flex flex-col justify-center gap-4">
          {LINES.map((line, idx) => (
            <div
              key={idx}
              className={`transition-all duration-500 ${
                idx < visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              {line.prompt ? (
                <p className="text-sm sm:text-base">
                  <span className="text-term-green">{line.prompt}</span>
                  <span className="text-term-muted">:~$ </span>
                  <span className="text-term-text">{line.cmd}</span>
                  {idx === visible - 1 && <span className="cursor-caret" />}
                </p>
              ) : (
                <p className={line.color}>{line.output}</p>
              )}
            </div>
          ))}

          {visible >= LINES.length && (
            <div
              data-testid="swipe-hint"
              className="mt-10 flex flex-col items-center gap-3 opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]"
              style={{ animation: "fadeIn 0.6s ease-out forwards" }}
            >
              <div className="flex items-center gap-4 text-term-pink">
                <ChevronLeft className="w-6 h-6 animate-swipe-left" />
                <span className="text-xs sm:text-sm text-term-muted tracking-widest uppercase">
                  Swipe or use arrow keys
                </span>
                <ChevronRight className="w-6 h-6 animate-swipe-right" />
              </div>
              <p className="text-xs text-term-muted/70">[ about · skills · projects · contact ]</p>
            </div>
          )}
        </div>
      </TerminalWindow>
    </div>
  );
}
