import React from 'react';
import { StepProps } from '../../../types/forms';
import { Input } from '../../common/Input';
import { Toggle } from '../../common/Toggle';

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

        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Protocol
            </label>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => onChange({ protocol: 'sftp', port: 22 })}
                className={`flex-1 px-4 py-2 rounded-md transition-colors duration-200 ${
                  formData.protocol !== 'ftp'
                    ? `${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`
                    : `${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${darkMode ? 'text-gray-300' : 'text-gray-700'}`
                }`}
              >
                SFTP
              </button>
              <button
                type="button"
                onClick={() => onChange({ protocol: 'ftp', port: 21 })}
                className={`flex-1 px-4 py-2 rounded-md transition-colors duration-200 ${
                  formData.protocol === 'ftp'
                    ? `${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`
                    : `${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${darkMode ? 'text-gray-300' : 'text-gray-700'}`
                }`}
              >
                FTP
              </button>
            </div>
          </div>
          {formData.protocol === 'ftp' && (
            <div className="flex-1">
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Security
              </label>
              <Toggle
                label="Secure FTP"
                checked={formData.secure || false}
                onChange={(checked) => onChange({ secure: checked })}
                tooltip="Use FTPS (FTP over SSL/TLS)"
                darkMode={darkMode}
                className="mt-1"
              />
            </div>
          )}
        </div>

        <div>
          <Input
            label="Host"
            type="text"
            value={formData.host || ''}
            onChange={(e) => onChange({ host: e.target.value })}
            tooltip="Server hostname or IP address"
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
            value={String(formData.port || (formData.protocol === 'ftp' ? 21 : 22))}
            onChange={(e) => {
              const portValue = parseInt(e.target.value, 10);
              onChange({ port: portValue });
            }}
            tooltip={`Default port: ${formData.protocol === 'ftp' ? '21 for FTP' : '22 for SFTP'}`}
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
