import React, { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, ChatBubbleLeftRightIcon, ClockIcon } from '@heroicons/react/24/outline';

const Inquiry = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    urgency: 'normal',
    preferredContact: 'email'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const quickInquiries = [
    {
      title: 'General Information',
      description: 'Questions about our services, doctors, or facilities',
      icon: EnvelopeIcon,
      color: 'blue'
    },
    {
      title: 'Emergency Support',
      description: 'Urgent medical concerns that need immediate attention',
      icon: PhoneIcon,
      color: 'red'
    },
    {
      title: 'Appointment Help',
      description: 'Assistance with booking, rescheduling, or cancellations',
      icon: ClockIcon,
      color: 'green'
    },
    {
      title: 'Live Chat',
      description: 'Chat with our medical staff in real-time',
      icon: ChatBubbleLeftRightIcon,
      color: 'purple'
    }
  ];

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <EnvelopeIcon className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-900 mb-2">Inquiry Submitted Successfully!</h2>
          <p className="text-green-700 mb-4">
            Thank you for contacting us. Our team will respond within 24 hours.
          </p>
          <p className="text-green-600 text-sm">
            For urgent matters, please call our emergency hotline: +1-800-CLINIC
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
        <p className="text-gray-600 mt-2">Have questions? We're here to help you</p>
      </div>

      {/* Quick Contact Options */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickInquiries.map((inquiry, index) => {
          const Icon = inquiry.icon;
          return (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer`}
            >
              <div className={`w-12 h-12 bg-${inquiry.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`h-6 w-6 text-${inquiry.color}-600`} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{inquiry.title}</h3>
              <p className="text-sm text-gray-600">{inquiry.description}</p>
            </div>
          );
        })}
      </div>

      {/* Contact Form */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Send us a Message</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
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
                    Email Address *
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Brief subject of your inquiry"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  rows={6}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please describe your question or concern in detail..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level
                  </label>
                  <select
                    name="urgency"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.urgency}
                    onChange={handleChange}
                  >
                    <option value="low">Low - General inquiry</option>
                    <option value="normal">Normal - Standard response time</option>
                    <option value="high">High - Need response within 4 hours</option>
                    <option value="urgent">Urgent - Medical emergency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Contact Method
                  </label>
                  <select
                    name="preferredContact"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.preferredContact}
                    onChange={handleChange}
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone Call</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="sms">SMS</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Contact Information Sidebar */}
        <div className="space-y-6">
          {/* Emergency Contact */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-3">Emergency Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center text-red-700">
                <PhoneIcon className="h-5 w-5 mr-2" />
                <span className="font-medium">+1-800-CLINIC</span>
              </div>
              <p className="text-sm text-red-600">Available 24/7 for medical emergencies</p>
            </div>
          </div>

          {/* Office Hours */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Office Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Monday - Friday</span>
                <span className="font-medium">8:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Saturday</span>
                <span className="font-medium">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sunday</span>
                <span className="font-medium">10:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>

          {/* WhatsApp Support */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">WhatsApp Support</h3>
            <p className="text-sm text-green-700 mb-3">
              Get quick responses through WhatsApp
            </p>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* Response Times */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Response Times</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Email</span>
                <span className="font-medium">Within 24 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone</span>
                <span className="font-medium">Within 4 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">WhatsApp</span>
                <span className="font-medium">Within 2 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Emergency</span>
                <span className="font-medium">Immediately</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
