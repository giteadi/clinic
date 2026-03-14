# Clinic Subdomain Testing Guide

## Development Testing

Since localhost doesn't support real subdomains, use these methods to test clinic-specific functionality:

### Method 1: Query Parameters (Recommended for Development)

Use the `clinic` query parameter to simulate different clinics:

```bash
# Dental Clinic
http://localhost:3000?clinic=dental

# Medical Center  
http://localhost:3000?clinic=medical

# Orthopedic Clinic
http://localhost:3000?clinic=ortho

# Main Platform (no clinic)
http://localhost:3000
```

### Method 2: Edit Hosts File (Advanced)

Add these entries to your hosts file:

**Mac/Linux:** `/etc/hosts`
**Windows:** `C:\Windows\System32\drivers\etc\hosts`

```
127.0.0.1 dental.localhost
127.0.0.1 medical.localhost  
127.0.0.1 ortho.localhost
```

Then access:
- http://dental.localhost:3000
- http://medical.localhost:3000
- http://ortho.localhost:3000

### Method 3: Use Local DNS Services

Services like `nip.io` or `localtunnel.me` can provide real subdomains:

```bash
# Using nip.io (points any subdomain to 127.0.0.1)
http://dental.127.0.0.1.nip.io:3000
http://medical.127.0.0.1.nip.io:3000
```

## What to Test

### 1. Main Platform (localhost:3000)
- Shows "CliniQ Pro" branding
- Displays all clinics in navigation
- Shows generic content

### 2. Dental Clinic (?clinic=dental)
- Shows "Smile Dental Clinic" branding
- Blue color scheme (#3B82F6)
- Dental-specific specialties
- Dental clinic reviews
- Hides "Clinics" from navigation

### 3. Medical Center (?clinic=medical)
- Shows "Care Medical Center" branding  
- Green color scheme (#10B981)
- Medical specialties
- Medical center reviews
- Hides "Clinics" from navigation

### 4. Orthopedic Clinic (?clinic=ortho)
- Shows "OrthoCare Clinic" branding
- Orange color scheme (#F59E0B)
- Orthopedic specialties
- Orthopedic clinic reviews
- Hides "Clinics" from navigation

## Production Deployment

In production, the system will automatically detect real subdomains:

- `dental.yourdomain.com` → Dental Clinic
- `medical.yourdomain.com` → Medical Center
- `ortho.yourdomain.com` → Orthopedic Clinic
- `yourdomain.com` → Main Platform

## Troubleshooting

### Connection Refused Error
- This is normal for subdomain testing on localhost
- Use query parameters instead: `?clinic=dental`
- Or edit your hosts file for real subdomain testing

### Clinic Not Loading
- Check browser console for errors
- Verify clinic ID matches the mock data in `subdomainDetector.js`
- Ensure ClinicProvider is wrapping your app in `App.jsx`

### Styles Not Applying
- Check that CSS variables are being set in ClinicContext
- Verify primaryColor is being applied correctly
- Check browser developer tools for computed styles
