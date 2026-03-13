import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, Clock, Phone, Mail, MapPin, ArrowLeft, Download, Calendar as CalendarIcon, Share2 } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import BackButton from "../common/BackButton";
import Avatar from "../common/Avatar";

export default function BookingConfirmationPage({ setView }) {
  const { colors } = useTheme();
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    // Get booking details from localStorage
    const booking = localStorage.getItem('latestBooking');
    if (booking) {
      setBookingData(JSON.parse(booking));
    }
  }, []);

  const handleDownloadReceipt = () => {
    // Simulate download
    alert("Receipt downloaded successfully!");
  };

  const handleShareBooking = () => {
    // Simulate share
    if (navigator.share) {
      navigator.share({
        title: 'Appointment Booking Confirmation',
        text: `My appointment with ${bookingData.doctor.name} on ${bookingData.date} at ${bookingData.time}`,
        url: window.location.href
      });
    } else {
      alert("Booking details copied to clipboard!");
    }
  };

  const handleAddToCalendar = () => {
    // Simulate calendar event
    alert("Appointment added to your calendar!");
  };

  if (!bookingData) {
    return (
      <div style={{ minHeight: "100vh", background: colors.navy, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: colors.slate, fontSize: 16 }}>Loading booking confirmation...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: colors.navy, paddingTop: 80, paddingBottom: 40 }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 20px" }}>
        
        {/* Success Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: 40 }}
        >
          <div style={{
            width: 80,
            height: 80,
            background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px"
          }}>
            <CheckCircle size={40} color={colors.white} />
          </div>
          
          <h1 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: "clamp(28px, 4vw, 36px)", 
            color: colors.white, 
            marginBottom: 12 
          }}>
            Booking Confirmed!
          </h1>
          <p style={{ color: colors.slate, fontSize: 16, marginBottom: 8 }}>
            Your appointment has been successfully booked
          </p>
          <p style={{ color: colors.teal, fontSize: 14, fontWeight: 600 }}>
            Booking ID: {bookingData.bookingId}
          </p>
        </motion.div>

        {/* Booking Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: "#0f172a",
            border: `1px solid ${colors.border}`,
            borderRadius: 16,
            padding: 32,
            marginBottom: 32
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 24 }}>
            <div>
              <h2 style={{ color: colors.white, fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
                Appointment Details
              </h2>
              <p style={{ color: colors.slate, fontSize: 14 }}>
                Please save this information for your records
              </p>
            </div>
            <div style={{
              background: `${colors.teal}15`,
              border: `1px solid ${colors.teal}30`,
              borderRadius: 8,
              padding: "8px 16px"
            }}>
              <span style={{ color: colors.teal, fontSize: 12, fontWeight: 600 }}>
                CONFIRMED
              </span>
            </div>
          </div>

          {/* Doctor & Clinic Info */}
          <div style={{ display: "flex", gap: 20, marginBottom: 24 }}>
            <Avatar initials={bookingData.doctor.image} color={bookingData.doctor.color} size={60} />
            <div style={{ flex: 1 }}>
              <h3 style={{ color: colors.white, fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
                {bookingData.doctor.name}
              </h3>
              <p style={{ color: colors.teal, fontSize: 14, marginBottom: 2 }}>
                {bookingData.doctor.specialty}
              </p>
              <p style={{ color: colors.slate, fontSize: 13 }}>
                {bookingData.clinic.name}
              </p>
            </div>
          </div>

          {/* Appointment Info Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 20,
            marginBottom: 24
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 40,
                height: 40,
                background: `${colors.teal}15`,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Calendar size={20} color={colors.teal} />
              </div>
              <div>
                <p style={{ color: colors.slate, fontSize: 12, marginBottom: 2 }}>Date</p>
                <p style={{ color: colors.white, fontSize: 14, fontWeight: 600 }}>
                  {bookingData.date === "today" ? "Today" : "Tomorrow"}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 40,
                height: 40,
                background: `${colors.teal}15`,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Clock size={20} color={colors.teal} />
              </div>
              <div>
                <p style={{ color: colors.slate, fontSize: 12, marginBottom: 2 }}>Time</p>
                <p style={{ color: colors.white, fontSize: 14, fontWeight: 600 }}>
                  {bookingData.time}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 40,
                height: 40,
                background: `${colors.gold}15`,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <span style={{ color: colors.gold, fontSize: 16, fontWeight: 700 }}>₹</span>
              </div>
              <div>
                <p style={{ color: colors.slate, fontSize: 12, marginBottom: 2 }}>Consultation Fee</p>
                <p style={{ color: colors.white, fontSize: 14, fontWeight: 600 }}>
                  {bookingData.doctor.consultationFee}
                </p>
              </div>
            </div>
          </div>

          {/* Clinic Address */}
          <div style={{
            background: "#111827",
            border: `1px solid ${colors.border}`,
            borderRadius: 12,
            padding: 20,
            marginBottom: 24
          }}>
            <h4 style={{ color: colors.white, fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
              Clinic Location
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <MapPin size={16} color={colors.slate} />
                <span style={{ color: colors.white, fontSize: 14 }}>
                  {bookingData.clinic.address}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Phone size={16} color={colors.slate} />
                <span style={{ color: colors.white, fontSize: 14 }}>
                  {bookingData.clinic.phone}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Clock size={16} color={colors.slate} />
                <span style={{ color: colors.white, fontSize: 14 }}>
                  {bookingData.clinic.timings}
                </span>
              </div>
            </div>
          </div>

          {/* Patient Info */}
          <div style={{
            background: "#111827",
            border: `1px solid ${colors.border}`,
            borderRadius: 12,
            padding: 20,
            marginBottom: 24
          }}>
            <h4 style={{ color: colors.white, fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
              Patient Information
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
              <div>
                <p style={{ color: colors.slate, fontSize: 12, marginBottom: 2 }}>Name</p>
                <p style={{ color: colors.white, fontSize: 14, fontWeight: 600 }}>
                  {bookingData.patient.name}
                </p>
              </div>
              <div>
                <p style={{ color: colors.slate, fontSize: 12, marginBottom: 2 }}>Phone</p>
                <p style={{ color: colors.white, fontSize: 14, fontWeight: 600 }}>
                  {bookingData.patient.phone}
                </p>
              </div>
              <div>
                <p style={{ color: colors.slate, fontSize: 12, marginBottom: 2 }}>Email</p>
                <p style={{ color: colors.white, fontSize: 14, fontWeight: 600 }}>
                  {bookingData.patient.email}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownloadReceipt}
            style={{
              background: "none",
              border: `1px solid ${colors.border}`,
              borderRadius: 12,
              padding: "16px",
              cursor: "pointer",
              color: colors.white,
              fontSize: 14,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8
            }}
          >
            <Download size={18} />
            Download Receipt
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCalendar}
            style={{
              background: "none",
              border: `1px solid ${colors.border}`,
              borderRadius: 12,
              padding: "16px",
              cursor: "pointer",
              color: colors.white,
              fontSize: 14,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8
            }}
          >
            <CalendarIcon size={18} />
            Add to Calendar
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleShareBooking}
            style={{
              background: "none",
              border: `1px solid ${colors.border}`,
              borderRadius: 12,
              padding: "16px",
              cursor: "pointer",
              color: colors.white,
              fontSize: 14,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8
            }}
          >
            <Share2 size={18} />
            Share Details
          </motion.button>
        </motion.div>

        {/* Important Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{
            background: `${colors.teal}15`,
            border: `1px solid ${colors.teal}30`,
            borderRadius: 12,
            padding: 20,
            marginTop: 32
          }}
        >
          <h4 style={{ color: colors.teal, fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
            Important Information
          </h4>
          <ul style={{ color: colors.white, fontSize: 14, lineHeight: 1.6, margin: 0, paddingLeft: 20 }}>
            <li>Please arrive 15 minutes before your appointment time</li>
            <li>Bring a valid ID proof and any previous medical records</li>
            <li>Payment can be made at the clinic via cash, card, or UPI</li>
            <li>For any changes or cancellations, please call the clinic 24 hours in advance</li>
          </ul>
        </motion.div>

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{ textAlign: "center", marginTop: 32 }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setView("home")}
            style={{
              background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
              border: "none",
              borderRadius: 12,
              padding: "16px 32px",
              cursor: "pointer",
              color: colors.white,
              fontSize: 16,
              fontWeight: 600
            }}
          >
            Back to Home
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
