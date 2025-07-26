import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ConfigurationData, AppointmentFormData, FormPhase } from '../types/appointmentTypes';

interface AppointmentState {
  currentPhase: FormPhase;
  configurationData: ConfigurationData | null;
  appointmentData: AppointmentFormData;
  isConfigurationComplete: boolean;
  isAppointmentComplete: boolean;
}

type AppointmentAction =
  | { type: 'SET_PHASE'; payload: FormPhase }
  | { type: 'SET_CONFIGURATION'; payload: ConfigurationData }
  | { type: 'SET_APPOINTMENT_DATA'; payload: AppointmentFormData }
  | { type: 'UPDATE_APPOINTMENT_FIELD'; payload: { field: keyof AppointmentFormData; value: string } }
  | { type: 'COMPLETE_CONFIGURATION' }
  | { type: 'COMPLETE_APPOINTMENT' }
  | { type: 'RESET_FORM' };

const initialState: AppointmentState = {
  currentPhase: 'configuration',
  configurationData: null,
  appointmentData: {
    name: '',
    position: '',
    academicYear: ''
  },
  isConfigurationComplete: false,
  isAppointmentComplete: false
};

const appointmentReducer = (state: AppointmentState, action: AppointmentAction): AppointmentState => {
  switch (action.type) {
    case 'SET_PHASE':
      return {
        ...state,
        currentPhase: action.payload
      };

    case 'SET_CONFIGURATION':
      return {
        ...state,
        configurationData: action.payload,
        isConfigurationComplete: true,
        currentPhase: 'appointment'
      };

    case 'SET_APPOINTMENT_DATA':
      return {
        ...state,
        appointmentData: action.payload
      };

    case 'UPDATE_APPOINTMENT_FIELD':
      return {
        ...state,
        appointmentData: {
          ...state.appointmentData,
          [action.payload.field]: action.payload.value
        }
      };

    case 'COMPLETE_CONFIGURATION':
      return {
        ...state,
        isConfigurationComplete: true,
        currentPhase: 'appointment'
      };

    case 'COMPLETE_APPOINTMENT':
      return {
        ...state,
        isAppointmentComplete: true
      };

    case 'RESET_FORM':
      return initialState;

    default:
      return state;
  }
};

interface AppointmentContextType {
  state: AppointmentState;
  dispatch: React.Dispatch<AppointmentAction>;
  // Helper functions
  setPhase: (phase: FormPhase) => void;
  setConfiguration: (data: ConfigurationData) => void;
  setAppointmentData: (data: AppointmentFormData) => void;
  updateAppointmentField: (field: keyof AppointmentFormData, value: string) => void;
  completeConfiguration: () => void;
  completeAppointment: () => void;
  resetForm: () => void;
  // Validation functions
  validateConfiguration: (data: ConfigurationData) => Record<string, string>;
  validateAppointment: (data: AppointmentFormData) => Record<string, string>;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointment must be used within an AppointmentProvider');
  }
  return context;
};

interface AppointmentProviderProps {
  children: ReactNode;
}

export const AppointmentProvider: React.FC<AppointmentProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appointmentReducer, initialState);

  // Helper functions
  const setPhase = (phase: FormPhase) => {
    dispatch({ type: 'SET_PHASE', payload: phase });
  };

  const setConfiguration = (data: ConfigurationData) => {
    dispatch({ type: 'SET_CONFIGURATION', payload: data });
  };

  const setAppointmentData = (data: AppointmentFormData) => {
    dispatch({ type: 'SET_APPOINTMENT_DATA', payload: data });
  };

  const updateAppointmentField = (field: keyof AppointmentFormData, value: string) => {
    dispatch({ type: 'UPDATE_APPOINTMENT_FIELD', payload: { field, value } });
  };

  const completeConfiguration = () => {
    dispatch({ type: 'COMPLETE_CONFIGURATION' });
  };

  const completeAppointment = () => {
    dispatch({ type: 'COMPLETE_APPOINTMENT' });
  };

  const resetForm = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  // Validation functions
  const validateConfiguration = (data: ConfigurationData): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!data.nycLogoContact.name.trim()) {
      errors['nycLogoContact.name'] = 'NYSC President name is required';
    }
    if (!data.nycLogoContact.phone.trim()) {
      errors['nycLogoContact.phone'] = 'NYSC President phone is required';
    }
    if (!data.mcanLogoContact.name.trim()) {
      errors['mcanLogoContact.name'] = 'MCAN Secretary General name is required';
    }
    if (!data.mcanLogoContact.phone.trim()) {
      errors['mcanLogoContact.phone'] = 'MCAN Secretary General phone is required';
    }
    if (!data.chairmanName.trim()) {
      errors['chairmanName'] = 'Chairman name is required';
    }

    return errors;
  };

  const validateAppointment = (data: AppointmentFormData): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!data.position.trim()) {
      errors.position = 'Position is required';
    }

    if (!data.academicYear.trim()) {
      errors.academicYear = 'Academic year is required';
    } else if (!/^\d{4}\/\d{2,4}$/.test(data.academicYear.trim())) {
      errors.academicYear = 'Academic year should be in format: 2024/25 or 2024/2025';
    }

    return errors;
  };

  const contextValue: AppointmentContextType = {
    state,
    dispatch,
    setPhase,
    setConfiguration,
    setAppointmentData,
    updateAppointmentField,
    completeConfiguration,
    completeAppointment,
    resetForm,
    validateConfiguration,
    validateAppointment
  };

  return (
    <AppointmentContext.Provider value={contextValue}>
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentContext;
