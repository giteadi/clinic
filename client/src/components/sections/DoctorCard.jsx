import { motion } from "framer-motion";
import { MapPin, Clock, Calendar, Star } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import Avatar from "../common/Avatar";
import StarRow from "../common/StarRow";
import Badge from "../common/Badge";

export default function DoctorCard({ doc, onBook }) {
  const { colors } = useTheme();
  return (
    <motion.div whileHover={{ y: -4 }} style={{
      background: colors.white, borderRadius: 20, padding: 24,
      boxShadow: "0 10px 40px rgba(10,22,40,0.08)",
      border: `1px solid ${colors.border}`,
      width: "100%", maxWidth: 360, cursor: "pointer"
    }}>
      <div style={{ display: "flex", alignItems: "start", gap: 16, marginBottom: 20 }}>
        <Avatar initials={doc.img} color={doc.color} size={64} />
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: colors.navy, marginBottom: 4, fontWeight: 700 }}>
            {doc.name}
          </h3>
          <p style={{ color: colors.slate, fontSize: 13, marginBottom: 8 }}>{doc.specialty}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <StarRow rating={doc.rating} />
            <span style={{ color: colors.slate, fontSize: 12 }}>({doc.reviews})</span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <MapPin size={14} color={colors.slate} />
        <span style={{ color: colors.slate, fontSize: 13 }}>{doc.clinic}</span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <div style={{ color: colors.navy, fontWeight: 600, fontSize: 16 }}>{doc.fee}</div>
          <div style={{ color: colors.slate, fontSize: 12 }}>{doc.exp} experience</div>
        </div>
        <Badge>{doc.specialty}</Badge>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <Clock size={14} color={colors.teal} />
          <span style={{ color: colors.navy, fontWeight: 600, fontSize: 13 }}>Available Slots</span>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {doc.slots.map((slot, i) => (
            <button key={i} onClick={() => onBook(doc, slot)}
              style={{
                padding: "6px 12px", borderRadius: 8, border: `1px solid ${colors.border}`,
                background: colors.cream, color: colors.navy, fontSize: 12, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s"
              }}
              onMouseOver={(e) => {
                e.target.style.background = colors.teal;
                e.target.style.color = colors.white;
              }}
              onMouseOut={(e) => {
                e.target.style.background = colors.cream;
                e.target.style.color = colors.navy;
              }}>
              {slot}
            </button>
          ))}
        </div>
      </div>

      <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
        onClick={() => onBook(doc, doc.slots[0])}
        style={{
          background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
          border: "none", borderRadius: 10, padding: "12px 20px",
          color: colors.white, fontWeight: 600, fontSize: 14, cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif", width: "100%",
          boxShadow: `0 4px 20px ${colors.teal}40`
        }}>
        Book Appointment
      </motion.button>
    </motion.div>
  );
}
