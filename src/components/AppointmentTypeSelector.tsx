import React from 'react';
import { AppointmentType } from '../types/appointmentTypes';

interface AppointmentTypeSelectorProps {
  onTypeSelect: (type: AppointmentType) => void;
  onBack: () => void;
}

const AppointmentTypeSelector: React.FC<AppointmentTypeSelectorProps> = ({ 
  onTypeSelect, 
  onBack 
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
            <p className="text-lg text-gray-700">
              Select Appointment Type
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Choose the type of appointment letter you want to create.
            </p>
          </div>

          {/* Appointment Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Regular Appointment Card */}
            <div 
              onClick={() => onTypeSelect('regular')}
              className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 cursor-pointer hover:from-green-100 hover:to-green-200 hover:border-green-300 transition-all duration-200 transform hover:scale-105"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  Regular Appointment
                </h3>
                <p className="text-green-700 text-sm mb-4">
                  Standard appointment letters for regular positions and academic sessions.
                </p>
                <div className="text-xs text-green-600 space-y-1">
                  <p>• Academic year-based appointments</p>
                  <p>• Standard position titles</p>
                  <p>• Session-based terms</p>
                </div>
              </div>
            </div>

            {/* Ad Hoc Appointment Card */}
            <div 
              onClick={() => onTypeSelect('adhoc')}
              className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 cursor-pointer hover:from-blue-100 hover:to-blue-200 hover:border-blue-300 transition-all duration-200 transform hover:scale-105"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-2">
                  Ad Hoc Appointment
                </h3>
                <p className="text-blue-700 text-sm mb-4">
                  Special appointments for temporary positions with specific start and end dates.
                </p>
                <div className="text-xs text-blue-600 space-y-1">
                  <p>• Custom date ranges</p>
                  <p>• Executive positions</p>
                  <p>• Batch-specific appointments</p>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <button
              onClick={onBack}
              className="bg-gray-600 text-white py-3 px-8 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200 font-medium"
            >
              ← Back to Dashboard
            </button>
          </div>

          {/* Information Box */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Choose Carefully
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    Select the appropriate appointment type based on your needs. Regular appointments are for standard academic sessions, while Ad Hoc appointments are for temporary or executive positions with specific date ranges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentTypeSelector;
