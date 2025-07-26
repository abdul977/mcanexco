import React, { useState } from 'react';
import { ConfigurationData, AdHocAppointmentFormData } from '../types/appointmentTypes';
import LivePreview from './LivePreview';

interface AdHocAppointmentFormProps {
  configurationData: ConfigurationData;
  onFormSubmit: (data: AdHocAppointmentFormData) => void;
  onBack: () => void;
}

const BATCHES = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const EXECUTIVE_POSITIONS = [
  'AMEER',
  'VICE AMEER', 
  'SECRETARY GENERAL',
  'ASSISTANT SECRETARY GENERAL',
  'FINANCIAL SECRETARY',
  'TREASURER',
  'AUDITOR',
  'PUBLIC RELATIONS OFFICER',
  'WELFARE OFFICER',
  'BUSINESS CHAIRMAN',
  'EDUCATION CHAIRMAN',
  'DAWAH CHAIRMAN',
  'SPORTS CHAIRMAN',
  'CHIEF WHIP'
];

const AdHocAppointmentForm: React.FC<AdHocAppointmentFormProps> = ({
  configurationData,
  onFormSubmit,
  onBack
}) => {
  const [formData, setFormData] = useState<AdHocAppointmentFormData>({
    name: '',
    position: '',
    startDate: '',
    endDate: '',
    referenceNumber: `MCAN/${new Date().getFullYear()}/${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    batch: 'A1',
    customDuties: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof AdHocAppointmentFormData, value: string | string[]) => {
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

    // Name is required for ad hoc appointments
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required for ad hoc appointments';
    }

    // Position is required
    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }

    // Start date is required
    if (!formData.startDate.trim()) {
      newErrors.startDate = 'Start date is required';
    }

    // End date is required
    if (!formData.endDate.trim()) {
      newErrors.endDate = 'End date is required';
    }

    // Validate date range
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end <= start) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    // Reference number is required
    if (!formData.referenceNumber.trim()) {
      newErrors.referenceNumber = 'Reference number is required';
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Form Header */}
          <div className="bg-green-600 text-white p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src="/image/logo mcan.png"
                  alt="MCAN Logo"
                  className="h-12 w-12 rounded-full object-contain mr-4"
                />
                <div>
                  <h1 className="text-2xl font-bold">MCAN Ad Hoc Appointment Letter</h1>
                  <p className="text-green-100">Executive Appointment Form</p>
                </div>
              </div>
              <button
                onClick={onBack}
                className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-md transition duration-200"
              >
                ← Back to Type Selection
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Form Section */}
            <div className="lg:w-1/3 p-6 border-r border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Ad Hoc Appointment Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field - Required for Ad Hoc */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Position Field */}
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                    Position *
                  </label>
                  <select
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.position ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Position</option>
                    {EXECUTIVE_POSITIONS.map(position => (
                      <option key={position} value={position}>{position}</option>
                    ))}
                  </select>
                  {errors.position && (
                    <p className="mt-1 text-sm text-red-600">{errors.position}</p>
                  )}
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.startDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.startDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.endDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.endDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
                    )}
                  </div>
                </div>

                {/* Reference Number */}
                <div>
                  <label htmlFor="referenceNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Reference Number *
                  </label>
                  <input
                    type="text"
                    id="referenceNumber"
                    value={formData.referenceNumber}
                    onChange={(e) => handleInputChange('referenceNumber', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.referenceNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="MCAN/2024/001"
                  />
                  {errors.referenceNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.referenceNumber}</p>
                  )}
                </div>

                {/* Batch */}
                <div>
                  <label htmlFor="batch" className="block text-sm font-medium text-gray-700 mb-2">
                    Batch
                  </label>
                  <select
                    id="batch"
                    value={formData.batch}
                    onChange={(e) => handleInputChange('batch', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {BATCHES.map(batch => (
                      <option key={batch} value={batch}>{batch}</option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 font-medium"
                  >
                    Generate Ad Hoc Appointment Letter
                  </button>
                </div>
              </form>
            </div>

            {/* Preview Section */}
            <div className="lg:w-2/3 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Live Preview
              </h2>
              <div className="border border-gray-300 rounded-md p-4 bg-gray-50 min-h-[600px] overflow-auto">
                <div className="transform scale-75 origin-top">
                  <LivePreview 
                    configurationData={configurationData}
                    appointmentData={formData}
                    appointmentType="adhoc"
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

export default AdHocAppointmentForm;
