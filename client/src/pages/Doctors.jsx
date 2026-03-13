import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserIcon, StarIcon, MapPinIcon, PhoneIcon, EnvelopeIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import MotionCard from '../components/MotionCard';

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'General Physician',
      experience: '15 years',
      rating: 4.8,
      reviews: 234,
      clinic: 'City Medical Center',
      education: 'MD, Harvard Medical School',
      languages: ['English', 'Spanish', 'French'],
      availability: 'Mon-Fri, 9AM-5PM',
      consultationFee: '$150',
      image: null
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      experience: '12 years',
      rating: 4.9,
      reviews: 189,
      clinic: 'Heart Care Clinic',
      education: 'MD, Johns Hopkins University',
      languages: ['English', 'Mandarin', 'Cantonese'],
      availability: 'Mon-Sat, 8AM-6PM',
      consultationFee: '$200',
      image: null
    },
    {
      id: 3,
      name: 'Dr. Emily Davis',
      specialty: 'Pediatrician',
      experience: '10 years',
      rating: 4.7,
      reviews: 312,
      clinic: 'Children\'s Hospital',
      education: 'MD, Stanford University',
      languages: ['English', 'German'],
      availability: 'Mon-Fri, 8AM-4PM',
      consultationFee: '$120',
      image: null
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      specialty: 'Orthopedic',
      experience: '18 years',
      rating: 4.6,
      reviews: 156,
      clinic: 'Bone & Joint Center',
      education: 'MD, Mayo Clinic College',
      languages: ['English', 'Japanese'],
      availability: 'Mon-Thu, 9AM-5PM',
      consultationFee: '$180',
      image: null
    },
    {
      id: 5,
      name: 'Dr. Lisa Anderson',
      specialty: 'Dermatologist',
      experience: '8 years',
      rating: 4.9,
      reviews: 278,
      clinic: 'Skin Care Clinic',
      education: 'MD, UCLA School of Medicine',
      languages: ['English', 'Italian', 'Portuguese'],
      availability: 'Tue-Sat, 10AM-7PM',
      consultationFee: '$140',
      image: null
    },
    {
      id: 6,
      name: 'Dr. Robert Taylor',
      specialty: 'Neurologist',
      experience: '14 years',
      rating: 4.8,
      reviews: 201,
      clinic: 'Neuro Care Center',
      education: 'MD, Yale School of Medicine',
      languages: ['English', 'Arabic'],
      availability: 'Mon-Fri, 9AM-4PM',
      consultationFee: '$220',
      image: null
    }
  ];

  const specialties = ['all', 'General Physician', 'Cardiologist', 'Pediatrician', 'Orthopedic', 'Dermatologist', 'Neurologist'];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.clinic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-5 w-5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Our Expert Doctors</h1>
        <p className="text-gray-600 mt-2">Find and connect with qualified healthcare professionals</p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div 
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="Search by name, specialty, or clinic..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>
                  {specialty === 'all' ? 'All Specialties' : specialty}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Doctors Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor, index) => (
          <MotionCard key={doctor.id} delay={index * 0.1}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Doctor Header */}
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <motion.div 
                    className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <UserIcon className="h-8 w-8 text-blue-600" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                    <p className="text-sm text-blue-600 font-medium">{doctor.specialty}</p>
                    <div className="flex items-center mt-1">
                      {renderStars(doctor.rating)}
                      <span className="ml-2 text-sm text-gray-600">{doctor.rating} ({doctor.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
                    {doctor.clinic}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <AcademicCapIcon className="h-4 w-4 mr-2 text-gray-400" />
                    {doctor.education}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <UserIcon className="h-4 w-4 mr-2 text-gray-400" />
                    {doctor.experience} experience
                  </div>
                </div>

                {/* Languages */}
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-1">Languages:</p>
                  <div className="flex flex-wrap gap-1">
                    {doctor.languages.map((lang, index) => (
                      <motion.span 
                        key={index} 
                        className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {lang}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Availability and Fee */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Available</p>
                      <p className="text-sm font-medium text-gray-900">{doctor.availability}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Consultation Fee</p>
                      <motion.p 
                        className="text-lg font-semibold text-blue-600"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {doctor.consultationFee}
                      </motion.p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <motion.button 
                      className="px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Book Appointment
                    </motion.button>
                    <motion.button 
                      className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Profile
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </MotionCard>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <UserIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </motion.div>
      )}
    </div>
  );
};

export default Doctors;
