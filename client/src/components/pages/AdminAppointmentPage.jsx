import { useState, useEffect } from "react";
import { Search, Calendar, Users, Clock, Plus, Edit, Trash2, Filter, ChevronRight } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import BackButton from "../common/BackButton";
import Avatar from "../common/Avatar";
import { fetchAppointments, updateAppointmentStatus, deleteAppointment } from "../../store/slices/adminSlice";

export default function AdminAppointmentPage({ setView }) {
  const { colors, theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector(state => state.admin);
  const { admin, token } = useSelector(state => state.auth);

  // Fetch appointments on mount
  useEffect(() => {
    if (admin?.clinic?.id && token) {
      dispatch(fetchAppointments({ 
        clinicId: admin.clinic.id, 
        token,
        status: selectedFilter === "all" ? "" : selectedFilter
      }));
    }
  }, [admin, token, dispatch, selectedFilter]);

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.doctorName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || apt.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed": return colors.teal;
      case "pending": return colors.gold;
      case "completed": return "#10B981";
      case "cancelled": return colors.red;
      default: return colors.slate;
    }
  };

  const handleAppointmentAction = (action, appointmentId) => {
    switch (action) {
      case "confirm":
        if (token) {
          dispatch(updateAppointmentStatus({ 
            appointmentId, 
            status: "confirmed", 
            token 
          }));
        }
        break;
      case "complete":
        if (token) {
          dispatch(updateAppointmentStatus({ 
            appointmentId, 
            status: "completed", 
            token 
          }));
        }
        break;
      case "cancel":
        if (window.confirm("Are you sure you want to cancel this appointment?")) {
          if (token) {
            dispatch(deleteAppointment({ appointmentId, token }));
          }
        }
        break;
      default:
        console.log(`Unknown action: ${action}`);
    }
  };

  const handleBookNewAppointment = () => {
    setView("admin-book-appointment");
  };

  return (
    <div style={{ minHeight: "100vh", background: colors.navy, paddingTop: 80, paddingBottom: 40 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <BackButton 
            onClick={() => setView("admin-dashboard")}
            text="Back to Dashboard"
            style={{ marginBottom: 24 }}
          />
          <div>
            <h1 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: "clamp(28px, 4vw, 36px)", 
              color: theme === 'white' ? '#1a202c' : colors.white, 
              marginBottom: 12 
            }}>
              Manage Appointments
            </h1>
            <p style={{ color: colors.slate, fontSize: 16 }}>
              Book and manage patient appointments
            </p>
          </div>
        </div>

        {error && (
          <div style={{ 
            background: '#fee', 
            border: '1px solid #fcc', 
            color: '#c33', 
            padding: '12px 16px', 
            borderRadius: 8, 
            marginBottom: 20 
          }}>
            {error}
          </div>
        )}

        {/* Action Bar */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: 20, 
          marginBottom: 32 
        }}>
          <button
            onClick={handleBookNewAppointment}
            style={{
              background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark || colors.teal})`,
              border: "none",
              borderRadius: 12,
              padding: "14px 20px",
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
            <Plus size={18} />
            Book New Appointment
          </button>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              background: colors.background || colors.navyLight,
              border: `1px solid ${colors.border}`,
              borderRadius: 12,
              padding: "12px 16px",
              color: theme === 'white' ? '#1a202c' : colors.white,
              fontSize: 14,
              outline: "none"
            }}
          />

          <div style={{ position: "relative" }}>
            <Search size={20} color={colors.slate} style={{ position: "absolute", left: 16, top: 14 }} />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                background: colors.background || colors.navyLight,
                border: `1px solid ${colors.border}`,
                borderRadius: 12,
                padding: "12px 16px 12px 46px",
                color: theme === 'white' ? '#1a202c' : colors.white,
                fontSize: 14,
                outline: "none"
              }}
            />
          </div>

          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            style={{
              background: colors.background || colors.navyLight,
              border: `1px solid ${colors.border}`,
              borderRadius: 12,
              padding: "12px 16px",
              color: theme === 'white' ? '#1a202c' : colors.white,
              fontSize: 14,
              cursor: "pointer",
              outline: "none"
            }}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Appointments Table */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", color: colors.slate }}>Loading appointments...</div>
        ) : filteredAppointments.length === 0 ? (
          <div style={{
            background: theme === 'white' ? colors.white : colors.navyLight,
            border: `1px solid ${colors.border}`,
            borderRadius: 12,
            padding: 40,
            textAlign: "center"
          }}>
            <p style={{ color: colors.slate, marginBottom: 16 }}>No appointments found</p>
            <p style={{ color: colors.slate, fontSize: 14 }}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div style={{
            background: theme === 'white' ? colors.white : colors.navyLight,
            border: `1px solid ${colors.border}`,
            borderRadius: 12,
            overflow: "hidden"
          }}>
            {filteredAppointments.map((apt, idx) => (
              <div key={apt.id} style={{
                padding: "16px",
                borderBottom: idx < filteredAppointments.length - 1 ? `1px solid ${colors.border}` : "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 20
              }}>
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <div style={{ color: theme === 'white' ? colors.slate : colors.white, fontWeight: 600, fontSize: 15 }}>
                    {apt.patientName}
                  </div>
                  <div style={{ color: colors.slate, fontSize: 13, marginTop: 4 }}>
                    Dr. {apt.doctorName} • {apt.specialization}
                  </div>
                  <div style={{ color: colors.slate, fontSize: 12, marginTop: 4 }}>
                    📅 {apt.appointment_date} at {apt.appointment_time}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ 
                    padding: "6px 12px", 
                    borderRadius: 20, 
                    fontSize: 12, 
                    fontWeight: 600,
                    background: `${getStatusColor(apt.status)}18`,
                    color: getStatusColor(apt.status),
                    textTransform: "capitalize"
                  }}>
                    {apt.status}
                  </div>

                  {apt.status === "pending" && (
                    <button
                      onClick={() => handleAppointmentAction("confirm", apt.id)}
                      style={{
                        background: colors.teal,
                        border: "none",
                        borderRadius: 8,
                        padding: "8px 14px",
                        cursor: "pointer",
                        color: "white",
                        fontSize: 12,
                        fontWeight: 600
                      }}
                    >
                      Confirm
                    </button>
                  )}

                  {apt.status === "confirmed" && (
                    <button
                      onClick={() => handleAppointmentAction("complete", apt.id)}
                      style={{
                        background: "#10B981",
                        border: "none",
                        borderRadius: 8,
                        padding: "8px 14px",
                        cursor: "pointer",
                        color: "white",
                        fontSize: 12,
                        fontWeight: 600
                      }}
                    >
                      Complete
                    </button>
                  )}

                  <button
                    onClick={() => handleAppointmentAction("cancel", apt.id)}
                    style={{
                      background: "none",
                      border: `1px solid ${colors.red}`,
                      borderRadius: 8,
                      padding: "8px 14px",
                      cursor: "pointer",
                      color: colors.red,
                      fontSize: 12,
                      fontWeight: 600
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
