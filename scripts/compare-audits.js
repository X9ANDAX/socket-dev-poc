#!/usr/bin/env node

/**
 * Compare npm audit vs Socket.dev audit results
 * This helps evaluate Socket.dev's detection capabilities vs standard npm audit
 */

const fs = require('fs');
const path = require('path');

console.log('='.repeat(70));
console.log('AUDIT COMPARISON: npm audit vs Socket.dev');
console.log('='.repeat(70));
console.log('');

const auditDir = path.join(process.cwd(), 'audit-results');

// Check if audit results exist
const npmAuditFile = path.join(auditDir, 'npm-audit.json');
const socketAuditFile = path.join(auditDir, 'socket-audit.json');

let npmAudit, socketAudit;

try {
  if (fs.existsSync(npmAuditFile)) {
    npmAudit = JSON.parse(fs.readFileSync(npmAuditFile, 'utf8'));
    console.log('✓ npm audit results loaded');
  } else {
    console.log('✗ npm audit results not found');
    console.log('  Run: npm run audit:npm');
  }
} catch (error) {
  console.log('✗ Error loading npm audit:', error.message);
}

try {
  if (fs.existsSync(socketAuditFile)) {
    socketAudit = JSON.parse(fs.readFileSync(socketAuditFile, 'utf8'));
    console.log('✓ Socket.dev audit results loaded');
  } else {
    console.log('✗ Socket.dev audit results not found');
    console.log('  Run: npm run audit:socket');
  }
} catch (error) {
  console.log('✗ Error loading Socket.dev audit:', error.message);
}

console.log('');
console.log('-'.repeat(70));

// Analyze npm audit
if (npmAudit) {
  console.log('\nnpm audit Summary:');
  console.log('─'.repeat(70));

  if (npmAudit.metadata) {
    console.log(`Total vulnerabilities: ${npmAudit.metadata.vulnerabilities.total}`);
    console.log(`  Critical: ${npmAudit.metadata.vulnerabilities.critical}`);
    console.log(`  High: ${npmAudit.metadata.vulnerabilities.high}`);
    console.log(`  Moderate: ${npmAudit.metadata.vulnerabilities.moderate}`);
    console.log(`  Low: ${npmAudit.metadata.vulnerabilities.low}`);
  }

  console.log('\nWhat npm audit DOES detect:');
  console.log('  ✓ Known CVEs from the npm advisory database');
  console.log('  ✓ Vulnerable package versions');
  console.log('  ✓ Severity levels based on CVSS scores');
}

// Analyze Socket.dev audit
if (socketAudit) {
  console.log('\n\nSocket.dev Summary:');
  console.log('─'.repeat(70));
  console.log('Socket.dev provides more comprehensive detection than npm audit.');
  console.log('\nWhat Socket.dev ADDS beyond npm audit:');
  console.log('  ✓ Supply chain attack detection (install scripts, postinstall hooks)');
  console.log('  ✓ Behavioral analysis (network access, filesystem access, shell execution)');
  console.log('  ✓ Suspicious patterns (obfuscation, eval usage, environment access)');
  console.log('  ✓ Maintenance status (deprecated, unmaintained packages)');
  console.log('  ✓ License compliance issues');
  console.log('  ✓ Typosquatting detection');
  console.log('  ✓ Dynamic code execution risks');
  console.log('  ✓ Package quality scores');
}

console.log('');
console.log('-'.repeat(70));
console.log('\nKEY DIFFERENCES:');
console.log('─'.repeat(70));
console.log('');
console.log('npm audit:');
console.log('  Focus: Known CVEs only');
console.log('  Data: npm advisory database');
console.log('  Detection: Reactive (after CVE is published)');
console.log('  Coverage: Security vulnerabilities');
console.log('');
console.log('Socket.dev:');
console.log('  Focus: Comprehensive supply chain security');
console.log('  Data: Behavioral analysis + CVE database');
console.log('  Detection: Proactive (behavioral patterns, not just known CVEs)');
console.log('  Coverage: Security + maintenance + quality + behavior');
console.log('');
console.log('='.repeat(70));
console.log('\nTo generate audit results:');
console.log('  1. npm run audit:npm');
console.log('  2. npm run audit:socket');
console.log('  3. npm run compare:audits');
console.log('');
