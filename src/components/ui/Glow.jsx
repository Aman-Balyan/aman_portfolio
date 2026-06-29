const Glow = ({
  size = 350,
  color = "#6D8EFF",
  top = "50%",
  left = "50%",
}) => {
  return (
    <div
      className="glow"
      style={{
        width: size,
        height: size,
        background: color,
        top,
        left,
      }}
    />
  );
};

export default Glow;