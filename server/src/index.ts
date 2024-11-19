import express from 'express';
import cors from 'cors';
import { Client } from 'ssh2';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

interface TestConnectionRequest {
  // Basic Connection Details
  host: string;
  port: number;
  username: string;
  password?: string;
  remotePath: string;

  // Authentication
  privateKey?: string;
  passphrase?: string;

  // Advanced Options
  connectionTimeout?: number;
  keepAliveInterval?: number;
  maxRetries?: number;
  retryDelay?: number;
  debugLogging?: boolean;
  forceIPv4?: boolean;
  compress?: boolean;
}

app.post('/api/test-connection', async (req, res) => {
  const config: TestConnectionRequest = req.body;
  const client = new Client();

  let retryCount = 0;
  const maxRetries = config.maxRetries || 3;
  const retryDelay = config.retryDelay || 5000;

  const attemptConnection = async (): Promise<void> => {
    try {
      await new Promise<void>((resolve, reject) => {
        if (config.debugLogging) {
          console.log('Attempting SFTP connection with config:', {
            ...config,
            password: config.password ? '***' : undefined,
            privateKey: config.privateKey ? '***' : undefined,
            passphrase: config.passphrase ? '***' : undefined,
          });
        }

        client
          .on('ready', () => {
            client.sftp((err, sftp) => {
              if (err) {
                client.end();
                reject(new Error('Failed to initialize SFTP session'));
                return;
              }

              sftp.readdir(config.remotePath, (err) => {
                client.end();
                if (err) {
                  reject(new Error(`Remote path access failed: ${err.message}`));
                } else {
                  resolve();
                }
              });
            });
          })
          .on('error', (err) => {
            reject(new Error(`Connection failed: ${err.message}`));
          })
          .connect({
            host: config.host,
            port: config.port,
            username: config.username,
            ...(config.privateKey
              ? {
                  privateKey: config.privateKey,
                  passphrase: config.passphrase,
                }
              : { password: config.password }),
            readyTimeout: config.connectionTimeout || 10000,
            keepaliveInterval: config.keepAliveInterval || 30000,
            tryKeyboard: true,
            forceIPv4: config.forceIPv4,
            compress: config.compress,
          });
      });

      res.json({
        success: true,
        message: 'Connection successful! Remote path is accessible.',
      });
    } catch (error) {
      if (retryCount < maxRetries) {
        retryCount++;
        if (config.debugLogging) {
          console.log(`Connection attempt ${retryCount} failed, retrying in ${retryDelay}ms...`);
        }
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        return attemptConnection();
      }

      res.status(400).json({
        success: false,
        message: (error as Error).message,
      });
    }
  };

  await attemptConnection();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
