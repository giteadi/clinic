import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

export default function Link({ children, onClick, style = {}, className = "", ...props }) {
  const { colors } = useTheme();
  return (
    <motion.button
      onClick={onClick}
      className={className}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        font: "inherit",
        color: colors.slate,
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
