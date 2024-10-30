pipeline {
    agent any
    environment {
        IMAGE_NAME = 'my-nodejs-app'
        PATH = "/opt/homebrew/bin:${env.PATH}" // Ensure Docker is in PATH
    }
    stages {
        stage('Cleanup') {
            steps {
                cleanWs()
            }
        }
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/imguptaharsh/nodejs-docker-jenkins.git'
            }
        }
        stage('Diagnose Environment') {
            steps {
                sh '''
                    echo "Current PATH: $PATH"
                    if command -v docker >/dev/null 2>&1; then
                        echo "Docker is available: $(docker --version)"
                    else
                        echo "Docker is not installed or not in PATH."
                        exit 1
                    fi
                '''
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    try {
                        sh "docker build -t ${IMAGE_NAME} ."
                    } catch (Exception e) {
                        echo "Docker build failed: ${e.getMessage()}"
                        error("Stopping pipeline due to Docker build failure.")
                    }
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    try {
                        sh "docker run -d --name ${IMAGE_NAME} -p 5555:5555 ${IMAGE_NAME}"
                        // Wait for the container to start
                        sleep 10
                    } catch (Exception e) {
                        echo "Failed to run Docker container: ${e.getMessage()}"
                        error("Stopping pipeline due to Docker run failure.")
                    }
                }
            }
        }
        stage('Test Application') {
            steps {
                script {
                    sh '''
                    if ! curl -I http://localhost:5555 | grep "200 OK"; then
                        echo "Application not responding"
                        exit 1
                    fi
                    '''
                }
            }
        }
    }
    post {
        always {
            script {
                try {
                    sh "docker logs ${IMAGE_NAME}"
                } catch (Exception e) {
                    echo "Failed to retrieve Docker logs: ${e.getMessage()}"
                }
                sh "docker stop ${IMAGE_NAME} || true"
                sh "docker rm ${IMAGE_NAME} || true"
                sh "docker rmi ${IMAGE_NAME} || true"
            }
        }
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed. Check the logs for more details."
        }
    }
}
