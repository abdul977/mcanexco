import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { AppointmentProvider } from './context/AppointmentContext';
import TabNavigation from './components/TabNavigation';
import ConfigurationForm from './components/ConfigurationForm';
import ConfigurationManager from './components/ConfigurationManager';
import AppointmentTypeSelector from './components/AppointmentTypeSelector';
import AppointmentLetterForm from './components/AppointmentLetterForm';
import AdHocAppointmentForm from './components/AdHocAppointmentForm';
import LivePreview from './components/LivePreview';
import { ConfigurationData, AppointmentFormData, AdHocAppointmentFormData, AppointmentType } from './types/appointmentTypes';
import { sessionStorageUtils } from './utils/sessionStorage';
import './styles/appointment-letter.css';

type AppView = 'configuration' | 'manager' | 'typeSelector' | 'appointment' | 'adhocAppointment' | 'preview';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('configuration');
  const [configurationData, setConfigurationData] = useState<ConfigurationData | null>(null);
  const [appointmentType, setAppointmentType] = useState<AppointmentType>('regular');
  const [appointmentData, setAppointmentData] = useState<AppointmentFormData | AdHocAppointmentFormData>({
    name: '',
    position: '',
    academicYear: ''
  });

  const printRef = useRef<HTMLDivElement>(null);

  // Load configuration from session storage on app start
  useEffect(() => {
    const savedConfig = sessionStorageUtils.loadConfiguration();
    if (savedConfig && sessionStorageUtils.validateConfiguration(savedConfig)) {
      setConfigurationData(savedConfig);
      setCurrentView('manager');
    }
  }, []);

  const handleConfigurationComplete = (data: ConfigurationData) => {
    setConfigurationData(data);
    sessionStorageUtils.saveConfiguration(data);
    setCurrentView('manager');
  };

  const handleResetConfiguration = () => {
    sessionStorageUtils.clearConfiguration();
    setConfigurationData(null);
    setCurrentView('configuration');
    setAppointmentData({
      name: '',
      position: '',
      academicYear: ''
    });
  };

  const handleCreateNewLetter = () => {
    setCurrentView('typeSelector');
  };

  const handleAppointmentTypeSelect = (type: AppointmentType) => {
    setAppointmentType(type);
    if (type === 'regular') {
      setCurrentView('appointment');
      setAppointmentData({
        name: '',
        position: '',
        academicYear: ''
      });
    } else {
      setCurrentView('adhocAppointment');
      setAppointmentData({
        name: '',
        position: '',
        startDate: '',
        endDate: '',
        referenceNumber: `MCAN/${new Date().getFullYear()}/${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        batch: 'A1',
        customDuties: []
      });
    }
  };

  const handleAppointmentFormSubmit = (data: AppointmentFormData | AdHocAppointmentFormData) => {
    setAppointmentData(data);
    setCurrentView('preview');
  };

  const handleBackToManager = () => {
    setCurrentView('manager');
  };

  const handleBackToForm = () => {
    if (appointmentType === 'regular') {
      setCurrentView('appointment');
    } else {
      setCurrentView('adhocAppointment');
    }
  };

  const handleBackToTypeSelector = () => {
    setCurrentView('typeSelector');
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `MCAN_${appointmentType === 'adhoc' ? 'AdHoc_' : ''}Appointment_Letter_${appointmentData.position.replace(/\s+/g, '_')}_${appointmentData.name.replace(/\s+/g, '_') || 'Unnamed'}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 0.5in;
      }
      @media print {
        body { -webkit-print-color-adjust: exact; }
      }
    `
  });



  // Show final preview with print functionality
  if (currentView === 'preview' && configurationData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TabNavigation activeTab="new" onTabChange={() => {}} />
        <div className="bg-green-600 text-white p-4 no-print">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="/image/logo mcan.png"
                alt="MCAN Logo"
                className="h-10 w-10 rounded-full object-contain mr-4"
              />
              <div>
                <h1 className="text-2xl font-bold">
                  MCAN {appointmentType === 'adhoc' ? 'Ad Hoc ' : ''}Appointment Letter - Final Preview
                </h1>
                <p className="text-green-100">Review and print your appointment letter</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleBackToForm}
                className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-md transition duration-200"
              >
                ← Edit Letter
              </button>
              <button
                onClick={handleBackToManager}
                className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-md transition duration-200"
              >
                ← Back to Dashboard
              </button>
              <button
                onClick={handlePrint}
                className="bg-white text-green-600 hover:bg-gray-100 px-6 py-2 rounded-md transition duration-200 font-medium"
              >
                🖨️ Print Letter
              </button>
            </div>
          </div>
        </div>

        <div className="py-8 px-4">
          <div ref={printRef}>
            <LivePreview
              configurationData={configurationData}
              appointmentData={appointmentData}
              appointmentType={appointmentType}
            />
          </div>
        </div>
      </div>
    );
  }

  // Main new system interface
  return (
    <AppointmentProvider>
      <div className="min-h-screen bg-gray-50">
        <TabNavigation activeTab="new" onTabChange={() => {}} />

        {currentView === 'configuration' && (
          <ConfigurationForm onConfigurationComplete={handleConfigurationComplete} />
        )}

        {currentView === 'manager' && configurationData && (
          <ConfigurationManager
            configurationData={configurationData}
            onResetConfiguration={handleResetConfiguration}
            onCreateNewLetter={handleCreateNewLetter}
          />
        )}

        {currentView === 'typeSelector' && (
          <AppointmentTypeSelector
            onTypeSelect={handleAppointmentTypeSelect}
            onBack={handleBackToManager}
          />
        )}

        {currentView === 'appointment' && configurationData && (
          <AppointmentLetterForm
            configurationData={configurationData}
            onFormSubmit={handleAppointmentFormSubmit}
            onBack={handleBackToTypeSelector}
          />
        )}

        {currentView === 'adhocAppointment' && configurationData && (
          <AdHocAppointmentForm
            configurationData={configurationData}
            onFormSubmit={handleAppointmentFormSubmit}
            onBack={handleBackToTypeSelector}
          />
        )}
      </div>
    </AppointmentProvider>
  );
}

export default App;