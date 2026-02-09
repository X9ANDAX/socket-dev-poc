/**
 * Filesystem Access Test
 * Tests packages that access the filesystem
 * Socket.dev should flag all packages with filesystem capabilities
 */

const fs = require('fs-extra');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const path = require('path');

console.log('='.repeat(70));
console.log('FILESYSTEM ACCESS TEST');
console.log('='.repeat(70));
console.log('');
console.log('Testing packages that access the filesystem...');
console.log('Socket.dev should flag ALL of these packages.');
console.log('');

const testDir = path.join(__dirname, '..', 'temp-fs-test');
const testFile = path.join(testDir, 'test.txt');

(async () => {
  // Test 1: fs-extra
  console.log('1. Testing fs-extra...');
  try {
    await fs.ensureDir(testDir);
    console.log('   ✓ fs-extra: Directory created');

    await fs.writeFile(testFile, 'Socket.dev filesystem test');
    console.log('   ✓ fs-extra: File written');

    const content = await fs.readFile(testFile, 'utf8');
    console.log('   ✓ fs-extra: File read');
    console.log('   ✓ Socket.dev should flag: Filesystem access capability');
  } catch (error) {
    console.log('   ✗ fs-extra: Operation failed');
  }

  // Test 2: mkdirp
  console.log('');
  console.log('2. Testing mkdirp...');
  try {
    const nestedDir = path.join(testDir, 'nested', 'deep', 'directory');
    await mkdirp(nestedDir);
    console.log('   ✓ mkdirp: Nested directories created');
    console.log('   ✓ Socket.dev should flag: Directory creation capability');
  } catch (error) {
    console.log('   ✗ mkdirp: Operation failed');
  }

  // Test 3: rimraf
  console.log('');
  console.log('3. Testing rimraf...');
  try {
    rimraf.sync(testDir);
    console.log('   ✓ rimraf: Directory removed');
    console.log('   ✓ Socket.dev should flag: Directory deletion capability');
  } catch (error) {
    console.log('   ✗ rimraf: Operation failed');
  }

  console.log('');
  console.log('='.repeat(70));
  console.log('FILESYSTEM TEST SUMMARY');
  console.log('='.repeat(70));
  console.log('');
  console.log('Packages tested: fs-extra, mkdirp, rimraf');
  console.log('');
  console.log('Socket.dev should detect:');
  console.log('  ✓ Packages with filesystem read access');
  console.log('  ✓ Packages with filesystem write access');
  console.log('  ✓ Packages with directory manipulation');
  console.log('  ✓ Packages with file deletion capability');
  console.log('');
  console.log('Risk Level: HIGH');
  console.log('Reason: Filesystem access can be used for:');
  console.log('  - Reading sensitive files (.env, credentials, keys)');
  console.log('  - Modifying system files');
  console.log('  - Deleting critical data');
  console.log('  - Creating backdoors');
  console.log('  - Persisting malware');
  console.log('');
})();
