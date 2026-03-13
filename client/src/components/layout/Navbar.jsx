import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope, User, ChevronDown, LogOut, Menu, X
} from "lucide-react";
import { COLORS } from "../../constants/colors";

export default function Navbar({ view, setView, userRole, setUserRole }) {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const roles = ["guest", "patient", "admin", "superadmin"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: `${COLORS.navy}F0`, backdropFilter: "blur(20px)",
      borderBottom: `1px solid ${COLORS.border}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 clamp(16px, 4vw, 32px)", height: 64,
    }}>
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
        onClick={() => setView("home")}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <Stethoscope size={18} color="#fff" />
        </div>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(16px, 3vw, 20px)", fontWeight: 700, color: COLORS.white }}>
          Cliniq<span style={{ color: COLORS.teal }}>Pro</span>
        </span>
      </motion.div>

      {/* Desktop Navigation */}
      <div style={{ display: "none", "@media (min-width: 768px)": { display: "flex" }, gap: 28, alignItems: "center" }}>
        {["home", "doctors", "clinics"].map(v => (
          <button key={v} onClick={() => setView(v)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: view === v ? COLORS.teal : COLORS.slate,
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
              textTransform: "capitalize", letterSpacing: 0.3,
              borderBottom: view === v ? `2px solid ${COLORS.teal}` : "2px solid transparent",
              paddingBottom: 2, transition: "all 0.2s"
            }}>
            {v}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {/* Role Switcher */}
        <div style={{ position: "relative" }}>
          <button onClick={() => setOpen(!open)} style={{
            background: `${COLORS.teal}18`, border: `1px solid ${COLORS.border}`,
            borderRadius: 8, padding: "6px 14px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
            color: COLORS.teal, fontSize: 13, fontWeight: 600
          }}>
            <User size={14} /> {userRole} <ChevronDown size={12} />
          </button>
          <AnimatePresence>
            {open && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                style={{
                  position: "absolute", top: 42, right: 0,
                  background: COLORS.navyLight, border: `1px solid ${COLORS.border}`,
                  borderRadius: 10, overflow: "hidden", minWidth: 140
                }}>
                {roles.map(r => (
                  <button key={r} onClick={() => { setUserRole(r); setOpen(false); setView(r === "guest" ? "home" : `${r}-dashboard`); }}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "10px 16px", background: r === userRole ? `${COLORS.teal}18` : "none",
                      border: "none", cursor: "pointer", color: r === userRole ? COLORS.teal : COLORS.slate,
                      fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 500
                    }}>
                    {r}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: "flex", "@media (min-width: 768px)": { display: "none" },
            background: "none", border: "none", cursor: "pointer",
            padding: 8, borderRadius: 8
          }}
        >
          {mobileMenuOpen ? <X size={20} color={COLORS.white} /> : <Menu size={20} color={COLORS.white} />}
        </button>

        {userRole !== "guest" ? (
          <button onClick={() => { setUserRole("guest"); setView("home"); }}
            style={{
              display: "none", "@media (min-width: 768px)": { display: "flex" },
              background: "none", border: `1px solid ${COLORS.border}`,
              borderRadius: 8, padding: "6px 14px", cursor: "pointer",
              color: COLORS.slate, fontSize: 13, display: "flex", gap: 6, alignItems: "center"
            }}>
            <LogOut size={14} /> Logout
          </button>
        ) : (
          <button onClick={() => { setUserRole("patient"); setView("patient-dashboard"); }}
            style={{
              display: "none", "@media (min-width: 768px)": { display: "flex" },
              background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
              border: "none", borderRadius: 8, padding: "8px 18px", cursor: "pointer",
              color: COLORS.white, fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif"
            }}>
            Book Now
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, x: 300 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 300 }}
            style={{
              position: "fixed", top: 64, right: 0, bottom: 0, width: 280,
              background: COLORS.navy, borderLeft: `1px solid ${COLORS.border}`,
              padding: 20, zIndex: 99
            }}>
            <div style={{ display: "grid", gap: 8, marginBottom: 24 }}>
              {["home", "doctors", "clinics"].map(v => (
                <button key={v} onClick={() => { setView(v); setMobileMenuOpen(false); }}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: view === v ? COLORS.teal : COLORS.white,
                    fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500,
                    textTransform: "capitalize", padding: "12px 16px", borderRadius: 8,
                    textAlign: "left", width: "100%",
                    background: view === v ? `${COLORS.teal}18` : "none"
                  }}>
                  {v}
                </button>
              ))}
            </div>
            
            {userRole !== "guest" ? (
              <button onClick={() => { setUserRole("guest"); setView("home"); setMobileMenuOpen(false); }}
                style={{
                  background: `${COLORS.teal}18`, border: `1px solid ${COLORS.border}`,
                  borderRadius: 8, padding: "12px 16px", cursor: "pointer",
                  color: COLORS.white, fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 8,
                  width: "100%"
                }}>
                <LogOut size={16} /> Logout
              </button>
            ) : (
              <button onClick={() => { setUserRole("patient"); setView("patient-dashboard"); setMobileMenuOpen(false); }}
                style={{
                  background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
                  border: "none", borderRadius: 8, padding: "12px 16px", cursor: "pointer",
                  color: COLORS.white, fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
                  width: "100%"
                }}>
                Book Now
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
