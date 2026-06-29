import "./Hero.css";
import { useEffect, useRef } from "react";

import Glow            from "../ui/Glow";
import HeroContent     from "./HeroContent";
import HeroPlanet      from "./HeroPlanet";
import ScrollIndicator from "./ScrollIndicator";

/* ─────────────────────────────────────────
   PARTICLE CANVAS — subtle deep-space dust
───────────────────────────────────────────*/
const useParticleCanvas = (canvasRef) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, pts = [], rafId;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      pts = Array.from({ length: 70 }, () => ({
        x:  Math.random() * W,
        y:  Math.random() * H,
        r:  Math.random() * 1.4 + 0.3,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        a:  Math.random() * 0.55 + 0.1,
        ph: Math.random() * Math.PI * 2,
        // cool silver / pale-blue / faint violet palette
        col: ["200,210,255", "180,200,255", "210,190,255", "160,180,255"][
          Math.floor(Math.random() * 4)
        ],
      }));
    };

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.008;
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        const a = p.a * (0.4 + 0.6 * Math.sin(t + p.ph));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.col},${a})`;
        ctx.fill();
      });
      rafId = requestAnimationFrame(draw);
    };

    resize(); init(); draw();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    return () => { cancelAnimationFrame(rafId); ro.disconnect(); };
  }, [canvasRef]);
};

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────────*/
const Hero = () => {
  const canvasRef = useRef(null);
  useParticleCanvas(canvasRef);

  return (
    <section className="hero" id="home">
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* ambient glow blobs — cool silver tones */}
      <Glow size={700} color="rgba(130,155,255,0.10)" top="45%" left="62%" />
      <Glow size={500} color="rgba(180,160,255,0.08)" top="15%" left="18%" />
      <Glow size={400} color="rgba(100,140,220,0.07)" top="75%" left="45%" />

      <div className="hero-container">
        <HeroContent />
        <div className="hero-right">
          <HeroPlanet />
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
};

export default Hero;
