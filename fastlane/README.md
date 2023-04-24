fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew install fastlane`

# Available Actions
### stubs
```
fastlane stubs
```
Prepare configuration stubs
### node
```
fastlane node
```
Initialise node modules
### pods
```
fastlane pods
```
Initialise cocoapods
### jest
```
fastlane jest
```
Run unit tests
### cleanup
```
fastlane cleanup
```
Cleanup artifacts from previous builds
### lint
```
fastlane lint
```
Run linter
### build
```
fastlane build
```
Run the full build
### certificates
```
fastlane certificates
```
Prepare iOS certificates
### app_store
```
fastlane app_store
```
Build application for AppStore
### ad_hoc
```
fastlane ad_hoc
```
Build application for adhoc testing
### android_app_store
```
fastlane android_app_store
```
Build application for PlayStore
### android_ad_hoc
```
fastlane android_ad_hoc
```
Build application for AdHoc testing

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
