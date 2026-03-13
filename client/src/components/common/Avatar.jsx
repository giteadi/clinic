import { useTheme } from "../../contexts/ThemeContext";

export default function Avatar({ initials, color, size = 40 }) {
  const { colors } = useTheme();
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `${colors[color]}22`, border: `2px solid ${colors[color]}44`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.32, fontWeight: 700, color: colors[color], flexShrink: 0,
      fontFamily: "'Playfair Display', serif"
    }}>
      {initials}
    </div>
  );
}
