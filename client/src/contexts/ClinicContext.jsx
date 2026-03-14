import React, { createContext, useContext, useState, useEffect } from 'react';
import { getClinicFromSubdomain, getClinicConfig } from '../utils/subdomainDetector';

const ClinicContext = createContext();

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};

export const ClinicProvider = ({ children }) => {
  const [clinic, setClinic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadClinicData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const subdomain = getClinicFromSubdomain();
        
        if (subdomain) {
          const clinicConfig = await getClinicConfig(subdomain);
          if (clinicConfig) {
            setClinic(clinicConfig);
          } else {
            setError('Clinic not found for this subdomain');
          }
        } else {
          // No subdomain detected - this is the main platform
          setClinic(null);
        }
      } catch (err) {
        setError('Failed to load clinic data');
        console.error('Clinic context error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadClinicData();
  }, []);

  // Update clinic colors in CSS variables
  useEffect(() => {
    if (clinic) {
      const root = document.documentElement;
      root.style.setProperty('--clinic-primary', clinic.primaryColor);
      root.style.setProperty('--clinic-secondary', clinic.secondaryColor);
    }
  }, [clinic]);

  const value = {
    clinic,
    loading,
    error,
    isClinicSpecific: !!clinic,
    clinicId: clinic?.id || null,
    clinicName: clinic?.name || 'CliniQ Pro',
    clinicType: clinic?.type || null,
    primaryColor: clinic?.primaryColor || '#3B82F6',
    secondaryColor: clinic?.secondaryColor || '#60A5FA',
    specialties: clinic?.specialties || [],
    images: clinic?.images || [],
    videos: clinic?.videos || [],
    logo: clinic?.logo || null,
    description: clinic?.description || 'Professional healthcare management platform'
  };

  return (
    <ClinicContext.Provider value={value}>
      {children}
    </ClinicContext.Provider>
  );
};
