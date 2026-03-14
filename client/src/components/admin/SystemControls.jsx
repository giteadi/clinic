import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Users,
  BarChart3,
  Settings,
  Activity,
  Send,
  Plus,
  Search,
  Filter,
  Download,
  Bell,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  UserPlus,
  Shield,
  Database,
  Cpu,
  Wifi,
  HardDrive,
  Eye,
  Edit,
  Trash2,
  Mail,
  Smartphone,
  Globe
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import Link from "../common/Link";
import BackButton from "../common/BackButton";

export default function SystemControls({ activeTab: initialTab = "clinics", setView }) {
  const { colors, theme } = useTheme();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showAddClinicModal, setShowAddClinicModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Dynamic System Config State
  const [systemConfig, setSystemConfig] = useState({
    general: {
      systemName: "CliniQ Pro",
      defaultTimezone: "UTC+05:30",
      maintenanceMode: false,
      userRegistration: true,
      autoBackup: true,
      sessionTimeout: "30",
      maxFileSize: "10",
      allowedFileTypes: "pdf,doc,docx,jpg,png"
    },
    security: {
      twoFactorAuth: true,
      passwordComplexity: "high",
      loginAttempts: "5",
      sessionEncryption: true,
      apiRateLimit: "100",
      ipWhitelist: "",
      auditLogging: true,
      dataRetention: "365"
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      appointmentReminders: true,
      systemAlerts: true,
      marketingEmails: false,
      weeklyReports: true,
      emergencyAlerts: true
    },
    features: {
      onlineBooking: true,
      videoConsultation: true,
      prescriptionUpload: true,
      patientPortal: true,
      doctorMobileApp: true,
      autoScheduling: false,
      aiDiagnosis: false,
      multiLanguageSupport: true
    }
  });

  const [configSaved, setConfigSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  // Handler functions
  const handleConfigChange = (category, field, value) => {
    setSystemConfig(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
    setConfigSaved(false);
  };

  const handleSaveConfig = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaving(false);
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 3000);
  };

  const handleResetConfig = () => {
    setSystemConfig({
      general: {
        systemName: "CliniQ Pro",
        defaultTimezone: "UTC+05:30",
        maintenanceMode: false,
        userRegistration: true,
        autoBackup: true,
        sessionTimeout: "30",
        maxFileSize: "10",
        allowedFileTypes: "pdf,doc,docx,jpg,png"
      },
      security: {
        twoFactorAuth: true,
        passwordComplexity: "high",
        loginAttempts: "5",
        sessionEncryption: true,
        apiRateLimit: "100",
        ipWhitelist: "",
        auditLogging: true,
        dataRetention: "365"
      },
      notifications: {
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        appointmentReminders: true,
        systemAlerts: true,
        marketingEmails: false,
        weeklyReports: true,
        emergencyAlerts: true
      },
      features: {
        onlineBooking: true,
        videoConsultation: true,
        prescriptionUpload: true,
        patientPortal: true,
        doctorMobileApp: true,
        autoScheduling: false,
        aiDiagnosis: false,
        multiLanguageSupport: true
      }
    });
    setConfigSaved(false);
  };

  // Mock data
  const [clinics, setClinics] = useState([
    { id: 1, name: "City Medical Center", status: "active", doctors: 15, patients: 1200, revenue: "$450K" },
    { id: 2, name: "Health Plus Clinic", status: "active", doctors: 8, patients: 800, revenue: "$280K" },
    { id: 3, name: "Wellness Hub", status: "inactive", doctors: 12, patients: 950, revenue: "$380K" }
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "Dr. Sarah Johnson", role: "admin", email: "sarah@clinic.com", status: "active", lastLogin: "2 hours ago" },
    { id: 2, name: "John Smith", role: "patient", email: "john@email.com", status: "active", lastLogin: "1 day ago" },
    { id: 3, name: "Dr. Mike Chen", role: "doctor", email: "mike@clinic.com", status: "inactive", lastLogin: "3 days ago" }
  ]);

  const [systemHealth] = useState({
    cpu: 45,
    memory: 62,
    storage: 78,
    network: 95,
    database: 88,
    uptime: "99.9%"
  });

  const [analytics] = useState({
    totalClinics: 156,
    totalUsers: 12450,
    totalDoctors: 892,
    revenue: "$2.4M",
    growth: 12.5,
    appointments: 3456
  });

  const tabs = [
    { id: "clinics", label: "Add New Clinic", icon: Building2, description: "Register a new clinic" },
    { id: "users", label: "Manage Users", icon: Users, description: "Admin and patient accounts" },
    { id: "analytics", label: "Analytics", icon: BarChart3, description: "View detailed reports" },
    { id: "config", label: "System Config", icon: Settings, description: "Global settings" },
    { id: "health", label: "System Health", icon: Activity, description: "Monitor performance" },
    { id: "broadcast", label: "Broadcast", icon: Send, description: "Send notifications" }
  ];

  const renderClinicsTab = () => (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h3 style={{ color: colors.white, fontSize: 20, fontWeight: 600 }}>Clinic Management</h3>
        <button
          onClick={() => setShowAddClinicModal(true)}
          style={{
            background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
            border: "none",
            borderRadius: 8,
            padding: "10px 20px",
            cursor: "pointer",
            color: colors.white,
            fontSize: 14,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 8
          }}
        >
          <Plus size={16} /> Add New Clinic
        </button>
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <div style={{ flex: 1, position: "relative" }}>
          <Search size={18} color={theme === 'white' ? '#4a5568' : colors.slate} style={{ position: "absolute", left: 12, top: 12 }} />
          <input
            type="text"
            placeholder="Search clinics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              background: colors.background || colors.navyLight,
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              padding: "12px 16px 12px 44px",
              color: colors.white,
              fontSize: 14
            }}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            background: colors.background || colors.navyLight,
            border: `1px solid ${colors.border}`,
            borderRadius: 8,
            padding: "12px 16px",
            color: colors.white,
            fontSize: 14,
            cursor: "pointer"
          }}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div style={{ background: colors.background || colors.navyLight, borderRadius: 12, overflow: "hidden", border: `1px solid ${colors.border}` }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: colors.background || colors.navyLight, borderBottom: `1px solid ${colors.border}` }}>
              <th style={{ padding: 16, textAlign: "left", color: theme === 'white' ? '#1a202c' : colors.slate, fontSize: 12, fontWeight: 600, textTransform: "uppercase" }}>Clinic Name</th>
              <th style={{ padding: 16, textAlign: "left", color: theme === 'white' ? '#1a202c' : colors.slate, fontSize: 12, fontWeight: 600, textTransform: "uppercase" }}>Status</th>
              <th style={{ padding: 16, textAlign: "left", color: theme === 'white' ? '#1a202c' : colors.slate, fontSize: 12, fontWeight: 600, textTransform: "uppercase" }}>Doctors</th>
              <th style={{ padding: 16, textAlign: "left", color: theme === 'white' ? '#1a202c' : colors.slate, fontSize: 12, fontWeight: 600, textTransform: "uppercase" }}>Patients</th>
              <th style={{ padding: 16, textAlign: "left", color: theme === 'white' ? '#1a202c' : colors.slate, fontSize: 12, fontWeight: 600, textTransform: "uppercase" }}>Revenue</th>
              <th style={{ padding: 16, textAlign: "left", color: theme === 'white' ? '#1a202c' : colors.slate, fontSize: 12, fontWeight: 600, textTransform: "uppercase" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clinics.map((clinic) => (
              <tr key={clinic.id} style={{ borderBottom: `1px solid ${colors.border}` }}>
                <td style={{ padding: 16, color: colors.white, fontSize: 14 }}>{clinic.name}</td>
                <td style={{ padding: 16 }}>
                  <span style={{
                    background: clinic.status === "active" ? `${colors.teal}20` : `${colors.red}20`,
                    color: clinic.status === "active" ? colors.teal : colors.red,
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600
                  }}>
                    {clinic.status}
                  </span>
                </td>
                <td style={{ padding: 16, color: colors.white, fontSize: 14 }}>{clinic.doctors}</td>
                <td style={{ padding: 16, color: colors.white, fontSize: 14 }}>{clinic.patients}</td>
                <td style={{ padding: 16, color: colors.white, fontSize: 14 }}>{clinic.revenue}</td>
                <td style={{ padding: 16 }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: theme === 'white' ? '#4a5568' : colors.slate }}>
                      <Eye size={16} />
                    </button>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: theme === 'white' ? '#4a5568' : colors.slate }}>
                      <Edit size={16} />
                    </button>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: colors.red }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUsersTab = () => (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h3 style={{ color: colors.white, fontSize: 20, fontWeight: 600 }}>User Management</h3>
        <button
          onClick={() => setShowAddUserModal(true)}
          style={{
            background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
            border: "none",
            borderRadius: 8,
            padding: "10px 20px",
            cursor: "pointer",
            color: colors.white,
            fontSize: 14,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 8
          }}
        >
          <UserPlus size={16} /> Add New User
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
        {users.map((user) => (
          <div key={user.id} style={{
            background: colors.background || colors.navyLight,
            border: `1px solid ${colors.border}`,
            borderRadius: 12,
            padding: 20
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 16 }}>
              <div>
                <h4 style={{ color: colors.white, fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{user.name}</h4>
                <p style={{ color: colors.slate, fontSize: 14 }}>{user.email}</p>
              </div>
              <span style={{
                background: user.status === "active" ? `${colors.teal}20` : `${colors.red}20`,
                color: user.status === "active" ? colors.teal : colors.red,
                padding: "4px 12px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600
              }}>
                {user.status}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{
                background: colors.background || colors.navyLight,
                color: colors.slate,
                padding: "4px 12px",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 500
              }}>
                {user.role}
              </span>
              <span style={{ color: colors.slate, fontSize: 12 }}>Last login: {user.lastLogin}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div style={{ padding: 24 }}>
      <h3 style={{ color: colors.white, fontSize: 20, fontWeight: 600, marginBottom: 24 }}>Analytics Dashboard</h3>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20, marginBottom: 32 }}>
        <div style={{
          background: `linear-gradient(135deg, ${colors.teal}20, ${colors.teal}10)`,
          border: `1px solid ${colors.teal}30`,
          borderRadius: 12,
          padding: 20
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <Building2 size={24} color={colors.teal} />
            <TrendingUp size={16} color={colors.teal} />
          </div>
          <h4 style={{ color: colors.white, fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{analytics.totalClinics}</h4>
          <p style={{ color: colors.slate, fontSize: 14 }}>Total Clinics</p>
        </div>

        <div style={{
          background: `linear-gradient(135deg, #3b82f620, #3b82f610)`,
          border: `1px solid #3b82f630`,
          borderRadius: 12,
          padding: 20
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <Users size={24} color="#3b82f6" />
            <TrendingUp size={16} color="#3b82f6" />
          </div>
          <h4 style={{ color: colors.white, fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{analytics.totalUsers.toLocaleString()}</h4>
          <p style={{ color: colors.slate, fontSize: 14 }}>Total Users</p>
        </div>

        <div style={{
          background: `linear-gradient(135deg, #8b5cf620, #8b5cf610)`,
          border: `1px solid #8b5cf630`,
          borderRadius: 12,
          padding: 20
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <Shield size={24} color="#8b5cf6" />
            <TrendingUp size={16} color="#8b5cf6" />
          </div>
          <h4 style={{ color: colors.white, fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{analytics.totalDoctors}</h4>
          <p style={{ color: colors.slate, fontSize: 14 }}>Total Doctors</p>
        </div>

        <div style={{
          background: `linear-gradient(135deg, #10b98120, #10b98110)`,
          border: `1px solid #10b98130`,
          borderRadius: 12,
          padding: 20
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <BarChart3 size={24} color="#10b981" />
            <span style={{ color: "#10b981", fontSize: 12, fontWeight: 600 }}>+{analytics.growth}%</span>
          </div>
          <h4 style={{ color: colors.white, fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{analytics.revenue}</h4>
          <p style={{ color: colors.slate, fontSize: 14 }}>Total Revenue</p>
        </div>
      </div>

      <div style={{
        background: colors.background || colors.navyLight,
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        padding: 24
      }}>
        <h4 style={{ color: colors.white, fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Recent Activity</h4>
        <div style={{ display: "grid", gap: 12 }}>
          {["New clinic registered", "User account created", "Appointment booked", "System update completed"].map((activity, index) => (
            <div key={index} style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              background: colors.background || colors.navyLight,
              borderRadius: 8
            }}>
              <CheckCircle size={16} color={colors.teal} />
              <span style={{ color: colors.white, fontSize: 14 }}>{activity}</span>
              <span style={{ color: colors.slate, fontSize: 12, marginLeft: "auto" }}>{index + 1}h ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderConfigTab = () => (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h3 style={{ color: colors.white, fontSize: 20, fontWeight: 600 }}>System Configuration</h3>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={handleResetConfig}
            style={{
              background: "none",
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              padding: "8px 16px",
              cursor: "pointer",
              color: colors.slate,
              fontSize: 14,
              fontWeight: 600
            }}
          >
            Reset to Default
          </button>
          <button
            onClick={handleSaveConfig}
            disabled={saving}
            style={{
              background: configSaved ? colors.teal : `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
              border: "none",
              borderRadius: 8,
              padding: "8px 20px",
              cursor: saving ? "not-allowed" : "pointer",
              color: colors.white,
              fontSize: 14,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 8,
              opacity: saving ? 0.7 : 1
            }}
          >
            {saving ? (
              <>
                <div style={{
                  width: 16,
                  height: 16,
                  border: `2px solid ${colors.white}`,
                  borderTop: "2px solid transparent",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite"
                }} />
                Saving...
              </>
            ) : configSaved ? (
              <>
                <CheckCircle size={16} />
                Saved
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
      
      <div style={{ display: "grid", gap: 24 }}>
        {/* General Settings */}
        <div style={{
          background: colors.background || colors.navyLight,
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          padding: 24
        }}>
          <h4 style={{ color: colors.white, fontSize: 16, fontWeight: 600, marginBottom: 16 }}>General Settings</h4>
          <div style={{ display: "grid", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: colors.white, fontSize: 14 }}>System Name</span>
              <input
                type="text"
                value={systemConfig.general.systemName}
                onChange={(e) => handleConfigChange('general', 'systemName', e.target.value)}
                style={{
                  background: colors.background || colors.navyLight,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 6,
                  padding: "8px 12px",
                  color: colors.white,
                  fontSize: 14,
                  width: "200px"
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: colors.white, fontSize: 14 }}>Default Timezone</span>
              <select
                value={systemConfig.general.defaultTimezone}
                onChange={(e) => handleConfigChange('general', 'defaultTimezone', e.target.value)}
                style={{
                  background: colors.background || colors.navyLight,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 6,
                  padding: "8px 12px",
                  color: colors.white,
                  fontSize: 14,
                  width: "200px",
                  cursor: "pointer"
                }}
              >
                <option value="UTC+05:30">UTC+05:30</option>
                <option value="UTC+00:00">UTC+00:00</option>
                <option value="UTC-05:00">UTC-05:00</option>
                <option value="UTC+08:00">UTC+08:00</option>
              </select>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: colors.white, fontSize: 14 }}>Maintenance Mode</span>
              <button
                onClick={() => handleConfigChange('general', 'maintenanceMode', !systemConfig.general.maintenanceMode)}
                style={{
                  width: 48,
                  height: 24,
                  background: systemConfig.general.maintenanceMode ? colors.teal : "#374151",
                  border: "none",
                  borderRadius: 12,
                  cursor: "pointer",
                  position: "relative"
                }}
              >
                <div style={{
                  width: 20,
                  height: 20,
                  background: colors.white,
                  borderRadius: "50%",
                  position: "absolute",
                  top: 2,
                  left: systemConfig.general.maintenanceMode ? 26 : 2,
                  transition: "all 0.2s"
                }} />
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: colors.white, fontSize: 14 }}>User Registration</span>
              <button
                onClick={() => handleConfigChange('general', 'userRegistration', !systemConfig.general.userRegistration)}
                style={{
                  width: 48,
                  height: 24,
                  background: systemConfig.general.userRegistration ? colors.teal : "#374151",
                  border: "none",
                  borderRadius: 12,
                  cursor: "pointer",
                  position: "relative"
                }}
              >
                <div style={{
                  width: 20,
                  height: 20,
                  background: colors.white,
                  borderRadius: "50%",
                  position: "absolute",
                  top: 2,
                  left: systemConfig.general.userRegistration ? 26 : 2,
                  transition: "all 0.2s"
                }} />
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: colors.white, fontSize: 14 }}>Session Timeout (minutes)</span>
              <input
                type="number"
                value={systemConfig.general.sessionTimeout}
                onChange={(e) => handleConfigChange('general', 'sessionTimeout', e.target.value)}
                style={{
                  background: colors.background || colors.navyLight,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 6,
                  padding: "8px 12px",
                  color: colors.white,
                  fontSize: 14,
                  width: "200px"
                }}
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div style={{
          background: colors.background || colors.navyLight,
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          padding: 24
        }}>
          <h4 style={{ color: colors.white, fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Security Settings</h4>
          <div style={{ display: "grid", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: colors.white, fontSize: 14 }}>Two-Factor Authentication</span>
              <button
                onClick={() => handleConfigChange('security', 'twoFactorAuth', !systemConfig.security.twoFactorAuth)}
                style={{
                  width: 48,
                  height: 24,
                  background: systemConfig.security.twoFactorAuth ? colors.teal : "#374151",
                  border: "none",
                  borderRadius: 12,
                  cursor: "pointer",
                  position: "relative"
                }}
              >
                <div style={{
                  width: 20,
                  height: 20,
                  background: colors.white,
                  borderRadius: "50%",
                  position: "absolute",
                  top: 2,
                  left: systemConfig.security.twoFactorAuth ? 26 : 2,
                  transition: "all 0.2s"
                }} />
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: colors.white, fontSize: 14 }}>Password Complexity</span>
              <select
                value={systemConfig.security.passwordComplexity}
                onChange={(e) => handleConfigChange('security', 'passwordComplexity', e.target.value)}
                style={{
                  background: colors.background || colors.navyLight,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 6,
                  padding: "8px 12px",
                  color: colors.white,
                  fontSize: 14,
                  width: "200px",
                  cursor: "pointer"
                }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: colors.white, fontSize: 14 }}>Login Attempts</span>
              <input
                type="number"
                value={systemConfig.security.loginAttempts}
                onChange={(e) => handleConfigChange('security', 'loginAttempts', e.target.value)}
                style={{
                  background: colors.background || colors.navyLight,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 6,
                  padding: "8px 12px",
                  color: colors.white,
                  fontSize: 14,
                  width: "200px"
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: colors.white, fontSize: 14 }}>Session Encryption</span>
              <button
                onClick={() => handleConfigChange('security', 'sessionEncryption', !systemConfig.security.sessionEncryption)}
                style={{
                  width: 48,
                  height: 24,
                  background: systemConfig.security.sessionEncryption ? colors.teal : "#374151",
                  border: "none",
                  borderRadius: 12,
                  cursor: "pointer",
                  position: "relative"
                }}
              >
                <div style={{
                  width: 20,
                  height: 20,
                  background: colors.white,
                  borderRadius: "50%",
                  position: "absolute",
                  top: 2,
                  left: systemConfig.security.sessionEncryption ? 26 : 2,
                  transition: "all 0.2s"
                }} />
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div style={{
          background: colors.background || colors.navyLight,
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          padding: 24
        }}>
          <h4 style={{ color: colors.white, fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Notification Settings</h4>
          <div style={{ display: "grid", gap: 16 }}>
            {[
              { key: 'emailNotifications', label: 'Email Notifications' },
              { key: 'smsNotifications', label: 'SMS Notifications' },
              { key: 'pushNotifications', label: 'Push Notifications' },
              { key: 'appointmentReminders', label: 'Appointment Reminders' },
              { key: 'systemAlerts', label: 'System Alerts' },
              { key: 'weeklyReports', label: 'Weekly Reports' }
            ].map(({ key, label }) => (
              <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: colors.white, fontSize: 14 }}>{label}</span>
                <button
                  onClick={() => handleConfigChange('notifications', key, !systemConfig.notifications[key])}
                  style={{
                    width: 48,
                    height: 24,
                    background: systemConfig.notifications[key] ? colors.teal : "#374151",
                    border: "none",
                    borderRadius: 12,
                    cursor: "pointer",
                    position: "relative"
                  }}
                >
                  <div style={{
                    width: 20,
                    height: 20,
                    background: colors.white,
                    borderRadius: "50%",
                    position: "absolute",
                    top: 2,
                    left: systemConfig.notifications[key] ? 26 : 2,
                    transition: "all 0.2s"
                  }} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Settings */}
        <div style={{
          background: colors.background || colors.navyLight,
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          padding: 24
        }}>
          <h4 style={{ color: colors.white, fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Feature Settings</h4>
          <div style={{ display: "grid", gap: 16 }}>
            {[
              { key: 'onlineBooking', label: 'Online Booking' },
              { key: 'videoConsultation', label: 'Video Consultation' },
              { key: 'prescriptionUpload', label: 'Prescription Upload' },
              { key: 'patientPortal', label: 'Patient Portal' },
              { key: 'doctorMobileApp', label: 'Doctor Mobile App' },
              { key: 'autoScheduling', label: 'Auto Scheduling' },
              { key: 'aiDiagnosis', label: 'AI Diagnosis' },
              { key: 'multiLanguageSupport', label: 'Multi-Language Support' }
            ].map(({ key, label }) => (
              <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: colors.white, fontSize: 14 }}>{label}</span>
                <button
                  onClick={() => handleConfigChange('features', key, !systemConfig.features[key])}
                  style={{
                    width: 48,
                    height: 24,
                    background: systemConfig.features[key] ? colors.teal : "#374151",
                    border: "none",
                    borderRadius: 12,
                    cursor: "pointer",
                    position: "relative"
                  }}
                >
                  <div style={{
                    width: 20,
                    height: 20,
                    background: colors.white,
                    borderRadius: "50%",
                    position: "absolute",
                    top: 2,
                    left: systemConfig.features[key] ? 26 : 2,
                    transition: "all 0.2s"
                  }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  const renderHealthTab = () => (
    <div style={{ padding: 24 }}>
      <h3 style={{ color: colors.white, fontSize: 20, fontWeight: 600, marginBottom: 24 }}>System Health Monitor</h3>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 32 }}>
        <div style={{
          background: colors.background || colors.navyLight,
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          padding: 20
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Cpu size={20} color={colors.teal} />
              <span style={{ color: colors.white, fontSize: 14, fontWeight: 600 }}>CPU Usage</span>
            </div>
            <span style={{ color: colors.white, fontSize: 16, fontWeight: 700 }}>{systemHealth.cpu}%</span>
          </div>
          <div style={{
            height: 8,
            background: colors.background || colors.navyLight,
            borderRadius: 4,
            overflow: "hidden"
          }}>
            <div style={{
              width: `${systemHealth.cpu}%`,
              height: "100%",
              background: systemHealth.cpu > 80 ? colors.red : systemHealth.cpu > 60 ? "#f59e0b" : colors.teal,
              transition: "all 0.3s"
            }} />
          </div>
        </div>

        <div style={{
          background: colors.background || colors.navyLight,
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          padding: 20
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Database size={20} color={colors.teal} />
              <span style={{ color: colors.white, fontSize: 14, fontWeight: 600 }}>Memory</span>
            </div>
            <span style={{ color: colors.white, fontSize: 16, fontWeight: 700 }}>{systemHealth.memory}%</span>
          </div>
          <div style={{
            height: 8,
            background: colors.background || colors.navyLight,
            borderRadius: 4,
            overflow: "hidden"
          }}>
            <div style={{
              width: `${systemHealth.memory}%`,
              height: "100%",
              background: systemHealth.memory > 80 ? colors.red : systemHealth.memory > 60 ? "#f59e0b" : colors.teal,
              transition: "all 0.3s"
            }} />
          </div>
        </div>

        <div style={{
          background: colors.background || colors.navyLight,
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          padding: 20
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <HardDrive size={20} color={colors.teal} />
              <span style={{ color: colors.white, fontSize: 14, fontWeight: 600 }}>Storage</span>
            </div>
            <span style={{ color: colors.white, fontSize: 16, fontWeight: 700 }}>{systemHealth.storage}%</span>
          </div>
          <div style={{
            height: 8,
            background: colors.background || colors.navyLight,
            borderRadius: 4,
            overflow: "hidden"
          }}>
            <div style={{
              width: `${systemHealth.storage}%`,
              height: "100%",
              background: systemHealth.storage > 80 ? colors.red : systemHealth.storage > 60 ? "#f59e0b" : colors.teal,
              transition: "all 0.3s"
            }} />
          </div>
        </div>

        <div style={{
          background: colors.background || colors.navyLight,
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          padding: 20
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Wifi size={20} color={colors.teal} />
              <span style={{ color: colors.white, fontSize: 14, fontWeight: 600 }}>Network</span>
            </div>
            <span style={{ color: colors.white, fontSize: 16, fontWeight: 700 }}>{systemHealth.network}%</span>
          </div>
          <div style={{
            height: 8,
            background: colors.background || colors.navyLight,
            borderRadius: 4,
            overflow: "hidden"
          }}>
            <div style={{
              width: `${systemHealth.network}%`,
              height: "100%",
              background: systemHealth.network > 80 ? colors.red : systemHealth.network > 60 ? "#f59e0b" : colors.teal,
              transition: "all 0.3s"
            }} />
          </div>
        </div>
      </div>

      <div style={{
        background: colors.background || colors.navyLight,
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        padding: 24
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h4 style={{ color: colors.white, fontSize: 16, fontWeight: 600 }}>System Status</h4>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 12,
              height: 12,
              background: colors.teal,
              borderRadius: "50%",
              animation: "pulse 2s infinite"
            }} />
            <span style={{ color: colors.teal, fontSize: 14, fontWeight: 600 }}>Online</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          <div>
            <p style={{ color: colors.slate, fontSize: 12, marginBottom: 4 }}>Uptime</p>
            <p style={{ color: colors.white, fontSize: 16, fontWeight: 600 }}>{systemHealth.uptime}</p>
          </div>
          <div>
            <p style={{ color: colors.slate, fontSize: 12, marginBottom: 4 }}>Database</p>
            <p style={{ color: colors.white, fontSize: 16, fontWeight: 600 }}>{systemHealth.database}% Healthy</p>
          </div>
          <div>
            <p style={{ color: colors.slate, fontSize: 12, marginBottom: 4 }}>Last Check</p>
            <p style={{ color: colors.white, fontSize: 16, fontWeight: 600 }}>2 mins ago</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBroadcastTab = () => (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h3 style={{ color: colors.white, fontSize: 20, fontWeight: 600 }}>Broadcast Messages</h3>
        <button
          onClick={() => setShowBroadcastModal(true)}
          style={{
            background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
            border: "none",
            borderRadius: 8,
            padding: "10px 20px",
            cursor: "pointer",
            color: colors.white,
            fontSize: 14,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 8
          }}
        >
          <Send size={16} /> New Broadcast
        </button>
      </div>

      <div style={{ display: "grid", gap: 20 }}>
        {[
          { title: "System Maintenance", message: "Scheduled maintenance on Sunday 2AM-4AM", type: "system", time: "2 hours ago", recipients: "All Users" },
          { title: "New Feature Launch", message: "Video consultations now available!", type: "feature", time: "1 day ago", recipients: "Doctors & Patients" },
          { title: "Holiday Notice", message: "Clinic closed on upcoming holidays", type: "holiday", time: "3 days ago", recipients: "All Users" }
        ].map((broadcast, index) => (
          <div key={index} style={{
            background: colors.background || colors.navyLight,
            border: `1px solid ${colors.border}`,
            borderRadius: 12,
            padding: 20
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
              <div>
                <h4 style={{ color: colors.white, fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{broadcast.title}</h4>
                <p style={{ color: colors.slate, fontSize: 14, marginBottom: 8 }}>{broadcast.message}</p>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <span style={{
                    background: broadcast.type === "system" ? `${colors.red}20` : broadcast.type === "feature" ? `${colors.teal}20` : `${colors.yellow}20`,
                    color: broadcast.type === "system" ? colors.red : broadcast.type === "feature" ? colors.teal : colors.yellow,
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600
                  }}>
                    {broadcast.type}
                  </span>
                  <span style={{ color: colors.slate, fontSize: 12 }}>Recipients: {broadcast.recipients}</span>
                  <span style={{ color: colors.slate, fontSize: 12 }}>{broadcast.time}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: colors.slate }}>
                  <Edit size={16} />
                </button>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: colors.red }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "clinics": return renderClinicsTab();
      case "users": return renderUsersTab();
      case "analytics": return renderAnalyticsTab();
      case "config": return renderConfigTab();
      case "health": return renderHealthTab();
      case "broadcast": return renderBroadcastTab();
      default: return renderClinicsTab();
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: colors.background || colors.navyLight, paddingTop: 80 }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>
        {/* Header with Back Button */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
          <BackButton 
            onClick={() => setView && setView("superadmin-dashboard")}
            text="Back to Dashboard"
          />
          <div>
            <h2 style={{ color: colors.white, fontSize: 32, fontWeight: 700, marginBottom: 8 }}>System Controls</h2>
            <p style={{ color: colors.slate, fontSize: 16 }}>Manage your clinic system efficiently</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: "flex",
          gap: 16,
          marginBottom: 32,
          overflowX: "auto",
          paddingBottom: 8
        }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Link
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? `${colors.teal}15` : "#0f172a",
                  border: activeTab === tab.id ? `1px solid ${colors.teal}30` : `1px solid ${colors.border}`,
                  borderRadius: 12,
                  padding: "16px 20px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  minWidth: 200,
                  transition: "all 0.2s"
                }}
              >
                <div style={{
                  width: 40,
                  height: 40,
                  background: activeTab === tab.id ? `${colors.teal}20` : "#111827",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Icon size={20} color={activeTab === tab.id ? colors.teal : colors.slate} />
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ color: activeTab === tab.id ? colors.teal : colors.white, fontSize: 14, fontWeight: 600, marginBottom: 2 }}>
                    {tab.label}
                  </div>
                  <div style={{ color: colors.slate, fontSize: 12 }}>
                    {tab.description}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Content Area */}
        <div style={{
          background: colors.background || colors.navyLight,
          border: `1px solid ${colors.border}`,
          borderRadius: 16,
          overflow: "hidden"
        }}>
          {renderContent()}
        </div>
      </div>

      {/* Add Clinic Modal */}
      <AnimatePresence>
        {showAddClinicModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000
            }}
            onClick={() => setShowAddClinicModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: colors.background || colors.navyLight,
                border: `1px solid ${colors.border}`,
                borderRadius: 16,
                padding: 32,
                width: "90%",
                maxWidth: 500
              }}
            >
              <h3 style={{ color: colors.white, fontSize: 20, fontWeight: 600, marginBottom: 24 }}>Add New Clinic</h3>
              <div style={{ display: "grid", gap: 16 }}>
                <input
                  type="text"
                  placeholder="Clinic Name"
                  style={{
                    background: colors.background || colors.navyLight,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: "12px 16px",
                    color: colors.white,
                    fontSize: 14
                  }}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  style={{
                    background: colors.background || colors.navyLight,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: "12px 16px",
                    color: colors.white,
                    fontSize: 14
                  }}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  style={{
                    background: colors.background || colors.navyLight,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: "12px 16px",
                    color: colors.white,
                    fontSize: 14
                  }}
                />
                <textarea
                  placeholder="Address"
                  rows={3}
                  style={{
                    background: colors.background || colors.navyLight,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: "12px 16px",
                    color: colors.white,
                    fontSize: 14,
                    resize: "vertical"
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <button
                  onClick={() => setShowAddClinicModal(false)}
                  style={{
                    flex: 1,
                    background: "none",
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: "12px",
                    cursor: "pointer",
                    color: colors.slate,
                    fontSize: 14,
                    fontWeight: 600
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddClinicModal(false)}
                  style={{
                    flex: 1,
                    background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
                    border: "none",
                    borderRadius: 8,
                    padding: "12px",
                    cursor: "pointer",
                    color: colors.white,
                    fontSize: 14,
                    fontWeight: 600
                  }}
                >
                  Add Clinic
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add User Modal */}
      <AnimatePresence>
        {showAddUserModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000
            }}
            onClick={() => setShowAddUserModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: colors.background || colors.navyLight,
                border: `1px solid ${colors.border}`,
                borderRadius: 16,
                padding: 32,
                width: "90%",
                maxWidth: 500
              }}
            >
              <h3 style={{ color: colors.white, fontSize: 20, fontWeight: 600, marginBottom: 24 }}>Add New User</h3>
              <div style={{ display: "grid", gap: 16 }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  style={{
                    background: colors.background || colors.navyLight,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: "12px 16px",
                    color: colors.white,
                    fontSize: 14
                  }}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  style={{
                    background: colors.background || colors.navyLight,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: "12px 16px",
                    color: colors.white,
                    fontSize: 14
                  }}
                />
                <select
                  style={{
                    background: colors.background || colors.navyLight,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: "12px 16px",
                    color: colors.white,
                    fontSize: 14,
                    cursor: "pointer"
                  }}
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="doctor">Doctor</option>
                  <option value="patient">Patient</option>
                  <option value="staff">Staff</option>
                </select>
                <input
                  type="password"
                  placeholder="Password"
                  style={{
                    background: colors.background || colors.navyLight,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: "12px 16px",
                    color: colors.white,
                    fontSize: 14
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <button
                  onClick={() => setShowAddUserModal(false)}
                  style={{
                    flex: 1,
                    background: "none",
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: "12px",
                    cursor: "pointer",
                    color: colors.slate,
                    fontSize: 14,
                    fontWeight: 600
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddUserModal(false)}
                  style={{
                    flex: 1,
                    background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
                    border: "none",
                    borderRadius: 8,
                    padding: "12px",
                    cursor: "pointer",
                    color: colors.white,
                    fontSize: 14,
                    fontWeight: 600
                  }}
                >
                  Add User
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Broadcast Modal */}
      <AnimatePresence>
        {showBroadcastModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000
            }}
            onClick={() => setShowBroadcastModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: colors.background || colors.navyLight,
                border: `1px solid ${colors.border}`,
                borderRadius: 16,
                padding: 32,
                width: "90%",
                maxWidth: 500
              }}
            >
              <h3 style={{ color: colors.white, fontSize: 20, fontWeight: 600, marginBottom: 24 }}>Send Broadcast</h3>
              <div style={{ display: "grid", gap: 16 }}>
                <input
                  type="text"
                  placeholder="Broadcast Title"
                  style={{
                    background: colors.background || colors.navyLight,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: "12px 16px",
                    color: colors.white,
                    fontSize: 14
                  }}
                />
                <textarea
                  placeholder="Message Content"
                  rows={4}
                  style={{
                    background: colors.background || colors.navyLight,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: "12px 16px",
                    color: colors.white,
                    fontSize: 14,
                    resize: "vertical"
                  }}
                />
                <select
                  style={{
                    background: colors.background || colors.navyLight,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: "12px 16px",
                    color: colors.white,
                    fontSize: 14,
                    cursor: "pointer"
                  }}
                >
                  <option value="">Select Recipients</option>
                  <option value="all">All Users</option>
                  <option value="doctors">Doctors Only</option>
                  <option value="patients">Patients Only</option>
                  <option value="admins">Admins Only</option>
                </select>
                <select
                  style={{
                    background: colors.background || colors.navyLight,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: "12px 16px",
                    color: colors.white,
                    fontSize: 14,
                    cursor: "pointer"
                  }}
                >
                  <option value="">Notification Type</option>
                  <option value="system">System</option>
                  <option value="feature">Feature</option>
                  <option value="holiday">Holiday</option>
                  <option value="maintenance">Maintenance</option>
                </select>
                <div style={{ display: "flex", gap: 12 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, color: colors.white, fontSize: 14 }}>
                    <input type="checkbox" style={{ cursor: "pointer" }} />
                    <Mail size={16} />
                    Email
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, color: colors.white, fontSize: 14 }}>
                    <input type="checkbox" style={{ cursor: "pointer" }} />
                    <Smartphone size={16} />
                    SMS
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, color: colors.white, fontSize: 14 }}>
                    <input type="checkbox" style={{ cursor: "pointer" }} />
                    <Bell size={16} />
                    Push
                  </label>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <button
                  onClick={() => setShowBroadcastModal(false)}
                  style={{
                    flex: 1,
                    background: "none",
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: "12px",
                    cursor: "pointer",
                    color: colors.slate,
                    fontSize: 14,
                    fontWeight: 600
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowBroadcastModal(false)}
                  style={{
                    flex: 1,
                    background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
                    border: "none",
                    borderRadius: 8,
                    padding: "12px",
                    cursor: "pointer",
                    color: colors.white,
                    fontSize: 14,
                    fontWeight: 600
                  }}
                >
                  Send Broadcast
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
