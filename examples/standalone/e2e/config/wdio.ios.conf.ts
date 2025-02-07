// Configuration overrides for local Appium tests on iOS.

import path from 'node:path';
import { config as baseConfig } from './wdio.shared.conf';

const appName = 'DemoApp.app';
const localDirectory = process.env.APP_PATH_IOS ?? '../app/ios';

const iosConfig: WebdriverIO.Config = {
  capabilities: [
    {
      platformName: 'iOS',
      'appium:deviceName': 'iPhone 15',
      'appium:automationName': 'XCUITest',
      'appium:app': path.join(localDirectory, appName),
      'appium:maxTypingFrequency': 30,
      // Language setting for the device.
      'appium:language': 'en',
    },
  ],
  port: 4723,
};

export const config: WebdriverIO.Config = Object.assign(baseConfig, iosConfig);
