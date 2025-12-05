pipeline {
    agent any

    tools {
        nodejs "node18"  // Name of NodeJS installation in Jenkins
    }

    environment {
        RENDER_DEPLOY_HOOK = credentials('render-deploy-hook') // Jenkins secret
    }

    triggers {
        pollSCM('H/1 * * * *') // Check GitHub every minute (adjust as needed)
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

        stage('Build/Start Server') {
            steps {
                sh 'node server'  // Or `npm start` if you have start script
            }
        }

        stage('Deploy to Render') {
            steps {
                sh "curl -X POST ${RENDER_DEPLOY_HOOK}" // Trigger Render deploy hook
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded! MILESTONE 2 should now be live.'
        }
        failure {
            echo 'Pipeline failed. Check logs.'
        }
    }
}