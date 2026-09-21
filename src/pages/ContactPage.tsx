import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { profile } from "../data/resume";
import {
  FiMail,
  FiMapPin,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[var(--color-dark-bg)] pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 riwa-grid-bg opacity-30" />

        <div className="container-riwa relative z-10">
          <Reveal>
            <div className="section-label section-label-dark mb-6">
              ● GET IN TOUCH
            </div>
          </Reveal>
          <Reveal>
            <h1 className="section-heading text-[var(--color-dark-text)] mb-6">
              Let's{" "}
              <span className="riwa-gradient-text">Connect</span>
            </h1>
          </Reveal>
          <Reveal>
            <p className="text-[var(--color-dark-secondary)] text-lg max-w-xl">
              Have a project in mind or just want to chat? I'm always open to new
              opportunities and interesting conversations.
            </p>
          </Reveal>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="riwa-divider">
            <div />
            <div />
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-[var(--color-dark-bg)] py-20">
        <div className="container-riwa">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <Reveal>
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-[var(--color-dark-border)] flex items-center justify-center">
                      <FiMail className="text-[var(--color-accent)]" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-dark-muted)] font-[var(--font-mono)] uppercase tracking-wider">
                        Email
                      </p>
                      <p className="text-[var(--color-dark-text)]">
                        {profile.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-[var(--color-dark-border)] flex items-center justify-center">
                      <FiMapPin className="text-[var(--color-accent)]" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-dark-muted)] font-[var(--font-mono)] uppercase tracking-wider">
                        Location
                      </p>
                      <p className="text-[var(--color-dark-text)]">
                        {profile.location}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  {profile.github && (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border border-[var(--color-dark-border)] flex items-center justify-center text-[var(--color-dark-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all"
                    >
                      <FiGithub size={20} />
                    </a>
                  )}
                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border border-[var(--color-dark-border)] flex items-center justify-center text-[var(--color-dark-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all"
                    >
                      <FiLinkedin size={20} />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>

            {/* Contact Form */}
            <Reveal delay={0.2}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs text-[var(--color-dark-muted)] font-[var(--font-mono)] uppercase tracking-wider mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="w-full bg-transparent border-b border-[var(--color-dark-border)] text-[var(--color-dark-text)] py-3 focus:border-[var(--color-accent)] outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--color-dark-muted)] font-[var(--font-mono)] uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="w-full bg-transparent border-b border-[var(--color-dark-border)] text-[var(--color-dark-text)] py-3 focus:border-[var(--color-accent)] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[var(--color-dark-muted)] font-[var(--font-mono)] uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                    className="w-full bg-transparent border-b border-[var(--color-dark-border)] text-[var(--color-dark-text)] py-3 focus:border-[var(--color-accent)] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[var(--color-dark-muted)] font-[var(--font-mono)] uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={5}
                    className="w-full bg-transparent border-b border-[var(--color-dark-border)] text-[var(--color-dark-text)] py-3 focus:border-[var(--color-accent)] outline-none transition-colors resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="riwa-pill riwa-pill-primary"
                >
                  {submitted ? "Message Sent!" : "Send Message"}
                </motion.button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
