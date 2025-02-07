// Configuration overrides for local Appium tests on Android.

import path from 'node:path';
import { config as baseConfig } from './wdio.shared.conf';

const appName = 'app-debug.apk';
const localDirectory = process.env.APP_PATH_ANDROID ?? '../app/android';

const androidConfig: WebdriverIO.Config = {
  capabilities: [
    {
      platformName: 'Android',
      'appium:deviceName': 'Nexus 5X',
      'appium:platformVersion': '13.0',
      'appium:automationName': 'UiAutomator2',
      'appium:app': path.join(localDirectory, appName),
      'appium:maxTypingFrequency': 30,
      // Language setting for the device.
      'appium:language': 'en',
    },
  ],
  port: 4723,
  // before: (caps, specs, driver) => {
  //   driver.updateSettings({ 'appium:disableIdLocatorAutocompletion': true });
  // },
};

export const config: WebdriverIO.Config = Object.assign(
  baseConfig,
  androidConfig
);
