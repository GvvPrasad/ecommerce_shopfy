// ============================================================================
// JENKINSFILE FOR ECOMMERCE SHOPFY PROJECT
// This Jenkinsfile automates the CI/CD pipeline for running automated tests
// and generating test reports whenever code is pushed to the main branch.
// ============================================================================

// Define the pipeline using the declarative syntax
pipeline {
    // ========================================================================
    // AGENT CONFIGURATION
    // ========================================================================
    // Specify that this pipeline can run on any available Jenkins agent
    // with a label 'any', or remove the label to use the default Jenkins agent
    agent any

    // ========================================================================
    // ENVIRONMENT VARIABLES
    // ========================================================================
    // Define global environment variables that will be used throughout the pipeline
    environment {
        // Set Node.js version to use (ensure this matches your system's Node version)
        NODE_VERSION = '24.x'
        
        // Define the working directory path for the project
        PROJECT_DIR = "${WORKSPACE}"
        
        // Set the environment for test execution (can be 'qa' or 'prod')
        TEST_ENV = 'qa'
        
        // Define the path where Allure results will be stored
        ALLURE_RESULTS_DIR = "${WORKSPACE}/allure-results"
        
        // Define the path where Allure report will be generated
        ALLURE_REPORT_DIR = "${WORKSPACE}/allure-report"
        
        // Define the path for storing test reports
        TEST_REPORT_DIR = "${WORKSPACE}/test-results"
        
        // Define the Allure command-line tool path (installed globally or via npm)
        ALLURE_CMD = "npx allure"
    }

    // ========================================================================
    // TRIGGERS
    // ========================================================================
    // Configure when this pipeline should automatically trigger
    triggers {
        // Trigger on git push to the main branch
        githubPush()
        
        // Alternative: Poll SCM every 5 minutes to check for changes
        // pollSCM('H/5 * * * *')
    }

    // ========================================================================
    // OPTIONS
    // ========================================================================
    // Configure general pipeline behavior and settings
    options {
        // Keep the last 10 builds to save disk space
        buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '10'))
        
        // Set a timeout for the entire pipeline (2 hours max)
        timeout(time: 2, unit: 'HOURS')
        
        // Add timestamps to all console output for better debugging
        timestamps()
        
        // Disable concurrent builds for this project
        disableConcurrentBuilds()
    }

    // ========================================================================
    // STAGES
    // ========================================================================
    // Define the different stages/steps of the CI/CD pipeline
    stages {
        
        // ====================================================================
        // STAGE 1: CHECKOUT CODE
        // ====================================================================
        // This stage checks out the latest code from the git repository
        stage('Checkout Code') {
            steps {
                script {
                    // Print a message indicating the start of code checkout
                    echo "=========================================="
                    echo "STAGE: Checking out latest code from main branch"
                    echo "=========================================="
                    
                    // Checkout code from the git repository
                    // It will automatically checkout the branch that triggered the build
                    checkout(
                        [
                            $class: 'GitSCM',
                            branches: [[name: '*/main']],  // Checkout from main branch
                            userRemoteConfigs: [[
                                url: 'https://github.com/GvvPrasad/ecommerce_shopfy.git'
                            ]]
                        ]
                    )
                    
                    // Display the current directory to verify checkout was successful
                    echo "Current working directory: ${PWD}"
                    
                    // List files in the current directory to verify project structure
                    sh 'ls -la'
                }
            }
        }

        // ====================================================================
        // STAGE 2: INSTALL DEPENDENCIES
        // ====================================================================
        // This stage installs all required npm dependencies and tools
        stage('Install Dependencies') {
            steps {
                script {
                    // Print a message indicating the start of dependency installation
                    echo "=========================================="
                    echo "STAGE: Installing project dependencies"
                    echo "=========================================="
                    
                    // Clean npm cache to ensure fresh installation
                    sh 'npm cache clean --force'
                    
                    // Install all dependencies listed in package.json
                    sh 'npm install'
                    
                    // Verify Node.js and npm versions installed
                    echo "Node.js version:"
                    sh 'node --version'
                    
                    echo "npm version:"
                    sh 'npm --version'
                    
                    // Install Playwright browsers required for test execution
                    sh 'npx playwright install'
                    
                    // Verify Playwright installation
                    echo "Playwright version:"
                    sh 'npx playwright --version'
                }
            }
        }

        // ====================================================================
        // STAGE 3: RUN TESTS
        // ====================================================================
        // This stage executes the Playwright test suite
        stage('Run Tests') {
            steps {
                script {
                    // Print a message indicating the start of test execution
                    echo "=========================================="
                    echo "STAGE: Running Playwright tests"
                    echo "=========================================="
                    
                    // Print which environment tests will run against
                    echo "Testing environment: ${TEST_ENV}"
                    
                    // Run Playwright tests in the QA environment
                    // The tests will automatically generate reports via Allure
                    // 'set -e' ensures the build fails if tests fail
                    sh '''
                        set -e
                        npm run test:${TEST_ENV}
                    '''
                    
                    // If tests complete successfully, print a success message
                    echo "Tests completed successfully!"
                }
            }
        }

        // ====================================================================
        // STAGE 4: GENERATE ALLURE REPORTS
        // ====================================================================
        // This stage generates the Allure test report from test results
        stage('Generate Allure Reports') {
            steps {
                script {
                    // Print a message indicating the start of report generation
                    echo "=========================================="
                    echo "STAGE: Generating Allure test reports"
                    echo "=========================================="
                    
                    // Check if allure-results directory exists
                    sh '''
                        if [ -d "${ALLURE_RESULTS_DIR}" ]; then
                            echo "Allure results directory found"
                            ls -la ${ALLURE_RESULTS_DIR}
                        else
                            echo "Warning: Allure results directory not found"
                        fi
                    '''
                    
                    // Generate the Allure HTML report from test results
                    // The --clean flag removes the previous report before generating a new one
                    sh '${ALLURE_CMD} generate ${ALLURE_RESULTS_DIR} --clean -o ${ALLURE_REPORT_DIR}'
                    
                    // Verify that the report was generated successfully
                    echo "Allure report generated successfully"
                    
                    // List the generated report files to confirm
                    sh 'ls -la ${ALLURE_REPORT_DIR}'
                }
            }
        }

        // ====================================================================
        // STAGE 5: ARCHIVE REPORTS AND ARTIFACTS
        // ====================================================================
        // This stage archives test results and reports for later review
        stage('Archive Reports') {
            steps {
                script {
                    // Print a message indicating the start of archiving
                    echo "=========================================="
                    echo "STAGE: Archiving test reports and artifacts"
                    echo "=========================================="
                    
                    // Archive the Allure test results for Allure report plugin
                    // This allows Jenkins to track test trends over time
                    archiveArtifacts(
                        artifacts: 'allure-results/**/*',
                        allowEmptyArchive: true
                    )
                    
                    // Archive the generated Allure HTML report
                    // This makes the report accessible from the Jenkins build page
                    archiveArtifacts(
                        artifacts: 'allure-report/**/*',
                        allowEmptyArchive: true
                    )
                    
                    // Archive any Playwright test results/reports
                    archiveArtifacts(
                        artifacts: 'test-results/**/*',
                        allowEmptyArchive: true
                    )
                    
                    // Archive Playwright HTML report if it exists
                    archiveArtifacts(
                        artifacts: 'playwright-report/**/*',
                        allowEmptyArchive: true
                    )
                    
                    // Archive any screenshots taken during test execution
                    archiveArtifacts(
                        artifacts: 'screenshot/**/*',
                        allowEmptyArchive: true
                    )
                    
                    echo "All reports and artifacts have been archived"
                }
            }
        }

    }

    // ========================================================================
    // POST-BUILD ACTIONS
    // ========================================================================
    // Define actions to perform after all stages complete
    post {
        // ====================================================================
        // ALWAYS SECTION
        // ====================================================================
        // These steps run regardless of whether the build succeeded or failed
        always {
            // Print a message indicating post-build actions are starting
            echo "=========================================="
            echo "Running post-build actions"
            echo "=========================================="
            
            // Clean workspace to save disk space (optional)
            // Uncomment the line below if you want to clean up after each build
            // cleanWs()
        }

        // ====================================================================
        // SUCCESS SECTION
        // ====================================================================
        // These steps only run if all stages completed successfully
        success {
            // Print success message
            echo "=========================================="
            echo "BUILD SUCCESSFUL!"
            echo "=========================================="
            
            // Print location where reports can be found
            echo "Test reports are available at: ${BUILD_URL}artifact/allure-report/index.html"
            
            // Optional: Send notification (email, Slack, etc.)
            // Example for email notification:
            // mail(
            //     to: 'team@example.com',
            //     subject: "Build Successful: ${JOB_NAME} #${BUILD_NUMBER}",
            //     body: "All tests passed successfully!\n\nBuild URL: ${BUILD_URL}"
            // )
        }

        // ====================================================================
        // FAILURE SECTION
        // ====================================================================
        // These steps only run if any stage failed
        failure {
            // Print failure message
            echo "=========================================="
            echo "BUILD FAILED!"
            echo "=========================================="
            
            // Print location where reports can be found for debugging
            echo "Test reports are available at: ${BUILD_URL}artifact/allure-report/index.html"
            
            // Optional: Send notification about the failure
            // Example for email notification:
            // mail(
            //     to: 'team@example.com',
            //     subject: "Build Failed: ${JOB_NAME} #${BUILD_NUMBER}",
            //     body: "Some tests failed. Please check the build.\n\nBuild URL: ${BUILD_URL}\n\nReports: ${BUILD_URL}artifact/allure-report/index.html"
            // )
        }

        // ====================================================================
        // UNSTABLE SECTION
        // ====================================================================
        // These steps run if the build is marked as unstable (e.g., some tests failed but build continued)
        unstable {
            // Print unstable status message
            echo "=========================================="
            echo "BUILD UNSTABLE - Some tests may have failed"
            echo "=========================================="
        }

        // ====================================================================
        // CLEANUP SECTION
        // ====================================================================
        // Additional cleanup or logging can be added here
        cleanup {
            // Print completion message
            echo "=========================================="
            echo "Pipeline execution completed"
            echo "=========================================="
        }
    }
}

// ============================================================================
// ADDITIONAL NOTES AND CONFIGURATION INSTRUCTIONS:
// ============================================================================
//
// 1. JENKINS SETUP REQUIREMENTS:
//    - Jenkins server must have Node.js and npm installed
//    - Install the "GitHub Integration" plugin for GitHub push triggers
//    - Install "Allure" plugin for report visualization (optional but recommended)
//    - Install "Pipeline" plugin for declarative pipeline support
//
// 2. GITHUB CONFIGURATION:
//    - Add a webhook in GitHub repository settings pointing to:
//      http://jenkins-server/github-webhook/
//    - This webhook will automatically trigger the pipeline on push to main branch
//
// 3. JENKINS JOB CONFIGURATION:
//    - Create a new "Declarative Pipeline" job in Jenkins
//    - Point the pipeline script to this Jenkinsfile
//    - Repository: https://github.com/GvvPrasad/ecommerce_shopfy.git
//    - Branch: main
//
// 4. CREDENTIALS SETUP (if private repository):
//    - Add GitHub credentials in Jenkins Credentials store
//    - Use SSH or Personal Access Token for authentication
//
// 5. ENVIRONMENT-SPECIFIC TESTING:
//    - Change TEST_ENV variable to 'prod' to run production tests
//    - Or modify to accept build parameters
//
// 6. NOTIFICATIONS (Optional):
//    - Uncomment email notifications in the 'success' and 'failure' sections
//    - Configure Jenkins email settings
//    - For Slack notifications, install Slack plugin and add post actions
//
// 7. REPORT ARTIFACTS:
//    - Allure reports will be available at: ${BUILD_URL}artifact/allure-report/index.html
//    - Playwright reports at: ${BUILD_URL}artifact/playwright-report/index.html
//
// 8. TROUBLESHOOTING:
//    - Check Jenkins logs for pipeline execution details
//    - Verify Node.js version compatibility with project requirements
//    - Ensure Playwright browsers are installed on the Jenkins agent
//
// ============================================================================
