import { useState, useEffect, useRef } from "react";
import "./Experience.css";

// ── DATA ─────────────────────────────────────────────────
const MISSIONS = [
  {
    id:      "xebia",
    station: "STATION 001",
    company: "Xebia",
    role:    "DevOps Intern",
    period:  "Aug 2023 — Nov 2023",
    status:  "DEPARTED",
    active:  false,
    tilt:    "-2deg",
    color:   "#6d8eff",
    points: [
      "Deployed full-stack employee management portal on AWS EC2.",
      "Set up CI/CD pipelines with Jenkins and Docker — cut deployment time significantly.",
      "Integrated SonarQube for automated code quality checks across the team.",
    ],
  },
  {
    id:      "jpft",
    station: "STATION 002",
    company: "JPFT",
    role:    "QA Intern",
    period:  "Jun 2024 — Sep 2024",
    status:  "DEPARTED",
    active:  false,
    tilt:    "1.5deg",
    color:   "#a855f7",
    points: [
      "Wrote and executed functional, regression, and smoke test cases across modules.",
      "Tracked 50+ defects end-to-end in JIRA through the full bug lifecycle.",
      "Built Selenium WebDriver automation scripts — reduced manual testing cycles.",
    ],
  },
  {
    id:      "gna",
    station: "STATION 003",
    company: "GNA Energy",
    role:    "Software Engineer",
    period:  "Sep 2024 — Oct 2025",
    status:  "DEPARTED",
    active:  false,
    tilt:    "1deg",
    color:   "#22d3ee",
    points: [
      "Managed Power Sector BD for AdaniBoard — led meetings with PTC & HPPC.",
      "Owned full-cycle delivery of region-specific platforms across multiple states.",
      "Designed Spring Boot REST APIs for internal energy reporting platforms.",
      "Built ETL modules using Kafka for event streaming and Redis for caching.",
    ],
  },
  {
    id:      "fios",
    station: "STATION 004",
    company: "FIOS Compliance",
    role:    "Software Engineer",
    period:  "Nov 2025 — June 2026",
    status:  "DEPARTED",
    active:  false,
    tilt:    "-1.5deg",
     color:   "#22d3ee",
    // color:   "#6ee7b7",
    points: [
      "Designed Spring Boot REST APIs powering core compliance workflows.",
      "Built React.js dashboards with real-time data rendering for live reporting.",
      "Built Selenium WebDriver pipelines replacing manual data collection entirely.",
      "Automated end-to-end ETL workflows — zero human touch on data pipelines.",
    ],
  },
];

// ── SCANLINE COMPONENT ────────────────────────────────────
const Scanline = ({ speed = 3, color = "rgba(109,142,255,0.06)" }) => (
  <div className="holo-scanline" style={{ "--scan-speed": `${speed}s`, "--scan-col": color }} />
);

// ── CORNER RETICLES ───────────────────────────────────────
const Reticles = ({ color, active }) => (
  <>
    <div className={`reticle reticle-tl ${active ? "reticle--active" : ""}`} style={{ "--rc": color }} />
    <div className={`reticle reticle-tr ${active ? "reticle--active" : ""}`} style={{ "--rc": color }} />
    <div className={`reticle reticle-bl ${active ? "reticle--active" : ""}`} style={{ "--rc": color }} />
    <div className={`reticle reticle-br ${active ? "reticle--active" : ""}`} style={{ "--rc": color }} />
  </>
);

// ── MISSION PANEL ─────────────────────────────────────────
const MissionPanel = ({ mission, index, expanded, onToggle, anyExpanded, inView }) => {
  const isExpanded = expanded === mission.id;
  const isDimmed   = anyExpanded && !isExpanded;
  const [flickered, setFlickered] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setFlickered(true), index * 180 + 300);
      return () => clearTimeout(t);
    }
  }, [inView, index]);

  return (
    <div
      className={`
        mission-panel
        ${flickered      ? "mission-panel--in"       : ""}
        ${isExpanded     ? "mission-panel--expanded"  : ""}
        ${isDimmed       ? "mission-panel--dimmed"    : ""}
        ${mission.active ? "mission-panel--active"    : ""}
      `}
      style={{
        "--tilt":  isExpanded ? "0deg" : mission.tilt,
        "--col":   mission.color,
        "--delay": `${index * 0.12}s`,
      }}
      onClick={() => onToggle(mission.id)}
      onMouseLeave={() => { if (isExpanded) onToggle(mission.id); }}
    >
      {/* CRT flicker overlay */}
      <div className="holo-flicker" />

      {/* scanline */}
      <Scanline speed={2.5 + index * 0.4} color={`${mission.color}09`} />

      {/* grid pattern */}
      <div className="holo-grid" />

      {/* corner reticles */}
      <Reticles color={mission.color} active={isExpanded} />

      {/* active breathing glow */}
      {mission.active && <div className="active-glow" />}

      {/* content */}
      <div className="panel-inner">

        {/* top row */}
        <div className="panel-top">
          <span className="panel-station">{mission.station}</span>
          <span className={`panel-status ${mission.active ? "panel-status--active" : ""}`}>
            {mission.active && <span className="status-dot" />}
            {mission.status}
          </span>
        </div>

        {/* company */}
        <h3 className="panel-company">{mission.company}</h3>

        {/* role + period */}
        <div className="panel-meta">
          <span className="panel-role">{mission.role}</span>
          <span className="panel-period">{mission.period}</span>
        </div>

        {/* expand hint */}
        {!isExpanded && (
          <div className="panel-hint">
            <span className="hint-line" />
            <span className="hint-text">TAP TO EXPAND</span>
            <span className="hint-line" />
          </div>
        )}

        {/* expanded points */}
        {isExpanded && (
          <ul className="panel-points">
            {mission.points.map((p, i) => (
              <li
                key={i}
                className="panel-point"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="point-arrow">▸</span>
                {p}
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  );
};

// ── MAIN ─────────────────────────────────────────────────
const Experience = () => {
  const [expanded,   setExpanded]   = useState(null);
  const [inView,     setInView]     = useState(false);
  const [powered,    setPowered]    = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          setTimeout(() => setPowered(true), 200);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleToggle = (id) => setExpanded(prev => prev === id ? null : id);

  return (
    <section className="experience" id="experience" ref={ref}>

      {/* power-on sweep */}
      <div className={`exp-sweep ${powered ? "exp-sweep--done" : ""}`} />

      <div className="exp-container">

        {/* label */}
        <div className={`exp-label ${inView ? "vis" : ""}`}>
          <span className="exp-label-dot" />
          Work Experience
        </div>

        {/* headline */}
        <h2 className={`exp-headline ${inView ? "vis" : ""}`}>
          Mission Log
        </h2>

        <p className={`exp-sub ${inView ? "vis" : ""}`}>
          Click any station to access classified mission data
        </p>

        {/* holographic command center */}
        <div className={`holo-center ${inView ? "vis" : ""}`}>

          {/* hex grid background */}
          <div className="holo-hex-bg" />

          {/* panels grid */}
          <div className="panels-grid">
            {MISSIONS.map((m, i) => (
              <MissionPanel
                key={m.id}
                mission={m}
                index={i}
                expanded={expanded}
                onToggle={handleToggle}
                anyExpanded={expanded !== null}
                inView={inView}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Experience;