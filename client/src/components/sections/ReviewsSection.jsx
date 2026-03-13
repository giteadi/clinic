import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { COLORS } from "../../constants/colors";
import { REVIEWS } from "../../constants/data";
import StarRow from "../common/StarRow";

export default function ReviewsSection() {
  return (
    <section style={{ background: COLORS.navy, padding: "100px 32px 80px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: COLORS.white, marginBottom: 16, textAlign: "center", fontWeight: 700 }}>
            What Patients Say
          </h2>
          <p style={{ color: COLORS.slate, fontSize: 16, marginBottom: 48, textAlign: "center", maxWidth: 600, margin: "0 auto 48px" }}>
            Real experiences from real patients who trusted CliniqPro
          </p>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
          {REVIEWS.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              style={{
                background: `${COLORS.navyLight}40`, backdropFilter: "blur(10px)",
                borderRadius: 20, padding: 32, border: `1px solid ${COLORS.border}`
              }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: `${COLORS.teal}22`, border: `2px solid ${COLORS.teal}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, fontWeight: 700, color: COLORS.teal
                }}>
                  {r.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div style={{ color: COLORS.white, fontWeight: 600, fontSize: 15 }}>{r.name}</div>
                  <StarRow rating={r.rating} />
                </div>
              </div>
              <p style={{ color: COLORS.slate, lineHeight: 1.6, fontSize: 14, marginBottom: 16 }}>
                "{r.text}"
              </p>
              <div style={{ color: COLORS.teal, fontSize: 12, fontWeight: 500 }}>{r.date}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
