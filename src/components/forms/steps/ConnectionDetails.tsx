import React from 'react';
import { StepProps } from '../../../types/forms';
import { Input } from '../../common/Input';

export const ConnectionDetails: React.FC<StepProps> = ({
  formData,
  onChange,
  errors,
  darkMode,
}) => {
  return (
    <div className="space-y-6">
      <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Connection Details
      </h2>

      <div className="space-y-4">
        <div>
          <Input
            label="Server Name"
            type="text"
            value={formData.name || ''}
            onChange={(e) => onChange({ name: e.target.value })}
            tooltip="A name for this SFTP connection"
            className={darkMode ? 'bg-gray-700 text-white' : ''}
            darkMode={darkMode}
          />
          {errors?.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <Input
            label="Host"
            type="text"
            value={formData.host || ''}
            onChange={(e) => onChange({ host: e.target.value })}
            tooltip="SFTP server hostname or IP address"
            className={darkMode ? 'bg-gray-700 text-white' : ''}
            darkMode={darkMode}
          />
          {errors?.host && (
            <p className="mt-1 text-sm text-red-500">{errors.host}</p>
          )}
        </div>

        <div>
          <Input
            label="Port"
            type="number"
            value={formData.port?.toString() || '22'}
            onChange={(e) => onChange({ port: parseInt(e.target.value) || 22 })}
            tooltip="SFTP port number (default: 22)"
            className={darkMode ? 'bg-gray-700 text-white' : ''}
            darkMode={darkMode}
          />
          {errors?.port && (
            <p className="mt-1 text-sm text-red-500">{errors.port}</p>
          )}
        </div>
      </div>
    </div>
  );
};
