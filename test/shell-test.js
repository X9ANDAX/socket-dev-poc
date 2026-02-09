/**
 * Shell Execution Test
 * Tests packages that can execute shell commands
 * Socket.dev should flag all packages with shell execution capabilities
 */

const shell = require('shelljs');
const execa = require('execa');
const spawn = require('cross-spawn');

console.log('='.repeat(70));
console.log('SHELL EXECUTION TEST');
console.log('='.repeat(70));
console.log('');
console.log('Testing packages that can execute shell commands...');
console.log('Socket.dev should flag ALL of these packages.');
console.log('');

// Test 1: shelljs
console.log('1. Testing shelljs...');
try {
  const result = shell.exec('echo "shelljs test"', { silent: true });
  console.log('   ✓ shelljs: Shell command executed');
  console.log(`   Output: ${result.stdout.trim()}`);
  console.log('   ✓ Socket.dev should flag: Shell execution capability');
} catch (error) {
  console.log('   ✗ shelljs: Execution failed');
}

// Test 2: execa
console.log('');
console.log('2. Testing execa...');
(async () => {
  try {
    const { stdout } = await execa('echo', ['execa test']);
    console.log('   ✓ execa: Command executed');
    console.log(`   Output: ${stdout}`);
    console.log('   ✓ Socket.dev should flag: Process execution capability');
  } catch (error) {
    console.log('   ✗ execa: Execution failed');
  }
})();

// Test 3: cross-spawn
console.log('');
console.log('3. Testing cross-spawn...');
try {
  const child = spawn('echo', ['cross-spawn test']);
  child.stdout.on('data', (data) => {
    console.log('   ✓ cross-spawn: Command executed');
    console.log(`   Output: ${data.toString().trim()}`);
    console.log('   ✓ Socket.dev should flag: Cross-platform spawn capability');
  });
} catch (error) {
  console.log('   ✗ cross-spawn: Execution failed');
}

setTimeout(() => {
  console.log('');
  console.log('='.repeat(70));
  console.log('SHELL EXECUTION TEST SUMMARY');
  console.log('='.repeat(70));
  console.log('');
  console.log('Packages tested: shelljs, execa, cross-spawn');
  console.log('');
  console.log('Socket.dev should detect:');
  console.log('  ✓ Packages with shell execution capability');
  console.log('  ✓ Packages with process spawning capability');
  console.log('  ✓ Command injection risks');
  console.log('  ✓ Arbitrary code execution potential');
  console.log('');
  console.log('Risk Level: CRITICAL');
  console.log('Reason: Shell execution is the most dangerous capability:');
  console.log('  - Can execute ANY system command');
  console.log('  - Command injection vulnerabilities');
  console.log('  - Full system access');
  console.log('  - Can install malware');
  console.log('  - Can exfiltrate any data');
  console.log('  - Can create backdoors');
  console.log('  - Can perform privilege escalation');
  console.log('');
}, 2000);
