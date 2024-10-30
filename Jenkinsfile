pipeline {
    agent any
    environment {
        PATH = "/opt/homebrew/bin:/usr/local/bin:$PATH" // Updated PATH
        IMAGE_NAME = "my-nodejs-app"
        IMAGE_TAG = "latest"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
            }
        }
        stage('Test') {
            steps {
                sh 'docker run --rm $IMAGE_NAME:$IMAGE_TAG npm test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploy steps go here'
                // Example: Push to Docker Hub or another registry
                // sh 'docker push $IMAGE_NAME:$IMAGE_TAG'
            }
        }
    }
    post {
        always {
            // Clean up Docker images to save space
            sh 'docker rmi $IMAGE_NAME:$IMAGE_TAG || true'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
