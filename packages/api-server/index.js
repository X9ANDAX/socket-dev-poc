/**
 * API Server Package
 * Tests: Network access, vulnerable dependencies, deprecated packages
 */

const express = require('express');
const axios = require('axios');
const fetch = require('node-fetch');
const request = require('request');
const lodash = require('lodash');
const minimist = require('minimist');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'api-server' });
});

// Multiple network clients - Socket.dev should flag all of these
app.get('/network-test', async (req, res) => {
  try {
    const results = {};

    // Axios with vulnerable version (SSRF CVE-2021-3749)
    results.axios = await axios.get('https://api.github.com/zen').then(r => r.data);

    // node-fetch with vulnerable version
    results.fetch = await fetch('https://httpbin.org/uuid').then(r => r.json());

    // Deprecated request package
    request('https://httpbin.org/user-agent', (error, response, body) => {
      results.request = JSON.parse(body);
      res.json({ message: 'Network test complete', results });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Vulnerable lodash usage (Prototype Pollution CVE-2020-8203)
app.post('/merge', (req, res) => {
  const userInput = req.body;
  const config = {};
  // This is vulnerable to prototype pollution
  lodash.merge(config, userInput);
  res.json({ merged: config });
});

// Vulnerable minimist usage (Prototype Pollution CVE-2021-44906)
app.get('/parse-args', (req, res) => {
  const args = minimist(process.argv.slice(2));
  res.json({ parsed: args });
});

app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
});

module.exports = app;
