# Standalone Demo App

This is an [Appium](https://appium.io/docs/en/latest/) for testing the standalone React Native Demo app. The project uses [WebdriverIO](https://webdriver.io/) as the [Appium Client](https://appium.io/docs/en/2.9/ecosystem/clients/).

This demonstrates end-to-end (E2) tests simulating workflows for the application.

## Getting Started

**Note**: Make sure you have [Node JS](https://nodejs.org/en) installed on your client before beginning.

### Step 1: Download the repository

First you will need to down load this repository from GitHub.

### Step 2: Install packages

To install the package dependencies, fun the following command from the project _root_:

```bash
# using npm
npm install
```

### Step 3: Update the capabilities available on your client

There are three configuration files in the _config_ directory:

- one configuration file is shared across the different platforms: `wdio.shared.conf.ts`
- one configuration file is specific for Android devices: `wdio.android.conf.ts`
- one configuration file is specific for iOS devices: `wdio.ios.conf.ts`

Common capability variables and settings can be found in the [Appium](https://appium.io/docs/en/latest/guides/caps/) documentation. Additional documentation can be found

### Step 4: Update the app configuration path

The `app` directory is where the .apk and .ipa files are stored for testing. Regardless of running an actual published app or running the app as it is being developed, the application path in the respective configuration file will need to be updated for your local client.

If you are testing without publishing the app, then you will need to make sure the application is running. Use the following command in the DemoApp root directory to start the application:

```bash
npm start
```

### Step 5: Simulators and Emulators

Make sure you have at least one simulator and one emulator installed on your client. Once they have been installed, then update the respective configuration file to update the device information.

### Step 6: Running the tests

To test using the Android configuration:

```bash
npm run test:android
```

To test using the iOS configuration:

```bash
npm run test:ios
```

## Project Overview

Below is an overview of the project structure.

```none

├── e2e
│   ├── app
│   │   ├── android
│   │   ├── ios
│   ├── config
│   │   ├── wdio.android.conf.ts
│   │   ├── wdio.ios.conf.ts
│   │   ├── wdio.shared.conf.ts
│   ├── data
│   ├── debug
│   ├── node_modules
│   ├── snapshots
│   ├── src
│   │   ├── decorators
│   │   │   ├── property
│   │   ├── page-object-models
│   │   ├── utils
│   │   │   ├── ios
│   │   │   ├── wrappers
│   │   ├── constants.ts
│   ├── tests
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
└── .gitignore
```

### Decorators

The project uses [TypeScript Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html) for generating the appropriate platform element selector. For example, a `testID` may be used as a resource-id on Android while it is used as an accessibility id on iOS. Wrapping the testID string in the appropriate decorator provides the expected locator syntax at runtime.

In the example code below, the `contact-tab` string will be transformed into an accessibility id or resource-id selector depending on the device on which the tests are running.

```js
@IosAccessibilityId
@AndroidResourceId
private static contactsTabSelector = 'contact-tab';
```
