import { motion } from "framer-motion";
import { MapPin, Clock, Calendar, Star } from "lucide-react";
import { COLORS } from "../../constants/colors";
import Avatar from "../common/Avatar";
import StarRow from "../common/StarRow";
import Badge from "../common/Badge";

export default function DoctorCard({ doc, onBook }) {
  return (
    <motion.div whileHover={{ y: -4 }} style={{
      background: COLORS.white, borderRadius: 20, padding: 24,
      boxShadow: "0 10px 40px rgba(10,22,40,0.08)",
      border: `1px solid ${COLORS.border}`,
      width: "100%", maxWidth: 360, cursor: "pointer"
    }}>
      <div style={{ display: "flex", alignItems: "start", gap: 16, marginBottom: 20 }}>
        <Avatar initials={doc.img} color={doc.color} size={64} />
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: COLORS.navy, marginBottom: 4, fontWeight: 700 }}>
            {doc.name}
          </h3>
          <p style={{ color: COLORS.slate, fontSize: 13, marginBottom: 8 }}>{doc.specialty}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <StarRow rating={doc.rating} />
            <span style={{ color: COLORS.slate, fontSize: 12 }}>({doc.reviews})</span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <MapPin size={14} color={COLORS.slate} />
        <span style={{ color: COLORS.slate, fontSize: 13 }}>{doc.clinic}</span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <div style={{ color: COLORS.navy, fontWeight: 600, fontSize: 16 }}>{doc.fee}</div>
          <div style={{ color: COLORS.slate, fontSize: 12 }}>{doc.exp} experience</div>
        </div>
        <Badge>{doc.specialty}</Badge>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <Clock size={14} color={COLORS.teal} />
          <span style={{ color: COLORS.navy, fontWeight: 600, fontSize: 13 }}>Available Slots</span>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {doc.slots.map((slot, i) => (
            <button key={i} onClick={() => onBook(doc, slot)}
              style={{
                padding: "6px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`,
                background: COLORS.cream, color: COLORS.navy, fontSize: 12, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s"
              }}
              onMouseOver={(e) => {
                e.target.style.background = COLORS.teal;
                e.target.style.color = COLORS.white;
              }}
              onMouseOut={(e) => {
                e.target.style.background = COLORS.cream;
                e.target.style.color = COLORS.navy;
              }}>
              {slot}
            </button>
          ))}
        </div>
      </div>

      <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
        onClick={() => onBook(doc, doc.slots[0])}
        style={{
          background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
          border: "none", borderRadius: 10, padding: "12px 20px",
          color: COLORS.white, fontWeight: 600, fontSize: 14, cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif", width: "100%",
          boxShadow: `0 4px 20px ${COLORS.teal}40`
        }}>
        Book Appointment
      </motion.button>
    </motion.div>
  );
}
