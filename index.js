/**
 * Socket.dev POC Application
 * This application demonstrates various package behaviors that Socket.dev monitors
 */

const express = require('express');
const axios = require('axios');
const lodash = require('lodash');
const shell = require('shelljs');
const fs = require('fs-extra');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Socket.dev POC Application',
    purpose: 'Testing supply chain security scanning',
    endpoints: {
      '/': 'This information',
      '/network': 'Demonstrates network access',
      '/filesystem': 'Demonstrates filesystem access',
      '/shell': 'Demonstrates shell execution',
      '/lodash': 'Uses lodash (older version with vulnerabilities)',
      '/health': 'Health check'
    }
  });
});

// Network access demonstration - Socket.dev flags network calls
app.get('/network', async (req, res) => {
  try {
    // Using axios (network access)
    const axiosResponse = await axios.get('https://api.github.com/users/github');

    // Using node-fetch (network access)
    const fetchResponse = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const fetchData = await fetchResponse.json();

    res.json({
      message: 'Network access demonstration',
      warning: 'Socket.dev monitors packages that make network calls',
      axios_data: axiosResponse.data.login,
      fetch_data: fetchData.title
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Filesystem access demonstration - Socket.dev flags filesystem operations
app.get('/filesystem', async (req, res) => {
  try {
    const testDir = path.join(__dirname, 'temp');
    const testFile = path.join(testDir, 'test.txt');

    // Using fs-extra (filesystem access)
    await fs.ensureDir(testDir);
    await fs.writeFile(testFile, 'Socket.dev POC test file');
    const content = await fs.readFile(testFile, 'utf8');
    await fs.remove(testDir);

    res.json({
      message: 'Filesystem access demonstration',
      warning: 'Socket.dev monitors packages with filesystem access',
      operation: 'Created, read, and deleted test file',
      content: content
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Shell execution demonstration - Socket.dev flags shell commands
app.get('/shell', (req, res) => {
  try {
    // Using shelljs (shell execution capability)
    const result = shell.echo('Socket.dev POC - Shell Execution Test');
    const whoami = shell.exec('whoami', { silent: true });

    res.json({
      message: 'Shell execution demonstration',
      warning: 'Socket.dev flags packages that can execute shell commands',
      echo_result: result.stdout,
      user: whoami.stdout.trim(),
      risk: 'HIGH - Shell execution can be dangerous if input is not sanitized'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lodash demonstration - using vulnerable version
app.get('/lodash', (req, res) => {
  try {
    // Using lodash 4.17.20 (has prototype pollution vulnerability)
    const array = [1, 2, 3, 4, 5];
    const chunked = lodash.chunk(array, 2);
    const merged = lodash.merge({}, { a: 1 }, { b: 2 });

    res.json({
      message: 'Lodash demonstration',
      version: '4.17.20',
      warning: 'This version has known CVE - Prototype Pollution',
      cve: 'CVE-2020-8203',
      chunk_result: chunked,
      merge_result: merged,
      recommendation: 'Upgrade to lodash 4.17.21 or higher'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n===========================================`);
  console.log(`Socket.dev POC Application`);
  console.log(`===========================================`);
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`\nEndpoints:`);
  console.log(`  GET /           - Application info`);
  console.log(`  GET /network    - Network access demo`);
  console.log(`  GET /filesystem - Filesystem access demo`);
  console.log(`  GET /shell      - Shell execution demo`);
  console.log(`  GET /lodash     - Vulnerable lodash demo`);
  console.log(`  GET /health     - Health check`);
  console.log(`\n===========================================\n`);
});

module.exports = app;
