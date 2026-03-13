import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { logout, clearPersistedData } from "../../store/authSlice";

export default function Navbar({ view, setView, userRole, setUserRole }) {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get actual user role from Redux state
  const actualUserRole = user?.role || 'guest';

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

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearPersistedData());
    setUserRole("guest");
    setView("home");
  };

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

          {/* USER INFO */}
          {isAuthenticated && actualUserRole !== "guest" && (
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 8,
              padding: "6px 14px",
              background: "#111827",
              border: `1px solid ${COLORS.border}`,
              borderRadius: 8
            }}>
              <User size={14} />
              <span style={{ color: COLORS.white, fontSize: 13, fontWeight: 600 }}>
                {user?.name || actualUserRole}
              </span>
            </div>
          )}

          {/* DASHBOARD BUTTON */}
          {isAuthenticated && actualUserRole !== "guest" && (
            <button
              onClick={() => setView(`${actualUserRole}-dashboard`)}
              style={{
                background: `${COLORS.teal}15`,
                border: `1px solid ${COLORS.teal}30`,
                borderRadius: 8,
                padding: "6px 14px",
                cursor: "pointer",
                color: COLORS.teal,
                fontSize: 13,
                fontWeight: 600
              }}
            >
              {actualUserRole === "admin" || actualUserRole === "superadmin" 
                ? `${actualUserRole.charAt(0).toUpperCase() + actualUserRole.slice(1)} Dashboard`
                : "Dashboard"
              }
            </button>
          )}

          {/* DESKTOP BOOK APPOINTMENT BUTTON */}
          <button
            onClick={() => {
              if (isAuthenticated && actualUserRole !== "guest") {
                // Check if user is a patient and has a linked clinic
                if (actualUserRole === "patient" && user?.linkedClinic) {
                  // Set the linked clinic and go directly to doctor selection
                  localStorage.setItem('selectedClinic', JSON.stringify(user.linkedClinic));
                  setView("doctor-selection");
                } else if (actualUserRole === "admin" || actualUserRole === "superadmin") {
                  // For admin/superadmin, go to appointment management
                  setView("admin-appointment");
                } else {
                  // For other users or patients without linked clinic, show clinic selection
                  setView("clinic-selection");
                }
              } else {
                setView("login");
              }
            }}
            className="desktop-book-btn"
            style={{
              background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
              border: "none",
              borderRadius: 8,
              padding: "8px 18px",
              cursor: "pointer",
              color: COLORS.white,
              fontSize: 13,
              fontWeight: 600
            }}
          >
            Book Appointment
          </button>

          {/* LOGIN/LOGOUT BUTTON - DESKTOP */}
          {isAuthenticated && actualUserRole !== "guest" ? (
            <button
              onClick={handleLogout}
              className="desktop-logout-btn"
              style={{
                background: COLORS.red,
                border: `1px solid ${COLORS.red}`,
                borderRadius: 8,
                padding: "6px 14px",
                cursor: "pointer",
                color: COLORS.white,
                fontSize: 13,
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 6
              }}
            >
              <LogOut size={14} /> Logout
            </button>
          ) : (
            <button
              onClick={() => setView("login")}
              className="desktop-login-btn"
              style={{
                background: "none",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                padding: "6px 14px",
                cursor: "pointer",
                color: COLORS.slate,
                fontSize: 13,
                fontWeight: 500
              }}
            >
              Login
            </button>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
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

            {/* USER INFO IN MOBILE MENU */}
            {isAuthenticated && actualUserRole !== "guest" && (
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 16px",
                background: "#111827",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                marginBottom: 12
              }}>
                <User size={16} />
                <span style={{ color: COLORS.white, fontSize: 14, fontWeight: 600 }}>
                  {user?.name || actualUserRole}
                </span>
              </div>
            )}

            {/* DASHBOARD BUTTON IN MOBILE MENU */}
            {isAuthenticated && actualUserRole !== "guest" && (
              <button
                onClick={() => {
                  setView(`${actualUserRole}-dashboard`);
                  setMobileMenuOpen(false);
                }}
                style={{
                  background: `${COLORS.teal}15`,
                  border: `1px solid ${COLORS.teal}30`,
                  borderRadius: 8,
                  padding: "12px 16px",
                  cursor: "pointer",
                  color: COLORS.teal,
                  fontSize: 14,
                  fontWeight: 600,
                  width: "100%",
                  marginBottom: 12
                }}
              >
                {actualUserRole === "admin" || actualUserRole === "superadmin" 
                  ? `${actualUserRole.charAt(0).toUpperCase() + actualUserRole.slice(1)} Dashboard`
                  : "Dashboard"
                }
              </button>
            )}

            {/* BOOK APPOINTMENT BUTTON IN MOBILE MENU */}
            {isAuthenticated && actualUserRole !== "guest" && (
              <button
                onClick={() => {
                  // Check if user is a patient and has a linked clinic
                  if (actualUserRole === "patient" && user?.linkedClinic) {
                    // Set the linked clinic and go directly to doctor selection
                    localStorage.setItem('selectedClinic', JSON.stringify(user.linkedClinic));
                    setView("doctor-selection");
                  } else if (actualUserRole === "admin" || actualUserRole === "superadmin") {
                    // For admin/superadmin, go to appointment management
                    setView("admin-appointment");
                  } else {
                    // For other users or patients without linked clinic, show clinic selection
                    setView("clinic-selection");
                  }
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
                  width: "100%",
                  marginBottom: 12
                }}
              >
                Book Appointment
              </button>
            )}

            {/* ACTION BUTTON INSIDE MOBILE MENU */}
            {isAuthenticated && actualUserRole !== "guest" ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                style={{
                  background: "none",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  padding: "12px 16px",
                  cursor: "pointer",
                  color: COLORS.red,
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
                  setView("login");
                  setMobileMenuOpen(false);
                }}
                style={{
                  background: `${COLORS.teal}15`,
                  border: `1px solid ${COLORS.teal}30`,
                  borderRadius: 8,
                  padding: "12px 16px",
                  cursor: "pointer",
                  color: COLORS.teal,
                  fontSize: 14,
                  fontWeight: 600,
                  width: "100%"
                }}
              >
                Login / Register
              </button>
            )}

          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}