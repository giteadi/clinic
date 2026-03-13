import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  User,
  ChevronDown,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { COLORS } from "../../constants/colors";

export default function Navbar({ view, setView, userRole, setUserRole }) {

  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const roles = ["guest", "patient", "admin", "superadmin"];

  // ✅ Auto close mobile menu when screen becomes desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: `linear-gradient(180deg, ${COLORS.navy}, #0b162c)`,
          borderBottom: `1px solid ${COLORS.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(16px, 4vw, 32px)",
          height: 64,
          boxShadow: "0 6px 25px rgba(0,0,0,0.5)"
        }}
      >

        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer"
          }}
          onClick={() => setView("home")}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Stethoscope size={18} color="#fff" />
          </div>

          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(16px, 3vw, 20px)",
              fontWeight: 700,
              color: COLORS.white
            }}
          >
            Cliniq<span style={{ color: COLORS.teal }}>Pro</span>
          </span>
        </motion.div>


        {/* DESKTOP NAV */}
        <div
          className="desktop-nav"
          style={{
            display: "flex",
            gap: 28,
            alignItems: "center"
          }}
        >
          {["home", "doctors", "clinics"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: view === v ? COLORS.teal : COLORS.slate,
                fontSize: 14,
                fontWeight: 500,
                textTransform: "capitalize",
                borderBottom:
                  view === v
                    ? `2px solid ${COLORS.teal}`
                    : "2px solid transparent",
                paddingBottom: 2
              }}
            >
              {v}
            </button>
          ))}
        </div>


        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>

          {/* ROLE SWITCHER */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setOpen(!open)}
              style={{
                background: "#111827",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                padding: "6px 14px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: COLORS.white,
                fontSize: 13,
                fontWeight: 600
              }}
            >
              <User size={14} /> {userRole} <ChevronDown size={12} />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  style={{
                    position: "absolute",
                    top: 42,
                    right: 0,
                    background: "#0f172a",
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 10,
                    overflow: "hidden",
                    minWidth: 140,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.6)"
                  }}
                >
                  {roles.map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setUserRole(r);
                        setOpen(false);
                        setView(r === "guest" ? "home" : `${r}-dashboard`);
                      }}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        padding: "10px 16px",
                        background:
                          r === userRole ? `${COLORS.teal}18` : "none",
                        border: "none",
                        cursor: "pointer",
                        color:
                          r === userRole ? COLORS.teal : COLORS.slate,
                        fontSize: 13
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>


          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "flex",
              background: "#111827",
              border: `1px solid ${COLORS.border}`,
              cursor: "pointer",
              padding: 8,
              borderRadius: 8
            }}
          >
            {mobileMenuOpen
              ? <X size={20} color={COLORS.white}/>
              : <Menu size={20} color={COLORS.white}/>}
          </button>

        </div>
      </nav>


      {/* OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: "fixed",
              top: 64,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.55)",
              zIndex: 98
            }}
          />
        )}
      </AnimatePresence>


      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              top: 64,
              right: 0,
              bottom: 0,
              width: 280,
              background: `linear-gradient(180deg, ${COLORS.navy}, #0b162c)`,
              borderLeft: `1px solid ${COLORS.border}`,
              padding: 20,
              zIndex: 99,
              boxShadow: "-10px 0 40px rgba(0,0,0,0.7)"
            }}
          >

            <div style={{ display: "grid", gap: 8, marginBottom: 24 }}>
              {["home", "doctors", "clinics"].map((v) => (
                <button
                  key={v}
                  onClick={() => {
                    setView(v);
                    setMobileMenuOpen(false);
                  }}
                  style={{
                    background:
                      view === v ? `${COLORS.teal}20` : "#0f172a",
                    border: `1px solid ${COLORS.border}`,
                    cursor: "pointer",
                    color: view === v ? COLORS.teal : COLORS.white,
                    fontSize: 15,
                    padding: "12px 16px",
                    borderRadius: 8,
                    textAlign: "left"
                  }}
                >
                  {v}
                </button>
              ))}
            </div>

            {/* ACTION BUTTON INSIDE MOBILE MENU */}
            {userRole !== "guest" ? (
              <button
                onClick={() => {
                  setUserRole("guest");
                  setView("home");
                  setMobileMenuOpen(false);
                }}
                style={{
                  background: "none",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  padding: "12px 16px",
                  cursor: "pointer",
                  color: COLORS.slate,
                  fontSize: 14,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  width: "100%"
                }}
              >
                <LogOut size={16} /> Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  setUserRole("patient");
                  setView("patient-dashboard");
                  setMobileMenuOpen(false);
                }}
                style={{
                  background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
                  border: "none",
                  borderRadius: 8,
                  padding: "12px 16px",
                  cursor: "pointer",
                  color: COLORS.white,
                  fontSize: 14,
                  fontWeight: 600,
                  width: "100%"
                }}
              >
                Book Now
              </button>
            )}

          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}