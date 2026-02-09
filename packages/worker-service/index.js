/**
 * Worker Service Package
 * Tests: Shell execution, filesystem access, background job processing
 */

const shell = require('shelljs');
const execa = require('execa');
const spawn = require('cross-spawn');
const cmd = require('node-cmd');
const exec = require('exec');
const fs = require('fs-extra');
const rimraf = require('rimraf');
const tar = require('tar');
const download = require('download');

console.log('Worker Service Starting...');

// Shell execution examples - Socket.dev should flag these
function shellExecutionTest() {
  console.log('\n=== Shell Execution Test ===');

  // Using shelljs
  const whoami = shell.exec('whoami', { silent: true });
  console.log('Current user (shelljs):', whoami.stdout.trim());

  // Using execa
  (async () => {
    const { stdout } = await execa('node', ['--version']);
    console.log('Node version (execa):', stdout);
  })();

  // Using cross-spawn
  const child = spawn('echo', ['Socket.dev test']);
  child.stdout.on('data', (data) => {
    console.log('Spawn output:', data.toString());
  });
}

// Filesystem operations - Socket.dev should flag these
async function filesystemTest() {
  console.log('\n=== Filesystem Test ===');

  const testDir = './temp-worker';

  try {
    // Create directory
    await fs.ensureDir(testDir);
    console.log('Created directory:', testDir);

    // Write file
    await fs.writeFile(`${testDir}/test.txt`, 'Worker service test');
    console.log('Wrote test file');

    // Read file
    const content = await fs.readFile(`${testDir}/test.txt`, 'utf8');
    console.log('Read content:', content);

    // Remove directory (using rimraf - old unmaintained package)
    rimraf.sync(testDir);
    console.log('Cleaned up test directory');
  } catch (error) {
    console.error('Filesystem test error:', error.message);
  }
}

// Download test - Socket.dev should flag network access during install
async function downloadTest() {
  console.log('\n=== Download Test ===');
  console.log('Download package can fetch remote files at runtime');
  // Not actually downloading to avoid external dependencies in test
}

// Archive manipulation - potential for path traversal
async function archiveTest() {
  console.log('\n=== Archive Test ===');
  console.log('Tar package version has known vulnerabilities');
  // Using vulnerable tar version (CVE-2021-37701, CVE-2021-37712, CVE-2021-37713)
}

// Job queue test
function jobQueueTest() {
  console.log('\n=== Job Queue Test ===');
  console.log('Background job processing with Bull, Agenda');
  // These packages have network and filesystem access
}

// Run tests
shellExecutionTest();
filesystemTest();
downloadTest();
archiveTest();
jobQueueTest();

console.log('\nWorker Service initialized. Socket.dev should detect:');
console.log('- Shell execution capabilities (shelljs, execa, cross-spawn, node-cmd, exec)');
console.log('- Filesystem access (fs-extra, rimraf, mkdirp)');
console.log('- Network access (download)');
console.log('- Archive manipulation vulnerabilities (tar)');
console.log('- Background job processing (bull, agenda, kafka-node, amqplib)');
