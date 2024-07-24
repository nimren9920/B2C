pipeline {
    agent any

    environment {
        NODE_ENV = 'development'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the repository
                git branch: 'main', url: 'https://github.com/nimren9920/B2C.git'
            }
        }

        stage('Set up Node.js') {
            steps {
                // Set up Node.js environment
                tool name: 'NodeJS 14', type: 'NodeJS' // Ensure you have configured a NodeJS tool named 'NodeJS 14' in Jenkins
                sh 'node -v' // Verify Node.js version
                sh 'npm -v' // Verify npm version
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

        stage('Deploy') {
            when {
                branch 'main'
                expression { currentBuild.currentResult == 'SUCCESS' }
            }
            steps {
                // Deploy to staging or production environment
                sh 'npm run deploy'
            }
        }
    }

    post {
        always {
            // Clean up after the build
            cleanWs()
        }

        success {
            // Notify success
            echo 'Build succeeded!'
        }

        failure {
            // Notify failure
            echo 'Build failed!'
        }
    }
}
