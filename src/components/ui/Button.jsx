import { motion } from "framer-motion";

const Button = ({
  children,
  variant = "primary",
  onClick,
  href,
}) => {
  const className =
    variant === "secondary"
      ? "btn btn-secondary"
      : "btn btn-primary";

  if (href) {
    return (
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        href={href}
        className={className}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
};

export default Button;