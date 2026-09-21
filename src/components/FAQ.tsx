import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { Reveal } from "./Reveal";

const faqs = [
  {
    question: "What technologies do you specialize in?",
    answer:
      "I specialize in React, TypeScript, Node.js, Python, and modern web technologies. I'm proficient in both frontend and backend development, with experience in cloud services like AWS and Docker.",
  },
  {
    question: "Are you available for freelance work?",
    answer:
      "Yes, I'm open to freelance projects and collaborations. Feel free to reach out through the contact page with your project details.",
  },
  {
    question: "What is your development process?",
    answer:
      "I follow an agile approach: understanding requirements, planning architecture, iterative development with regular check-ins, testing, and deployment. I emphasize clean code and documentation.",
  },
  {
    question: "Do you work with teams or solo?",
    answer:
      "Both! I'm comfortable working as part of a team or independently. I've experience with collaborative workflows using Git, code reviews, and agile methodologies.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[var(--color-dark-bg)] py-24 relative">
      <div className="container-riwa relative z-10">
        <Reveal>
          <div className="section-label section-label-dark mb-6">
            ● 10 FAQ
          </div>
        </Reveal>

        <Reveal>
          <h2 className="section-heading text-[var(--color-dark-text)] mb-16">
            Got <span className="riwa-gradient-text">Questions</span>?
          </h2>
        </Reveal>

        <div className="max-w-3xl">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="riwa-accordion-item">
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === i ? null : i)
                  }
                  className="w-full flex items-center justify-between gap-4 py-6 text-left group"
                >
                  <span className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-dark-text)] group-hover:text-[var(--color-accent)] transition-colors">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-[var(--color-dark-muted)] shrink-0"
                  >
                    <FiChevronDown size={20} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-[var(--color-dark-secondary)] leading-relaxed max-w-2xl">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="riwa-divider">
          <div />
          <div />
        </div>
      </div>
    </section>
  );
}
