/**
 * Build script with shell commands
 * Socket.dev should flag scripts that execute shell commands
 */

const { execSync } = require('child_process');
const shell = require('shelljs');

console.log('Running build script...');

// Shell command execution in build script
shell.exec('echo "Build script executing shell commands"');

console.log('Build complete - Socket.dev should flag this script');
