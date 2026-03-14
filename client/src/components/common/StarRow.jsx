import { Star } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

export default function StarRow({ rating }) {
  const { colors } = useTheme();
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={12} fill={i <= Math.floor(rating) ? colors.gold : "none"}
          color={i <= Math.floor(rating) ? colors.gold : colors.slate} />
      ))}
    </div>
  );
}
