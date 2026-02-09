# Socket.dev POC - Quick Start Guide

Get started evaluating Socket.dev in 5 minutes.

## Prerequisites

```bash
# Check Node.js version (14+ required)
node --version

# Check npm version (7+ required for workspaces)
npm --version
```

## Step-by-Step Setup

### 1. Install Socket.dev CLI

```bash
npm install -g @socketsecurity/cli
```

### 2. Authenticate with Socket.dev

```bash
# Get your API token from https://socket.dev/settings
socket login
```

### 3. Run Initial Scan (DO NOT npm install yet)

```bash
# Basic scan - shows all issues
socket npm audit

# JSON output for analysis
socket npm audit --json > audit-results/socket-audit.json

# Generate detailed report
socket report create
```

### 4. Review Expected Findings

```bash
# Open EXPECTED_FINDINGS.md
# This lists all 85+ issues Socket.dev SHOULD detect
```

### 5. Compare with npm audit

```bash
# Create audit-results directory
mkdir audit-results

# Run npm audit
npm audit --json > audit-results/npm-audit.json

# Run Socket.dev audit
socket npm audit --json > audit-results/socket-audit.json

# Compare results
node scripts/compare-audits.js
```

## What You Should See

### Socket.dev Should Detect (85+ issues):

**Critical:**
- 2 install scripts (preinstall.js, postinstall.js)
- 5+ shell execution packages
- 5+ dynamic code execution packages

**High:**
- 15+ known CVEs
- 14+ network access packages
- 7+ filesystem access packages

**Medium:**
- 4+ deprecated packages
- 4 database access packages

**Low:**
- 10+ package quality issues

### npm audit Should Detect (12-15 issues):

**Only known CVEs:**
- lodash prototype pollution
- minimist prototype pollution
- Various ReDoS vulnerabilities
- tar vulnerabilities
- etc.

**Socket.dev finds 6x more issues than npm audit!**

## Testing Capabilities

### Test 1: Network Access Detection

```bash
# Install dependencies first
npm install

# Run network test
npm run test:network
```

Socket.dev should flag: axios, node-fetch, request, got, needle

### Test 2: Filesystem Access Detection

```bash
npm run test:filesystem
```

Socket.dev should flag: fs-extra, mkdirp, rimraf

### Test 3: Shell Execution Detection

```bash
npm run test:shell
```

Socket.dev should flag: shelljs, execa, cross-spawn

### Test 4: Dynamic Code Execution

```bash
npm run test:eval
```

Socket.dev should flag: handlebars, ejs, js-yaml, serialize-javascript

## CI/CD Integration

### GitHub Actions (2 minutes)

1. Add API token to GitHub Secrets:
   - Go to Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Name: `SOCKET_SECURITY_API_TOKEN`
   - Value: Your Socket.dev API token

2. Push code:
   ```bash
   git add .
   git commit -m "Add Socket.dev POC"
   git push
   ```

3. Create a PR and watch Socket.dev scan automatically

### GitLab CI (2 minutes)

1. Add API token to GitLab CI/CD variables:
   - Go to Settings > CI/CD > Variables
   - Click "Add variable"
   - Key: `SOCKET_SECURITY_API_TOKEN`
   - Value: Your Socket.dev API token
   - Protected: Yes, Masked: Yes

2. Push code and create MR - pipeline runs automatically

### Jenkins (5 minutes)

1. Add API token to Jenkins credentials:
   - Manage Jenkins > Credentials > System > Global credentials
   - Add Credentials
   - Kind: Secret text
   - Secret: Your Socket.dev API token
   - ID: `socket-security-api-token`

2. Create pipeline job using provided Jenkinsfile

## Evaluation Checklist

Use `EVALUATION_CHECKLIST.md` to systematically evaluate:

### Quick Evaluation (15 minutes)
- [ ] Run Socket.dev scan
- [ ] Run npm audit
- [ ] Compare results
- [ ] Review detection accuracy
- [ ] Test one CI/CD integration

### Comprehensive Evaluation (2-4 hours)
- [ ] Complete all sections in EVALUATION_CHECKLIST.md
- [ ] Test all CI/CD integrations
- [ ] Run all test suites
- [ ] Review dashboard and reporting
- [ ] Calculate ROI
- [ ] Make decision

## Common Commands

```bash
# Scanning
socket npm audit                    # Basic scan
socket npm audit --json            # JSON output
socket report create               # Generate report

# Testing
npm run test:all                   # All tests
npm run test:network               # Network test
npm run test:filesystem            # Filesystem test
npm run test:shell                 # Shell test
npm run test:eval                  # Eval test

# Comparison
npm run compare:audits             # Compare Socket vs npm

# Docker
npm run docker:build               # Build image
npm run docker:run                 # Run container

# Workspaces
npm run workspace:api              # API server
npm run workspace:worker           # Worker service
npm run workspace:processor        # Data processor
```

## Expected Results Summary

| Tool | Issues Found | Categories |
|------|--------------|------------|
| **Socket.dev** | **85+** | CVEs + Supply Chain + Behavioral + Quality |
| npm audit | 12-15 | CVEs only |

Socket.dev provides **6x more coverage** than npm audit.

## Key Evaluation Questions

1. **Detection Accuracy:** Does Socket.dev find all expected issues?
2. **False Positives:** How many legitimate packages are incorrectly flagged?
3. **Performance:** How long do scans take? Impact on CI/CD?
4. **Usability:** Is it easy to use? Good developer experience?
5. **Value:** Is it worth the cost? ROI positive?

## Decision Matrix

After testing, rate Socket.dev (1-5 scale):

- [ ] Detection accuracy: _____
- [ ] Ease of use: _____
- [ ] CI/CD integration: _____
- [ ] Performance: _____
- [ ] Dashboard quality: _____
- [ ] Value for money: _____

**Overall score: _____/30**

**Recommendation:**
- 25-30: Strongly recommend
- 20-24: Recommend with conditions
- 15-19: Pilot program first
- <15: Not ready

## Next Steps

### If approved:
1. Review `EVALUATION_CHECKLIST.md` for implementation plan
2. Configure organization-wide policies
3. Set up CI/CD integration for all repos
4. Train development teams
5. Establish monitoring and metrics

### If not approved:
1. Document specific gaps
2. Consider alternatives (Snyk, Dependabot)
3. Plan re-evaluation timeline

## Troubleshooting

**Socket.dev CLI not found:**
```bash
npm install -g @socketsecurity/cli
```

**Authentication failed:**
```bash
socket logout
socket login
# Enter new API token
```

**Tests not running:**
```bash
# Install dependencies first
npm install
```

**Audit results directory missing:**
```bash
mkdir audit-results
```

## Support

- Documentation: https://docs.socket.dev
- Dashboard: https://socket.dev
- Issues: File in this repository
- Questions: security@socket.dev

---

**Quick evaluation time:** 15 minutes
**Comprehensive evaluation time:** 2-4 hours
**ROI calculation time:** 30 minutes

Start your evaluation now!
