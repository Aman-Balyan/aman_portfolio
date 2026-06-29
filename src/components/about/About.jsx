import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import "./About.css";

// ── CARDS DATA ──────────────────────────────────────────────
const CARDS = [
  {
    icon: "⚡",
    title: "Backend Architect",
    body: "Production-grade REST APIs serving real enterprise clients across compliance & energy domains. Clean code. Real scale.",
    accent: "#6d8eff",
    from: { x: -60, y: 0 },
  },
  {
    icon: "🤝",
    title: "Product Owner",
    body: "Led client meetings with PTC & HPPC. Owned requirement gathering, cross-team delegation and UAT sign-off across multiple state deployments.",
    accent: "#a855f7",
    from: { x: 0, y: 60 },
  },
  {
    icon: "🔁",
    title: "Automation Engineer",
    body: "Replaced entire manual data pipelines with Selenium WebDriver automation. Dynamic JS pages, headless execution — zero human touch.",
    accent: "#22d3ee",
    from: { x: 0, y: 60 },
  },
  {
    icon: "🎨",
    title: "Frontend Enthusiast",
    body: "Building polished UIs with React is where backend logic meets creative instinct. This portfolio is proof — always levelling up.",
    accent: "#f472b6",
    from: { x: 60, y: 0 },
  },
];

// ── HOOK TEXT ───────────────────────────────────────────────
const HOOK = "I don't just write code — I own what I build, start to finish.";
const SUBHOOK = "Started as a DevOps intern. Moved into QA automation. Became a full backend engineer owning entire platforms end to end — requirements, delivery,testing , client sign-off. All of it.";

// ── METEOR CANVAS ───────────────────────────────────────────
const MeteorCanvas = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, meteors = [], rafId;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    const spawnMeteor = () => {
      const startX = Math.random() * W * 1.2;
      meteors.push({
        x:     startX,
        y:     -10,
        len:   100 + Math.random() * 120,
        speed: 3.5 + Math.random() * 4,
        angle: 35 + Math.random() * 15,
        alpha: 0.7 + Math.random() * 0.3,
        life:  1,
        col:   Math.random() > 0.5 ? "180,200,255" : "200,180,255",
      });
    };

    let spawnTimer = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      spawnTimer++;
      if (spawnTimer % 90 === 0) spawnMeteor();

      meteors.forEach((m, i) => {
        const rad = (m.angle * Math.PI) / 180;
        const ex  = m.x + Math.cos(rad) * m.len;
        const ey  = m.y + Math.sin(rad) * m.len;

        const grad = ctx.createLinearGradient(m.x, m.y, ex, ey);
        grad.addColorStop(0, `rgba(${m.col},${m.alpha * m.life})`);
        grad.addColorStop(1, `rgba(${m.col},0)`);

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 1.5;
        ctx.stroke();

        // head glow
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${m.col},${m.alpha * m.life})`;
        ctx.fill();

        m.x += Math.cos(rad) * m.speed;
        m.y += Math.sin(rad) * m.speed;
        m.life -= 0.008;
        if (m.life <= 0 || m.y > H + 50) meteors.splice(i, 1);
      });

      rafId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    return () => { cancelAnimationFrame(rafId); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} className="about-meteor-canvas" />;
};

// ── GALAXY WATERMARK ────────────────────────────────────────
const GalaxyWatermark = () => (
  <div className="about-galaxy" aria-hidden="true">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="galaxy-ring" style={{ "--i": i }} />
    ))}
  </div>
);

// ── WORD-BY-WORD HOOK ───────────────────────────────────────
const HookText = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const words  = HOOK.split(" ");

  return (
    <div ref={ref} className="about-hook">
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="hook-word"
          initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
          animate={inView
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : {}
          }
          transition={{
            duration: 0.5,
            delay:    i * 0.055,
            ease:     [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

// ── PARTICLE BURST ON HOVER ─────────────────────────────────
const useParticleBurst = (accent) => {
  const canvasRef = useRef(null);

  const burst = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx  = canvas.getContext("2d");
    const W    = canvas.width  = canvas.offsetWidth;
    const H    = canvas.height = canvas.offsetHeight;
    const pts  = Array.from({ length: 18 }, () => ({
      x:  W / 2, y: H / 2,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      r:  Math.random() * 2.5 + 0.8,
      a:  1,
    }));

    let rafId;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      let alive = false;
      pts.forEach((p) => {
        p.x  += p.vx;
        p.y  += p.vy;
        p.a  -= 0.028;
        p.vx *= 0.96;
        p.vy *= 0.96;
        if (p.a > 0) {
          alive = true;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = accent + Math.round(p.a * 255).toString(16).padStart(2, "0");
          ctx.fill();
        }
      });
      if (alive) rafId = requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, W, H);
    };
    cancelAnimationFrame(rafId);
    draw();
  }, [accent]);

  return { canvasRef, burst };
};

// ── VALUE CARD ──────────────────────────────────────────────
const ValueCard = ({ card, index }) => {
  const [hovered, setHovered] = useState(false);
  const { canvasRef, burst }  = useParticleBurst(card.accent);

  const handleEnter = () => { setHovered(true); burst(); };
  const handleLeave = () => setHovered(false);

  return (
    <motion.div
      className="value-card"
      style={{ "--accent": card.accent }}
      initial={{ opacity: 0, x: card.from.x, y: card.from.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay:    index * 0.1,
        ease:     [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* orbiting border light */}
      <div className={`card-orbit-light ${hovered ? "card-orbit-light--active" : ""}`} />

      {/* particle burst canvas */}
      <canvas ref={canvasRef} className="card-particle-canvas" />

      {/* nebula glow */}
      <div className="card-nebula" />

      {/* content */}
      <div className="card-icon-wrap">
        <span className="card-icon">{card.icon}</span>
      </div>
      <h3 className="card-title">{card.title}</h3>
      <p className="card-body">{card.body}</p>

      {/* bottom accent line */}
      <div className={`card-bottom-line ${hovered ? "card-bottom-line--active" : ""}`} />
    </motion.div>
  );
};

// ── MAIN ────────────────────────────────────────────────────
const About = () => (
  <section className="about" id="about">
    {/* space atmosphere */}
    <MeteorCanvas />
    <GalaxyWatermark />

    <div className="about-container">

      {/* section label */}
      <motion.div
        className="about-label"
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="about-label-dot" />
        About Me
      </motion.div>

      {/* hook */}
      <HookText />

      {/* subhook */}
      <motion.p
        className="about-subhook"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        {SUBHOOK}
      </motion.p>

      {/* 4 value cards */}
      <div className="value-cards-grid">
        {CARDS.map((card, i) => (
          <ValueCard key={i} card={card} index={i} />
        ))}
      </div>

    </div>
  </section>
);

export default About;