import React from 'react';
import { StepProps } from '../../../types/forms';
import { Input } from '../../common/Input';
import { Toggle } from '../../common/Toggle';
import { KeyFileBrowser } from './KeyFileBrowser';

export const AuthenticationDetails: React.FC<StepProps> = ({
  formData,
  onChange,
  errors,
  darkMode,
}) => {
  return (
    <div className="space-y-6">
      <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Authentication Details
      </h2>

      <div className="space-y-4">
        <div>
          <Input
            label="Username"
            type="text"
            value={formData.username || ''}
            onChange={(e) => onChange({ username: e.target.value })}
            tooltip="SFTP username"
            className={darkMode ? 'bg-gray-700 text-white' : ''}
            darkMode={darkMode}
          />
          {errors?.username && (
            <p className="mt-1 text-sm text-red-500">{errors.username}</p>
          )}
        </div>

        {formData.authType === 'password' && (
          <div>
            <Input
              label="Password"
              type="password"
              value={formData.password || ''}
              onChange={(e) => onChange({ password: e.target.value })}
              tooltip="SFTP password"
              className={darkMode ? 'bg-gray-700 text-white' : ''}
              darkMode={darkMode}
            />
            {errors?.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>
        )}

        <Toggle
          label="Use Private Key Authentication"
          checked={formData.authType === 'privateKey'}
          onChange={(checked) => onChange({ 
            authType: checked ? 'privateKey' : 'password',
            password: checked ? undefined : formData.password,
            privateKeyPath: checked ? formData.privateKeyPath : undefined,
            passphrase: checked ? formData.passphrase : undefined,
          })}
          tooltip="Use SSH private key for authentication"
          darkMode={darkMode}
        />

        {formData.authType === 'privateKey' && (
          <div className="space-y-4">
            <KeyFileBrowser
              value={formData.privateKeyPath || ''}
              onChange={(path) => onChange({ privateKeyPath: path })}
              darkMode={darkMode}
            />
            {errors?.privateKeyPath && (
              <p className="mt-1 text-sm text-red-500">{errors.privateKeyPath}</p>
            )}

            <Input
              label="Key Passphrase (Optional)"
              type="password"
              value={formData.passphrase || ''}
              onChange={(e) => onChange({ passphrase: e.target.value })}
              tooltip="Private key passphrase if required"
              className={darkMode ? 'bg-gray-700 text-white' : ''}
              darkMode={darkMode}
            />
          </div>
        )}
      </div>
    </div>
  );
};
