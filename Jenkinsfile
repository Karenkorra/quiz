pipeline {
    agent any

    stages {

        stage('Build') {
            steps {
                sh './build.sh'
            }
        }

        stage('Test') {
            steps {
                sh './test.sh'
            }
        }
    }

    post {
        success {
            echo "🎉 Pipeline terminé avec succès !"
        }
        failure {
            echo "❌ Pipeline échoué !"
        }
    }
}
