pipeline {
    agent any
    environment {
        PATH = "/opt/homebrew/bin:/usr/local/bin:$PATH" // Ensure Docker is in PATH
        IMAGE_NAME = "my-nodejs-app"
        IMAGE_TAG = "latest"
        TEST_IMAGE_NAME = "my-nodejs-app-test"
        TEST_IMAGE_TAG = "test-latest"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Test Image') {
            steps {
                sh 'docker build -f Dockerfile.test -t $TEST_IMAGE_NAME:$TEST_IMAGE_TAG .'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'docker run --rm $TEST_IMAGE_NAME:$TEST_IMAGE_TAG'
            }
        }
        stage('Build Production Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
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
            sh 'docker rmi $TEST_IMAGE_NAME:$TEST_IMAGE_TAG || true'
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
