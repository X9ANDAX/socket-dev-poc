#!/usr/bin/env node

/**
 * Build Script with Shell Commands
 * Socket.dev monitors build scripts for risky operations
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Build script starting...');

// Create build directory
const buildDir = path.join(process.cwd(), 'build');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
  console.log('Created build directory');
}

// Execute shell commands (Socket.dev will flag this)
try {
  console.log('Running build commands...');
  execSync('echo "Building Socket.dev POC"', { stdio: 'inherit' });
} catch (error) {
  console.error('Build command failed:', error.message);
}

console.log('Build script completed');
