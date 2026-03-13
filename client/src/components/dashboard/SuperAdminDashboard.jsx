import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Users, TrendingUp, Globe, Settings, Bell, ChevronRight, BarChart3, Shield, Activity } from "lucide-react";
import { COLORS } from "../../constants/colors";
import Avatar from "../common/Avatar";

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const globalStats = [
    { icon: Building2, label: "Total Clinics", value: "156", change: "+8%", trend: "up" },
    { icon: Users, label: "Total Patients", value: "45.2K", change: "+12%", trend: "up" },
    { icon: TrendingUp, label: "Total Revenue", value: "₹8.4Cr", change: "+18%", trend: "up" },
    { icon: Activity, label: "Active Doctors", value: "1,248", change: "+15%", trend: "up" },
  ];

  const clinics = [
    { id: 1, name: "HeartCare Clinic", city: "Mumbai", patients: "2,456", revenue: "₹12.4L", status: "active" },
    { id: 2, name: "SkinFirst Clinic", city: "Delhi", patients: "1,823", revenue: "₹8.2L", status: "active" },
    { id: 3, name: "KidsWell Center", city: "Bangalore", patients: "1,567", revenue: "₹6.8L", status: "active" },
    { id: 4, name: "BoneCare Hospital", city: "Chennai", patients: "987", revenue: "₹4.2L", status: "maintenance" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, paddingTop: 80 }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 20px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 20 }}>
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: COLORS.navy, marginBottom: 8, fontWeight: 700 }}>
                Super Admin Dashboard
              </h1>
              <p style={{ color: COLORS.slate, fontSize: 16 }}>Manage all clinics and operations across India.</p>
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
            {globalStats.map((stat, i) => (
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
                {clinics.map(clinic => (
                  <motion.div key={clinic.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "16px 0", borderBottom: `1px solid ${COLORS.border}`
                    }}>
                    <div>
                      <div style={{ color: COLORS.navy, fontWeight: 600, fontSize: 15 }}>{clinic.name}</div>
                      <div style={{ color: COLORS.slate, fontSize: 12 }}>{clinic.city}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: COLORS.navy, fontWeight: 600, fontSize: 13 }}>{clinic.patients} patients</div>
                      <div style={{ color: COLORS.teal, fontSize: 12 }}>{clinic.revenue}</div>
                      <div style={{
                        padding: "2px 8px", borderRadius: 12, fontSize: 10, fontWeight: 600,
                        background: clinic.status === "active" ? `${COLORS.teal}18` : `${COLORS.gold}18`,
                        color: clinic.status === "active" ? COLORS.teal : COLORS.gold,
                        marginTop: 4
                      }}>
                        {clinic.status}
                      </div>
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
                  { icon: Building2, label: "Add New Clinic", color: COLORS.teal, description: "Register a new clinic" },
                  { icon: Users, label: "Manage Users", color: COLORS.gold, description: "Admin and patient accounts" },
                  { icon: BarChart3, label: "Analytics", color: "#9C27B0", description: "View detailed reports" },
                  { icon: Settings, label: "System Config", color: COLORS.slate, description: "Global settings" },
                  { icon: Activity, label: "System Health", color: "#E91E63", description: "Monitor performance" },
                  { icon: Bell, label: "Broadcast", color: "#FF9800", description: "Send notifications" },
                ].map((action, i) => (
                  <motion.button key={action.label} whileHover={{ scale: 1.02 }}
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
