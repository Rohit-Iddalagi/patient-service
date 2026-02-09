pipeline {
  agent any
  environment {
    NODE_ENV = 'production'
    IMAGE_NAME = 'patient-service'
  }
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Install') { steps { sh 'npm ci' } }
    stage('Lint') { steps { sh 'npm run lint' } }
    stage('Test') { steps { sh 'npm test' } }
    stage('Build Docker') {
      steps {
        script {
          dockerImage = docker.build("${IMAGE_NAME}:${env.BUILD_NUMBER}")
        }
      }
    }
    stage('Push Docker') {
      steps {
        script {
          docker.withRegistry('', 'docker-hub-credentials') {
            dockerImage.push()
          }
        }
      }
    }
  }
  post {
    always { cleanWs() }
  }
}
