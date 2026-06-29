import "./HeroPlanet.css";
import Planet from "./Planet";
import Orbit  from "./Orbit";

/* No icons — clean text labels only */
const ORBITS = [
  { size: 260, duration: 13, reverse: false, label: "Java"        },
  { size: 340, duration: 19, reverse: true,  label: "Spring Boot" },
  { size: 418, duration: 26, reverse: false, label: "React"       },
  { size: 492, duration: 34, reverse: true,  label: "AWS"         },
  { size: 564, duration: 44, reverse: false, label: "Docker"      },
  { size: 634, duration: 55, reverse: true,  label: "Selenium"    },
  { size: 702, duration: 68, reverse: false, label: "MySQL"       },
];


const HeroPlanet = () => (
  <div className="planet-scene">
    <Planet />
    {ORBITS.map((o, i) => (
      <Orbit
        key={i}
        size={o.size}
        duration={o.duration}
        reverse={o.reverse}
        index={i}
      >
        {o.label}
      </Orbit>
    ))}
  </div>
);

export default HeroPlanet;
