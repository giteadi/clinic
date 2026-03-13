import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { COLORS } from '../../constants/colors';

export default function BackButton({ onClick, style = {}, text = "Back" }) {
  return (
    <motion.button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: `${COLORS.teal}15`,
        border: `1px solid ${COLORS.teal}30`,
        borderRadius: 8,
        padding: "8px 16px",
        cursor: "pointer",
        color: COLORS.teal,
        fontSize: 14,
        fontWeight: 600,
        transition: "all 0.2s",
        ...style
      }}
      whileHover={{ scale: 1.05, backgroundColor: `${COLORS.teal}25` }}
      whileTap={{ scale: 0.95 }}
    >
      <ArrowLeft size={16} />
      {text}
    </motion.button>
  );
}
