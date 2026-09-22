import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { profile } from "../data/resume";
import { FiGithub, FiLinkedin } from "react-icons/fi";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="bg-[var(--color-dark-bg)] py-24 relative">
      <div className="container-riwa relative z-10">
        <Reveal>
          <div className="section-label mb-6">
            <span className="section-label-number">07</span>
            contact
          </div>
        </Reveal>

        <Reveal>
          <h2 className="section-heading mb-4">
            Ready to Start
          </h2>
          <h2 className="section-heading section-heading-muted mb-16">
            Your Project?
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form — Riwa: IBM Plex Mono inputs, no border radius */}
          <Reveal>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block font-mono text-xs text-[var(--color-dark-muted)] uppercase tracking-wider mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jane Smith"
                  required
                  className="w-full bg-transparent border-b border-white/10 text-white py-3 font-mono text-sm focus:border-[var(--color-orange)] outline-none transition-colors placeholder:text-white/20"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-[var(--color-dark-muted)] uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane@example.com"
                  required
                  className="w-full bg-transparent border-b border-white/10 text-white py-3 font-mono text-sm focus:border-[var(--color-orange)] outline-none transition-colors placeholder:text-white/20"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-[var(--color-dark-muted)] uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Leave a message"
                  required
                  rows={5}
                  className="w-full bg-transparent border-b border-white/10 text-white py-3 font-mono text-sm focus:border-[var(--color-orange)] outline-none transition-colors resize-none placeholder:text-white/20"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="riwa-btn riwa-btn-orange"
              >
                {submitted ? "Sent!" : "Send Message →"}
              </motion.button>
            </form>
          </Reveal>

          {/* Contact Info */}
          <Reveal delay={0.2}>
            <div className="space-y-8">
              <p className="text-[var(--color-dark-secondary)] text-lg leading-relaxed">
                Have a project in mind or just want to chat? I'm always open to
                new opportunities and interesting conversations.
              </p>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 py-4">
                  <span className="font-mono text-xs text-[var(--color-dark-muted)] uppercase">
                    Email
                  </span>
                  <span className="text-white text-sm">{profile.email}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 py-4">
                  <span className="font-mono text-xs text-[var(--color-dark-muted)] uppercase">
                    Location
                  </span>
                  <span className="text-white text-sm">{profile.location}</span>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="riwa-btn riwa-btn-outline"
                  >
                    <FiGithub size={16} />
                    GitHub
                  </a>
                )}
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="riwa-btn riwa-btn-outline"
                  >
                    <FiLinkedin size={16} />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
