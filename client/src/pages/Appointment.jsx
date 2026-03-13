import React, { useState } from 'react';
import { CalendarIcon, ClockIcon, UserIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    doctor: '',
    date: '',
    time: '',
    reason: '',
    clinic: ''
  });

  const [step, setStep] = useState(1);

  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'General Physician', clinic: 'City Medical Center' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Cardiologist', clinic: 'Heart Care Clinic' },
    { id: 3, name: 'Dr. Emily Davis', specialty: 'Pediatrician', clinic: 'Children\'s Hospital' },
    { id: 4, name: 'Dr. James Wilson', specialty: 'Orthopedic', clinic: 'Bone & Joint Center' },
    { id: 5, name: 'Dr. Lisa Anderson', specialty: 'Dermatologist', clinic: 'Skin Care Clinic' },
    { id: 6, name: 'Dr. Robert Taylor', specialty: 'Neurologist', clinic: 'Neuro Care Center' }
  ];

  const clinics = [
    { id: 1, name: 'City Medical Center', address: '123 Main St, City' },
    { id: 2, name: 'Heart Care Clinic', address: '456 Oak Ave, City' },
    { id: 3, name: 'Children\'s Hospital', address: '789 Pine Rd, City' },
    { id: 4, name: 'Bone & Joint Center', address: '321 Elm St, City' },
    { id: 5, name: 'Skin Care Clinic', address: '654 Maple Dr, City' },
    { id: 6, name: 'Neuro Care Center', address: '987 Cedar Ln, City' }
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDoctorSelect = (doctor) => {
    setFormData({
      ...formData,
      doctor: doctor.name,
      clinic: doctor.clinic
    });
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to backend
    alert('Appointment booked successfully! You will receive a confirmation email shortly.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      doctor: '',
      date: '',
      time: '',
      reason: '',
      clinic: ''
    });
    setStep(1);
  };

  const selectedDoctor = doctors.find(d => d.name === formData.doctor);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Book Appointment</h1>
          <p className="text-gray-600 mt-1">Schedule your visit with our expert doctors</p>
        </div>

        <div className="p-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Select Doctor</span>
            </div>
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Patient Details</span>
            </div>
            <div className={`flex items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="ml-2 font-medium">Confirmation</span>
            </div>
          </div>

          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Choose a Doctor</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer transition-colors"
                    onClick={() => handleDoctorSelect(doctor)}
                  >
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <UserIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                        <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        <p className="text-sm text-gray-500 mt-1">{doctor.clinic}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900">Selected Doctor</h3>
                <p className="text-blue-700">{selectedDoctor?.name} - {selectedDoctor?.specialty}</p>
                <p className="text-blue-600 text-sm">{selectedDoctor?.clinic}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    min={format(new Date(), 'yyyy-MM-dd')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time
                  </label>
                  <select
                    name="time"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.time}
                    onChange={handleChange}
                  >
                    <option value="">Select a time slot</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Clinic
                  </label>
                  <select
                    name="clinic"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.clinic}
                    onChange={handleChange}
                  >
                    <option value="">Select clinic</option>
                    {clinics.map(clinic => (
                      <option key={clinic.id} value={clinic.name}>{clinic.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Visit
                </label>
                <textarea
                  name="reason"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Please describe your symptoms or reason for visit..."
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
