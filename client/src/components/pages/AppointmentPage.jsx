import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, Phone, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import BackButton from "../common/BackButton";

export default function AppointmentPage({ setView }) {
  const { colors } = useTheme();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    doctor: "",
    date: "",
    time: "",
    reason: "",
    clinic: ""
  });

  const doctors = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "General Physician", clinic: "City Medical Center", rating: 4.8, experience: "10+ years" },
    { id: 2, name: "Dr. Michael Chen", specialty: "Cardiologist", clinic: "Heart Care Clinic", rating: 4.9, experience: "15+ years" },
    { id: 3, name: "Dr. Emily Davis", specialty: "Pediatrician", clinic: "Children's Hospital", rating: 4.7, experience: "8+ years" },
    { id: 4, name: "Dr. James Wilson", specialty: "Orthopedic", clinic: "Bone & Joint Center", rating: 4.8, experience: "12+ years" },
    { id: 5, name: "Dr. Lisa Anderson", specialty: "Dermatologist", clinic: "Skin Care Clinic", rating: 4.6, experience: "6+ years" },
    { id: 6, name: "Dr. Robert Taylor", specialty: "Neurologist", clinic: "Neuro Care Center", rating: 4.9, experience: "20+ years" }
  ];

  const clinics = [
    { id: 1, name: "City Medical Center", address: "123 Main St, City" },
    { id: 2, name: "Heart Care Clinic", address: "456 Oak Ave, City" },
    { id: 3, name: "Children's Hospital", address: "789 Pine Rd, City" },
    { id: 4, name: "Bone & Joint Center", address: "321 Elm St, City" },
    { id: 5, name: "Skin Care Clinic", address: "654 Maple Dr, City" },
    { id: 6, name: "Neuro Care Center", address: "987 Cedar Ln, City" }
  ];

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDoctorSelect = (doctor) => {
    setFormData({
      ...formData,
      doctor: doctor.name,
      clinic: doctor.clinic
    });
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const selectedDoctor = doctors.find(d => d.name === formData.doctor);

  return (
    <div style={{
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
      <div style={{
        position: "absolute", bottom: -80, left: -80,
        width: "clamp(250px, 35vw, 350px)", height: "clamp(250px, 35vw, 350px)",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${colors.gold}10, transparent 70%)`,
        pointerEvents: "none"
      }} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: "clamp(32px, 5vw, 48px)" }}>
          <BackButton 
            onClick={() => setView("home")}
            text="Back to Home"
            style={{ marginBottom: 16 }}
          />
          
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            color: colors.white, fontWeight: 700,
            marginBottom: 8
          }}>
            Book Your Appointment
          </h1>
          <p style={{ color: colors.slate, fontSize: "clamp(16px, 2.5vw, 18px)", lineHeight: 1.6 }}>
            Schedule your visit with our expert doctors in simple steps
          </p>
        </div>

        {/* Progress Steps */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          marginBottom: "clamp(32px, 5vw, 48px)",
          position: "relative"
        }}>
          <div style={{
            position: "absolute", top: 20, left: 0, right: 0,
            height: 2, background: colors.border,
            zIndex: 0
          }} />
          <div style={{
            position: "absolute", top: 20, left: 0,
            height: 2, background: colors.teal,
            zIndex: 0,
            width: step === 1 ? "0%" : step === 2 ? "50%" : "100%",
            transition: "width 0.3s ease"
          }} />
          
          {[
            { num: 1, label: "Select Doctor" },
            { num: 2, label: "Patient Details" },
            { num: 3, label: "Confirmation" }
          ].map((item, index) => (
            <div key={item.num} style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              position: "relative", zIndex: 1
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: step >= item.num ? colors.teal : colors.navyLight,
                border: `2px solid ${colors.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: colors.white, fontWeight: 600,
                marginBottom: 8
              }}>
                {item.num}
              </div>
              <span style={{
                color: step >= item.num ? colors.white : colors.slate,
                fontSize: 12, fontWeight: 500, textAlign: "center"
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              <h2 style={{
                fontSize: "clamp(20px, 3vw, 24px)",
                color: colors.white, fontWeight: 600, marginBottom: 24
              }}>
                Choose a Doctor
              </h2>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 20
              }}>
                {doctors.map((doctor) => (
                  <motion.div
                    key={doctor.id}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDoctorSelect(doctor)}
                    style={{
                      background: `${colors.navy}F0`,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 16, padding: 20,
                      cursor: "pointer", transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "start", gap: 16 }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: "50%",
                        background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0
                      }}>
                        <User size={24} color="#fff" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ color: colors.white, fontWeight: 600, marginBottom: 4 }}>
                          {doctor.name}
                        </h3>
                        <p style={{ color: colors.teal, fontSize: 14, marginBottom: 2 }}>
                          {doctor.specialty}
                        </p>
                        <p style={{ color: colors.slate, fontSize: 13, marginBottom: 8 }}>
                          {doctor.clinic}
                        </p>
                        <div style={{ display: "flex", gap: 12, fontSize: 12 }}>
                          <span style={{ color: colors.gold }}>⭐ {doctor.rating}</span>
                          <span style={{ color: colors.slate }}>{doctor.experience}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              {/* Selected Doctor Info */}
              <div style={{
                background: `${colors.teal}15`,
                border: `1px solid ${colors.teal}30`,
                borderRadius: 12, padding: 20, marginBottom: 32
              }}>
                <h3 style={{ color: colors.teal, fontWeight: 600, marginBottom: 8 }}>
                  Selected Doctor
                </h3>
                <p style={{ color: colors.white, fontWeight: 500 }}>
                  {selectedDoctor?.name} - {selectedDoctor?.specialty}
                </p>
                <p style={{ color: colors.slate, fontSize: 14 }}>
                  {selectedDoctor?.clinic}
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: "grid", gap: 24 }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: 20
                }}>
                  <div>
                    <label style={{ 
                      display: "block", color: colors.white, 
                      fontSize: 14, fontWeight: 500, marginBottom: 8 
                    }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      style={{
                        width: "100%", padding: "12px 16px",
                        background: `${colors.navy}F0`,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 8, color: colors.white,
                        fontSize: 14, outline: "none"
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ 
                      display: "block", color: colors.white, 
                      fontSize: 14, fontWeight: 500, marginBottom: 8 
                    }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      style={{
                        width: "100%", padding: "12px 16px",
                        background: `${colors.navy}F0`,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 8, color: colors.white,
                        fontSize: 14, outline: "none"
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ 
                      display: "block", color: colors.white, 
                      fontSize: 14, fontWeight: 500, marginBottom: 8 
                    }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      style={{
                        width: "100%", padding: "12px 16px",
                        background: `${colors.navy}F0`,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 8, color: colors.white,
                        fontSize: 14, outline: "none"
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ 
                      display: "block", color: colors.white, 
                      fontSize: 14, fontWeight: 500, marginBottom: 8 
                    }}>
                      Appointment Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={handleChange}
                      style={{
                        width: "100%", padding: "12px 16px",
                        background: `${colors.navy}F0`,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 8, color: colors.white,
                        fontSize: 14, outline: "none"
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ 
                      display: "block", color: colors.white, 
                      fontSize: 14, fontWeight: 500, marginBottom: 8 
                    }}>
                      Preferred Time
                    </label>
                    <select
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      style={{
                        width: "100%", padding: "12px 16px",
                        background: `${colors.navy}F0`,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 8, color: colors.white,
                        fontSize: 14, outline: "none"
                      }}
                    >
                      <option value="" style={{ background: colors.navy }}>Select time</option>
                      {timeSlots.map(slot => (
                        <option key={slot} value={slot} style={{ background: colors.navy }}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ 
                      display: "block", color: colors.white, 
                      fontSize: 14, fontWeight: 500, marginBottom: 8 
                    }}>
                      Clinic
                    </label>
                    <select
                      name="clinic"
                      required
                      value={formData.clinic}
                      onChange={handleChange}
                      style={{
                        width: "100%", padding: "12px 16px",
                        background: `${colors.navy}F0`,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 8, color: colors.white,
                        fontSize: 14, outline: "none"
                      }}
                    >
                      <option value="" style={{ background: colors.navy }}>Select clinic</option>
                      {clinics.map(clinic => (
                        <option key={clinic.id} value={clinic.name} style={{ background: colors.navy }}>
                          {clinic.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ 
                    display: "block", color: colors.white, 
                    fontSize: 14, fontWeight: 500, marginBottom: 8 
                  }}>
                    Reason for Visit
                  </label>
                  <textarea
                    name="reason"
                    rows={4}
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Please describe your symptoms or reason for visit..."
                    style={{
                      width: "100%", padding: "12px 16px",
                      background: `${colors.navy}F0`,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 8, color: colors.white,
                      fontSize: 14, outline: "none",
                      resize: "vertical"
                    }}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{
                      padding: "12px 24px",
                      background: "none",
                      border: `1px solid ${colors.border}`,
                      borderRadius: 8,
                      color: colors.slate,
                      fontSize: 14, fontWeight: 500,
                      cursor: "pointer"
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: "12px 32px",
                      background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
                      border: "none",
                      borderRadius: 8,
                      color: colors.white,
                      fontSize: 14, fontWeight: 600,
                      cursor: "pointer"
                    }}
                  >
                    Book Appointment
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
              <div style={{
                textAlign: "center",
                padding: "clamp(40px, 5vw, 60px)",
                background: `${colors.navy}F0`,
                border: `1px solid ${colors.border}`,
                borderRadius: 20
              }}>
                <div style={{
                  width: 80, height: 80, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 24px"
                }}>
                  <CheckCircle size={40} color="#fff" />
                </div>
                
                <h2 style={{
                  fontSize: "clamp(24px, 4vw, 32px)",
                  color: colors.white, fontWeight: 700, marginBottom: 16
                }}>
                  Appointment Booked Successfully!
                </h2>
                
                <p style={{ color: colors.slate, fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
                  Your appointment has been scheduled. You will receive a confirmation email shortly with all the details.
                </p>

                <div style={{
                  background: `${colors.teal}15`,
                  border: `1px solid ${colors.teal}30`,
                  borderRadius: 12, padding: 24,
                  textAlign: "left", marginBottom: 32
                }}>
                  <h3 style={{ color: colors.teal, fontWeight: 600, marginBottom: 16 }}>
                    Appointment Details
                  </h3>
                  <div style={{ display: "grid", gap: 12, fontSize: 14 }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <User size={16} color={colors.teal} />
                      <span style={{ color: colors.slate }}>Doctor:</span>
                      <span style={{ color: colors.white }}>{formData.doctor}</span>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Calendar size={16} color={colors.teal} />
                      <span style={{ color: colors.slate }}>Date:</span>
                      <span style={{ color: colors.white }}>{formData.date}</span>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Clock size={16} color={colors.teal} />
                      <span style={{ color: colors.slate }}>Time:</span>
                      <span style={{ color: colors.white }}>{formData.time}</span>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Mail size={16} color={colors.teal} />
                      <span style={{ color: colors.slate }}>Email:</span>
                      <span style={{ color: colors.white }}>{formData.email}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setView("home")}
                  style={{
                    padding: "12px 32px",
                    background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
                    border: "none",
                    borderRadius: 8,
                    color: colors.white,
                    fontSize: 14, fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  Back to Home
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
