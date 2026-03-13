import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Clock, MapPin, Search, Filter, User } from "lucide-react";
import { COLORS } from "../../constants/colors";

export default function DoctorsPage({ setView }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  const doctors = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "General Physician", clinic: "City Medical Center", rating: 4.8, experience: "10+ years", patients: 2500, available: true },
    { id: 2, name: "Dr. Michael Chen", specialty: "Cardiologist", clinic: "Heart Care Clinic", rating: 4.9, experience: "15+ years", patients: 3200, available: true },
    { id: 3, name: "Dr. Emily Davis", specialty: "Pediatrician", clinic: "Children's Hospital", rating: 4.7, experience: "8+ years", patients: 1800, available: false },
    { id: 4, name: "Dr. James Wilson", specialty: "Orthopedic", clinic: "Bone & Joint Center", rating: 4.8, experience: "12+ years", patients: 2100, available: true },
    { id: 5, name: "Dr. Lisa Anderson", specialty: "Dermatologist", clinic: "Skin Care Clinic", rating: 4.6, experience: "6+ years", patients: 1500, available: true },
    { id: 6, name: "Dr. Robert Taylor", specialty: "Neurologist", clinic: "Neuro Care Center", rating: 4.9, experience: "20+ years", patients: 4000, available: false },
    { id: 7, name: "Dr. Maria Garcia", specialty: "Gynecologist", clinic: "Women's Health Center", rating: 4.7, experience: "9+ years", patients: 1900, available: true },
    { id: 8, name: "Dr. John Smith", specialty: "ENT Specialist", clinic: "ENT Care Clinic", rating: 4.5, experience: "7+ years", patients: 1600, available: true },
    { id: 9, name: "Dr. Jennifer Lee", specialty: "Psychiatrist", clinic: "Mental Health Center", rating: 4.8, experience: "11+ years", patients: 2300, available: false }
  ];

  const specialties = ["all", "General Physician", "Cardiologist", "Pediatrician", "Orthopedic", "Dermatologist", "Neurologist", "Gynecologist", "ENT Specialist", "Psychiatrist"];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.clinic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleBookAppointment = (doctor) => {
    // Navigate to appointment page with pre-selected doctor
    setView("appointment");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: COLORS.navy,
      padding: "clamp(80px, 10vw, 100px) clamp(20px, 5vw, 32px)",
      position: "relative"
    }}>
      {/* Background Effects */}
      <div style={{
        position: "absolute", top: -100, right: -100,
        width: "clamp(300px, 40vw, 400px)", height: "clamp(300px, 40vw, 400px)",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.teal}12, transparent 70%)`,
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
              color: COLORS.slate, marginBottom: 16,
              fontSize: 14, fontWeight: 500
            }}
          >
            <ArrowLeft size={18} /> Back to Home
          </button>
          
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            color: COLORS.white, fontWeight: 700,
            marginBottom: 8
          }}>
            Find Your Doctor
          </h1>
          <p style={{ color: COLORS.slate, fontSize: "clamp(16px, 2.5vw, 18px)", lineHeight: 1.6 }}>
            Connect with {doctors.length}+ expert doctors across all specialties
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
            <Search size={20} color={COLORS.slate} style={{
              position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)"
            }} />
            <input
              type="text"
              placeholder="Search doctors, specialties, or clinics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%", padding: "12px 16px 12px 48px",
                background: `${COLORS.navy}F0`,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 12, color: COLORS.white,
                fontSize: 14, outline: "none"
              }}
            />
          </div>
          
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            style={{
              padding: "12px 16px",
              background: `${COLORS.navy}F0`,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 12, color: COLORS.white,
              fontSize: 14, outline: "none",
              minWidth: 200
            }}
          >
            {specialties.map(specialty => (
              <option key={specialty} value={specialty} style={{ background: COLORS.navy }}>
                {specialty === "all" ? "All Specialties" : specialty}
              </option>
            ))}
          </select>
        </div>

        {/* Results Count */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ color: COLORS.slate, fontSize: 14 }}>
            {filteredDoctors.length} doctors found
          </p>
        </div>

        {/* Doctors Grid */}
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
              whileHover={{ y: -4, scale: 1.02 }}
              style={{
                background: `${COLORS.navy}F0`,
                border: `1px solid ${COLORS.border}`,
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
                background: doctor.available ? `${COLORS.teal}20` : `${COLORS.gold}20`,
                color: doctor.available ? COLORS.teal : COLORS.gold,
                border: `1px solid ${doctor.available ? COLORS.teal : COLORS.gold}40`
              }}>
                {doctor.available ? "Available" : "Busy"}
              </div>

              {/* Doctor Info */}
              <div style={{ display: "flex", alignItems: "start", gap: 16, marginBottom: 16 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0
                }}>
                  <User size={28} color="#fff" />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: COLORS.white, fontWeight: 600, fontSize: 16, marginBottom: 4 }}>
                    {doctor.name}
                  </h3>
                  <p style={{ color: COLORS.teal, fontSize: 13, fontWeight: 500, marginBottom: 2 }}>
                    {doctor.specialty}
                  </p>
                  <p style={{ color: COLORS.slate, fontSize: 12, marginBottom: 8 }}>
                    {doctor.clinic}
                  </p>
                  <div style={{ display: "flex", gap: 16, fontSize: 11 }}>
                    <span style={{ color: COLORS.gold, display: "flex", alignItems: "center", gap: 4 }}>
                      <Star size={12} fill={COLORS.gold} /> {doctor.rating}
                    </span>
                    <span style={{ color: COLORS.slate }}>{doctor.experience}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12,
                padding: "12px 0", borderTop: `1px solid ${COLORS.border}`,
                marginBottom: 16
              }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: COLORS.white, fontWeight: 600, fontSize: 16 }}>
                    {doctor.patients.toLocaleString()}
                  </div>
                  <div style={{ color: COLORS.slate, fontSize: 11 }}>Patients</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: COLORS.white, fontWeight: 600, fontSize: 16 }}>
                    {doctor.experience.split('+')[0]}
                  </div>
                  <div style={{ color: COLORS.slate, fontSize: 11 }}>Years</div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleBookAppointment(doctor)}
                disabled={!doctor.available}
                style={{
                  width: "100%", padding: "12px",
                  background: doctor.available 
                    ? `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`
                    : `${COLORS.navy}F0`,
                  border: `1px solid ${doctor.available ? COLORS.teal : COLORS.border}`,
                  borderRadius: 8,
                  color: doctor.available ? COLORS.white : COLORS.slate,
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

        {/* No Results */}
        {filteredDoctors.length === 0 && (
          <div style={{
            textAlign: "center", padding: "60px 20px",
            background: `${COLORS.navy}F0`,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 16
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: `${COLORS.navy}F0`,
              border: `1px solid ${COLORS.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px"
            }}>
              <Search size={32} color={COLORS.slate} />
            </div>
            <h3 style={{ color: COLORS.white, fontSize: 20, marginBottom: 8 }}>
              No doctors found
            </h3>
            <p style={{ color: COLORS.slate, fontSize: 14 }}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

      </motion.div>
    </div>
  );
}
