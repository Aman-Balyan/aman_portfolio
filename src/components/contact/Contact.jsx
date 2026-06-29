import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { portfolio } from "../data/portfolio";
import SectionTitle from "../ui/SectionTitle";
import "./Contact.css";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

const LINKS = [
  {
    icon: <FaEnvelope />,
    label: "Email",
    value: "balyanaman013@gmail.com",
    href: "mailto:balyanaman013@gmail.com",
  },
  {
    icon: <FaLinkedin />,
    label: "LinkedIn",
    value: "linkedin.com/in/aman-balyan13",
    href: "https://www.linkedin.com/in/aman-balyan13",
  },
  {
    icon: <FaPhone />,
    label: "Phone",
    value: "+91 8307070466",
    href: "tel:+918307070466",
  },
  {
    icon: <FaMapMarkerAlt />,
    label: "Location",
    value: "India",
    href: null,
  },
];

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolio.email || "balyanaman013@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
  <div className="contact-label">
    <span className="contact-label-dot" />
    Contact
  </div>
  <h2 className="contact-headline-main">Get in touch</h2>
        <div className="contact-grid">
          {/* Left — headline + copy email */}
          <motion.div className="contact-left" {...fadeUp(0)}>
            <h3 className="contact-headline">
              Let's build something
              <br />
              <span className="contact-headline-accent">great together.</span>
            </h3>
            <p className="contact-subtext">
              Open to full-time roles, freelance projects, and interesting
              conversations. I reply within 24 hours.
            </p>

            <button
              className={`contact-copy-btn ${copied ? "contact-copy-btn--copied" : ""}`}
              onClick={copyEmail}
            >
              <FaEnvelope />
              {copied ? "Copied!" : "Copy Email Address"}
            </button>

            {/* availability strip */}
            <div className="contact-available">
              <span className="contact-avail-dot" />
              <span>Currently available for new opportunities</span>
            </div>
          </motion.div>

          {/* Right — contact cards */}
          <motion.div className="contact-right" {...fadeUp(0.12)}>
            {LINKS.map((link, i) => (
              <motion.div
                key={i}
                className="contact-card"
                {...fadeUp(0.08 + i * 0.07)}
              >
                <div className="contact-card-icon">{link.icon}</div>
                <div className="contact-card-text">
                  <span className="contact-card-label">{link.label}</span>
                  {link.href ? (
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="contact-card-value contact-card-link"
                    >
                      {link.value}
                    </a>
                  ) : (
                    <span className="contact-card-value">{link.value}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="contact-footer">
        <span className="contact-footer-text">
          Designed & built by{" "}
          <span className="contact-footer-name">Aman Balyan</span> · {new Date().getFullYear()}
        </span>
      </div>
    </section>
  );
};

export default Contact;