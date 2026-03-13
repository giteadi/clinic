import { motion } from "framer-motion";
import { COLORS } from "../../constants/colors";
import { DOCTORS } from "../../constants/data";
import DoctorCard from "./DoctorCard";

export default function DoctorsView({ onBook }) {
  return (
    <section style={{ 
      minHeight: "100vh", 
      background: COLORS.cream, 
      padding: "clamp(60px, 8vw, 100px) clamp(16px, 4vw, 32px) 60px",
      display: "grid",
      gridTemplateRows: "auto 1fr"
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: "clamp(28px, 4vw, 36px)", 
            color: COLORS.navy, 
            marginBottom: 8,
            textAlign: { xs: "center", md: "left" }
          }}>
            Our Doctors
          </h2>
          <p style={{ 
            color: COLORS.slate, 
            fontSize: "clamp(14px, 2vw, 16px)", 
            marginBottom: "clamp(24px, 4vw, 36px)",
            textAlign: { xs: "center", md: "left" }
          }}>
            Book with verified specialists instantly
          </p>
        </motion.div>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
          gap: "clamp(16px, 3vw, 24px)",
          justifyItems: "center"
        }}>
          {DOCTORS.map(doc => <DoctorCard key={doc.id} doc={doc} onBook={onBook} />)}
        </div>
      </div>
    </section>
  );
}
