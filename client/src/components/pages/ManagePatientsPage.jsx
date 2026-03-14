import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Phone, Mail, Edit, Trash2, Eye } from "lucide-react";

import { useTheme } from "../../contexts/ThemeContext";
import BackButton from "../common/BackButton";
import Avatar from "../common/Avatar";

export default function ManagePatientsPage({ setView }) {
  const { colors, theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const patients = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@email.com",
      phone: "+91 98765 43210",
      age: 32,
      gender: "Male",
      bloodGroup: "O+",
      lastVisit: "2024-12-15",
      totalVisits: 12,
      status: "active",
      assignedDoctor: "Dr. Ayesha Khan",
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.patel@email.com",
      phone: "+91 98765 43211",
      age: 28,
      gender: "Female",
      bloodGroup: "B+",
      lastVisit: "2024-12-14",
      totalVisits: 8,
      status: "active",
      assignedDoctor: "Dr. Rahul Mehta",
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit.kumar@email.com",
      phone: "+91 98765 43212",
      age: 45,
      gender: "Male",
      bloodGroup: "A+",
      lastVisit: "2024-12-10",
      totalVisits: 15,
      status: "inactive",
      assignedDoctor: "Dr. Priya Sharma",
    },
    {
      id: 4,
      name: "Sneha Reddy",
      email: "sneha.reddy@email.com",
      phone: "+91 98765 43213",
      age: 35,
      gender: "Female",
      bloodGroup: "AB+",
      lastVisit: "2024-12-18",
      totalVisits: 6,
      status: "active",
      assignedDoctor: "Dr. Arjun Patel",
    },
  ];

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm);
    const matchesFilter =
      selectedFilter === "all" || patient.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handlePatientAction = (action, id) => {
    console.log(action, id);
  };

  const isDark = theme !== "white";
  const textPrimary = isDark ? colors.white : "#1a202c";
  const cardBg = isDark ? "#0f172a" : "#fff";
  const cardBorder = isDark
    ? "1px solid rgba(255,255,255,0.05)"
    : "1px solid rgba(0,0,0,0.05)";
  const pageBg = isDark ? colors.navy : colors.cream;

  const filterOptions = ["all", "active", "inactive"];

  return (
    <>
      {/* ── Responsive styles injected once ── */}
      <style>{`
        .mp-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 16px;
        }

        /* Card header: avatar + info left, badge right */
        .mp-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .mp-card-identity {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
        }

        /* Email + phone row under name */
        .mp-contact-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          font-size: 13px;
        }

        .mp-contact-item {
          display: flex;
          align-items: center;
          gap: 4px;
          min-width: 0;
          word-break: break-all;
        }

        /* Info grid: 4 cols on desktop, 2 on mobile */
        .mp-info-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        /* Actions row */
        .mp-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          flex-wrap: wrap;
        }

        .mp-action-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 13px;
          cursor: pointer;
          white-space: nowrap;
          transition: opacity 0.15s;
        }

        .mp-action-btn:hover { opacity: 0.8; }

        /* Filter pills */
        .mp-filters {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .mp-filter-pill {
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: background 0.15s, color 0.15s;
          text-transform: capitalize;
        }

        /* ── Tablet (≤ 700px): 2-col info grid ── */
        @media (max-width: 700px) {
          .mp-info-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* ── Mobile (≤ 480px) ── */
        @media (max-width: 480px) {
          .mp-container {
            padding: 0 12px;
          }

          /* Stack avatar + info block, badge goes below */
          .mp-card-header {
            flex-direction: column;
            align-items: flex-start;
          }

          /* Badge inline after name on very small screens is handled below */
          .mp-badge-wrap {
            align-self: flex-start;
          }

          .mp-contact-row {
            flex-direction: column;
            gap: 6px;
          }

          /* Actions: full-width equally spaced */
          .mp-actions {
            justify-content: stretch;
          }

          .mp-action-btn {
            flex: 1;
            justify-content: center;
            padding: 9px 8px;
            font-size: 12px;
          }

          .mp-info-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }

          .mp-filter-pill {
            flex: 1;
            text-align: center;
          }

          .mp-filters {
            flex-wrap: nowrap;
          }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: pageBg,
          paddingTop: 90,
          paddingBottom: 40,
        }}
      >
        <div className="mp-container">
          {/* BACK + TITLE */}
          <BackButton
            onClick={() => setView("admin-dashboard")}
            text="Back to Dashboard"
            style={{ marginBottom: 20 }}
          />

          <h1
            style={{
              fontSize: "clamp(22px, 5vw, 32px)",
              marginBottom: 16,
              color: textPrimary,
            }}
          >
            Manage Patients
          </h1>

          {/* SEARCH */}
          <div style={{ position: "relative", marginBottom: 16 }}>
            <Search
              size={18}
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                color: colors.slate,
                pointerEvents: "none",
              }}
            />
            <input
              placeholder="Search by name, email or phone…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px 16px 12px 42px",
                borderRadius: 10,
                border: `1px solid ${colors.border}`,
                background: cardBg,
                color: textPrimary,
                fontSize: 14,
                outline: "none",
              }}
            />
          </div>

          {/* FILTER PILLS */}
          <div className="mp-filters">
            {filterOptions.map((f) => {
              const isActive = selectedFilter === f;
              return (
                <button
                  key={f}
                  className="mp-filter-pill"
                  onClick={() => setSelectedFilter(f)}
                  style={{
                    background: isActive
                      ? colors.teal
                      : isDark
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(0,0,0,0.06)",
                    color: isActive ? "#fff" : colors.slate,
                  }}
                >
                  {f === "all" ? "All Patients" : f}
                </button>
              );
            })}
          </div>

          {/* PATIENT CARDS */}
          <div style={{ display: "grid", gap: 16 }}>
            {filteredPatients.length === 0 && (
              <p style={{ color: colors.slate, textAlign: "center", padding: 40 }}>
                No patients found.
              </p>
            )}

            {filteredPatients.map((patient, index) => (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                style={{
                  background: cardBg,
                  border: cardBorder,
                  borderRadius: 14,
                  padding: "18px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                {/* CARD HEADER */}
                <div className="mp-card-header">
                  <div className="mp-card-identity">
                    <Avatar
                      initials={patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                      size={42}
                    />

                    <div style={{ minWidth: 0 }}>
                      <h3
                        style={{
                          margin: "0 0 4px 0",
                          fontSize: "clamp(15px, 3vw, 18px)",
                          fontWeight: 600,
                          color: textPrimary,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {patient.name}
                      </h3>

                      <div className="mp-contact-row" style={{ color: colors.slate }}>
                        <span className="mp-contact-item">
                          <Mail size={13} style={{ flexShrink: 0 }} />
                          {patient.email}
                        </span>
                        <span className="mp-contact-item">
                          <Phone size={13} style={{ flexShrink: 0 }} />
                          {patient.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* STATUS BADGE */}
                  <span
                    className="mp-badge-wrap"
                    style={{
                      padding: "4px 12px",
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.03em",
                      textTransform: "uppercase",
                      background:
                        patient.status === "active"
                          ? `${colors.teal}20`
                          : `${colors.slate}20`,
                      color:
                        patient.status === "active" ? colors.teal : colors.slate,
                      flexShrink: 0,
                    }}
                  >
                    {patient.status}
                  </span>
                </div>

                {/* INFO GRID */}
                <div className="mp-info-grid">
                  {[
                    { label: "Age / Gender", value: `${patient.age} / ${patient.gender}` },
                    { label: "Blood Group",  value: patient.bloodGroup },
                    { label: "Last Visit",   value: patient.lastVisit },
                    { label: "Visits",       value: patient.totalVisits },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p style={{ margin: "0 0 2px", fontSize: 12, color: colors.slate }}>
                        {label}
                      </p>
                      <strong style={{ fontSize: 14, color: textPrimary }}>{value}</strong>
                    </div>
                  ))}
                </div>

                {/* ACTIONS */}
                <div className="mp-actions">
                  <button
                    className="mp-action-btn"
                    onClick={() => handlePatientAction("view", patient.id)}
                    style={{
                      background: `${colors.teal}15`,
                      border: `1px solid ${colors.teal}30`,
                      color: colors.teal,
                    }}
                  >
                    <Eye size={15} /> View
                  </button>

                  <button
                    className="mp-action-btn"
                    onClick={() => handlePatientAction("edit", patient.id)}
                    style={{
                      background: `${colors.gold}15`,
                      border: `1px solid ${colors.gold}30`,
                      color: colors.gold,
                    }}
                  >
                    <Edit size={15} /> Edit
                  </button>

                  <button
                    className="mp-action-btn"
                    onClick={() => handlePatientAction("delete", patient.id)}
                    style={{
                      background: `${colors.red}15`,
                      border: `1px solid ${colors.red}30`,
                      color: colors.red,
                    }}
                  >
                    <Trash2 size={15} /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}