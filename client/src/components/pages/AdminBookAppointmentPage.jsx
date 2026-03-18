import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, Users, Clock, Calendar, Phone, Mail, ArrowLeft, Filter, Heart, MapPin, Languages } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import BackButton from "../common/BackButton";
import Avatar from "../common/Avatar";

export default function AdminBookAppointmentPage({ setView }) {
  const { colors, theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  // Mock admin's clinic data (this would come from Redux auth state)
  const adminClinic = {
    id: 1,
    name: "City Medical Center",
    address: "123 MG Road, Mumbai",
    phone: "+91 22 2345 6789",
    rating: 4.8,
    doctors: 25,
    specialties: ["General", "Cardiology", "Orthopedics", "Pediatrics"],
    image: "🏥",
    timings: "24/7",
    distance: "0 km",
    availableSlots: 45
  };

  // Mock doctors for admin's clinic only
  const doctors = [
    {
      id: 1,
      name: "Dr. Ayesha Khan",
      specialty: "Cardiology",
      experience: "12 years",
      rating: 4.8,
      patients: 1250,
      education: "MBBS, MD (Cardiology)",
      clinic: "City Medical Center",
      image: "👩‍⚕️",
      nextAvailable: "10:00 AM",
      consultationFee: 800,
      languages: ["English", "Hindi", "Marathi"],
      about: "Expert in interventional cardiology and preventive heart care.",
      availability: {
        today: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"],
        tomorrow: ["9:00 AM", "10:30 AM", "11:30 AM", "2:30 PM", "3:30 PM", "4:30 PM"]
      }
    },
    {
      id: 2,
      name: "Dr. Rahul Mehta",
      specialty: "General",
      experience: "8 years",
      rating: 4.6,
      patients: 980,
      education: "MBBS, MD (General Medicine)",
      clinic: "City Medical Center",
      image: "👨‍⚕️",
      nextAvailable: "11:30 AM",
      consultationFee: 500,
      languages: ["English", "Hindi"],
      about: "Specializes in primary care and chronic disease management.",
      availability: {
        today: ["10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM", "5:00 PM"],
        tomorrow: ["9:30 AM", "11:00 AM", "2:30 PM", "4:00 PM", "5:30 PM"]
      }
    },
    {
      id: 3,
      name: "Dr. Priya Sharma",
      specialty: "Pediatrics",
      experience: "10 years",
      rating: 4.9,
      patients: 1500,
      education: "MBBS, MD (Pediatrics)",
      clinic: "City Medical Center",
      image: "👩‍⚕️",
      nextAvailable: "2:00 PM",
      consultationFee: 600,
      languages: ["English", "Hindi", "Gujarati"],
      about: "Dedicated to child healthcare and vaccination programs.",
      availability: {
        today: ["11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"],
        tomorrow: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"]
      }
    },
    {
      id: 4,
      name: "Dr. Arjun Patel",
      specialty: "Orthopedics",
      experience: "15 years",
      rating: 4.7,
      patients: 890,
      education: "MBBS, MS (Orthopedics)",
      clinic: "City Medical Center",
      image: "👨‍⚕️",
      nextAvailable: "9:00 AM",
      consultationFee: 900,
      languages: ["English", "Hindi", "Gujarati"],
      about: "Expert in joint replacement and sports medicine.",
      availability: {
        today: [],
        tomorrow: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"]
      }
    }
  ];

  const specialties = ["all", ...new Set(doctors.map(doc => doc.specialty))];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleDoctorSelect = (doctor) => {
    console.log('AdminBookAppointmentPage Debug - handleDoctorSelect called:', { doctor });
    // Store selected doctor and navigate to booking form
    localStorage.setItem('selectedDoctor', JSON.stringify(doctor));
    localStorage.setItem('selectedClinic', JSON.stringify(adminClinic));
    console.log('AdminBookAppointmentPage Debug - Stored data in localStorage, navigating to doctor-booking');
    setView("doctor-booking");
  };

  const handlePatientSearch = () => {
    // TODO: Implement patient search functionality
    alert("Patient search feature coming soon!");
  };

  return (
    <div style={{ minHeight: "100vh", background: theme === 'white' ? colors.cream : colors.navy, paddingTop: 80, paddingBottom: 40 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <BackButton
            onClick={() => setView("admin-dashboard")}
            text="Back to Dashboard"
            style={{ marginBottom: 24 }}
          />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: "clamp(28px, 4vw, 36px)", 
              color: theme === 'white' ? '#1a202c' : colors.white, 
              marginBottom: 12 
            }}>
              Book Appointment
            </h1>
            <p style={{ color: colors.slate, fontSize: 16 }}>
              Select a doctor from {adminClinic.name} to book appointment
            </p>
          </motion.div>
        </div>

        {/* Clinic Info Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: colors.background || colors.navyLight,
            border: `1px solid ${colors.border}`,
            borderRadius: 16,
            padding: 24,
            marginBottom: 32,
            display: "flex",
            alignItems: "center",
            gap: 20
          }}
        >
          <div style={{
            width: 60, height: 60, borderRadius: 12,
            background: `${colors.teal}18`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 32
          }}>
            {adminClinic.image}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
              {adminClinic.name}
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, color: colors.slate, fontSize: 14 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <MapPin size={14} />
                {adminClinic.address}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Phone size={14} />
                {adminClinic.phone}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Clock size={14} />
                {adminClinic.timings}
              </span>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ 
              display: "flex", alignItems: "center", gap: 8, 
              marginBottom: 4, justifyContent: "flex-end" 
            }}>
              <Star size={16} color={colors.gold} fill={colors.gold} />
              <span style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontWeight: 600 }}>{adminClinic.rating}</span>
            </div>
            <div style={{ color: colors.slate, fontSize: 12 }}>
              {adminClinic.doctors} doctors
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
          gap: 20, 
          marginBottom: 32 
        }}>
          <div style={{ position: "relative" }}>
            <Search size={20} color={colors.slate} style={{ position: "absolute", left: 16, top: 14 }} />
            <input
              type="text"
              placeholder="Search doctors by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                background: colors.background || colors.navyLight,
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
              background: colors.background || colors.navyLight,
              border: `1px solid ${colors.border}`,
              borderRadius: 12,
              padding: "12px 16px",
              color: colors.white,
              fontSize: 14,
              cursor: "pointer",
              outline: "none"
            }}
          >
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>
                {specialty === "all" ? "All Specialties" : specialty}
              </option>
            ))}
          </select>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handlePatientSearch}
            style={{
              background: `${colors.gold}15`,
              border: `1px solid ${colors.gold}30`,
              borderRadius: 12,
              padding: "12px 20px",
              cursor: "pointer",
              color: colors.gold,
              fontSize: 14,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8
            }}
          >
            <Users size={18} />
            Find Patient
          </motion.button>
        </div>

        {/* Results Count */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ color: colors.slate, fontSize: 14 }}>
            Found {filteredDoctors.length} doctors in {adminClinic.name}
          </p>
        </div>

        {/* Doctors Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 24 }}>
          {filteredDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                background: colors.background || colors.navyLight,
                border: `1px solid ${colors.border}`,
                borderRadius: 16,
                padding: 24,
                cursor: "pointer"
              }}>
              <div style={{ display: "flex", alignItems: "start", gap: 16, marginBottom: 16 }}>
                <div style={{
                  width: 60, height: 60, borderRadius: 12,
                  background: `${colors.teal}18`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24
                }}>
                  {doctor.image}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
                    {doctor.name}
                  </h3>
                  <p style={{ color: colors.teal, fontSize: 14, fontWeight: 500, marginBottom: 2 }}>
                    {doctor.specialty}
                  </p>
                  <p style={{ color: colors.slate, fontSize: 12 }}>
                    {doctor.education}
                  </p>
                </div>
              </div>

              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(2, 1fr)", 
                gap: 12, 
                marginBottom: 16 
              }}>
                <div>
                  <p style={{ color: colors.slate, fontSize: 11, marginBottom: 2 }}>Experience</p>
                  <p style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 13, fontWeight: 600 }}>
                    {doctor.experience}
                  </p>
                </div>
                <div>
                  <p style={{ color: colors.slate, fontSize: 11, marginBottom: 2 }}>Patients</p>
                  <p style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 13, fontWeight: 600 }}>
                    {doctor.patients.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p style={{ color: colors.slate, fontSize: 11, marginBottom: 2 }}>Fee</p>
                  <p style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 13, fontWeight: 600 }}>
                    ₹{doctor.consultationFee}
                  </p>
                </div>
                <div>
                  <p style={{ color: colors.slate, fontSize: 11, marginBottom: 2 }}>Rating</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Star size={12} color={colors.gold} fill={colors.gold} />
                    <span style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 13, fontWeight: 600 }}>
                      {doctor.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ 
                padding: "8px 12px", 
                borderRadius: 8, 
                background: doctor.availability.today && doctor.availability.today.length > 0 ? `${colors.teal}18` : `${colors.gold}18`,
                color: doctor.availability.today && doctor.availability.today.length > 0 ? colors.teal : colors.gold,
                fontSize: 12, 
                fontWeight: 600, 
                textAlign: "center",
                marginBottom: 12
              }}>
                {doctor.availability.today && doctor.availability.today.length > 0 ? `Available Today (${doctor.availability.today.length} slots)` : `Available Tomorrow (${doctor.availability.tomorrow.length} slots)`} • {doctor.nextAvailable}
              </div>

              <div style={{ color: colors.slate, fontSize: 12, lineHeight: 1.4 }}>
                {doctor.about}
              </div>

              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 8, 
                marginTop: 12,
                padding: "8px 0",
                borderTop: `1px solid ${colors.border}`
              }}>
                <Languages size={14} color={colors.slate} />
                <span style={{ color: colors.slate, fontSize: 12 }}>
                  {doctor.languages.join(", ")}
                </span>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('AdminBookAppointmentPage Debug - Select Doctor button clicked for:', doctor.name);
                  handleDoctorSelect(doctor);
                }}
                style={{
                  background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
                  border: "none",
                  borderRadius: 8,
                  padding: "12px 20px",
                  cursor: "pointer",
                  color: colors.white,
                  fontSize: 14,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  width: "100%",
                  marginTop: 16
                }}
              >
                Select Doctor
                <ArrowLeft size={16} style={{ transform: "rotate(-90deg)" }} />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredDoctors.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            background: colors.background || colors.navyLight,
            border: `1px solid ${colors.border}`,
            borderRadius: 16
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>👨‍⚕️</div>
            <h3 style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 20, marginBottom: 8 }}>
              No doctors found
            </h3>
            <p style={{ color: colors.slate, fontSize: 14 }}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
