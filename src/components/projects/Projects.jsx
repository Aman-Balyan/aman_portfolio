import { useState, useEffect, useRef } from "react";
import "./Projects.css";

// ── PROJECT DATA ──────────────────────────────────────────
const PROJECTS = [
  {
    id:      "ai-qgen",
    number:  "001",
    title:   "AI Question Generation System",
    tagline: "Intelligent automated assessment at scale.",
    desc:    "A Python and Flask REST API backend for AI-powered question generation and automated answer evaluation. Integrates NLP-based semantic similarity scoring — no manual intervention required. Built to replace traditional assessment workflows entirely.",
    tech:    ["Python", "Flask", "NLP", "REST API", "Semantic Similarity", "AI/ML"],
    color:   "#a855f7",
    colorB:  "#6d8eff",
    visual:  "ai",
  },
  {
    id:      "inventory",
    number:  "002",
    title:   "Inventory Optimization Engine",
    tagline: "Nature-inspired intelligence meets enterprise logistics.",
    desc:    "Implemented Ant Colony Optimization (ACO) and Markov Decision Process (MDP) algorithms in Java to simulate and optimize inventory allocation across dynamic supply chain scenarios. Reduced allocation errors through algorithmic decision-making.",
    tech:    ["Java", "ACO Algorithm", "MDP", "Optimization", "Supply Chain"],
    color:   "#22d3ee",
    colorB:  "#6ee7b7",
    visual:  "inventory",
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
        <div className="proj-tech">
          {project.tech.map((t) => (
            <span key={t} className="proj-tech-tag">{t}</span>
          ))}
        </div>

      </div>

      {/* right — visual */}
      <div className="proj-visual-wrap">
        {project.visual === "ai"
          ? <AIVisual active={hovered || visible} color={project.color} />
          : <InventoryVisual active={hovered || visible} color={project.color} />
        }
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