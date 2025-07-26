import React from 'react';
import { ConfigurationData, AppointmentFormData, AdHocAppointmentFormData, AppointmentType } from '../types/appointmentTypes';
import DocumentHeader from './DocumentHeader';

interface LivePreviewProps {
  configurationData: ConfigurationData;
  appointmentData: AppointmentFormData | AdHocAppointmentFormData;
  appointmentType?: AppointmentType;
}

const LivePreview: React.FC<LivePreviewProps> = ({
  configurationData,
  appointmentData,
  appointmentType = 'regular'
}) => {
  const generateDottedLine = (length: number = 20) => {
    return '.'.repeat(length);
  };

  const isAdHoc = appointmentType === 'adhoc';
  const adHocData = isAdHoc ? appointmentData as AdHocAppointmentFormData : null;
  const regularData = !isAdHoc ? appointmentData as AppointmentFormData : null;

  const displayName = appointmentData.name.trim() || generateDottedLine(25);
  const displayPosition = appointmentData.position.trim() || generateDottedLine(15);

  // For regular appointments, use academic year; for ad hoc, use date range
  const displayPeriod = isAdHoc && adHocData
    ? `${adHocData.startDate || generateDottedLine(10)} to ${adHocData.endDate || generateDottedLine(10)}`
    : regularData?.academicYear.trim() || generateDottedLine(10);

  return (
    <div className="appointment-document">
      <div className="document">
        {/* Document Content */}
        <div className="relative z-10">
        {/* Header */}
        <DocumentHeader configurationData={configurationData} />

        {/* Title */}
        <div className="title text-xl font-bold underline my-8 text-center relative z-10">
          {isAdHoc ? 'AD HOC EXECUTIVE APPOINTMENT LETTER' : 'APPOINTMENT LETTER'}
        </div>

        {/* Main Content */}
        <div className="content text-justify leading-relaxed my-8 relative z-10">
          {isAdHoc ? (
            <>
              I am pleased to inform you of your appointment as{' '}
              <strong>{displayPosition.toUpperCase()}</strong> of the Muslim
              Corpers' Association of Nigeria (MCAN). This appointment is effective from{' '}
              <strong>{adHocData?.startDate || generateDottedLine(10)}</strong> to{' '}
              <strong>{adHocData?.endDate || generateDottedLine(10)}</strong>.
              {adHocData?.referenceNumber && (
                <>
                  <br /><br />
                  Reference Number: <strong>{adHocData.referenceNumber}</strong>
                  {adHocData.batch && <> | Batch: <strong>{adHocData.batch}</strong></>}
                </>
              )}
            </>
          ) : (
            <>
              After satisfying the laid down requirement by the Shurah committee of the
              organization and after due consideration, we hereby APPOINT{' '}
              <strong>{displayName}</strong> as <strong>{displayPosition}</strong>{' '}
              to serve the association for <strong>{displayPeriod}</strong> academic session, hoping for your best
              services, dedication and contribution towards the upliftment of the
              association and Islam at large.
            </>
          )}
        </div>

        {/* Congratulations */}
        <div className="congratulations">
          Congratulations!
        </div>

        {/* Date and Signature section aligned horizontally */}
        <div className="date-signature-container">
          <div className="date-section">
            <strong>Date:</strong> _______________
          </div>

          <div className="signature-section">
            <div className="signature-left">
              <div className="signature-label">Sign</div>
              <div className="signature-line"></div>
              <div className="signature-title">Chairman Shurah Committee</div>
              <div className="signature-name">{configurationData.chairmanName.toUpperCase()}</div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
