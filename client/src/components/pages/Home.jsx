import { useState } from "react";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Users,
  Calendar,
  Clock,
  MapPin,
  Star,
  Phone,
  Mail,
  ChevronRight,
  Play,
  Shield,
  Heart,
  Award,
  TrendingUp
} from "lucide-react";
import { COLORS } from "../../constants/colors";
import Avatar from "../common/Avatar";

export default function Home({ setView }) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const features = [
    {
      icon: Stethoscope,
      title: "Expert Doctors",
      description: "Qualified and experienced healthcare professionals",
      color: COLORS.teal
    },
    {
      icon: Calendar,
      title: "Easy Booking",
      description: "Book appointments online in just a few clicks",
      color: COLORS.gold
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your health data is protected with advanced security",
      color: "#7C3AED"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your needs",
      color: "#059669"
    }
  ];

  const stats = [
    { label: "Expert Doctors", value: "500+", icon: Users },
    { label: "Happy Patients", value: "50K+", icon: Heart },
    { label: "Clinics Nationwide", value: "25+", icon: MapPin },
    { label: "Years of Trust", value: "10+", icon: Award }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Patient",
      content: "Excellent service! The doctors are very professional and the booking process is so convenient.",
      rating: 5,
      avatar: "PS"
    },
    {
      name: "Rahul Mehta",
      role: "Patient",
      content: "I love how easy it is to book appointments. The best healthcare platform I've used!",
      rating: 5,
      avatar: "RM"
    },
    {
      name: "Ananya Patel",
      role: "Patient",
      content: "Great experience with video consultations. Very helpful during the pandemic.",
      rating: 5,
      avatar: "AP"
    }
  ];

  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "General Physician",
      experience: "10+ years",
      rating: 4.8,
      image: "SJ",
      color: COLORS.teal
    },
    {
      name: "Dr. Rahul Mehta",
      specialty: "Cardiologist",
      experience: "15+ years",
      rating: 4.9,
      image: "RM",
      color: "#7C3AED"
    },
    {
      name: "Dr. Priya Sharma",
      specialty: "Pediatrician",
      experience: "8+ years",
      rating: 4.7,
      image: "PS",
      color: "#059669"
    }
  ];

  return (
    <div style={{ minHeight: "100vh", background: COLORS.navy }}>
      
      {/* Hero Section */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: 80
      }}>
        {/* Background Effects */}
        <div style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.teal}12, transparent 70%)`,
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.gold}10, transparent 70%)`,
          pointerEvents: "none"
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: `${COLORS.teal}18`,
                border: `1px solid ${COLORS.teal}30`,
                borderRadius: 30,
                padding: "6px 16px",
                marginBottom: 24
              }}>
                <TrendingUp size={16} color={COLORS.teal} />
                <span style={{ color: COLORS.teal, fontSize: 12, fontWeight: 600 }}>
                  TRUSTED BY 50,000+ PATIENTS
                </span>
              </div>

              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(36px, 5vw, 56px)",
                color: COLORS.white,
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: 24
              }}>
                Your Health,
                <br />
                <span style={{ color: COLORS.teal }}>Our Priority</span>
              </h1>

              <p style={{
                color: COLORS.slate,
                fontSize: 18,
                lineHeight: 1.6,
                marginBottom: 40
              }}>
                Connect with expert doctors, book appointments instantly, and manage your health journey with CliniQ Pro - your trusted healthcare partner.
              </p>

              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setView("clinic-selection")}
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
                    border: "none",
                    borderRadius: 12,
                    padding: "16px 32px",
                    cursor: "pointer",
                    color: COLORS.white,
                    fontSize: 16,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 8
                  }}
                >
                  Book Appointment
                  <ChevronRight size={20} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setView("doctors")}
                  style={{
                    background: "none",
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 12,
                    padding: "16px 32px",
                    cursor: "pointer",
                    color: COLORS.white,
                    fontSize: 16,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 8
                  }}
                >
                  <Play size={20} />
                  Find Doctors
                </motion.button>
              </div>

              {/* Quick Stats */}
              <div style={{
                display: "flex",
                gap: 40,
                marginTop: 60
              }}>
                {stats.slice(0, 3).map((stat, index) => (
                  <div key={index}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                      <stat.icon size={20} color={COLORS.teal} />
                      <span style={{ color: COLORS.white, fontSize: 28, fontWeight: 700 }}>
                        {stat.value}
                      </span>
                    </div>
                    <p style={{ color: COLORS.slate, fontSize: 14, margin: 0 }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Hero Image/Animation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ position: "relative" }}
            >
              <div style={{
                width: "100%",
                height: 500,
                background: "#0f172a",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden"
              }}>
                <div style={{
                  fontSize: 120,
                  opacity: 0.1,
                  position: "absolute"
                }}>
                  🏥
                </div>
                <div style={{ textAlign: "center", zIndex: 1 }}>
                  <div style={{
                    width: 120,
                    height: 120,
                    background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    fontSize: 48
                  }}>
                    💙
                  </div>
                  <h3 style={{ color: COLORS.white, fontSize: 24, fontWeight: 600, marginBottom: 8 }}>
                    CliniQ Pro
                  </h3>
                  <p style={{ color: COLORS.slate, fontSize: 16 }}>
                    Modern Healthcare Solution
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "80px 20px", background: "#0a0f1f" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: 60 }}
          >
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 4vw, 48px)",
              color: COLORS.white,
              marginBottom: 16
            }}>
              Why Choose CliniQ Pro?
            </h2>
            <p style={{ color: COLORS.slate, fontSize: 18, maxWidth: 600, margin: "0 auto" }}>
              We provide comprehensive healthcare solutions with cutting-edge technology and compassionate care
            </p>
          </motion.div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 30
          }}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    background: "#0f172a",
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 16,
                    padding: 32,
                    textAlign: "center"
                  }}
                >
                  <div style={{
                    width: 60,
                    height: 60,
                    background: `${feature.color}15`,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px"
                  }}>
                    <Icon size={28} color={feature.color} />
                  </div>
                  <h3 style={{ color: COLORS.white, fontSize: 20, fontWeight: 600, marginBottom: 12 }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: COLORS.slate, fontSize: 14, lineHeight: 1.6 }}>
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Doctors Section */}
      <section style={{ padding: "80px 20px", background: COLORS.navy }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: 60 }}
          >
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 4vw, 48px)",
              color: COLORS.white,
              marginBottom: 16
            }}>
              Meet Our Expert Doctors
            </h2>
            <p style={{ color: COLORS.slate, fontSize: 18, maxWidth: 600, margin: "0 auto" }}>
              Highly qualified healthcare professionals dedicated to your well-being
            </p>
          </motion.div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 30
          }}>
            {doctors.map((doctor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: "#0f172a",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 16,
                  padding: 24,
                  cursor: "pointer",
                  transition: "all 0.3s"
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-8px)";
                  e.target.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
                  e.target.style.borderColor = COLORS.teal;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                  e.target.style.borderColor = COLORS.border;
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                  <Avatar initials={doctor.image} color={doctor.color} size={60} />
                  <div>
                    <h3 style={{ color: COLORS.white, fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
                      {doctor.name}
                    </h3>
                    <p style={{ color: COLORS.teal, fontSize: 14, marginBottom: 2 }}>
                      {doctor.specialty}
                    </p>
                    <p style={{ color: COLORS.slate, fontSize: 12 }}>
                      {doctor.experience}
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Star size={16} color={COLORS.gold} />
                    <span style={{ color: COLORS.white, fontSize: 16, fontWeight: 600 }}>
                      {doctor.rating}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setView("doctors")}
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
                      border: "none",
                      borderRadius: 8,
                      padding: "8px 16px",
                      cursor: "pointer",
                      color: COLORS.white,
                      fontSize: 14,
                      fontWeight: 600
                    }}
                  >
                    View Profile
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: "80px 20px", background: "#0a0f1f" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: 60 }}
          >
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 4vw, 48px)",
              color: COLORS.white,
              marginBottom: 16
            }}>
              What Our Patients Say
            </h2>
            <p style={{ color: COLORS.slate, fontSize: 18, maxWidth: 600, margin: "0 auto" }}>
              Real stories from real patients who trust us with their health
            </p>
          </motion.div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: 30
          }}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: "#0f172a",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 16,
                  padding: 32
                }}
              >
                <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} color={COLORS.gold} />
                  ))}
                </div>
                <p style={{ color: COLORS.white, fontSize: 16, lineHeight: 1.6, marginBottom: 24, fontStyle: "italic" }}>
                  "{testimonial.content}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <Avatar initials={testimonial.avatar} color={COLORS.teal} size={40} />
                  <div>
                    <h4 style={{ color: COLORS.white, fontSize: 16, fontWeight: 600, marginBottom: 2 }}>
                      {testimonial.name}
                    </h4>
                    <p style={{ color: COLORS.slate, fontSize: 14, margin: 0 }}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: "80px 20px", background: COLORS.navy }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 4vw, 48px)",
              color: COLORS.white,
              marginBottom: 24
            }}>
              Ready to Take Control of Your Health?
            </h2>
            <p style={{ color: COLORS.slate, fontSize: 18, marginBottom: 40 }}>
              Join thousands of satisfied patients who trust CliniQ Pro for their healthcare needs
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView("clinic-selection")}
              style={{
                background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
                border: "none",
                borderRadius: 12,
                padding: "16px 40px",
                cursor: "pointer",
                color: COLORS.white,
                fontSize: 18,
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: 8
              }}
            >
              Get Started Now
              <ChevronRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
