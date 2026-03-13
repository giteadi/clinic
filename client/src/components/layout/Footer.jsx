import { Stethoscope } from "lucide-react";
import { COLORS } from "../../constants/colors";

export default function Footer() {
  return (
    <footer style={{ background: COLORS.navy, borderTop: `1px solid ${COLORS.border}`, padding: "40px 32px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Stethoscope size={16} color="#fff" />
          </div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: COLORS.white }}>
            Cliniq<span style={{ color: COLORS.teal }}>Pro</span>
          </span>
        </div>
        <div style={{ color: COLORS.slate, fontSize: 13 }}>
          © 2025 CliniqPro. Built for modern healthcare.
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy", "Terms", "Support"].map(l => (
            <span key={l} style={{ color: COLORS.slate, fontSize: 13, cursor: "pointer" }}>{l}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
