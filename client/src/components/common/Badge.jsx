import { COLORS } from "../../constants/colors";

export default function Badge({ children, color = COLORS.teal }) {
  return (
    <span style={{
      background: `${color}18`, color,
      padding: "2px 10px", borderRadius: 20,
      fontSize: 11, fontWeight: 600, letterSpacing: 0.5
    }}>
      {children}
    </span>
  );
}
