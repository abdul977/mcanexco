import React from 'react';

const OriginalLetterView: React.FC = () => {
  return (
    <div className="h-screen bg-gray-50">
      <div className="h-full">
        <iframe
          src="/appointment-letter.html"
          className="w-full h-full border-0"
          title="Original MCAN Appointment Letter"
        />
      </div>
    </div>
  );
};

export default OriginalLetterView;
