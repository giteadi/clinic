import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings, Clock, MapPin, Phone, Mail, Globe, Save, Upload, X, Plus, Trash2 } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import BackButton from "../common/BackButton";
import { fetchClinicSettings, updateClinicSettings, clearSuccess } from "../../store/slices/adminSlice";

export default function ClinicSettingsPage({ setView }) {
  const { colors, theme } = useTheme();
  const [activeTab, setActiveTab] = useState("general");
  const dispatch = useDispatch();
  const { settings, loading, error, success } = useSelector(state => state.admin);
  const { admin, token } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    primary_color: "#3B82F6",
    secondary_color: "#10B981"
  });

  // Fetch clinic settings on mount
  useEffect(() => {
    if (admin?.clinic?.id && token) {
      dispatch(fetchClinicSettings({ 
        clinicId: admin.clinic.id, 
        token 
      }));
    }
  }, [admin, token, dispatch]);

  // Update form when settings are loaded
  useEffect(() => {
    if (settings) {
      setFormData({
        name: settings.name || "",
        email: settings.email || "",
        phone: settings.phone || "",
        address: settings.address || "",
        description: settings.description || "",
        primary_color: settings.primary_color || "#3B82F6",
        secondary_color: settings.secondary_color || "#10B981"
      });
    }
  }, [settings]);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => dispatch(clearSuccess()), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  const tabs = [
    { id: "general", label: "General Info", icon: Settings },
    { id: "branding", label: "Branding", icon: Settings }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (admin?.clinic?.id && token) {
      dispatch(updateClinicSettings({
        clinicId: admin.clinic.id,
        settings: formData,
        token
      }));
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: theme === 'white' ? colors.cream : colors.navy, paddingTop: 80, paddingBottom: 40 }}>
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
              color: theme === 'white' ? '#1a202c' : colors.white, 
              marginBottom: 12 
            }}>
              Clinic Settings
            </h1>
            <p style={{ color: colors.slate, fontSize: 16 }}>
              Configure clinic preferences and settings
            </p>
          </motion.div>
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

        {success && (
          <div style={{ 
            background: '#efe', 
            border: '1px solid #cfc', 
            color: '#3c3', 
            padding: '12px 16px', 
            borderRadius: 8, 
            marginBottom: 20 
          }}>
            ✓ {success}
          </div>
        )}

        {/* Tabs */}
        <div style={{ 
          display: "flex", 
          background: theme === 'white' ? colors.white : colors.navyLight, 
          borderRadius: 12, 
          padding: 8, 
          marginBottom: 32,
          border: `1px solid ${colors.border}`
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: "12px 16px",
                border: "none",
                background: "none",
                cursor: "pointer",
                color: activeTab === tab.id ? colors.white : colors.slate,
                fontWeight: 600,
                fontSize: 14,
                borderRadius: 8,
                background: activeTab === tab.id ? colors.teal : "transparent"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: theme === 'white' ? colors.cream : colors.navyLight,
            border: `1px solid ${colors.border}`,
            borderRadius: 16,
            padding: 32
          }}
        >
          {activeTab === "general" && (
            <div style={{ display: "grid", gap: 24 }}>
              <div>
                <label style={{ color: theme === 'white' ? colors.slate : colors.white, fontSize: 14, fontWeight: 600, marginBottom: 8, display: "block" }}>
                  Clinic Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  disabled={loading}
                  style={{
                    width: "100%",
                    background: theme === 'white' ? colors.white : colors.navyLight,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: "12px 16px",
                    color: theme === 'white' ? colors.slate : colors.white,
                    fontSize: 14,
                    opacity: loading ? 0.6 : 1
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
                <div>
                  <label style={{ color: theme === 'white' ? colors.slate : colors.white, fontSize: 14, fontWeight: 600, marginBottom: 8, display: "block" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={loading}
                    style={{
                      width: "100%",
                      background: theme === 'white' ? colors.white : colors.navyLight,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 8,
                      padding: "12px 16px",
                      color: theme === 'white' ? colors.slate : colors.white,
                      fontSize: 14,
                      opacity: loading ? 0.6 : 1
                    }}
                  />
                </div>
                <div>
                  <label style={{ color: theme === 'white' ? colors.slate : colors.white, fontSize: 14, fontWeight: 600, marginBottom: 8, display: "block" }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={loading}
                    style={{
                      width: "100%",
                      background: theme === 'white' ? colors.white : colors.navyLight,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 8,
                      padding: "12px 16px",
                      color: theme === 'white' ? colors.slate : colors.white,
                      fontSize: 14,
                      opacity: loading ? 0.6 : 1
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ color: theme === 'white' ? colors.slate : colors.white, fontSize: 14, fontWeight: 600, marginBottom: 8, display: "block" }}>
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  disabled={loading}
                  rows={3}
                  style={{
                    width: "100%",
                    background: theme === 'white' ? colors.white : colors.navyLight,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: "12px 16px",
                    color: theme === 'white' ? colors.slate : colors.white,
                    fontSize: 14,
                    resize: "vertical",
                    opacity: loading ? 0.6 : 1
                  }}
                />
              </div>

              <div>
                <label style={{ color: theme === 'white' ? colors.slate : colors.white, fontSize: 14, fontWeight: 600, marginBottom: 8, display: "block" }}>
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  disabled={loading}
                  rows={4}
                  style={{
                    width: "100%",
                    background: theme === 'white' ? colors.white : colors.navyLight,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: "12px 16px",
                    color: theme === 'white' ? colors.slate : colors.white,
                    fontSize: 14,
                    resize: "vertical",
                    opacity: loading ? 0.6 : 1
                  }}
                />
              </div>
            </div>
          )}

          {activeTab === "branding" && (
            <div style={{ display: "grid", gap: 24 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
                <div>
                  <label style={{ color: theme === 'white' ? colors.slate : colors.white, fontSize: 14, fontWeight: 600, marginBottom: 8, display: "block" }}>
                    Primary Color
                  </label>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <input
                      type="color"
                      value={formData.primary_color}
                      onChange={(e) => handleInputChange("primary_color", e.target.value)}
                      disabled={loading}
                      style={{
                        width: "60px",
                        height: "40px",
                        borderRadius: 8,
                        border: `1px solid ${colors.border}`,
                        cursor: "pointer",
                        opacity: loading ? 0.6 : 1
                      }}
                    />
                    <input
                      type="text"
                      value={formData.primary_color}
                      onChange={(e) => handleInputChange("primary_color", e.target.value)}
                      disabled={loading}
                      style={{
                        flex: 1,
                        background: theme === 'white' ? colors.white : colors.navyLight,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 8,
                        padding: "10px 14px",
                        color: theme === 'white' ? colors.slate : colors.white,
                        fontSize: 14,
                        opacity: loading ? 0.6 : 1
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ color: theme === 'white' ? colors.slate : colors.white, fontSize: 14, fontWeight: 600, marginBottom: 8, display: "block" }}>
                    Secondary Color
                  </label>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <input
                      type="color"
                      value={formData.secondary_color}
                      onChange={(e) => handleInputChange("secondary_color", e.target.value)}
                      disabled={loading}
                      style={{
                        width: "60px",
                        height: "40px",
                        borderRadius: 8,
                        border: `1px solid ${colors.border}`,
                        cursor: "pointer",
                        opacity: loading ? 0.6 : 1
                      }}
                    />
                    <input
                      type="text"
                      value={formData.secondary_color}
                      onChange={(e) => handleInputChange("secondary_color", e.target.value)}
                      disabled={loading}
                      style={{
                        flex: 1,
                        background: theme === 'white' ? colors.white : colors.navyLight,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 8,
                        padding: "10px 14px",
                        color: theme === 'white' ? colors.slate : colors.white,
                        fontSize: 14,
                        opacity: loading ? 0.6 : 1
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={loading}
            style={{
              background: loading ? colors.slate : colors.teal,
              border: "none",
              borderRadius: 12,
              padding: "14px 32px",
              cursor: loading ? "not-allowed" : "pointer",
              color: colors.white,
              fontSize: 16,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 32,
              opacity: loading ? 0.6 : 1
            }}
          >
            <Save size={18} />
            {loading ? "Saving..." : "Save Changes"}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
