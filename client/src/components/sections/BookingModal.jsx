import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Calendar, Clock, User, Mail, Phone, MessageSquare } from "lucide-react";
import { COLORS } from "../../constants/colors";
import Avatar from "../common/Avatar";

export default function BookingModal({ doctor, slot, onClose }) {
  console.log('BookingModal Debug - Props received:', { doctor, slot, onClose });
  
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", phone: "", email: "", reason: "" });
  const [done, setDone] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.phone) { 
      setDone(true); 
      setTimeout(onClose, 2500); 
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        position: "fixed", inset: 0, background: "rgba(10,22,40,0.85)",
        zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20, backdropFilter: "blur(8px)"
      }}>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
        style={{
          background: COLORS.white, borderRadius: 24, padding: 36, width: "100%",
          maxWidth: 480, position: "relative"
        }}>
        <button onClick={onClose} style={{ 
          position: "absolute", top: 16, right: 16, 
          background: COLORS.cream, border: "none", borderRadius: 8, 
          padding: 8, cursor: "pointer" 
        }}>
          <X size={18} color={COLORS.slate} />
        </button>

        {done ? (
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ 
              width: 64, height: 64, borderRadius: "50%", 
              background: `${COLORS.teal}18`, 
              display: "flex", alignItems: "center", justifyContent: "center", 
              margin: "0 auto 16px" 
            }}>
              <Check size={32} color={COLORS.teal} />
            </div>
            <h3 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: 24, color: COLORS.navy, marginBottom: 8 
            }}>
              Appointment Confirmed!
            </h3>
            <p style={{ color: COLORS.slate, fontSize: 14 }}>
              We've sent confirmation details to your phone.
            </p>
          </motion.div>
        ) : (
          <div>
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: 24, color: COLORS.navy, marginBottom: 24, fontWeight: 700 
            }}>
              Book Appointment
            </h2>

            <div style={{ 
              display: "flex", alignItems: "center", gap: 16, 
              padding: "16px", background: COLORS.cream, 
              borderRadius: 12, marginBottom: 24 
            }}>
              <Avatar initials={doctor.img} color={doctor.color} size={48} />
              <div>
                <div style={{ color: COLORS.navy, fontWeight: 600, fontSize: 16 }}>{doctor.name}</div>
                <div style={{ color: COLORS.slate, fontSize: 13 }}>{doctor.specialty}</div>
                <div style={{ 
                  display: "flex", alignItems: "center", gap: 8, marginTop: 4 
                }}>
                  <Calendar size={14} color={COLORS.teal} />
                  <span style={{ color: COLORS.teal, fontSize: 13 }}>
                    {typeof slot === 'object' ? JSON.stringify(slot) : slot}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gap: 16 }}>
              <div>
                <label style={{ 
                  display: "block", color: COLORS.navy, fontWeight: 600, 
                  marginBottom: 8, fontSize: 14 
                }}>
                  Full Name
                </label>
                <div style={{ position: "relative" }}>
                  <User size={16} color={COLORS.slate} style={{ 
                    position: "absolute", left: 14, top: "50%", 
                    transform: "translateY(-50%)" 
                  }} />
                  <input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your full name"
                    style={{
                      width: "100%", padding: "12px 16px 12px 42px", borderRadius: 10,
                      border: `1.5px solid ${COLORS.border}`, background: COLORS.cream,
                      fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none",
                      color: COLORS.navy, boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ 
                  display: "block", color: COLORS.navy, fontWeight: 600, 
                  marginBottom: 8, fontSize: 14 
                }}>
                  Phone Number
                </label>
                <div style={{ position: "relative" }}>
                  <Phone size={16} color={COLORS.slate} style={{ 
                    position: "absolute", left: 14, top: "50%", 
                    transform: "translateY(-50%)" 
                  }} />
                  <input
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    style={{
                      width: "100%", padding: "12px 16px 12px 42px", borderRadius: 10,
                      border: `1.5px solid ${COLORS.border}`, background: COLORS.cream,
                      fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none",
                      color: COLORS.navy, boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ 
                  display: "block", color: COLORS.navy, fontWeight: 600, 
                  marginBottom: 8, fontSize: 14 
                }}>
                  Email (Optional)
                </label>
                <div style={{ position: "relative" }}>
                  <Mail size={16} color={COLORS.slate} style={{ 
                    position: "absolute", left: 14, top: "50%", 
                    transform: "translateY(-50%)" 
                  }} />
                  <input
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    style={{
                      width: "100%", padding: "12px 16px 12px 42px", borderRadius: 10,
                      border: `1.5px solid ${COLORS.border}`, background: COLORS.cream,
                      fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none",
                      color: COLORS.navy, boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ 
                  display: "block", color: COLORS.navy, fontWeight: 600, 
                  marginBottom: 8, fontSize: 14 
                }}>
                  Reason for Visit
                </label>
                <div style={{ position: "relative" }}>
                  <MessageSquare size={16} color={COLORS.slate} style={{ 
                    position: "absolute", left: 14, top: 16, 
                  }} />
                  <textarea
                    value={form.reason}
                    onChange={e => setForm({ ...form, reason: e.target.value })}
                    placeholder="Describe your symptoms or reason for visit..."
                    rows={3}
                    style={{
                      width: "100%", padding: "12px 16px 12px 42px", borderRadius: 10,
                      border: `1.5px solid ${COLORS.border}`, background: COLORS.cream,
                      fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none",
                      color: COLORS.navy, boxSizing: "border-box", resize: "vertical"
                    }}
                  />
                </div>
              </div>
            </div>

            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              style={{
                background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
                border: "none", borderRadius: 12, padding: "14px 24px",
                color: COLORS.white, fontWeight: 600, fontSize: 16, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", width: "100%", marginTop: 24,
                boxShadow: `0 8px 30px ${COLORS.teal}40`
              }}>
              Confirm Booking
            </motion.button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
