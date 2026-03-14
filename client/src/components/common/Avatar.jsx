import { useTheme } from "../../contexts/ThemeContext";

export default function Avatar({ initials, color, size = 40 }) {
  const { colors, theme } = useTheme();
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: theme === "white" ? colors[color] : colors[color],
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.32, fontWeight: 700, color: "#fff", flexShrink: 0,
      fontFamily: "'Playfair Display', serif", boxShadow: "none"
    }}>
      {initials}
    </div>
  );
}
