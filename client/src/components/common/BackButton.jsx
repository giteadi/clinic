import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

export default function BackButton({ onClick, text = "Back", style = {} }) {
  const { colors } = useTheme();
  
  return (
    <motion.button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: `${colors.teal}15`,
        border: `1px solid ${colors.teal}30`,
        borderRadius: 8,
        padding: "8px 16px",
        cursor: "pointer",
        color: colors.teal,
        fontSize: 14,
        fontWeight: 600,
        transition: "all 0.2s",
        ...style
      }}
      whileHover={{ scale: 1.05, backgroundColor: `${colors.teal}25` }}
      whileTap={{ scale: 0.95 }}
    >
      <ArrowLeft size={16} />
      {text}
    </motion.button>
  );
}
