import React from 'react';

interface TabNavigationProps {
  activeTab: 'original' | 'new';
  onTabChange: (tab: 'original' | 'new') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <img
              src="/image/logo mcan.png"
              alt="MCAN Logo"
              className="h-10 w-10 rounded-full object-contain flex-shrink-0"
            />
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-gray-900 truncate">
                MCAN Appointment Letter System
              </h1>
              <p className="text-sm text-gray-600 truncate">
                Muslim Corpers' Association of Nigeria - FCT Chapter
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Mobile Header */}
          <div className="flex items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <img
                src="/image/logo mcan.png"
                alt="MCAN Logo"
                className="h-8 w-8 rounded-full object-contain flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h1 className="text-lg font-bold text-gray-900 truncate">
                  MCAN Letter System
                </h1>
                <p className="text-xs text-gray-600 truncate">
                  MCAN - FCT Chapter
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tablet Layout */}
        <div className="hidden sm:flex md:hidden items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <img
              src="/image/logo mcan.png"
              alt="MCAN Logo"
              className="h-9 w-9 rounded-full object-contain flex-shrink-0"
            />
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-gray-900 truncate">
                MCAN Appointment Letter System
              </h1>
              <p className="text-sm text-gray-600 truncate">
                MCAN - FCT Chapter
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
