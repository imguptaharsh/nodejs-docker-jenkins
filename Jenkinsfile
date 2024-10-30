pipeline {
  
    agent any
    environment {
        IMAGE_NAME = 'my-nodejs-app'
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
                    sh "docker run -d --name ${IMAGE_NAME} -p 5555:5555 ${IMAGE_NAME}"
                    // Wait for the container to start
                    sleep 10
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
                sh "docker logs ${IMAGE_NAME}" 
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
