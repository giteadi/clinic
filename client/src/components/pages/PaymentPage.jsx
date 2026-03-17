import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, ArrowLeft, Loader, CheckCircle, AlertCircle } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import BackButton from "../common/BackButton";
import paymentService from "../../services/paymentService";

export default function PaymentPage({ bookingData, setView, onPaymentSuccess, onPaymentError }) {
  const { colors, theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    orderId: null,
    signatureVerified: false
  });

  const consultationFee = bookingData?.doctor?.consultationFee 
    ? parseFloat(bookingData.doctor.consultationFee.replace(/[^0-9]/g, ''))
    : 500;

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      // Create order on backend
      const orderResponse = await paymentService.createOrder(
        consultationFee,
        {
          doctorId: bookingData.doctor.id,
          clinicId: bookingData.clinic.id,
          date: bookingData.date,
          time: bookingData.time,
          patientDetails: bookingData.patient
        }
      );

      setPaymentDetails({ orderId: orderResponse.orderId });

      // Open Razorpay modal
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_1DP5mmOlF5G5ag',
        amount: Math.round(consultationFee * 100),
        currency: 'INR',
        name: bookingData.clinic.name,
        description: `Appointment with ${bookingData.doctor.name}`,
        order_id: orderResponse.orderId,
        prefill: {
          name: bookingData.patient.name,
          email: bookingData.patient.email,
          contact: bookingData.patient.phone
        },
        theme: {
          color: colors.teal || '#16a34a'
        },
        handler: async (response) => {
          try {
            // Verify payment on backend
            const verifyResponse = await paymentService.verifyPayment({
              orderId: orderResponse.orderId,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              appointmentData: {
                doctorId: bookingData.doctor.id,
                clinicId: bookingData.clinic.id,
                date: bookingData.date,
                time: bookingData.time,
                patientDetails: bookingData.patient
              }
            });

            setPaymentStatus('success');
            setPaymentDetails({
              ...paymentDetails,
              signatureVerified: true,
              paymentId: response.razorpay_payment_id,
              appointmentId: verifyResponse.appointmentId
            });

            // Store booking confirmation
            const bookingConfirmation = {
              ...bookingData,
              bookingId: verifyResponse.appointmentId,
              paymentId: response.razorpay_payment_id,
              orderId: orderResponse.orderId,
              status: 'confirmed',
              timestamp: new Date().toISOString()
            };

            localStorage.setItem('latestBooking', JSON.stringify(bookingConfirmation));

            // Call success callback
            onPaymentSuccess?.(bookingConfirmation);

            // Redirect after 2 seconds
            setTimeout(() => {
              setView("booking-confirmation");
            }, 2000);
          } catch (error) {
            console.error('Payment verification failed:', error);
            setError(error.message || 'Payment verification failed');
            setPaymentStatus('failed');
            onPaymentError?.(error);
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setError('Payment cancelled by user');
          }
        }
      };

      await paymentService.openPaymentModal(options);
    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message || 'Payment failed. Please try again.');
      setPaymentStatus('failed');
      onPaymentError?.(error);
      setLoading(false);
    }
  };

  if (paymentStatus === 'success') {
    return (
      <div style={{ minHeight: "100vh", background: theme === 'white' ? colors.cream : colors.navy, display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 80 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", maxWidth: 400 }}
        >
          <div style={{
            width: 80,
            height: 80,
            background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px"
          }}>
            <CheckCircle size={40} color={colors.white} />
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 28,
            color: theme === 'white' ? '#1a202c' : colors.white,
            marginBottom: 12
          }}>
            Payment Successful!
          </h2>
          <p style={{ color: colors.slate, fontSize: 14, marginBottom: 24 }}>
            Your appointment has been confirmed and payment received
          </p>
          <p style={{ color: colors.teal, fontSize: 12, fontWeight: 600 }}>
            Redirecting to confirmation...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: theme === 'white' ? colors.cream : colors.navy, paddingTop: 100, paddingBottom: 40 }}>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 20px" }}>
        <BackButton 
          onClick={() => setView("doctor-booking")}
          text="Back to Booking"
          style={{ marginBottom: 32 }}
        />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(24px, 4vw, 32px)",
            color: theme === 'white' ? '#1a202c' : colors.white,
            marginBottom: 8
          }}>
            Complete Payment
          </h1>
          <p style={{ color: colors.slate, fontSize: 14, marginBottom: 32 }}>
            Secure payment to confirm your appointment
          </p>
        </motion.div>

        {/* Booking Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: colors.background || colors.navyLight,
            border: `1px solid ${colors.border}`,
            borderRadius: 12,
            padding: 20,
            marginBottom: 32
          }}
        >
          <div style={{ marginBottom: 16 }}>
            <p style={{ color: colors.slate, fontSize: 12, marginBottom: 4 }}>Doctor</p>
            <p style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 16, fontWeight: 600 }}>
              {bookingData?.doctor?.name}
            </p>
          </div>

          <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: 16 }}>
            <p style={{ color: colors.slate, fontSize: 12, marginBottom: 4 }}>Appointment Details</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <p style={{ color: colors.slate, fontSize: 11 }}>Date</p>
                <p style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 14, fontWeight: 600 }}>
                  {bookingData?.date}
                </p>
              </div>
              <div>
                <p style={{ color: colors.slate, fontSize: 11 }}>Time</p>
                <p style={{ color: theme === 'white' ? '#1a202c' : colors.white, fontSize: 14, fontWeight: 600 }}>
                  {bookingData?.time}
                </p>
              </div>
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: 16, marginTop: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ color: colors.slate, fontSize: 14, fontWeight: 600 }}>Consultation Fee</p>
              <p style={{ color: colors.gold, fontSize: 20, fontWeight: 700 }}>
                ₹{consultationFee}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: `${colors.danger}15`,
              border: `1px solid ${colors.danger}`,
              borderRadius: 8,
              padding: 12,
              marginBottom: 24,
              display: "flex",
              gap: 12
            }}
          >
            <AlertCircle size={20} color={colors.danger} style={{ flexShrink: 0 }} />
            <p style={{ color: colors.danger, fontSize: 13 }}>{error}</p>
          </motion.div>
        )}

        {/* Payment Terms */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: colors.background || colors.navyLight,
            border: `1px solid ${colors.border}`,
            borderRadius: 12,
            padding: 16,
            marginBottom: 24
          }}
        >
          <p style={{ color: colors.slate, fontSize: 12, lineHeight: 1.6 }}>
            By proceeding with payment, you agree to our terms and conditions. Your appointment will be confirmed immediately after successful payment.
          </p>
        </motion.div>

        {/* Payment Button */}
        <motion.button
          onClick={handlePayment}
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: "100%",
            padding: "14px 24px",
            background: loading ? colors.slate : colors.teal,
            color: colors.white,
            border: "none",
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            opacity: loading ? 0.7 : 1,
            transition: "all 0.3s ease"
          }}
        >
          {loading && <Loader size={18} style={{ animation: "spin 1s linear infinite" }} />}
          {loading ? "Processing Payment..." : (
            <>
              <CreditCard size={18} />
              Pay ₹{consultationFee}
            </>
          )}
        </motion.button>

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}
