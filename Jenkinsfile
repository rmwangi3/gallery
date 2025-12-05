pipeline {
    agent any

   triggers {
    pollSCM('H/1 * * * *')
}

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
    }
}
