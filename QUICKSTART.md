# Socket.dev POC - Quick Start Guide

## 5-Minute Setup

### Step 1: Navigate to Project (if not already there)

```bash
cd C:\Users\kib\Desktop\socket-dev-poc
```

### Step 2: Scan with Socket.dev (BEFORE installing)

```bash
npx socket-npm-cli@latest audit package.json
```

**Expected Output:**
- High severity warnings for shelljs, node-cmd, exec
- CVE alerts for lodash@4.17.20
- Network access warnings for axios, node-fetch, request
- Deprecation warning for request
- Filesystem access alerts for fs-extra, download

### Step 3: Review Findings

Socket.dev will show:
- 🔴 Critical: CVE-2020-8203 in lodash
- 🔴 High: Shell execution capabilities
- 🟡 Medium: Network and filesystem access
- 🟡 Medium: Deprecated packages

### Step 4: Install Dependencies

```bash
npm install
```

### Step 5: Run the Application

```bash
npm start
```

Server starts on `http://localhost:3000`

### Step 6: Test Endpoints

Open a new terminal:

```bash
# Application info
curl http://localhost:3000/

# Test vulnerable lodash
curl http://localhost:3000/lodash

# Test shell execution
curl http://localhost:3000/shell

# Test network access
curl http://localhost:3000/network

# Test filesystem access
curl http://localhost:3000/filesystem
```

---

## What You'll Learn

1. How Socket.dev scans packages BEFORE installation
2. What risky behaviors Socket.dev detects
3. How to interpret Socket.dev security findings
4. How to remediate security issues in dependencies

---

## Key Commands

```bash
# Scan before installing
npx socket-npm-cli@latest audit package.json

# Scan after installing
npx socket-npm-cli@latest audit

# Check specific package
npx socket-npm-cli@latest info lodash@4.17.20

# Generate report
npx socket-npm-cli@latest report create

# Install packages
npm install

# Run application
npm start
```

---

## Expected Findings Summary

| Package | Issue | Severity |
|---------|-------|----------|
| lodash@4.17.20 | CVE-2020-8203 | Critical |
| shelljs | Shell execution | High |
| node-cmd | Command execution | High |
| exec | Code execution | High |
| axios | Network access | Medium |
| node-fetch | Network access | Medium |
| request | Deprecated + Network | Medium |
| fs-extra | Filesystem access | Medium |
| download | Network + FS access | Medium |
| dotenv | Env var access | Medium |

---

## Next Steps

1. Read `README.md` for detailed explanation
2. Review `SECURITY.md` for security analysis
3. Check Socket.dev dashboard at https://socket.dev
4. Integrate Socket.dev into your CI/CD pipeline

---

**Pro Tip:** Always scan dependencies with Socket.dev BEFORE running `npm install` to catch issues early!
