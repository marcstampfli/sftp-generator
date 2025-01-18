import React from "react";
import { StepProps } from "../../../types/forms";
import { Input } from "../../common/Input";
import { Toggle } from "../../common/Toggle";

export const ConfigurationOptions: React.FC<StepProps> = ({
  formData,
  onChange,
  errors,
  darkMode,
}) => {
  const handleAdvancedToggle = (checked: boolean) => {
    if (!checked) {
      // Reset all advanced options when hiding the section
      onChange({
        showAdvancedOptions: false,
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
    } else {
      onChange({ showAdvancedOptions: true });
    }
  };

  return (
    <div className="space-y-6">
      <h2
        className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
      >
        Configuration Options
      </h2>

      <div className="space-y-4">
        <div>
          <Input
            label="Remote Path"
            type="text"
            value={formData.remotePath || "/"}
            onChange={(e) => onChange({ remotePath: e.target.value })}
            tooltip="Remote directory path on the SFTP server (default: /)"
            className={darkMode ? "bg-gray-700 text-white" : ""}
            darkMode={darkMode}
          />
          {errors?.remotePath && (
            <p className="mt-1 text-sm text-red-500">{errors.remotePath}</p>
          )}
        </div>

        <Toggle
          label="Upload on Save"
          checked={formData.uploadOnSave || false}
          onChange={(checked) => onChange({ uploadOnSave: checked })}
          tooltip="Automatically upload files when they are saved locally"
          darkMode={darkMode}
        />

        <Toggle
          label="Use Temporary File"
          checked={formData.useTempFile || false}
          onChange={(checked) => onChange({ useTempFile: checked })}
          tooltip="Upload to a temporary file first, then rename to the target file"
          darkMode={darkMode}
        />

        <Toggle
          label="Use OpenSSH Config"
          checked={formData.openSsh || false}
          onChange={(checked) => onChange({ openSsh: checked })}
          tooltip="Use OpenSSH configuration format for connection settings"
          darkMode={darkMode}
        />

        <Toggle
          label="Show Advanced Options"
          checked={formData.showAdvancedOptions || false}
          onChange={handleAdvancedToggle}
          tooltip="Display additional configuration options for fine-tuning SFTP connection"
          darkMode={darkMode}
        />

        {formData.showAdvancedOptions && (
          <div
            className={`mt-4 p-4 rounded-lg space-y-4 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
          >
            <h3
              className={`text-sm font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}
            >
              Advanced Options
            </h3>

            <Input
              label="Connection Timeout (ms)"
              type="number"
              value={formData.connectionTimeout?.toString() || "10000"}
              onChange={(e) =>
                onChange({
                  connectionTimeout: parseInt(e.target.value) || 10000,
                })
              }
              tooltip="How long to wait for initial connection before giving up (default: 10 seconds)"
              className={darkMode ? "bg-gray-700 text-white" : ""}
              darkMode={darkMode}
            />

            <Input
              label="Keep Alive Interval (ms)"
              type="number"
              value={formData.keepAliveInterval?.toString() || "30000"}
              onChange={(e) =>
                onChange({
                  keepAliveInterval: parseInt(e.target.value) || 30000,
                })
              }
              tooltip="Send periodic signals to prevent connection timeout (default: 30 seconds)"
              className={darkMode ? "bg-gray-700 text-white" : ""}
              darkMode={darkMode}
            />

            <Input
              label="Max Retries"
              type="number"
              value={formData.maxRetries?.toString() || "3"}
              onChange={(e) =>
                onChange({ maxRetries: parseInt(e.target.value) || 3 })
              }
              tooltip="Number of times to retry connecting if connection fails (default: 3 attempts)"
              className={darkMode ? "bg-gray-700 text-white" : ""}
              darkMode={darkMode}
            />

            <Input
              label="Retry Delay (ms)"
              type="number"
              value={formData.retryDelay?.toString() || "5000"}
              onChange={(e) =>
                onChange({ retryDelay: parseInt(e.target.value) || 5000 })
              }
              tooltip="Time to wait between connection retry attempts (default: 5 seconds)"
              className={darkMode ? "bg-gray-700 text-white" : ""}
              darkMode={darkMode}
            />

            <Toggle
              label="Enable Debug Logging"
              checked={formData.debugLogging || false}
              onChange={(checked) => onChange({ debugLogging: checked })}
              tooltip="Turn on detailed logging to help troubleshoot connection issues"
              darkMode={darkMode}
            />

            <Toggle
              label="Force IPv4"
              checked={formData.forceIPv4 || false}
              onChange={(checked) => onChange({ forceIPv4: checked })}
              tooltip="Force connection to use IPv4 protocol (helpful if IPv6 causes connection issues)"
              darkMode={darkMode}
            />

            <Toggle
              label="Enable Compression"
              checked={formData.compress || false}
              onChange={(checked) => onChange({ compress: checked })}
              tooltip="Compress data during transfer to improve speed on slow connections"
              darkMode={darkMode}
            />
          </div>
        )}
      </div>
    </div>
  );
};
