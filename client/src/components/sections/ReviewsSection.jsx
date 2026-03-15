import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { THEMES } from "../../contexts/ThemeContext";
import { useClinic } from "../../contexts/ClinicContext";
import clinicService from "../../services/clinicService";
import { REVIEWS } from "../../constants/data";
import StarRow from "../common/StarRow";

export default function ReviewsSection() {
  const { colors, theme } = useTheme();
  const { isClinicSpecific, clinicId, clinicName, primaryColor } = useClinic();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadReviews = async () => {
      if (isClinicSpecific && clinicId) {
        setLoading(true);
        try {
          const clinicReviews = await clinicService.getClinicReviews(clinicId);
          console.log('API Response:', clinicReviews); // Debug log
          // API returns { success: true, data: [...] }
          setReviews(clinicReviews.data || clinicReviews);
        } catch (error) {
          console.error('Error loading clinic reviews:', error);
          setReviews(REVIEWS);
        } finally {
          setLoading(false);
        }
      } else {
        setReviews(REVIEWS);
      }
    };

    loadReviews();
  }, [isClinicSpecific, clinicId]);
  return (
    <section className="theme-transition" style={{ background: colors.navy, padding: "100px 32px 80px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: theme === THEMES.WHITE ? colors.slate : colors.white, marginBottom: 16, textAlign: "center", fontWeight: 700 }}>
            {isClinicSpecific ? `What Patients Say About ${clinicName}` : 'What Patients Say'}
          </h2>
          <p style={{ color: colors.slate, fontSize: 16, marginBottom: 48, textAlign: "center", maxWidth: 600, margin: "0 auto 48px" }}>
            {isClinicSpecific 
              ? `Real experiences from patients who trusted ${clinicName} for their healthcare needs`
              : 'Real experiences from real patients who trusted CliniqPro'
            }
          </p>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
          {loading ? (
            <div style={{ textAlign: 'center', color: colors.slate, padding: '40px' }}>
              Loading reviews...
            </div>
          ) : Array.isArray(reviews) && reviews.length > 0 ? (
            reviews.map((r, i) => (
              <motion.div key={r.id || i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                style={{
                  background: `${colors.navyLight}40`, backdropFilter: "blur(10px)",
                  borderRadius: 20, padding: 32, border: `1px solid ${colors.border}`
                }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: `${isClinicSpecific ? primaryColor : colors.teal}22`, 
                    border: `2px solid ${isClinicSpecific ? primaryColor : colors.teal}44`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, fontWeight: 700, color: isClinicSpecific ? primaryColor : colors.teal
                  }}>
                    {(r.patientName || r.name).split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{ color: colors.white, fontWeight: 600, fontSize: 15 }}>{r.patientName || r.name}</div>
                    <StarRow rating={r.rating} />
                  </div>
                </div>
                <p style={{ color: colors.slate, lineHeight: 1.6, fontSize: 14, marginBottom: 16 }}>
                  "{r.comment || r.text}"
                </p>
                <div style={{ color: isClinicSpecific ? primaryColor : colors.teal, fontSize: 12, fontWeight: 500 }}>{r.date}</div>
              </motion.div>
            ))
          ) : (
            <div style={{ textAlign: 'center', color: colors.slate, padding: '40px' }}>
              No reviews available yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
