export const DOCTORS = [
  { id: 1, name: "Dr. Ayesha Khan", specialty: "Cardiologist", clinic: "HeartCare Clinic", rating: 4.9, reviews: 312, slots: ["10:00", "11:30", "14:00"], img: "AK", color: "#0ABFBC", fee: "₹800", exp: "12 yrs" },
  { id: 2, name: "Dr. Rahul Mehta", specialty: "Dermatologist", clinic: "SkinFirst Clinic", rating: 4.8, reviews: 248, slots: ["09:30", "12:00", "15:30"], img: "RM", color: "#E8A838", fee: "₹600", exp: "8 yrs" },
  { id: 3, name: "Dr. Priya Sharma", specialty: "Pediatrician", clinic: "KidsWell Center", rating: 4.9, reviews: 189, slots: ["10:30", "13:00", "16:00"], img: "PS", color: "#7C3AED", fee: "₹700", exp: "10 yrs" },
  { id: 4, name: "Dr. Arjun Patel", specialty: "Orthopedic", clinic: "BoneCare Hospital", rating: 4.7, reviews: 156, slots: ["11:00", "14:30", "17:00"], img: "AP", color: "#059669", fee: "₹900", exp: "15 yrs" },
];

export const REVIEWS = [
  { name: "Sana Mirza", text: "Booking was seamless! Got appointment in 2 mins. Doctor was wonderful.", rating: 5, date: "2 days ago" },
  { name: "Rohan Gupta", text: "Best clinic app I've used. Clean interface and WhatsApp confirmation!", rating: 5, date: "1 week ago" },
  { name: "Fatima Sheikh", text: "Super easy to find the right doctor. Will definitely recommend!", rating: 5, date: "2 weeks ago" },
];

export const SPECIALTIES = [
  { icon: "Heart", label: "Cardiology", count: 24 },
  { icon: "Activity", label: "Neurology", count: 18 },
  { icon: "Stethoscope", label: "General", count: 56 },
  { icon: "Shield", label: "Orthopedic", count: 31 },
];

export const STATS = [
  { value: "500+", label: "Clinics", icon: "Building2" },
  { value: "1200+", label: "Doctors", icon: "Stethoscope" },
  { value: "50K+", label: "Patients", icon: "Users" },
  { value: "4.9★", label: "Rating", icon: "Star" },
];
