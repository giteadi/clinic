import React, { useState } from 'react';
import { StarIcon, UserIcon, CalendarIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Reviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedClinic, setSelectedClinic] = useState('all');

  const reviews = [
    {
      id: 1,
      patientName: 'John Smith',
      doctorName: 'Dr. Sarah Johnson',
      clinic: 'City Medical Center',
      rating: 5,
      date: '2024-01-15',
      comment: 'Excellent experience! Dr. Johnson was very thorough and took the time to explain everything clearly. The clinic was clean and the staff was friendly.',
      helpful: 24,
      verified: true
    },
    {
      id: 2,
      patientName: 'Emily Rodriguez',
      doctorName: 'Dr. Michael Chen',
      clinic: 'Heart Care Clinic',
      rating: 4,
      date: '2024-01-12',
      comment: 'Dr. Chen is very knowledgeable and professional. The only reason for 4 stars is the waiting time, but the quality of care was excellent.',
      helpful: 18,
      verified: true
    },
    {
      id: 3,
      patientName: 'David Thompson',
      doctorName: 'Dr. Emily Davis',
      clinic: 'Children\'s Hospital',
      rating: 5,
      date: '2024-01-10',
      comment: 'Dr. Davis is amazing with kids! My daughter was comfortable throughout the entire visit. Highly recommend for pediatric care.',
      helpful: 31,
      verified: true
    },
    {
      id: 4,
      patientName: 'Sarah Williams',
      doctorName: 'Dr. James Wilson',
      clinic: 'Bone & Joint Center',
      rating: 4,
      date: '2024-01-08',
      comment: 'Great experience overall. Dr. Wilson explained my treatment options clearly and the follow-up care has been excellent.',
      helpful: 15,
      verified: true
    },
    {
      id: 5,
      patientName: 'Michael Brown',
      doctorName: 'Dr. Lisa Anderson',
      clinic: 'Skin Care Clinic',
      rating: 5,
      date: '2024-01-05',
      comment: 'Dr. Anderson transformed my skin! Professional, knowledgeable, and uses the latest treatments. Worth every penny.',
      helpful: 42,
      verified: true
    },
    {
      id: 6,
      patientName: 'Lisa Garcia',
      doctorName: 'Dr. Robert Taylor',
      clinic: 'Neuro Care Center',
      rating: 4,
      date: '2024-01-03',
      comment: 'Very thorough examination and clear explanations. Dr. Taylor answered all my questions patiently. Great neurologist!',
      helpful: 19,
      verified: true
    }
  ];

  const clinics = ['all', 'City Medical Center', 'Heart Care Clinic', 'Children\'s Hospital', 'Bone & Joint Center', 'Skin Care Clinic', 'Neuro Care Center'];
  const ratings = ['all', 5, 4, 3, 2, 1];

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.clinic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = selectedRating === 'all' || review.rating === selectedRating;
    const matchesClinic = selectedClinic === 'all' || review.clinic === selectedClinic;
    return matchesSearch && matchesRating && matchesClinic;
  });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: (reviews.filter(review => review.rating === rating).length / reviews.length) * 100
  }));

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Patient Reviews</h1>
        <p className="text-gray-600 mt-2">Read authentic reviews from our patients</p>
      </div>

      {/* Stats Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">{averageRating}</div>
            <div className="flex justify-center mb-2">
              {renderStars(Math.round(averageRating))}
            </div>
            <div className="text-gray-600">Average Rating</div>
            <div className="text-sm text-gray-500 mt-1">Based on {reviews.length} reviews</div>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-semibold text-gray-900 mb-4">Rating Distribution</h3>
            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center">
                  <div className="flex items-center w-16">
                    <span className="text-sm text-gray-600 mr-2">{rating}</span>
                    <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1 mx-3">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search reviews..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
            >
              {ratings.map(rating => (
                <option key={rating} value={rating}>
                  {rating === 'all' ? 'All Ratings' : `${rating} Stars`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedClinic}
              onChange={(e) => setSelectedClinic(e.target.value)}
            >
              {clinics.map(clinic => (
                <option key={clinic} value={clinic}>
                  {clinic === 'all' ? 'All Clinics' : clinic}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">{review.patientName}</h3>
                    {review.verified && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Verified</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    Reviewed {review.doctorName} at {review.clinic}
                  </p>
                  <div className="flex items-center mt-1 space-x-4">
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {new Date(review.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{review.comment}</p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-sm text-gray-600 hover:text-blue-600">
                  <span>👍 Helpful ({review.helpful})</span>
                </button>
                <button className="text-sm text-gray-600 hover:text-blue-600">
                  Report
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-12">
          <StarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Write a Review CTA */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Share Your Experience</h2>
        <p className="text-blue-700 mb-6">
          Help others make informed decisions by sharing your clinic experience
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
          Write a Review
        </button>
      </div>
    </div>
  );
};

export default Reviews;
