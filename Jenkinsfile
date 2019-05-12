pipeline {
  agent any
  stages {
    stage('Install') {
      steps {
        nodejs('main') {
          sh 'npm ci'
        }

      }
    }
    stage('Test') {
      steps {
        nodejs('main') {
          sh 'npm run test'
        }

      }
    }
    stage('Build') {
      steps {
        nodejs('main') {
          sh 'npm run build'
        }

      }
    }
    stage('Archive') {
      steps {
        archiveArtifacts 'dist/'
      }
    }
    stage('Deploy') {
      steps {
        withCredentials([
          string(credentialsId: 'bf835212-1b13-4bfc-8452-c336e4480a42', variable: 'CENTCOM_DEPLOY_UI_ACCESS_KEY'),
          string(credentialsId: '0a2698f3-50e3-43ac-afd4-dca8b50d9350', variable: 'CENTCOM_DEPLOY_UI_SECRET_KEY'),
        ]) {
          nodejs('main') {
            sh 'node scripts/deploy'
          }
        }
      }
    }
  }
}