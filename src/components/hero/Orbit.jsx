import { useEffect, useRef } from "react";

const ACCENT_COLS = [
  "#a0b4ff",
  "#c4b0ff", 
  "#7ecfff",
  "#b8d4ff",
  "#d4b0ff",
  "#8fd6ff",
  "#e0d0ff",
];

const Orbit = ({ size, duration, reverse = false, children, index = 0 }) => {
  const trackRef   = useRef(null);
  const counterRef = useRef(null);
  const angle      = useRef(Math.random() * 360);
  const rafRef     = useRef(null);

  useEffect(() => {
    const speed = (360 / duration) / 60;

    const tick = () => {
      angle.current += reverse ? -speed : speed;
      if (angle.current >= 360) angle.current -= 360;
      if (angle.current <    0) angle.current += 360;

      if (trackRef.current) {
        trackRef.current.style.transform =
          `translate(-50%, -50%) rotate(${angle.current}deg)`;
      }
      if (counterRef.current) {
        counterRef.current.style.transform =
          `rotate(${-angle.current}deg)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [duration, reverse]);

  const accent = ACCENT_COLS[index % ACCENT_COLS.length];
  const radius = size / 2;

  return (
    <>
      {/* ring — centered on planet */}
      <div
        className="orbit-ring"
        style={{ width: size, height: size }}
      />

      {/* track — rotates around planet center */}
      <div
        ref={trackRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: size,
          height: size,
          pointerEvents: "none",
          /* JS sets transform: translate(-50%,-50%) rotate(Xdeg) */
        }}
      >
        {/*
          Badge anchor: pushed UP by exactly the radius
          so it sits on the orbit circumference, not inside
        */}
        <div
          style={{
            position: "absolute",
            top: 0,               /* top edge of the box = radius away from center */
            left: "50%",
            transform: "translateX(-50%)",
            pointerEvents: "auto",
          }}
        >
          {/* counter-rotate so text stays upright */}
          <div ref={counterRef}>
            <div
              className="orbit-badge"
              style={{ "--accent": accent }}
            >
              <span
                className="orbit-badge-dot"
                style={{ background: accent }}
              />
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orbit;