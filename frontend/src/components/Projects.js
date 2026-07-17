import React from "react";
import { ExternalLink } from "lucide-react";
import TerminalWindow from "./TerminalWindow";
import { useSequentialReveal } from "../hooks/useSequentialReveal";

const PROJECTS = [
  {
    id: "gitscout",
    name: "GitScout",
    tag: "web app",
    color: "border-term-cyan",
    description:
      "Premium GitHub repository search tool. Query millions of public repos, view details and READMEs instantly, with built-in GitHub API rate-limit handling via a locally-stored personal access token.",
    stack: ["React", "GitHub API", "Netlify"],
    link: "https://gitreposcout.netlify.app/",
  },
  {
    id: "sharebridge",
    name: "ClipBridge",
    tag: "web app",
    color: "border-term-pink",
    description:
      "Real-time cross-device clipboard sharing tool. Create or join a room with a code and instantly sync text, code snippets, and content between devices — no accounts needed.",
    stack: ["React", "Realtime Sync", "Netlify"],
    link: "https://sharebridge.netlify.app/",
  },
];

export default function Projects() {
  const visible = useSequentialReveal(PROJECTS.length, 400, 200);

  return (
    <div className="w-full h-full flex items-center justify-center px-2">
      <TerminalWindow title="dain@portfolio:~/projects" testId="projects-terminal">
        <p className="text-sm sm:text-base mb-5">
          <span className="text-term-green">dain@portfolio</span>
          <span className="text-term-muted">:~$ </span>
          <span className="text-term-text">ls -la ./projects</span>
        </p>
        <div className="flex flex-col gap-5">
          {PROJECTS.map((p, idx) => (
            <a
              key={p.id}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`project-card-${p.id}`}
              className={`group block rounded-lg border-l-4 ${p.color} border-t border-r border-b border-slate-700 bg-slate-800/40 hover:bg-slate-800/70 hover:shadow-lg transition-all duration-300 p-4 sm:p-5 ${
                idx < visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              } transition-all`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-term-text">{p.name}</h3>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-700 text-term-muted">
                    {p.tag}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-term-muted group-hover:text-term-indigo transition-colors" />
              </div>
              <p className="text-sm text-term-muted mt-2 leading-relaxed">{p.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {p.stack.map((s) => (
                  <span key={s} className="text-xs px-2 py-1 rounded bg-slate-900/60 border border-slate-700 text-term-muted">
                    {s}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </TerminalWindow>
    </div>
  );
}
