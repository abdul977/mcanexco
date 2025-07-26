import React from 'react';
import { ConfigurationData } from '../types/appointmentTypes';

interface ConfigurationManagerProps {
  configurationData: ConfigurationData;
  onResetConfiguration: () => void;
  onCreateNewLetter: () => void;
}

const ConfigurationManager: React.FC<ConfigurationManagerProps> = ({
  configurationData,
  onResetConfiguration,
  onCreateNewLetter
}) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/image/logo mcan.png" 
                alt="MCAN Logo" 
                className="h-16 w-16 rounded-full object-contain mr-4"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  MCAN Appointment Letter System
                </h1>
                <p className="text-sm text-gray-600">
                  Muslim Corpers' Association of Nigeria - FCT Chapter
                </p>
              </div>
            </div>
            <p className="text-lg text-green-600 font-semibold">
              Configuration Active - Ready to Create Letters
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Your configuration is saved for this session. You can create multiple appointment letters.
            </p>
          </div>

          {/* Current Configuration Display */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              Current Configuration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">NYSC President Information</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Name:</strong> {configurationData.nycLogoContact.name}</p>
                  <p><strong>Phone:</strong> {configurationData.nycLogoContact.phone}</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">MCAN Secretary General Information</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Name:</strong> {configurationData.mcanLogoContact.name}</p>
                  <p><strong>Phone:</strong> {configurationData.mcanLogoContact.phone}</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-medium text-gray-700 mb-2">Shura Committee Chairman</h3>
              <p className="text-sm text-gray-600">
                <strong>Name:</strong> {configurationData.chairmanName}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onCreateNewLetter}
              className="flex-1 sm:flex-none bg-green-600 text-white py-3 px-8 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 font-medium"
            >
              Create New Appointment Letter
            </button>
            <button
              onClick={onResetConfiguration}
              className="flex-1 sm:flex-none bg-red-600 text-white py-3 px-8 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200 font-medium"
            >
              Reset Configuration
            </button>
          </div>

          {/* Information Box */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Session Information
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Your configuration is saved for this browser session</li>
                    <li>You can create multiple appointment letters without re-entering details</li>
                    <li>Configuration will be cleared when you close the browser or reset manually</li>
                    <li>Use "Reset Configuration" to change contact details or chairman information</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationManager;
