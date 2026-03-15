import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff, Stethoscope, LogIn, UserPlus, LogOut } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { setUser, clearError, logout } from "../../store/slices/authSlice";
import { THEMES } from "../../contexts/ThemeContext";

export default function LoginPage({ setView }) {
  const { theme, colors } = useTheme();
  const dispatch = useDispatch();
  const { loading, error, user, isAuthenticated } = useSelector(state => {
  console.log('🔍 Redux state check:', { 
    auth: state.auth, 
    isAuthenticated: state.auth.isAuthenticated, 
    user: state.auth.user 
  });
  return state.auth;
});
  
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // UI state only
  const isSubmittingRef = useRef(false); // Synchronous guard
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    role: "patient"
  });

  // Reset form when switching between login/register
  useEffect(() => {
    setFormData({
      email: "",
      password: "",
      name: "",
      phone: "",
      role: "patient"
    });
  }, [isLogin]);

  const handleLogout = () => {
    dispatch(logout());
    setFormData({
      email: "",
      password: "",
      name: "",
      phone: "",
      role: "patient"
    });
  };

  // Reset form on component mount
  useEffect(() => {
    console.log('🔄 LoginPage mounted, resetting form');
    setFormData({
      email: "",
      password: "",
      name: "",
      phone: "",
      role: "patient"
    });
    setIsSubmitting(false);
  }, []);

  // Handle dashboard redirect after authentication
  useEffect(() => {
    console.log('🔄 LoginPage - Auth state check:', { isAuthenticated, user: !!user, userRole: user?.role });
    if (isAuthenticated && user) {
      console.log('🔄 LoginPage - Authentication successful, redirecting...', { role: user.role });
      if (user.role === "superadmin") {
        console.log('🎯 Redirecting to superadmin-dashboard');
        setView("superadmin-dashboard");
      } else if (user.role === "admin") {
        console.log('🎯 Redirecting to admin-dashboard');
        setView("admin-dashboard");
      } else {
        console.log('🎯 Redirecting to patient-dashboard');
        setView("patient-dashboard");
      }
    } else {
      console.log('🔄 LoginPage - Not authenticated yet:', { isAuthenticated, user });
    }
  }, [isAuthenticated, user, setView]);

  // Add this after the useState declarations
  const formSubmitSource = useRef('manual');

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🚨 Manual submit triggered');
    
    // 🚨 AGGRESSIVE GUARD: Prevent any multiple calls
    if (isSubmittingRef.current) {
      console.log('🚨 BLOCKED: Form already submitting (aggressive guard)');
      return;
    }
    
    // 🚨 IMMEDIATE LOCK: Set before any async operations
    isSubmittingRef.current = true;
    console.log('🚨 LOCKED: Submission guard activated');
    
    setIsSubmitting(true);
    
    try {
      await handleSubmit(e);
    } catch (error) {
      console.error('🚨 Submit error:', error);
    } finally {
      // Always reset the guard
      console.log('🚨 UNLOCKED: Finally block reset');
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    console.log('📝 Form field changed:', { name: e.target.name, value: e.target.value });
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    console.log('handleSubmit called!', { e, formData, isLogin, isSubmittingRef: isSubmittingRef.current });
    
    // Don't check guard here since handleManualSubmit already handles it
    
    dispatch(clearError());

    // Basic validation - more strict checks
    if (!formData.email || formData.email.trim() === '') {
      console.log('Email validation failed:', formData.email);
      return;
    }

    if (!formData.password || formData.password.trim() === '') {
      console.log('Password validation failed:', formData.password);
      return;
    }

    if (!isLogin && (!formData.name || formData.name.trim() === '')) {
      console.log('Name validation failed:', formData.name);
      return;
    }

    if (!isLogin && (!formData.phone || formData.phone.trim() === '')) {
      console.log('Phone validation failed:', formData.phone);
      return;
    }

    console.log('Form validation passed, proceeding with authentication...');
    console.log('🔑 Login attempt:', { email: formData.email, isLogin, passwordLength: formData.password.length });

    // Mock authentication logic
    try {
      if (isLogin) {
        // Login logic - check email/password only, ignore role field for login
        if (formData.email === "admin@clinic.com" && formData.password === "admin123") {
          console.log('✅ Admin login successful');
          const user = {
            id: 1,
            name: "Admin User",
            email: formData.email,
            role: "admin",
            clinicId: 1,
            phone: "+91 98765 43210"
          };
          dispatch(setUser({ user, token: "mock-admin-token" }));
        } else if (formData.email === "superadmin@cliniqpro.com" && formData.password === "SuperAdmin@123") {
          console.log('✅ Super Admin login successful');
          const user = {
            id: 2,
            name: "Super Admin",
            email: formData.email,
            role: "superadmin", 
            phone: "+91 98765 43211"
          };
          console.log('🔥 Dispatching setUser with:', { user, token: "mock-super-token" });
          dispatch(setUser({ user, token: "mock-super-token" }));
          console.log('✅ setUser dispatched');
        } else if (formData.email === "patient@clinic.com" && formData.password === "patient123") {
          console.log('✅ Patient login successful');
          const user = {
            id: 3,
            name: "John Doe",
            email: formData.email,
            role: "patient",
            phone: "+91 98765 43212",
            linkedClinic: {
              id: 1,
              name: "City Medical Center",
              slug: "citydental",
              address: "123 MG Road, Mumbai",
              phone: "+91 22 2345 6789",
              rating: 4.8,
              doctors: 25,
              specialties: ["General", "Cardiology", "Orthopedics"],
              image: "",
              timings: "24/7",
              distance: "2.5 km",
              availableSlots: 45
            }
          };
          dispatch(setUser({ user, token: "mock-patient-token" }));
        } else {
          console.log('❌ Invalid credentials, trying generic patient login');
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
              image: "",
              timings: "24/7",
              distance: "2.5 km",
              availableSlots: 45
            }
          };
          dispatch(setUser({ user, token: "mock-patient-token" }));
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
        dispatch(setUser({ user, token: "mock-register-token" }));
      }
    } catch (err) {
      console.error('Authentication error:', err);
    }
  };

  return (
    <div className="theme-transition" style={{
      minHeight: "100vh",
      background: colors.theme === THEMES.WHITE ? "#F8F9FA" : colors.navy,
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
        background: `radial-gradient(circle, ${colors.teal}12, transparent 70%)`,
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", bottom: -80, right: -80,
        width: "clamp(250px, 35vw, 350px)", height: "clamp(250px, 35vw, 350px)",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${colors.gold}10, transparent 70%)`,
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
            color: colors.slate, marginBottom: 24,
            fontSize: 14, fontWeight: 500
          }}
        >
          <ArrowLeft size={18} /> Back to Home
        </button>

        {/* Login Card */}
        <div style={{
          background: colors.theme === THEMES.WHITE ? "#FFFFFF" : `${colors.navy}F0`,
          border: `1px solid ${colors.border}`,
          borderRadius: 24, padding: "clamp(32px, 5vw, 40px)",
          backdropFilter: "blur(20px)"
        }}>
          {/* Logo and Title */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16,
              background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px"
            }}>
              <Stethoscope size={32} color={colors.white} />
            </div>
            
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(24px, 4vw, 32px)",
              color: theme === THEMES.WHITE ? colors.slate : colors.white, fontWeight: 700, marginBottom: 8
            }}>
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p style={{ color: colors.slate, fontSize: 14, lineHeight: 1.5 }}>
              {isLogin 
                ? "Sign in to access your healthcare dashboard"
                : "Join us to manage your healthcare journey"
              }
            </p>
          </div>

          {/* Toggle Login/Register */}
          <div style={{
            display: "flex", background: theme === THEMES.WHITE ? "#F8F9FA" : `${colors.navy}F0`,
            border: `1px solid ${colors.border}`, borderRadius: 12,
            padding: 4, marginBottom: 32
          }}>
            <button
              onClick={() => setIsLogin(true)}
              style={{
                flex: 1, padding: "8px 16px", border: "none",
                borderRadius: 8, background: isLogin ? colors.teal : "none",
                color: isLogin ? colors.white : (theme === THEMES.WHITE ? colors.slate : colors.white), fontSize: 14, fontWeight: 600,
                cursor: "pointer", transition: "all 0.2s ease"
              }}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              style={{
                flex: 1, padding: "8px 16px", border: "none",
                borderRadius: 8, background: !isLogin ? colors.teal : "none",
                color: !isLogin ? colors.white : (theme === THEMES.WHITE ? colors.slate : colors.white), fontSize: 14, fontWeight: 600,
                cursor: "pointer", transition: "all 0.2s ease"
              }}
            >
              Register
            </button>
          </div>

          {/* Already Logged In Section */}
          {isAuthenticated && user && (
            <div style={{
              marginBottom: 24,
              padding: 16,
              background: `${colors.teal}10`,
              border: `1px solid ${colors.teal}30`,
              borderRadius: 12,
              textAlign: "center"
            }}>
              <div style={{ marginBottom: 12 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 8px"
                }}>
                  <User size={24} color={colors.white} />
                </div>
                <h4 style={{ color: theme === THEMES.WHITE ? colors.slate : colors.white, fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
                  Already logged in as {user.name}
                </h4>
                <p style={{ color: colors.slate, fontSize: 13, marginBottom: 12 }}>
                  {user.email} • {user.role}
                </p>
              </div>
              <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                <button
                  onClick={() => {
                    const dashboardMap = {
                      patient: 'patient-dashboard',
                      admin: 'admin-dashboard',
                      superadmin: 'superadmin-dashboard'
                    };
                    setView(dashboardMap[user.role] || 'home');
                  }}
                  style={{
                    padding: "8px 16px",
                    background: `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
                    border: "none", borderRadius: 8,
                    color: colors.white, fontSize: 13, fontWeight: 600,
                    cursor: "pointer", transition: "all 0.2s ease"
                  }}
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: "8px 16px",
                    background: "none",
                    border: `1px solid ${colors.gold}`,
                    borderRadius: 8,
                    color: colors.gold, fontSize: 13, fontWeight: 600,
                    cursor: "pointer", transition: "all 0.2s ease"
                  }}
                >
                  <LogOut size={14} style={{ marginRight: 4 }} />
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* Form */}
          <form ref={formRef} onSubmit={handleManualSubmit} style={{ display: "grid", gap: 20 }}>
            {/* Registration Fields */}
            {!isLogin && (
              <>
                <div>
                  <label style={{ 
                    display: "block", color: theme === THEMES.WHITE ? colors.slate : colors.white, 
                    fontSize: 14, fontWeight: 500, marginBottom: 8 
                  }}>
                    Full Name
                  </label>
                  <div style={{ position: "relative" }}>
                    <User size={20} color={colors.slate} style={{
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
                        background: theme === THEMES.WHITE ? "#F8F9FA" : `${colors.navy}F0`,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 12, color: theme === THEMES.WHITE ? colors.slate : colors.white,
                        fontSize: 14, outline: "none",
                        "::placeholder": { color: colors.slate }
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ 
                    display: "block", color: theme === THEMES.WHITE ? colors.slate : colors.white, 
                    fontSize: 14, fontWeight: 500, marginBottom: 8 
                  }}>
                    Phone Number
                  </label>
                  <div style={{ position: "relative" }}>
                    <Mail size={20} color={colors.slate} style={{
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
                        background: theme === THEMES.WHITE ? "#F8F9FA" : `${colors.navy}F0`,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 12, color: theme === THEMES.WHITE ? colors.slate : colors.white,
                        fontSize: 14, outline: "none",
                        "::placeholder": { color: colors.slate }
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ 
                    display: "block", color: theme === THEMES.WHITE ? colors.slate : colors.white, 
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
                      background: theme === THEMES.WHITE ? "#F8F9FA" : `${colors.navy}F0`,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 12, color: theme === THEMES.WHITE ? colors.slate : colors.white,
                      fontSize: 14, outline: "none"
                    }}
                  >
                    <option value="patient" style={{ background: theme === THEMES.WHITE ? "#FFFFFF" : colors.navy, color: theme === THEMES.WHITE ? colors.slate : colors.white }}>Patient</option>
                    <option value="admin" style={{ background: theme === THEMES.WHITE ? "#FFFFFF" : colors.navy, color: theme === THEMES.WHITE ? colors.slate : colors.white }}>Clinic Admin</option>
                    <option value="superadmin" style={{ background: theme === THEMES.WHITE ? "#FFFFFF" : colors.navy, color: theme === THEMES.WHITE ? colors.slate : colors.white }}>Super Admin</option>
                  </select>
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label style={{ 
                display: "block", color: theme === THEMES.WHITE ? colors.slate : colors.white, 
                fontSize: 14, fontWeight: 500, marginBottom: 8 
              }}>
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={20} color={colors.slate} style={{
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
                    background: theme === THEMES.WHITE ? "#F8F9FA" : `${colors.navy}F0`,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 12, color: theme === THEMES.WHITE ? colors.slate : colors.white,
                    fontSize: 14, outline: "none",
                    "::placeholder": { color: colors.slate }
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ 
                display: "block", color: theme === THEMES.WHITE ? colors.slate : colors.white, 
                fontSize: 14, fontWeight: 500, marginBottom: 8 
              }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock size={20} color={colors.slate} style={{
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
                    background: theme === THEMES.WHITE ? "#F8F9FA" : `${colors.navy}F0`,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 12, color: theme === THEMES.WHITE ? colors.slate : colors.white,
                    fontSize: 14, outline: "none",
                    "::placeholder": { color: colors.slate }
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer",
                    color: colors.slate
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                background: `${colors.gold}15`,
                border: `1px solid ${colors.gold}30`,
                borderRadius: 8, padding: 12,
                color: colors.gold, fontSize: 13
              }}>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || isSubmitting}
              style={{
                padding: "14px",
                background: (loading || isSubmitting) ? `${colors.teal}50` : `linear-gradient(135deg, ${colors.teal}, ${colors.tealDark})`,
                border: "none", borderRadius: 12,
                color: colors.white, fontSize: 16, fontWeight: 600,
                cursor: (loading || isSubmitting) ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "all 0.2s ease"
              }}
            >
              {loading || isSubmitting ? (
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
              background: `${colors.teal}10`,
              border: `1px solid ${colors.teal}30`,
              borderRadius: 12
            }}>
              <h4 style={{ color: colors.teal, fontSize: 12, fontWeight: 600, marginBottom: 8 }}>
                Demo Credentials
              </h4>
              <div style={{ fontSize: 11, color: colors.slate, lineHeight: 1.6 }}>
                <div><strong>Patient:</strong> patient@clinic.com / patient123</div>
                <div><strong>Admin:</strong> admin@clinic.com / admin123</div>
                <div><strong>Super Admin:</strong> superadmin@cliniqpro.com / SuperAdmin@123</div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
