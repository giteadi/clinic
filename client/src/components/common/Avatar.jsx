import { COLORS } from "../../constants/colors";

export default function Avatar({ initials, color, size = 44 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `${color}22`, border: `2px solid ${color}44`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.32, fontWeight: 700, color, flexShrink: 0,
      fontFamily: "'Playfair Display', serif"
    }}>
      {initials}
    </div>
  );
}
