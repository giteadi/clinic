import { useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { Users, Calendar, TrendingUp, DollarSign, Activity, Bell, Settings, ChevronRight, BarChart3 } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import Avatar from "../common/Avatar";
import BackButton from "../common/BackButton";

export default function AdminDashboard({ setView }) {
  const { colors, theme } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");
  const dispatch = useDispatch();
  const { actions: quickActions } = useSelector(state => state.quickActions);

  // Icon mapping
  const iconMap = {
    Calendar: Calendar,
    Users: Users,
    Activity: Activity,
    Settings: Settings
  };

  // Handle quick action click
  const handleQuickAction = (action) => {
    if (!action.enabled) return;
    
    // Navigate based on action route
    switch (action.route) {
      case "schedule-appointment":
        setView("admin-appointment");
        break;
      case "manage-patients":
        setView("manage-patients");
        break;
      case "view-reports":
        setView("view-reports");
        break;
      case "clinic-settings":
        setView("clinic-settings");
        break;
      default:
        console.log("Unknown action route:", action.route);
    }
  };

  const stats = [
    { icon: Users, label: "Total Patients", value: "2,456", change: "+12%", trend: "up" },
    { icon: Calendar, label: "Appointments", value: "142", change: "+8%", trend: "up" },
    { icon: DollarSign, label: "Revenue", value: "₹2.4L", change: "+15%", trend: "up" },
    { icon: Activity, label: "Active Doctors", value: "28", change: "+2", trend: "up" },
  ];

  const recentAppointments = [
    { id: 1, patient: "Rahul Sharma", doctor: "Dr. Ayesha Khan", time: "10:00 AM", status: "confirmed" },
    { id: 2, patient: "Priya Patel", doctor: "Dr. Rahul Mehta", time: "11:30 AM", status: "confirmed" },
    { id: 3, patient: "Amit Kumar", doctor: "Dr. Priya Sharma", time: "2:00 PM", status: "pending" },
    { id: 4, patient: "Sneha Reddy", doctor: "Dr. Arjun Patel", time: "3:30 PM", status: "confirmed" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: colors.cream, paddingTop: 80 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 20px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <BackButton 
                onClick={() => setView && setView("home")}
                text="Back to Home"
              />
              <div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: colors.slate, marginBottom: 8, fontWeight: 700 }}>
                  Admin Dashboard
                </h1>
                <p style={{ color: colors.slate, fontSize: 16 }}>Manage clinic operations and staff</p>
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
              <button style={{
                background: `${colors.gold}18`, border: `1px solid ${colors.border}`,
                borderRadius: 10, padding: "8px 16px", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8,
                color: colors.gold, fontSize: 14, fontWeight: 600
              }}>
                <Settings size={16} /> Settings
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar initials="AD" color={colors.teal} size={40} />
                <div>
                  <div style={{ color: colors.slate, fontWeight: 600, fontSize: 15 }}>Admin User</div>
                  <div style={{ color: colors.slate, fontSize: 12 }}>admin@clinic.com</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", 
            gap: 20, marginBottom: 32 
          }}>
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                style={{
                  background: colors.white, borderRadius: 16, padding: 24,
                  border: `1px solid ${colors.border}`, position: "relative", overflow: "hidden"
                }}>
                <div style={{ 
                  position: "absolute", top: 0, right: 0, 
                  width: 60, height: 60, 
                  background: `linear-gradient(135deg, ${colors.teal}08, transparent)`,
                  borderRadius: "0 16px 0 60px"
                }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 16 }}>
                  <div style={{ 
                    width: 48, height: 48, borderRadius: 12, 
                    background: `${colors.teal}18`, 
                    display: "flex", alignItems: "center", justifyContent: "center" 
                  }}>
                    <stat.icon size={24} color={colors.teal} />
                  </div>
                  <div style={{
                    padding: "4px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                    background: stat.trend === "up" ? `${colors.teal}18` : `${colors.gold}18`,
                    color: stat.trend === "up" ? colors.teal : colors.gold
                  }}>
                    {stat.change}
                  </div>
                </div>
                <div style={{ color: theme === 'white' ? '#1a202c' : colors.slate, fontWeight: 700, fontSize: 28, marginBottom: 4 }}>{stat.value}</div>
                <div style={{ color: theme === 'white' ? '#4a5568' : colors.slate, fontSize: 14 }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Main Content */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", 
            gap: 24 
          }}>
            <div style={{ 
              background: colors.white, borderRadius: 16, 
              border: `1px solid ${colors.border}`, overflow: "hidden" 
            }}>
              <div style={{ 
                padding: 20, borderBottom: `1px solid ${colors.border}`,
                display: "flex", justifyContent: "space-between", alignItems: "center" 
              }}>
                <h3 style={{ 
                  fontFamily: "'Playfair Display', serif", 
                  fontSize: 18, color: colors.slate, fontWeight: 700 
                }}>
                  Recent Appointments
                </h3>
                <ChevronRight size={18} color={colors.slate} />
              </div>
              <div style={{ padding: 20 }}>
                {recentAppointments.map(apt => (
                  <motion.div key={apt.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "12px 0", borderBottom: `1px solid ${colors.border}`
                    }}>
                    <div>
                      <div style={{ color: theme === 'white' ? '#1a202c' : colors.slate, fontWeight: 600, fontSize: 14 }}>{apt.patient}</div>
                      <div style={{ color: theme === 'white' ? '#4a5568' : colors.slate, fontSize: 12 }}>{apt.doctor}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: theme === 'white' ? '#1a202c' : colors.slate, fontWeight: 600, fontSize: 13 }}>{apt.time}</div>
                      <div style={{
                        padding: "2px 8px", borderRadius: 12, fontSize: 10, fontWeight: 600,
                        background: apt.status === "confirmed" ? `${colors.teal}18` : `${colors.gold}18`,
                        color: apt.status === "confirmed" ? colors.teal : colors.gold,
                        marginTop: 4
                      }}>
                        {apt.status}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div style={{ 
              background: colors.white, borderRadius: 16, 
              border: `1px solid ${colors.border}`, overflow: "hidden" 
            }}>
              <div style={{ 
                padding: 20, borderBottom: `1px solid ${colors.border}`,
                display: "flex", justifyContent: "space-between", alignItems: "center" 
              }}>
                <h3 style={{ 
                  fontFamily: "'Playfair Display', serif", 
                  fontSize: 18, color: colors.slate, fontWeight: 700 
                }}>
                  Quick Actions
                </h3>
                <BarChart3 size={18} color={colors.slate} />
              </div>
              <div style={{ padding: 20, display: "grid", gap: 12 }}>
                {quickActions.filter(action => action.enabled).map((action, i) => {
                  const IconComponent = iconMap[action.icon];
                  return (
                    <motion.button 
                      key={action.id} 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuickAction(action)}
                      style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: 16, background: colors.cream, borderRadius: 12,
                        border: "none", cursor: "pointer", width: "100%",
                        transition: "all 0.2s",
                        opacity: action.enabled ? 1 : 0.5
                      }}
                      onMouseEnter={(e) => {
                        if (action.enabled) {
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (action.enabled) {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow = "none";
                        }
                      }}
                    >
                      <div style={{ 
                        width: 40, height: 40, borderRadius: 10, 
                        background: `${action.color}18`, 
                        display: "flex", alignItems: "center", justifyContent: "center" 
                      }}>
                        {IconComponent && <IconComponent size={20} color={action.color} />}
                      </div>
                      <div style={{ textAlign: "left", flex: 1 }}>
                        <div style={{ color: theme === 'white' ? '#1a202c' : colors.slate, fontWeight: 600, fontSize: 14 }}>{action.label}</div>
                        <div style={{ color: theme === 'white' ? '#4a5568' : colors.slate, fontSize: 11, marginTop: 2, opacity: 0.8 }}>{action.description}</div>
                      </div>
                      <ChevronRight size={16} color={theme === 'white' ? '#4a5568' : colors.slate} />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
