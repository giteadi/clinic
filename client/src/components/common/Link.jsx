import { motion } from 'framer-motion';
import { COLORS } from '../../constants/colors';

export default function Link({ children, onClick, style = {}, className = "", ...props }) {
  return (
    <motion.button
      onClick={onClick}
      className={className}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        font: "inherit",
        color: "inherit",
        textDecoration: "none",
        padding: 0,
        margin: 0,
        ...style
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
