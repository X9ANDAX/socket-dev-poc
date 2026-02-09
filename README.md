# Socket.dev Security Scanning POC

## Overview

This is a Proof of Concept (POC) application designed to test and demonstrate the capabilities of Socket.dev, a supply chain security tool that analyzes npm packages for security risks.

## What is Socket.dev?

Socket.dev is a security platform that provides deep package inspection for your dependencies. It detects:

- **Malicious packages** - Known malware, backdoors, and malicious code
- **Typosquatting attacks** - Packages that impersonate popular libraries
- **Dependency vulnerabilities** - Known CVEs and security issues
- **Risky behaviors** - Network access, filesystem operations, shell execution, obfuscated code
- **Supply chain risks** - Install scripts, dynamic code execution, environment variable access
- **License issues** - License compliance and conflicts

## POC Purpose

This application intentionally includes dependencies with various risk profiles that Socket.dev monitors:

### Network Access
- `axios` - HTTP client (network access)
- `node-fetch` - Fetch API implementation (network access)
- `request` - HTTP library (deprecated, network access)
- `download` - File downloader (network + filesystem)

### Shell Execution
- `shelljs` - Unix shell commands for Node.js
- `node-cmd` - Execute shell commands
- `exec` - Command execution utility

### Filesystem Access
- `fs-extra` - Enhanced filesystem operations
- `download` - Downloads and writes files

### Known Vulnerabilities
- `lodash` 4.17.20 - CVE-2020-8203 (Prototype Pollution)
- `underscore` 1.12.0 - Older version with potential issues
- `moment` 2.29.4 - In maintenance mode, has known issues
- `request` - Deprecated package

### Other Monitored Behaviors
- `cheerio` - HTML parsing (eval-like behavior)
- `dotenv` - Environment variable access
- `cowsay` - Fun package with minimal risk (baseline)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Socket.dev account (for advanced features)

### Step 1: Clone or Download This POC

```bash
cd C:\Users\kib\Desktop\socket-dev-poc
```

### Step 2: Install Socket.dev CLI

There are multiple ways to install Socket.dev:

#### Option A: Using npx (No Installation)
```bash
npx socket-npm-cli@latest --help
```

#### Option B: Global Installation
```bash
npm install -g @socketsecurity/cli
```

#### Option C: Local Installation
```bash
npm install --save-dev @socketsecurity/cli
```

### Step 3: Install Project Dependencies

**WARNING:** Do NOT run `npm install` yet if you want to see Socket.dev in action first!

Socket.dev is most effective when used BEFORE installing dependencies.

## Using Socket.dev

### 1. Scan Before Installing (Recommended)

This is the safest approach - scan dependencies before they're installed:

```bash
npx socket-npm-cli@latest audit package.json
```

This will analyze all dependencies in package.json without installing them.

### 2. Scan Existing Installation

If you've already run `npm install`:

```bash
npx socket-npm-cli@latest audit
```

### 3. Scan Specific Package

To check a specific package before adding it:

```bash
npx socket-npm-cli@latest info shelljs
npx socket-npm-cli@latest info lodash@4.17.20
```

### 4. Create Security Report

Generate a detailed security report:

```bash
npx socket-npm-cli@latest report create
```

### 5. CI/CD Integration

For GitHub Actions integration:

```yaml
name: Socket Security
on: [pull_request]
jobs:
  socket-security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - name: Run Socket.dev scan
        run: npx socket-npm-cli@latest audit
```

## Expected Findings

When you run Socket.dev on this POC, you should see alerts for:

### High Risk Issues

1. **Shell Execution**
   - `shelljs` - Allows arbitrary shell command execution
   - `node-cmd` - Execute system commands
   - `exec` - Command execution capability

2. **Known CVEs**
   - `lodash@4.17.20` - CVE-2020-8203 (Prototype Pollution)
   - Severity: High
   - Fix: Upgrade to 4.17.21+

3. **Deprecated Packages**
   - `request` - Package is deprecated, no longer maintained
   - Recommendation: Use `axios` or `node-fetch`

### Medium Risk Issues

4. **Network Access**
   - `axios` - Makes HTTP requests
   - `node-fetch` - Network communication
   - `download` - Downloads files from network
   - Risk: Can exfiltrate data or download malicious content

5. **Filesystem Access**
   - `fs-extra` - Read/write filesystem operations
   - `download` - Writes downloaded files
   - Risk: Can read sensitive files or write malicious files

6. **Environment Variable Access**
   - `dotenv` - Reads environment variables
   - Risk: Can access sensitive credentials

### Low Risk Issues

7. **Install Scripts**
   - Some packages may have install scripts that run during npm install
   - Risk: Code execution during installation

8. **Dynamic Code Evaluation**
   - `cheerio` - Uses eval-like patterns for HTML parsing
   - Risk: Can execute arbitrary code

## Running the Application

After reviewing Socket.dev findings:

### Install Dependencies

```bash
npm install
```

### Start the Server

```bash
npm start
```

The server will run on `http://localhost:3000`

### Test Endpoints

```bash
# Get application info
curl http://localhost:3000/

# Test network access
curl http://localhost:3000/network

# Test filesystem access
curl http://localhost:3000/filesystem

# Test shell execution
curl http://localhost:3000/shell

# Test vulnerable lodash
curl http://localhost:3000/lodash

# Health check
curl http://localhost:3000/health
```

## Security Recommendations

Based on Socket.dev findings, here's what you should do:

### Critical Actions

1. **Upgrade lodash**
   ```bash
   npm install lodash@latest
   ```

2. **Replace deprecated packages**
   ```bash
   npm uninstall request
   # Use axios or node-fetch instead
   ```

3. **Review shell execution packages**
   - Consider if `shelljs` and `node-cmd` are necessary
   - If needed, ensure all inputs are strictly validated
   - Never pass user input directly to shell commands

### Best Practices

1. **Minimize dependencies** - Only install what you need
2. **Keep dependencies updated** - Use `npm audit` and Socket.dev regularly
3. **Review new packages** - Check Socket.dev before adding new dependencies
4. **Use lock files** - Commit `package-lock.json` to prevent supply chain attacks
5. **CI/CD integration** - Add Socket.dev to your pipeline
6. **Principle of least privilege** - Avoid packages that need excessive permissions

## Socket.dev Features Demonstrated

This POC demonstrates Socket.dev's ability to detect:

- ✅ Known CVEs (lodash vulnerability)
- ✅ Shell execution capabilities (shelljs, node-cmd, exec)
- ✅ Network access (axios, node-fetch, request, download)
- ✅ Filesystem access (fs-extra, download)
- ✅ Deprecated packages (request)
- ✅ Environment variable access (dotenv)
- ✅ Dynamic code evaluation (cheerio)
- ✅ Package maintenance status (moment in maintenance mode)

## Additional Resources

- Socket.dev Website: https://socket.dev
- Socket.dev Documentation: https://docs.socket.dev
- Socket.dev CLI: https://github.com/SocketDev/socket-cli-js
- Socket.dev Dashboard: https://socket.dev/dashboard
- OWASP Top 10: https://owasp.org/www-project-top-ten/

## Notes

- This POC is for **educational and testing purposes only**
- None of the packages included are malicious
- All packages are legitimate but demonstrate behaviors Socket.dev monitors
- Some packages have known vulnerabilities to show Socket.dev's detection capabilities
- In production, always follow Socket.dev recommendations

## License

MIT

## Author

Security Testing / DevSecOps POC

---

**Remember:** The best time to scan for security issues is BEFORE installing dependencies, not after!
