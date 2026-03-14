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
import { useTheme } from "../../contexts/ThemeContext";
import ThemeToggle from "../common/ThemeToggle";
import { logout, clearPersistedData } from "../../store/authSlice";

export default function Navbar({ view, setView, userRole, setUserRole }) {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Get actual user role from Redux state
  const actualUserRole = user?.role || 'guest';

  // ✅ Handle responsive screen size
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
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
        className="theme-transition"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: colors.white,
          borderBottom: `1px solid ${colors.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(16px, 4vw, 32px)",
          height: 64,
          boxShadow: "0 6px 25px rgba(0,0,0,0.5)"
        }}
      >

        {/* colors.GO */}
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
              background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
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
              color: colors.slate
            }}
          >
            Cliniq<span style={{ color: colors.teal }}>Pro</span>
          </span>
        </motion.div>


        {/* DESKTOP NAV */}
        <div
          className="desktop-nav"
          style={{
            display: !isMobile ? "flex" : "none",
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
                color: view === v ? colors.teal : colors.slate,
                fontSize: 14,
                fontWeight: 500,
                textTransform: "capitalize",
                borderBottom:
                  view === v
                    ? `2px solid ${colors.teal}`
                    : "2px solid transparent",
                paddingBottom: 2
              }}
            >
              {v}
            </button>
          ))}
          
          {/* THEME TOGGLE - DESKTOP */}
          <ThemeToggle />
        </div>


        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>

          {/* USER INFO - DESKTOP ONLY */}
          {isAuthenticated && actualUserRole !== "guest" && !isMobile && (
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 8,
              padding: "6px 14px",
              background: colors.background || colors.navyLight,
              border: `1px solid ${colors.border}`,
              borderRadius: 8
            }}>
              <User size={14} color={colors.slate} />
              <span style={{ color: colors.slate, fontSize: 13, fontWeight: 600 }}>
                {user?.name || actualUserRole}
              </span>
            </div>
          )}

          {/* DASHBOARD BUTTON - DESKTOP ONLY */}
          {isAuthenticated && actualUserRole !== "guest" && !isMobile && (
            <button
              onClick={() => setView(`${actualUserRole}-dashboard`)}
              style={{
                background: `${colors.teal}15`,
                border: `1px solid ${colors.teal}30`,
                borderRadius: 8,
                padding: "6px 14px",
                cursor: "pointer",
                color: colors.teal,
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

          {/* BOOK APPOINTMENT BUTTON - DESKTOP ONLY */}
          {!isMobile && (
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
                  setView("clinic-selection");
                }
              }}
              style={{
                background: `${colors.teal}15`,
                border: `1px solid ${colors.teal}30`,
                borderRadius: 8,
                padding: "6px 14px",
                cursor: "pointer",
                color: colors.teal,
                fontSize: 13,
                fontWeight: 600
              }}
            >
              Book Appointment
            </button>
          )}

          {/* colors.GIN/colors.GOUT BUTTON - DESKTOP ONLY */}
          {!isMobile && (
            isAuthenticated && actualUserRole !== "guest" ? (
              <button
                onClick={handleLogout}
                className="desktop-logout-btn"
                style={{
                  background: colors.red,
                  border: `1px solid ${colors.red}`,
                  borderRadius: 8,
                  padding: "6px 14px",
                  cursor: "pointer",
                  color: colors.white,
                  fontSize: 13,
                  fontWeight: 500,
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
                onClick={() => setView("login")}
                style={{
                  background: `${colors.teal}15`,
                  border: `1px solid ${colors.teal}30`,
                  borderRadius: 8,
                  padding: "6px 14px",
                  cursor: "pointer",
                  color: colors.teal,
                  fontSize: 13,
                  fontWeight: 600,
                  width: "100%"
                }}
              >
                Login / Register
              </button>
            )
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              display: isMobile ? "flex" : "none",
              background: colors.background || colors.navyLight,
              border: `1px solid ${colors.border}`,
              cursor: "pointer",
              padding: 8,
              borderRadius: 8
            }}
          >
            {mobileMenuOpen
              ? <X size={20} color={colors.slate}/>
              : <Menu size={20} color={colors.slate}/>}
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
            className="theme-transition"
            style={{
              position: "fixed",
              top: 64,
              right: 0,
              bottom: 0,
              width: 280,
              background: `linear-gradient(180deg, ${colors.navy}, ${colors.navyLight})`,
              borderLeft: `1px solid ${colors.border}`,
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
                    background: view === v ? `${colors.teal}20` : colors.background || colors.navyLight,
                    border: `1px solid ${colors.border}`,
                    cursor: "pointer",
                    color: view === v ? colors.teal : colors.slate,
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

            {/* THEME TOGGLE - MOBILE */}
            <div style={{ marginBottom: 12 }}>
              <ThemeToggle />
            </div>

            {/* USER INFO DISPLAY - MOBILE */}
            {isAuthenticated && actualUserRole !== "guest" && (
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 16px",
                background: colors.background || colors.navyLight,
                border: `1px solid ${colors.border}`,
                borderRadius: 8,
                marginBottom: 12
              }}>
                <User size={16} color={colors.slate} />
                <span style={{ color: colors.slate, fontSize: 14, fontWeight: 600 }}>
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
                  background: `${colors.teal}15`,
                  border: `1px solid ${colors.teal}30`,
                  borderRadius: 8,
                  padding: "12px 16px",
                  cursor: "pointer",
                  color: colors.teal,
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
                  background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
                  border: "none",
                  borderRadius: 8,
                  padding: "12px 16px",
                  cursor: "pointer",
                  color: colors.white,
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
                  border: `1px solid ${colors.border}`,
                  borderRadius: 8,
                  padding: "12px 16px",
                  cursor: "pointer",
                  color: colors.red,
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
                  background: `${colors.teal}15`,
                  border: `1px solid ${colors.teal}30`,
                  borderRadius: 8,
                  padding: "12px 16px",
                  cursor: "pointer",
                  color: colors.teal,
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