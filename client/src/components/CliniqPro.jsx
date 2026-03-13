import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import AppointmentPage from "./pages/AppointmentPage";
import DoctorsPage from "./pages/DoctorsPage";
import ClinicPage from "./pages/ClinicPage";
import PatientDashboard from "./dashboard/PatientDashboard";
import AdminDashboard from "./dashboard/AdminDashboard";
import SuperAdminDashboard from "./dashboard/SuperAdminDashboard";
import SystemControls from "./admin/SystemControls";
import ClinicSelectionPage from "./pages/ClinicSelectionPage";
import DoctorSelectionPage from "./pages/DoctorSelectionPage";
import DoctorBookingPage from "./pages/DoctorBookingPage";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import Hero from "./sections/Hero";
import SearchSection from "./sections/SearchSection";
import ReviewsSection from "./sections/ReviewsSection";
import InquirySection from "./sections/InquirySection";
import ManagePatientsPage from "./pages/ManagePatientsPage";
import ViewReportsPage from "./pages/ViewReportsPage";
import ClinicSettingsPage from "./pages/ClinicSettingsPage";
import AdminAppointmentPage from "./pages/AdminAppointmentPage";
import AdminBookAppointmentPage from "./pages/AdminBookAppointmentPage";
import BookingModal from "./sections/BookingModal";

export default function CliniqPro() {
  const [view, setView] = useState("home");
  const [userRole, setUserRole] = useState("guest");
  const [booking, setBooking] = useState(null);

  const handleBook = (doctor, slot) => {
    console.log('CliniqPro Debug - handleBook called:', { doctor, slot });
    setBooking({ doctor, slot });
  };

  const wrappedSetView = (newView) => {
    console.log('CliniqPro Debug - View changing from', view, 'to', newView);
    setView(newView);
  };

  useEffect(() => {
    const link1 = document.createElement("link");
    link1.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;500;600;700&display=swap";
    link1.rel = "stylesheet";
    document.head.appendChild(link1);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#F8F5F0", minHeight: "100vh" }}>
      <Navbar view={view} setView={wrappedSetView} userRole={userRole} setUserRole={setUserRole} />

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
          {view === "clinic-selection" && (
            <div key="clinic-selection">
              <ClinicSelectionPage setView={setView} />
            </div>
          )}
          {view === "doctor-selection" && (
            <div key="doctor-selection">
              <DoctorSelectionPage setView={setView} />
            </div>
          )}
          {view === "doctor-booking" && (
            <div key="doctor-booking">
              <DoctorBookingPage setView={setView} />
            </div>
          )}
          {view === "booking-confirmation" && (
            <div key="booking-confirmation">
              <BookingConfirmationPage setView={setView} />
            </div>
          )}
          {view === "manage-patients" && (
            <div key="manage-patients">
              <ManagePatientsPage setView={setView} />
            </div>
          )}
          {view === "view-reports" && (
            <div key="view-reports">
              <ViewReportsPage setView={setView} />
            </div>
          )}
          {view === "clinic-settings" && (
            <div key="clinic-settings">
              <ClinicSettingsPage setView={setView} />
            </div>
          )}
          {view === "admin-appointment" && (
            <div key="admin-appointment">
              <AdminAppointmentPage setView={setView} />
            </div>
          )}
          {view === "admin-book-appointment" && (
            <div key="admin-book-appointment">
              <AdminBookAppointmentPage setView={setView} />
            </div>
          )}
        </ProtectedRoute>
      </AnimatePresence>

      <AnimatePresence>
        {booking && (
          <>
            {console.log('CliniqPro Debug - Rendering BookingModal:', { booking })}
            <BookingModal doctor={booking.doctor} slot={booking.slot} onClose={() => setBooking(null)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
