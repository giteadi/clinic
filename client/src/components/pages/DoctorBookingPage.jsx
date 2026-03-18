import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Phone, Mail, CheckCircle, ArrowLeft, AlertCircle, CreditCard, LogIn } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useSelector } from "react-redux";
import BackButton from "../common/BackButton";
import Avatar from "../common/Avatar";
import PaymentPage from "./PaymentPage";

export default function DoctorBookingPage({ setView }) {
  const { colors, theme } = useTheme();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [selectedDate, setSelectedDate] = useState("today");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingStep, setBookingStep] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingData, setBookingData] = useState(null);
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

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated) {
      setView("login");
      return;
    }
  }, [isAuthenticated, setView]);

  useEffect(() => {
    console.log('DoctorBookingPage Debug - Component mounted');
    const doctorData = localStorage.getItem('selectedDoctor');
    const clinicData = localStorage.getItem('selectedClinic');
    
    if (doctorData && clinicData) {
      const parsedDoctor = JSON.parse(doctorData);
      const parsedClinic = JSON.parse(clinicData);
      setSelectedDoctor(parsedDoctor);
      setSelectedClinic(parsedClinic);
    }
  }, []);

  const handleGoBack = () => {
    if (user?.role === "admin") {
      setView("admin-dashboard");
    } else {
      setView("doctor-selection");
    }
  };

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
    const bookingInfo = {
      doctor: selectedDoctor,
      clinic: selectedClinic,
      date: selectedDate,
      time: selectedTime,
      patient: patientDetails,
      timestamp: new Date().toISOString()
    };
    
    setBookingData(bookingInfo);
    setShowPayment(true);
  };

  const timeSlots = selectedDoctor?.availability && typeof selectedDoctor.availability === 'object'
    ? (selectedDate === "today" ? (selectedDoctor.availability.today || []) : (selectedDoctor.availability.tomorrow || []))
    : [];

  // Show payment page if needed
  if (showPayment && bookingData) {
    return (
      <PaymentPage 
        bookingData={bookingData}
        setView={setView}
        onPaymentSuccess={() => {}}
        onPaymentError={() => {
          setShowPayment(false);
        }}
      />
    );
  }

  if (!selectedDoctor || !selectedClinic) {
    return (
      <div style={{ minHeight: "100vh", background: theme === 'white' ? colors.cream : colors.navy, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: colors.slate, fontSize: 16 }}>Loading booking information...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: theme === 'white' ? colors.cream : colors.navy, paddingTop: 80, paddingBottom: 40 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <BackButton
            onClick={handleGoBack}
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
              Complete your booking in 4 simple steps
            </p>
          </motion.div>
        </div>

        {/* Progress Steps */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 40, maxWidth: 800 }}>
          {[
            { step: 1, label: "Select Time" },
            { step: 2, label: "Patient Details" },
            { step: 3, label: "Confirm" },
            { step: 4, label: "Payment" }
          ].map((item) => (
            <div key={item.step} style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: bookingStep >= item.step ? colors.teal : "#374151",
                color: theme === 'white' ? '#ffffff' : colors.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 600
              }}>
                {bookingStep > item.step ? <CheckCircle size={16} /> : item.step}
              </div>
              <span style={{
                color: bookingStep >= item.step ? (theme === 'white' ? '#1a202c' : colors.white) : (theme === 'white' ? '#2d3748' : colors.slate),
                fontSize: 14,
                fontWeight: bookingStep >= item.step ? 600 : 400
              }}>
                {item.label}
              </span>
              {item.step < 4 && (
                <div style={{
                  flex: 1,
                  height: 2,
                  background: bookingStep > item.step ? colors.teal : "#374151",
                  marginLeft: 8
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Doctor & Clinic Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{
            background: colors.background || colors.navyLight,
            border: `1px solid ${colors.border}`,
            borderRadius: 16,
            padding: 24,
            marginBottom: 32
          }}>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <Avatar initials={selectedDoctor.image} color={selectedDoctor.color} size={60} />
              <div style={{ flex: 1 }}>
                <h3 style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
                  {selectedDoctor.name}
                </h3>
                <p style={{ color: colors.teal, fontSize: 14, marginBottom: 2 }}>
                  {selectedDoctor.specialty} • {selectedDoctor.experience}
                </p>
                <p style={{ color: colors.slate, fontSize: 13 }}>
                  {selectedClinic.name} • {selectedClinic.address}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: colors.gold, fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
                  {selectedDoctor.consultationFee}
                </div>
                <p style={{ color: colors.slate, fontSize: 12 }}>Consultation Fee</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Step 1: Time Selection */}
        {bookingStep === 1 && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div style={{
              background: colors.background || colors.navyLight,
              border: `1px solid ${colors.border}`,
              borderRadius: 16,
              padding: 24,
              marginBottom: 32
            }}>
              <h3 style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
                Select Appointment Time
              </h3>
              
              {/* Date Selection */}
              <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                <button
                  onClick={() => setSelectedDate("today")}
                  style={{
                    flex: 1,
                    background: selectedDate === "today" ? `${colors.teal}20` : colors.background || colors.navyLight,
                    border: selectedDate === "today" ? `1px solid ${colors.teal}` : `1px solid ${colors.border}`,
                    borderRadius: 12,
                    padding: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  <div style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
                    Today
                  </div>
                  <div style={{ color: colors.slate, fontSize: 12 }}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                </button>
                
                <button
                  onClick={() => setSelectedDate("tomorrow")}
                  style={{
                    flex: 1,
                    background: selectedDate === "tomorrow" ? `${colors.teal}20` : colors.background || colors.navyLight,
                    border: selectedDate === "tomorrow" ? `1px solid ${colors.teal}` : `1px solid ${colors.border}`,
                    borderRadius: 12,
                    padding: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  <div style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
                    Tomorrow
                  </div>
                  <div style={{ color: colors.slate, fontSize: 12 }}>
                    {new Date(Date.now() + 86400000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                </button>
              </div>

              {/* Time Slots */}
              <div>
                <h4 style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
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
                        background: selectedTime === time ? colors.teal : colors.background || colors.navyLight,
                        border: selectedTime === time ? `1px solid ${colors.teal}` : `1px solid ${colors.border}`,
                        borderRadius: 8,
                        padding: "12px",
                        cursor: "pointer",
                        color: theme === 'white' ? '#1a202c' : colors.white,
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
              background: colors.background || colors.navyLight,
              border: `1px solid ${colors.border}`,
              borderRadius: 16,
              padding: 24,
              marginBottom: 32
            }}>
              <h3 style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
                Patient Details
              </h3>
              
              <form onSubmit={handlePatientDetailsSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
                  <div>
                    <label style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 14, fontWeight: 600, marginBottom: 8, display: "block" }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={patientDetails.name}
                      onChange={(e) => setPatientDetails({...patientDetails, name: e.target.value})}
                      style={{
                        width: "100%",
                        background: colors.background || colors.navyLight,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 8,
                        padding: "12px",
                        color: theme === 'white' ? '#1a202c' : colors.white,
                        fontSize: 14,
                        outline: "none"
                      }}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 14, fontWeight: 600, marginBottom: 8, display: "block" }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={patientDetails.phone}
                      onChange={(e) => setPatientDetails({...patientDetails, phone: e.target.value})}
                      style={{
                        width: "100%",
                        background: colors.background || colors.navyLight,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 8,
                        padding: "12px",
                        color: theme === 'white' ? '#1a202c' : colors.white,
                        fontSize: 14,
                        outline: "none"
                      }}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  
                  <div>
                    <label style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 14, fontWeight: 600, marginBottom: 8, display: "block" }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={patientDetails.email}
                      onChange={(e) => setPatientDetails({...patientDetails, email: e.target.value})}
                      style={{
                        width: "100%",
                        background: colors.background || colors.navyLight,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 8,
                        padding: "12px",
                        color: theme === 'white' ? '#1a202c' : colors.white,
                        fontSize: 14,
                        outline: "none"
                      }}
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 14, fontWeight: 600, marginBottom: 8, display: "block" }}>
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
                        background: colors.background || colors.navyLight,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 8,
                        padding: "12px",
                        color: theme === 'white' ? '#1a202c' : colors.white,
                        fontSize: 14,
                        outline: "none"
                      }}
                      placeholder="25"
                    />
                  </div>
                  
                  <div>
                    <label style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 14, fontWeight: 600, marginBottom: 8, display: "block" }}>
                      Gender *
                    </label>
                    <select
                      required
                      value={patientDetails.gender}
                      onChange={(e) => setPatientDetails({...patientDetails, gender: e.target.value})}
                      style={{
                        width: "100%",
                        background: colors.background || colors.navyLight,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 8,
                        padding: "12px",
                        color: theme === 'white' ? '#1a202c' : colors.white,
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
                  <label style={{ color: theme === 'white' ? colors.slate : colors.white, fontSize: 14, fontWeight: 600, marginBottom: 8, display: "block" }}>
                    Reason for Visit
                  </label>
                  <textarea
                    value={patientDetails.reason}
                    onChange={(e) => setPatientDetails({...patientDetails, reason: e.target.value})}
                    style={{
                      width: "100%",
                      background: theme === 'white' ? colors.white : "#111827",
                      border: `1px solid ${colors.border}`,
                      borderRadius: 8,
                      padding: "12px",
                      color: theme === 'white' ? '#1a202c' : colors.white,
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
                      border: `1px solid ${colors.border}`,
                      borderRadius: 8,
                      padding: "12px 24px",
                      cursor: "pointer",
                      color: colors.slate,
                      fontSize: 14,
                      fontWeight: 600
                    }}
                  >
                    Back
                  </button>
                  
                  <button
                    type="submit"
                    style={{
                      background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
                      border: "none",
                      borderRadius: 8,
                      padding: "12px 24px",
                      cursor: "pointer",
                      color: colors.white,
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
              background: colors.background || colors.navyLight,
              border: `1px solid ${colors.border}`,
              borderRadius: 16,
              padding: 24,
              marginBottom: 32
            }}>
              <h3 style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
                Booking Confirmation
              </h3>
              
              {/* Appointment Summary */}
              <div style={{
                background: `${colors.teal}15`,
                border: `1px solid ${colors.teal}30`,
                borderRadius: 12,
                padding: 20,
                marginBottom: 24
              }}>
                <div style={{ display: "grid", gap: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: theme === 'white' ? '#4a5568' : colors.slate, fontSize: 14 }}>Date & Time</span>
                    <span style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 14, fontWeight: 600 }}>
                      {selectedDate === "today" ? "Today" : "Tomorrow"}, {selectedTime}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: theme === 'white' ? '#4a5568' : colors.slate, fontSize: 14 }}>Doctor</span>
                    <span style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 14, fontWeight: 600 }}>
                      {selectedDoctor.name}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: theme === 'white' ? '#4a5568' : colors.slate, fontSize: 14 }}>Clinic</span>
                    <span style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 14, fontWeight: 600 }}>
                      {selectedClinic.name}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: theme === 'white' ? '#4a5568' : colors.slate, fontSize: 14 }}>Consultation Fee</span>
                    <span style={{ color: colors.teal, fontSize: 14, fontWeight: 600 }}>
                      {selectedDoctor.consultationFee}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Patient Summary */}
              <div style={{
                background: colors.background || colors.navyLight,
                border: `1px solid ${colors.border}`,
                borderRadius: 12,
                padding: 20,
                marginBottom: 24
              }}>
                <h4 style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
                  Patient Information
                </h4>
                <div style={{ display: "grid", gap: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: theme === 'white' ? '#4a5568' : colors.slate, fontSize: 14 }}>Name</span>
                    <span style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 14 }}>
                      {patientDetails.name}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: theme === 'white' ? '#4a5568' : colors.slate, fontSize: 14 }}>Phone</span>
                    <span style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 14 }}>
                      {patientDetails.phone}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: theme === 'white' ? '#4a5568' : colors.slate, fontSize: 14 }}>Email</span>
                    <span style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 14 }}>
                      {patientDetails.email}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: theme === 'white' ? '#4a5568' : colors.slate, fontSize: 14 }}>Age & Gender</span>
                    <span style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 14 }}>
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
                background: `${colors.teal}15`,
                border: `1px solid ${colors.teal}30`,
                borderRadius: 8,
                marginBottom: 24
              }}>
                <CreditCard size={20} color={colors.teal} />
                <span style={{ color: colors.teal, fontSize: 14, fontWeight: 600 }}>
                  Secure payment required to complete booking
                </span>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button
                  onClick={() => setBookingStep(2)}
                  style={{
                    background: "none",
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: "12px 24px",
                    cursor: "pointer",
                    color: colors.slate,
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
                    background: bookingConfirmed ? colors.teal : `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
                    border: "none",
                    borderRadius: 8,
                    padding: "12px 24px",
                    cursor: bookingConfirmed ? "not-allowed" : "pointer",
                    color: colors.white,
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
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard size={16} />
                      Proceed to Payment
                    </>
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
