import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, Users, TrendingUp, Globe, Settings, Bell, ChevronRight, BarChart3, Shield, Activity, Plus, Edit2, Trash2, Eye, Pause, Play, LogOut } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import Avatar from "../common/Avatar";
import BackButton from "../common/BackButton";
import { useSuperAdmin } from "../../store/hooks";

export default function SuperAdminDashboard({ setView }) {
  const { colors } = useTheme();
  const { 
    globalStats, 
    clinics, 
    systemHealth, 
    recentActivities, 
    loading, 
    error,
    fetchStats,
    fetchClinics,
    addClinic,
    updateClinicStatus,
    deleteClinic
  } = useSuperAdmin();
  
  const [showAddClinicModal, setShowAddClinicModal] = useState(false);
  const [editingClinic, setEditingClinic] = useState(null);
  const [newClinic, setNewClinic] = useState({
    name: "",
    slug: "",
    email: "",
    phone: "",
    address: "",
    primary_color: "#3B82F6",
    secondary_color: "#60A5FA",
    description: ""
  });

  // Check if super admin is logged in
  useEffect(() => {
    const token = localStorage.getItem('superAdminToken');
    const adminData = localStorage.getItem('superAdminData');
    
    console.log('🔍 Super Admin Dashboard - Token:', !!token, 'Admin Data:', !!adminData);
    
    // Don't redirect, just fetch data
    fetchStats();
    fetchClinics();
  }, []); // Empty dependency array - run only once

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Random system health updates
      // dispatch(updateSystemHealth({
      //   responseTime: `${Math.floor(Math.random() * 50 + 100)}ms`,
      //   errorRate: `${(Math.random() * 0.5).toFixed(1)}%`
      // }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'Cr';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatCurrency = (num) => {
    return '₹' + formatNumber(num);
  };

  const handleAddClinic = () => {
    if (newClinic.name && newClinic.slug && newClinic.email) {
      addClinic(newClinic);
      setNewClinic({
        name: "",
        slug: "",
        email: "",
        phone: "",
        address: "",
        primary_color: "#3B82F6",
        secondary_color: "#60A5FA",
        description: ""
      });
      setShowAddClinicModal(false);
    }
  };

  const handleToggleClinicStatus = (clinicId) => {
    const clinic = clinics.find(c => c.id === clinicId);
    const newStatus = clinic.status === "active" ? "inactive" : "active";
    updateClinicStatus(clinicId, newStatus);
  };

  const handleDeleteClinic = (clinicId) => {
    const clinic = clinics.find(c => c.id === clinicId);
    if (window.confirm(`Are you sure you want to delete ${clinic.name}?`)) {
      deleteClinic(clinicId);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('superAdminToken');
    localStorage.removeItem('superAdminData');
    setView("superadmin-login");
  };

  // Dynamic stats from Redux
  const dynamicStats = [
    { icon: Building2, label: "Total Clinics", value: globalStats.totalClinics, change: `+${globalStats.monthlyGrowth.clinics}%`, trend: "up" },
    { icon: Users, label: "Total Patients", value: formatNumber(globalStats.totalPatients), change: `+${globalStats.monthlyGrowth.patients}%`, trend: "up" },
    { icon: TrendingUp, label: "Total Revenue", value: formatCurrency(globalStats.totalRevenue), change: `+${globalStats.monthlyGrowth.revenue}%`, trend: "up" },
    { icon: Activity, label: "Active Doctors", value: formatNumber(globalStats.totalDoctors), change: `+${globalStats.monthlyGrowth.doctors}%`, trend: "up" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: colors.cream, paddingTop: 80 }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 20px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <BackButton 
                onClick={() => setView && setView("home")}
                text="Back to Home"
              />
              <div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: colors.navy, marginBottom: 8, fontWeight: 700 }}>
                  Super Admin Dashboard
                </h1>
                <p style={{ color: colors.slate, fontSize: 16 }}>Manage all clinics and operations across India.</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button style={{
                background: `${colors.teal}18`, border: `1px solid ${colors.border}`,
                borderRadius: 10, padding: "8px 16px", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8,
                color: colors.teal, fontSize: 14, fontWeight: 600
              }}>
                <Bell size={16} /> System Alerts
              </button>
              <button style={{
                background: `${colors.gold}18`, border: `1px solid ${colors.border}`,
                borderRadius: 10, padding: "8px 16px", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8,
                color: colors.gold, fontSize: 14, fontWeight: 600
              }}>
                <Settings size={16} /> System Settings
              </button>
              <button
                onClick={handleLogout}
                style={{
                  background: `${colors.red}15`, border: `1px solid ${colors.red}30`,
                  borderRadius: 10, padding: "8px 16px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 8,
                  color: colors.red, fontSize: 14, fontWeight: 600
                }}
              >
                <LogOut size={16} /> Logout
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar initials="SA" color={colors.gold} size={40} />
                <div>
                  <div style={{ color: colors.navy, fontWeight: 600, fontSize: 15 }}>Super Admin</div>
                  <div style={{ color: colors.slate, fontSize: 12 }}>superadmin@cliniqpro.com</div>
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
            {loading ? (
              <div style={{ 
                gridColumn: "1 / -1", 
                textAlign: "center", 
                padding: "40px",
                color: colors.slate 
              }}>
                Loading global statistics...
              </div>
            ) : error ? (
              <div style={{ 
                gridColumn: "1 / -1", 
                textAlign: "center", 
                padding: "40px",
                color: colors.red 
              }}>
                Error loading statistics: {error}
              </div>
            ) : (
              dynamicStats.map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  style={{
                    background: colors.white, borderRadius: 16, padding: 24,
                    border: `1px solid ${colors.border}`, position: "relative", overflow: "hidden"
                  }}>
                  <div style={{ 
                    position: "absolute", top: 0, right: 0, 
                    width: 80, height: 80, 
                    background: `linear-gradient(135deg, ${colors.gold}08, transparent)`,
                    borderRadius: "0 16px 0 80px"
                  }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 16 }}>
                    <div style={{ 
                      width: 56, height: 56, borderRadius: 12, 
                      background: `${colors.gold}18`, 
                      display: "flex", alignItems: "center", justifyContent: "center" 
                    }}>
                      <stat.icon size={28} color={colors.gold} />
                    </div>
                    <div style={{
                      padding: "4px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                      background: stat.trend === "up" ? `${colors.teal}18` : `${colors.gold}18`,
                      color: stat.trend === "up" ? colors.teal : colors.gold
                    }}>
                      {stat.change}
                    </div>
                  </div>
                  <div style={{ color: colors.navy, fontWeight: 700, fontSize: 32, marginBottom: 4 }}>{stat.value}</div>
                  <div style={{ color: colors.slate, fontSize: 14 }}>{stat.label}</div>
                </motion.div>
              ))
            )}
          </div>

          {/* Main Content Grid */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))", 
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
                  fontSize: 18, color: colors.navy, fontWeight: 700 
                }}>
                  All Clinics
                </h3>
                <Globe size={18} color={colors.slate} />
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h4 style={{ color: colors.navy, fontWeight: 600, fontSize: 16 }}>Clinic Management</h4>
                  <button
                    onClick={() => setShowAddClinicModal(true)}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      background: colors.teal, color: colors.white,
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
                      padding: "16px 0", borderBottom: `1px solid ${colors.border}`
                    }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: colors.navy, fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{clinic.name}</div>
                      <div style={{ color: colors.slate, fontSize: 12, marginBottom: 2 }}>{clinic.email}</div>
                      <div style={{ color: colors.slate, fontSize: 12, marginBottom: 2 }}>{clinic.address}</div>
                      <div style={{ display: "flex", gap: 12, fontSize: 11 }}>
                        <span style={{ color: colors.slate }}>👨‍⚕️ {clinic.doctors_count || 0} doctors</span>
                        <span style={{ color: colors.slate }}>� {clinic.patients || 0} patients</span>
                        <span style={{ color: colors.slate }}>� {formatCurrency(clinic.total_revenue || 0)}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right", marginRight: 16 }}>
                      <div style={{ color: colors.navy, fontWeight: 600, fontSize: 13 }}>{formatNumber(clinic.patients || 0)} patients</div>
                      <div style={{ color: colors.teal, fontSize: 12 }}>{formatCurrency(clinic.total_revenue || 0)}</div>
                      <div style={{
                        padding: "2px 8px", borderRadius: 12, fontSize: 10, fontWeight: 600,
                        background: clinic.status === "active" ? `${colors.teal}18` : `${colors.red}20`,
                        color: clinic.status === "active" ? colors.teal : colors.red,
                        marginTop: 4
                      }}>
                        {clinic.status || 'active'}
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
                        {clinic.status === "active" ? <Pause size={16} color={colors.gold} /> : <Play size={16} color={colors.teal} />}
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
                        <Edit2 size={16} color={colors.slate} />
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
              background: colors.white, borderRadius: 16, 
              border: `1px solid ${colors.border}`, overflow: "hidden" 
            }}>
              <div style={{ 
                padding: 20, borderBottom: `1px solid ${colors.border}`,
                display: "flex", justifyContent: "space-between", alignItems: "center" 
              }}>
                <h3 style={{ 
                  fontFamily: "'Playfair Display', serif", 
                  fontSize: 18, color: colors.navy, fontWeight: 700 
                }}>
                  System Controls
                </h3>
                <Shield size={18} color={colors.slate} />
              </div>
              <div style={{ padding: 20, display: "grid", gap: 12 }}>
                {[
                  { icon: Building2, label: "Add New Clinic", color: colors.teal, description: "Register a new clinic", view: "add-clinic" },
                  { icon: Users, label: "Manage Users", color: colors.gold, description: "Admin and patient accounts", view: "manage-users" },
                  { icon: BarChart3, label: "Analytics", color: "#9C27B0", description: "View detailed reports", view: "analytics" },
                  { icon: Settings, label: "System Config", color: colors.slate, description: "Global settings", view: "system-config" },
                  { icon: Activity, label: "System Health", color: "#E91E63", description: "Monitor performance", view: "system-health" },
                  { icon: Bell, label: "Broadcast", color: "#FF9800", description: "Send notifications", view: "broadcast" },
                ].map((action, i) => (
                  <motion.button key={action.label} whileHover={{ scale: 1.02 }}
                    onClick={() => setView && setView(action.view)}
                    style={{
                      display: "flex", alignItems: "center", gap: 16,
                      padding: 16, background: colors.cream, borderRadius: 12,
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
                      <div style={{ color: colors.navy, fontWeight: 600, fontSize: 15 }}>{action.label}</div>
                      <div style={{ color: colors.slate, fontSize: 12 }}>{action.description}</div>
                    </div>
                    <ChevronRight size={18} color={colors.slate} />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add Clinic Modal */}
      {showAddClinicModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: colors.white, borderRadius: 16, padding: 32,
            maxWidth: 500, width: "90%", maxHeight: "80vh", overflow: "auto"
          }}>
            <h3 style={{ color: colors.navy, marginBottom: 24 }}>Add New Clinic</h3>
            
            <div style={{ display: "grid", gap: 16 }}>
              <div>
                <label style={{ color: colors.slate, fontSize: 12, marginBottom: 4, display: "block" }}>Clinic Name *</label>
                <input
                  type="text"
                  value={newClinic.name}
                  onChange={(e) => setNewClinic({...newClinic, name: e.target.value})}
                  style={{
                    width: "100%", padding: "8px 12px", border: `1px solid ${colors.border}`,
                    borderRadius: 6, fontSize: 14
                  }}
                  placeholder="Enter clinic name"
                />
              </div>

              <div>
                <label style={{ color: colors.slate, fontSize: 12, marginBottom: 4, display: "block" }}>Slug (Subdomain) *</label>
                <input
                  type="text"
                  value={newClinic.slug}
                  onChange={(e) => setNewClinic({...newClinic, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-')})}
                  style={{
                    width: "100%", padding: "8px 12px", border: `1px solid ${colors.border}`,
                    borderRadius: 6, fontSize: 14
                  }}
                  placeholder="clinic-name"
                />
                <small style={{ color: colors.slate, fontSize: 11 }}>
                  This will be used as: {newClinic.slug || 'clinic-name'}.localhost:3000
                </small>
              </div>

              <div>
                <label style={{ color: colors.slate, fontSize: 12, marginBottom: 4, display: "block" }}>Email *</label>
                <input
                  type="email"
                  value={newClinic.email}
                  onChange={(e) => setNewClinic({...newClinic, email: e.target.value})}
                  style={{
                    width: "100%", padding: "8px 12px", border: `1px solid ${colors.border}`,
                    borderRadius: 6, fontSize: 14
                  }}
                  placeholder="clinic@example.com"
                />
              </div>

              <div>
                <label style={{ color: colors.slate, fontSize: 12, marginBottom: 4, display: "block" }}>Phone</label>
                <input
                  type="tel"
                  value={newClinic.phone}
                  onChange={(e) => setNewClinic({...newClinic, phone: e.target.value})}
                  style={{
                    width: "100%", padding: "8px 12px", border: `1px solid ${colors.border}`,
                    borderRadius: 6, fontSize: 14
                  }}
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label style={{ color: colors.slate, fontSize: 12, marginBottom: 4, display: "block" }}>Address</label>
                <textarea
                  value={newClinic.address}
                  onChange={(e) => setNewClinic({...newClinic, address: e.target.value})}
                  style={{
                    width: "100%", padding: "8px 12px", border: `1px solid ${colors.border}`,
                    borderRadius: 6, fontSize: 14, minHeight: "80px", resize: "vertical"
                  }}
                  placeholder="Enter clinic address"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ color: colors.slate, fontSize: 12, marginBottom: 4, display: "block" }}>Primary Color</label>
                  <input
                    type="color"
                    value={newClinic.primary_color}
                    onChange={(e) => setNewClinic({...newClinic, primary_color: e.target.value})}
                    style={{
                      width: "100%", height: "36px", border: `1px solid ${colors.border}`,
                      borderRadius: 6, cursor: "pointer"
                    }}
                  />
                </div>
                <div>
                  <label style={{ color: colors.slate, fontSize: 12, marginBottom: 4, display: "block" }}>Secondary Color</label>
                  <input
                    type="color"
                    value={newClinic.secondary_color}
                    onChange={(e) => setNewClinic({...newClinic, secondary_color: e.target.value})}
                    style={{
                      width: "100%", height: "36px", border: `1px solid ${colors.border}`,
                      borderRadius: 6, cursor: "pointer"
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ color: colors.slate, fontSize: 12, marginBottom: 4, display: "block" }}>Description</label>
                <textarea
                  value={newClinic.description}
                  onChange={(e) => setNewClinic({...newClinic, description: e.target.value})}
                  style={{
                    width: "100%", padding: "8px 12px", border: `1px solid ${colors.border}`,
                    borderRadius: 6, fontSize: 14, minHeight: "60px", resize: "vertical"
                  }}
                  placeholder="Brief description about the clinic"
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowAddClinicModal(false)}
                style={{
                  padding: "8px 16px", border: `1px solid ${colors.border}`,
                  borderRadius: 6, background: "none", cursor: "pointer",
                  color: colors.slate, fontSize: 14
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddClinic}
                disabled={loading}
                style={{
                  padding: "8px 16px", border: "none", borderRadius: 6,
                  background: colors.teal, color: colors.white, cursor: "pointer",
                  fontSize: 14, fontWeight: 600, opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? 'Creating...' : 'Create Clinic'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
