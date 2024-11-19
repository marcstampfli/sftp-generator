const express = require('express');
const cors = require('cors');
const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

// Enable CORS for frontend requests
app.use(cors());
app.use(express.json());

app.post('/api/test-connection', async (req, res) => {
  const { host, port, username, password, privateKey, passphrase } = req.body;

  // Validate required fields
  if (!host || !port || !username) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: host, port, or username',
    });
  }

  // Create new SSH client
  const conn = new Client();

  // Create connection config
  const config = {
    host,
    port,
    username,
    // If privateKey is provided, use key-based auth, otherwise use password
    ...(privateKey
      ? {
          privateKey: fs.existsSync(privateKey)
            ? fs.readFileSync(privateKey)
            : privateKey,
          passphrase,
        }
      : { password }),
  };

  try {
    // Wrap connection attempt in a promise
    await new Promise((resolve, reject) => {
      conn
        .on('ready', () => {
          resolve();
        })
        .on('error', (err) => {
          reject(err);
        })
        .connect(config);
    });

    // Connection successful
    res.json({ success: true });
  } catch (error) {
    // Connection failed
    res.status(400).json({
      success: false,
      error: error.message || 'Connection failed',
    });
  } finally {
    // Always close the connection
    conn.end();
  }
});

app.listen(port, () => {
  console.log(`SFTP test server running at http://localhost:${port}`);
});
