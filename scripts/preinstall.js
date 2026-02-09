#!/usr/bin/env node

/**
 * Pre-install Script
 * Socket.dev monitors and flags preinstall scripts as they can be used for supply chain attacks
 * This script runs BEFORE dependencies are installed
 */

console.log('');
console.log('='.repeat(70));
console.log('PREINSTALL SCRIPT EXECUTING');
console.log('='.repeat(70));
console.log('');
console.log('Socket.dev Alert: This package has a preinstall script!');
console.log('');
console.log('Why this is flagged:');
console.log('- Preinstall scripts run BEFORE dependencies are installed');
console.log('- They have full system access');
console.log('- Malicious packages can use this to:');
console.log('  * Download and execute malware');
console.log('  * Exfiltrate environment variables and secrets');
console.log('  * Modify system files');
console.log('  * Install backdoors');
console.log('  * Perform supply chain attacks');
console.log('');
console.log('This POC script is benign, but Socket.dev will flag it as HIGH RISK.');
console.log('');

// Check Node version (benign operation for POC)
const nodeVersion = process.version;
console.log(`Node.js version: ${nodeVersion}`);

// Display environment info (Socket.dev flags env variable access)
console.log(`Platform: ${process.platform}`);
console.log(`Architecture: ${process.arch}`);

console.log('');
console.log('Preinstall script completed.');
console.log('='.repeat(70));
console.log('');
