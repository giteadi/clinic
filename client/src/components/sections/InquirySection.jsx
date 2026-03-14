import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

export default function InquirySection() {
  const { colors } = useTheme();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inquiry submitted:", form);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="theme-transition" style={{ background: colors.cream, padding: "80px 32px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: colors.slate, marginBottom: 16, textAlign: "center", fontWeight: 700 }}>
            Have Questions?
          </h2>
          <p style={{ color: colors.slate, fontSize: 16, marginBottom: 48, textAlign: "center" }}>
            We're here to help. Send us a message and we'll respond within 24 hours.
          </p>
        </motion.div>
        <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="theme-transition"
          style={{
            background: colors.white, borderRadius: 20, padding: 48,
            boxShadow: "0 20px 60px rgba(10,22,40,0.08)"
          }}>
          <div style={{ display: "grid", gap: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 24 }}>
              <div>
                <label style={{ display: "block", color: colors.slate, fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="theme-transition"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    border: `1px solid ${colors.border}`,
                    borderRadius: 10,
                    fontSize: 15,
                    background: colors.navyLight,
                    color: colors.slate,
                    outline: "none"
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", color: colors.slate, fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                  className="theme-transition"
                  style={{
                    width: "100%", padding: "14px 16px", borderRadius: 10,
                    border: `1px solid ${colors.border}`, background: colors.navyLight,
                    fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none",
                    color: colors.slate, boxSizing: "border-box"
                  }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: "block", color: colors.slate, fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
                Message
              </label>
              <textarea
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us how we can help..."
                rows={4}
                required
                className="theme-transition"
                style={{
                  width: "100%", padding: "14px 16px", borderRadius: 10,
                  border: `1px solid ${colors.border}`, background: colors.navyLight,
                  fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none",
                  color: colors.slate, boxSizing: "border-box", resize: "vertical"
                }}
              />
            </div>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              type="submit"
              className="theme-transition"
              style={{
                background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
                border: "none", borderRadius: 12, padding: "14px 32px",
                color: colors.white, fontWeight: 600, fontSize: 16, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                boxShadow: `0 8px 30px ${colors.teal}40`
              }}>
              <Send size={18} /> Send Message
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
