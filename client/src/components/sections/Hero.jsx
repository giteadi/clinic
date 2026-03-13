import { motion } from "framer-motion";
import { Calendar, Building2, Zap } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { STATS } from "../../constants/data";

export default function Hero({ setView }) {
  const { colors } = useTheme();
  
  return (
    <section style={{
      minHeight: "100vh", 
      background: colors.navy,
      display: "grid",
      placeItems: "center",
      padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px) clamp(40px, 8vw, 60px)", 
      position: "relative", 
      overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", top: -120, right: -120, width: "clamp(300px, 40vw, 500px)", height: "clamp(300px, 40vw, 500px)",
        borderRadius: "50%", background: `radial-gradient(circle, ${colors.teal}12, transparent 70%)`,
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", bottom: -80, left: -80, width: "clamp(250px, 35vw, 400px)", height: "clamp(250px, 35vw, 400px)",
        borderRadius: "50%", background: `radial-gradient(circle, ${colors.gold}10, transparent 70%)`,
        pointerEvents: "none"
      }} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        className="hero-content"
        style={{ 
          textAlign: "center", 
          maxWidth: "min(900px, 95%)", 
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(16px, 4vw, 40px)",
          margin: "0 auto",
          width: "100%"
        }}>

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: `${colors.teal}15`, border: `1px solid ${colors.teal}30`,
          borderRadius: 30, padding: "clamp(4px, 1vw, 6px) clamp(12px, 3vw, 18px)", 
          margin: "0 auto"
        }}>
          <Zap size={14} color={colors.teal} />
          <span style={{ 
            color: colors.teal, 
            fontSize: "clamp(11px, 2vw, 13px)", 
            fontWeight: 600, 
            letterSpacing: 0.5 
          }}>
            Trusted by 500+ Clinics Across India
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(32px, 6vw, 72px)", 
          lineHeight: 1.1,
          color: colors.white, 
          fontWeight: 700
        }}>
          Your Health,<br />
          <span style={{ color: colors.teal }}>Beautifully</span> Managed
        </h1>

        <p style={{
          color: colors.slate, 
          fontSize: "clamp(14px, 2.5vw, 18px)", 
          lineHeight: 1.7, 
          fontFamily: "'DM Sans', sans-serif",
          maxWidth: "600px",
          margin: "0 auto"
        }}>
          Book appointments with top doctors, manage your clinic, and deliver exceptional patient care — all in one elegant platform.
        </p>

        <div style={{ 
          display: "flex", 
          flexDirection: "column",
          gap: "clamp(12px, 3vw, 14px)", 
          margin: "0 auto",
          width: "100%",
          maxWidth: "500px"
        }}>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => setView("doctors")}
            style={{
              background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
              border: "none", borderRadius: 12, 
              padding: "clamp(12px, 2.5vw, 14px) clamp(20px, 4vw, 32px)",
              color: colors.white, 
              fontSize: "clamp(14px, 2.5vw, 16px)", 
              fontWeight: 600, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              gap: 8,
              boxShadow: `0 8px 30px ${colors.teal}40`,
              width: "100%"
            }}>
            <Calendar size={18} /> Book Appointment
          </motion.button>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => setView("clinics")}
            style={{
              background: "transparent", 
              border: `1.5px solid ${colors.border}`,
              borderRadius: 12, 
              padding: "clamp(12px, 2.5vw, 14px) clamp(20px, 4vw, 32px)",
              color: colors.white, 
              fontSize: "clamp(14px, 2.5vw, 16px)", 
              fontWeight: 600, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              gap: 8,
              width: "100%"
            }}>
            <Building2 size={18} /> Explore Clinics
          </motion.button>
        </div>

        <div className="stats-container" style={{ 
          display: "flex", 
          flexDirection: "column",
          gap: 0, 
          margin: "0 auto",
          width: "100%",
          maxWidth: "600px"
        }}>
          {STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="stat-item"
              style={{
                textAlign: "center", 
                padding: "clamp(16px, 3vw, 20px) clamp(20px, 4vw, 36px)",
                borderRight: i < STATS.length - 1 ? `1px solid ${colors.border}` : "none",
                display: "grid",
                gap: "clamp(4px, 1vw, 8px)"
              }}>
              <div style={{ 
                fontFamily: "'Playfair Display', serif", 
                fontSize: "clamp(24px, 4vw, 32px)", 
                fontWeight: 700, 
                color: colors.teal 
              }}>{s.value}</div>
              <div style={{ 
                color: colors.slate, 
                fontSize: "clamp(11px, 2vw, 13px)", 
                fontWeight: 500 
              }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
