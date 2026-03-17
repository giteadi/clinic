import { getClinicApiUrl } from '../utils/subdomainDetector';

/**
 * Service for handling Razorpay payment integration
 */
class PaymentService {
  constructor() {
    this.baseUrl = getClinicApiUrl();
    this.razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_1DP5mmOlF5G5ag'; // Test key
  }

  /**
   * Load Razorpay script dynamically
   */
  loadRazorpayScript() {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Razorpay script'));
      document.body.appendChild(script);
    });
  }

  /**
   * Create payment order on backend
   */
  async createOrder(amount, appointmentData) {
    try {
      const response = await fetch(`${this.baseUrl}/appointments/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to paise
          currency: 'INR',
          appointmentData
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create order');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating payment order:', error);
      throw error;
    }
  }

  /**
   * Verify payment signature
   */
  async verifyPayment(paymentData) {
    try {
      const response = await fetch(`${this.baseUrl}/appointments/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
        },
        body: JSON.stringify(paymentData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Payment verification failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  }

  /**
   * Open Razorpay payment modal
   */
  async openPaymentModal(options) {
    try {
      await this.loadRazorpayScript();

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      return new Promise((resolve, reject) => {
        options.onPaymentSuccess = resolve;
        options.onPaymentError = reject;
      });
    } catch (error) {
      console.error('Error opening payment modal:', error);
      throw error;
    }
  }

  /**
   * Format error message for payment
   */
  getErrorMessage(error) {
    const errorMessages = {
      'RAZORPAY_ERROR': 'Payment failed. Please try again.',
      'INVALID_SIGNATURE': 'Payment verification failed. Please contact support.',
      'ORDER_CREATION_FAILED': 'Failed to create payment order. Please try again.',
      'NETWORK_ERROR': 'Network error. Please check your connection and try again.'
    };

    return errorMessages[error.code] || error.message || 'An error occurred during payment.';
  }
}

export default new PaymentService();
