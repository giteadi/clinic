import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Clock, Star, ChevronRight, Phone, MessageCircle,
  User, Shield, Stethoscope, Heart, Activity, X, Check,
  MapPin, Mail, Bell, Search, Menu, ArrowRight, Plus,
  ChevronDown, LogOut, Settings, FileText, Users, BarChart3,
  Building2, Zap, Award, TrendingUp
} from "lucide-react";

// ─── Design Tokens ───────────────────────────────────────────────────────────
const COLORS = {
  navy: "#0A1628",
  navyLight: "#112240",
  teal: "#0ABFBC",
  tealDark: "#089A97",
  gold: "#E8A838",
  cream: "#F8F5F0",
  white: "#FFFFFF",
  slate: "#8892B0",
  border: "rgba(10,191,188,0.15)",
};

// ─── Mock Data ────────────────────────────────────────────────────────────────
const DOCTORS = [
  { id: 1, name: "Dr. Ayesha Khan", specialty: "Cardiologist", clinic: "HeartCare Clinic", rating: 4.9, reviews: 312, slots: ["10:00", "11:30", "14:00"], img: "AK", color: "#0ABFBC", fee: "₹800", exp: "12 yrs" },
  { id: 2, name: "Dr. Rahul Mehta", specialty: "Dermatologist", clinic: "SkinFirst Clinic", rating: 4.8, reviews: 248, slots: ["09:30", "12:00", "15:30"], img: "RM", color: "#E8A838", fee: "₹600", exp: "8 yrs" },
  { id: 3, name: "Dr. Priya Sharma", specialty: "Pediatrician", clinic: "KidsWell Center", rating: 4.9, reviews: 189, slots: ["10:30", "13:00", "16:00"], img: "PS", color: "#7C3AED", fee: "₹700", exp: "10 yrs" },
  { id: 4, name: "Dr. Arjun Patel", specialty: "Orthopedic", clinic: "BoneCare Hospital", rating: 4.7, reviews: 156, slots: ["11:00", "14:30", "17:00"], img: "AP", color: "#059669", fee: "₹900", exp: "15 yrs" },
];

const REVIEWS = [
  { name: "Sana Mirza", text: "Booking was seamless! Got appointment in 2 mins. Doctor was wonderful.", rating: 5, date: "2 days ago" },
  { name: "Rohan Gupta", text: "Best clinic app I've used. Clean interface and WhatsApp confirmation!", rating: 5, date: "1 week ago" },
  { name: "Fatima Sheikh", text: "Super easy to find the right doctor. Will definitely recommend!", rating: 5, date: "2 weeks ago" },
];

const SPECIALTIES = [
  { icon: Heart, label: "Cardiology", count: 24 },
  { icon: Activity, label: "Neurology", count: 18 },
  { icon: Stethoscope, label: "General", count: 56 },
  { icon: Shield, label: "Orthopedic", count: 31 },
];

const STATS = [
  { value: "500+", label: "Clinics", icon: Building2 },
  { value: "1200+", label: "Doctors", icon: Stethoscope },
  { value: "50K+", label: "Patients", icon: Users },
  { value: "4.9★", label: "Rating", icon: Star },
];

// ─── Components ───────────────────────────────────────────────────────────────

function Avatar({ initials, color, size = 44 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `${color}22`, border: `2px solid ${color}44`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.32, fontWeight: 700, color, flexShrink: 0,
      fontFamily: "'Playfair Display', serif"
    }}>
      {initials}
    </div>
  );
}

function StarRow({ rating }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={12} fill={i <= Math.floor(rating) ? COLORS.gold : "none"}
          color={i <= Math.floor(rating) ? COLORS.gold : COLORS.slate} />
      ))}
    </div>
  );
}

function Badge({ children, color = COLORS.teal }) {
  return (
    <span style={{
      background: `${color}18`, color,
      padding: "2px 10px", borderRadius: 20,
      fontSize: 11, fontWeight: 600, letterSpacing: 0.5
    }}>
      {children}
    </span>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ view, setView, userRole, setUserRole }) {
  const [open, setOpen] = useState(false);
  const roles = ["guest", "patient", "admin", "superadmin"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: `${COLORS.navy}F0`, backdropFilter: "blur(20px)",
      borderBottom: `1px solid ${COLORS.border}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 32px", height: 64,
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
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: COLORS.white }}>
          Cliniq<span style={{ color: COLORS.teal }}>Pro</span>
        </span>
      </motion.div>

      <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
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

        {userRole !== "guest" ? (
          <button onClick={() => { setUserRole("guest"); setView("home"); }}
            style={{
              background: "none", border: `1px solid ${COLORS.border}`,
              borderRadius: 8, padding: "6px 14px", cursor: "pointer",
              color: COLORS.slate, fontSize: 13, display: "flex", gap: 6, alignItems: "center"
            }}>
            <LogOut size={14} /> Logout
          </button>
        ) : (
          <button onClick={() => { setUserRole("patient"); setView("patient-dashboard"); }}
            style={{
              background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
              border: "none", borderRadius: 8, padding: "8px 18px", cursor: "pointer",
              color: COLORS.white, fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif"
            }}>
            Book Now
          </button>
        )}
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ setView }) {
  return (
    <section style={{
      minHeight: "100vh", 
      background: COLORS.navy,
      display: "grid",
      placeItems: "center",
      padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 32px) clamp(40px, 8vw, 60px)", 
      position: "relative", 
      overflow: "hidden"
    }}>
      {/* BG Decoration */}
      <div style={{
        position: "absolute", top: -120, right: -120, width: "clamp(300px, 40vw, 500px)", height: "clamp(300px, 40vw, 500px)",
        borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.teal}12, transparent 70%)`,
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", bottom: -80, left: -80, width: "clamp(250px, 35vw, 400px)", height: "clamp(250px, 35vw, 400px)",
        borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.gold}10, transparent 70%)`,
        pointerEvents: "none"
      }} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        style={{ 
          textAlign: "center", 
          maxWidth: "min(900px, 90%)", 
          position: "relative",
          display: "grid",
          gap: "clamp(20px, 4vw, 40px)"
        }}>

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: `${COLORS.teal}15`, border: `1px solid ${COLORS.teal}30`,
          borderRadius: 30, padding: "clamp(4px, 1vw, 6px) clamp(12px, 3vw, 18px)", 
          justifySelf: "center"
        }}>
          <Zap size={14} color={COLORS.teal} />
          <span style={{ 
            color: COLORS.teal, 
            fontSize: "clamp(11px, 2vw, 13px)", 
            fontWeight: 600, 
            letterSpacing: 0.5 
          }}>
            Trusted by 500+ Clinics Across India
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(32px, 6vw, 72px)", 
          lineHeight: 1.1,
          color: COLORS.white, 
          fontWeight: 700
        }}>
          Your Health,<br />
          <span style={{ color: COLORS.teal }}>Beautifully</span> Managed
        </h1>

        <p style={{
          color: COLORS.slate, 
          fontSize: "clamp(14px, 2.5vw, 18px)", 
          lineHeight: 1.7, 
          fontFamily: "'DM Sans', sans-serif",
          maxWidth: "600px",
          justifySelf: "center"
        }}>
          Book appointments with top doctors, manage your clinic, and deliver exceptional patient care — all in one elegant platform.
        </p>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: "clamp(12px, 3vw, 14px)", 
          justifySelf: "center",
          width: "100%",
          maxWidth: "500px"
        }}>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => setView("doctors")}
            style={{
              background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
              border: "none", borderRadius: 12, 
              padding: "clamp(12px, 2.5vw, 14px) clamp(20px, 4vw, 32px)",
              color: COLORS.white, 
              fontSize: "clamp(14px, 2.5vw, 16px)", 
              fontWeight: 600, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              gap: 8,
              boxShadow: `0 8px 30px ${COLORS.teal}40`,
              width: "100%"
            }}>
            <Calendar size={18} /> Book Appointment
          </motion.button>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => setView("clinics")}
            style={{
              background: "transparent", 
              border: `1.5px solid ${COLORS.border}`,
              borderRadius: 12, 
              padding: "clamp(12px, 2.5vw, 14px) clamp(20px, 4vw, 32px)",
              color: COLORS.white, 
              fontSize: "clamp(14px, 2.5vw, 16px)", 
              fontWeight: 600, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              gap: 8,
              width: "100%"
            }}>
            <Building2 size={18} /> Explore Clinics
          </motion.button>
        </div>

        {/* Stats */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", 
          gap: 0, 
          justifySelf: "center",
          width: "100%",
          maxWidth: "600px"
        }}>
          {STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              style={{
                textAlign: "center", 
                padding: "clamp(16px, 3vw, 20px) clamp(20px, 4vw, 36px)",
                borderRight: i < STATS.length - 1 ? `1px solid ${COLORS.border}` : "none",
                display: "grid",
                gap: "clamp(4px, 1vw, 8px)"
              }}>
              <div style={{ 
                fontFamily: "'Playfair Display', serif", 
                fontSize: "clamp(24px, 4vw, 32px)", 
                fontWeight: 700, 
                color: COLORS.teal 
              }}>{s.value}</div>
              <div style={{ 
                color: COLORS.slate, 
                fontSize: "clamp(11px, 2vw, 13px)", 
                fontWeight: 500 
              }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─── Search Bar ───────────────────────────────────────────────────────────────
function SearchSection({ setView }) {
  const [query, setQuery] = useState("");
  return (
    <section style={{ 
      background: COLORS.cream, 
      padding: "clamp(40px, 8vw, 60px) clamp(20px, 4vw, 32px)",
      display: "grid",
      placeItems: "center"
    }}>
      <div style={{ 
        maxWidth: "1000px", 
        margin: "0 auto", 
        width: "100%",
        display: "grid",
        gap: "clamp(20px, 4vw, 30px)"
      }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          style={{
            background: COLORS.white, 
            borderRadius: "clamp(12px, 2vw, 20px)", 
            padding: "clamp(24px, 4vw, 32px) clamp(20px, 4vw, 36px)",
            boxShadow: "0 20px 60px rgba(10,22,40,0.08)",
            display: "grid",
            gap: "clamp(20px, 4vw, 30px)"
          }}>
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: "clamp(24px, 4vw, 28px)", 
            color: COLORS.navy, 
            fontWeight: 700,
            textAlign: "center"
          }}>
            Find Your Doctor
          </h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
            gap: "clamp(12px, 2vw, 12px)",
            alignItems: "end"
          }}>
            <div style={{ position: "relative" }}>
              <Search size={16} color={COLORS.slate} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Doctor name or specialty..."
                style={{
                  width: "100%", 
                  padding: "clamp(12px, 2.5vw, 12px) clamp(16px, 3vw, 16px) clamp(12px, 2.5vw, 12px) 42px", 
                  borderRadius: 10,
                  border: `1.5px solid ${COLORS.border}`, 
                  background: COLORS.cream,
                  fontSize: "clamp(14px, 2vw, 14px)", 
                  fontFamily: "'DM Sans', sans-serif", 
                  outline: "none",
                  color: COLORS.navy, 
                  boxSizing: "border-box"
                }} />
            </div>
            <div style={{ position: "relative" }}>
              <MapPin size={16} color={COLORS.slate} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
              <input placeholder="City or clinic..."
                style={{
                  width: "100%", 
                  padding: "clamp(12px, 2.5vw, 12px) clamp(16px, 3vw, 16px) clamp(12px, 2.5vw, 12px) 42px", 
                  borderRadius: 10,
                  border: `1.5px solid ${COLORS.border}`, 
                  background: COLORS.cream,
                  fontSize: "clamp(14px, 2vw, 14px)", 
                  fontFamily: "'DM Sans', sans-serif", 
                  outline: "none",
                  color: COLORS.navy, 
                  boxSizing: "border-box"
                }} />
            </div>
            <motion.button whileHover={{ scale: 1.03 }} onClick={() => setView("doctors")}
              style={{
                background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
                border: "none", 
                borderRadius: 10, 
                padding: "clamp(12px, 2.5vw, 12px) clamp(20px, 4vw, 28px)",
                color: COLORS.white, 
                fontWeight: 600, 
                fontSize: "clamp(14px, 2vw, 14px)", 
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                width: "100%"
              }}>
              Search
            </motion.button>
          </div>
          {/* Specialties */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", 
            gap: "clamp(8px, 2vw, 12px)",
            justifyItems: "center"
          }}>
            {SPECIALTIES.map(sp => (
              <button key={sp.label}
                style={{
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  gap: 8, 
                  padding: "clamp(6px, 1.5vw, 8px) clamp(12px, 3vw, 16px)",
                  background: `${COLORS.teal}10`, 
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 30, 
                  cursor: "pointer", 
                  color: COLORS.navy,
                  fontSize: "clamp(12px, 2vw, 13px)", 
                  fontWeight: 500, 
                  fontFamily: "'DM Sans', sans-serif",
                  width: "100%"
                }}>
                <sp.icon size={14} color={COLORS.teal} />
                {sp.label}
                <span style={{ color: COLORS.slate, fontSize: "clamp(10px, 1.5vw, 12px)" }}>({sp.count})</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Doctor Card ──────────────────────────────────────────────────────────────
function DoctorCard({ doc, onBook }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }} transition={{ duration: 0.3 }}
      style={{
        background: COLORS.white, borderRadius: 18, overflow: "hidden",
        boxShadow: "0 4px 24px rgba(10,22,40,0.08)",
        border: `1px solid rgba(10,22,40,0.06)`
      }}>
      {/* Header */}
      <div style={{ background: COLORS.navy, padding: "24px 24px 20px", position: "relative" }}>
        <div style={{ position: "absolute", top: 16, right: 16 }}>
          <Badge color={COLORS.gold}>{doc.fee}</Badge>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Avatar initials={doc.img} color={doc.color} size={54} />
          <div>
            <div style={{ color: COLORS.white, fontWeight: 700, fontSize: 16, fontFamily: "'Playfair Display', serif" }}>{doc.name}</div>
            <div style={{ color: COLORS.teal, fontSize: 13, fontWeight: 600, marginTop: 2 }}>{doc.specialty}</div>
            <div style={{ color: COLORS.slate, fontSize: 12, marginTop: 2 }}>{doc.clinic} • {doc.exp}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14 }}>
          <StarRow rating={doc.rating} />
          <span style={{ color: COLORS.gold, fontSize: 13, fontWeight: 700 }}>{doc.rating}</span>
          <span style={{ color: COLORS.slate, fontSize: 12 }}>({doc.reviews} reviews)</span>
        </div>
      </div>
      {/* Slots */}
      <div style={{ padding: "20px 24px" }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.slate, letterSpacing: 0.5, marginBottom: 10 }}>
          AVAILABLE TODAY
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {doc.slots.map(slot => (
            <button key={slot} onClick={() => setSelectedSlot(slot)}
              style={{
                padding: "7px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600,
                background: selectedSlot === slot ? `${COLORS.teal}18` : COLORS.cream,
                border: `1.5px solid ${selectedSlot === slot ? COLORS.teal : "transparent"}`,
                color: selectedSlot === slot ? COLORS.teal : COLORS.navy,
                fontFamily: "'DM Sans', sans-serif"
              }}>
              {slot}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => onBook(doc, selectedSlot)}
            style={{
              flex: 1, background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
              border: "none", borderRadius: 10, padding: "11px",
              color: COLORS.white, fontWeight: 600, fontSize: 14, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif"
            }}>
            {selectedSlot ? `Book ${selectedSlot}` : "Book Appointment"}
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }}
            style={{
              background: "#25D366", border: "none", borderRadius: 10,
              padding: "11px 14px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6,
              color: COLORS.white, fontWeight: 600, fontSize: 13
            }}>
            <MessageCircle size={15} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Doctors View ─────────────────────────────────────────────────────────────
function DoctorsView({ onBook }) {
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

// ─── Booking Modal ────────────────────────────────────────────────────────────
function BookingModal({ doctor, slot, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", phone: "", email: "", reason: "" });
  const [done, setDone] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.phone) { setDone(true); setTimeout(onClose, 2500); }
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
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: COLORS.cream, border: "none", borderRadius: 8, padding: 8, cursor: "pointer" }}>
          <X size={18} color={COLORS.slate} />
        </button>

        {done ? (
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: `${COLORS.teal}18`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Check size={32} color={COLORS.teal} />
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: COLORS.navy, marginBottom: 8 }}>Appointment Confirmed!</h3>
            <p style={{ color: COLORS.slate }}>WhatsApp confirmation sent to your number.</p>
          </motion.div>
        ) : (
          <>
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: COLORS.navy, marginBottom: 4 }}>Book Appointment</h3>
              {doctor && (
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12, padding: "12px 16px", background: COLORS.cream, borderRadius: 12 }}>
                  <Avatar initials={doctor.img} color={doctor.color} size={40} />
                  <div>
                    <div style={{ fontWeight: 700, color: COLORS.navy, fontSize: 14 }}>{doctor.name}</div>
                    <div style={{ color: COLORS.teal, fontSize: 12 }}>{doctor.specialty} • {slot || "Select time"}</div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { key: "name", label: "Full Name", type: "text", icon: User },
                { key: "phone", label: "Phone Number", type: "tel", icon: Phone },
                { key: "email", label: "Email (optional)", type: "email", icon: Mail },
              ].map(f => (
                <div key={f.key} style={{ position: "relative" }}>
                  <f.icon size={15} color={COLORS.slate} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                  <input type={f.type} placeholder={f.label} value={form[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    style={{
                      width: "100%", padding: "12px 14px 12px 40px", borderRadius: 10,
                      border: `1.5px solid ${COLORS.border}`, background: COLORS.cream,
                      fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none",
                      color: COLORS.navy, boxSizing: "border-box"
                    }} />
                </div>
              ))}
              <textarea placeholder="Reason for visit..." value={form.reason}
                onChange={e => setForm({ ...form, reason: e.target.value })}
                rows={3}
                style={{
                  width: "100%", padding: "12px 14px", borderRadius: 10,
                  border: `1.5px solid ${COLORS.border}`, background: COLORS.cream,
                  fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none",
                  color: COLORS.navy, resize: "none", boxSizing: "border-box"
                }} />
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <motion.button whileHover={{ scale: 1.02 }} onClick={handleSubmit}
                style={{
                  flex: 1, background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
                  border: "none", borderRadius: 12, padding: "13px",
                  color: COLORS.white, fontWeight: 700, fontSize: 15, cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif"
                }}>
                Confirm Booking
              </motion.button>
              <motion.button whileHover={{ scale: 1.02 }}
                style={{
                  background: "#25D366", border: "none", borderRadius: 12, padding: "13px 16px",
                  color: COLORS.white, fontWeight: 600, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 6, fontSize: 14
                }}>
                <MessageCircle size={16} /> WhatsApp
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Patient Dashboard ────────────────────────────────────────────────────────
function PatientDashboard({ setView }) {
  const appts = [
    { doctor: "Dr. Ayesha Khan", spec: "Cardiologist", date: "Mon, Mar 16", time: "10:00 AM", status: "confirmed", color: COLORS.teal },
    { doctor: "Dr. Rahul Mehta", spec: "Dermatologist", date: "Wed, Mar 18", time: "12:00 PM", status: "pending", color: COLORS.gold },
  ];
  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, padding: "100px 32px 60px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36 }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, color: COLORS.navy, marginBottom: 4 }}>Patient Dashboard</h2>
            <p style={{ color: COLORS.slate }}>Welcome back, Ananya 👋</p>
          </div>
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => setView("doctors")}
            style={{
              background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
              border: "none", borderRadius: 10, padding: "11px 22px",
              color: COLORS.white, fontWeight: 600, fontSize: 14, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 8
            }}>
            <Plus size={16} /> New Appointment
          </motion.button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
          {[
            { label: "Upcoming", value: "2", color: COLORS.teal, icon: Calendar },
            { label: "Completed", value: "12", color: COLORS.gold, icon: Check },
            { label: "Doctors Visited", value: "5", color: "#7C3AED", icon: Stethoscope },
          ].map(m => (
            <motion.div key={m.label} whileHover={{ y: -2 }}
              style={{
                background: COLORS.white, borderRadius: 16, padding: "22px 24px",
                boxShadow: "0 4px 16px rgba(10,22,40,0.06)"
              }}>
              <m.icon size={20} color={m.color} />
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: COLORS.navy, marginTop: 12 }}>{m.value}</div>
              <div style={{ color: COLORS.slate, fontSize: 13, marginTop: 4 }}>{m.label}</div>
            </motion.div>
          ))}
        </div>

        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: COLORS.navy, marginBottom: 16 }}>Upcoming Appointments</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {appts.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              style={{
                background: COLORS.white, borderRadius: 14, padding: "20px 24px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                boxShadow: "0 4px 16px rgba(10,22,40,0.05)"
              }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <Avatar initials={a.doctor.split(" ").map(n => n[0]).join("")} color={a.color} size={44} />
                <div>
                  <div style={{ fontWeight: 700, color: COLORS.navy, fontSize: 15 }}>{a.doctor}</div>
                  <div style={{ color: COLORS.slate, fontSize: 13 }}>{a.spec}</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: COLORS.navy, fontWeight: 600, fontSize: 14 }}>{a.date}</div>
                <div style={{ color: COLORS.teal, fontSize: 13 }}>{a.time}</div>
                <Badge color={a.status === "confirmed" ? COLORS.teal : COLORS.gold}>{a.status}</Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
function AdminDashboard() {
  const metrics = [
    { label: "Today's Appointments", value: "28", change: "+4", icon: Calendar, color: COLORS.teal },
    { label: "Total Patients", value: "1,284", change: "+12", icon: Users, color: "#7C3AED" },
    { label: "Revenue Today", value: "₹22,400", change: "+8%", icon: TrendingUp, color: COLORS.gold },
    { label: "Avg Rating", value: "4.9★", change: "stable", icon: Star, color: "#059669" },
  ];

  const todayAppts = [
    { time: "09:30", patient: "Aarav Singh", doctor: "Dr. Mehta", status: "done" },
    { time: "10:00", patient: "Priya Verma", doctor: "Dr. Khan", status: "in-progress" },
    { time: "10:30", patient: "Rohan Das", doctor: "Dr. Sharma", status: "waiting" },
    { time: "11:00", patient: "Fatima Malik", doctor: "Dr. Patel", status: "confirmed" },
  ];

  const statusColor = { done: "#059669", "in-progress": COLORS.teal, waiting: COLORS.gold, confirmed: "#7C3AED" };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.navy, padding: "100px 32px 60px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 36 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, color: COLORS.white, marginBottom: 4 }}>Admin Dashboard</h2>
          <p style={{ color: COLORS.slate }}>HeartCare Clinic — Manage everything from here</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 18, marginBottom: 36 }}>
          {metrics.map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              style={{
                background: COLORS.navyLight, borderRadius: 16, padding: "22px 24px",
                border: `1px solid ${COLORS.border}`
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <m.icon size={20} color={m.color} />
                <span style={{ color: m.color, fontSize: 12, fontWeight: 600 }}>{m.change}</span>
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: COLORS.white }}>{m.value}</div>
              <div style={{ color: COLORS.slate, fontSize: 13, marginTop: 4 }}>{m.label}</div>
            </motion.div>
          ))}
        </div>

        <div style={{ background: COLORS.navyLight, borderRadius: 20, padding: 28, border: `1px solid ${COLORS.border}` }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: COLORS.white, marginBottom: 20 }}>Today's Schedule</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {todayAppts.map((a, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 20, padding: "14px 18px",
                background: `${COLORS.navy}80`, borderRadius: 12
              }}>
                <div style={{ color: COLORS.teal, fontWeight: 700, fontSize: 14, minWidth: 48 }}>{a.time}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: COLORS.white, fontWeight: 600, fontSize: 14 }}>{a.patient}</div>
                  <div style={{ color: COLORS.slate, fontSize: 12 }}>{a.doctor}</div>
                </div>
                <Badge color={statusColor[a.status]}>{a.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Superadmin Dashboard ─────────────────────────────────────────────────────
function SuperAdminDashboard() {
  const clinics = [
    { name: "HeartCare Clinic", doctors: 6, city: "Mumbai", appts: 142, revenue: "₹1.1L", status: "active" },
    { name: "SkinFirst Center", doctors: 4, city: "Delhi", appts: 98, revenue: "₹78K", status: "active" },
    { name: "KidsWell Hospital", doctors: 8, city: "Bangalore", appts: 203, revenue: "₹1.6L", status: "active" },
    { name: "BoneCare Clinic", doctors: 5, city: "Pune", appts: 76, revenue: "₹62K", status: "inactive" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: COLORS.navy, padding: "100px 32px 60px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: "inline-flex", gap: 8, alignItems: "center", background: `${COLORS.gold}18`, border: `1px solid ${COLORS.gold}30`, borderRadius: 30, padding: "4px 16px", marginBottom: 16 }}>
            <Award size={14} color={COLORS.gold} />
            <span style={{ color: COLORS.gold, fontSize: 12, fontWeight: 600 }}>SUPER ADMIN</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, color: COLORS.white, marginBottom: 4 }}>Platform Overview</h2>
          <p style={{ color: COLORS.slate }}>Manage all clinics, doctors, and platform settings</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16, marginBottom: 36 }}>
          {[
            { label: "Total Clinics", value: "500+", icon: Building2, color: COLORS.teal },
            { label: "Active Doctors", value: "1,247", icon: Stethoscope, color: "#7C3AED" },
            { label: "Monthly Revenue", value: "₹48.2L", icon: BarChart3, color: COLORS.gold },
            { label: "Total Patients", value: "52,841", icon: Users, color: "#059669" },
          ].map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              style={{
                background: COLORS.navyLight, borderRadius: 16, padding: "22px",
                border: `1px solid ${COLORS.border}`, textAlign: "center"
              }}>
              <m.icon size={22} color={m.color} style={{ marginBottom: 10 }} />
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: COLORS.white }}>{m.value}</div>
              <div style={{ color: COLORS.slate, fontSize: 12, marginTop: 4 }}>{m.label}</div>
            </motion.div>
          ))}
        </div>

        <div style={{ background: COLORS.navyLight, borderRadius: 20, padding: 28, border: `1px solid ${COLORS.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: COLORS.white }}>All Clinics</h3>
            <button style={{
              background: `${COLORS.teal}18`, border: `1px solid ${COLORS.border}`,
              borderRadius: 8, padding: "7px 16px", color: COLORS.teal, fontSize: 13,
              fontWeight: 600, cursor: "pointer", display: "flex", gap: 6, alignItems: "center"
            }}>
              <Plus size={14} /> Add Clinic
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {clinics.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "16px 20px", background: `${COLORS.navy}80`, borderRadius: 12
                }}>
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${COLORS.teal}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Building2 size={18} color={COLORS.teal} />
                  </div>
                  <div>
                    <div style={{ color: COLORS.white, fontWeight: 700, fontSize: 14 }}>{c.name}</div>
                    <div style={{ color: COLORS.slate, fontSize: 12 }}>{c.city} • {c.doctors} doctors</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ color: COLORS.white, fontWeight: 600, fontSize: 14 }}>{c.appts}</div>
                    <div style={{ color: COLORS.slate, fontSize: 11 }}>appts</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ color: COLORS.gold, fontWeight: 600, fontSize: 14 }}>{c.revenue}</div>
                    <div style={{ color: COLORS.slate, fontSize: 11 }}>revenue</div>
                  </div>
                  <Badge color={c.status === "active" ? COLORS.teal : COLORS.slate}>{c.status}</Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Reviews Section ──────────────────────────────────────────────────────────
function ReviewsSection() {
  return (
    <section style={{ background: COLORS.navy, padding: "80px 32px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <div style={{ color: COLORS.teal, fontSize: 13, fontWeight: 600, letterSpacing: 1, marginBottom: 12 }}>PATIENT REVIEWS</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, color: COLORS.white }}>
            What Our Patients Say
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {REVIEWS.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              style={{
                background: COLORS.navyLight, borderRadius: 20, padding: "28px",
                border: `1px solid ${COLORS.border}`
              }}>
              <StarRow rating={r.rating} />
              <p style={{ color: COLORS.slate, fontSize: 15, lineHeight: 1.6, margin: "16px 0", fontFamily: "'DM Sans', sans-serif" }}>
                "{r.text}"
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ color: COLORS.white, fontWeight: 600, fontSize: 14 }}>{r.name}</div>
                <div style={{ color: COLORS.slate, fontSize: 12 }}>{r.date}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Inquiry Form ─────────────────────────────────────────────────────────────
function InquirySection() {
  const [sent, setSent] = useState(false);
  return (
    <section style={{ background: COLORS.cream, padding: "80px 32px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: COLORS.navy }}>Patient Inquiry</h2>
          <p style={{ color: COLORS.slate, marginTop: 10 }}>Have a question? We'll get back to you within 2 hours.</p>
        </div>
        {sent ? (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}
            style={{ textAlign: "center", padding: 40, background: COLORS.white, borderRadius: 20, boxShadow: "0 8px 30px rgba(10,22,40,0.08)" }}>
            <Check size={40} color={COLORS.teal} style={{ marginBottom: 12 }} />
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: COLORS.navy }}>Message Sent!</h3>
            <p style={{ color: COLORS.slate, marginTop: 8 }}>Our team will contact you shortly on WhatsApp.</p>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            style={{ background: COLORS.white, borderRadius: 20, padding: 36, boxShadow: "0 8px 30px rgba(10,22,40,0.08)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Your Name", type: "text", icon: User },
                { label: "Phone Number", type: "tel", icon: Phone },
                { label: "Email Address", type: "email", icon: Mail },
              ].map(f => (
                <div key={f.label} style={{ position: "relative" }}>
                  <f.icon size={15} color={COLORS.slate} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                  <input type={f.type} placeholder={f.label}
                    style={{
                      width: "100%", padding: "13px 14px 13px 42px", borderRadius: 10,
                      border: `1.5px solid ${COLORS.border}`, background: COLORS.cream,
                      fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none",
                      color: COLORS.navy, boxSizing: "border-box"
                    }} />
                </div>
              ))}
              <textarea placeholder="Your message or inquiry..." rows={4}
                style={{
                  width: "100%", padding: "13px 14px", borderRadius: 10,
                  border: `1.5px solid ${COLORS.border}`, background: COLORS.cream,
                  fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none",
                  color: COLORS.navy, resize: "none", boxSizing: "border-box"
                }} />
              <motion.button whileHover={{ scale: 1.02 }} onClick={() => setSent(true)}
                style={{
                  background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
                  border: "none", borderRadius: 12, padding: "14px",
                  color: COLORS.white, fontWeight: 700, fontSize: 15, cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif"
                }}>
                Send Inquiry
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: COLORS.navy, borderTop: `1px solid ${COLORS.border}`, padding: "40px 32px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Stethoscope size={16} color="#fff" />
          </div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: COLORS.white }}>
            Cliniq<span style={{ color: COLORS.teal }}>Pro</span>
          </span>
        </div>
        <div style={{ color: COLORS.slate, fontSize: 13 }}>
          © 2025 CliniqPro. Built for modern healthcare.
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy", "Terms", "Support"].map(l => (
            <span key={l} style={{ color: COLORS.slate, fontSize: 13, cursor: "pointer" }}>{l}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function CliniqPro() {
  const [view, setView] = useState("home");
  const [userRole, setUserRole] = useState("guest");
  const [booking, setBooking] = useState(null);

  const handleBook = (doctor, slot) => setBooking({ doctor, slot });

  useEffect(() => {
    const link1 = document.createElement("link");
    link1.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;500;600;700&display=swap";
    link1.rel = "stylesheet";
    document.head.appendChild(link1);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: COLORS.cream, minHeight: "100vh" }}>
      <Navbar view={view} setView={setView} userRole={userRole} setUserRole={setUserRole} />

      <AnimatePresence mode="wait">
        {view === "home" && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Hero setView={setView} />
            <SearchSection setView={setView} />
            <ReviewsSection />
            <InquirySection />
            <Footer />
          </motion.div>
        )}
        {view === "doctors" && (
          <motion.div key="doctors" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <DoctorsView onBook={handleBook} />
            <Footer />
          </motion.div>
        )}
        {view === "clinics" && (
          <motion.div key="clinics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div style={{ minHeight: "100vh", background: COLORS.cream, padding: "100px 32px 60px", textAlign: "center" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: COLORS.navy }}>Clinic Directory</h2>
              <p style={{ color: COLORS.slate, marginTop: 10 }}>500+ clinics across India — coming soon in full view.</p>
            </div>
          </motion.div>
        )}
        {view === "patient-dashboard" && (
          <motion.div key="patient" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <PatientDashboard setView={setView} />
          </motion.div>
        )}
        {view === "admin-dashboard" && (
          <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AdminDashboard />
          </motion.div>
        )}
        {view === "superadmin-dashboard" && (
          <motion.div key="superadmin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SuperAdminDashboard />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {booking && (
          <BookingModal doctor={booking.doctor} slot={booking.slot} onClose={() => setBooking(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}