pipeline {
  agent any
  stages {
    stage('Verify') {
      steps {
        sh '''npm ci && npm run build'''
      }
    }
  }
}