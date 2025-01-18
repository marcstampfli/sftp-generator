import { SFTPFormData } from "../types/forms";

interface ConnectionTestResult {
  success: boolean;
  error?: string;
  message?: string;
}

export const testConnection = async (
  config: SFTPFormData,
): Promise<ConnectionTestResult> => {
  try {
    // Validate required fields
    if (!config.host || !config.port || !config.username) {
      return {
        success: false,
        error: "Missing required fields: host, port, or username",
      };
    }

    const response = await fetch("http://localhost:3001/api/test-connection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        host: config.host,
        port: config.port,
        username: config.username,
        remotePath: config.remotePath || "/",
        ...(config.authType === "privateKey"
          ? {
              // For key auth, send the key file contents
              privateKey: config.privateKeyPath,
              passphrase: config.passphrase || undefined,
            }
          : {
              // For password auth, send the password
              password: config.password,
            }),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || `Server error: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return {
      success: data.success,
      message: data.message,
      error: data.error,
    };
  } catch (error) {
    console.error("Connection test error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
