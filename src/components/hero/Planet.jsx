/* 
  Moon-realistic planet:
  — dark grey base with subtle blue-green tint
  — radial craters punched in
  — terminator shadow (light from top-left)
  — soft atmosphere rim
  — breathing glow halo
*/
const Planet = () => (
  <div className="planet-core">
    {/* outer breathing halo */}
    <div className="planet-halo" />

    {/* moon surface */}
    <div className="planet-surface" />

    {/* crater layer */}
    <div className="planet-craters">
      <div className="crater c1" />
      <div className="crater c2" />
      <div className="crater c3" />
      <div className="crater c4" />
      <div className="crater c5" />
    </div>

    {/* subtle cloud bands */}
    <div className="planet-bands" />

    {/* terminator shadow — gives 3D sphere illusion */}
    <div className="planet-shadow" />

    {/* atmosphere rim */}
    <div className="planet-atmo" />
  </div>
);

export default Planet;
