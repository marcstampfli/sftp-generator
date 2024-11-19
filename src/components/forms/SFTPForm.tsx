import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ConnectionDetails, AuthenticationDetails, ConfigurationOptions } from './steps';
import { FormData, FormErrors, StepProps } from '../../types/forms';
import { ProgressBar } from '../common/ProgressBar';
import { GeneratedJSON } from '../output/GeneratedJSON';
import { Header } from '../common/Header';
import { testConnection } from '../../services/SFTPService';
import { ProfileManager } from '../profile/ProfileManager';

interface SFTPFormProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

interface Step {
  title: string;
  component: React.FC<StepProps>;
}

export const SFTPForm: React.FC<SFTPFormProps> = ({ darkMode, toggleDarkMode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    name: '',
    host: '',
    port: 22,
    protocol: 'sftp',
    username: '',
    authType: 'password',
    remotePath: '/',
    uploadOnSave: false,
    useTempFile: false,
    openSsh: false,
    connectionTimeout: 10000,
    keepAliveInterval: 30000,
    maxRetries: 3,
    retryDelay: 5000,
    debugLogging: false,
    forceIPv4: false,
    compress: false,
  });
  const [showProfiles, setShowProfiles] = useState(false);
  const [profiles, setProfiles] = useState<{ [key: string]: FormData }>({});

  // Load profiles on mount
  useEffect(() => {
    const savedProfiles = localStorage.getItem('sftpProfiles');
    if (savedProfiles) {
      try {
        const parsedProfiles = JSON.parse(savedProfiles);
        setProfiles(parsedProfiles);
      } catch (error) {
        console.error('Error parsing profiles:', error);
        toast.error('Error loading profiles');
      }
    }
  }, []);

  const steps: Step[] = [
    {
      title: 'Connection Details',
      component: ConnectionDetails,
    },
    {
      title: 'Authentication',
      component: AuthenticationDetails,
    },
    {
      title: 'Configuration',
      component: ConfigurationOptions,
    },
    {
      title: 'Review & Generate',
      component: GeneratedJSON,
    },
  ];

  const handleProfileSelect = (profile: FormData) => {
    setFormData(profile);
    setCurrentStep(1);
    toast.success('Profile loaded successfully!');
  };

  const validateStep = async (step: number, formData: FormData): Promise<FormErrors> => {
    const errors: FormErrors = {};

    switch (step) {
      case 1: // Connection Details
        if (!formData.name?.trim()) errors.name = 'Name is required';
        if (!formData.host?.trim()) errors.host = 'Host is required';
        if (!formData.port || formData.port < 1 || formData.port > 65535) {
          errors.port = 'Port must be between 1 and 65535';
        }
        break;

      case 2: // Authentication
        if (!formData.username?.trim()) errors.username = 'Username is required';
        if (formData.authType === 'password' && !formData.password?.trim()) {
          errors.password = 'Password is required';
        }
        if (formData.authType === 'privateKey' && !formData.privateKeyPath?.trim()) {
          errors.privateKeyPath = 'Private key is required';
        }
        break;

      case 3: // Configuration
        if (!formData.remotePath?.trim()) errors.remotePath = 'Remote path is required';
        break;
    }

    return errors;
  };

  const handleNext = async () => {
    if (currentStep === steps.length) return;

    // Validate current step
    const stepErrors = await validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    setErrors({});
  };

  const handleBack = () => {
    if (currentStep === 1) return;
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setErrors({});
  };

  const handleTestConnection = async () => {
    try {
      const result = await testConnection(formData);
      if (result.success) {
        toast.success(result.message || 'Connection successful!');
      } else {
        toast.error(`Connection failed: ${result.error}`);
      }
    } catch (error) {
      toast.error(`Error testing connection: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleSaveProfile = () => {
    // Add or update the profile
    const updatedProfiles = {
      ...profiles,
      [formData.name]: formData
    };

    // Update state and localStorage
    setProfiles(updatedProfiles);
    localStorage.setItem('sftpProfiles', JSON.stringify(updatedProfiles));
    
    toast.success('Profile saved successfully!');
    // Open the profiles sidebar to show the saved profile
    setShowProfiles(true);
  };

  const handleDeleteProfile = (profileName: string) => {
    const updatedProfiles = { ...profiles };
    delete updatedProfiles[profileName];
    setProfiles(updatedProfiles);
    localStorage.setItem('sftpProfiles', JSON.stringify(updatedProfiles));
    toast.success('Profile deleted successfully!');
  };

  return (
    <div className={`container mx-auto px-4 py-8 ${showProfiles ? 'ml-64' : ''} transition-all duration-300`}>
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        toggleProfiles={() => setShowProfiles(!showProfiles)}
        showProfiles={showProfiles}
      />
      
      <ProfileManager
        darkMode={darkMode}
        onProfileSelect={handleProfileSelect}
        onDeleteProfile={handleDeleteProfile}
        isOpen={showProfiles}
        profiles={profiles}
      />

      <div className={`rounded-lg shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <ProgressBar
          currentStep={currentStep}
          totalSteps={steps.length}
          stepTitles={steps.map((step) => step.title)}
          darkMode={darkMode}
        />

        <div className="mt-8">
          {React.createElement(steps[currentStep - 1].component, {
            formData,
            onChange: (changes: Partial<FormData>) => {
              setFormData((prev) => ({ ...prev, ...changes }));
              setErrors({});
            },
            errors,
            darkMode,
            onNext: handleNext,
            onBack: handleBack,
            currentStep,
            totalSteps: steps.length,
          })}
        </div>

        <div className="mt-8 flex justify-between">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className={`px-4 py-2 rounded ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              } text-${darkMode ? 'white' : 'gray-800'} transition-colors duration-200`}
            >
              Back
            </button>
          )}
          <div className="ml-auto space-x-4">
            {currentStep === steps.length && formData.name && (
              <>
                <button
                  onClick={handleSaveProfile}
                  className={`px-4 py-2 rounded ${
                    darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
                  } text-white transition-colors duration-200`}
                >
                  Save Profile
                </button>
                <button
                  onClick={handleTestConnection}
                  className={`px-4 py-2 rounded ${
                    darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                  } text-white transition-colors duration-200`}
                >
                  Test Connection
                </button>
              </>
            )}
            {currentStep < steps.length && (
              <button
                onClick={handleNext}
                className={`px-4 py-2 rounded ${
                  darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                } text-white transition-colors duration-200`}
              >
                {currentStep === steps.length - 1 ? 'Generate' : 'Next'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
