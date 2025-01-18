import { Dispatch, SetStateAction } from "react";

export interface SFTPFormData {
  // UI State (not included in final config)
  showAdvancedOptions?: boolean;

  // Basic Connection Details
  name: string;
  host: string;
  port: number;
  protocol?: "sftp" | "ftp";
  secure?: boolean;

  // Authentication
  username: string;
  password?: string;
  privateKeyPath?: string;
  passphrase?: string;
  authType: "password" | "privateKey";

  // Path and Sync Settings
  remotePath: string;
  uploadOnSave?: boolean;
  ignore?: string[];
  watcher?: {
    files: string;
    autoUpload: boolean;
    autoDelete: boolean;
  };

  // Advanced Options
  context?: string;
  useTempFile?: boolean;
  openSsh?: boolean;
  connectionTimeout?: number;
  keepAliveInterval?: number;
  maxRetries?: number;
  retryDelay?: number;
  debugLogging?: boolean;
  forceIPv4?: boolean;
  compress?: boolean;

  // Hop Configuration
  hop?:
    | {
        host: string;
        username: string;
        privateKeyPath?: string;
        password?: string;
      }
    | Array<{
        host: string;
        username: string;
        privateKeyPath?: string;
        password?: string;
      }>;
}

export interface FormErrors {
  name?: string;
  host?: string;
  port?: string;
  username?: string;
  password?: string;
  privateKeyPath?: string;
  remotePath?: string;
  [key: string]: string | undefined;
}

export interface Profile extends SFTPFormData {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface StepProps<T = SFTPFormData> {
  formData: T;
  onChange: (update: Partial<T>) => void;
  errors?: FormErrors;
  darkMode: boolean;
  onNext?: () => void;
  onBack?: () => void;
  currentStep?: number;
  totalSteps?: number;
}

export interface ProfileFormProps extends StepProps {
  onSave: (profile: SFTPFormData) => void;
  onCancel: () => void;
}

export interface SFTPFormProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}
