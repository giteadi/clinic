import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Clock, MapPin, Search, Filter, User, Loader2 } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useClinic } from "../../contexts/ClinicContext";
import { THEMES } from "../../contexts/ThemeContext";
import { useDoctors } from "../../store/hooks";
import "./DoctorsPage.css";

export default function DoctorsPage({ setView }) {
  const { theme, colors } = useTheme();
  const { isClinicSpecific, clinicName } = useClinic();
  const { isAuthenticated } = useSelector(state => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  
  // Use Redux hook for doctors
  const { 
    doctors, 
    loading, 
    error, 
    fetchDoctors: fetchDoctorsData,
    lastFetched 
  } = useDoctors();

  useEffect(() => {
    // Only fetch if not already fetched or if data is old (5 minutes)
    if (!lastFetched || Date.now() - lastFetched > 5 * 60 * 1000) {
      fetchDoctorsData();
    }
  }, [fetchDoctorsData, lastFetched]);

  // Filter doctors by clinic if viewing a specific clinic
  // Note: Backend API already filters by clinic_id, so all returned doctors are from the current clinic
  const clinicFilteredDoctors = doctors;

  // Extract unique specialties from filtered doctors
  const specialties = ["all", ...new Set(clinicFilteredDoctors.map(doc => doc.specialization || doc.specialty))];

  const filteredDoctors = clinicFilteredDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (doctor.specialization || doctor.specialty || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || (doctor.specialization || doctor.specialty) === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  // Handle book appointment - protect with authentication
  const handleBookAppointment = (doctor) => {
    if (!isAuthenticated) {
      console.log('🔐 BOOKING DENIED - User not authenticated. Redirecting to login before booking doctor.');
      setView("login");
      return;
    }
    // Navigate to appointment page with pre-selected doctor
    setView("appointment");
  };

  return (
    <div className="theme-transition" style={{
      minHeight: "100vh",
      background: theme === THEMES.WHITE ? "#F8F9FA" : colors.navy,
      padding: "clamp(80px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      position: "relative"
    }}>
      {/* Background Effects */}
      <div style={{
        position: "absolute", top: -100, right: -100,
        width: "clamp(300px, 40vw, 400px)", height: "clamp(300px, 40vw, 400px)",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${colors.teal}12, transparent 70%)`,
        pointerEvents: "none"
      }} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: "clamp(32px, 5vw, 48px)" }}>
          <button
            onClick={() => setView("home")}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "none", border: "none", cursor: "pointer",
              color: colors.slate, marginBottom: 16,
              fontSize: 14, fontWeight: 500
            }}
          >
            <ArrowLeft size={18} /> Back to Home
          </button>
          
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            color: theme === THEMES.WHITE ? colors.slate : colors.white, fontWeight: 700,
            marginBottom: 8
          }}>
            Find Your Doctor
          </h1>
          <p style={{ color: colors.slate, fontSize: "clamp(16px, 2.5vw, 18px)", lineHeight: 1.6 }}>
            Connect with {clinicFilteredDoctors.length}+ expert doctors {isClinicSpecific ? `at ${clinicName}` : "across all specialties"}
          </p>
        </div>

        {/* Search and Filter */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 16,
          marginBottom: "clamp(32px, 5vw, 48px)"
        }}>
          <div style={{ position: "relative" }}>
            <Search size={20} color={colors.slate} style={{
              position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)"
            }} />
            <input
              type="text"
              placeholder="Search doctors, specialties, or clinics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%", padding: "12px 16px 12px 48px",
                background: theme === THEMES.WHITE ? "#FFFFFF" : `${colors.navy}F0`,
                border: `1px solid ${colors.border}`,
                borderRadius: 12, color: theme === THEMES.WHITE ? colors.slate : colors.white,
                fontSize: 14, outline: "none"
              }}
            />
          </div>
          
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            style={{
              padding: "12px 16px",
              background: theme === THEMES.WHITE ? "#FFFFFF" : `${colors.navy}F0`,
              border: `1px solid ${colors.border}`,
              borderRadius: 12, color: theme === THEMES.WHITE ? colors.slate : colors.white,
              fontSize: 14, outline: "none",
              minWidth: 200
            }}
          >
            {specialties.map(specialty => (
              <option key={specialty} value={specialty} style={{ background: theme === THEMES.WHITE ? "#FFFFFF" : colors.navy }}>
                {specialty === "all" ? "All Specialties" : specialty}
              </option>
            ))}
          </select>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", 
            justifyContent: "center", padding: "60px 20px",
            background: theme === THEMES.WHITE ? "#FFFFFF" : `${colors.navy}F0`,
            border: `1px solid ${colors.border}`,
            borderRadius: 16
          }}>
            <Loader2 size={48} color={colors.teal} style={{ animation: "spin 1s linear infinite", marginBottom: 16 }} />
            <h3 style={{ color: theme === THEMES.WHITE ? colors.slate : colors.white, fontSize: 18, marginBottom: 8 }}>
              Loading Doctors...
            </h3>
            <p style={{ color: colors.slate, fontSize: 14 }}>
              Fetching available doctors for your clinic
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div style={{
            textAlign: "center", padding: "60px 20px",
            background: theme === THEMES.WHITE ? "#FFFFFF" : `${colors.navy}F0`,
            border: `1px solid ${colors.border}`,
            borderRadius: 16
          }}>
            <h3 style={{ color: theme === THEMES.WHITE ? colors.slate : colors.white, fontSize: 20, marginBottom: 8 }}>
              Unable to Load Doctors
            </h3>
            <p style={{ color: colors.slate, fontSize: 14, marginBottom: 16 }}>
              {error}
            </p>
            <button
              onClick={fetchDoctorsData}
              style={{
                padding: "12px 24px",
                background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
                border: "none", borderRadius: 8,
                color: colors.white, fontSize: 14, fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Results Count */}
        {!loading && !error && (
          <div style={{ marginBottom: 24 }}>
            <p style={{ color: colors.slate, fontSize: 14 }}>
              {filteredDoctors.length} doctors found
            </p>
          </div>
        )}

        {/* Doctors Grid */}
        {!loading && !error && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24
          }}>
            {filteredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: theme === THEMES.WHITE ? "#FFFFFF" : `${colors.navy}F0`,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 16, padding: 24,
                  cursor: "pointer", transition: "all 0.3s ease",
                  position: "relative"
                }}
              >
                {/* Availability Badge */}
                <div style={{
                  position: "absolute", top: 16, right: 16,
                  padding: "4px 8px", borderRadius: 6,
                  fontSize: 11, fontWeight: 600,
                  background: doctor.available ? `${colors.teal}20` : `${colors.gold}20`,
                  color: doctor.available ? colors.teal : colors.gold,
                  border: `1px solid ${doctor.available ? colors.teal : colors.gold}40`
                }}>
                  {doctor.available ? "Available" : "Busy"}
                </div>

                {/* Doctor Info */}
                <div style={{ display: "flex", alignItems: "start", gap: 16, marginBottom: 16 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <User size={28} color="#fff" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ color: theme === THEMES.WHITE ? colors.slate : colors.white, fontWeight: 600, fontSize: 16, marginBottom: 4 }}>
                      {doctor.name}
                    </h3>
                    <p style={{ color: colors.teal, fontSize: 13, fontWeight: 500, marginBottom: 2 }}>
                      {doctor.specialty}
                    </p>
                    <p style={{ color: colors.slate, fontSize: 12, marginBottom: 8 }}>
                      {doctor.clinic}
                    </p>
                    <div style={{ display: "flex", gap: 16, fontSize: 11 }}>
                      <span style={{ color: colors.gold, display: "flex", alignItems: "center", gap: 4 }}>
                        <Star size={12} fill={colors.gold} /> {doctor.rating.toFixed(1)}
                      </span>
                      <span style={{ color: colors.slate }}>{doctor.experience}</span>
                      <span style={{ color: colors.teal }}>₹{doctor.fee}</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12,
                  padding: "12px 0", borderTop: `1px solid ${colors.border}`,
                  marginBottom: 16
                }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ color: theme === THEMES.WHITE ? colors.slate : colors.white, fontWeight: 600, fontSize: 16 }}>
                      {doctor.patients.toLocaleString()}
                    </div>
                    <div style={{ color: colors.slate, fontSize: 11 }}>Patients</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ color: theme === THEMES.WHITE ? colors.slate : colors.white, fontWeight: 600, fontSize: 16 }}>
                      {doctor.experience.split('+')[0]}
                    </div>
                    <div style={{ color: colors.slate, fontSize: 11 }}>Years</div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleBookAppointment(doctor)}
                  disabled={!doctor.available}
                  style={{
                    width: "100%", padding: "12px",
                    background: doctor.available 
                      ? `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`
                      : (theme === THEMES.WHITE ? "#F0F0F0" : `${colors.navy}F0`),
                    border: `1px solid ${doctor.available ? colors.teal : colors.border}`,
                    borderRadius: 8,
                    color: doctor.available ? colors.white : colors.slate,
                    fontSize: 14, fontWeight: 600,
                    cursor: doctor.available ? "pointer" : "not-allowed",
                    transition: "all 0.2s ease"
                  }}
                >
                  {doctor.available ? "Book Appointment" : "Currently Unavailable"}
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && filteredDoctors.length === 0 && (
          <div style={{
            textAlign: "center", padding: "60px 20px",
            background: theme === THEMES.WHITE ? "#FFFFFF" : `${colors.navy}F0`,
            border: `1px solid ${colors.border}`,
            borderRadius: 16
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: theme === THEMES.WHITE ? "#F8F9FA" : `${colors.navy}F0`,
              border: `1px solid ${colors.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px"
            }}>
              <Search size={32} color={colors.slate} />
            </div>
            <h3 style={{ color: theme === THEMES.WHITE ? colors.slate : colors.white, fontSize: 20, marginBottom: 8 }}>
              No doctors found
            </h3>
            <p style={{ color: colors.slate, fontSize: 14 }}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

      </motion.div>
    </div>
  );
}
