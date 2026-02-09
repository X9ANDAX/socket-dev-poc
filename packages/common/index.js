/**
 * Common Utilities Package
 * Tests: Deprecated packages, maintenance status, utility libraries
 */

const _ = require('lodash');
const underscore = require('underscore');
const moment = require('moment');
const uuid = require('uuid');
const nanoid = require('nanoid');
const shortid = require('shortid');
const validator = require('validator');
const semver = require('semver');
const chalk = require('chalk');

console.log('Common Utilities Package Loading...');

// Deprecated/maintenance mode packages
function deprecatedPackagesTest() {
  console.log('\n=== Deprecated Packages Test ===');

  // moment.js is in maintenance mode
  const now = moment();
  console.log('Moment (maintenance mode):', now.format('YYYY-MM-DD'));

  // uuid v3 is outdated
  console.log('UUID v3 (outdated):', uuid.v4());

  // shortid has security concerns and is deprecated
  console.log('ShortID (deprecated):', shortid.generate());
}

// Vulnerable utility packages
function vulnerableUtilitiesTest() {
  console.log('\n=== Vulnerable Utilities Test ===');

  // lodash 4.17.20 - Prototype Pollution CVE-2020-8203
  const obj = _.merge({}, { a: 1 }, { b: 2 });
  console.log('Lodash (vulnerable):', obj);

  // underscore 1.12.0 - has vulnerabilities
  const arr = underscore.map([1, 2, 3], n => n * 2);
  console.log('Underscore (vulnerable):', arr);
}

// Utility functions
function utilityTest() {
  console.log('\n=== Utility Test ===');

  // Validator
  console.log('Email valid:', validator.isEmail('test@example.com'));

  // Semver
  console.log('Version valid:', semver.valid('1.2.3'));

  // Chalk
  console.log(chalk.green('Chalk styling works'));

  // Nanoid (this one is safe)
  console.log('NanoID:', nanoid.nanoid(10));
}

// Run tests
deprecatedPackagesTest();
vulnerableUtilitiesTest();
utilityTest();

console.log('\nCommon Utilities loaded. Socket.dev should detect:');
console.log('- Deprecated packages (moment, uuid v3, shortid)');
console.log('- Vulnerable utilities (lodash, underscore)');
console.log('- Package maintenance status');

module.exports = {
  _,
  underscore,
  moment,
  uuid,
  validator,
  semver,
  chalk
};
