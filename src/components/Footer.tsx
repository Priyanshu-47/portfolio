import { Link } from "react-router-dom";
import { profile } from "../data/resume";
import { FiGithub, FiLinkedin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-dark-bg)] border-t border-white/5 py-8">
      <div className="container-riwa">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Link
            to="/"
            className="font-[var(--font-display)] font-bold text-white text-lg"
          >
            PRIYANSHU<span className="text-[var(--color-orange)]">.</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="font-[var(--font-mono)] text-xs text-[var(--color-dark-muted)] hover:text-white transition-colors"
            >
              about
            </Link>
            <Link
              to="/projects"
              className="font-[var(--font-mono)] text-xs text-[var(--color-dark-muted)] hover:text-white transition-colors"
            >
              projects
            </Link>
            <Link
              to="/contact"
              className="font-[var(--font-mono)] text-xs text-[var(--color-dark-muted)] hover:text-white transition-colors"
            >
              contact
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-dark-muted)] hover:text-white transition-colors"
              >
                <FiGithub size={16} />
              </a>
            )}
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-dark-muted)] hover:text-white transition-colors"
              >
                <FiLinkedin size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
