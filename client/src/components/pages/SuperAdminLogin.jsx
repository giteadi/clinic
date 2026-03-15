import { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, Eye, EyeOff, Shield } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { THEMES } from "../../contexts/ThemeContext";
import { useAuth } from "../../store/hooks";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/authSlice";

export default function SuperAdminLogin({ setView, onLogin }) {
  const { theme, colors } = useTheme();
  const { login, loading, error } = useAuth();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: "superadmin@cliniqpro.com",
    password: "SuperAdmin@123"
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mock authentication for super admin
      if (credentials.email === "superadmin@cliniqpro.com" && credentials.password === "SuperAdmin@123") {
        const adminData = {
          id: 2,
          name: "Super Admin",
          email: credentials.email,
          role: "superadmin",
          phone: "+91 98765 43211"
        };
        
        // Store token in localStorage
        localStorage.setItem('superAdminToken', 'mock-super-token');
        localStorage.setItem('superAdminData', JSON.stringify(adminData));
        
        // Update Redux auth state
        dispatch(setUser({
          user: adminData,
          token: 'mock-super-token'
        }));
        
        console.log('✅ Super Admin Login Success:', adminData);
        console.log('🔄 Calling onLogin callback...');
        
        // Direct redirect without any checks
        window.location.href = '#superadmin-dashboard';
        onLogin(adminData);
      } else {
        console.error('❌ Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="theme-transition" style={{
      minHeight: "100vh",
      background: theme === THEMES.WHITE ? "#F8F9FA" : colors.navy,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: "100%",
          maxWidth: "400px",
          background: theme === THEMES.WHITE ? "#FFFFFF" : `${colors.navy}F0`,
          borderRadius: "16px",
          padding: "40px",
          border: `1px solid ${colors.border}`,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            width: "64px",
            height: "64px",
            borderRadius: "16px",
            background: `${colors.gold}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px"
          }}>
            <Shield size={32} color={colors.gold} />
          </div>
          <h1 style={{
            color: theme === THEMES.WHITE ? colors.navy : colors.white,
            fontSize: "24px",
            fontWeight: "700",
            marginBottom: "8px"
          }}>
            Super Admin Login
          </h1>
          <p style={{
            color: colors.slate,
            fontSize: "14px"
          }}>
            Access all clinics and system controls
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{
              color: theme === THEMES.WHITE ? colors.slate : colors.white,
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "8px",
              display: "block"
            }}>
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <User size={18} color={colors.slate} style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)"
              }} />
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 40px",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "8px",
                  fontSize: "14px",
                  background: theme === THEMES.WHITE ? "#FFFFFF" : `${colors.navy}20`,
                  color: theme === THEMES.WHITE ? colors.navy : colors.white,
                  outline: "none"
                }}
                placeholder="superadmin@cliniqpro.com"
                required
              />
            </div>
          </div>

          <div>
            <label style={{
              color: theme === THEMES.WHITE ? colors.slate : colors.white,
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "8px",
              display: "block"
            }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={18} color={colors.slate} style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)"
              }} />
              <input
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 40px",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "8px",
                  fontSize: "14px",
                  background: theme === THEMES.WHITE ? "#FFFFFF" : `${colors.navy}20`,
                  color: theme === THEMES.WHITE ? colors.navy : colors.white,
                  outline: "none"
                }}
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px"
                }}
              >
                {showPassword ? 
                  <EyeOff size={18} color={colors.slate} /> : 
                  <Eye size={18} color={colors.slate} />
                }
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px 24px",
              background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldDark || colors.gold})`,
              border: "none",
              borderRadius: "8px",
              color: colors.white,
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <button
            onClick={() => setView("home")}
            style={{
              color: colors.slate,
              fontSize: "14px",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline"
            }}
          >
            ← Back to Home
          </button>
        </div>

        {/* Demo Credentials */}
        <div style={{
          marginTop: "20px",
          padding: "12px",
          background: `${colors.teal}10`,
          border: `1px solid ${colors.teal}30`,
          borderRadius: "8px"
        }}>
          <p style={{
            color: colors.teal,
            fontSize: "12px",
            margin: "0",
            textAlign: "center"
          }}>
            <strong>Demo Credentials:</strong><br />
            Email: superadmin@cliniqpro.com<br />
            Password: SuperAdmin@123
          </p>
        </div>
      </motion.div>
    </div>
  );
}
