import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, Users, Clock, Plus, Edit, Trash2, Filter, ChevronRight } from "lucide-react";
import { COLORS } from "../../constants/colors";
import BackButton from "../common/BackButton";
import Avatar from "../common/Avatar";

export default function AdminAppointmentPage({ setView }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "Rahul Sharma",
      patientEmail: "rahul.sharma@email.com",
      patientPhone: "+91 98765 43210",
      doctorName: "Dr. Ayesha Khan",
      specialty: "Cardiology",
      date: "2024-12-20",
      time: "10:00 AM",
      status: "confirmed",
      reason: "Regular checkup",
      duration: "30 min",
      type: "consultation"
    },
    {
      id: 2,
      patientName: "Priya Patel",
      patientEmail: "priya.patel@email.com",
      patientPhone: "+91 98765 43211",
      doctorName: "Dr. Rahul Mehta",
      specialty: "General",
      date: "2024-12-20",
      time: "11:30 AM",
      status: "pending",
      reason: "Follow-up consultation",
      duration: "45 min",
      type: "followup"
    },
    {
      id: 3,
      patientName: "Amit Kumar",
      patientEmail: "amit.kumar@email.com",
      patientPhone: "+91 98765 43212",
      doctorName: "Dr. Priya Sharma",
      specialty: "Pediatrics",
      date: "2024-12-19",
      time: "2:00 PM",
      status: "completed",
      reason: "Vaccination",
      duration: "15 min",
      type: "vaccination"
    },
    {
      id: 4,
      patientName: "Sneha Reddy",
      patientEmail: "sneha.reddy@email.com",
      patientPhone: "+91 98765 43213",
      doctorName: "Dr. Arjun Patel",
      specialty: "Orthopedics",
      date: "2024-12-21",
      time: "3:30 PM",
      status: "cancelled",
      reason: "X-Ray consultation",
      duration: "20 min",
      type: "diagnostic"
    }
  ]);

  const doctors = [
    { id: 1, name: "Dr. Ayesha Khan", specialty: "Cardiology" },
    { id: 2, name: "Dr. Rahul Mehta", specialty: "General" },
    { id: 3, name: "Dr. Priya Sharma", specialty: "Pediatrics" },
    { id: 4, name: "Dr. Arjun Patel", specialty: "Orthopedics" }
  ];

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || apt.status === selectedFilter;
    const matchesDate = apt.date === selectedDate;
    return matchesSearch && matchesFilter && (selectedDate === "" || matchesDate);
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed": return COLORS.teal;
      case "pending": return COLORS.gold;
      case "completed": return "#10B981";
      case "cancelled": return COLORS.red;
      default: return COLORS.slate;
    }
  };

  const handleAppointmentAction = (action, appointmentId) => {
    switch (action) {
      case "view":
        // TODO: Navigate to appointment details
        alert(`Viewing appointment ${appointmentId}`);
        break;
      case "edit":
        // TODO: Navigate to edit appointment form
        alert(`Editing appointment ${appointmentId}`);
        break;
      case "delete":
        if (window.confirm("Are you sure you want to delete this appointment?")) {
          setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
          alert(`Deleted appointment ${appointmentId}`);
        }
        break;
      default:
        console.log(`Unknown action: ${action} for appointment ${appointmentId}`);
    }
  };

  const handleBookNewAppointment = () => {
    // Navigate to admin booking page (shows only admin's clinic doctors)
    setView("admin-book-appointment");
  };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.navy, paddingTop: 80, paddingBottom: 40 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <BackButton 
            onClick={() => setView("admin-dashboard")}
            text="Back to Dashboard"
            style={{ marginBottom: 24 }}
          />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: "clamp(28px, 4vw, 36px)", 
              color: COLORS.white, 
              marginBottom: 12 
            }}>
              Manage Appointments
            </h1>
            <p style={{ color: COLORS.slate, fontSize: 16 }}>
              Book and manage patient appointments
            </p>
          </motion.div>
        </div>

        {/* Action Bar */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: 20, 
          marginBottom: 32 
        }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBookNewAppointment}
            style={{
              background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
              border: "none",
              borderRadius: 12,
              padding: "14px 20px",
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
            <Plus size={18} />
            Book New Appointment
          </motion.button>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              background: "#0f172a",
              border: `1px solid ${COLORS.border}`,
              borderRadius: 12,
              padding: "12px 16px",
              color: COLORS.white,
              fontSize: 14,
              outline: "none"
            }}
          />

          <div style={{ position: "relative" }}>
            <Search size={20} color={COLORS.slate} style={{ position: "absolute", left: 16, top: 14 }} />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                background: "#0f172a",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 12,
                padding: "12px 16px 12px 48px",
                color: COLORS.white,
                fontSize: 14,
                outline: "none"
              }}
            />
          </div>
          
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            style={{
              background: "#0f172a",
              border: `1px solid ${COLORS.border}`,
              borderRadius: 12,
              padding: "12px 16px",
              color: COLORS.white,
              fontSize: 14,
              cursor: "pointer",
              outline: "none"
            }}
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Results Count */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ color: COLORS.slate, fontSize: 14 }}>
            Found {filteredAppointments.length} appointments
          </p>
        </div>

        {/* Appointments List */}
        <div style={{ display: "grid", gap: 20 }}>
          {filteredAppointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                background: "#0f172a",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 16,
                padding: 24,
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
                e.target.style.borderColor = COLORS.teal;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
                e.target.style.borderColor = COLORS.border;
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 24, alignItems: "start" }}>
                
                {/* Date & Time */}
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: 12,
                    background: `${COLORS.teal}18`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 8
                  }}>
                    <Calendar size={24} color={COLORS.teal} />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ color: COLORS.white, fontSize: 12, fontWeight: 600 }}>
                      {new Date(appointment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div style={{ color: COLORS.slate, fontSize: 11 }}>
                      {appointment.time}
                    </div>
                  </div>
                </div>

                {/* Appointment Details */}
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: 12 }}>
                    <h3 style={{ color: COLORS.white, fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
                      {appointment.reason}
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, color: COLORS.slate, fontSize: 12 }}>
                      <span>{appointment.doctorName}</span>
                      <span>•</span>
                      <span>{appointment.specialty}</span>
                      <span>•</span>
                      <span>{appointment.duration}</span>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
                    <div>
                      <p style={{ color: COLORS.slate, fontSize: 11, marginBottom: 2 }}>Patient</p>
                      <p style={{ color: COLORS.white, fontSize: 13, fontWeight: 600 }}>
                        {appointment.patientName}
                      </p>
                    </div>
                    <div>
                      <p style={{ color: COLORS.slate, fontSize: 11, marginBottom: 2 }}>Contact</p>
                      <p style={{ color: COLORS.white, fontSize: 12 }}>
                        {appointment.patientPhone}
                      </p>
                    </div>
                    <div>
                      <p style={{ color: COLORS.slate, fontSize: 11, marginBottom: 2 }}>Type</p>
                      <p style={{ color: COLORS.white, fontSize: 13, fontWeight: 600 }}>
                        {appointment.type}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status and Actions */}
                <div style={{ textAlign: "right" }}>
                  <div style={{
                    padding: "6px 12px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 600,
                    background: `${getStatusColor(appointment.status)}18`,
                    color: getStatusColor(appointment.status),
                    marginBottom: 16,
                    textTransform: "capitalize"
                  }}>
                    {appointment.status}
                  </div>
                  
                  <div style={{ display: "flex", gap: 8 }}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAppointmentAction("view", appointment.id)}
                      style={{
                        background: `${COLORS.teal}15`,
                        border: `1px solid ${COLORS.teal}30`,
                        borderRadius: 8,
                        padding: "8px",
                        cursor: "pointer",
                        color: COLORS.teal
                      }}
                    >
                      <ChevronRight size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAppointmentAction("edit", appointment.id)}
                      style={{
                        background: `${COLORS.gold}15`,
                        border: `1px solid ${COLORS.gold}30`,
                        borderRadius: 8,
                        padding: "8px",
                        cursor: "pointer",
                        color: COLORS.gold
                      }}
                    >
                      <Edit size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAppointmentAction("delete", appointment.id)}
                      style={{
                        background: `${COLORS.red}15`,
                        border: `1px solid ${COLORS.red}30`,
                        borderRadius: 8,
                        padding: "8px",
                        cursor: "pointer",
                        color: COLORS.red
                      }}
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredAppointments.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            background: "#0f172a",
            border: `1px solid ${COLORS.border}`,
            borderRadius: 16
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📅</div>
            <h3 style={{ color: COLORS.white, fontSize: 20, marginBottom: 8 }}>
              No appointments found
            </h3>
            <p style={{ color: COLORS.slate, fontSize: 14 }}>
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
