import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Clock, MapPin, Phone, Mail, Users, Calendar, Search, Filter, User, ChevronRight } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { setSelectedClinic } from "../../store/clinicSlice";

export default function ClinicPage({ setView }) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const { clinics, selectedClinic } = useSelector(state => state.clinic);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [showDoctorDetails, setShowDoctorDetails] = useState(null);

  const specialties = ["all", "General Physician", "Cardiologist", "Pediatrician", "Orthopedic", "Dermatologist", "Neurologist"];

  // Filter clinics based on user role
  const getFilteredClinics = () => {
    if (!isAuthenticated) {
      // Guest users see all clinics but limited info
      return clinics.map(clinic => ({
        ...clinic,
        doctors: [], // Hide doctors from guests
        services: clinic.services.slice(0, 2), // Show limited services
        phone: "***-***-****", // Hide phone
        email: "info@****.com" // Hide email
      }));
    }
    
    if (user?.role === "superadmin") {
      // Super admin sees all clinics with full details
      return clinics;
    }
    
    if (user?.role === "admin") {
      // Admin sees only their assigned clinic (mock: first clinic)
      return clinics.slice(0, 1);
    }
    
    // Regular users see all clinics with full details
    return clinics;
  };

  const filteredClinics = getFilteredClinics().filter(clinic => {
    const matchesSearch = clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clinic.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || 
                           clinic.doctors.some(doctor => doctor.specialty === selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  const handleClinicSelect = (clinic) => {
    dispatch(setSelectedClinic(clinic));
    setShowDoctorDetails(clinic);
  };

  const handleBookAppointment = (doctor, clinic) => {
    // Navigate to appointment with pre-selected clinic and doctor
    setView("appointment");
  };

  const getAllDoctors = () => {
    const allDoctors = [];
    filteredClinics.forEach(clinic => {
      clinic.doctors.forEach(doctor => {
        allDoctors.push({ ...doctor, clinicName: clinic.name });
      });
    });
    return allDoctors;
  };

  return (
    <div className="theme-transition" style={{
      minHeight: "100vh",
      background: colors.navy,
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
        style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>

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
            color: colors.white, fontWeight: 700,
            marginBottom: 8
          }}>
            Our Clinics
          </h1>
          <p style={{ color: colors.slate, fontSize: "clamp(16px, 2.5vw, 18px)", lineHeight: 1.6 }}>
            {isAuthenticated && user?.role === "admin" 
              ? "Manage your clinic and doctors"
              : isAuthenticated && user?.role === "superadmin"
              ? "Manage all clinics and doctors"
              : "Find the perfect clinic for your healthcare needs"
            }
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
              placeholder="Search clinics by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%", padding: "12px 16px 12px 48px",
                background: `${colors.navy}F0`,
                border: `1px solid ${colors.border}`,
                borderRadius: 12, color: colors.white,
                fontSize: 14, outline: "none"
              }}
            />
          </div>
          
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            style={{
              padding: "12px 16px",
              background: `${colors.navy}F0`,
              border: `1px solid ${colors.border}`,
              borderRadius: 12, color: colors.white,
              fontSize: 14, outline: "none",
              minWidth: 200
            }}
          >
            {specialties.map(specialty => (
              <option key={specialty} value={specialty} style={{ background: colors.navy }}>
                {specialty === "all" ? "All Specialties" : specialty}
              </option>
            ))}
          </select>
        </div>

        {/* Results Count */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ color: colors.slate, fontSize: 14 }}>
            {filteredClinics.length} clinics found
            {isAuthenticated && user?.role === "admin" && " (Your Clinic)"}
            {isAuthenticated && user?.role === "superadmin" && " (All Clinics)"}
          </p>
        </div>

        {/* Clinics Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
          gap: 32
        }}>
          {filteredClinics.map((clinic, index) => (
            <motion.div
              key={clinic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                background: `${colors.navy}F0`,
                border: `1px solid ${colors.border}`,
                borderRadius: 20, padding: 28,
                cursor: "pointer", transition: "all 0.3s ease"
              }}
              onClick={() => handleClinicSelect(clinic)}
            >
              {/* Clinic Image */}
              <div style={{
                width: "100%", height: 200, borderRadius: 12,
                background: `linear-gradient(135deg, ${colors.teal}20, ${colors.navy}40)`,
                marginBottom: 20,
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden", position: "relative"
              }}>
                <div style={{
                  position: "absolute", top: 12, right: 12,
                  background: `${colors.gold}20`,
                  border: `1px solid ${colors.gold}`,
                  borderRadius: 20, padding: "4px 12px",
                  display: "flex", alignItems: "center", gap: 4
                }}>
                  <Star size={12} fill={colors.gold} color={colors.gold} />
                  <span style={{ color: colors.gold, fontSize: 12, fontWeight: 600 }}>
                    {clinic.rating}
                  </span>
                </div>
                <Users size={48} color={colors.teal} />
              </div>

              {/* Clinic Info */}
              <h3 style={{ color: colors.white, fontWeight: 600, fontSize: 20, marginBottom: 8 }}>
                {clinic.name}
              </h3>
              
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <MapPin size={16} color={colors.slate} />
                <span style={{ color: colors.slate, fontSize: 14 }}>
                  {clinic.address}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <Clock size={16} color={colors.slate} />
                <span style={{ color: colors.slate, fontSize: 14 }}>
                  {clinic.timings}
                </span>
              </div>

              {isAuthenticated && (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <Phone size={16} color={colors.slate} />
                    <span style={{ color: colors.slate, fontSize: 14 }}>
                      {clinic.phone}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <Mail size={16} color={colors.slate} />
                    <span style={{ color: colors.slate, fontSize: 14 }}>
                      {clinic.email}
                    </span>
                  </div>
                </>
              )}

              {/* Services */}
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ color: colors.white, fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                  Services
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {clinic.services.map((service, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: `${colors.teal}15`,
                        border: `1px solid ${colors.teal}30`,
                        borderRadius: 6, padding: "4px 8px",
                        color: colors.teal, fontSize: 11, fontWeight: 500
                      }}
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Doctors Section */}
              {isAuthenticated && clinic.doctors.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <h4 style={{ color: colors.white, fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
                    Our Doctors ({clinic.doctors.length})
                  </h4>
                  <div style={{ display: "grid", gap: 12 }}>
                    {clinic.doctors.slice(0, 2).map((doctor) => (
                      <div
                        key={doctor.id}
                        style={{
                          display: "flex", alignItems: "center", gap: 12,
                          padding: 12, background: `${colors.navy}F0`,
                          border: `1px solid ${colors.border}`, borderRadius: 8
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookAppointment(doctor, clinic);
                        }}
                      >
                        <div style={{
                          width: 40, height: 40, borderRadius: "50%",
                          background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
                          display: "flex", alignItems: "center", justifyContent: "center"
                        }}>
                          <User size={20} color="#fff" />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ color: colors.white, fontSize: 14, fontWeight: 500 }}>
                            {doctor.name}
                          </div>
                          <div style={{ color: colors.teal, fontSize: 12 }}>
                            {doctor.specialty}
                          </div>
                        </div>
                        <ChevronRight size={16} color={colors.slate} />
                      </div>
                    ))}
                    {clinic.doctors.length > 2 && (
                      <div style={{
                        textAlign: "center", padding: 8,
                        color: colors.slate, fontSize: 12
                      }}>
                        +{clinic.doctors.length - 2} more doctors
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClinicSelect(clinic);
                }}
                style={{
                  width: "100%", padding: "14px",
                  background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
                  border: "none", borderRadius: 10,
                  color: colors.white, fontSize: 14, fontWeight: 600,
                  cursor: "pointer", transition: "all 0.2s ease"
                }}
              >
                {isAuthenticated ? "View Clinic Details" : "Learn More"}
              </button>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredClinics.length === 0 && (
          <div style={{
            textAlign: "center", padding: "60px 20px",
            background: `${colors.navy}F0`,
            border: `1px solid ${colors.border}`,
            borderRadius: 16
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: `${colors.navy}F0`,
              border: `1px solid ${colors.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px"
            }}>
              <Search size={32} color={colors.slate} />
            </div>
            <h3 style={{ color: colors.white, fontSize: 20, marginBottom: 8 }}>
              No clinics found
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
