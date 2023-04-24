// This is a pipeline for building a Totara mobile application
def buildRef = "refs/heads/master"
def totaraMobileAppReferenceRepository = '/Users/jenkins/totara-mobile-app-reference'

pipeline {
  agent {
    label 'mac && mobile'
  }

  options {
    ansiColor('xterm')
  }

  environment {
    FASTLANE_HIDE_CHANGELOG = "1"
    SKIP_SLOW_FASTLANE_WARNING = "1"
    FASTLANE_SKIP_ACTION_SUMMARY = "1"
    RCT_NO_LAUNCH_PACKAGER = "1"
    LC_ALL = "en_US.UTF-8"
    LANG = "en_US.UTF-8"
  }

  parameters {
    // BitBucket API credentials

    credentials(
      name: 'BITBUCKET_CREDENTIALS',
      defaultValue: 'jenkins',
      credentialType: 'Username with password',
      description: 'A key to communicate with BitBucket'
    )

    // Apple iOS code signing credentials

    credentials(
      name: 'CREDENTIALS_APPLE_APPSTORE_KEY',
      defaultValue: 'mobile-app-apple-appstore-key',
      credentialType: 'Secret file',
      description: 'Apple AppStore API key file'
    )
    credentials(
      name: 'CREDENTIALS_MATCH_PASSWORD',
      defaultValue: 'mobile-app-match-password',
      credentialType: 'Secret text',
      description: 'Fastlane Match Password'
    )
    credentials(
      name: 'CREDENTIALS_KEYCHAIN_PASSWORD',
      defaultValue: 'mobile-app-mac-jenkins-password',
      credentialType: 'Secret text',
      description: 'Build user account password to unlock keychain'
    )

    // Android code signing credentials

    credentials(
      name: 'CREDENTIALS_ANDROID_KEYSTORE_PASSWORD',
      defaultValue: 'mobile-app-android-keystore-password',
      credentialType: 'Secret text',
      description: 'Android keystore password for Android code signing'
    )
    credentials(
      name: 'CREDENTIALS_ANDROID_KEYSTORE_KEY_PASSWORD',
      defaultValue: 'mobile-app-android-keystore-key-password',
      credentialType: 'Secret text',
      description: 'Android keystore key password for Android code signing'
    )
    credentials(
      name: 'CREDENTIALS_ANDROID_KEYSTORE_KEY_ALIAS',
      defaultValue: 'mobile-app-android-keystore-key-alias',
      credentialType: 'Secret text',
      description: 'Android keystore key alias for Android code signing'
    )
    credentials(
      name: 'CREDENTIALS_ANDROID_KEYSTORE',
      defaultValue: 'mobile-app-android-keystore',
      credentialType: 'Secret file',
      description: 'Android keystore file for Android code signing'
    )

    // Android firebase credentials

    credentials(
      name: 'CREDENTIALS_ANDROID_GOOGLE_SERVICES_JSON',
      defaultValue: 'mobile-app-android-google-services-json',
      credentialType: 'Secret file',
      description: 'Google Services json'
    )

    credentials(
      name: 'CREDENTIALS_ANDROID_GOOGLE_SERVICES_JSON_QA',
      defaultValue: 'mobile-app-android-google-services-json-qa',
      credentialType: 'Secret file',
      description: 'Google Services json for QA build'
    )

    // Apple firebase credentials

    credentials(
      name: 'CREDENTIALS_IOS_GOOGLE_SERVICES_PLIST',
      defaultValue: 'mobile-app-ios-google-services-plist',
      credentialType: 'Secret file',
      description: 'Google Services plist'
    )

    // Sentry credentials

    credentials(
      name: 'CREDENTIALS_SENTRY_PROJECT_URL',
      defaultValue: 'mobile-app-sentry-project-url',
      credentialType: 'Secret text',
      description: "This identifies the Sentry project to which the App will send technical logs.\nThis is used in the file src/totara/lib/config.local.ts."
    )
    credentials(
      name: 'CREDENTIALS_SENTRY_AUTH_TOKEN',
      defaultValue: 'mobile-app-sentry-auth-token',
      credentialType: 'Secret text',
      description: 'Sentry Authentication Token'
    )

    // Build environment

    string(
      name: 'ENV',
      defaultValue: 'qa',
      description: "Application environment:\n - Prod for production AppStore build\n - qa for AdHoc build to be directly uploaded to tester's device"
    )

    // BitBucket options to facilitate pull request builds

    string(
      name: 'PRID',
      defaultValue: null,
      description: 'BitBucket pull request ID or branch:$$Branch name$$ or tag:$$Tag name$$'
    )
    string(
      name: 'PULL_REQUEST_TO_SSH_CLONE_URL',
      defaultValue: 'ssh://git@git.totaralearning.com:7999/mob/totara-mobile-app.git',
      description: 'BitBucket target SSH clone URL (Git clone URL)'
    )
    string(
      name: 'USER',
      defaultValue: '',
      description: 'BitBucket pull request user name'
    )
    string(
      name: 'EMAIL',
      defaultValue: '',
      description: 'BitBucket pull request user email address'
    )

    // Performance options
    string(
      name: 'JEST_MAX_CONCURRENCY',
      defaultValue: "1",
      description: "Max concurrency for Jest execution.\nNote, the actual concurrency will be higher as tests themselves might run async operations"
    )

    // Email notifications
    string(
      name: 'EMAIL_NOTIFICATIONS_ENABLED',
      defaultValue: "yes",
      description: "Enable email notifications to be sent to notify failure of the build."
    )

    // Mattermost notifications
    string(
      name: 'MATTERMOST_NOTIFICATIONS_ENABLED',
      defaultValue: "yes",
      description: "Enable Mattermost notifications to be sent to notify success or failure of the build."
    )
    string(
      name: 'MATTERMOST_NOTIFICATION_CHANNEL',
      defaultValue: "mobile-project",
      description: "The channel to send non-pull request build notifications to."
    )
    string(
      name: 'MATTERMOST_NOTIFICATION_ICON',
      defaultValue: "https://tracker.totaralms.com/secure/projectavatar?pid=11700&avatarId=10208",
      description: "Mattermost notifications icon."
    )
  }

  stages {
    stage('Checkout code') {
      steps {
        cleanWs()

        // Let's figure out whether we need to checkout a pull request, a tag or a branch?
        script {
          switch(params.PRID) {
            case ~/^tag:.*$/:
              buildRef = "refs/tags/${params.PRID.substring(4)}";
              break;
            case ~/^branch:.*$/:
              buildRef = "refs/heads/${params.PRID.substring(7)}";
              break;
            case ~/^[0-9]+$/:
              buildRef = "refs/pull-requests/${params.PRID}/from";
              break;
          }

          // Let's figure out the checkout string
          def checkoutString = params.PULL_REQUEST_TO_SSH_CLONE_URL

          checkout changelog: false,
            poll: false,
            scm: [
              $class: 'GitSCM',
              branches: [[name: 'refs/remotes/origin/build']],
              doGenerateSubmoduleConfigurations: false,
              extensions: [
                [
                  $class: 'CloneOption',
                  honorRefspec: true,
                  noTags: false,
                  reference: totaraMobileAppReferenceRepository,
                  shallow: true
                ]
              ],
              submoduleCfg: [],
              userRemoteConfigs: [
                [
                  name: 'origin',
                  refspec: "+${buildRef}:refs/remotes/origin/build",
                  url: checkoutString
                ]
              ]
            ]

           notifyBitbucket()
         }
      }
    }

    stage('Initialize node things') {
      steps {
        withCredentials([
          string(credentialsId: params.CREDENTIALS_SENTRY_PROJECT_URL, variable: 'SENTRY_PROJECT_URL'),
        ]) {
          sh "fastlane node"
        }
      }
    }

    stage('Install cocoapods') {
      steps {
        sh "fastlane pods"
      }
    }

    stage('Run linter') {
      steps {
        script {
          try {
            sh "fastlane lint"
          } catch (err) {
              echo "Looks like linting failed... : ${err}"
          }

          if (fileExists('coverage/eslint.xml')) {
            recordIssues(tools: [esLint(pattern: 'coverage/*.xml')])
          } else {
            currentBuild.result = 'FAILURE'
          }
        }
      }
    }

    stage('Run jest') {
      steps {
        sh "fastlane jest"
      }
    }

    stage('Build iOS application') {
      steps {
        script {
          buildType = (params.ENV ==~ /(?i)qa/) ? 'ad_hoc' : 'app_store'
        }
        withCredentials([
          file(credentialsId: params.CREDENTIALS_IOS_GOOGLE_SERVICES_PLIST, variable: 'IOS_GOOGLE_SERVICES_PLIST'),
          file(credentialsId: params.CREDENTIALS_APPLE_APPSTORE_KEY, variable: 'APPLE_APPSTORE_KEY_FIlE'),
          string(credentialsId: params.CREDENTIALS_MATCH_PASSWORD, variable: 'MATCH_PASSWORD'),
          string(credentialsId: params.CREDENTIALS_KEYCHAIN_PASSWORD, variable: 'KEYCHAIN_PASSWORD'),
          string(credentialsId: params.CREDENTIALS_SENTRY_AUTH_TOKEN, variable: 'SENTRY_AUTH_TOKEN'),
        ]) {
          sh "fastlane '${buildType}'"
        }
      }
    }

    stage('Build Android application') {
      steps {
        script {
          buildType = (params.ENV ==~ /(?i)qa/) ? 'android_ad_hoc' : 'android_app_store'

          credentials = [
            string(credentialsId: params.CREDENTIALS_SENTRY_AUTH_TOKEN, variable: 'SENTRY_AUTH_TOKEN'),
          ]

          switch (buildType) {
            case 'android_app_store':
              credentials.addAll([
                file(credentialsId: params.CREDENTIALS_ANDROID_GOOGLE_SERVICES_JSON, variable: 'ANDROID_GOOGLE_SERVICES_JSON'),
                file(credentialsId: params.CREDENTIALS_ANDROID_KEYSTORE, variable: 'ANDROID_KEYSTORE_FILE'),
                string(credentialsId: params.CREDENTIALS_ANDROID_KEYSTORE_PASSWORD, variable: 'ANDROID_KEYSTORE_PASSWORD'),
                string(credentialsId: params.CREDENTIALS_ANDROID_KEYSTORE_KEY_PASSWORD, variable: 'ANDROID_KEYSTORE_KEY_PASSWORD'),
                string(credentialsId: params.CREDENTIALS_ANDROID_KEYSTORE_KEY_ALIAS, variable: 'ANDROID_KEYSTORE_KEY_ALIAS'),
              ])
              break
            case 'android_ad_hoc':
              credentials.addAll([
                file(credentialsId: params.CREDENTIALS_ANDROID_GOOGLE_SERVICES_JSON_QA, variable: 'ANDROID_GOOGLE_SERVICES_JSON'),
              ])
          }
        }

        withCredentials(credentials) {
          sh "fastlane '${buildType}'"
        }
      }
    }
  }

  post {
    success {
      archiveArtifacts artifacts: 'build/*', excludes: 'build/*.dSYM.zip'
      script {
        currentBuild.result = 'SUCCESS'
      }
    }
    always {
      junit(
        testResults: 'junit.xml',
        allowEmptyResults: true,
      )
      script {
        def buildUserId
        def buildUserEmail

        wrap([$class: 'BuildUser']) {
          buildUserId = env.BUILD_USER_ID
          buildUserEmail = env.BUILD_USER_EMAIL
        }

        notifyBitbucket()

        // Notification time

        // Let's determine build status
        buildStatus = currentBuild.result == "SUCCESS"

        // Let's see whether we run a PR build
        isPrBuild = params.PRID ==~ /^[0-9]+$/

        // Let's check whether we need to notify Mattermost of the result of the build
        if (params.MATTERMOST_NOTIFICATIONS_ENABLED ==~ /(?i)yes/) {
          /*
            Notifications logic here:
            We will notify a user directly regardless of the success of the build if it is a pull request build.
            If it is a tag build or a branch build we will notify the channel instead and only if the build is failed
          */

          channel = [params.USER, buildUserId].findResult({
            it?.trim() ? it : null
          })

          // We will prepend user notification with the @ since it would be a personal message, rather than a channel
          if (channel?.trim() && !(channel ==~ /^@.*$/)) {
            channel = '@' + channel
          }

          if (!channel?.trim() || !isPrBuild) {
            channel = params.MATTERMOST_NOTIFICATION_CHANNEL
          }

          // We are notifying in case if it a pull request build or unsuccessful tag\branch build
          if (isPrBuild || !buildStatus) {
            if (buildStatus) {
              mattermostSend(
                channel: channel,
                color: 'good',
                icon: params.MATTERMOST_NOTIFICATION_ICON,
                message: "📱 **[${params.ENV} Build succeeded](${env.BUILD_URL})** 🤓\n\n[Build artifacts](${env.BUILD_URL}artifact/build)\n\nPR or branch: ${params.PRID}"
              )
            } else {
              mattermostSend(
                channel: channel,
                color: 'danger',
                icon: params.MATTERMOST_NOTIFICATION_ICON,
                message: "📱 **[${params.ENV} Build failed](${env.BUILD_URL})** 🤕\n\n[Browse full log](${env.BUILD_URL}consoleText)\n\nPR or branch: ${params.PRID}"
              )
            }
          }
        }

        // Let's check whether we need to notify people by email of the result of the build
        if (params.EMAIL_NOTIFICATIONS_ENABLED ==~ /(?i)yes/ && !buildStatus) {
          // Let's figure out email address.
          // If User email is not provided, let's attempt to figure it out from Jenkins signed in user.
          email = [params.EMAIL, buildUserEmail].findResult({
            it?.trim() ? it : null
          })

          if (email?.trim()) {
            emailext(
              to: email,
              attachLog: true,
              body: "Please go to ${env.BUILD_URL}consoleText for more details.",
              subject: "Mobile pull request '${params.PRID}' build failed!"
            )
          }
        }
      }
    }
  }
}
