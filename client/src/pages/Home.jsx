import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CalendarIcon,
  UserGroupIcon,
  StarIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  SparklesIcon,
  HeartIcon,
  ShieldCheckIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import MotionCard from '../components/MotionCard';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const Home = () => {
  const features = [
    {
      name: 'Smart Booking',
      description: 'AI-powered appointment scheduling with real-time availability',
      icon: CalendarIcon,
      href: '/appointment',
      color: 'blue'
    },
    {
      name: 'Expert Doctors',
      description: 'Connect with board-certified specialists in every field',
      icon: UserGroupIcon,
      href: '/doctors',
      color: 'purple'
    },
    {
      name: 'Patient Reviews',
      description: 'Verified reviews from real patients to help you choose',
      icon: StarIcon,
      href: '/reviews',
      color: 'yellow'
    },
    {
      name: '24/7 Support',
      description: 'Round-the-clock medical assistance and consultations',
      icon: ChatBubbleLeftRightIcon,
      href: '/inquiry',
      color: 'green'
    }
  ];

  const trustIndicators = [
    {
      icon: ShieldCheckIcon,
      title: 'HIPAA Compliant',
      description: 'Your health data is secure and protected'
    },
    {
      icon: HeartIcon,
      title: '10,000+ Happy Patients',
      description: 'Trusted by thousands of satisfied patients'
    },
    {
      icon: ClockIcon,
      title: 'Instant Appointments',
      description: 'Book appointments in under 60 seconds'
    }
  ];

  const stats = [
    { name: 'Doctors', value: '500+' },
    { name: 'Clinics', value: '50+' },
    { name: 'Patients', value: '10,000+' },
    { name: 'Appointments', value: '50,000+' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <motion.div 
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6"
            >
              <SparklesIcon className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-blue-900 font-medium">Revolutionary Healthcare Platform</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Your Health,<br />Our Priority
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Experience the future of healthcare with AI-powered appointments, 
              expert doctors, and personalized care—all in one seamless platform.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button size="lg" variant="primary" className="group">
                <Link to="/appointment" className="flex items-center">
                  Book Appointment
                  <motion.span
                    initial={{ x: 0 }}
                    animate={{ x: 5 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                  >
                    →
                  </motion.span>
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                <Link to="/doctors">Find Doctors</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 blur-xl"></div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustIndicators.map((indicator, index) => {
              const Icon = indicator.icon;
              return (
                <MotionCard key={indicator.title} delay={index * 0.1}>
                  <Card className="text-center p-6 border-0 shadow-lg hover:shadow-2xl">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{indicator.title}</h3>
                    <p className="text-gray-600">{indicator.description}</p>
                  </Card>
                </MotionCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <MotionCard key={stat.name} delay={index * 0.1}>
                <Card className="text-center p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <motion.div 
                    className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-600 font-medium">{stat.name}</div>
                </Card>
              </MotionCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge variant="gradient" className="mb-4">Our Services</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need for Better Health
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From booking appointments to managing your health records, we've got you covered
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <MotionCard key={feature.name} delay={index * 0.1}>
                  <Link to={feature.href}>
                    <Card className="group h-full p-8 border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                      <motion.div 
                        className={`w-16 h-16 bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.name}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                      <div className="mt-4 text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                        Learn more →
                      </div>
                    </Card>
                  </Link>
                </MotionCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <motion.div 
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 border-0 shadow-2xl text-center p-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Need Immediate Medical Assistance?
              </h2>
              <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
                Our medical team is available 24/7 to help you with urgent concerns and emergencies
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-green-50">
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <PhoneIcon className="w-5 h-5 mr-2" />
                  WhatsApp Support
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                <Link to="/inquiry" className="flex items-center">
                  <EnvelopeIcon className="w-5 h-5 mr-2" />
                  Send Inquiry
                </Link>
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
