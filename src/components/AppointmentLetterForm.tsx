import React, { useState } from 'react';
import { ConfigurationData, AppointmentFormData } from '../types/appointmentTypes';
import LivePreview from './LivePreview';

interface AppointmentLetterFormProps {
  configurationData: ConfigurationData;
  onFormSubmit: (data: AppointmentFormData) => void;
  onBack: () => void;
}

const AppointmentLetterForm: React.FC<AppointmentLetterFormProps> = ({
  configurationData,
  onFormSubmit,
  onBack
}) => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    name: '',
    position: '',
    academicYear: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof AppointmentFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Position is required
    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }

    // Academic year is required and should match format
    if (!formData.academicYear.trim()) {
      newErrors.academicYear = 'Academic year is required';
    } else if (!/^\d{4}\/\d{2,4}$/.test(formData.academicYear.trim())) {
      newErrors.academicYear = 'Academic year should be in format: 2024/25 or 2024/2025';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onFormSubmit(formData);
    }
  };

  const generateDottedLine = (length: number = 20) => {
    return '.'.repeat(length);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Form Header */}
          <div className="bg-green-600 text-white p-4 sm:p-6">
            {/* Desktop Header */}
            <div className="hidden sm:flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src="/image/logo mcan.png"
                  alt="MCAN Logo"
                  className="h-10 sm:h-12 w-10 sm:w-12 rounded-full object-contain mr-3 sm:mr-4 flex-shrink-0"
                />
                <div>
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">MCAN Appointment Letter System</h1>
                  <p className="text-green-100 text-sm">Phase 2: Appointment Letter Form</p>
                </div>
              </div>
              <button
                onClick={onBack}
                className="bg-green-500 hover:bg-green-400 px-3 sm:px-4 py-2 rounded-md transition duration-200 text-sm sm:text-base flex-shrink-0"
              >
                ← Back
              </button>
            </div>

            {/* Mobile Header */}
            <div className="sm:hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center min-w-0 flex-1">
                  <img
                    src="/image/logo mcan.png"
                    alt="MCAN Logo"
                    className="h-8 w-8 rounded-full object-contain mr-3 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h1 className="text-lg font-bold truncate">MCAN Letter System</h1>
                    <p className="text-green-100 text-xs">Phase 2: Form</p>
                  </div>
                </div>
                <button
                  onClick={onBack}
                  className="bg-green-500 hover:bg-green-400 px-3 py-1.5 rounded-md transition duration-200 text-sm flex-shrink-0"
                >
                  ← Back
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row">
            {/* Form Section */}
            <div className="xl:w-1/3 p-4 sm:p-6 xl:border-r border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
                Appointment Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-base sm:text-sm"
                    placeholder="Enter full name (leave empty for dotted line)"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    If left empty, dotted lines will appear in the document
                  </p>
                </div>

                {/* Position Field */}
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                    Position *
                  </label>
                  <input
                    type="text"
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    className={`w-full px-3 py-2.5 sm:py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-base sm:text-sm ${
                      errors.position ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., BUSINESS CHAIRMAN"
                  />
                  {errors.position && (
                    <p className="mt-1 text-sm text-red-600">{errors.position}</p>
                  )}
                </div>

                {/* Academic Year Field */}
                <div>
                  <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700 mb-2">
                    Academic Year *
                  </label>
                  <input
                    type="text"
                    id="academicYear"
                    value={formData.academicYear}
                    onChange={(e) => handleInputChange('academicYear', e.target.value)}
                    className={`w-full px-3 py-2.5 sm:py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-base sm:text-sm ${
                      errors.academicYear ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 2024/25 or 2024/2025"
                  />
                  {errors.academicYear && (
                    <p className="mt-1 text-sm text-red-600">{errors.academicYear}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Format: 2024/25 or 2024/2025
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 font-medium text-base sm:text-sm"
                  >
                    Generate Appointment Letter
                  </button>
                </div>
              </form>

              {/* Configuration Summary */}
              <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gray-50 rounded-md">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Configuration Summary:</h3>
                <div className="text-xs text-gray-600 space-y-1">
                  <p><strong>NYSC President:</strong> {configurationData.nycLogoContact.name}</p>
                  <p><strong>MCAN Secretary General:</strong> {configurationData.mcanLogoContact.name}</p>
                  <p><strong>Chairman:</strong> {configurationData.chairmanName}</p>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="xl:w-2/3 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Live Preview
                </h2>
                <div className="xl:hidden">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    Scroll to view
                  </span>
                </div>
              </div>

              {/* Mobile Preview */}
              <div className="xl:hidden border border-gray-300 rounded-md p-2 bg-gray-50 overflow-auto">
                <div className="transform scale-50 origin-top-left" style={{ width: '200%', height: '200%' }}>
                  <LivePreview
                    configurationData={configurationData}
                    appointmentData={formData}
                    appointmentType="regular"
                  />
                </div>
              </div>

              {/* Desktop Preview */}
              <div className="hidden xl:block border border-gray-300 rounded-md p-4 bg-gray-50 min-h-[600px] overflow-auto">
                <div className="transform scale-75 origin-top">
                  <LivePreview
                    configurationData={configurationData}
                    appointmentData={formData}
                    appointmentType="regular"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentLetterForm;
