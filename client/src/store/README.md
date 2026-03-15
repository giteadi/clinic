# 🚀 Redux Toolkit + Persist Integration

Complete Redux setup for Clinic SaaS application with centralized API management and data persistence.

## 📁 Structure

```
src/store/
├── store.js           # Main store configuration
├── hooks.js           # Custom hooks for components
└── slices/
    ├── authSlice.js       # Authentication state
    ├── clinicSlice.js     # Clinic management
    ├── doctorSlice.js     # Doctors data
    └── appointmentSlice.js # Appointments
```

## 🎯 Key Features

### 1. **Centralized API Management**
- All API calls in Redux slices
- No component-level API calls
- Automatic loading states
- Error handling

### 2. **Data Persistence**
- User auth data persists across sessions
- Clinic data cached locally
- Automatic rehydration on app load

### 3. **Smart Caching**
- Doctors data cached for 5 minutes
- Avoids repeated API calls
- Cache invalidation on demand

## 🔧 Usage Examples

### Authentication
```jsx
import { useAuth } from '../store/hooks';

function LoginComponent() {
  const { login, logout, user, loading, error } = useAuth();
  
  const handleLogin = (credentials) => {
    login(credentials);
  };
  
  return (
    <div>
      {loading && <p>Logging in...</p>}
      {error && <p>Error: {error}</p>}
      {user && <p>Welcome, {user.name}!</p>}
    </div>
  );
}
```

### Doctors Data
```jsx
import { useDoctors } from '../store/hooks';

function DoctorsComponent() {
  const { doctors, loading, error, fetchDoctors } = useDoctors();
  
  useEffect(() => {
    // Auto-fetched on component mount
    // Cached for 5 minutes
  }, []);
  
  return (
    <div>
      {loading && <p>Loading doctors...</p>}
      {error && <p>Error: {error}</p>}
      {doctors.map(doctor => (
        <div key={doctor.id}>
          <h3>{doctor.name}</h3>
          <p>{doctor.specialty}</p>
        </div>
      ))}
    </div>
  );
}
```

### Appointments
```jsx
import { useAppointments } from '../store/hooks';

function BookingComponent() {
  const { bookAppointment, bookingLoading } = useAppointments();
  
  const handleBook = (appointmentData) => {
    bookAppointment(appointmentData);
  };
  
  return (
    <button 
      onClick={() => handleBook({doctor_id: 1, date: '2024-03-20'})}
      disabled={bookingLoading}
    >
      {bookingLoading ? 'Booking...' : 'Book Appointment'}
    </button>
  );
}
```

## 🔄 Data Flow

### Before Redux (Component-level API)
```jsx
// ❌ Every component makes its own API calls
function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/doctors')
      .then(res => res.json())
      .then(data => setDoctors(data))
      .finally(() => setLoading(false));
  }, []);
  
  // Repeated in every component!
}
```

### After Redux (Centralized)
```jsx
// ✅ Single source of truth
function DoctorsPage() {
  const { doctors, loading } = useDoctors();
  // Data automatically fetched and cached
  // No API code in component
}
```

## 🎛️ Redux State Structure

```javascript
{
  auth: {
    user: null | { id, name, email, phone },
    admin: null | { id, name, role, clinic },
    token: string | null,
    loading: boolean,
    error: string | null,
    isAuthenticated: boolean
  },
  clinic: {
    currentClinic: null | { id, name, slug },
    allClinics: Array,
    loading: boolean,
    error: string | null
  },
  doctors: {
    doctors: Array,
    schedules: Object,
    availableSlots: Object,
    loading: boolean,
    error: string | null,
    lastFetched: timestamp | null
  },
  appointments: {
    userAppointments: Array,
    clinicAppointments: Array,
    loading: boolean,
    bookingLoading: boolean,
    error: string | null
  }
}
```

## 🚀 Performance Benefits

### 1. **Reduced API Calls**
- Doctors data fetched once per 5 minutes
- Shared across all components
- Automatic cache invalidation

### 2. **Better UX**
- Instant navigation between pages
- Loading states managed globally
- Error handling centralized

### 3. **Data Consistency**
- Single source of truth
- No duplicate state
- Predictable updates

## 🛠️ Custom Hooks

### useAuth()
```javascript
const {
  user, admin, token, loading, error, isAuthenticated,
  login, register, adminLogin, logout
} = useAuth();
```

### useDoctors()
```javascript
const {
  doctors, loading, error, lastFetched,
  fetchDoctors, fetchSchedule, fetchSlots, addDoctor
} = useDoctors();
```

### useAppointments()
```javascript
const {
  userAppointments, clinicAppointments, loading, bookingLoading,
  bookAppointment, fetchUserAppointments, fetchClinicAppointments, updateStatus
} = useAppointments();
```

### useClinic()
```javascript
const {
  currentClinic, allClinics, loading, error,
  fetchCurrentClinic, fetchAllClinics, createClinic
} = useClinic();
```

## 🔒 Persistence Configuration

```javascript
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'clinic'] // Only persist these
}
```

- **Auth**: User stays logged in across sessions
- **Clinic**: Clinic data cached locally
- **Doctors/ Appointments**: Fresh data on each session

## 🎨 Integration with Existing Code

### Replace component state with Redux:

```jsx
// Before
const [doctors, setDoctors] = useState([]);
const [loading, setLoading] = useState(true);

// After
const { doctors, loading } = useDoctors();
```

### Remove API calls from components:

```jsx
// Before
useEffect(() => {
  fetch('/api/doctors').then(...)
}, []);

// After
// Nothing! Auto-fetched by Redux hook
```

## 🧪 Testing

```jsx
// Test component with Redux mock
import { Provider } from 'react-redux';
import { store } from '../store/store';

function TestComponent() {
  return (
    <Provider store={store}>
      <YourComponent />
    </Provider>
  );
}
```

## 📱 Production Benefits

1. **Faster Navigation**: Data cached, no loading between pages
2. **Better Offline**: Data persists in localStorage
3. **Reduced Server Load**: Fewer API calls
4. **Consistent State**: No data mismatches
5. **Easier Debugging**: Redux DevTools support

## 🎯 Next Steps

1. **Replace all component API calls** with Redux hooks
2. **Add optimistic updates** for better UX
3. **Implement WebSocket** for real-time updates
4. **Add analytics** for API usage tracking

This setup provides enterprise-level state management for your Clinic SaaS application! 🏥✨
