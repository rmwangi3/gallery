pipeline {
    agent any

    tools {
        nodejs "node18"  // NodeJS installed in Jenkins
    }

    environment {
        RENDER_DEPLOY_HOOK = credentials('render-deploy-hook') // Jenkins secret
    }

    triggers {
        pollSCM('H/1 * * * *') // Check GitHub every minute
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

        // ❗ Removed server start; Jenkins should NOT run node server.js
        stage('Build') {
            steps {
                sh 'echo "Build step completed (no server run needed)."'
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
