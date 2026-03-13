import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Phone, Mail, CheckCircle, ArrowLeft, AlertCircle, CreditCard } from "lucide-react";
import { COLORS } from "../../constants/colors";
import BackButton from "../common/BackButton";
import Avatar from "../common/Avatar";

export default function DoctorBookingPage({ setView }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [selectedDate, setSelectedDate] = useState("today");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingStep, setBookingStep] = useState(1);
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
    reason: "",
    symptoms: "",
    previousVisit: false
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    // Get selected doctor and clinic from localStorage
    const doctorData = localStorage.getItem('selectedDoctor');
    const clinicData = localStorage.getItem('selectedClinic');
    
    if (doctorData && clinicData) {
      setSelectedDoctor(JSON.parse(doctorData));
      setSelectedClinic(JSON.parse(clinicData));
    }
  }, []);

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setBookingStep(2);
  };

  const handlePatientDetailsSubmit = (e) => {
    e.preventDefault();
    if (patientDetails.name && patientDetails.phone && patientDetails.email) {
      setBookingStep(3);
    }
  };

  const handleConfirmBooking = async () => {
    // Simulate booking API call
    setBookingConfirmed(true);
    
    // Store booking details
    const bookingData = {
      doctor: selectedDoctor,
      clinic: selectedClinic,
      date: selectedDate,
      time: selectedTime,
      patient: patientDetails,
      bookingId: `BK${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('latestBooking', JSON.stringify(bookingData));
    
    // Redirect to confirmation after 2 seconds
    setTimeout(() => {
      setView("booking-confirmation");
    }, 2000);
  };

  const timeSlots = selectedDate === "today" 
    ? selectedDoctor?.availability.today || []
    : selectedDoctor?.availability.tomorrow || [];

  if (!selectedDoctor || !selectedClinic) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.navy, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: COLORS.slate, fontSize: 16 }}>Loading booking information...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: COLORS.navy, paddingTop: 80, paddingBottom: 40 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <BackButton 
            onClick={() => setView("doctor-selection")}
            text="Back to Doctors"
            style={{ marginBottom: 24 }}
          />
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: "clamp(28px, 4vw, 36px)", 
              color: COLORS.white, 
              marginBottom: 12 
            }}>
              Book Appointment
            </h1>
            <p style={{ color: COLORS.slate, fontSize: 16 }}>
              Complete your booking in 3 simple steps
            </p>
          </motion.div>
        </div>

        {/* Progress Steps */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 40, maxWidth: 600 }}>
          {[
            { step: 1, label: "Select Time" },
            { step: 2, label: "Patient Details" },
            { step: 3, label: "Confirm" }
          ].map((item) => (
            <div key={item.step} style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: bookingStep >= item.step ? COLORS.teal : "#374151",
                color: COLORS.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 600
              }}>
                {bookingStep > item.step ? <CheckCircle size={16} /> : item.step}
              </div>
              <span style={{
                color: bookingStep >= item.step ? COLORS.white : COLORS.slate,
                fontSize: 14,
                fontWeight: bookingStep >= item.step ? 600 : 400
              }}>
                {item.label}
              </span>
              {item.step < 3 && (
                <div style={{
                  flex: 1,
                  height: 2,
                  background: bookingStep > item.step ? COLORS.teal : "#374151",
                  marginLeft: 8
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Doctor & Clinic Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{
            background: "#0f172a",
            border: `1px solid ${COLORS.border}`,
            borderRadius: 16,
            padding: 24,
            marginBottom: 32
          }}>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <Avatar initials={selectedDoctor.image} color={selectedDoctor.color} size={60} />
              <div style={{ flex: 1 }}>
                <h3 style={{ color: COLORS.white, fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
                  {selectedDoctor.name}
                </h3>
                <p style={{ color: COLORS.teal, fontSize: 14, marginBottom: 2 }}>
                  {selectedDoctor.specialty} • {selectedDoctor.experience}
                </p>
                <p style={{ color: COLORS.slate, fontSize: 13 }}>
                  {selectedClinic.name} • {selectedClinic.address}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: COLORS.gold, fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
                  {selectedDoctor.consultationFee}
                </div>
                <p style={{ color: COLORS.slate, fontSize: 12 }}>Consultation Fee</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Step 1: Time Selection */}
        {bookingStep === 1 && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div style={{
              background: "#0f172a",
              border: `1px solid ${COLORS.border}`,
              borderRadius: 16,
              padding: 24,
              marginBottom: 32
            }}>
              <h3 style={{ color: COLORS.white, fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
                Select Appointment Time
              </h3>
              
              {/* Date Selection */}
              <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                <button
                  onClick={() => setSelectedDate("today")}
                  style={{
                    flex: 1,
                    background: selectedDate === "today" ? `${COLORS.teal}20` : "#111827",
                    border: selectedDate === "today" ? `1px solid ${COLORS.teal}` : `1px solid ${COLORS.border}`,
                    borderRadius: 12,
                    padding: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  <div style={{ color: COLORS.white, fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
                    Today
                  </div>
                  <div style={{ color: COLORS.slate, fontSize: 12 }}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                </button>
                
                <button
                  onClick={() => setSelectedDate("tomorrow")}
                  style={{
                    flex: 1,
                    background: selectedDate === "tomorrow" ? `${COLORS.teal}20` : "#111827",
                    border: selectedDate === "tomorrow" ? `1px solid ${COLORS.teal}` : `1px solid ${COLORS.border}`,
                    borderRadius: 12,
                    padding: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  <div style={{ color: COLORS.white, fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
                    Tomorrow
                  </div>
                  <div style={{ color: COLORS.slate, fontSize: 12 }}>
                    {new Date(Date.now() + 86400000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                </button>
              </div>

              {/* Time Slots */}
              <div>
                <h4 style={{ color: COLORS.white, fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
                  Available Time Slots
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 12 }}>
                  {timeSlots.map((time, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTimeSelect(time)}
                      style={{
                        background: selectedTime === time ? COLORS.teal : "#111827",
                        border: selectedTime === time ? `1px solid ${COLORS.teal}` : `1px solid ${COLORS.border}`,
                        borderRadius: 8,
                        padding: "12px",
                        cursor: "pointer",
                        color: COLORS.white,
                        fontSize: 14,
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8
                      }}
                    >
                      <Clock size={16} />
                      {time}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Patient Details */}
        {bookingStep === 2 && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div style={{
              background: "#0f172a",
              border: `1px solid ${COLORS.border}`,
              borderRadius: 16,
              padding: 24,
              marginBottom: 32
            }}>
              <h3 style={{ color: COLORS.white, fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
                Patient Details
              </h3>
              
              <form onSubmit={handlePatientDetailsSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
                  <div>
                    <label style={{ color: COLORS.white, fontSize: 14, fontWeight: 600, marginBottom: 8, display: "block" }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={patientDetails.name}
                      onChange={(e) => setPatientDetails({...patientDetails, name: e.target.value})}
                      style={{
                        width: "100%",
                        background: "#111827",
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: 8,
                        padding: "12px",
                        color: COLORS.white,
                        fontSize: 14,
                        outline: "none"
                      }}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label style={{ color: COLORS.white, fontSize: 14, fontWeight: 600, marginBottom: 8, display: "block" }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={patientDetails.phone}
                      onChange={(e) => setPatientDetails({...patientDetails, phone: e.target.value})}
                      style={{
                        width: "100%",
                        background: "#111827",
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: 8,
                        padding: "12px",
                        color: COLORS.white,
                        fontSize: 14,
                        outline: "none"
                      }}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  
                  <div>
                    <label style={{ color: COLORS.white, fontSize: 14, fontWeight: 600, marginBottom: 8, display: "block" }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={patientDetails.email}
                      onChange={(e) => setPatientDetails({...patientDetails, email: e.target.value})}
                      style={{
                        width: "100%",
                        background: "#111827",
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: 8,
                        padding: "12px",
                        color: COLORS.white,
                        fontSize: 14,
                        outline: "none"
                      }}
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label style={{ color: COLORS.white, fontSize: 14, fontWeight: 600, marginBottom: 8, display: "block" }}>
                      Age *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="120"
                      value={patientDetails.age}
                      onChange={(e) => setPatientDetails({...patientDetails, age: e.target.value})}
                      style={{
                        width: "100%",
                        background: "#111827",
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: 8,
                        padding: "12px",
                        color: COLORS.white,
                        fontSize: 14,
                        outline: "none"
                      }}
                      placeholder="25"
                    />
                  </div>
                  
                  <div>
                    <label style={{ color: COLORS.white, fontSize: 14, fontWeight: 600, marginBottom: 8, display: "block" }}>
                      Gender *
                    </label>
                    <select
                      required
                      value={patientDetails.gender}
                      onChange={(e) => setPatientDetails({...patientDetails, gender: e.target.value})}
                      style={{
                        width: "100%",
                        background: "#111827",
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: 8,
                        padding: "12px",
                        color: COLORS.white,
                        fontSize: 14,
                        cursor: "pointer",
                        outline: "none"
                      }}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div style={{ marginTop: 20 }}>
                  <label style={{ color: COLORS.white, fontSize: 14, fontWeight: 600, marginBottom: 8, display: "block" }}>
                    Reason for Visit
                  </label>
                  <textarea
                    value={patientDetails.reason}
                    onChange={(e) => setPatientDetails({...patientDetails, reason: e.target.value})}
                    style={{
                      width: "100%",
                      background: "#111827",
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 8,
                      padding: "12px",
                      color: COLORS.white,
                      fontSize: 14,
                      outline: "none",
                      minHeight: 80,
                      resize: "vertical"
                    }}
                    placeholder="Describe your symptoms or reason for visit..."
                  />
                </div>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24 }}>
                  <button
                    type="button"
                    onClick={() => setBookingStep(1)}
                    style={{
                      background: "none",
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 8,
                      padding: "12px 24px",
                      cursor: "pointer",
                      color: COLORS.slate,
                      fontSize: 14,
                      fontWeight: 600
                    }}
                  >
                    Back
                  </button>
                  
                  <button
                    type="submit"
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
                      border: "none",
                      borderRadius: 8,
                      padding: "12px 24px",
                      cursor: "pointer",
                      color: COLORS.white,
                      fontSize: 14,
                      fontWeight: 600
                    }}
                  >
                    Continue to Confirmation
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {/* Step 3: Confirmation */}
        {bookingStep === 3 && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div style={{
              background: "#0f172a",
              border: `1px solid ${COLORS.border}`,
              borderRadius: 16,
              padding: 24,
              marginBottom: 32
            }}>
              <h3 style={{ color: COLORS.white, fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
                Booking Confirmation
              </h3>
              
              {/* Appointment Summary */}
              <div style={{
                background: `${COLORS.teal}15`,
                border: `1px solid ${COLORS.teal}30`,
                borderRadius: 12,
                padding: 20,
                marginBottom: 24
              }}>
                <div style={{ display: "grid", gap: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: COLORS.slate, fontSize: 14 }}>Date & Time</span>
                    <span style={{ color: COLORS.white, fontSize: 14, fontWeight: 600 }}>
                      {selectedDate === "today" ? "Today" : "Tomorrow"}, {selectedTime}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: COLORS.slate, fontSize: 14 }}>Doctor</span>
                    <span style={{ color: COLORS.white, fontSize: 14, fontWeight: 600 }}>
                      {selectedDoctor.name}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: COLORS.slate, fontSize: 14 }}>Clinic</span>
                    <span style={{ color: COLORS.white, fontSize: 14, fontWeight: 600 }}>
                      {selectedClinic.name}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: COLORS.slate, fontSize: 14 }}>Consultation Fee</span>
                    <span style={{ color: COLORS.gold, fontSize: 14, fontWeight: 600 }}>
                      {selectedDoctor.consultationFee}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Patient Summary */}
              <div style={{
                background: "#111827",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 12,
                padding: 20,
                marginBottom: 24
              }}>
                <h4 style={{ color: COLORS.white, fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
                  Patient Information
                </h4>
                <div style={{ display: "grid", gap: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: COLORS.slate, fontSize: 14 }}>Name</span>
                    <span style={{ color: COLORS.white, fontSize: 14 }}>
                      {patientDetails.name}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: COLORS.slate, fontSize: 14 }}>Phone</span>
                    <span style={{ color: COLORS.white, fontSize: 14 }}>
                      {patientDetails.phone}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: COLORS.slate, fontSize: 14 }}>Email</span>
                    <span style={{ color: COLORS.white, fontSize: 14 }}>
                      {patientDetails.email}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: COLORS.slate, fontSize: 14 }}>Age & Gender</span>
                    <span style={{ color: COLORS.white, fontSize: 14 }}>
                      {patientDetails.age} years, {patientDetails.gender}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Payment Info */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: 16,
                background: `${COLORS.gold}15`,
                border: `1px solid ${COLORS.gold}30`,
                borderRadius: 8,
                marginBottom: 24
              }}>
                <CreditCard size={20} color={COLORS.gold} />
                <span style={{ color: COLORS.gold, fontSize: 14 }}>
                  Payment to be made at the clinic
                </span>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button
                  onClick={() => setBookingStep(2)}
                  style={{
                    background: "none",
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 8,
                    padding: "12px 24px",
                    cursor: "pointer",
                    color: COLORS.slate,
                    fontSize: 14,
                    fontWeight: 600
                  }}
                >
                  Back
                </button>
                
                <button
                  onClick={handleConfirmBooking}
                  disabled={bookingConfirmed}
                  style={{
                    background: bookingConfirmed ? COLORS.teal : `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
                    border: "none",
                    borderRadius: 8,
                    padding: "12px 24px",
                    cursor: bookingConfirmed ? "not-allowed" : "pointer",
                    color: COLORS.white,
                    fontSize: 14,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    opacity: bookingConfirmed ? 0.7 : 1
                  }}
                >
                  {bookingConfirmed ? (
                    <>
                      <CheckCircle size={16} />
                      Confirming...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
