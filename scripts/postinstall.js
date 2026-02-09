#!/usr/bin/env node

/**
 * Post-install Script
 * Socket.dev monitors and flags postinstall scripts as they can be used for supply chain attacks
 * This script runs AFTER dependencies are installed
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('');
console.log('='.repeat(70));
console.log('POSTINSTALL SCRIPT EXECUTING');
console.log('='.repeat(70));
console.log('');
console.log('Socket.dev Alert: This package has a postinstall script!');
console.log('');
console.log('Why this is flagged:');
console.log('- Postinstall scripts run AFTER dependencies are installed');
console.log('- They have full system access');
console.log('- Malicious packages can use this to:');
console.log('  * Download malicious binaries');
console.log('  * Compile native addons with backdoors');
console.log('  * Phone home to attacker servers');
console.log('  * Modify installed dependencies');
console.log('  * Create persistence mechanisms');
console.log('  * Steal credentials and secrets');
console.log('');

// Create audit-results directory (benign filesystem operation for POC)
const auditDir = path.join(process.cwd(), 'audit-results');
if (!fs.existsSync(auditDir)) {
  fs.mkdirSync(auditDir, { recursive: true });
  console.log(`Created directory: ${auditDir}`);
}

// Display package count (benign operation)
try {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
  );
  const depCount = Object.keys(packageJson.dependencies || {}).length;
  const devDepCount = Object.keys(packageJson.devDependencies || {}).length;
  console.log(`Dependencies installed: ${depCount}`);
  console.log(`Dev dependencies installed: ${devDepCount}`);
} catch (error) {
  console.log('Could not read package.json');
}

// Socket.dev flags shell execution in install scripts
console.log('\nAttempting benign shell command (Socket.dev will flag this)...');
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  console.log(`Verified Node.js: ${nodeVersion}`);
} catch (error) {
  console.log('Shell command skipped (may not be available)');
}

console.log('');
console.log('Postinstall script completed.');
console.log('This script performed filesystem and shell operations.');
console.log('Socket.dev will flag this as SUPPLY CHAIN RISK.');
console.log('='.repeat(70));
console.log('');
