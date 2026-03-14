import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Heart, Activity, Stethoscope, Shield } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { SPECIALTIES } from "../../constants/data";

export default function SearchSection({ setView }) {
  const { colors } = useTheme();
  const [query, setQuery] = useState("");
  
  const getIcon = (iconName) => {
    const icons = {
      Heart, Activity, Stethoscope, Shield
    };
    return icons[iconName] || Stethoscope;
  };
  
  return (
    <section className="theme-transition" style={{ 
      background: colors.cream, 
      padding: "clamp(40px, 8vw, 60px) clamp(20px, 4vw, 32px)",
      display: "grid",
      placeItems: "center"
    }}>
      <div style={{ 
        maxWidth: "1000px", 
        margin: "0 auto", 
        width: "100%",
        display: "grid",
        gap: "clamp(20px, 4vw, 30px)"
      }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          className="theme-transition"
          style={{
            background: colors.white, 
            borderRadius: "clamp(12px, 2vw, 20px)", 
            padding: "clamp(24px, 4vw, 32px) clamp(20px, 4vw, 36px)",
            boxShadow: "0 20px 60px rgba(10,22,40,0.08)",
            display: "grid",
            gap: "clamp(20px, 4vw, 30px)"
          }}>
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: "clamp(24px, 4vw, 28px)", 
            color: colors.slate, 
            fontWeight: 700,
            textAlign: "center"
          }}>
            Find Your Doctor
          </h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
            gap: "clamp(12px, 2vw, 12px)",
            alignItems: "end"
          }}>
            <div style={{ position: "relative" }}>
              <Search size={16} color={colors.slate} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Doctor name or specialty..."
                className="theme-transition"
                style={{
                  width: "100%", 
                  padding: "clamp(12px, 2.5vw, 12px) clamp(16px, 3vw, 16px) clamp(12px, 2.5vw, 12px) 42px", 
                  borderRadius: 10,
                  border: `1.5px solid ${colors.border}`, 
                  background: colors.navyLight,
                  fontSize: "clamp(14px, 2vw, 14px)", 
                  fontFamily: "'DM Sans', sans-serif", 
                  outline: "none",
                  color: colors.slate, 
                  boxSizing: "border-box"
                }} />
            </div>
            <div style={{ position: "relative" }}>
              <MapPin size={16} color={colors.slate} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
              <input placeholder="City or clinic..."
                className="theme-transition"
                style={{
                  width: "100%", 
                  padding: "clamp(12px, 2.5vw, 12px) clamp(16px, 3vw, 16px) clamp(12px, 2.5vw, 12px) 42px", 
                  borderRadius: 10,
                  border: `1.5px solid ${colors.border}`, 
                  background: colors.navyLight,
                  fontSize: "clamp(14px, 2vw, 14px)", 
                  fontFamily: "'DM Sans', sans-serif", 
                  outline: "none",
                  color: colors.slate, 
                  boxSizing: "border-box"
                }} />
            </div>
            <motion.button whileHover={{ scale: 1.03 }} onClick={() => setView("doctors")}
              className="theme-transition"
              style={{
                background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
                border: "none", 
                borderRadius: 10, 
                padding: "clamp(12px, 2.5vw, 12px) clamp(20px, 4vw, 28px)",
                color: colors.white, 
                fontWeight: 600, 
                fontSize: "clamp(14px, 2vw, 14px)", 
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                width: "100%"
              }}>
              Search
            </motion.button>
          </div>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", 
            gap: "clamp(8px, 2vw, 12px)",
            justifyItems: "center"
          }}>
            {SPECIALTIES.map(sp => {
              const IconComponent = getIcon(sp.icon);
              return (
                <button key={sp.label}
                  className="theme-transition"
                  style={{
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    gap: 8, 
                    padding: "clamp(6px, 1.5vw, 8px) clamp(12px, 3vw, 16px)",
                    background: `${colors.teal}10`, 
                    border: `1px solid ${colors.border}`,
                    borderRadius: 30, 
                    cursor: "pointer", 
                    color: colors.slate,
                    fontSize: "clamp(12px, 2vw, 13px)", 
                    fontWeight: 500, 
                    fontFamily: "'DM Sans', sans-serif",
                    width: "100%"
                  }}>
                  <IconComponent size={14} color={colors.teal} />
                  {sp.label}
                  <span style={{ color: colors.slate, fontSize: "clamp(10px, 1.5vw, 12px)" }}>({sp.count})</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
