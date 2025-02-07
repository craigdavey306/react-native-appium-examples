import { AccessibilityId } from '../accessibility-id-decorator';

/**
 * Wrapper decorator that transform's a class property into an Accessibility ID selector.
 * Does not perform any decoration for a property if not running on an iOS device.
 *
 * @param target {Object} Function or class instance representing the class
 * @param propertyKey {string} String representing the property name
 *
 * ## Example
 * ```js
 * class Example {
 *   @IosAccessibilityId
 *   static fieldLocator = 'Example';
 * }
 *
 * Example.fieldLocator will be transformed to "~Example" when used.
 *
 * ```
 *
 * References:
 * - https://www.typescriptlang.org/docs/handbook/decorators.html
 * - https://webdriver.io/docs/selectors#accessibility-id
 */
export function IosAccessibilityId(target: Object, propertyKey: PropertyKey) {
  if (!driver.isIOS) {
    return;
  }

  AccessibilityId(target, propertyKey);
}
