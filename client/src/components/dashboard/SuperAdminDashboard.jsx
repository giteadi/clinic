import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Building2, Users, TrendingUp, Globe, Settings, Bell, ChevronRight, BarChart3, Shield, Activity, Plus, Edit2, Trash2, Eye, Pause, Play } from "lucide-react";
import { COLORS } from "../../constants/colors";
import Avatar from "../common/Avatar";
import BackButton from "../common/BackButton";
import { addClinic, updateClinic, deleteClinic, toggleClinicStatus, addActivity, updateSystemHealth } from "../../store/superAdminSlice";

export default function SuperAdminDashboard({ setView }) {
  const dispatch = useDispatch();
  const { globalStats, clinics, systemHealth, recentActivities } = useSelector(state => state.superAdmin);
  const [showAddClinicModal, setShowAddClinicModal] = useState(false);
  const [editingClinic, setEditingClinic] = useState(null);
  const [newClinic, setNewClinic] = useState({
    name: "",
    city: "",
    state: "",
    doctors: 0,
    established: ""
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Random system health updates
      dispatch(updateSystemHealth({
        responseTime: `${Math.floor(Math.random() * 50 + 100)}ms`,
        errorRate: `${(Math.random() * 0.5).toFixed(1)}%`
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'Cr';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatCurrency = (num) => {
    return '₹' + formatNumber(num);
  };

  const handleAddClinic = () => {
    if (newClinic.name && newClinic.city) {
      dispatch(addClinic(newClinic));
      dispatch(addActivity({
        type: "clinic_added",
        clinic: newClinic.name,
        city: newClinic.city,
        admin: "Super Admin"
      }));
      setNewClinic({ name: "", city: "", state: "", doctors: 0, established: "" });
      setShowAddClinicModal(false);
    }
  };

  const handleToggleClinicStatus = (clinicId) => {
    dispatch(toggleClinicStatus(clinicId));
    const clinic = clinics.find(c => c.id === clinicId);
    dispatch(addActivity({
      type: "clinic_status_changed",
      clinic: clinic.name,
      status: clinic.status === "active" ? "maintenance" : "active",
      admin: "Super Admin"
    }));
  };

  const handleDeleteClinic = (clinicId) => {
    const clinic = clinics.find(c => c.id === clinicId);
    if (window.confirm(`Are you sure you want to delete ${clinic.name}?`)) {
      dispatch(deleteClinic(clinicId));
      dispatch(addActivity({
        type: "clinic_deleted",
        clinic: clinic.name,
        city: clinic.city,
        admin: "Super Admin"
      }));
    }
  };

  // Dynamic stats from Redux
  const dynamicStats = [
    { icon: Building2, label: "Total Clinics", value: globalStats.totalClinics, change: `+${globalStats.monthlyGrowth.clinics}%`, trend: "up" },
    { icon: Users, label: "Total Patients", value: formatNumber(globalStats.totalPatients), change: `+${globalStats.monthlyGrowth.patients}%`, trend: "up" },
    { icon: TrendingUp, label: "Total Revenue", value: formatCurrency(globalStats.totalRevenue), change: `+${globalStats.monthlyGrowth.revenue}%`, trend: "up" },
    { icon: Activity, label: "Active Doctors", value: formatNumber(globalStats.activeDoctors), change: `+${globalStats.monthlyGrowth.doctors}%`, trend: "up" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, paddingTop: 80 }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 20px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <BackButton 
                onClick={() => setView && setView("home")}
                text="Back to Home"
              />
              <div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: COLORS.navy, marginBottom: 8, fontWeight: 700 }}>
                  Super Admin Dashboard
                </h1>
                <p style={{ color: COLORS.slate, fontSize: 16 }}>Manage all clinics and operations across India.</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button style={{
                background: `${COLORS.teal}18`, border: `1px solid ${COLORS.border}`,
                borderRadius: 10, padding: "8px 16px", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8,
                color: COLORS.teal, fontSize: 14, fontWeight: 600
              }}>
                <Bell size={16} /> System Alerts
              </button>
              <button style={{
                background: `${COLORS.gold}18`, border: `1px solid ${COLORS.border}`,
                borderRadius: 10, padding: "8px 16px", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8,
                color: COLORS.gold, fontSize: 14, fontWeight: 600
              }}>
                <Settings size={16} /> System Settings
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar initials="SA" color={COLORS.gold} size={40} />
                <div>
                  <div style={{ color: COLORS.navy, fontWeight: 600, fontSize: 15 }}>Super Admin</div>
                  <div style={{ color: COLORS.slate, fontSize: 12 }}>superadmin@cliniqpro.com</div>
                </div>
              </div>
            </div>
          </div>

          {/* Global Stats */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
            gap: 20, marginBottom: 32 
          }}>
            {dynamicStats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                style={{
                  background: COLORS.white, borderRadius: 16, padding: 24,
                  border: `1px solid ${COLORS.border}`, position: "relative", overflow: "hidden"
                }}>
                <div style={{ 
                  position: "absolute", top: 0, right: 0, 
                  width: 80, height: 80, 
                  background: `linear-gradient(135deg, ${COLORS.gold}08, transparent)`,
                  borderRadius: "0 16px 0 80px"
                }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 16 }}>
                  <div style={{ 
                    width: 56, height: 56, borderRadius: 12, 
                    background: `${COLORS.gold}18`, 
                    display: "flex", alignItems: "center", justifyContent: "center" 
                  }}>
                    <stat.icon size={28} color={COLORS.gold} />
                  </div>
                  <div style={{
                    padding: "4px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                    background: stat.trend === "up" ? `${COLORS.teal}18` : `${COLORS.gold}18`,
                    color: stat.trend === "up" ? COLORS.teal : COLORS.gold
                  }}>
                    {stat.change}
                  </div>
                </div>
                <div style={{ color: COLORS.navy, fontWeight: 700, fontSize: 32, marginBottom: 4 }}>{stat.value}</div>
                <div style={{ color: COLORS.slate, fontSize: 14 }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))", 
            gap: 24 
          }}>
            <div style={{ 
              background: COLORS.white, borderRadius: 16, 
              border: `1px solid ${COLORS.border}`, overflow: "hidden" 
            }}>
              <div style={{ 
                padding: 20, borderBottom: `1px solid ${COLORS.border}`,
                display: "flex", justifyContent: "space-between", alignItems: "center" 
              }}>
                <h3 style={{ 
                  fontFamily: "'Playfair Display', serif", 
                  fontSize: 18, color: COLORS.navy, fontWeight: 700 
                }}>
                  All Clinics
                </h3>
                <Globe size={18} color={COLORS.slate} />
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h4 style={{ color: COLORS.navy, fontWeight: 600, fontSize: 16 }}>Clinic Management</h4>
                  <button
                    onClick={() => setShowAddClinicModal(true)}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      background: COLORS.teal, color: COLORS.white,
                      border: "none", borderRadius: 8, padding: "8px 12px",
                      fontSize: 12, fontWeight: 600, cursor: "pointer"
                    }}
                  >
                    <Plus size={14} /> Add Clinic
                  </button>
                </div>
                {clinics.map(clinic => (
                  <motion.div key={clinic.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "16px 0", borderBottom: `1px solid ${COLORS.border}`
                    }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: COLORS.navy, fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{clinic.name}</div>
                      <div style={{ color: COLORS.slate, fontSize: 12, marginBottom: 2 }}>{clinic.city}, {clinic.state}</div>
                      <div style={{ display: "flex", gap: 12, fontSize: 11 }}>
                        <span style={{ color: COLORS.slate }}>⭐ {clinic.rating}</span>
                        <span style={{ color: COLORS.slate }}>👨‍⚕️ {clinic.doctors} doctors</span>
                        <span style={{ color: COLORS.slate }}>📅 {clinic.established}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right", marginRight: 16 }}>
                      <div style={{ color: COLORS.navy, fontWeight: 600, fontSize: 13 }}>{formatNumber(clinic.patients)} patients</div>
                      <div style={{ color: COLORS.teal, fontSize: 12 }}>{formatCurrency(clinic.revenue)}</div>
                      <div style={{
                        padding: "2px 8px", borderRadius: 12, fontSize: 10, fontWeight: 600,
                        background: clinic.status === "active" ? `${COLORS.teal}18` : `${COLORS.red}20`,
                        color: clinic.status === "active" ? COLORS.teal : COLORS.red,
                        marginTop: 4
                      }}>
                        {clinic.status}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={() => handleToggleClinicStatus(clinic.id)}
                        style={{
                          background: "none", border: "none", cursor: "pointer",
                          padding: 4, borderRadius: 4,
                          display: "flex", alignItems: "center"
                        }}
                        title={clinic.status === "active" ? "Deactivate" : "Activate"}
                      >
                        {clinic.status === "active" ? <Pause size={16} color={COLORS.gold} /> : <Play size={16} color={COLORS.teal} />}
                      </button>
                      <button
                        onClick={() => setEditingClinic(clinic)}
                        style={{
                          background: "none", border: "none", cursor: "pointer",
                          padding: 4, borderRadius: 4,
                          display: "flex", alignItems: "center"
                        }}
                        title="Edit"
                      >
                        <Edit2 size={16} color={COLORS.slate} />
                      </button>
                      <button
                        onClick={() => handleDeleteClinic(clinic.id)}
                        style={{
                          background: "none", border: "none", cursor: "pointer",
                          padding: 4, borderRadius: 4,
                          display: "flex", alignItems: "center"
                        }}
                        title="Delete"
                      >
                        <Trash2 size={16} color="#E91E63" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div style={{ 
              background: COLORS.white, borderRadius: 16, 
              border: `1px solid ${COLORS.border}`, overflow: "hidden" 
            }}>
              <div style={{ 
                padding: 20, borderBottom: `1px solid ${COLORS.border}`,
                display: "flex", justifyContent: "space-between", alignItems: "center" 
              }}>
                <h3 style={{ 
                  fontFamily: "'Playfair Display', serif", 
                  fontSize: 18, color: COLORS.navy, fontWeight: 700 
                }}>
                  System Controls
                </h3>
                <Shield size={18} color={COLORS.slate} />
              </div>
              <div style={{ padding: 20, display: "grid", gap: 12 }}>
                {[
                  { icon: Building2, label: "Add New Clinic", color: COLORS.teal, description: "Register a new clinic", view: "add-clinic" },
                  { icon: Users, label: "Manage Users", color: COLORS.gold, description: "Admin and patient accounts", view: "manage-users" },
                  { icon: BarChart3, label: "Analytics", color: "#9C27B0", description: "View detailed reports", view: "analytics" },
                  { icon: Settings, label: "System Config", color: COLORS.slate, description: "Global settings", view: "system-config" },
                  { icon: Activity, label: "System Health", color: "#E91E63", description: "Monitor performance", view: "system-health" },
                  { icon: Bell, label: "Broadcast", color: "#FF9800", description: "Send notifications", view: "broadcast" },
                ].map((action, i) => (
                  <motion.button key={action.label} whileHover={{ scale: 1.02 }}
                    onClick={() => setView && setView(action.view)}
                    style={{
                      display: "flex", alignItems: "center", gap: 16,
                      padding: 16, background: COLORS.cream, borderRadius: 12,
                      border: "none", cursor: "pointer", width: "100%",
                      transition: "all 0.2s"
                    }}>
                    <div style={{ 
                      width: 48, height: 48, borderRadius: 12, 
                      background: `${action.color}18`, 
                      display: "flex", alignItems: "center", justifyContent: "center" 
                    }}>
                      <action.icon size={24} color={action.color} />
                    </div>
                    <div style={{ textAlign: "left", flex: 1 }}>
                      <div style={{ color: COLORS.navy, fontWeight: 600, fontSize: 15 }}>{action.label}</div>
                      <div style={{ color: COLORS.slate, fontSize: 12 }}>{action.description}</div>
                    </div>
                    <ChevronRight size={18} color={COLORS.slate} />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
