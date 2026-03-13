import { useState } from "react";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Heart,
  Shield,
  Users,
  Clock,
  Award,
  ChevronRight
} from "lucide-react";
import { COLORS } from "../../constants/colors";
import Link from "../common/Link";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail("");
    }
  };

  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "Online Booking", href: "#" },
        { name: "Video Consultation", href: "#" },
        { name: "Emergency Care", href: "#" },
        { name: "Health Checkup", href: "#" },
        { name: "Prescription Upload", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Our Doctors", href: "#" },
        { name: "Clinics", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Contact Us", href: "#" },
        { name: "FAQs", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Health Blog", href: "#" },
        { name: "Medical Library", href: "#" },
        { name: "Patient Portal", href: "#" },
        { name: "Doctor App", href: "#" },
        { name: "API Access", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  const contactInfo = [
    { icon: Phone, text: "+91 98765 43210", label: "Emergency" },
    { icon: Mail, text: "support@cliniqpro.com", label: "Email" },
    { icon: MapPin, text: "Mumbai, Delhi, Bangalore, Pune", label: "Locations" }
  ];

  return (
    <footer style={{ background: COLORS.navy, borderTop: `1px solid ${COLORS.border}` }}>
      {/* Main Footer Content */}
      <div style={{ padding: "60px 32px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          
          {/* Top Section */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
            gap: 40, 
            marginBottom: 60 
          }}>
            
            {/* Brand Column */}
            <div style={{ minWidth: 280 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: 10, 
                  background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`, 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center" 
                }}>
                  <Stethoscope size={20} color="#fff" />
                </div>
                <div>
                  <h3 style={{ 
                    fontFamily: "'Playfair Display', serif", 
                    fontSize: 22, 
                    fontWeight: 700, 
                    color: COLORS.white,
                    marginBottom: 2
                  }}>
                    Cliniq<span style={{ color: COLORS.teal }}>Pro</span>
                  </h3>
                  <p style={{ color: COLORS.slate, fontSize: 12 }}>Modern Healthcare Solution</p>
                </div>
              </div>
              
              <p style={{ color: COLORS.slate, fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
                Your trusted partner for comprehensive healthcare services. 
                Connecting patients with qualified doctors across India.
              </p>

              {/* Contact Info */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 32,
                        height: 32,
                        background: `${COLORS.teal}15`,
                        borderRadius: 6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <Icon size={16} color={COLORS.teal} />
                      </div>
                      <div>
                        <p style={{ color: COLORS.white, fontSize: 14, margin: 0 }}>{info.text}</p>
                        <p style={{ color: COLORS.slate, fontSize: 11, margin: 0 }}>{info.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div style={{ display: "flex", gap: 12 }}>
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.1, backgroundColor: `${COLORS.teal}20` }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        width: 36,
                        height: 36,
                        background: "#0f172a",
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: 8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        textDecoration: "none"
                      }}
                      aria-label={social.label}
                    >
                      <Icon size={16} color={COLORS.slate} />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Links Columns */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 style={{ 
                  color: COLORS.white, 
                  fontSize: 16, 
                  fontWeight: 600, 
                  marginBottom: 20,
                  fontFamily: "'Playfair Display', serif"
                }}>
                  {section.title}
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {section.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.href}
                      style={{
                        color: COLORS.slate,
                        fontSize: 14,
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = COLORS.teal;
                        e.target.style.transform = "translateX(4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = COLORS.slate;
                        e.target.style.transform = "translateX(0)";
                      }}
                    >
                      <ChevronRight size={12} />
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Newsletter Column */}
            <div>
              <h4 style={{ 
                color: COLORS.white, 
                fontSize: 16, 
                fontWeight: 600, 
                marginBottom: 20,
                fontFamily: "'Playfair Display', serif"
              }}>
                Stay Updated
              </h4>
              <p style={{ color: COLORS.slate, fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                Subscribe to our newsletter for health tips and exclusive offers.
              </p>
              
              <form onSubmit={handleSubscribe} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    background: "#0f172a",
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 8,
                    padding: "12px 16px",
                    color: COLORS.white,
                    fontSize: 14,
                    outline: "none"
                  }}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
                    border: "none",
                    borderRadius: 8,
                    padding: "12px 20px",
                    cursor: "pointer",
                    color: COLORS.white,
                    fontSize: 14,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8
                  }}
                >
                  Subscribe
                  <ChevronRight size={16} />
                </motion.button>
              </form>

              {/* Trust Badges */}
              <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  { icon: Shield, text: "Secure" },
                  { icon: Users, text: "10K+ Users" },
                  { icon: Clock, text: "24/7" },
                  { icon: Award, text: "Certified" }
                ].map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        background: `${COLORS.teal}15`,
                        padding: "6px 12px",
                        borderRadius: 20,
                        border: `1px solid ${COLORS.teal}30`
                      }}
                    >
                      <Icon size={12} color={COLORS.teal} />
                      <span style={{ color: COLORS.teal, fontSize: 11, fontWeight: 600 }}>
                        {badge.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Features Row */}
          <div style={{
            background: "#0f172a",
            border: `1px solid ${COLORS.border}`,
            borderRadius: 12,
            padding: 24,
            marginBottom: 40
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 32
            }}>
              {[
                { icon: Shield, title: "Secure & Private", desc: "Your health data is protected" },
                { icon: Clock, title: "24/7 Support", desc: "Always here to help you" },
                { icon: Users, title: "Expert Doctors", desc: "Qualified healthcare professionals" },
                { icon: Heart, title: "Patient First", desc: "Your health is our priority" }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} style={{ display: "flex", gap: 16 }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      background: `${COLORS.teal}15`,
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}>
                      <Icon size={20} color={COLORS.teal} />
                    </div>
                    <div>
                      <h4 style={{ color: COLORS.white, fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
                        {feature.title}
                      </h4>
                      <p style={{ color: COLORS.slate, fontSize: 12, margin: 0 }}>
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        background: "#0a0f1f",
        borderTop: `1px solid ${COLORS.border}`,
        padding: "20px 32px"
      }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20
        }}>
          <div style={{ color: COLORS.slate, fontSize: 13 }}>
            © 2025 CliniqPro. All rights reserved. Built with <Heart size={12} color={COLORS.teal} /> for modern healthcare.
          </div>
          
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {[
              "HIPAA Compliant",
              "ISO Certified",
              "GDPR Ready"
            ].map((cert, index) => (
              <span key={index} style={{
                color: COLORS.teal,
                fontSize: 11,
                fontWeight: 600,
                background: `${COLORS.teal}15`,
                padding: "4px 8px",
                borderRadius: 4
              }}>
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
