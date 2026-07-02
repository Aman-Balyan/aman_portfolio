import { useState, useEffect, useRef } from "react";
import "./Projects.css";

// ── PROJECT DATA ──────────────────────────────────────────
const PROJECTS = [
  {
    id:      "golf",
    number:  "001",
    title:   "Golf Charity Subscription Platform",
    tagline: "A subscription-driven platform that combines golf performance tracking, prize rewards, and charitable giving",
    desc:    "Developed a full-stack web application using Spring Boot and React.js that enables users to manage subscriptions, track golf scores, participate in monthly prize draws, and support charities. Built secure REST APIs with JWT authentication, implemented role-based dashboards for users and admins, and designed business logic for score management, draw execution, and winner verification.",
    tech:    ["SpringBoot", "React.js", "MySQL"],
    color:   "#25b081",
    colorB:  "#c147aa",
    visual:  "golf",
    github:  "https://github.com/Aman-Balyan/-Golf-Charity-Subscription-Platform.git",  // replace or remove
    live:    "https://golf-charity-subscription-platform-frontend-hbtap5247.vercel.app/",  // no live link
  },
  {
    id:      "ai-qgen",
    number:  "002",
    title:   "AI Question Generation System",
    tagline: "Intelligent automated assessment at scale.",
    desc:    "A Python and Flask REST API backend for AI-powered question generation and automated answer evaluation. Integrates NLP-based semantic similarity scoring — no manual intervention required. Built to replace traditional assessment workflows entirely.",
    tech:    ["Python", "Flask", "NLP", "REST API", "Semantic Similarity", "AI/ML"],
    color:   "#a855f7",
    colorB:  "#6d8eff",
    visual:  "ai",
    github:  null,  // no github
    live:    null,  // no live
  },
  {
    id:      "inventory",
    number:  "003",
    title:   "Inventory Optimization Engine",
    tagline: "Nature-inspired intelligence meets enterprise logistics.",
    desc:    "Implemented Ant Colony Optimization (ACO) and Markov Decision Process (MDP) algorithms in Java to simulate and optimize inventory allocation across dynamic supply chain scenarios. Reduced allocation errors through algorithmic decision-making.",
    tech:    ["Java", "ACO Algorithm", "MDP", "Optimization", "Supply Chain"],
    color:   "#22d3ee",
    colorB:  "#6ee7b7",
    visual:  "inventory",
    github:  null,
    live:    null,
  },
];

// ── ANIMATED VISUAL — AI ──────────────────────────────────
const AIVisual = ({ active, color }) => {
  const lines = [
    { text: "> init question_engine()", delay: 0 },
    { text: "  loading NLP model...", delay: 0.3 },
    { text: "  ✓ model loaded", delay: 0.6 },
    { text: "> generate(topic='Java')", delay: 0.9 },
    { text: "  processing semantic graph", delay: 1.2 },
    { text: "  similarity_score: 0.94", delay: 1.5 },
    { text: "  ✓ question generated", delay: 1.8 },
    { text: "> evaluate(response)", delay: 2.1 },
    { text: "  score: 87/100  PASS ✓", delay: 2.4 },
  ];

  return (
    <div className="proj-visual proj-visual--ai">
      <div className="visual-terminal">
        <div className="visual-term-bar">
          <span className="vt-dot vt-dot--r" />
          <span className="vt-dot vt-dot--y" />
          <span className="vt-dot vt-dot--g" />
          <span className="vt-title">question_engine.py</span>
        </div>
        <div className="visual-term-body">
          {lines.map((l, i) => (
            <div
              key={i}
              className={`vt-line ${active ? "vt-line--visible" : ""}`}
              style={{
                "--vt-delay": `${l.delay}s`,
                color: l.text.includes("✓")
                  ? "#6ee7b7"
                  : l.text.startsWith(">")
                  ? color
                  : "rgba(190,210,255,0.6)",
              }}
            >
              {l.text}
            </div>
          ))}
          {active && <span className="vt-cursor" />}
        </div>
      </div>
    </div>
  );
};

// ── ANIMATED VISUAL — INVENTORY ───────────────────────────
const InventoryVisual = ({ active, color }) => {
  const nodes = [
    { x: 50, y: 15, label: "START",  r: 22 },
    { x: 22, y: 42, label: "Node A", r: 18 },
    { x: 78, y: 42, label: "Node B", r: 18 },
    { x: 35, y: 72, label: "Node C", r: 18 },
    { x: 65, y: 72, label: "Node D", r: 18 },
    { x: 50, y: 90, label: "END",    r: 22 },
  ];
  const edges = [
    [0,1],[0,2],[1,2],[1,3],[2,4],[3,4],[3,5],[4,5]
  ];
  const [activeEdge, setActiveEdge] = useState(0);

  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => {
      setActiveEdge(e => (e + 1) % edges.length);
    }, 600);
    return () => clearInterval(t);
  }, [active]);

  return (
    <div className="proj-visual proj-visual--inventory">
      <svg viewBox="0 0 100 100" className="inv-svg">
        {/* edges */}
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke={i === activeEdge ? color : "rgba(160,185,255,0.15)"}
            strokeWidth={i === activeEdge ? "0.8" : "0.4"}
            className={`inv-edge ${active ? "inv-edge--active" : ""}`}
            style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
          />
        ))}
        {/* nodes */}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle
              cx={n.x} cy={n.y} r={n.r * 0.45}
              fill="rgba(6,10,28,0.9)"
              stroke={color}
              strokeWidth="0.5"
              opacity={active ? 1 : 0.4}
              style={{ transition: "opacity 0.5s" }}
            />
            <text
              x={n.x} y={n.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="3.5"
              fill="rgba(200,220,255,0.8)"
              fontFamily="Space Mono, monospace"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="inv-label" style={{ color }}>
        ACO pathfinding active
      </div>
    </div>
  );
};




const GolfVisual = ({ active, color }) => {
  const steps = [
    { x: 10, label: "👤", title: "User" },
    { x: 30, label: "⛳", title: "Score" },
    { x: 50, label: "🎟", title: "Draw" },
    { x: 70, label: "❤️", title: "Charity" },
    { x: 90, label: "🏆", title: "Winner" },
  ];

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setProgress(p => (p + 1) % steps.length);
    }, 700);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="proj-visual proj-visual--golf">
      <svg viewBox="0 0 100 40" className="golf-svg">

        {/* Line */}
        <line
          x1="10"
          y1="20"
          x2="90"
          y2="20"
          stroke="rgba(255,255,255,.12)"
          strokeWidth="1"
        />

        {/* Animated progress */}
        <line
          x1="10"
          y1="20"
          x2={steps[progress].x}
          y2="20"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {steps.map((s, i) => (
          <g key={i}>
            <circle
              cx={s.x}
              cy="20"
              r="4"
              fill={
                i <= progress
                  ? color
                  : "rgba(10,15,35,.9)"
              }
              stroke={color}
              strokeWidth=".6"
            />

            <text
              x={s.x}
              y="21"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="3"
            >
              {s.label}
            </text>

            <text
              x={s.x}
              y="31"
              textAnchor="middle"
              fontSize="2.5"
              fill="rgba(200,220,255,.75)"
              fontFamily="Space Mono"
            >
              {s.title}
            </text>
          </g>
        ))}
      </svg>

      <div className="inv-label" style={{ color }}>
        Monthly draw processing...
      </div>
    </div>
  );
};






// ── PROJECT PANEL ─────────────────────────────────────────
const ProjectPanel = ({ project, index, inView }) => {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`proj-panel ${visible ? "proj-panel--visible" : ""} ${isEven ? "proj-panel--even" : "proj-panel--odd"}`}
      style={{ "--col": project.color, "--colB": project.colorB }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* background gradient */}
      <div className="proj-panel-bg" />

      {/* scanline */}
      <div className="proj-panel-scan" />

      {/* corner reticles */}
      <div className="proj-reticle proj-reticle-tl" />
      <div className="proj-reticle proj-reticle-tr" />
      <div className="proj-reticle proj-reticle-bl" />
      <div className="proj-reticle proj-reticle-br" />

      {/* left — info */}
      <div className="proj-info">

        {/* number */}
        <div className="proj-number">PROJECT {project.number}</div>

        {/* title */}
        <h3 className="proj-title">{project.title}</h3>

        {/* tagline */}
        <p className="proj-tagline">{project.tagline}</p>

        {/* divider */}
        <div className="proj-divider" />

        {/* description */}
        <p className="proj-desc">{project.desc}</p>

        {/* tech stack */}
       {/* tech stack */}
<div className="proj-tech">
  {project.tech.map((t) => (
    <span key={t} className="proj-tech-tag">{t}</span>
  ))}
</div>

{/* links — only show if they exist */}
{(project.github || project.live) && (
  <div className="proj-links">
    {project.github && (
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="proj-link proj-link--github"
        style={{ "--col": project.color }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        GitHub
      </a>
    )}
    {project.live && (
      <a
        href={project.live}
        target="_blank"
        rel="noopener noreferrer"
        className="proj-link proj-link--live"
        style={{ "--col": project.color }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
        Live Demo
      </a>
    )}
  </div>
)}







      </div>

      {/* right — visual */}
<div className="proj-visual-wrap">
  {project.visual === "ai" ? (
    <AIVisual
      active={hovered || visible}
      color={project.color}
    />
  ) : project.visual === "golf" ? (
    <GolfVisual
      active={hovered || visible}
      color={project.color}
    />
  ) : (
    <InventoryVisual
      active={hovered || visible}
      color={project.color}
    />
  )}
</div>

    </div>
  );
};

// ── MAIN ─────────────────────────────────────────────────
const Projects = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="projects-container">

        <div className={`proj-label ${inView ? "vis" : ""}`}>
          <span className="proj-label-dot" />
          Projects
        </div>

        <h2 className={`proj-headline ${inView ? "vis" : ""}`}>
          Things I've Built
        </h2>

        <p className={`proj-sub ${inView ? "vis" : ""}`}>
          Production experiments and algorithmic engineering
        </p>

        <div className="proj-panels">
          {PROJECTS.map((p, i) => (
            <ProjectPanel key={p.id} project={p} index={i} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;