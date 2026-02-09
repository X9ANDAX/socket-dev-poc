# Audit Results Directory

This directory stores audit results from Socket.dev and npm audit for comparison.

## Files

- `socket-audit.json` - Socket.dev scan results
- `npm-audit.json` - npm audit scan results
- `socket-report.json` - Socket.dev detailed report

## How to Generate

### Socket.dev Audit

```bash
socket npm audit --json > audit-results/socket-audit.json
socket report create --json > audit-results/socket-report.json
```

### npm Audit

```bash
npm audit --json > audit-results/npm-audit.json
```

### Compare Results

```bash
npm run compare:audits
```

## Expected Results

### Socket.dev
- **Total issues:** 85+
- **Categories:** CVEs, Supply Chain, Behavioral, Quality
- **Critical:** 15+
- **High:** 40+
- **Medium:** 20+
- **Low:** 10+

### npm audit
- **Total issues:** 12-15
- **Categories:** CVEs only
- **Critical:** 1-2
- **High:** 5-8
- **Moderate:** 4-6
- **Low:** 1-2

## Comparison

Socket.dev provides approximately **6x more coverage** than npm audit by detecting:

1. Supply chain attack vectors (install scripts)
2. Behavioral risks (shell, network, filesystem)
3. Deprecated/unmaintained packages
4. Code quality issues
5. All CVEs that npm audit finds PLUS proactive detection

## Notes

These files are gitignored by default but can be committed for documentation purposes.
