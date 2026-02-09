/**
 * Eval/Dynamic Code Execution Test
 * Tests packages that use eval, Function(), or dynamic code execution
 * Socket.dev should flag packages with these dangerous patterns
 */

const Handlebars = require('handlebars');
const ejs = require('ejs');
const yaml = require('js-yaml');
const serialize = require('serialize-javascript');

console.log('='.repeat(70));
console.log('EVAL / DYNAMIC CODE EXECUTION TEST');
console.log('='.repeat(70));
console.log('');
console.log('Testing packages with dynamic code execution patterns...');
console.log('Socket.dev should flag packages that use eval, Function(), etc.');
console.log('');

// Test 1: Template engines (can execute code in templates)
console.log('1. Testing Handlebars (template injection risk)...');
try {
  const template = Handlebars.compile('Hello {{name}}!');
  const result = template({ name: 'World' });
  console.log(`   ✓ Handlebars: ${result}`);
  console.log('   ✓ Socket.dev should flag: Template injection potential');
} catch (error) {
  console.log('   ✗ Handlebars: Test failed');
}

console.log('');
console.log('2. Testing EJS (template injection risk)...');
try {
  const template = ejs.compile('Hello <%= name %>!');
  const result = template({ name: 'World' });
  console.log(`   ✓ EJS: ${result}`);
  console.log('   ✓ Socket.dev should flag: Code execution in templates');
} catch (error) {
  console.log('   ✗ EJS: Test failed');
}

// Test 2: YAML (can execute code in older versions)
console.log('');
console.log('3. Testing js-yaml (code execution vulnerability)...');
try {
  const doc = yaml.load('hello: world');
  console.log('   ✓ js-yaml: YAML parsed');
  console.log('   ✓ Socket.dev should flag: CVE-2021-32019 (code execution)');
} catch (error) {
  console.log('   ✗ js-yaml: Test failed');
}

// Test 3: Serialization (can execute code)
console.log('');
console.log('4. Testing serialize-javascript (serialization risks)...');
try {
  const obj = { test: 'value', num: 42 };
  const serialized = serialize(obj);
  console.log('   ✓ serialize-javascript: Object serialized');
  console.log('   ✓ Socket.dev should flag: Deserialization vulnerabilities');
} catch (error) {
  console.log('   ✗ serialize-javascript: Test failed');
}

console.log('');
console.log('='.repeat(70));
console.log('EVAL/DYNAMIC CODE TEST SUMMARY');
console.log('='.repeat(70));
console.log('');
console.log('Packages tested: handlebars, ejs, js-yaml, serialize-javascript');
console.log('');
console.log('Socket.dev should detect:');
console.log('  ✓ Template injection vulnerabilities');
console.log('  ✓ Dynamic code execution (eval, Function)');
console.log('  ✓ Unsafe deserialization');
console.log('  ✓ Code injection risks');
console.log('');
console.log('Risk Level: CRITICAL');
console.log('Reason: Dynamic code execution allows:');
console.log('  - Arbitrary code execution');
console.log('  - Remote code execution (RCE)');
console.log('  - Template injection attacks');
console.log('  - Bypassing security controls');
console.log('  - Executing attacker-controlled code');
console.log('');
console.log('Common vulnerable patterns:');
console.log('  - eval(userInput)');
console.log('  - new Function(userInput)()');
console.log('  - vm.runInNewContext(userInput)');
console.log('  - YAML.load(userInput) // in js-yaml < 4.0.0');
console.log('  - Template engines without proper escaping');
console.log('');
