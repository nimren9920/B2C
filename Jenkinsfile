pipeline {
    agent any
    tools {nodejs "Node"}
    stages {
        stage('Clone Repository'){
            steps{
                git branch: 'main',
                    url: 'https://github.com/nimren9920/B2C.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                // Lint the codebase
                sh 'npm run lint'
            }
        }

        stage('Test') {
            steps {
                // Run unit tests
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                // Build the project
                sh 'npm run build'
            }
        }

        stage('Integration Tests') {
            steps {
                // Run integration tests
                sh 'npm run test:integration'
            }
        }

        stage('E2E Tests') {
            steps {
                // Run end-to-end tests
                sh 'npm run test:e2e'
            }
        }

        stage('Security Scan') {
            steps {
                // Run security scan using a tool like npm audit or snyk
                sh 'npm audit'
                // OR using Snyk
                // sh 'npx snyk test'
            }
        }

        stage('Performance Tests') {
            steps {
                // Run performance tests
                sh 'npm run test:performance'
            }
        }

        stage('Package') {
            steps {
                // Package the application for deployment
                sh 'npm run package'
            }
        }

        stage('Deploy to Staging') {
            when {
                branch 'main'
            }
            steps {
                // Deploy to staging environment
                sh 'npm run deploy:staging'
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'main'
                expression { currentBuild.currentResult == 'SUCCESS' }
            }
            steps {
                // Deploy to production environment
                sh 'npm run deploy:production'
            }
        }
    }
}
