// Jenkinsfile for Socket.dev POC

pipeline {
    agent {
        docker {
            image 'node:18'
            args '-u root'
        }
    }

    environment {
        // Socket.dev API token from Jenkins credentials
        // Configure at: Jenkins > Credentials > System > Global credentials
        SOCKET_SECURITY_API_TOKEN = credentials('socket-security-api-token')
        NODE_VERSION = '18'
    }

    options {
        // Keep builds for 30 days
        buildDiscarder(logRotator(daysToKeepStr: '30'))
        // Timeout after 30 minutes
        timeout(time: 30, unit: 'MINUTES')
        // Don't run concurrent builds
        disableConcurrentBuilds()
    }

    stages {
        stage('Setup') {
            steps {
                echo 'Installing Socket.dev CLI...'
                sh 'npm install -g @socketsecurity/cli'
                sh 'socket --version'
            }
        }

        stage('Socket.dev Security Scan') {
            steps {
                echo 'Running Socket.dev security scan...'
                script {
                    // Run Socket.dev scan
                    def socketStatus = sh(
                        script: 'socket npm audit --json > socket-audit.json',
                        returnStatus: true
                    )

                    // Generate report
                    sh 'socket report create --json > socket-report.json || true'

                    // Archive results
                    archiveArtifacts artifacts: 'socket-*.json', fingerprint: true

                    // Check if critical issues found
                    if (socketStatus != 0) {
                        echo 'WARNING: Socket.dev found security issues'
                        // Uncomment to fail build on issues:
                        // error('Socket.dev security scan failed')
                    }
                }
            }
        }

        stage('npm audit Comparison') {
            steps {
                echo 'Running npm audit for comparison...'
                script {
                    // Run npm audit (don't fail on vulnerabilities)
                    sh 'npm audit --json > npm-audit.json || true'

                    // Archive npm audit results
                    archiveArtifacts artifacts: 'npm-audit.json', fingerprint: true
                }
            }
        }

        stage('Scan Packages') {
            parallel {
                stage('API Server') {
                    steps {
                        dir('packages/api-server') {
                            echo 'Scanning API Server package...'
                            sh 'socket npm audit --json > ../../api-server-audit.json || true'
                        }
                    }
                }

                stage('Worker Service') {
                    steps {
                        dir('packages/worker-service') {
                            echo 'Scanning Worker Service package...'
                            sh 'socket npm audit --json > ../../worker-service-audit.json || true'
                        }
                    }
                }

                stage('Data Processor') {
                    steps {
                        dir('packages/data-processor') {
                            echo 'Scanning Data Processor package...'
                            sh 'socket npm audit --json > ../../data-processor-audit.json || true'
                        }
                    }
                }

                stage('Common') {
                    steps {
                        dir('packages/common') {
                            echo 'Scanning Common package...'
                            sh 'socket npm audit --json > ../../common-audit.json || true'
                        }
                    }
                }
            }
        }

        stage('Compare Results') {
            steps {
                echo 'Comparing Socket.dev vs npm audit...'
                sh 'node scripts/compare-audits.js || true'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running test suite...'
                script {
                    // Install dependencies
                    sh 'npm install'

                    // Run tests (allow failure for POC)
                    sh 'npm run test:network || true'
                    sh 'npm run test:filesystem || true'
                    sh 'npm run test:shell || true'
                    sh 'npm run test:eval || true'
                }
            }
        }

        stage('Generate Report') {
            steps {
                echo 'Generating security report...'
                script {
                    // Create summary report
                    sh '''
                        echo "=== Socket.dev POC Security Report ===" > security-report.txt
                        echo "" >> security-report.txt
                        echo "Build: ${BUILD_NUMBER}" >> security-report.txt
                        echo "Date: $(date)" >> security-report.txt
                        echo "" >> security-report.txt
                        echo "Socket.dev scan results in socket-audit.json" >> security-report.txt
                        echo "npm audit results in npm-audit.json" >> security-report.txt
                        echo "" >> security-report.txt
                        echo "Review EXPECTED_FINDINGS.md for what should be detected" >> security-report.txt
                        echo "Review EVALUATION_CHECKLIST.md for evaluation criteria" >> security-report.txt
                    '''

                    archiveArtifacts artifacts: '*-audit.json,security-report.txt', fingerprint: true
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            // Clean workspace
            cleanWs()
        }

        success {
            echo 'Socket.dev POC pipeline completed successfully'
        }

        failure {
            echo 'Socket.dev POC pipeline failed'
            // Send notification (configure as needed)
            // mail to: 'security@example.com',
            //      subject: "Socket.dev POC Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
            //      body: "Check ${env.BUILD_URL} for details"
        }

        unstable {
            echo 'Socket.dev POC pipeline is unstable'
        }
    }
}

// Scheduled job configuration (configure in Jenkins UI):
// - Daily at 2 AM: H 2 * * *
// - Weekly on Monday: H 2 * * 1
// - After every commit: (use SCM polling or webhooks)
