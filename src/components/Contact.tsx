import { useState } from "react";
import type { CSSProperties } from "react";
import type { FormEvent } from "react";
import { Reveal } from "./Reveal";
import { profile } from "../data/resume";

/* Riwa "12 GET IN TOUCH" section — live-verified (d-contact-a, contact shot):
   section : bg ORANGE rgb(214, 54, 20) #D63614, pad 120/24 (full-bleed),
             NO vertical lines (Riwa has none here), orange band painted on
             the light blog section above (blog's bottom edge).
   header  : chip 12 (light pill #E6E6E6, mono 500 14 #0B0D14, orange dot)
             25% | heading 75% — Sora 600 100/100 -6px UPPERCASE white,
             3 lines.
   left    : desc Geist 18/25.2 white w~360 → city clocks at bottom: glyph +
             time mono 500 16 white over city mono 500 13 white uppercase.
   right   : form — 3 underline fields (border-bottom 1px rgba(255,255,255,
             0.4), label mono 500 13 uppercase white, input Geist 18 white,
             placeholder rgba(255,255,255,0.55)), sparkle glyph sitting ON
             the line at the field's left edge → white pill r40 h66-68
             "LET'S TALK" (Sora 600 16 #0B0D14 text-roll + dark 36 circle
             with white sparkle) with 72px portrait overlapping right →
             mono 13 terms line below.
   Content: existing form fields (name/email/message) + profile contacts. */

const monoChip: CSSProperties = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: 14,
  lineHeight: "16.8px",
  fontWeight: 500,
  letterSpacing: "-0.56px",
  textTransform: "uppercase",
  color: "#0B0D14",
};

const btnTextStyle: CSSProperties = {
  fontFamily: '"Sora", sans-serif',
  fontWeight: 600,
  fontSize: 16,
  lineHeight: "16px",
  letterSpacing: "-0.04em",
  textTransform: "uppercase",
  color: "#0B0D14",
  whiteSpace: "nowrap",
};

function Sparkle({ size = 18, color = "#FFFFFF" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M12 0 L14.4 9.6 L24 12 L14.4 14.4 L12 24 L9.6 14.4 L0 12 L9.6 9.6 Z" />
    </svg>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  textarea = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  placeholder: string;
}) {
  /* Riwa field block h84 (DOM-verified): label row fs14/lh16.8 pl14 →
     gap 6 → input box h40 (text pt11, fs16/lh19.2, px14) → line box
     h21 (pt10/pb10 + 1px underline rgba(255,255,255,0.4)) with the
     sparkle sitting ON the line at the field's left edge. */
  const inputStyle: CSSProperties = {
    width: "100%",
    background: "transparent",
    border: 0,
    outline: "none",
    borderRadius: 0,
    padding: 0,
    fontFamily: '"Geist", sans-serif',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: "19.2px",
    color: "#FFFFFF",
    resize: "none" as const,
  };

  return (
    <label
      htmlFor={name}
      style={{ display: "flex", flexDirection: "column", gap: 6, cursor: "text" }}
    >
      <span
        style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontWeight: 500,
          fontSize: 14,
          lineHeight: "16.8px",
          letterSpacing: "-0.56px",
          textTransform: "uppercase",
          color: "#FFFFFF",
          paddingLeft: 14,
        }}
      >
        {label}
      </span>
      <span style={{ display: "block", position: "relative" }}>
        <div style={{ height: 40, padding: "11px 14px 10px" }}>
          {textarea ? (
            <textarea
              id={name}
              name={name}
              rows={2}
              value={value}
              placeholder={placeholder}
              onChange={(e) => onChange(e.target.value)}
              style={inputStyle}
            />
          ) : (
            <input
              id={name}
              name={name}
              type={type}
              value={value}
              placeholder={placeholder}
              onChange={(e) => onChange(e.target.value)}
              style={inputStyle}
            />
          )}
        </div>
        {/* underline box — border sits at the field block's bottom edge */}
        <div
          style={{
            height: 21,
            paddingTop: 10,
            paddingBottom: 10,
            borderBottom: "1px solid rgba(255, 255, 255, 0.4)",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 0,
              bottom: -8,
              lineHeight: 0,
              pointerEvents: "none",
            }}
            aria-hidden="true"
          >
            <Sparkle size={16} />
          </span>
        </div>
      </span>
      <style>{`input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.55); }`}</style>
    </label>
  );
}

export default function Contact({ variant = "home" }: { variant?: "home" | "inner" }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const inner = variant === "inner";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="relative"
      style={{ background: "rgb(214, 54, 20)", padding: "120px 24px" }}
    >
      {/* Inner pages: page-wide 5-line overlay continues over the orange
          contact (faint white, verified on /projects, /contact, /terms). */}
      {inner && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 bottom-0 left-6 right-6 flex justify-between">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className="w-px block" style={{ background: "rgba(255,255,255,0.15)" }} />
            ))}
          </div>
        </div>
      )}
      <div className="relative z-10">
        {/* header row: chip 25% | heading 75% (gap 0 — heading on the 25% line) */}
        <div className="grid lg:grid-cols-4" style={{ columnGap: 0 }}>
          <div className="lg:col-span-1">
            <Reveal>
              <div
                className="inline-flex items-center"
                style={{
                  background: inner ? "#E9681E" : "#E6E6E6",
                  padding: "8px 14px",
                  borderRadius: 100,
                  gap: 12,
                }}
              >
                <span className="inline-flex items-center" style={{ gap: 4 }}>
                  <span
                    className="block"
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "100%",
                      background: inner ? "#FFFFFF" : "rgb(214, 54, 20)",
                    }}
                  />
                  {!inner && <span style={monoChip}>12</span>}
                </span>
                <span style={inner ? { ...monoChip, color: "#FFFFFF" } : monoChip}>get in touch</span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3" style={{ marginTop: 0 }}>
            <Reveal delay={0.1}>
              <h2
                style={{
                  fontFamily: '"Sora", sans-serif',
                  fontWeight: 600,
                  fontSize: "clamp(3rem, 7.15vw, 6.25rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.06em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  margin: 0,
                  maxWidth: 1000,
                }}
              >
                Ready to start your next project?
              </h2>
            </Reveal>
          </div>
        </div>

        {/* content row: left desc + clocks | right form (gap 0 — form on the 50% line) */}
        <div className="grid lg:grid-cols-2" style={{ columnGap: 0, marginTop: 100 }}>
          {/* left: desc → clocks */}
          <div className="flex flex-col justify-between" style={{ gap: 64 }}>
            <Reveal>
              <p
                style={{
                  fontFamily: '"Geist", sans-serif',
                  fontWeight: 400,
                  fontSize: 18,
                  lineHeight: "25.2px",
                  color: "#FFFFFF",
                  maxWidth: inner ? 333 : 360,
                  margin: 0,
                }}
              >
                Have a project in mind, a role to fill, or just want to talk shop? Drop me a
                message and I&apos;ll get back to you within a day.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex" style={{ gap: 64 }}>
                <div>
                  <span className="block" style={{ marginBottom: 14 }}>
                    <Sparkle size={16} color="rgba(255,255,255,0.9)" />
                  </span>
                  <span
                    className="block"
                    style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontWeight: 500,
                      fontSize: 16,
                      letterSpacing: "-0.32px",
                      color: "#FFFFFF",
                    }}
                  >
                    {profile.location.split(",")[0].toUpperCase()}
                  </span>
                  <span
                    className="block"
                    style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontWeight: 500,
                      fontSize: 12,
                      letterSpacing: "-0.24px",
                      textTransform: "uppercase",
                      color: "rgba(255, 255, 255, 0.85)",
                      marginTop: 6,
                    }}
                  >
                    {profile.location.split(",").slice(1).join(",").trim().toUpperCase()}
                  </span>
                </div>
                <div>
                  <span className="block" style={{ marginBottom: 14 }}>
                    <Sparkle size={16} color="rgba(255,255,255,0.9)" />
                  </span>
                  <span
                    className="block"
                    style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontWeight: 500,
                      fontSize: 16,
                      letterSpacing: "-0.32px",
                      color: "#FFFFFF",
                    }}
                  >
                    {profile.phone}
                  </span>
                  <span
                    className="block"
                    style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontWeight: 500,
                      fontSize: 12,
                      letterSpacing: "-0.24px",
                      textTransform: "uppercase",
                      color: "rgba(255, 255, 255, 0.85)",
                      marginTop: 6,
                    }}
                  >
                    {profile.email}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* right: form */}
          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} style={{ display: "grid", rowGap: 20 }}>
              <Field
                label="Name"
                name="contact-name"
                value={formData.name}
                onChange={(v) => setFormData({ ...formData, name: v })}
                placeholder="Jane Smith"
              />
              <Field
                label="Email"
                name="contact-email"
                type="email"
                value={formData.email}
                onChange={(v) => setFormData({ ...formData, email: v })}
                placeholder="jane@example.com"
              />
              <Field
                label="Message"
                name="contact-message"
                value={formData.message}
                onChange={(v) => setFormData({ ...formData, message: v })}
                placeholder="Leave a message"
                textarea
              />

              {/* CTA: white pill + portrait overlapping right */}
              <div style={{ position: "relative", display: "inline-block" }}>
                <button
                  type="submit"
                  className="group"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 16,
                    height: 66,
                    padding: "0 20px 0 24px",
                    borderRadius: 40,
                    background: "#FFFFFF",
                    border: 0,
                    cursor: "pointer",
                  }}
                >
                  <div className="flex flex-col overflow-hidden" style={{ height: 16 }}>
                    <div className="btn-roll">
                      <span style={btnTextStyle}>{submitted ? "Sent!" : "Let's talk"}</span>
                      <span style={btnTextStyle}>{submitted ? "Sent!" : "Let's talk"}</span>
                    </div>
                  </div>
                  <span
                    className="flex items-center justify-center shrink-0"
                    style={{ width: 36, height: 36, borderRadius: "50%", background: "#0B0D14" }}
                    aria-hidden="true"
                  >
                    <Sparkle size={16} />
                  </span>
                </button>
                {/* portrait circle overlapping the pill's right edge */}
                <img
                  src="./portrait.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute pointer-events-none"
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    objectFit: "cover",
                    right: -26,
                    top: -2,
                    border: "2px solid rgb(214, 54, 20)",
                  }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>

              <p
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontWeight: 500,
                  fontSize: 12,
                  lineHeight: "15px",
                  letterSpacing: "-0.24px",
                  textTransform: "uppercase",
                  color: "rgba(255, 255, 255, 0.85)",
                  margin: 0,
                }}
              >
                By submitting, you agree to our terms and privacy policy.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
