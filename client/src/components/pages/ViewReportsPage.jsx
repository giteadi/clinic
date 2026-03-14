import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, TrendingDown, Calendar, Download, Filter, FileText, Users, DollarSign, Activity, Clock } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import BackButton from "../common/BackButton";

export default function ViewReportsPage({ setView }) {
  const { colors, theme } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedReport, setSelectedReport] = useState("overview");

  const isDark = theme !== "white";

  // ── Semantic tokens ──────────────────────────────────────────────
  const pageBg      = isDark ? colors.navy      : colors.cream;
  const cardBg      = isDark ? "#0f172a"        : "#ffffff";
  const cardBorder  = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const textPrimary = isDark ? colors.white     : "#1a202c";
  const textHeading = isDark ? colors.white     : colors.slate;
  const textMuted   = colors.slate;
  const inputBg     = isDark ? colors.navyLight : "#ffffff";
  const inputColor  = isDark ? colors.white     : "#1a202c";
  // ─────────────────────────────────────────────────────────────────

  const reports = {
    overview: {
      title: "Clinic Overview",
      stats: [
        { label: "Total Revenue",    value: "₹4,85,000", change: "+15.3%", trend: "up",   icon: DollarSign },
        { label: "Total Patients",   value: "1,247",      change: "+8.2%",  trend: "up",   icon: Users      },
        { label: "Appointments",     value: "892",        change: "-2.1%",  trend: "down", icon: Calendar   },
        { label: "Active Doctors",   value: "12",         change: "+16.7%", trend: "up",   icon: Activity   },
      ],
    },
    financial: {
      title: "Financial Report",
      stats: [
        { label: "Monthly Revenue",    value: "₹2,45,000", change: "+12.5%", trend: "up",   icon: DollarSign  },
        { label: "Consultation Fees",  value: "₹1,78,000", change: "+10.2%", trend: "up",   icon: DollarSign  },
        { label: "Lab Tests",          value: "₹45,000",   change: "+8.7%",  trend: "up",   icon: FileText    },
        { label: "Expenses",           value: "₹67,000",   change: "-5.3%",  trend: "down", icon: TrendingDown },
      ],
    },
    patient: {
      title: "Patient Analytics",
      stats: [
        { label: "New Patients",          value: "156",     change: "+18.4%", trend: "up",   icon: Users      },
        { label: "Returning Patients",    value: "892",     change: "+6.2%",  trend: "up",   icon: Users      },
        { label: "Patient Satisfaction",  value: "4.8/5",   change: "+0.2",   trend: "up",   icon: TrendingUp },
        { label: "Avg. Wait Time",        value: "12 min",  change: "-18%",   trend: "down", icon: Clock      },
      ],
    },
  };

  const currentReport = reports[selectedReport] || reports.overview;

  const handleDownloadReport = (reportType) => {
    console.log(`Downloading ${reportType} report`);
  };

  return (
    <div style={{ minHeight: "100vh", background: pageBg, paddingTop: 80, paddingBottom: 40 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>

        {/* ── Header ── */}
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
              color: textHeading,
              marginBottom: 8,
            }}>
              View Reports
            </h1>
            <p style={{ color: textMuted, fontSize: 16, margin: 0 }}>
              Access clinic reports and analytics
            </p>
          </motion.div>
        </div>

        {/* ── Filters ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            style={{
              background: inputBg,
              border: `1px solid ${cardBorder}`,
              borderRadius: 12,
              padding: "12px 16px",
              color: inputColor,
              fontSize: 14,
              cursor: "pointer",
              outline: "none",
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
              background: inputBg,
              border: `1px solid ${cardBorder}`,
              borderRadius: 12,
              padding: "12px 16px",
              color: inputColor,
              fontSize: 14,
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="overview">Clinic Overview</option>
            <option value="financial">Financial Report</option>
            <option value="patient">Patient Analytics</option>
          </select>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => handleDownloadReport(selectedReport)}
            style={{
              background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
              border: "none",
              borderRadius: 12,
              padding: "12px 20px",
              cursor: "pointer",
              color: "#ffffff",          /* always white on teal gradient */
              fontSize: 14,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <Download size={16} />
            Download Report
          </motion.button>
        </div>

        {/* ── Stats Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 32 }}
        >
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 24,
            color: textHeading,
            marginBottom: 24,
            fontWeight: 700,
          }}>
            {currentReport.title}
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
          }}>
            {currentReport.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                  borderRadius: 16,
                  padding: 24,
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color 0.2s",
                }}
              >
                {/* decorative corner */}
                <div style={{
                  position: "absolute", top: 0, right: 0,
                  width: 60, height: 60,
                  background: `linear-gradient(135deg, ${colors.teal}10, transparent)`,
                  borderRadius: "0 16px 0 60px",
                }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 16 }}>
                  {/* icon */}
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: `${colors.teal}18`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <stat.icon size={24} color={colors.teal} />
                  </div>

                  {/* trend badge */}
                  <div style={{
                    padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                    background: stat.trend === "up" ? `${colors.teal}18` : `${colors.gold}18`,
                    color:      stat.trend === "up" ? colors.teal        : colors.gold,
                  }}>
                    {stat.change}
                  </div>
                </div>

                {/* value */}
                <div style={{ color: textPrimary, fontWeight: 700, fontSize: 28, marginBottom: 4 }}>
                  {stat.value}
                </div>

                {/* label */}
                <div style={{ color: textMuted, fontSize: 14 }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Charts Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {/* Revenue Trend */}
          <div style={{
            background: cardBg,
            border: `1px solid ${cardBorder}`,
            borderRadius: 16,
            padding: 24,
            minHeight: 300,
          }}>
            <h3 style={{ color: textPrimary, fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
              Revenue Trend
            </h3>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              height: 200,
              background: `${colors.teal}08`,
              borderRadius: 12,
              border: `2px dashed ${colors.teal}40`,
            }}>
              <div style={{ textAlign: "center" }}>
                <BarChart3 size={48} color={colors.teal} />
                <p style={{ color: textMuted, fontSize: 14, marginTop: 12 }}>
                  Chart visualization would go here
                </p>
              </div>
            </div>
          </div>

          {/* Patient Distribution */}
          <div style={{
            background: cardBg,
            border: `1px solid ${cardBorder}`,
            borderRadius: 16,
            padding: 24,
            minHeight: 300,
          }}>
            <h3 style={{ color: textPrimary, fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
              Patient Distribution
            </h3>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              height: 200,
              background: `${colors.gold}08`,
              borderRadius: 12,
              border: `2px dashed ${colors.gold}40`,
            }}>
              <div style={{ textAlign: "center" }}>
                <Users size={48} color={colors.gold} />
                <p style={{ color: textMuted, fontSize: 14, marginTop: 12 }}>
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