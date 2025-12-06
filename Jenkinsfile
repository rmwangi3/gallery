pipeline {
    agent any

    tools {
        nodejs "node18"      // NodeJS installed in Jenkins
    }

    environment {
        RENDER_DEPLOY_HOOK = credentials('render-deploy-hook') // Jenkins secret
    }

    // 🔥 PUSH TRIGGER (your request retained)
    triggers {
        pollSCM('H/1 * * * *')   // Poll GitHub every 1 minute for new commits
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'echo "Build step completed (no server run needed)."'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
            post {

                //  FAILURE EMAIL
                failure {
                    emailext(
                        to: 'richmond.mwangi1@student.moringaschool.com',
                        subject: "Jenkins Tests FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        body: """
Hello Richmond,

❗ The automated tests for your *Gallery Project* have **FAILED**.

You can review details and logs using the link below:
${env.BUILD_URL}

Best regards,  
Jenkins CI
                        """
                    )
                }

                //  SUCCESS EMAIL
                success {
                    emailext(
                        to: 'richmond.mwangi1@student.moringaschool.com',
                        subject: "Jenkins Tests PASSED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        body: """
Hello Richmond,

Good news! All automated tests for your *Gallery Project* have **PASSED successfully**.

You can view the build details here:
${env.BUILD_URL}

Best regards,  
Jenkins CI
                        """
                    )
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                sh "curl -X POST ${RENDER_DEPLOY_HOOK}"
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded! Render deployment triggered.'
        }
        failure {
            echo 'Pipeline failed. Check logs.'
        }
    }
}
