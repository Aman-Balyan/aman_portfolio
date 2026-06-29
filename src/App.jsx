import "./styles/globals.css";
import "./styles/animations.css";
import "./styles/variables.css";

import Navbar          from "./components/layout/Navbar";
import SpaceBackground from "./components/background/SpaceBackground";
import Hero            from "./components/hero/Hero";
import About           from "./components/about/About";
import Skills          from "./components/skills/Skills";
import Experience      from "./components/experience/Experience";
import Projects        from "./components/projects/Projects";
import Contact         from "./components/contact/Contact";

function App() {
  return (
    <>
      <SpaceBackground />
      <Navbar />
      <main >
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

export default App;