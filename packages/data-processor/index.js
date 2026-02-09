/**
 * Data Processor Package
 * Tests: eval/unsafe patterns, template injection, ReDoS, serialization vulnerabilities
 */

const Handlebars = require('handlebars');
const ejs = require('ejs');
const pug = require('pug');
const yaml = require('js-yaml');
const serialize = require('serialize-javascript');
const xml2js = require('xml2js');
const cheerio = require('cheerio');
const globParent = require('glob-parent');
const trimNewlines = require('trim-newlines');
const ansiRegex = require('ansi-regex');
const lodash = require('lodash');

console.log('Data Processor Service Starting...');

// Template engines - potential for template injection
function templateTest() {
  console.log('\n=== Template Engine Test ===');

  // Handlebars (version with known vulnerabilities)
  const hbTemplate = Handlebars.compile('Hello {{name}}!');
  console.log('Handlebars:', hbTemplate({ name: 'World' }));

  // EJS (vulnerable to template injection if user input not sanitized)
  const ejsTemplate = ejs.compile('Hello <%= name %>!');
  console.log('EJS:', ejsTemplate({ name: 'World' }));

  // Pug (vulnerable versions exist)
  const pugTemplate = pug.compile('p= name');
  console.log('Pug:', pugTemplate({ name: 'World' }));
}

// YAML parsing - vulnerable to code execution
function yamlTest() {
  console.log('\n=== YAML Test ===');
  // js-yaml 3.x has code execution vulnerabilities (CVE-2021-32019)
  const doc = yaml.load('hello: world');
  console.log('YAML parsed:', doc);
}

// Serialization - vulnerable to code execution
function serializationTest() {
  console.log('\n=== Serialization Test ===');
  // serialize-javascript has vulnerabilities in older versions
  const obj = { foo: 'bar', baz: 42 };
  const serialized = serialize(obj);
  console.log('Serialized:', serialized);
}

// XML parsing - vulnerable to XXE and other attacks
function xmlTest() {
  console.log('\n=== XML Test ===');
  const parser = new xml2js.Parser();
  parser.parseString('<root><hello>world</hello></root>', (err, result) => {
    console.log('XML parsed:', JSON.stringify(result));
  });
}

// HTML parsing
function htmlTest() {
  console.log('\n=== HTML Test ===');
  const $ = cheerio.load('<h1>Hello World</h1>');
  console.log('Cheerio parsed:', $('h1').text());
}

// ReDoS vulnerable packages
function redosTest() {
  console.log('\n=== ReDoS Vulnerability Test ===');

  // glob-parent 5.1.1 has ReDoS vulnerability (CVE-2020-28469)
  const parent = globParent('some/path/**');
  console.log('Glob parent:', parent);

  // trim-newlines 3.0.0 has ReDoS vulnerability (CVE-2021-33623)
  const trimmed = trimNewlines('\n\nhello\n\n');
  console.log('Trimmed:', trimmed);

  // ansi-regex 5.0.0 has ReDoS vulnerability (CVE-2021-3807)
  const regex = ansiRegex();
  console.log('ANSI regex created');
}

// Prototype pollution test
function prototypePollutionTest() {
  console.log('\n=== Prototype Pollution Test ===');

  // lodash 4.17.20 has prototype pollution (CVE-2020-8203)
  const obj1 = { a: 1 };
  const obj2 = { b: 2 };
  const merged = lodash.merge(obj1, obj2);
  console.log('Lodash merge:', merged);
}

// Database access - Socket.dev should flag these
function databaseTest() {
  console.log('\n=== Database Access Test ===');
  console.log('Has database drivers: sqlite3, mysql, pg, redis');
  console.log('Socket.dev should flag packages with database access');
}

// Unsafe eval patterns (commented out to prevent actual execution)
function unsafePatternTest() {
  console.log('\n=== Unsafe Pattern Test ===');
  console.log('Note: eval() and Function() are dangerous patterns');
  console.log('Socket.dev should detect packages that use these');

  // Examples of what NOT to do:
  // eval('console.log("dangerous")');
  // new Function('return 1 + 1')();
  // require('vm').runInNewContext('1 + 1');
}

// Run tests
templateTest();
yamlTest();
serializationTest();
xmlTest();
htmlTest();
redosTest();
prototypePollutionTest();
databaseTest();
unsafePatternTest();

console.log('\nData Processor initialized. Socket.dev should detect:');
console.log('- Template injection risks (handlebars, ejs, pug)');
console.log('- YAML parsing vulnerabilities (js-yaml)');
console.log('- Serialization vulnerabilities (serialize-javascript)');
console.log('- XML parsing risks (xml2js)');
console.log('- ReDoS vulnerabilities (glob-parent, trim-newlines, ansi-regex)');
console.log('- Prototype pollution (lodash)');
console.log('- Database access (sqlite3, mysql, pg, redis)');
console.log('- Unsafe eval patterns');
