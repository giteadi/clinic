import { motion } from "framer-motion";
import { Calendar, Building2, Zap } from "lucide-react";

// ─── Design Tokens ───────────────────────────────────────────────────────────
const COLORS = {
  navy: "#0A1628",
  navyLight: "#112240",
  teal: "#0ABFBC",
  tealDark: "#089A97",
  gold: "#E8A838",
  cream: "#F8F5F0",
  white: "#FFFFFF",
  slate: "#8892B0",
  border: "rgba(10,191,188,0.15)",
};

const STATS = [
  { value: "500+", label: "Clinics", icon: Building2 },
  { value: "1200+", label: "Doctors", icon: "Stethoscope" },
  { value: "50K+", label: "Patients", icon: "Users" },
  { value: "4.9★", label: "Rating", icon: "Star" },
];

export default function Hero({ setView }) {
  return (
    <section style={{
      minHeight: "100vh", background: COLORS.navy,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "100px 32px 60px", position: "relative", overflow: "hidden"
    }}>
      {/* BG Decoration */}
      <div style={{
        position: "absolute", top: -120, right: -120, width: 500, height: 500,
        borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.teal}12, transparent 70%)`,
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", bottom: -80, left: -80, width: 400, height: 400,
        borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.gold}10, transparent 70%)`,
        pointerEvents: "none"
      }} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        style={{ textAlign: "center", maxWidth: 760, position: "relative" }}>

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: `${COLORS.teal}15`, border: `1px solid ${COLORS.teal}30`,
          borderRadius: 30, padding: "6px 18px", marginBottom: 32
        }}>
          <Zap size={14} color={COLORS.teal} />
          <span style={{ color: COLORS.teal, fontSize: 13, fontWeight: 600, letterSpacing: 0.5 }}>
            Trusted by 500+ Clinics Across India
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1.1,
          color: COLORS.white, marginBottom: 24, fontWeight: 700
        }}>
          Your Health,<br />
          <span style={{ color: COLORS.teal }}>Beautifully</span> Managed
        </h1>

        <p style={{
          color: COLORS.slate, fontSize: 18, lineHeight: 1.7, marginBottom: 40,
          fontFamily: "'DM Sans', sans-serif"
        }}>
          Book appointments with top doctors, manage your clinic, and deliver exceptional patient care — all in one elegant platform.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 60 }}>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => setView("doctors")}
            style={{
              background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
              border: "none", borderRadius: 12, padding: "14px 32px",
              color: COLORS.white, fontSize: 16, fontWeight: 600, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 8,
              boxShadow: `0 8px 30px ${COLORS.teal}40`
            }}>
            <Calendar size={18} /> Book Appointment
          </motion.button>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => setView("clinics")}
            style={{
              background: "transparent", border: `1.5px solid ${COLORS.border}`,
              borderRadius: 12, padding: "14px 32px",
              color: COLORS.white, fontSize: 16, fontWeight: 600, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 8
            }}>
            <Building2 size={18} /> Explore Clinics
          </motion.button>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 0, justifyContent: "center", flexWrap: "wrap" }}>
          {STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              style={{
                textAlign: "center", padding: "20px 36px",
                borderRight: i < STATS.length - 1 ? `1px solid ${COLORS.border}` : "none"
              }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: COLORS.teal }}>{s.value}</div>
              <div style={{ color: COLORS.slate, fontSize: 13, fontWeight: 500, marginTop: 4 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
