import { Star } from "lucide-react";
import { COLORS } from "../../constants/colors";

export default function StarRow({ rating }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={12} fill={i <= Math.floor(rating) ? COLORS.gold : "none"}
          color={i <= Math.floor(rating) ? COLORS.gold : COLORS.slate} />
      ))}
    </div>
  );
}
