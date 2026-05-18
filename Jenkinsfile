pipeline {
    agent any

    tools {
        nodejs "Node24"   // Configure Node.js v24.11.1 in Jenkins global tools
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/GvvPrasad/ecommerce_shopfy.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

         stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }
        
        stage('Run Tests') {
            steps {
                bat 'npx playwright test --reporter=html'
            }
        }

        stage('Archive Reports') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
            }
        }
    }

    post {
        always {
            junit 'test-results/results.xml' // If you generate JUnit XML reports
        }
    }
}
