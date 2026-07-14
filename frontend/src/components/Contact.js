import React, { useState } from "react";
import axios from "axios";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import TerminalWindow from "./TerminalWindow";
import { useSequentialReveal } from "../hooks/useSequentialReveal";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Contact() {
  const visible = useSequentialReveal(1, 200, 150);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await axios.post(`${API}/contact`, form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center px-2">
      <TerminalWindow title="dain@portfolio:~/contact" testId="contact-terminal">
        <div className={`transition-all duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>
          <p className="text-sm sm:text-base mb-5">
            <span className="text-term-green">dain@portfolio</span>
            <span className="text-term-muted">:~$ </span>
            <span className="text-term-text">./send_message.sh</span>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" data-testid="contact-form">
            <div>
              <label className="text-xs text-term-muted uppercase tracking-wider">name --input</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                data-testid="contact-name-input"
                placeholder="Your name"
                className="w-full bg-transparent border-b-2 border-slate-200 focus:border-term-indigo outline-none py-2 mt-1 text-sm sm:text-base text-term-text transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-term-muted uppercase tracking-wider">email --input</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                data-testid="contact-email-input"
                placeholder="you@example.com"
                className="w-full bg-transparent border-b-2 border-slate-200 focus:border-term-cyan outline-none py-2 mt-1 text-sm sm:text-base text-term-text transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-term-muted uppercase tracking-wider">message --input</label>
              <textarea
                name="message"
                required
                rows={3}
                value={form.message}
                onChange={handleChange}
                data-testid="contact-message-input"
                placeholder="Say hello, or ask about a project..."
                className="w-full bg-transparent border-b-2 border-slate-200 focus:border-term-pink outline-none py-2 mt-1 text-sm sm:text-base text-term-text resize-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              data-testid="contact-submit-button"
              className="self-start flex items-center gap-2 px-5 py-2.5 rounded-md bg-term-indigo text-white text-sm font-bold hover:bg-indigo-600 active:scale-95 transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p data-testid="contact-success-message" className="flex items-center gap-2 text-term-green text-sm">
                <CheckCircle2 className="w-4 h-4" /> Message sent! Dain will get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p data-testid="contact-error-message" className="flex items-center gap-2 text-term-pink text-sm">
                <AlertCircle className="w-4 h-4" /> Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </TerminalWindow>
    </div>
  );
}
