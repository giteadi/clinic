import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, TrendingDown, Calendar, Download, Filter, FileText, Users, DollarSign, Activity, Clock } from "lucide-react";
import { COLORS } from "../../constants/colors";
import BackButton from "../common/BackButton";

export default function ViewReportsPage({ setView }) {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedReport, setSelectedReport] = useState("overview");

  // Mock report data
  const reports = {
    overview: {
      title: "Clinic Overview",
      stats: [
        { label: "Total Revenue", value: "₹4,85,000", change: "+15.3%", trend: "up", icon: DollarSign },
        { label: "Total Patients", value: "1,247", change: "+8.2%", trend: "up", icon: Users },
        { label: "Appointments", value: "892", change: "-2.1%", trend: "down", icon: Calendar },
        { label: "Active Doctors", value: "12", change: "+16.7%", trend: "up", icon: Activity }
      ]
    },
    financial: {
      title: "Financial Report",
      stats: [
        { label: "Monthly Revenue", value: "₹2,45,000", change: "+12.5%", trend: "up", icon: DollarSign },
        { label: "Consultation Fees", value: "₹1,78,000", change: "+10.2%", trend: "up", icon: DollarSign },
        { label: "Lab Tests", value: "₹45,000", change: "+8.7%", trend: "up", icon: FileText },
        { label: "Expenses", value: "₹67,000", change: "-5.3%", trend: "down", icon: TrendingDown }
      ]
    },
    patient: {
      title: "Patient Analytics",
      stats: [
        { label: "New Patients", value: "156", change: "+18.4%", trend: "up", icon: Users },
        { label: "Returning Patients", value: "892", change: "+6.2%", trend: "up", icon: Users },
        { label: "Patient Satisfaction", value: "4.8/5", change: "+0.2", trend: "up", icon: TrendingUp },
        { label: "Avg. Wait Time", value: "12 min", change: "-18%", trend: "down", icon: Clock }
      ]
    }
  };

  const currentReport = reports[selectedReport] || reports.overview;

  const handleDownloadReport = (reportType) => {
    console.log(`Downloading ${reportType} report`);
    // TODO: Implement report download functionality
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
              View Reports
            </h1>
            <p style={{ color: COLORS.slate, fontSize: 16 }}>
              Access clinic reports and analytics
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 32 }}>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
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
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          
          <select
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
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
            <option value="overview">Clinic Overview</option>
            <option value="financial">Financial Report</option>
            <option value="patient">Patient Analytics</option>
          </select>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleDownloadReport(selectedReport)}
            style={{
              background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
              border: "none",
              borderRadius: 12,
              padding: "12px 20px",
              cursor: "pointer",
              color: COLORS.white,
              fontSize: 14,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 8
            }}
          >
            <Download size={16} />
            Download Report
          </motion.button>
        </div>

        {/* Report Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 32 }}
        >
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: 24, 
            color: COLORS.white, 
            marginBottom: 24,
            fontWeight: 700
          }}>
            {currentReport.title}
          </h2>
          
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
            gap: 20 
          }}>
            {currentReport.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: "#0f172a",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 16,
                  padding: 24,
                  position: "relative",
                  overflow: "hidden"
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-4px)";
                  e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
                  e.target.style.borderColor = COLORS.teal;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                  e.target.style.borderColor = COLORS.border;
                }}
              >
                <div style={{ 
                  position: "absolute", top: 0, right: 0, 
                  width: 60, height: 60, 
                  background: `linear-gradient(135deg, ${COLORS.teal}08, transparent)`,
                  borderRadius: "0 16px 0 60px"
                }} />
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 16 }}>
                  <div style={{ 
                    width: 48, height: 48, borderRadius: 12, 
                    background: `${COLORS.teal}18`, 
                    display: "flex", alignItems: "center", justifyContent: "center" 
                  }}>
                    <stat.icon size={24} color={COLORS.teal} />
                  </div>
                  <div style={{
                    padding: "4px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                    background: stat.trend === "up" ? `${COLORS.teal}18` : `${COLORS.gold}18`,
                    color: stat.trend === "up" ? COLORS.teal : COLORS.gold
                  }}>
                    {stat.change}
                  </div>
                </div>
                
                <div style={{ color: COLORS.white, fontWeight: 700, fontSize: 28, marginBottom: 4 }}>
                  {stat.value}
                </div>
                <div style={{ color: COLORS.slate, fontSize: 14 }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: 24
          }}
        >
          <div style={{
            background: "#0f172a",
            border: `1px solid ${COLORS.border}`,
            borderRadius: 16,
            padding: 24,
            minHeight: 300
          }}>
            <h3 style={{ 
              color: COLORS.white, 
              fontSize: 18, 
              fontWeight: 600, 
              marginBottom: 20 
            }}>
              Revenue Trend
            </h3>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 200,
              background: `${COLORS.teal}08`,
              borderRadius: 12,
              border: `2px dashed ${COLORS.teal}30`
            }}>
              <div style={{ textAlign: "center" }}>
                <BarChart3 size={48} color={COLORS.teal} />
                <p style={{ color: COLORS.slate, fontSize: 14, marginTop: 12 }}>
                  Chart visualization would go here
                </p>
              </div>
            </div>
          </div>

          <div style={{
            background: "#0f172a",
            border: `1px solid ${COLORS.border}`,
            borderRadius: 16,
            padding: 24,
            minHeight: 300
          }}>
            <h3 style={{ 
              color: COLORS.white, 
              fontSize: 18, 
              fontWeight: 600, 
              marginBottom: 20 
            }}>
              Patient Distribution
            </h3>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 200,
              background: `${COLORS.gold}08`,
              borderRadius: 12,
              border: `2px dashed ${COLORS.gold}30`
            }}>
              <div style={{ textAlign: "center" }}>
                <Users size={48} color={COLORS.gold} />
                <p style={{ color: COLORS.slate, fontSize: 14, marginTop: 12 }}>
                  Patient demographics chart
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
