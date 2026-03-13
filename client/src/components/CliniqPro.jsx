import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Hero from "./sections/Hero";
import SearchSection from "./sections/SearchSection";
import ReviewsSection from "./sections/ReviewsSection";
import InquirySection from "./sections/InquirySection";
import DoctorsView from "./sections/DoctorsView";
import BookingModal from "./sections/BookingModal";
import PatientDashboard from "./dashboard/PatientDashboard";
import AdminDashboard from "./dashboard/AdminDashboard";
import SuperAdminDashboard from "./dashboard/SuperAdminDashboard";

export default function CliniqPro() {
  const [view, setView] = useState("home");
  const [userRole, setUserRole] = useState("guest");
  const [booking, setBooking] = useState(null);

  const handleBook = (doctor, slot) => setBooking({ doctor, slot });

  useEffect(() => {
    const link1 = document.createElement("link");
    link1.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;500;600;700&display=swap";
    link1.rel = "stylesheet";
    document.head.appendChild(link1);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#F8F5F0", minHeight: "100vh" }}>
      <Navbar view={view} setView={setView} userRole={userRole} setUserRole={setUserRole} />

      <AnimatePresence mode="wait">
        {view === "home" && (
          <div key="home">
            <Hero setView={setView} />
            <SearchSection setView={setView} />
            <ReviewsSection />
            <InquirySection />
            <Footer />
          </div>
        )}
        {view === "doctors" && (
          <div key="doctors">
            <DoctorsView onBook={handleBook} />
            <Footer />
          </div>
        )}
        {view === "clinics" && (
          <div key="clinics">
            <div style={{ minHeight: "100vh", background: "#F8F5F0", padding: "100px 32px 60px", textAlign: "center" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: "#0A1628" }}>Clinic Directory</h2>
              <p style={{ color: "#8892B0", marginTop: 10 }}>500+ clinics across India — coming soon in full view.</p>
            </div>
          </div>
        )}
        {view === "patient-dashboard" && (
          <div key="patient">
            <PatientDashboard setView={setView} />
          </div>
        )}
        {view === "admin-dashboard" && (
          <div key="admin">
            <AdminDashboard />
          </div>
        )}
        {view === "superadmin-dashboard" && (
          <div key="superadmin">
            <SuperAdminDashboard />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {booking && (
          <BookingModal doctor={booking.doctor} slot={booking.slot} onClose={() => setBooking(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
