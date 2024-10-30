pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'docker build -t my-nodejs-app .'
      }
    }
    stage('Test') {
      steps {
        sh 'docker run my-nodejs-app npm test'
      }
    }
    stage('Deploy') {
      steps {
        echo 'Deploy steps go here'
      }
    }
  }
}
