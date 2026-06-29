import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Experience", id: "experience" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      
      const sections = navLinks.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="logo" onClick={() => scrollToSection("home")}>
        {/* A M A N */}
        <span className="letter letter-a1">A</span>
        <span className="letter letter-m">m</span>
        <span className="letter letter-a2">a</span>
        <span className="letter letter-n">n</span>
        <span className="dot">.</span>
        {/* B A L Y A N */}
        <span className="letter letter-b">B</span>
        <span className="letter letter-a3">a</span>
        <span className="letter letter-l">l</span>
        <span className="letter letter-y">y</span>
        <span className="letter letter-a4">a</span>
        <span className="letter letter-n2">n</span>
      </div>

      <nav className={menuOpen ? "nav-links active" : "nav-links"}>
        {navLinks.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={activeSection === item.id ? "active-link" : ""}
          >
            {item.name}
          </button>
        ))}
      </nav>

      <button
        className="menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </header>
  );
};

export default Navbar;