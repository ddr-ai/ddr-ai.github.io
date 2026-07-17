import React from "react";
import TerminalWindow from "./TerminalWindow";
import { useSequentialReveal } from "../hooks/useSequentialReveal";

const GROUPS = [
  {
    key: "ai_ml",
    color: "text-term-indigo",
    items: ["Machine Learning Fundamentals", "Neural Networks", "Python (NumPy, PyTorch)", "Building custom AI models"],
  },
  {
    key: "operating_systems",
    color: "text-term-green",
    items: ["Linux (daily driver)", "Kali Linux", "ParrotOS", "Shell scripting / Bash"],
  },
  {
    key: "security_tools",
    color: "text-term-cyan",
    items: ["Aircrack-ng", "Wireshark", "Nmap", "Burp Suite"],
  },
  {
    key: "concepts",
    color: "text-term-amber",
    items: ["Penetration Testing", "WiFi Security Auditing", "Network Protocol Analysis", "Vulnerability Research"],
  },
];

export default function Skills() {
  const visible = useSequentialReveal(GROUPS.length, 350, 200);

  return (
    <div className="w-full h-full flex items-center justify-center px-2">
      <TerminalWindow title="dain@portfolio:~/skills" testId="skills-terminal">
        <p className="text-sm sm:text-base mb-4">
          <span className="text-term-green">dain@portfolio</span>
          <span className="text-term-muted">:~$ </span>
          <span className="text-term-text">cat skills.json</span>
        </p>
        <div className="font-mono text-sm sm:text-base">
          <span className="text-term-muted">{"{"}</span>
          <div className="pl-4 sm:pl-6 flex flex-col gap-4 mt-2">
            {GROUPS.map((g, idx) => (
              <div
                key={g.key}
                data-testid={`skill-group-${g.key}`}
                className={`transition-all duration-500 ${
                  idx < visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
              >
                <p className={`font-bold ${g.color}`}>"{g.key}": [</p>
                <div className="pl-4 sm:pl-6 flex flex-wrap gap-2 my-2">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-md border border-slate-700 bg-slate-800/60 text-term-text text-xs sm:text-sm hover:border-term-indigo hover:bg-slate-700/60 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p className="text-term-muted">],</p>
              </div>
            ))}
          </div>
          <span className="text-term-muted">{"}"}</span>
        </div>
      </TerminalWindow>
    </div>
  );
}
