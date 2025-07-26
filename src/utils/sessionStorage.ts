import { ConfigurationData } from '../types/appointmentTypes';

const CONFIGURATION_KEY = 'mcan_appointment_configuration';

export const sessionStorageUtils = {
  // Save configuration to session storage
  saveConfiguration: (configuration: ConfigurationData): void => {
    try {
      const configString = JSON.stringify(configuration);
      sessionStorage.setItem(CONFIGURATION_KEY, configString);
    } catch (error) {
      console.error('Failed to save configuration to session storage:', error);
    }
  },

  // Load configuration from session storage
  loadConfiguration: (): ConfigurationData | null => {
    try {
      const configString = sessionStorage.getItem(CONFIGURATION_KEY);
      if (configString) {
        return JSON.parse(configString) as ConfigurationData;
      }
      return null;
    } catch (error) {
      console.error('Failed to load configuration from session storage:', error);
      return null;
    }
  },

  // Check if configuration exists in session storage
  hasConfiguration: (): boolean => {
    try {
      const configString = sessionStorage.getItem(CONFIGURATION_KEY);
      return configString !== null && configString.trim() !== '';
    } catch (error) {
      console.error('Failed to check configuration in session storage:', error);
      return false;
    }
  },

  // Clear configuration from session storage
  clearConfiguration: (): void => {
    try {
      sessionStorage.removeItem(CONFIGURATION_KEY);
    } catch (error) {
      console.error('Failed to clear configuration from session storage:', error);
    }
  },

  // Validate configuration data
  validateConfiguration: (config: any): config is ConfigurationData => {
    return (
      config &&
      typeof config === 'object' &&
      config.nycLogoContact &&
      typeof config.nycLogoContact.name === 'string' &&
      typeof config.nycLogoContact.phone === 'string' &&
      config.mcanLogoContact &&
      typeof config.mcanLogoContact.name === 'string' &&
      typeof config.mcanLogoContact.phone === 'string' &&
      typeof config.chairmanName === 'string'
    );
  }
};

export default sessionStorageUtils;
