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
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx playwright test --reporter=list'
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
            junit 'playwright-report/*.xml' // If you generate JUnit XML reports
        }
    }
}
