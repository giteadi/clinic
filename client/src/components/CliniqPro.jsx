import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
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

function CliniqProContent() {
  const { colors } = useTheme();
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
    <div className="theme-transition" style={{ fontFamily: "'DM Sans', sans-serif", background: colors.cream, minHeight: "100vh" }}>
      <Navbar view={view} setView={wrappedSetView} userRole={userRole} setUserRole={setUserRole} />

      <AnimatePresence mode="wait">
        <ProtectedRoute view={view} setView={wrappedSetView}>
          {view === "home" && (
            <div key="home">
              <Hero setView={wrappedSetView} />
              <SearchSection setView={wrappedSetView} />
              <ReviewsSection />
              <InquirySection />
              <Footer />
            </div>
          )}
          {view === "doctors" && (
            <div key="doctors">
              <DoctorsPage setView={wrappedSetView} />
            </div>
          )}
          {view === "login" && (
            <div key="login">
              <LoginPage setView={wrappedSetView} />
            </div>
          )}
          {view === "clinics" && (
            <div key="clinics">
              <ClinicPage setView={wrappedSetView} />
            </div>
          )}
          {view === "appointment" && (
            <div key="appointment">
              <AppointmentPage setView={wrappedSetView} />
            </div>
          )}
          {view === "patient-dashboard" && (
            <div key="patient">
              <PatientDashboard setView={wrappedSetView} />
            </div>
          )}
          {view === "admin-dashboard" && (
            <div key="admin">
              <AdminDashboard setView={wrappedSetView} />
            </div>
          )}
          {view === "superadmin-dashboard" && (
            <div key="superadmin">
              <SuperAdminDashboard setView={wrappedSetView} />
            </div>
          )}
          {view === "system-controls" && (
            <div key="system-controls">
              <SystemControls activeTab="clinics" setView={wrappedSetView} />
            </div>
          )}
          {view === "add-clinic" && (
            <div key="add-clinic">
              <SystemControls activeTab="clinics" setView={wrappedSetView} />
            </div>
          )}
          {view === "manage-users" && (
            <div key="manage-users">
              <SystemControls activeTab="users" setView={wrappedSetView} />
            </div>
          )}
          {view === "analytics" && (
            <div key="analytics">
              <SystemControls activeTab="analytics" setView={wrappedSetView} />
            </div>
          )}
          {view === "system-config" && (
            <div key="system-config">
              <SystemControls activeTab="config" setView={wrappedSetView} />
            </div>
          )}
          {view === "system-health" && (
            <div key="system-health">
              <SystemControls activeTab="health" setView={wrappedSetView} />
            </div>
          )}
          {view === "broadcast" && (
            <div key="broadcast">
              <SystemControls activeTab="broadcast" setView={wrappedSetView} />
            </div>
          )}
          {view === "clinic-selection" && (
            <div key="clinic-selection">
              <ClinicSelectionPage setView={wrappedSetView} />
            </div>
          )}
          {view === "doctor-selection" && (
            <div key="doctor-selection">
              <DoctorSelectionPage setView={wrappedSetView} />
            </div>
          )}
          {view === "doctor-booking" && (
            <div key="doctor-booking">
              <DoctorBookingPage setView={wrappedSetView} />
            </div>
          )}
          {view === "booking-confirmation" && (
            <div key="booking-confirmation">
              <BookingConfirmationPage setView={wrappedSetView} />
            </div>
          )}
          {view === "manage-patients" && (
            <div key="manage-patients">
              <ManagePatientsPage setView={wrappedSetView} />
            </div>
          )}
          {view === "view-reports" && (
            <div key="view-reports">
              <ViewReportsPage setView={wrappedSetView} />
            </div>
          )}
          {view === "clinic-settings" && (
            <div key="clinic-settings">
              <ClinicSettingsPage setView={wrappedSetView} />
            </div>
          )}
          {view === "admin-appointment" && (
            <div key="admin-appointment">
              <AdminAppointmentPage setView={wrappedSetView} />
            </div>
          )}
          {view === "admin-book-appointment" && (
            <div key="admin-book-appointment">
              <AdminBookAppointmentPage setView={wrappedSetView} />
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

export default function CliniqPro() {
  return (
    <ThemeProvider>
      <CliniqProContent />
    </ThemeProvider>
  );
}
