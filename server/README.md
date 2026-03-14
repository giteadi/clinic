# 🏥 Clinic SaaS Backend

Multi-tenant clinic appointment booking system - complete backend for Practo-style healthcare SaaS.

## 🎯 Core Features

### Multi-Tenant Architecture
- **Subdomain-based isolation**: `citydental.yourapp.com` → City Dental Clinic
- **Single database**: All clinics share one DB with `clinic_id` isolation
- **Automatic clinic detection**: Middleware detects clinic from URL

### Complete Booking System
- **Smart slot management**: Automatically calculates available time slots
- **Real-time availability**: Prevents double bookings
- **Patient registration**: Global users can book at any clinic

### Role-Based Access
- **Patients**: Book appointments, view history
- **Clinic Admins**: Manage doctors, appointments, staff
- **Super Admin**: Manage all clinics

## 🏗️ Architecture

```
Patient → Clinic Website → API → Database
         ↓
    Subdomain Detection
         ↓
    Clinic Isolation
```

### Database Schema
```sql
clinics          # Multi-tenant clinics
users            # Global patients
doctors          # Clinic-specific doctors
appointments     # Core booking table
clinic_admins    # Clinic staff
doctor_schedule  # Doctor availability
```

## 🚀 Quick Start

### Prerequisites
- Node.js 14+
- MySQL 8.0+
- npm or yarn

### Setup
```bash
# Clone and navigate
cd server

# Run setup script
./setup.sh

# Or manual setup:
npm install
cp .env.example .env
# Edit .env with your DB credentials
node config/migrations.js
```

### Start Server
```bash
# Development
npm run dev

# Production
npm start
```

## 📡 API Endpoints

### Clinics
```
GET    /api/clinics              # All clinics (super admin)
GET    /api/clinics/current       # Current clinic (from subdomain)
POST   /api/clinics              # Create clinic
```

### Doctors
```
GET    /api/doctors               # Clinic doctors
GET    /api/doctors/:id/schedule  # Doctor schedule
GET    /api/doctors/:id/available-slots?date=2024-03-20
POST   /api/doctors               # Add doctor
```

### Appointments (CORE)
```
POST   /api/appointments           # Book appointment ⭐
GET    /api/appointments/user      # User appointments
GET    /api/appointments/clinic    # Clinic appointments
PUT    /api/appointments/:id/status # Update status
```

### Users (Authentication)
```
POST   /api/users/register        # Patient registration
POST   /api/users/login           # Patient login
GET    /api/users/profile         # User profile
```

### Admin (Clinic Management)
```
POST   /api/admin/login           # Staff login
GET    /api/admin/dashboard       # Dashboard stats
POST   /api/admin/staff           # Add staff member
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: 100 requests per 15 minutes
- **Helmet.js**: Security headers
- **CORS**: Configurable origins
- **Input Validation**: Express-validator
- **Password Hashing**: bcryptjs

## 🌐 Multi-Tenant Flow

### 1. Subdomain Detection
```javascript
// Automatic in middleware
const subdomain = req.hostname.split('.')[0]; // citydental
const clinic = await getClinic(subdomain);
req.clinicId = clinic.id;
```

### 2. Isolated Data Access
```javascript
// All queries automatically filtered by clinic
SELECT * FROM doctors WHERE clinic_id = ?  // Auto-injected
```

### 3. URL Examples
```
citydental.yourapp.com  → Clinic ID: 1
smilecare.yourapp.com   → Clinic ID: 2
metro.yourapp.com       → Clinic ID: 3
```

## 📊 Business Model

### Setup Fees
- **Basic**: ₹15,000 (1-5 doctors)
- **Professional**: ₹30,000 (6-20 doctors)
- **Enterprise**: ₹50,000 (unlimited doctors)

### Monthly SaaS
- **Basic**: ₹999/month
- **Professional**: ₹1,999/month
- **Enterprise**: ₹2,999/month

### Revenue Potential
```
100 clinics × ₹2,000/month = ₹2,00,000/month
100 clinics × ₹30,000 setup = ₹30,00,000 one-time
```

## 🧪 Testing

### Sample Data
The system comes with pre-loaded sample clinics:
- **City Dental Clinic** (`citydental`)
- **Smile Care Dental** (`smilecare`)
- **Metro Medical Center** (`metro`)

### Test URLs
```bash
# Health check
curl http://localhost:5000/api/health

# Get clinics
curl http://localhost:5000/api/clinics

# Test subdomain (modify hosts file)
curl -H "Host: citydental.localhost" http://localhost:5000/api/clinics/current
```

## 🔧 Development

### Project Structure
```
server/
├── config/
│   ├── database.js       # DB connection
│   └── migrations.js    # Table creation
├── middleware/
│   ├── clinicMiddleware.js    # Subdomain detection
│   └── authMiddleware.js     # JWT auth
├── routes/
│   ├── clinics.js      # Clinic management
│   ├── doctors.js      # Doctor management
│   ├── appointments.js # Booking system
│   ├── users.js       # Patient auth
│   └── admin.js       # Clinic admin
├── server.js              # Main server
├── package.json
└── .env.example
```

### Environment Variables
```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=clinic_saas
JWT_SECRET=your_super_secret_key
PORT=5000
```

## 🚀 Deployment

### Production Setup
1. **Database**: MySQL 8.0+ on cloud
2. **Server**: VPS with PM2 process manager
3. **Domain**: Wildcard SSL certificate (*.yourapp.com)
4. **Environment**: Set NODE_ENV=production

### PM2 Configuration
```json
{
  "name": "clinic-backend",
  "script": "server.js",
  "instances": "max",
  "exec_mode": "cluster",
  "env": {
    "NODE_ENV": "production"
  }
}
```

## 💰 Scaling Features (Future)

### Phase 2 - Advanced Features
- [ ] SMS/WhatsApp reminders
- [ ] Online payments (Razorpay/Stripe)
- [ ] PDF prescriptions
- [ ] Video consultations
- [ ] Advanced analytics

### Phase 3 - Enterprise
- [ ] Multi-location support
- [ ] Inventory management
- [ ] Insurance integration
- [ ] Mobile apps

## 📞 Support

For technical support:
- 📧 Email: support@yourapp.com
- 💬 WhatsApp: +91 98765 43210
- 📚 Documentation: docs.yourapp.com

---

**Built with ❤️ for modern healthcare**
