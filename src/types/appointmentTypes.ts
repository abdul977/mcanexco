export interface ConfigurationData {
  nycLogoContact: {
    name: string;
    phone: string;
  };
  mcanLogoContact: {
    name: string;
    phone: string;
  };
  chairmanName: string;
}

export interface AppointmentFormData {
  name: string;
  position: string;
  academicYear: string;
}

export interface AdHocAppointmentFormData {
  name: string;
  position: string;
  startDate: string;
  endDate: string;
  referenceNumber: string;
  batch: string;
  customDuties?: string[];
}

export interface AppointmentLetterData {
  configuration: ConfigurationData;
  appointment: AppointmentFormData | AdHocAppointmentFormData;
  appointmentType: AppointmentType;
}

export type AppointmentType = 'regular' | 'adhoc';
export type FormPhase = 'configuration' | 'appointment';
