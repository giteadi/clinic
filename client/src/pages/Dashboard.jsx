import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  UserGroupIcon, 
  CalendarIcon, 
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  BellIcon,
  Cog6ToothIcon,
  UsersIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user, hasRole } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in real app, this would come from API
  const stats = {
    overview: {
      totalPatients: hasRole('superadmin') ? 15420 : 3420,
      totalAppointments: hasRole('superadmin') ? 48500 : 12500,
      totalDoctors: hasRole('superadmin') ? 156 : 24,
      totalClinics: hasRole('superadmin') ? 12 : 1,
      revenue: hasRole('superadmin') ? '$2.4M' : '$180K',
      satisfactionRate: '94.5%'
    },
    appointments: {
      today: 45,
      thisWeek: 280,
      thisMonth: 1200,
      pending: 23,
      completed: 1150,
      cancelled: 27
    },
    patients: {
      new: 156,
      active: 3420,
      returning: 2864,
      total: 15420
    }
  };

  const recentAppointments = [
    { id: 1, patient: 'John Smith', doctor: 'Dr. Sarah Johnson', time: '09:00 AM', status: 'confirmed' },
    { id: 2, patient: 'Emily Davis', doctor: 'Dr. Michael Chen', time: '09:30 AM', status: 'pending' },
    { id: 3, patient: 'Robert Wilson', doctor: 'Dr. Emily Davis', time: '10:00 AM', status: 'confirmed' },
    { id: 4, patient: 'Lisa Anderson', doctor: 'Dr. James Wilson', time: '10:30 AM', status: 'confirmed' },
    { id: 5, patient: 'Michael Brown', doctor: 'Dr. Lisa Anderson', time: '11:00 AM', status: 'cancelled' }
  ];

  const clinics = hasRole('superadmin') ? [
    { id: 1, name: 'City Medical Center', doctors: 24, patients: 3420, revenue: '$180K' },
    { id: 2, name: 'Heart Care Clinic', doctors: 18, patients: 2150, revenue: '$145K' },
    { id: 3, name: 'Children\'s Hospital', doctors: 32, patients: 4890, revenue: '$220K' },
    { id: 4, name: 'Bone & Joint Center', doctors: 16, patients: 1890, revenue: '$125K' },
    { id: 5, name: 'Skin Care Clinic', doctors: 12, patients: 1560, revenue: '$95K' },
    { id: 6, name: 'Neuro Care Center', doctors: 14, patients: 1230, revenue: '$110K' }
  ] : [];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'appointments', name: 'Appointments', icon: CalendarIcon },
    { id: 'patients', name: 'Patients', icon: UsersIcon },
    ...(hasRole('superadmin') ? [{ id: 'clinics', name: 'Clinics', icon: BuildingOfficeIcon }] : []),
    { id: 'reports', name: 'Reports', icon: DocumentTextIcon }
  ];

  const StatCard = ({ title, value, icon: Icon, color = 'blue' }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Total Patients" 
          value={stats.overview.totalPatients.toLocaleString()} 
          icon={UserGroupIcon} 
          color="blue" 
        />
        <StatCard 
          title="Total Appointments" 
          value={stats.overview.totalAppointments.toLocaleString()} 
          icon={CalendarIcon} 
          color="green" 
        />
        <StatCard 
          title="Total Doctors" 
          value={stats.overview.totalDoctors} 
          icon={UsersIcon} 
          color="purple" 
        />
        {hasRole('superadmin') && (
          <StatCard 
            title="Total Clinics" 
            value={stats.overview.totalClinics} 
            icon={BuildingOfficeIcon} 
            color="orange" 
          />
        )}
        <StatCard 
          title="Revenue" 
          value={stats.overview.revenue} 
          icon={CurrencyDollarIcon} 
          color="green" 
        />
        <StatCard 
          title="Satisfaction Rate" 
          value={stats.overview.satisfactionRate} 
          icon={ChartBarIcon} 
          color="blue" 
        />
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Appointments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {appointment.patient}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.doctor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard title="Today" value={stats.appointments.today} icon={CalendarIcon} color="blue" />
      <StatCard title="This Week" value={stats.appointments.thisWeek} icon={CalendarIcon} color="green" />
      <StatCard title="This Month" value={stats.appointments.thisMonth} icon={CalendarIcon} color="purple" />
      <StatCard title="Pending" value={stats.appointments.pending} icon={CalendarIcon} color="yellow" />
      <StatCard title="Completed" value={stats.appointments.completed} icon={CalendarIcon} color="green" />
      <StatCard title="Cancelled" value={stats.appointments.cancelled} icon={CalendarIcon} color="red" />
    </div>
  );

  const renderPatients = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="New Patients" value={stats.patients.new} icon={UsersIcon} color="green" />
      <StatCard title="Active Patients" value={stats.patients.active} icon={UsersIcon} color="blue" />
      <StatCard title="Returning Patients" value={stats.patients.returning} icon={UsersIcon} color="purple" />
      <StatCard title="Total Patients" value={stats.patients.total} icon={UsersIcon} color="orange" />
    </div>
  );

  const renderClinics = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Clinic Performance</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Clinic Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctors
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patients
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Revenue
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clinics.map((clinic) => (
              <tr key={clinic.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {clinic.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {clinic.doctors}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {clinic.patients.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {clinic.revenue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
      <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Reports Section</h3>
      <p className="text-gray-600">Detailed analytics and reporting features coming soon</p>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'appointments': return renderAppointments();
      case 'patients': return renderPatients();
      case 'clinics': return renderClinics();
      case 'reports': return renderReports();
      default: return renderOverview();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {hasRole('superadmin') ? 'Super Admin Dashboard' : 'Admin Dashboard'}
          </h1>
          <p className="text-gray-600 mt-1">
            Welcome back, {user?.name}! Here's what's happening with {hasRole('superadmin') ? 'your clinics' : 'your clinic'} today.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-600 hover:text-gray-900">
            <BellIcon className="h-6 w-6" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900">
            <Cog6ToothIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default Dashboard;
