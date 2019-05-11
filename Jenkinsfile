pipeline {
  agent any
  stages {
    stage('Verify') {
      steps {
        nodejs 'main'
        sh '''npm ci
npm run build'''
      }
    }
  }
}