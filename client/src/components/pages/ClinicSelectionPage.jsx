import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Phone, Star, Users, Clock, ChevronRight, ArrowLeft } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import BackButton from "../common/BackButton";

export default function ClinicSelectionPage({ setView }) {
  const { colors } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  // Mock clinics data - in real app, this would come from API
  const clinics = [
    {
      id: 1,
      name: "City Medical Center",
      address: "123 MG Road, Mumbai",
      phone: "+91 22 2345 6789",
      rating: 4.8,
      doctors: 25,
      specialties: ["General", "Cardiology", "Orthopedics"],
      image: "🏥",
      timings: "24/7",
      distance: "2.5 km",
      availableSlots: 45
    },
    {
      id: 2,
      name: "Health Plus Clinic",
      address: "456 Brigade Road, Bangalore",
      phone: "+91 80 9876 5432",
      rating: 4.6,
      doctors: 18,
      specialties: ["General", "Pediatrics", "Gynecology"],
      image: "🏥",
      timings: "8 AM - 10 PM",
      distance: "5.1 km",
      availableSlots: 32
    },
    {
      id: 3,
      name: "Wellness Hub",
      address: "789 Connaught Place, Delhi",
      phone: "+91 11 3456 7890",
      rating: 4.9,
      doctors: 30,
      specialties: ["General", "Neurology", "Dermatology"],
      image: "🏥",
      timings: "9 AM - 9 PM",
      distance: "3.8 km",
      availableSlots: 28
    },
    {
      id: 4,
      name: "Care First Hospital",
      address: "321 FC Road, Pune",
      phone: "+91 20 8765 4321",
      rating: 4.7,
      doctors: 22,
      specialties: ["General", "ENT", "Ophthalmology"],
      image: "🏥",
      timings: "24/7",
      distance: "7.2 km",
      availableSlots: 15
    }
  ];

  const specialties = ["all", "General", "Cardiology", "Orthopedics", "Pediatrics", "Gynecology", "Neurology", "Dermatology", "ENT", "Ophthalmology"];

  const filteredClinics = clinics.filter(clinic => {
    const matchesSearch = clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clinic.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || clinic.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  const handleClinicSelect = (clinic) => {
    // Store selected clinic data and navigate to doctors page
    localStorage.setItem('selectedClinic', JSON.stringify(clinic));
    setView("doctor-selection");
  };

  return (
    <div style={{ minHeight: "100vh", background: colors.navy, paddingTop: 80, paddingBottom: 40 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <BackButton 
            onClick={() => setView("home")}
            text="Back to Home"
            style={{ marginBottom: 24 }}
          />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: "clamp(28px, 4vw, 36px)", 
              color: colors.white, 
              marginBottom: 12 
            }}>
              Select a Clinic
            </h1>
            <p style={{ color: colors.slate, fontSize: 16 }}>
              Choose from our network of trusted healthcare facilities
            </p>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20, marginBottom: 32 }}>
          <div style={{ position: "relative" }}>
            <Search size={20} color={colors.slate} style={{ position: "absolute", left: 16, top: 14 }} />
            <input
              type="text"
              placeholder="Search clinics by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                background: "#0f172a",
                border: `1px solid ${colors.border}`,
                borderRadius: 12,
                padding: "12px 16px 12px 48px",
                color: colors.white,
                fontSize: 14,
                outline: "none"
              }}
            />
          </div>
          
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            style={{
              background: "#0f172a",
              border: `1px solid ${colors.border}`,
              borderRadius: 12,
              padding: "12px 16px",
              color: colors.white,
              fontSize: 14,
              cursor: "pointer",
              outline: "none"
            }}
          >
            {specialties.map(spec => (
              <option key={spec} value={spec}>
                {spec === "all" ? "All Specialties" : spec}
              </option>
            ))}
          </select>
        </div>

        {/* Results Count */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ color: colors.slate, fontSize: 14 }}>
            Found {filteredClinics.length} clinics near you
          </p>
        </div>

        {/* Clinics List */}
        <div style={{ display: "grid", gap: 24 }}>
          {filteredClinics.map((clinic, index) => (
            <motion.div
              key={clinic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleClinicSelect(clinic)}
              style={{
                background: "#0f172a",
                border: `1px solid ${colors.border}`,
                borderRadius: 16,
                padding: 24,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-4px)";
                e.target.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
                e.target.style.borderColor = colors.teal;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
                e.target.style.borderColor = colors.border;
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 24, alignItems: "start" }}>
                
                {/* Clinic Icon */}
                <div style={{
                  width: 80,
                  height: 80,
                  background: `${colors.teal}15`,
                  border: `1px solid ${colors.teal}30`,
                  borderRadius: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32
                }}>
                  {clinic.image}
                </div>

                {/* Clinic Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: 12 }}>
                    <h3 style={{ color: colors.white, fontSize: 20, fontWeight: 600, marginBottom: 4 }}>
                      {clinic.name}
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: colors.slate, fontSize: 14 }}>
                      <MapPin size={14} />
                      <span>{clinic.address}</span>
                      <span style={{ color: colors.teal }}>• {clinic.distance}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 24, marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Star size={16} color={colors.gold} />
                      <span style={{ color: colors.white, fontSize: 14, fontWeight: 600 }}>
                        {clinic.rating}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Users size={16} color={colors.slate} />
                      <span style={{ color: colors.white, fontSize: 14 }}>
                        {clinic.doctors} doctors
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Clock size={16} color={colors.slate} />
                      <span style={{ color: colors.white, fontSize: 14 }}>
                        {clinic.timings}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {clinic.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        style={{
                          background: `${colors.teal}15`,
                          color: colors.teal,
                          padding: "4px 12px",
                          borderRadius: 20,
                          fontSize: 12,
                          fontWeight: 600
                        }}
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Availability and Action */}
                <div style={{ textAlign: "right" }}>
                  <div style={{ marginBottom: 16 }}>
                    <p style={{ color: colors.slate, fontSize: 12, marginBottom: 4 }}>Available Today</p>
                    <p style={{ color: colors.white, fontSize: 18, fontWeight: 700 }}>
                      {clinic.availableSlots}
                    </p>
                    <p style={{ color: colors.slate, fontSize: 12 }}>slots</p>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClinicSelect(clinic);
                    }}
                    style={{
                      background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
                      border: "none",
                      borderRadius: 8,
                      padding: "10px 20px",
                      cursor: "pointer",
                      color: colors.white,
                      fontSize: 14,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 8
                    }}
                  >
                    View Doctors
                    <ChevronRight size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredClinics.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            background: "#0f172a",
            border: `1px solid ${colors.border}`,
            borderRadius: 16
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <h3 style={{ color: colors.white, fontSize: 20, marginBottom: 8 }}>
              No clinics found
            </h3>
            <p style={{ color: colors.slate, fontSize: 14 }}>
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
