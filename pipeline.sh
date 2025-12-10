pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Karenkorra/quiz.git'
            }
        }

        stage('Run Pipeline Script') {
            steps {
                sh './pipeline.sh'
            }
        }
    }

    post {
        success {
            echo "🎉 Pipeline finished successfully !"
        }
        failure {
            echo "❌ Pipeline failed !"
        }
    }
}
