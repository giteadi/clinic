import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Clock, MapPin, Phone, Mail, Globe, Save, Upload, X, Plus, Trash2 } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import BackButton from "../common/BackButton";

export default function ClinicSettingsPage({ setView }) {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState({
    clinicName: "City Medical Center",
    email: "info@citymedical.com",
    phone: "+91 22 2345 6789",
    address: "123 MG Road, Mumbai, Maharashtra 400001",
    website: "www.citymedical.com",
    timings: {
      monday: { open: "09:00", close: "21:00", closed: false },
      tuesday: { open: "09:00", close: "21:00", closed: false },
      wednesday: { open: "09:00", close: "21:00", closed: false },
      thursday: { open: "09:00", close: "21:00", closed: false },
      friday: { open: "09:00", close: "21:00", closed: false },
      saturday: { open: "09:00", close: "18:00", closed: false },
      sunday: { open: "closed", close: "closed", closed: true }
    },
    specialties: ["General", "Cardiology", "Orthopedics", "Pediatrics"],
    features: ["Emergency Services", "Lab Tests", "X-Ray", "Pharmacy"]
  });

  const [newSpecialty, setNewSpecialty] = useState("");
  const [newFeature, setNewFeature] = useState("");

  const tabs = [
    { id: "general", label: "General Info", icon: Settings },
    { id: "timings", label: "Timings", icon: Clock },
    { id: "services", label: "Services", icon: Settings }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTimingChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      timings: {
        ...prev.timings,
        [day]: {
          ...prev.timings[day],
          [field]: value
        }
      }
    }));
  };

  const handleAddSpecialty = () => {
    if (newSpecialty.trim() && !formData.specialties.includes(newSpecialty.trim())) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()]
      }));
      setNewSpecialty("");
    }
  };

  const handleRemoveSpecialty = (specialty) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  const handleSave = () => {
    console.log("Saving clinic settings:", formData);
    // TODO: Implement save functionality
    alert("Clinic settings saved successfully!");
  };

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

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
              color: colors.white, 
              marginBottom: 12 
            }}>
              Clinic Settings
            </h1>
            <p style={{ color: colors.slate, fontSize: 16 }}>
              Configure clinic preferences and settings
            </p>
          </motion.div>
        </div>

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
                  value={formData.clinicName}
                  onChange={(e) => handleInputChange("clinicName", e.target.value)}
                  style={{
                    width: "100%",
                    background: theme === 'white' ? colors.white : colors.navyLight,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: "12px 16px",
                    color: theme === 'white' ? colors.slate : colors.white,
                    fontSize: 14
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
                    style={{
                      width: "100%",
                      background: theme === 'white' ? colors.white : colors.navyLight,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 8,
                      padding: "12px 16px",
                      color: theme === 'white' ? colors.slate : colors.white,
                      fontSize: 14
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
                    style={{
                      width: "100%",
                      background: theme === 'white' ? colors.white : colors.navyLight,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 8,
                      padding: "12px 16px",
                      color: theme === 'white' ? colors.slate : colors.white,
                      fontSize: 14
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
                  rows={3}
                  style={{
                    width: "100%",
                    background: theme === 'white' ? colors.white : colors.navyLight,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: "12px 16px",
                    color: theme === 'white' ? colors.slate : colors.white,
                    fontSize: 14,
                    resize: "vertical"
                  }}
                />
              </div>

              <div>
                <label style={{ color: theme === 'white' ? colors.slate : colors.white, fontSize: 14, fontWeight: 600, marginBottom: 8, display: "block" }}>
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  style={{
                    width: "100%",
                    background: theme === 'white' ? colors.white : colors.navyLight,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: "12px 16px",
                    color: theme === 'white' ? colors.slate : colors.white,
                    fontSize: 14
                  }}
                />
              </div>
            </div>
          )}

          {activeTab === "timings" && (
            <div style={{ display: "grid", gap: 20 }}>
              <h3 style={{ color: theme === 'white' ? colors.slate : colors.white, fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
                Clinic Timings
              </h3>
              {days.map(day => (
                <div key={day} style={{ 
                  display: "grid", 
                  gridTemplateColumns: "120px 1fr 1fr auto", 
                  gap: 16,
                  alignItems: "center",
                  padding: "16px",
                  background: theme === 'white' ? colors.white : colors.navyLight,
                  borderRadius: 8,
                  border: `1px solid ${colors.border}`
                }}>
                  <span style={{ 
                    color: theme === 'white' ? colors.slate : colors.white, 
                    fontSize: 14, 
                    fontWeight: 600,
                    textTransform: "capitalize"
                  }}>
                    {day}
                  </span>
                  <input
                    type="time"
                    value={formData.timings[day].closed ? "closed" : formData.timings[day].open}
                    onChange={(e) => handleTimingChange(day, "open", e.target.value)}
                    disabled={formData.timings[day].closed}
                    style={{
                      background: formData.timings[day].closed ? colors.slate : colors.white,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 6,
                      padding: "8px 12px",
                      color: formData.timings[day].closed ? colors.slate : colors.slate,
                      fontSize: 14
                    }}
                  />
                  <input
                    type="time"
                    value={formData.timings[day].closed ? "closed" : formData.timings[day].close}
                    onChange={(e) => handleTimingChange(day, "close", e.target.value)}
                    disabled={formData.timings[day].closed}
                    style={{
                      background: formData.timings[day].closed ? colors.slate : colors.white,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 6,
                      padding: "8px 12px",
                      color: formData.timings[day].closed ? colors.slate : colors.slate,
                      fontSize: 14
                    }}
                  />
                  <label style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 8,
                    cursor: "pointer"
                  }}>
                    <input
                      type="checkbox"
                      checked={formData.timings[day].closed}
                      onChange={(e) => handleTimingChange(day, "closed", e.target.checked)}
                      style={{ cursor: "pointer" }}
                    />
                    <span style={{ color: colors.slate, fontSize: 14 }}>
                      Closed
                    </span>
                  </label>
                </div>
              ))}
            </div>
          )}

          {activeTab === "services" && (
            <div style={{ display: "grid", gap: 32 }}>
              <div>
                <h3 style={{ color: theme === 'white' ? colors.slate : colors.white, fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
                  Medical Specialties
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
                  {formData.specialties.map((specialty, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 16px",
                        background: `${colors.teal}18`,
                        border: `1px solid ${colors.teal}30`,
                        borderRadius: 20,
                        color: colors.teal,
                        fontSize: 14,
                        fontWeight: 600
                      }}
                    >
                      {specialty}
                      <button
                        onClick={() => handleRemoveSpecialty(specialty)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 2,
                          color: colors.teal
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <input
                    type="text"
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    placeholder="Add new specialty"
                    onKeyPress={(e) => e.key === "Enter" && handleAddSpecialty()}
                    style={{
                      flex: 1,
                      background: theme === 'white' ? colors.white : colors.navyLight,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 8,
                      padding: "10px 16px",
                      color: theme === 'white' ? colors.slate : colors.white,
                      fontSize: 14
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddSpecialty}
                    style={{
                      background: colors.teal,
                      border: "none",
                      borderRadius: 8,
                      padding: "10px 16px",
                      cursor: "pointer",
                      color: colors.white,
                      fontSize: 14,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 6
                    }}
                  >
                    <Plus size={16} />
                    Add
                  </motion.button>
                </div>
              </div>

              <div>
                <h3 style={{ color: theme === 'white' ? colors.slate : colors.white, fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
                  Clinic Features
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
                  {formData.features.map((feature, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 16px",
                        background: `${colors.gold}18`,
                        border: `1px solid ${colors.gold}30`,
                        borderRadius: 20,
                        color: colors.gold,
                        fontSize: 14,
                        fontWeight: 600
                      }}
                    >
                      {feature}
                      <button
                        onClick={() => handleRemoveFeature(feature)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 2,
                          color: colors.gold
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add new feature"
                    onKeyPress={(e) => e.key === "Enter" && handleAddFeature()}
                    style={{
                      flex: 1,
                      background: theme === 'white' ? colors.white : colors.navyLight,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 8,
                      padding: "10px 16px",
                      color: theme === 'white' ? colors.slate : colors.white,
                      fontSize: 14
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddFeature}
                    style={{
                      background: colors.gold,
                      border: "none",
                      borderRadius: 8,
                      padding: "10px 16px",
                      cursor: "pointer",
                      color: colors.white,
                      fontSize: 14,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 6
                    }}
                  >
                    <Plus size={16} />
                    Add
                  </motion.button>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div style={{ marginTop: 32, textAlign: "center" }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              style={{
                background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
                border: "none",
                borderRadius: 12,
                padding: "14px 32px",
                cursor: "pointer",
                color: colors.white,
                fontSize: 16,
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: 8
              }}
            >
              <Save size={18} />
              Save Settings
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
