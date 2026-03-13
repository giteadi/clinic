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
import AppointmentPage from "./pages/AppointmentPage";
import DoctorsPage from "./pages/DoctorsPage";
import ClinicPage from "./pages/ClinicPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import SystemControls from "./admin/SystemControls";

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
        <ProtectedRoute view={view} setView={setView}>
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
              <DoctorsPage setView={setView} />
            </div>
          )}
          {view === "login" && (
            <div key="login">
              <LoginPage setView={setView} />
            </div>
          )}
          {view === "clinics" && (
            <div key="clinics">
              <ClinicPage setView={setView} />
            </div>
          )}
          {view === "appointment" && (
            <div key="appointment">
              <AppointmentPage setView={setView} />
            </div>
          )}
          {view === "patient-dashboard" && (
            <div key="patient">
              <PatientDashboard setView={setView} />
            </div>
          )}
          {view === "admin-dashboard" && (
            <div key="admin">
              <AdminDashboard setView={setView} />
            </div>
          )}
          {view === "superadmin-dashboard" && (
            <div key="superadmin">
              <SuperAdminDashboard setView={setView} />
            </div>
          )}
          {view === "system-controls" && (
            <div key="system-controls">
              <SystemControls activeTab="clinics" setView={setView} />
            </div>
          )}
          {view === "add-clinic" && (
            <div key="add-clinic">
              <SystemControls activeTab="clinics" setView={setView} />
            </div>
          )}
          {view === "manage-users" && (
            <div key="manage-users">
              <SystemControls activeTab="users" setView={setView} />
            </div>
          )}
          {view === "analytics" && (
            <div key="analytics">
              <SystemControls activeTab="analytics" setView={setView} />
            </div>
          )}
          {view === "system-config" && (
            <div key="system-config">
              <SystemControls activeTab="config" setView={setView} />
            </div>
          )}
          {view === "system-health" && (
            <div key="system-health">
              <SystemControls activeTab="health" setView={setView} />
            </div>
          )}
          {view === "broadcast" && (
            <div key="broadcast">
              <SystemControls activeTab="broadcast" setView={setView} />
            </div>
          )}
        </ProtectedRoute>
      </AnimatePresence>

      <AnimatePresence>
        {booking && (
          <BookingModal doctor={booking.doctor} slot={booking.slot} onClose={() => setBooking(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
