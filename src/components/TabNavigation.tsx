import React, { useState } from 'react';

interface TabNavigationProps {
  activeTab: 'original' | 'new';
  onTabChange: (tab: 'original' | 'new') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <img 
              src="/image/logo mcan.png" 
              alt="MCAN Logo" 
              className="h-10 w-10 rounded-full object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                MCAN Appointment Letter System
              </h1>
              <p className="text-sm text-gray-600">
                Muslim Corpers' Association of Nigeria - FCT Chapter
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1">
            <button
              onClick={() => onTabChange('original')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeTab === 'original'
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              Original Letter
            </button>
            <button
              onClick={() => onTabChange('new')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeTab === 'new'
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              New System
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
