import { useTheme } from "../../contexts/ThemeContext";

export default function Badge({ children, variant = 'default', size = 'medium' }) {
  const { colors } = useTheme();
  return (
    <span style={{
      background: `${colors.teal}18`, color: colors.teal,
      padding: "2px 10px", borderRadius: 20,
      fontSize: 11, fontWeight: 600, letterSpacing: 0.5
    }}>
      {children}
    </span>
  );
}
