# Expected Findings - Socket.dev POC

This document details what Socket.dev SHOULD detect in this POC. Use this to evaluate detection accuracy.

## Critical Severity

### 1. Known Malware Package (Malicious Code)

**Package:** @riyanofficial/baileys@3.0.2

**Why Critical:**
- This is a KNOWN MALICIOUS PACKAGE intentionally added for testing
- Used to test Socket.dev's malware detection capabilities
- Contains malicious code that exfiltrates data or performs unauthorized actions
- **NEVER install or run this package - it is for STATIC SCANNING ONLY**

**Security Warning:**
⚠️ **DO NOT run `npm install` with this package present**
⚠️ This package is for CI/CD scanning tests only
⚠️ Push to GitLab/GitHub for Socket.dev to scan remotely

**Expected Alert:** Malware detected, suspicious behavior, known malicious package

**Purpose:** Validate that Socket.dev can detect known malicious packages in the npm registry

---

### 2. Install Scripts (Supply Chain Attack Vector)

**Package:** socket-dev-poc (root)

**Scripts:**
- `preinstall` - scripts/preinstall.js
- `postinstall` - scripts/postinstall.js

**Why Critical:**
- Run automatically during npm install
- Have full system access
- Can download malware, steal secrets, create backdoors
- Primary vector for supply chain attacks

**Expected Alert:** Install scripts detected

---

### 2. Shell Execution Capabilities

**Packages with shell access:**
- `shelljs` - Direct shell command execution
- `execa` - Process execution
- `cross-spawn` - Cross-platform spawning
- `node-cmd` - Command execution
- `exec` - Execute package

**Why Critical:**
- Can execute arbitrary system commands
- Command injection vulnerabilities
- Full system compromise potential

**Expected Alert:** Shell execution capability

---

### 3. Dynamic Code Execution

**Packages with eval/Function:**
- `handlebars` (4.7.6) - Template engine
- `ejs` (3.1.6) - Template engine
- `pug` (3.0.2) - Template engine
- `js-yaml` (3.13.1) - YAML parser with code execution

**Why Critical:**
- Can execute arbitrary JavaScript code
- Remote Code Execution (RCE) potential
- Template injection vulnerabilities

**Expected Alert:** Dynamic code execution, eval usage

---

## High Severity

### 4. Known CVEs

**Vulnerable packages:**

#### axios 0.21.0
- **CVE-2021-3749** - SSRF vulnerability
- **Severity:** High
- **Fix:** Upgrade to 0.21.1+

#### lodash 4.17.20
- **CVE-2020-8203** - Prototype Pollution
- **Severity:** High
- **Fix:** Upgrade to 4.17.21+

#### node-fetch 2.6.0
- **CVE-2020-15168** - Size limit bypass
- **Severity:** High
- **Fix:** Upgrade to 2.6.1+

#### minimist 1.2.5
- **CVE-2021-44906** - Prototype Pollution
- **Severity:** High
- **Fix:** Upgrade to 1.2.6+

#### underscore 1.12.0
- **CVE-2021-23358** - Arbitrary code execution
- **Severity:** High
- **Fix:** Upgrade to 1.13.1+

#### tar 4.4.13
- **CVE-2021-37701** - Arbitrary file creation/overwrite
- **CVE-2021-37712** - Arbitrary file creation/overwrite
- **CVE-2021-37713** - Arbitrary file creation/overwrite
- **Severity:** High
- **Fix:** Upgrade to 6.1.9+

#### glob-parent 5.1.1
- **CVE-2020-28469** - ReDoS vulnerability
- **Severity:** High
- **Fix:** Upgrade to 5.1.2+

#### trim-newlines 3.0.0
- **CVE-2021-33623** - ReDoS vulnerability
- **Severity:** High
- **Fix:** Upgrade to 3.0.1+

#### ansi-regex 5.0.0
- **CVE-2021-3807** - ReDoS vulnerability
- **Severity:** High
- **Fix:** Upgrade to 5.0.1+

#### js-yaml 3.13.1
- **CVE-2021-32019** - Code execution via load()
- **Severity:** High
- **Fix:** Upgrade to 4.1.0+

#### handlebars 4.7.6
- **CVE-2021-23383** - Remote code execution
- **Severity:** High
- **Fix:** Upgrade to 4.7.7+

#### serialize-javascript 5.0.1
- **CVE-2022-25801** - Cross-site scripting
- **Severity:** High
- **Fix:** Upgrade to 6.0.0+

#### ws 7.4.6
- **CVE-2021-32640** - ReDoS vulnerability
- **Severity:** High
- **Fix:** Upgrade to 7.5.1+

---

### 5. Network Access

**Packages with network capabilities:**
- `axios` - HTTP client
- `node-fetch` - HTTP client
- `request` - HTTP client (deprecated)
- `got` - HTTP client
- `needle` - HTTP client
- `superagent` - HTTP client
- `download` - File downloader
- `twilio` - Twilio API (network)
- `nodemailer` - Email (network)
- `stripe` - Stripe API (network)
- `aws-sdk` - AWS API (network)
- `@google-cloud/storage` - GCP API (network)
- `firebase-admin` - Firebase API (network)

**Why High:**
- Can exfiltrate sensitive data
- Phone home to attacker servers
- Download malicious payloads

**Expected Alert:** Network access capability

---

### 6. Filesystem Access

**Packages with filesystem capabilities:**
- `fs-extra` - Extended filesystem operations
- `rimraf` - Recursive deletion
- `mkdirp` - Directory creation
- `chokidar` - File watching
- `sharp` - Image processing (file access)
- `pdf-parse` - PDF parsing (file access)
- `multer` - File uploads

**Why High:**
- Can read sensitive files (.env, credentials)
- Can modify/delete system files
- Can create backdoors

**Expected Alert:** Filesystem access capability

---

## Medium Severity

### 7. Deprecated Packages

**Deprecated/Maintenance Mode:**
- `request` - Fully deprecated, no longer maintained
- `moment` - In maintenance mode, recommend date-fns/luxon
- `uuid@3.x` - Outdated version
- `shortid` - Deprecated due to security concerns

**Why Medium:**
- No security updates
- Known vulnerabilities won't be fixed
- Technical debt accumulation

**Expected Alert:** Deprecated package, unmaintained

---

### 8. Database Access

**Database drivers:**
- `sqlite3` - SQLite database
- `mysql` - MySQL database
- `pg` - PostgreSQL database
- `redis` - Redis database

**Why Medium:**
- Can access sensitive data
- SQL injection risks
- Data exfiltration potential

**Expected Alert:** Database access capability

---

### 9. Environment Variable Access

**Packages accessing process.env:**
- `dotenv` - Environment variables
- Most packages access process.env for configuration

**Why Medium:**
- Can steal API keys, secrets, credentials
- Environment variables often contain sensitive data

**Expected Alert:** Environment variable access

---

### 10. Native Addons

**Packages with native bindings:**
- `bcrypt` - Native crypto
- `sqlite3` - Native database
- `sharp` - Native image processing
- `grpc` - Native gRPC

**Why Medium:**
- Binary downloads during install
- Potential for malicious binaries
- Platform-specific code

**Expected Alert:** Native addon, binary download

---

## Low Severity

### 11. Package Quality Issues

**Quality concerns:**
- Large dependency trees
- Outdated dependencies
- Missing or inconsistent license
- No recent updates
- Low npm score

**Expected Alert:** Package quality warnings

---

## Detection Categories Summary

Socket.dev should detect issues in these categories:

### Supply Chain Risks (Critical)
- [x] Install scripts (preinstall, postinstall)
- [x] Shell execution
- [x] Dynamic code execution
- [x] Binary downloads

### Security Vulnerabilities (High)
- [x] Known CVEs (12+ packages)
- [x] Prototype pollution
- [x] ReDoS vulnerabilities
- [x] Code execution vulnerabilities
- [x] SSRF vulnerabilities

### Behavioral Analysis (High/Medium)
- [x] Network access (14+ packages)
- [x] Filesystem access (7+ packages)
- [x] Database access (4 packages)
- [x] Environment variable access
- [x] Shell execution (5+ packages)

### Maintenance & Quality (Medium/Low)
- [x] Deprecated packages (4 packages)
- [x] Unmaintained packages
- [x] Maintenance mode packages
- [x] Package quality scores

### Code Patterns (High)
- [x] eval() usage
- [x] Function() constructor usage
- [x] Template injection risks
- [x] Unsafe deserialization

---

## Expected Alert Count

**Minimum alerts expected:**
- Critical: 16+ (includes known malware package)
- High: 40+
- Medium: 20+
- Low: 10+

**Total: 86+ alerts**

---

## Comparison: What npm audit WON'T detect

npm audit only detects known CVEs. It will NOT detect:
- Install scripts
- Shell execution capabilities
- Network access
- Filesystem access
- Deprecated packages (unless CVE exists)
- Behavioral patterns
- Package quality issues
- Maintenance status

**Estimated npm audit findings:** 12-15 CVEs only

**Estimated Socket.dev findings:** 85+ issues across all categories

This demonstrates Socket.dev's comprehensive detection beyond basic CVE scanning.
