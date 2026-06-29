import { useState, useEffect, useRef } from "react";
import "./Skills.css";

// ── CATEGORIES ────────────────────────────────────────────
const CATEGORIES = ["All", "Backend", "Frontend", "Cloud", "Testing", "Tools", "AI"];

const SKILLS = [
  { name: "Java",            color: "#f89820", cat: "Backend"  },
  { name: "Spring Boot",     color: "#6db33f", cat: "Backend"  },
  { name: "Spring MVC",      color: "#6db33f", cat: "Backend"  },
  { name: "Spring Security", color: "#6db33f", cat: "Backend"  },
  { name: "Hibernate/JPA",   color: "#bcae79", cat: "Backend"  },
  { name: "REST Assured",    color: "#6db33f", cat: "Backend"  },
  { name: "Python",          color: "#3776ab", cat: "Backend"  },
  { name: "SQL",             color: "#336791", cat: "Backend"  },
  { name: "Bash",            color: "#4eaa25", cat: "Backend"  },
  { name: "Kafka",           color: "#a855f7", cat: "Backend"  },
  { name: "Redis",           color: "#dc382d", cat: "Backend"  },
  { name: "MySQL",           color: "#4479a1", cat: "Backend"  },
  { name: "React.js",        color: "#61dafb", cat: "Frontend" },
  { name: "AWS",             color: "#ff9900", cat: "Cloud"    },
  { name: "Docker",          color: "#2496ed", cat: "Cloud"    },
  { name: "Jenkins",         color: "#d33833", cat: "Cloud"    },
  { name: "CI/CD",           color: "#22d3ee", cat: "Cloud"    },
  { name: "Selenium",        color: "#43b02a", cat: "Testing"  },
  { name: "TestNG",          color: "#ea5c2b", cat: "Testing"  },
  { name: "Postman",         color: "#ff6c37", cat: "Testing"  },
  { name: "SonarQube",       color: "#4e9bcd", cat: "Testing"  },
  { name: "Git",             color: "#f05032", cat: "Tools"    },
  { name: "GitHub",          color: "#e0e0e0", cat: "Tools"    },
  { name: "Maven",           color: "#c71a36", cat: "Tools"    },
  { name: "JIRA",            color: "#0052cc", cat: "Tools"    },
  { name: "Generative AI",   color: "#58f795", cat: "AI"       },
  { name: "LLM APIs",        color: "#63e6f5", cat: "AI"       },
];

// random fly-in direction for each skill — stable per mount


// random stagger delay per skill
const DELAYS = SKILLS.map(() => Math.random() * 0.5);

// ── SKILL PILL ────────────────────────────────────────────
const SkillPill = ({ skill, index, active, anyHovered, onHover, onLeave, inView }) => {
  const [hovered, setHovered] = useState(false);
  const delay   = DELAYS[index];
  const isDimmed = anyHovered && !hovered;
  const isHidden = !active;

  return (
    <div
      className={`
        skill-pill
        ${inView && active  ? "skill-pill--visible"  : ""}
        ${isHidden          ? "skill-pill--hidden"   : ""}
        ${hovered           ? "skill-pill--hovered"  : ""}
        ${isDimmed          ? "skill-pill--dimmed"   : ""}
      `}
     style={{
  "--col":   skill.color,
  "--tx":    "0px",
  "--ty":    "30px",
  "--delay": `${delay}s`,
}}
      onMouseEnter={() => { setHovered(true);  onHover(); }}
      onMouseLeave={() => { setHovered(false); onLeave(); }}
    >
      {/* glow blob behind pill */}
      <div className="pill-glow" />

      {/* dot */}
      <span className="pill-dot" />

      {/* name */}
      <span className="pill-name">{skill.name}</span>
    </div>
  );
};

// ── MAIN ─────────────────────────────────────────────────
const Skills = () => {
  const [activeCat,   setActiveCat]   = useState("All");
  const [anyHovered,  setAnyHovered]  = useState(false);
  const [inView,      setInView]      = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleCat = (cat) => {
    setActiveCat(cat);
  };

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="skills-container">

        {/* label */}
        <div className={`skills-label ${inView ? "vis" : ""}`}>
          <span className="skills-label-dot" />
          Technical Skills
        </div>

        {/* headline */}
        <h2 className={`skills-headline ${inView ? "vis" : ""}`}>
          The Stack I Ship With
        </h2>

        {/* category filters */}
        <div className={`skills-filters ${inView ? "vis" : ""}`}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCat === cat ? "filter-btn--active" : ""}`}
              onClick={() => handleCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* pills */}
<div className="skills-pills-outer">
  <div className="skills-pills">
    {SKILLS.filter(skill => activeCat === "All" || activeCat === skill.cat).map((skill, i) => (
      <SkillPill
        key={skill.name}
        skill={skill}
        index={i}
        active={true}
        anyHovered={anyHovered}
        onHover={() => setAnyHovered(true)}
        onLeave={() => setAnyHovered(false)}
        inView={inView}
      />
    ))}
  </div>
</div>

      </div>
    </section>
  );
};

export default Skills;