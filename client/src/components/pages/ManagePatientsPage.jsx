import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Users, Calendar, Phone, Mail, Filter, ChevronRight, Edit, Trash2, Eye } from "lucide-react";
import { COLORS } from "../../constants/colors";
import BackButton from "../common/BackButton";
import Avatar from "../common/Avatar";

export default function ManagePatientsPage({ setView }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock patients data
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
      assignedDoctor: "Dr. Ayesha Khan"
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
      assignedDoctor: "Dr. Rahul Mehta"
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
      assignedDoctor: "Dr. Priya Sharma"
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
      assignedDoctor: "Dr. Arjun Patel"
    }
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm);
    const matchesFilter = selectedFilter === "all" || patient.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handlePatientAction = (action, patientId) => {
    console.log(`${action} patient ${patientId}`);
    // TODO: Implement patient actions
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
              Manage Patients
            </h1>
            <p style={{ color: COLORS.slate, fontSize: 16 }}>
              View and manage patient records and information
            </p>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20, marginBottom: 32 }}>
          <div style={{ position: "relative" }}>
            <Search size={20} color={COLORS.slate} style={{ position: "absolute", left: 16, top: 14 }} />
            <input
              type="text"
              placeholder="Search patients by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                background: "#0f172a",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 12,
                padding: "12px 16px 12px 48px",
                color: COLORS.white,
                fontSize: 14,
                outline: "none"
              }}
            />
          </div>
          
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
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
            <option value="all">All Patients</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Results Count */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ color: COLORS.slate, fontSize: 14 }}>
            Found {filteredPatients.length} patients
          </p>
        </div>

        {/* Patients List */}
        <div style={{ display: "grid", gap: 20 }}>
          {filteredPatients.map((patient, index) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                background: "#0f172a",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 16,
                padding: 24,
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
                e.target.style.borderColor = COLORS.teal;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
                e.target.style.borderColor = COLORS.border;
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 24, alignItems: "start" }}>
                
                {/* Patient Avatar */}
                <Avatar 
                  initials={patient.name.split(' ').map(n => n[0]).join('')}
                  color={patient.status === "active" ? COLORS.teal : COLORS.slate}
                  size={60}
                />

                {/* Patient Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: 16 }}>
                    <h3 style={{ color: COLORS.white, fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
                      {patient.name}
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, color: COLORS.slate, fontSize: 13 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Mail size={14} />
                        {patient.email}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Phone size={14} />
                        {patient.phone}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16 }}>
                    <div>
                      <p style={{ color: COLORS.slate, fontSize: 11, marginBottom: 2 }}>Age / Gender</p>
                      <p style={{ color: COLORS.white, fontSize: 13, fontWeight: 600 }}>
                        {patient.age} / {patient.gender}
                      </p>
                    </div>
                    <div>
                      <p style={{ color: COLORS.slate, fontSize: 11, marginBottom: 2 }}>Blood Group</p>
                      <p style={{ color: COLORS.white, fontSize: 13, fontWeight: 600 }}>
                        {patient.bloodGroup}
                      </p>
                    </div>
                    <div>
                      <p style={{ color: COLORS.slate, fontSize: 11, marginBottom: 2 }}>Last Visit</p>
                      <p style={{ color: COLORS.white, fontSize: 13, fontWeight: 600 }}>
                        {patient.lastVisit}
                      </p>
                    </div>
                    <div>
                      <p style={{ color: COLORS.slate, fontSize: 11, marginBottom: 2 }}>Total Visits</p>
                      <p style={{ color: COLORS.white, fontSize: 13, fontWeight: 600 }}>
                        {patient.totalVisits}
                      </p>
                    </div>
                    <div>
                      <p style={{ color: COLORS.slate, fontSize: 11, marginBottom: 2 }}>Assigned Doctor</p>
                      <p style={{ color: COLORS.teal, fontSize: 13, fontWeight: 600 }}>
                        {patient.assignedDoctor}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                  <div style={{
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 600,
                    background: patient.status === "active" ? `${COLORS.teal}18` : `${COLORS.slate}18`,
                    color: patient.status === "active" ? COLORS.teal : COLORS.slate,
                    marginBottom: 12
                  }}>
                    {patient.status}
                  </div>
                  
                  <div style={{ display: "flex", gap: 8 }}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePatientAction("view", patient.id)}
                      style={{
                        background: `${COLORS.teal}15`,
                        border: `1px solid ${COLORS.teal}30`,
                        borderRadius: 8,
                        padding: "8px",
                        cursor: "pointer",
                        color: COLORS.teal
                      }}
                    >
                      <Eye size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePatientAction("edit", patient.id)}
                      style={{
                        background: `${COLORS.gold}15`,
                        border: `1px solid ${COLORS.gold}30`,
                        borderRadius: 8,
                        padding: "8px",
                        cursor: "pointer",
                        color: COLORS.gold
                      }}
                    >
                      <Edit size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePatientAction("delete", patient.id)}
                      style={{
                        background: `${COLORS.red}15`,
                        border: `1px solid ${COLORS.red}30`,
                        borderRadius: 8,
                        padding: "8px",
                        cursor: "pointer",
                        color: COLORS.red
                      }}
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredPatients.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            background: "#0f172a",
            border: `1px solid ${COLORS.border}`,
            borderRadius: 16
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>👥</div>
            <h3 style={{ color: COLORS.white, fontSize: 20, marginBottom: 8 }}>
              No patients found
            </h3>
            <p style={{ color: COLORS.slate, fontSize: 14 }}>
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
