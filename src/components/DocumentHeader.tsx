import React from 'react';
import { ConfigurationData } from '../types/appointmentTypes';

interface DocumentHeaderProps {
  configurationData: ConfigurationData;
}

const DocumentHeader: React.FC<DocumentHeaderProps> = ({ configurationData }) => {
  return (
    <div className="header">
      {/* Top Section with Logos */}
      <div className="header-top">
        {/* Left Logo Section */}
        <div className="logo-section-left">
          <div className="logo-left">
            <img
              src="/image/logo mcan.png"
              alt="MCAN Logo"
              loading="lazy"
            />
          </div>
          <div className="logo-caption-left">
            <div><strong>Secretary General</strong></div>
            <div>{configurationData.mcanLogoContact.name}</div>
            <div>{configurationData.mcanLogoContact.phone}</div>
          </div>
        </div>

        {/* Center Content */}
        <div className="header-center">
          <div className="organization-name">
            MUSLIM CORPERS' ASSOCIATION OF NIGERIA
          </div>
          <div className="chapter-name">
            (MCAN) FCT CHAPTER
          </div>
        </div>

        {/* Right Logo Section */}
        <div className="logo-section-right">
          <div className="logo-right">
            <img
              src="/image/nysc logo.jpg"
              alt="NYSC Logo"
              loading="lazy"
            />
          </div>
          <div className="logo-caption-right">
            <div><strong>President</strong></div>
            <div>{configurationData.nycLogoContact.name}</div>
            <div>{configurationData.nycLogoContact.phone}</div>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="header-address">
        NYSC Permanent Orientation Camp, Kubwa, Bwari Area Council, FCT Abuja
      </div>

      {/* Contact Info */}
      <div className="contact-info">
        Email: mcanfctng@gmail.com
      </div>

      {/* Motto */}
      <div className="motto">
        <strong>Motto:</strong> 'Say, Truly, my prayer and my service, my life and my death, (all) for Allah, the Cherisher of the Worlds'
      </div>

      {/* Reference Section */}
      <div className="reference-section">
        <div className="ref-line">
          Our Ref: ........................
        </div>
        <div className="ref-line">
          Your Ref: ........................
        </div>
        <div className="ref-line">
          Date: ........................
        </div>
      </div>

      {/* Horizontal Lines */}
      <div className="horizontal-line"></div>
      <div className="horizontal-line"></div>
    </div>
  );
};

export default DocumentHeader;
