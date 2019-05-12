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
        build(job: 'centcom-ui-deploy', propagate: true, quietPeriod: 2, workspaceDir: '$WORKSPACE')
      }
    }
  }
}