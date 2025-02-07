import { iosSelectAllStringSelector, iosCutStringSelector } from '../ios';

/**
 * Schedules a command to clear the existing value of an input field by selecting and cutting the content.
 *
 * @param element
 * @returns Void is returned
 *
 * NOTE: the `setValue()` method works correctly in Android, but there have been a number of
 * reported issues where it does not work correctly on iOS. See the following for additional
 * information:
 *
 * https://github.com/appium/appium/issues/13288
 * https://github.com/appium/appium/issues/13289
 * https://github.com/appium/appium/issues/14426
 *
 *
 */
export async function clearValue(
  element: ChainablePromiseElement
): Promise<void> {
  if (!driver.isIOS) {
    await element.clearValue();
    return;
  }

  await element.click();
  await driver.waitUntil(async () => {
    return element.isEnabled();
  });

  // double clicking in the input field enables the 'Select' / 'Select All' option.
  await element.doubleClick();
  await driver.waitUntil(async () => {
    return await $(iosSelectAllStringSelector).isDisplayed();
  });

  // Click on the "Select All" option enables the 'Cut' / 'Copy' option.
  await $(iosSelectAllStringSelector).click();
  await driver.waitUntil(async () => {
    return await $(iosCutStringSelector).isDisplayed();
  });

  // Click on the "Cut" option
  await $(iosCutStringSelector).click();
}
