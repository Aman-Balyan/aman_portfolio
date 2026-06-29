import Nebula from "./Nebula";
import Planet from "./Planet";
import ShootingStars from "./ShootingStars";
import Stars from "./Stars";

const SpaceBackground = () => {
  return (
    <div className="space-background">

      <Nebula />

      <Stars />

      <Planet />

      <ShootingStars />

    </div>
  );
};

export default SpaceBackground;