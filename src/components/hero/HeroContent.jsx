import { motion } from "framer-motion";
import { FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import { useState, useEffect } from "react";

import Button          from "../ui/Button";
import { portfolio }   from "../data/portfolio";
import useTyping       from "../../hooks/useTyping";

/* ── fade-up variant for framer ── */
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
});

/* ── animated counter ── */
const Counter = ({ target, suffix = "" }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const steps = 50, dur = 1200;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setVal(Math.round((target / steps) * i));
      if (i >= steps) clearInterval(t);
    }, dur / steps);
    return () => clearInterval(t);
  }, [target]);
  return <>{val}{suffix}</>;
};

const HeroContent = () => {
  const role = useTyping(portfolio.roles, 75);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.div className="hero-left" {...fadeUp(0)}>

      {/* Badge */}
      <motion.div className="hero-badge" {...fadeUp(0.1)}>
        <span className="hero-badge-dot" />
        Available for Opportunities
      </motion.div>

      {/* Greeting + Name */}
      <motion.p className="hero-greeting" {...fadeUp(0.18)}>
        Hi, I'm
      </motion.p>

      <motion.h1 className="hero-name" {...fadeUp(0.24)}>
        <span className="name-highlight">{portfolio.name}</span>
      </motion.h1>

      {/* Typewriter */}
      <motion.div className="hero-typewriter" {...fadeUp(0.32)}>
        <span className="hero-typewriter-prefix">— </span>
        <span className="hero-typewriter-text">
          {role}
          <span className="hero-typewriter-cursor" />
        </span>
      </motion.div>

      {/* Description */}
      <motion.p className="hero-description" {...fadeUp(0.4)}>
        {portfolio.description}
      </motion.p>

      {/* CTAs */}
      <motion.div className="hero-buttons" {...fadeUp(0.48)}>
        <Button onClick={() => scrollTo("projects")}>
          View Projects
        </Button>
        <Button
          variant="secondary"
          href="/Aman_Balyan_Resume.pdf"
        >
          Download Resume
        </Button>
      </motion.div>

      {/* Social icons */}
      <motion.div className="hero-socials" {...fadeUp(0.55)}>
        <a href={`mailto:${portfolio.email}`} aria-label="Email">
          <FaEnvelope />
        </a>
        <a
          href={`https://${portfolio.linkedin}`}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a href={`tel:${portfolio.phone}`} aria-label="Phone">
          <FaPhone />
        </a>
      </motion.div>

      {/* Stats strip */}
      <motion.div className="hero-stats" {...fadeUp(0.62)}>
        {[
          { n: 2, s: "+", label: "Years Exp." },
          { n: 4,  s: "",  label: "Companies"  },
          { n: 50, s: "+", label: "Bugs Killed" },
        ].map((s) => (
          <div key={s.label}>
            <span className="hero-stat-num">
              <Counter target={s.n} suffix={s.s} />
            </span>
            <span className="hero-stat-label">{s.label}</span>
          </div>
        ))}
      </motion.div>

    </motion.div>
  );
};

export default HeroContent;
