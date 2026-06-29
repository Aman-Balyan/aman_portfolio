import { useMemo } from "react";

const STAR_COUNT = 350;

const Stars = () => {
  const stars = useMemo(() => {
    return Array.from({ length: STAR_COUNT }, (_, index) => ({
      id: index,
      size: Math.random() * 2.5 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      opacity: Math.random() * 0.7 + 0.2,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="stars-layer">
      {stars.map((star) => (
        <span
          key={star.id}
          className="star"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Stars;