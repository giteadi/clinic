import { useState, useEffect } from "react";
import { Search, Star, Users, Clock, Calendar, Phone, Mail, ArrowLeft, Filter, Heart, MapPin } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import BackButton from "../common/BackButton";
import Avatar from "../common/Avatar";

export default function DoctorSelectionPage({ setView }) {
  const { colors, theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Get selected clinic from localStorage
    const clinicData = localStorage.getItem('selectedClinic');
    if (clinicData) {
      const clinic = JSON.parse(clinicData);
      setSelectedClinic(clinic);
      
      // Mock doctors data based on clinic specialties
      const mockDoctors = [
        {
          id: 1,
          name: "Dr. Sarah Johnson",
          specialty: "General",
          experience: "10+ years",
          rating: 4.8,
          patients: 1250,
          education: "MBBS, MD - AIIMS Delhi",
          consultationFee: "₹800",
          availability: {
            today: ["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"],
            tomorrow: ["9:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "5:00 PM"]
          },
          image: "SJ",
          color: colors.teal,
          languages: ["English", "Hindi"],
          nextAvailable: "Today, 9:00 AM"
        },
        {
          id: 2,
          name: "Dr. Rahul Mehta",
          specialty: "Cardiology",
          experience: "15+ years",
          rating: 4.9,
          patients: 2100,
          education: "MBBS, MD - AIIMS Delhi",
          consultationFee: "₹1200",
          availability: {
            today: ["10:00 AM", "11:00 AM", "3:00 PM"],
            tomorrow: ["9:00 AM", "10:00 AM", "2:00 PM", "4:00 PM"]
          },
          image: "RM",
          color: "#7C3AED",
          languages: ["English", "Hindi", "Gujarati"],
          nextAvailable: "Today, 10:00 AM"
        },
        {
          id: 3,
          name: "Dr. Priya Sharma",
          specialty: "Pediatrics",
          experience: "8+ years",
          rating: 4.7,
          patients: 980,
          education: "MBBS, MD - PGIMER Chandigarh",
          consultationFee: "₹600",
          availability: {
            today: ["11:00 AM", "2:00 PM", "4:00 PM"],
            tomorrow: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"]
          },
          image: "PS",
          color: "#059669",
          languages: ["English", "Hindi"],
          nextAvailable: "Today, 11:00 AM"
        },
        {
          id: 4,
          name: "Dr. Ayesha Khan",
          specialty: "Gynecology",
          experience: "12+ years",
          rating: 4.9,
          patients: 1560,
          education: "MBBS, MS - KEM Mumbai",
          consultationFee: "₹1000",
          availability: {
            today: ["2:00 PM", "3:00 PM"],
            tomorrow: ["10:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"]
          },
          image: "AK",
          color: "#EC4899",
          languages: ["English", "Hindi", "Urdu"],
          nextAvailable: "Today, 2:00 PM"
        }
      ];
      
      setDoctors(mockDoctors);
    }
  }, []);

  const specialties = ["all", "General", "Cardiology", "Pediatrics", "Gynecology", "Neurology", "Dermatology", "ENT", "Ophthalmology"];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleDoctorSelect = (doctor) => {
    // Store selected doctor and navigate to booking
    localStorage.setItem('selectedDoctor', JSON.stringify(doctor));
    setView("doctor-booking");
  };

  if (!selectedClinic) {
    return (
      <div style={{ minHeight: "100vh", background: theme === 'white' ? colors.cream : colors.navy, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: colors.slate, fontSize: 16 }}>Loading clinic information...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: theme === 'white' ? colors.cream : colors.navy, paddingTop: 80, paddingBottom: 40 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        
        {/* Header with Clinic Info */}
        <div style={{ marginBottom: 40 }}>
          <BackButton 
            onClick={() => setView("clinic-selection")}
            text="Back to Clinics"
            style={{ marginBottom: 24 }}
          />
          
          <div>
            <div style={{
              background: "#0f172a",
              border: `1px solid ${colors.border}`,
              borderRadius: 16,
              padding: 24,
              marginBottom: 24
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 24 }}>
                <div>
                  <h2 style={{ 
                    fontFamily: "'Playfair Display', serif", 
                    fontSize: 24, 
                    color: colors.white, 
                    marginBottom: 8 
                  }}>
                    {selectedClinic.name}
                  </h2>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 16, color: colors.slate, fontSize: 14 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <MapPin size={16} />
                      {selectedClinic.address}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Phone size={16} />
                      {selectedClinic.phone}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Clock size={16} />
                      {selectedClinic.timings}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <Star size={16} color={colors.gold} />
                    <span style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 18, fontWeight: 600 }}>
                      {selectedClinic.rating}
                    </span>
                  </div>
                  <p style={{ color: colors.slate, fontSize: 12 }}>
                    {selectedClinic.doctors} doctors available
                  </p>
                </div>
              </div>
            </div>
            
            <h1 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: "clamp(28px, 4vw, 36px)", 
              color: colors.white, 
              marginBottom: 12 
            }}>
              Choose a Doctor
            </h1>
            <p style={{ color: colors.slate, fontSize: 16 }}>
              Select from our experienced healthcare professionals
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20, marginBottom: 32 }}>
          <div style={{ position: "relative" }}>
            <Search size={20} color={colors.slate} style={{ position: "absolute", left: 16, top: 14 }} />
            <input
              type="text"
              placeholder="Search doctors by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                background: theme === 'white' ? '#FFFFFF' : "#0f172a",
                border: `1px solid ${theme === 'white' ? 'rgba(0,0,0,0.08)' : colors.border}`,
                borderRadius: 12,
                padding: "12px 16px 12px 48px",
                color: theme === 'white' ? '#1a202c' : colors.white,
                fontSize: 14,
                outline: "none"
              }}
            />
          </div>
          
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            style={{
              background: theme === 'white' ? '#FFFFFF' : "#0f172a",
              border: `1px solid ${theme === 'white' ? 'rgba(0,0,0,0.08)' : colors.border}`,
              borderRadius: 12,
              padding: "12px 16px",
              color: theme === 'white' ? '#1a202c' : colors.white,
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
            Found {filteredDoctors.length} doctors
          </p>
        </div>

        {/* Doctors List */}
        <div style={{ display: "grid", gap: 24 }}>
          {filteredDoctors.map((doctor, index) => (
            <div
              key={doctor.id}
              onClick={() => handleDoctorSelect(doctor)}
              style={{
                background: theme === 'white' ? '#FFFFFF' : "#0f172a",
                border: `1px solid ${theme === 'white' ? 'rgba(0,0,0,0.08)' : colors.border}`,
                borderRadius: 16,
                padding: 24,
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: theme === 'white' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-4px)";
                e.target.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
                e.target.style.borderColor = colors.teal;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = theme === 'white' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none';
                e.target.style.borderColor = theme === 'white' ? 'rgba(0,0,0,0.08)' : colors.border;
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 24, alignItems: "start" }}>
                
                {/* Doctor Avatar */}
                <Avatar 
                  initials={doctor.image} 
                  color={doctor.color} 
                  size={80}
                />

                {/* Doctor Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: 12 }}>
                    <h3 style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 20, fontWeight: 600, marginBottom: 4 }}>
                      {doctor.name}
                    </h3>
                    <p style={{ color: colors.teal, fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
                      {doctor.specialty}
                    </p>
                    <p style={{ color: colors.slate, fontSize: 13, marginBottom: 8 }}>
                      {doctor.education}
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: 24, marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Star size={16} color={colors.gold} />
                      <span style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 14, fontWeight: 600 }}>
                        {doctor.rating}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Users size={16} color={colors.slate} />
                      <span style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 14 }}>
                        {doctor.patients} patients
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Clock size={16} color={colors.slate} />
                      <span style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 14 }}>
                        {doctor.experience}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Calendar size={16} color={colors.slate} />
                      <span style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 14 }}>
                        Next: {doctor.nextAvailable}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <div style={{
                      background: `${colors.teal}15`,
                      color: colors.teal,
                      padding: "4px 12px",
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 600
                    }}>
                      {doctor.languages.join(", ")}
                    </div>
                    <div style={{
                      background: `${colors.gold}15`,
                      color: colors.gold,
                      padding: "4px 12px",
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 600
                    }}>
                      {doctor.consultationFee}
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div style={{ textAlign: "right" }}>
                  <div style={{ marginBottom: 16 }}>
                    <p style={{ color: colors.slate, fontSize: 12, marginBottom: 4 }}>Available Today</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "flex-end", maxWidth: 200 }}>
                      {doctor.availability.today.slice(0, 3).map((slot, idx) => (
                        <span
                          key={idx}
                          style={{
                            background: `${colors.teal}15`,
                            color: colors.teal,
                            padding: "2px 8px",
                            borderRadius: 12,
                            fontSize: 11,
                            fontWeight: 600
                          }}
                        >
                          {slot}
                        </span>
                      ))}
                      {doctor.availability.today.length > 3 && (
                        <span style={{ color: colors.slate, fontSize: 11 }}>
                          +{doctor.availability.today.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDoctorSelect(doctor);
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
                    Book Appointment
                    <Calendar size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDoctors.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            background: theme === 'white' ? '#FFFFFF' : colors.navyLight,
            border: `1px solid ${theme === 'white' ? 'rgba(0,0,0,0.08)' : colors.border}`,
            borderRadius: 16,
            boxShadow: theme === 'white' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>👨‍⚕️</div>
            <h3 style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 20, marginBottom: 8 }}>
              No doctors found
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
