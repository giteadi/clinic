import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff, Stethoscope, LogIn, UserPlus } from "lucide-react";
import { COLORS } from "../../constants/colors";
import { loginSuccess, loginFailure, clearError } from "../../store/authSlice";

export default function LoginPage({ setView }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);
  
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    role: "patient"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    // Mock authentication logic
    try {
      if (isLogin) {
        // Login logic
        if (formData.email === "admin@clinic.com" && formData.password === "admin123") {
          const user = {
            id: 1,
            name: "Admin User",
            email: formData.email,
            role: "admin",
            clinicId: 1,
            phone: "+91 98765 43210"
          };
          dispatch(loginSuccess({ user, token: "mock-admin-token" }));
          setView("admin-dashboard");
        } else if (formData.email === "superadmin@clinic.com" && formData.password === "super123") {
          const user = {
            id: 2,
            name: "Super Admin",
            email: formData.email,
            role: "superadmin",
            phone: "+91 98765 43211"
          };
          dispatch(loginSuccess({ user, token: "mock-super-token" }));
          setView("superadmin-dashboard");
        } else if (formData.email === "patient@clinic.com" && formData.password === "patient123") {
          const user = {
            id: 3,
            name: "John Doe",
            email: formData.email,
            role: "patient",
            phone: "+91 98765 43212",
            linkedClinic: {
              id: 1,
              name: "City Medical Center",
              address: "123 MG Road, Mumbai",
              phone: "+91 22 2345 6789",
              rating: 4.8,
              doctors: 25,
              specialties: ["General", "Cardiology", "Orthopedics"],
              image: "🏥",
              timings: "24/7",
              distance: "2.5 km",
              availableSlots: 45
            }
          };
          dispatch(loginSuccess({ user, token: "mock-patient-token" }));
          setView("patient-dashboard");
        } else {
          // Generic patient login (for demo)
          const user = {
            id: Math.floor(Math.random() * 1000),
            name: formData.email.split("@")[0],
            email: formData.email,
            role: "patient",
            phone: formData.phone || "+91 98765 43210",
            linkedClinic: {
              id: 1,
              name: "City Medical Center",
              address: "123 MG Road, Mumbai",
              phone: "+91 22 2345 6789",
              rating: 4.8,
              doctors: 25,
              specialties: ["General", "Cardiology", "Orthopedics"],
              image: "🏥",
              timings: "24/7",
              distance: "2.5 km",
              availableSlots: 45
            }
          };
          dispatch(loginSuccess({ user, token: "mock-patient-token" }));
          setView("patient-dashboard");
        }
      } else {
        // Registration logic
        const user = {
          id: Math.floor(Math.random() * 1000),
          name: formData.name,
          email: formData.email,
          role: formData.role,
          phone: formData.phone
        };
        dispatch(loginSuccess({ user, token: "mock-register-token" }));
        
        // Redirect based on role
        if (formData.role === "admin") {
          setView("admin-dashboard");
        } else if (formData.role === "superadmin") {
          setView("superadmin-dashboard");
        } else {
          setView("patient-dashboard");
        }
      }
    } catch (err) {
      dispatch(loginFailure("Login failed. Please try again."));
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: COLORS.navy,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "clamp(20px, 5vw, 32px)",
      position: "relative"
    }}>
      {/* Background Effects */}
      <div style={{
        position: "absolute", top: -100, left: -100,
        width: "clamp(300px, 40vw, 400px)", height: "clamp(300px, 40vw, 400px)",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.teal}12, transparent 70%)`,
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", bottom: -80, right: -80,
        width: "clamp(250px, 35vw, 350px)", height: "clamp(250px, 35vw, 350px)",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.gold}10, transparent 70%)`,
        pointerEvents: "none"
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: "100%",
          maxWidth: "450px",
          position: "relative",
          zIndex: 1
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => setView("home")}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "none", border: "none", cursor: "pointer",
            color: COLORS.slate, marginBottom: 24,
            fontSize: 14, fontWeight: 500
          }}
        >
          <ArrowLeft size={18} /> Back to Home
        </button>

        {/* Login Card */}
        <div style={{
          background: `${COLORS.navy}F0`,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 24, padding: "clamp(32px, 5vw, 40px)",
          backdropFilter: "blur(20px)"
        }}>
          {/* Logo and Title */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16,
              background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px"
            }}>
              <Stethoscope size={32} color="#fff" />
            </div>
            
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(24px, 4vw, 32px)",
              color: COLORS.white, fontWeight: 700, marginBottom: 8
            }}>
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p style={{ color: COLORS.slate, fontSize: 14, lineHeight: 1.5 }}>
              {isLogin 
                ? "Sign in to access your healthcare dashboard"
                : "Join us to manage your healthcare journey"
              }
            </p>
          </div>

          {/* Toggle Login/Register */}
          <div style={{
            display: "flex", background: `${COLORS.navy}F0`,
            border: `1px solid ${COLORS.border}`, borderRadius: 12,
            padding: 4, marginBottom: 32
          }}>
            <button
              onClick={() => setIsLogin(true)}
              style={{
                flex: 1, padding: "8px 16px", border: "none",
                borderRadius: 8, background: isLogin ? COLORS.teal : "none",
                color: COLORS.white, fontSize: 14, fontWeight: 600,
                cursor: "pointer", transition: "all 0.2s ease"
              }}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              style={{
                flex: 1, padding: "8px 16px", border: "none",
                borderRadius: 8, background: !isLogin ? COLORS.teal : "none",
                color: COLORS.white, fontSize: 14, fontWeight: 600,
                cursor: "pointer", transition: "all 0.2s ease"
              }}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 20 }}>
            {/* Registration Fields */}
            {!isLogin && (
              <>
                <div>
                  <label style={{ 
                    display: "block", color: COLORS.white, 
                    fontSize: 14, fontWeight: 500, marginBottom: 8 
                  }}>
                    Full Name
                  </label>
                  <div style={{ position: "relative" }}>
                    <User size={20} color={COLORS.slate} style={{
                      position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)"
                    }} />
                    <input
                      type="text"
                      name="name"
                      required={!isLogin}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      style={{
                        width: "100%", padding: "12px 16px 12px 48px",
                        background: `${COLORS.navy}F0`,
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: 12, color: COLORS.white,
                        fontSize: 14, outline: "none"
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ 
                    display: "block", color: COLORS.white, 
                    fontSize: 14, fontWeight: 500, marginBottom: 8 
                  }}>
                    Phone Number
                  </label>
                  <div style={{ position: "relative" }}>
                    <Mail size={20} color={COLORS.slate} style={{
                      position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)"
                    }} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      style={{
                        width: "100%", padding: "12px 16px 12px 48px",
                        background: `${COLORS.navy}F0`,
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: 12, color: COLORS.white,
                        fontSize: 14, outline: "none"
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ 
                    display: "block", color: COLORS.white, 
                    fontSize: 14, fontWeight: 500, marginBottom: 8 
                  }}>
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    style={{
                      width: "100%", padding: "12px 16px",
                      background: `${COLORS.navy}F0`,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 12, color: COLORS.white,
                      fontSize: 14, outline: "none"
                    }}
                  >
                    <option value="patient" style={{ background: COLORS.navy }}>Patient</option>
                    <option value="admin" style={{ background: COLORS.navy }}>Clinic Admin</option>
                    <option value="superadmin" style={{ background: COLORS.navy }}>Super Admin</option>
                  </select>
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label style={{ 
                display: "block", color: COLORS.white, 
                fontSize: 14, fontWeight: 500, marginBottom: 8 
              }}>
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={20} color={COLORS.slate} style={{
                  position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)"
                }} />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  style={{
                    width: "100%", padding: "12px 16px 12px 48px",
                    background: `${COLORS.navy}F0`,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 12, color: COLORS.white,
                    fontSize: 14, outline: "none"
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ 
                display: "block", color: COLORS.white, 
                fontSize: 14, fontWeight: 500, marginBottom: 8 
              }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock size={20} color={COLORS.slate} style={{
                  position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)"
                }} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  style={{
                    width: "100%", padding: "12px 16px 12px 48px",
                    background: `${COLORS.navy}F0`,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 12, color: COLORS.white,
                    fontSize: 14, outline: "none"
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer",
                    color: COLORS.slate
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                background: `${COLORS.gold}15`,
                border: `1px solid ${COLORS.gold}30`,
                borderRadius: 8, padding: 12,
                color: COLORS.gold, fontSize: 13
              }}>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "14px",
                background: loading ? `${COLORS.teal}50` : `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
                border: "none", borderRadius: 12,
                color: COLORS.white, fontSize: 16, fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "all 0.2s ease"
              }}
            >
              {loading ? (
                "Processing..."
              ) : (
                <>
                  {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                  {isLogin ? "Sign In" : "Create Account"}
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          {isLogin && (
            <div style={{
              marginTop: 24, padding: 16,
              background: `${COLORS.teal}10`,
              border: `1px solid ${COLORS.teal}30`,
              borderRadius: 12
            }}>
              <h4 style={{ color: COLORS.teal, fontSize: 12, fontWeight: 600, marginBottom: 8 }}>
                Demo Credentials
              </h4>
              <div style={{ fontSize: 11, color: COLORS.slate, lineHeight: 1.6 }}>
                <div><strong>Patient:</strong> patient@clinic.com / patient123</div>
                <div><strong>Admin:</strong> admin@clinic.com / admin123</div>
                <div><strong>Super Admin:</strong> superadmin@clinic.com / super123</div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
