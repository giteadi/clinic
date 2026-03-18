import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, FileText, Bell, User, ChevronRight, Heart, Activity, Shield } from "lucide-react";
import { useSelector } from "react-redux";
import { useTheme } from "../../contexts/ThemeContext";
import { DOCTORS } from "../../constants/data";
import Avatar from "../common/Avatar";
import BackButton from "../common/BackButton";

export default function PatientDashboard({ setView }) {
  const { colors, theme } = useTheme();
  const [activeTab, setActiveTab] = useState("upcoming");
  const { user } = useSelector(state => state.auth);

  const appointments = [
    { id: 1, doctor: DOCTORS[0], date: "Today", time: "10:00 AM", status: "confirmed", reason: "Regular checkup" },
    { id: 2, doctor: DOCTORS[1], date: "Tomorrow", time: "2:30 PM", status: "confirmed", reason: "Skin consultation" },
    { id: 3, doctor: DOCTORS[2], date: "Dec 28", time: "11:00 AM", status: "pending", reason: "Vaccination" },
  ];

  const medicalRecords = [
    { id: 1, type: "Blood Test", date: "Dec 15, 2024", doctor: "Dr. Ayesha Khan" },
    { id: 2, type: "X-Ray", date: "Dec 10, 2024", doctor: "Dr. Rahul Mehta" },
    { id: 3, type: "ECG", date: "Nov 28, 2024", doctor: "Dr. Priya Sharma" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: colors.navy, paddingTop: 80 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 20px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <BackButton 
                onClick={() => setView && setView("home")}
                text="Back to Home"
              />
              <div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: theme === "white" ? colors.slate : colors.white, marginBottom: 8, fontWeight: 700 }}>
                  Patient Dashboard
                </h1>
                <p style={{ color: colors.slate, fontSize: 16 }}>Manage your appointments and medical records</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button style={{
                background: `${colors.teal}18`, border: `1px solid ${colors.border}`,
                borderRadius: 10, padding: "8px 16px", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8,
                color: colors.teal, fontSize: 14, fontWeight: 600
              }}>
                <Bell size={16} /> Notifications
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar initials="PA" color={colors.teal} size={40} />
                <div>
                  <div style={{ color: theme === "white" ? colors.slate : colors.white, fontWeight: 600, fontSize: 15 }}>Patient Account</div>
                  <div style={{ color: colors.slate, fontSize: 12 }}>patient@example.com</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
            gap: 20, marginBottom: 32 
          }}>
            {[
              { icon: Calendar, label: "Upcoming", value: "3", color: colors.teal },
              { icon: FileText, label: "Medical Records", value: "12", color: colors.gold },
              { icon: Heart, label: "Treatments", value: "8", color: "#E91E63" },
              { icon: Activity, label: "Lab Tests", value: "5", color: "#9C27B0" },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                style={{
                  background: theme === "white" ? colors.white : colors.navyLight, 
                  borderRadius: 16, 
                  padding: 24,
                  border: `1px solid ${colors.border}`, 
                  display: "flex", 
                  alignItems: "center", 
                  gap: 16
                }}>
                <div style={{ 
                  width: 48, height: 48, borderRadius: 12, 
                  background: `${stat.color}18`, 
                  display: "flex", alignItems: "center", justifyContent: "center" 
                }}>
                  <stat.icon size={24} color={stat.color} />
                </div>
                <div>
                  <div style={{ color: theme === "white" ? colors.slate : colors.white, fontWeight: 700, fontSize: 24 }}>{stat.value}</div>
                  <div style={{ color: colors.slate, fontSize: 13 }}>{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ 
            background: theme === "white" ? colors.white : colors.navyLight, 
            borderRadius: 16, 
            border: `1px solid ${colors.border}`, 
            overflow: "hidden" 
          }}>
            <div style={{ 
              display: "flex", borderBottom: `1px solid ${colors.border}` 
            }}>
              {["upcoming", "past", "medical"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  style={{
                    flex: 1, padding: "16px", border: "none", background: "none",
                    cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
                    color: activeTab === tab ? colors.teal : colors.slate,
                    borderBottom: activeTab === tab ? `2px solid ${colors.teal}` : "2px solid transparent",
                    fontSize: 14
                  }}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div style={{ padding: 24 }}>
              {activeTab === "upcoming" && (
                <div style={{ display: "grid", gap: 16 }}>
                  {appointments.map(apt => (
                    <motion.div key={apt.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                      style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: 20, background: theme === "white" ? colors.cream : colors.navy, borderRadius: 12
                      }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <Avatar initials={apt.doctor.img} color={apt.doctor.color} size={48} />
                        <div>
                          <div style={{ color: theme === "white" ? colors.slate : colors.white, fontWeight: 600, fontSize: 15 }}>{apt.doctor.name}</div>
                          <div style={{ color: colors.slate, fontSize: 13 }}>{apt.reason}</div>
                          <div style={{ 
                            display: "flex", alignItems: "center", gap: 8, marginTop: 4 
                          }}>
                            <Calendar size={14} color={colors.teal} />
                            <span style={{ color: colors.teal, fontSize: 12 }}>{apt.date}</span>
                            <Clock size={14} color={colors.slate} />
                            <span style={{ color: colors.slate, fontSize: 12 }}>{apt.time}</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ 
                          padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                          background: apt.status === "confirmed" ? `${colors.teal}18` : `${colors.gold}18`,
                          color: apt.status === "confirmed" ? colors.teal : colors.gold
                        }}>
                          {apt.status}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === "medical" && (
                <div style={{ display: "grid", gap: 12 }}>
                  {medicalRecords.map(record => (
                    <motion.div key={record.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: 16, background: COLORS.cream, borderRadius: 12,
                        cursor: "pointer", transition: "all 0.2s"
                      }}
                      whileHover={{ scale: 1.02 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ 
                          width: 40, height: 40, borderRadius: 10, 
                          background: `${colors.teal}18`, 
                          display: "flex", alignItems: "center", justifyContent: "center" 
                        }}>
                          <FileText size={20} color={colors.teal} />
                        </div>
                        <div>
                          <div style={{ color: theme === "white" ? colors.slate : colors.white, fontWeight: 600, fontSize: 14 }}>{record.type}</div>
                          <div style={{ color: colors.slate, fontSize: 12 }}>{record.doctor}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ color: theme === "white" ? colors.slate : colors.white, fontWeight: 600, fontSize: 13 }}>{record.date}</div>
                        <ChevronRight size={16} color={colors.slate} style={{ marginTop: 4 }} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div style={{ marginTop: 32, textAlign: "center" }}>
            <button onClick={() => {
              // Check if patient has a linked clinic
              if (user?.linkedClinic) {
                // Set the linked clinic and go directly to doctor selection
                localStorage.setItem('selectedClinic', JSON.stringify(user.linkedClinic));
                setView("doctor-selection");
              } else {
                // For patients without linked clinic, show clinic selection
                setView("clinic-selection");
              }
            }}
              style={{
                background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
                border: "none", borderRadius: 12, padding: "14px 28px",
                color: COLORS.white, fontWeight: 600, fontSize: 16, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", display: "inline-flex", alignItems: "center", gap: 8
              }}>
              Book New Appointment
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
