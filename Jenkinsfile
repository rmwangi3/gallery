pipeline {
    agent any

    tools {
        nodejs "node18"
    }

    environment {
        RENDER_DEPLOY_HOOK = credentials('render-deploy-hook')
        SLACK_TOKEN = credentials('slack-token')        // <-- Your Jenkins Slack bot token
        SLACK_CHANNEL = '#jenkins-notifications'        // <-- Use Slack channel NAME, not ID
    }

    triggers {
        pollSCM('H/1 * * * *')
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
                sh 'echo "Build step completed."'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }

            post {

                failure {
                    emailext(
                        to: 'mwangirichmond254@gmail.com',
                        subject: "Tests FAILED — ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        body: """
Hello Richmond,

The automated tests for your **Gallery Project** have **FAILED**.

Check the logs here:
${env.BUILD_URL}
"""
                    )

                    slackSend(
                        channel: SLACK_CHANNEL,
                        tokenCredentialId: 'slack-token',
                        message: "*Tests FAILED* — ${env.JOB_NAME} #${env.BUILD_NUMBER}\n${env.BUILD_URL}"
                    )
                }

                success {
                    emailext(
                        to: 'mwangirichmond254@gmail.com',
                        subject: "Tests PASSED — ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        body: """
Hello Richmond,

Great news! All tests for your **Gallery Project** PASSED.

Build Summary:
${env.BUILD_URL}
"""
                    )

                    slackSend(
                        channel: SLACK_CHANNEL,
                        tokenCredentialId: 'slack-token',
                        message: "*Tests PASSED* — ${env.JOB_NAME} #${env.BUILD_NUMBER}\n${env.BUILD_URL}"
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
                tokenCredentialId: 'slack-token',
                message: "*Deployment triggered to Render* — ${env.JOB_NAME} #${env.BUILD_NUMBER}"
            )
        }

        failure {
            echo 'Pipeline failed!'

            slackSend(
                channel: SLACK_CHANNEL,
                tokenCredentialId: 'slack-token',
                message: "*Pipeline FAILED* — ${env.JOB_NAME} #${env.BUILD_NUMBER}"
            )
        }
    }
}
