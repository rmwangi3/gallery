pipeline {
    agent any

    tools {
        nodejs "node18"  // NodeJS installed in Jenkins
    }

    environment {
        RENDER_DEPLOY_HOOK = credentials('render-deploy-hook') // Jenkins secret
    }

    triggers {
        pollSCM('H/1 * * * *')  // 🚀 Real-time GitHub → Jenkins automation
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
        failure {
            emailext(
                to: 'richmond.mwangi1@student.moringaschool.com',
                subject: "Jenkins Tests FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                Hello Richmond,

                Your tests FAILED in Jenkins for the Gallery project.

                Check pipeline logs: ${env.BUILD_URL}
                """
            )
        }
        success {
            emailext(
                to: 'richmond.mwangi1@student.moringaschool.com',
                subject: "Jenkins Tests Passed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                Hello Richmond,

                All tests PASSED successfully in Jenkins for the Gallery project.

                Build details: ${env.BUILD_URL}
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
