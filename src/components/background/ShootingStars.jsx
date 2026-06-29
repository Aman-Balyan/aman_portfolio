import { useEffect, useState } from "react";

const ShootingStars = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();

      setStars((prev) => [
        ...prev,
        {
          id,
          top: Math.random() * 40,
          left: Math.random() * 90,
        },
      ]);

      setTimeout(() => {
        setStars((prev) =>
          prev.filter((star) => star.id !== id)
        );
      }, 1800);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {stars.map((star) => (
        <span
          key={star.id}
          className="shooting-star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
          }}
        />
      ))}
    </>
  );
};

export default ShootingStars;