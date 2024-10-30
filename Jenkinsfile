pipeline {
    agent {
        docker {
            image 'node:14' // Use an official Node.js Docker image
            args '-u root:root' // Optional: run as root to avoid permission issues
        }
    }
    environment {
        NODE_ENV = 'development'
        APP_PORT = '5555'
        // Define any other environment variables here
    }
    stages {
        stage('Verify Node.js and npm Installation') {
            steps {
                echo 'Verifying Node and npm are accessible in Docker container...'
                sh 'node -v'
                sh 'npm -v'
            }
        }
        stage('Checkout') {
            steps {
                echo 'Checking out code using SSH...'
                // Ensure that the SSH credentials are correctly set up in Jenkins
                git url: 'git@github.com:imguptaharsh/nodejs-docker-jenkins.git',
                    credentialsId: 'github-ssh-key', // Replace with your actual credentials ID
                    branch: 'main'
            }
        }
        stage('Install dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                // Improved error handling: let the pipeline fail if tests fail
                sh 'npm test'
            }
        }
        stage('Build') {
            steps {
                echo "Building application for environment: ${env.NODE_ENV}"
                sh 'npm run build'
            }
        }
        stage('Package for Deployment') {
            steps {
                echo "Packaging application..."
                // Optionally, use a .dockerignore to exclude unnecessary files
                sh 'tar -czf app.tar.gz *'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image for tag: ${env.BUILD_ID}"
                    docker.build("my-node-app:${env.BUILD_ID}")
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerHubPassword', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    script {
                        echo 'Logging in to Docker Hub...'
                        sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                        echo "Tagging Docker image as $DOCKER_USERNAME/my-node-app:${env.BUILD_ID}"
                        sh "docker tag my-node-app:${env.BUILD_ID} $DOCKER_USERNAME/my-node-app:${env.BUILD_ID}"
                        echo 'Pushing Docker image to Docker Hub...'
                        sh "docker push $DOCKER_USERNAME/my-node-app:${env.BUILD_ID}"
                    }
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
        always {
            echo "Cleaning up workspace..."
            cleanWs() // Clean workspace after build completes
        }
    }
}
