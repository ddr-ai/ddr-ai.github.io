import React from "react";
import TerminalWindow from "./TerminalWindow";
import { useSequentialReveal } from "../hooks/useSequentialReveal";

const PARAGRAPHS = [
  { label: "cat", arg: "about.md" },
  {
    text:
      "I'm Dain Ramnauth — a builder driven by curiosity for how things work under the hood, and how they break.",
  },
  {
    text:
      "On one side, I'm deep into AI: learning machine learning fundamentals with the long-term goal of designing and training my own AI model from scratch.",
  },
  {
    text:
      "On the other side, I live in the terminal. Linux is my daily driver, and I spend a lot of time exploring network security — specifically penetration testing and WiFi security auditing.",
  },
  {
    text:
      "I'm comfortable navigating security-focused distributions like Kali Linux and ParrotOS, and I'm continuously sharpening my skills with tools like Aircrack-ng and Wireshark.",
  },
  {
    text: "Two worlds, one mission: understand systems deeply enough to build — and secure — them.",
    color: "text-term-pink",
  },
];

export default function About() {
  const visible = useSequentialReveal(PARAGRAPHS.length, 320, 200);

  return (
    <div className="w-full h-full flex items-center justify-center px-2">
      <TerminalWindow title="dain@portfolio:~/about" testId="about-terminal">
        <div className="flex flex-col gap-4">
          {PARAGRAPHS.map((p, idx) => (
            <div
              key={idx}
              className={`transition-all duration-500 ${
                idx < visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              {p.label ? (
                <p className="text-sm sm:text-base mb-2">
                  <span className="text-term-green">{p.label}</span>{" "}
                  <span className="text-term-amber">{p.arg}</span>
                </p>
              ) : (
                <p className={`text-sm sm:text-base leading-relaxed ${p.color || "text-term-text"}`}>
                  {p.text}
                </p>
              )}
            </div>
          ))}
        </div>
      </TerminalWindow>
    </div>
  );
}
