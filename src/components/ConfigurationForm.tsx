import React, { useState } from 'react';
import { ConfigurationData } from '../types/appointmentTypes';

interface ConfigurationFormProps {
  onConfigurationComplete: (data: ConfigurationData) => void;
}

const ConfigurationForm: React.FC<ConfigurationFormProps> = ({ onConfigurationComplete }) => {
  const [formData, setFormData] = useState<ConfigurationData>({
    nycLogoContact: {
      name: '',
      phone: ''
    },
    mcanLogoContact: {
      name: '',
      phone: ''
    },
    chairmanName: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (section: keyof ConfigurationData, field: string, value: string) => {
    if (section === 'chairmanName') {
      setFormData(prev => ({
        ...prev,
        chairmanName: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    }

    // Clear error when user starts typing
    const errorKey = section === 'chairmanName' ? section : `${section}.${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({
        ...prev,
        [errorKey]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate NYC logo contact
    if (!formData.nycLogoContact.name.trim()) {
      newErrors['nycLogoContact.name'] = 'NYSC President name is required';
    }
    if (!formData.nycLogoContact.phone.trim()) {
      newErrors['nycLogoContact.phone'] = 'NYSC President phone is required';
    }

    // Validate MCAN logo contact
    if (!formData.mcanLogoContact.name.trim()) {
      newErrors['mcanLogoContact.name'] = 'MCAN Secretary General name is required';
    }
    if (!formData.mcanLogoContact.phone.trim()) {
      newErrors['mcanLogoContact.phone'] = 'MCAN Secretary General phone is required';
    }

    // Validate chairman name
    if (!formData.chairmanName.trim()) {
      newErrors['chairmanName'] = 'Chairman name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onConfigurationComplete(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 lg:p-8">
          <div className="text-center mb-6 sm:mb-8">
            {/* Mobile Header */}
            <div className="flex flex-col sm:flex-row items-center justify-center mb-4 space-y-3 sm:space-y-0 sm:space-x-4">
              <img
                src="/image/logo mcan.png"
                alt="MCAN Logo"
                className="h-12 w-12 sm:h-16 sm:w-16 rounded-full object-contain flex-shrink-0"
              />
              <div className="text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                  MCAN Appointment Letter System
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">
                  Muslim Corpers' Association of Nigeria - FCT Chapter
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-base sm:text-lg text-gray-600 font-medium">
                Phase 1: Configuration Setup
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Please provide the contact information and chairman details for the appointment letter header.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* NYSC Logo Contact Section */}
            <div className="border-b border-gray-200 pb-4 sm:pb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                NYSC President Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="nysc-name" className="block text-sm font-medium text-gray-700 mb-2">
                    NYSC President Name *
                  </label>
                  <input
                    type="text"
                    id="nysc-name"
                    value={formData.nycLogoContact.name}
                    onChange={(e) => handleInputChange('nycLogoContact', 'name', e.target.value)}
                    className={`w-full px-3 py-2.5 sm:py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-base sm:text-sm ${
                      errors['nycLogoContact.name'] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter NYSC President name"
                  />
                  {errors['nycLogoContact.name'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['nycLogoContact.name']}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="nysc-phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="nysc-phone"
                    value={formData.nycLogoContact.phone}
                    onChange={(e) => handleInputChange('nycLogoContact', 'phone', e.target.value)}
                    className={`w-full px-3 py-2.5 sm:py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-base sm:text-sm ${
                      errors['nycLogoContact.phone'] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter phone number"
                  />
                  {errors['nycLogoContact.phone'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['nycLogoContact.phone']}</p>
                  )}
                </div>
              </div>
            </div>

            {/* MCAN Logo Contact Section */}
            <div className="border-b border-gray-200 pb-4 sm:pb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                MCAN Secretary General Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="mcan-name" className="block text-sm font-medium text-gray-700 mb-2">
                    MCAN Secretary General Name *
                  </label>
                  <input
                    type="text"
                    id="mcan-name"
                    value={formData.mcanLogoContact.name}
                    onChange={(e) => handleInputChange('mcanLogoContact', 'name', e.target.value)}
                    className={`w-full px-3 py-2.5 sm:py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-base sm:text-sm ${
                      errors['mcanLogoContact.name'] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter MCAN Secretary General name"
                  />
                  {errors['mcanLogoContact.name'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['mcanLogoContact.name']}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="mcan-phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="mcan-phone"
                    value={formData.mcanLogoContact.phone}
                    onChange={(e) => handleInputChange('mcanLogoContact', 'phone', e.target.value)}
                    className={`w-full px-3 py-2.5 sm:py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-base sm:text-sm ${
                      errors['mcanLogoContact.phone'] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter phone number"
                  />
                  {errors['mcanLogoContact.phone'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['mcanLogoContact.phone']}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Chairman Section */}
            <div className="pb-4 sm:pb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                Shura Committee Chairman
              </h2>
              <div>
                <label htmlFor="chairman-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Chairman's Full Name *
                </label>
                <input
                  type="text"
                  id="chairman-name"
                  value={formData.chairmanName}
                  onChange={(e) => handleInputChange('chairmanName', '', e.target.value)}
                  className={`w-full px-3 py-2.5 sm:py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-base sm:text-sm ${
                    errors['chairmanName'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter chairman's full name"
                />
                {errors['chairmanName'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['chairmanName']}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 sm:pt-6">
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 sm:py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 font-medium text-base sm:text-sm"
              >
                Continue to Appointment Letter Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationForm;
