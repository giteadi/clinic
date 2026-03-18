import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { Users, Calendar, TrendingUp, DollarSign, Activity, Bell, Settings, ChevronRight, BarChart3 } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import Avatar from "../common/Avatar";
import BackButton from "../common/BackButton";
import { fetchDashboardStats, clearError } from "../../store/slices/adminSlice";

export default function AdminDashboard({ setView }) {
  const { colors, theme } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");
  const dispatch = useDispatch();
  const { actions: quickActions } = useSelector(state => state.quickActions);
  const { stats, appointments, loading, error } = useSelector(state => state.admin);
  const { admin, token } = useSelector(state => state.auth);

  // Fetch dashboard stats on mount
  useEffect(() => {
    if (admin?.clinic?.id && token) {
      dispatch(fetchDashboardStats({ 
        clinicId: admin.clinic.id, 
        token 
      }));
    }
  }, [admin, token, dispatch]);

  // Map icon names to components
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

  // Build stats array from Redux state
  const statsArray = [
    { 
      icon: Users, 
      label: "Total Patients", 
      value: stats.totalPatients?.toLocaleString() || "0", 
      change: "+12%", 
      trend: "up" 
    },
    { 
      icon: Calendar, 
      label: "Appointments", 
      value: stats.totalAppointments?.toLocaleString() || "0", 
      change: "+8%", 
      trend: "up" 
    },
    { 
      icon: DollarSign, 
      label: "Revenue", 
      value: `₹${(stats.totalRevenue / 100000).toFixed(1)}L` || "₹0", 
      change: "+15%", 
      trend: "up" 
    },
    { 
      icon: Activity, 
      label: "Active Doctors", 
      value: stats.totalDoctors?.toString() || "0", 
      change: "+2", 
      trend: "up" 
    },
  ];

  const recentAppointments = appointments.slice(0, 4) || [];

  return (
    <div style={{ minHeight: "100vh", background: colors.navy, paddingTop: 80 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 20px" }}>
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
            <button 
              onClick={() => dispatch(clearError())}
              style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#c33', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <BackButton
                onClick={() => setView && setView("home")}
                text="Back to Home"
              />
              <div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: theme === "white" ? colors.slate : colors.white, marginBottom: 8, fontWeight: 700 }}>
                  Admin Dashboard
                </h1>
                <p style={{ color: colors.slate, fontSize: 16 }}>
                  {admin?.clinic?.name || "Manage clinic operations and staff"}
                </p>
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
              <button 
                onClick={() => setView("clinic-settings")}
                style={{
                  background: `${colors.gold}18`, border: `1px solid ${colors.border}`,
                  borderRadius: 10, padding: "8px 16px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 8,
                  color: colors.gold, fontSize: 14, fontWeight: 600
                }}
              >
                <Settings size={16} /> Settings
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar initials={admin?.name?.substring(0, 2).toUpperCase() || "AD"} color={colors.teal} size={40} />
                <div>
                  <div style={{ color: theme === "white" ? colors.slate : colors.white, fontWeight: 600, fontSize: 15 }}>
                    {admin?.name || "Admin User"}
                  </div>
                  <div style={{ color: colors.slate, fontSize: 12 }}>{admin?.email || "admin@clinic.com"}</div>
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
            {statsArray.map((stat, i) => (
              <motion.div 
                key={stat.label} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.1 }}
                style={{
                  background: theme === "white" ? colors.white : colors.navyLight, 
                  borderRadius: 16, 
                  padding: 24,
                  border: `1px solid ${colors.border}`, 
                  position: "relative", 
                  overflow: "hidden"
                }}
              >
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
                <div style={{ color: theme === 'white' ? colors.slate : colors.white, fontWeight: 700, fontSize: 28, marginBottom: 4 }}>
                  {loading ? "..." : stat.value}
                </div>
                <div style={{ color: colors.slate, fontSize: 14 }}>{stat.label}</div>
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
              background: theme === "white" ? colors.white : colors.navyLight, 
              borderRadius: 16, 
              border: `1px solid ${colors.border}`, 
              overflow: "hidden" 
            }}>
              <div style={{ 
                padding: 20, 
                borderBottom: `1px solid ${colors.border}`,
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center" 
              }}>
                <h3 style={{ 
                  fontFamily: "'Playfair Display', serif", 
                  fontSize: 18, 
                  color: theme === "white" ? colors.slate : colors.white, 
                  fontWeight: 700 
                }}>
                  Recent Appointments
                </h3>
                <ChevronRight size={18} color={colors.slate} />
              </div>
              <div style={{ padding: 20 }}>
                {loading ? (
                  <div style={{ color: colors.slate, textAlign: 'center', padding: '20px' }}>Loading...</div>
                ) : recentAppointments.length > 0 ? (
                  recentAppointments.map(apt => (
                    <motion.div 
                      key={apt.id} 
                      initial={{ opacity: 0, x: -20 }} 
                      animate={{ opacity: 1, x: 0 }}
                      style={{
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center",
                        padding: "12px 0", 
                        borderBottom: `1px solid ${colors.border}`
                      }}
                    >
                      <div>
                        <div style={{ color: theme === 'white' ? colors.slate : colors.white, fontWeight: 600, fontSize: 14 }}>
                          {apt.patientName}
                        </div>
                        <div style={{ color: colors.slate, fontSize: 12 }}>{apt.doctorName}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ color: theme === 'white' ? colors.slate : colors.white, fontWeight: 600, fontSize: 13 }}>
                          {apt.appointment_time}
                        </div>
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
                  ))
                ) : (
                  <div style={{ color: colors.slate, textAlign: 'center', padding: '20px' }}>No appointments yet</div>
                )}
              </div>
            </div>

            <div style={{ 
              background: theme === "white" ? colors.white : colors.navyLight, 
              borderRadius: 16, 
              border: `1px solid ${colors.border}`, 
              overflow: "hidden" 
            }}>
              <div style={{ 
                padding: 20, 
                borderBottom: `1px solid ${colors.border}`,
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center" 
              }}>
                <h3 style={{ 
                  fontFamily: "'Playfair Display', serif", 
                  fontSize: 18, 
                  color: theme === "white" ? colors.slate : colors.white, 
                  fontWeight: 700 
                }}>
                  Quick Actions
                </h3>
                <BarChart3 size={18} color={colors.slate} />
              </div>
              <div style={{ padding: 20, display: "grid", gap: 12 }}>
                {quickActions.filter(action => action.enabled).map((action) => {
                  const IconComponent = iconMap[action.icon];
                  return (
                    <motion.button 
                      key={action.id} 
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuickAction(action)}
                      style={{
                        display: "flex", 
                        alignItems: "center", 
                        gap: 12,
                        padding: 16, 
                        background: theme === "white" ? colors.cream : colors.navy, 
                        borderRadius: 12,
                        border: `1px solid ${colors.border}`, 
                        cursor: "pointer", 
                        width: "100%",
                        opacity: action.enabled ? 1 : 0.5,
                        transition: "all 0.2s"
                      }}>
                      <div style={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: 10, 
                        background: `${action.color}18`, 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center" 
                      }}>
                        {IconComponent && <IconComponent size={20} color={action.color} />}
                      </div>
                      <div style={{ textAlign: "left", flex: 1 }}>
                        <div style={{ color: theme === 'white' ? colors.slate : colors.white, fontWeight: 600, fontSize: 14 }}>
                          {action.label}
                        </div>
                        <div style={{ color: colors.slate, fontSize: 11, marginTop: 2, opacity: 0.8 }}>
                          {action.description}
                        </div>
                      </div>
                      <ChevronRight size={16} color={colors.slate} />
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
