import { getClinicApiUrl, getClinicFromSubdomain } from '../utils/subdomainDetector';

/**
 * Service for fetching clinic-specific data
 */
class ClinicService {
  constructor() {
    const subdomain = getClinicFromSubdomain();
    this.baseUrl = getClinicApiUrl(subdomain);
  }

  /**
   * Fetch clinic reviews
   */
  async getClinicReviews(clinicId) {
    try {
      const response = await fetch(`${this.baseUrl}/clinics/${clinicId}/reviews`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      return await response.json();
    } catch (error) {
      console.error('Error fetching clinic reviews:', error);
      // Return mock data for development
      return this.getMockReviews(clinicId);
    }
  }

  /**
   * Fetch clinic doctors
   */
  async getClinicDoctors(clinicId) {
    try {
      const response = await fetch(`${this.baseUrl}/clinics/${clinicId}/doctors`);
      if (!response.ok) throw new Error('Failed to fetch doctors');
      return await response.json();
    } catch (error) {
      console.error('Error fetching clinic doctors:', error);
      return this.getMockDoctors(clinicId);
    }
  }

  /**
   * Fetch clinic appointments
   */
  async getClinicAppointments(clinicId, date) {
    try {
      const response = await fetch(`${this.baseUrl}/clinics/${clinicId}/appointments?date=${date}`);
      if (!response.ok) throw new Error('Failed to fetch appointments');
      return await response.json();
    } catch (error) {
      console.error('Error fetching clinic appointments:', error);
      return [];
    }
  }

  /**
   * Book appointment at specific clinic
   */
  async bookAppointment(clinicId, appointmentData) {
    try {
      const response = await fetch(`${this.baseUrl}/clinics/${clinicId}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });
      
      if (!response.ok) throw new Error('Failed to book appointment');
      return await response.json();
    } catch (error) {
      console.error('Error booking appointment:', error);
      throw error;
    }
  }

  /**
   * Mock reviews data for development
   */
  getMockReviews(clinicId) {
    const reviews = {
      'dental': [
        {
          id: 1,
          patientName: 'Rahul Sharma',
          rating: 5,
          comment: 'Excellent dental care! The staff is very professional and caring.',
          date: '2024-01-15',
          clinicId: 'dental'
        },
        {
          id: 2,
          patientName: 'Priya Patel',
          rating: 4,
          comment: 'Great experience with Dr. Mehta. Very thorough examination.',
          date: '2024-01-10',
          clinicId: 'dental'
        }
      ],
      'medical': [
        {
          id: 3,
          patientName: 'Amit Kumar',
          rating: 5,
          comment: 'Dr. Reddy is an excellent physician. Takes time to listen to patients.',
          date: '2024-01-12',
          clinicId: 'medical'
        }
      ],
      'ortho': [
        {
          id: 4,
          patientName: 'Sneha Gupta',
          rating: 5,
          comment: 'Amazing orthopedic care! Recovered quickly from my knee surgery.',
          date: '2024-01-08',
          clinicId: 'ortho'
        }
      ]
    };

    return reviews[clinicId] || [];
  }

  /**
   * Mock doctors data for development
   */
  getMockDoctors(clinicId) {
    const doctors = {
      'dental': [
        {
          id: 1,
          name: 'Dr. Rajesh Mehta',
          specialty: 'General Dentistry',
          experience: 15,
          rating: 4.8,
          image: '/images/doctors/dental-1.jpg',
          clinicId: 'dental'
        },
        {
          id: 2,
          name: 'Dr. Anita Desai',
          specialty: 'Orthodontics',
          experience: 12,
          rating: 4.9,
          image: '/images/doctors/dental-2.jpg',
          clinicId: 'dental'
        }
      ],
      'medical': [
        {
          id: 3,
          name: 'Dr. Vijay Reddy',
          specialty: 'General Practice',
          experience: 20,
          rating: 4.7,
          image: '/images/doctors/medical-1.jpg',
          clinicId: 'medical'
        }
      ],
      'ortho': [
        {
          id: 4,
          name: 'Dr. Arun Nair',
          specialty: 'Joint Replacement',
          experience: 18,
          rating: 4.9,
          image: '/images/doctors/ortho-1.jpg',
          clinicId: 'ortho'
        }
      ]
    };

    return doctors[clinicId] || [];
  }
}

export default new ClinicService();
