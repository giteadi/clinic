import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  BuildingOfficeIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  UserGroupIcon,
  StarIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const Clinics = () => {
  const { hasRole } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const clinics = [
    {
      id: 1,
      name: 'City Medical Center',
      address: '123 Main St, Downtown, City',
      phone: '+1 (555) 123-4567',
      email: 'info@citymedical.com',
      hours: 'Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-6PM',
      doctors: 24,
      patients: 3420,
      rating: 4.8,
      reviews: 156,
      specialties: ['General Medicine', 'Cardiology', 'Pediatrics'],
      image: null,
      status: 'active'
    },
    {
      id: 2,
      name: 'Heart Care Clinic',
      address: '456 Oak Ave, Medical District, City',
      phone: '+1 (555) 234-5678',
      email: 'contact@heartcare.com',
      hours: 'Mon-Sat: 8AM-6PM, Sun: Closed',
      doctors: 18,
      patients: 2150,
      rating: 4.9,
      reviews: 89,
      specialties: ['Cardiology', 'Thoracic Surgery'],
      image: null,
      status: 'active'
    },
    {
      id: 3,
      name: 'Children\'s Hospital',
      address: '789 Pine Rd, Family District, City',
      phone: '+1 (555) 345-6789',
      email: 'info@childrenshospital.com',
      hours: '24/7 Emergency, Mon-Fri: 8AM-8PM',
      doctors: 32,
      patients: 4890,
      rating: 4.7,
      reviews: 203,
      specialties: ['Pediatrics', 'Neonatology', 'Pediatric Surgery'],
      image: null,
      status: 'active'
    },
    {
      id: 4,
      name: 'Bone & Joint Center',
      address: '321 Elm St, Orthopedic District, City',
      phone: '+1 (555) 456-7890',
      email: 'info@bonejoint.com',
      hours: 'Mon-Thu: 9AM-5PM, Fri: 9AM-4PM',
      doctors: 16,
      patients: 1890,
      rating: 4.6,
      reviews: 78,
      specialties: ['Orthopedics', 'Sports Medicine', 'Physical Therapy'],
      image: null,
      status: 'active'
    },
    {
      id: 5,
      name: 'Skin Care Clinic',
      address: '654 Maple Dr, Dermatology Center, City',
      phone: '+1 (555) 567-8901',
      email: 'contact@skincare.com',
      hours: 'Tue-Sat: 10AM-7PM, Sun-Mon: Closed',
      doctors: 12,
      patients: 1560,
      rating: 4.9,
      reviews: 124,
      specialties: ['Dermatology', 'Cosmetic Surgery'],
      image: null,
      status: 'active'
    },
    {
      id: 6,
      name: 'Neuro Care Center',
      address: '987 Cedar Ln, Neuro District, City',
      phone: '+1 (555) 678-9012',
      email: 'info@neurocare.com',
      hours: 'Mon-Fri: 9AM-4PM, Sat-Sun: Closed',
      doctors: 14,
      patients: 1230,
      rating: 4.8,
      reviews: 67,
      specialties: ['Neurology', 'Neurosurgery'],
      image: null,
      status: 'active'
    }
  ];

  const filteredClinics = clinics.filter(clinic =>
    clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clinic.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clinic.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-5 w-5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const ClinicCard = ({ clinic }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Clinic Header */}
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <BuildingOfficeIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">{clinic.name}</h3>
              <div className="flex items-center mt-1">
                {renderStars(clinic.rating)}
                <span className="ml-2 text-sm text-gray-600">{clinic.rating} ({clinic.reviews} reviews)</span>
              </div>
            </div>
          </div>
          {hasRole('admin') && (
            <div className="flex space-x-2">
              <button className="p-2 text-gray-600 hover:text-blue-600">
                <PencilIcon className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-red-600">
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Clinic Info */}
        <div className="mt-4 space-y-3">
          <div className="flex items-start text-sm text-gray-600">
            <MapPinIcon className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0 mt-0.5" />
            <span>{clinic.address}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <PhoneIcon className="h-5 w-5 mr-3 text-gray-400" />
            <span>{clinic.phone}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <EnvelopeIcon className="h-5 w-5 mr-3 text-gray-400" />
            <span>{clinic.email}</span>
          </div>
          <div className="flex items-start text-sm text-gray-600">
            <ClockIcon className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0 mt-0.5" />
            <span>{clinic.hours}</span>
          </div>
        </div>

        {/* Specialties */}
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
          <div className="flex flex-wrap gap-2">
            {clinic.specialties.map((specialty, index) => (
              <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">{clinic.doctors}</p>
              <p className="text-sm text-gray-600">Doctors</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{clinic.patients.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Patients</p>
            </div>
            <div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                clinic.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {clinic.status}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
            Book Appointment
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium">
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Our Clinics</h1>
          <p className="text-gray-600 mt-1">Find quality healthcare at our network of clinics</p>
        </div>
        {hasRole('admin') && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Clinic
          </button>
        )}
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <input
          type="text"
          placeholder="Search clinics by name, location, or specialty..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Clinics Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredClinics.map((clinic) => (
          <ClinicCard key={clinic.id} clinic={clinic} />
        ))}
      </div>

      {filteredClinics.length === 0 && (
        <div className="text-center py-12">
          <BuildingOfficeIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No clinics found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}

      {/* Add Clinic Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Add New Clinic</h2>
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Clinic Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter clinic name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter clinic address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="clinic@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Operating Hours</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-6PM"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add Clinic
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clinics;
