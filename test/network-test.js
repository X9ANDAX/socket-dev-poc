/**
 * Network Access Test
 * Tests packages that make network requests
 * Socket.dev should flag all packages with network capabilities
 */

const axios = require('axios');
const fetch = require('node-fetch');
const request = require('request');
const got = require('got');
const needle = require('needle');

console.log('='.repeat(70));
console.log('NETWORK ACCESS TEST');
console.log('='.repeat(70));
console.log('');
console.log('Testing packages that make network requests...');
console.log('Socket.dev should flag ALL of these packages.');
console.log('');

// Test 1: axios (vulnerable version 0.21.0 - CVE-2021-3749)
console.log('1. Testing axios (vulnerable version 0.21.0)...');
axios.get('https://httpbin.org/uuid')
  .then(response => {
    console.log('   ✓ axios: Network request successful');
    console.log(`   ✓ Socket.dev should flag: SSRF vulnerability (CVE-2021-3749)`);
  })
  .catch(error => {
    console.log('   ✗ axios: Request failed');
  });

// Test 2: node-fetch (vulnerable version 2.6.0)
console.log('');
console.log('2. Testing node-fetch (vulnerable version 2.6.0)...');
fetch('https://httpbin.org/uuid')
  .then(res => res.json())
  .then(data => {
    console.log('   ✓ node-fetch: Network request successful');
    console.log('   ✓ Socket.dev should flag: Size limit bypass vulnerability');
  })
  .catch(error => {
    console.log('   ✗ node-fetch: Request failed');
  });

// Test 3: request (DEPRECATED package)
console.log('');
console.log('3. Testing request (DEPRECATED)...');
request('https://httpbin.org/uuid', (error, response, body) => {
  if (!error && response.statusCode === 200) {
    console.log('   ✓ request: Network request successful');
    console.log('   ✓ Socket.dev should flag: DEPRECATED package');
  } else {
    console.log('   ✗ request: Request failed');
  }
});

// Test 4: got
console.log('');
console.log('4. Testing got...');
(async () => {
  try {
    const response = await got('https://httpbin.org/uuid').json();
    console.log('   ✓ got: Network request successful');
    console.log('   ✓ Socket.dev should flag: Network access capability');
  } catch (error) {
    console.log('   ✗ got: Request failed');
  }
})();

// Test 5: needle
console.log('');
console.log('5. Testing needle...');
needle.get('https://httpbin.org/uuid', (error, response) => {
  if (!error) {
    console.log('   ✓ needle: Network request successful');
    console.log('   ✓ Socket.dev should flag: Network access capability');
  } else {
    console.log('   ✗ needle: Request failed');
  }
});

setTimeout(() => {
  console.log('');
  console.log('='.repeat(70));
  console.log('NETWORK TEST SUMMARY');
  console.log('='.repeat(70));
  console.log('');
  console.log('Packages tested: axios, node-fetch, request, got, needle');
  console.log('');
  console.log('Socket.dev should detect:');
  console.log('  ✓ Packages with network access capabilities');
  console.log('  ✓ Vulnerable versions (axios, node-fetch)');
  console.log('  ✓ Deprecated packages (request)');
  console.log('  ✓ Potential for data exfiltration');
  console.log('  ✓ SSRF vulnerability risks');
  console.log('');
  console.log('Risk Level: HIGH');
  console.log('Reason: Network access can be used for:');
  console.log('  - Exfiltrating sensitive data');
  console.log('  - Downloading malicious payloads');
  console.log('  - Phoning home to attacker servers');
  console.log('  - SSRF attacks');
  console.log('');
}, 3000);
