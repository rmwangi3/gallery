pipeline {
    agent any

    tools {
        nodejs "node18"      // NodeJS installation name in Jenkins
    }

    environment {
        RENDER_DEPLOY_HOOK = credentials('render-deploy-hook') // Jenkins secret
        SLACK_CHANNEL = 'C075K9TXLK9'      // <-- Replace with your real Slack Channel ID
    }

    // KEEP PUSH TRIGGER
    triggers {
        pollSCM('H/1 * * * *')   // Poll GitHub every 1 minute
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

                // FAILURE EMAIL + SLACK
                failure {
                    emailext(
                        to: 'mwangirichmond254@gmail.com',
                        subject: "Jenkins Tests FAILED — ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        body: """
Hello Richmond,

The automated tests for your **Gallery Project** have **FAILED**.

Please review the detailed logs here:
${env.BUILD_URL}

Best regards,  
Jenkins CI
                        """
                    )

                    slackSend(
                        channel: SLACK_CHANNEL,
                        message: "*Tests FAILED!* — ${env.JOB_NAME} #${env.BUILD_NUMBER}\n🔗 Logs: ${env.BUILD_URL}"
                    )
                }

                // SUCCESS EMAIL + SLACK
                success {
                    emailext(
                        to: 'mwangirichmond254@gmail.com',
                        subject: "Jenkins Tests PASSED — ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        body: """
Hello Richmond,

Great news!! All automated tests for your **Gallery Project** have **PASSED successfully**.

You can view the build summary here:
${env.BUILD_URL}

Best regards,  
Jenkins CI
                        """
                    )

                    slackSend(
                        channel: SLACK_CHANNEL,
                        message: "*Tests PASSED!* — ${env.JOB_NAME} #${env.BUILD_NUMBER}\n🔗 Build: ${env.BUILD_URL}"
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
            slackSend(
                channel: SLACK_CHANNEL,
                message: "*Deployment Triggered to Render* — ${env.JOB_NAME} #${env.BUILD_NUMBER}"
            )
        }
        failure {
            echo 'Pipeline failed. Check logs.'
            slackSend(
                channel: SLACK_CHANNEL,
                message: "*Pipeline FAILED!* — ${env.JOB_NAME} #${env.BUILD_NUMBER}"
            )
        }
    }
}
