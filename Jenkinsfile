pipeline {
    agent any
    environment {
        IMAGE_NAME = 'my-nodejs-app'
    }
    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/imguptaharsh/nodejs-docker-jenkins.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${IMAGE_NAME}")
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    bat "docker run -d --name ${IMAGE_NAME} -p 5555:5555 ${IMAGE_NAME}"
                    sleep(10)
                }
            }
        }
        stage('Test Application') {
            steps {
                script {
                    bat '''
                    curl -I http://localhost:5555 | find "200 OK" || (echo "Application not responding" && exit 1)
                    '''
                }
            }
        }
    }
    post {
        always {
            script {
                bat "docker logs ${IMAGE_NAME}" 
                bat "docker stop ${IMAGE_NAME} || true"
                bat "docker rm ${IMAGE_NAME} || true"
                bat "docker rmi ${IMAGE_NAME} || true"
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