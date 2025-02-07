/**
 * Decorator that transform's a class property into an Accessibility ID selector.
 *
 *
 * @param target {Object} Function or class instance representing the class
 * @param propertyKey {string} String representing the property name
 *
 * ## Example
 * ```js
 * class Example {
 *   @AccessibilityId
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
export function AccessibilityId(target: Object, propertyKey: PropertyKey) {
  const attributes: PropertyDescriptor =
    typeof target === 'function'
      ? buildStaticPropertyDescriptor(target, propertyKey)
      : buildInstancePropertyDescriptor(target, propertyKey);

  Object.defineProperty(target, propertyKey, {
    ...attributes,
  });
}

/**
 * Builds the property attributes for static properties. In particular,
 * the code overwrites the property's getter to return the accessibility ID
 * selector.
 *
 * @param target {Object} Function representing the class
 * @param propertyKey {string} String representing the property name
 * @returns {PropertyDescriptor} Returns a new property descriptor object
 *
 */
function buildStaticPropertyDescriptor(
  target: Object,
  propertyKey: PropertyKey
): PropertyDescriptor {
  const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {};

  return {
    get() {
      return `~${descriptor.value}`;
    },
  };
}

/**
 * Builds the property attributes for class instance properties. In particular,
 * the code overwrites the property's getter and setter functions. This changes the
 * value of the instance property.
 *
 * @param target {Object} Object representing the class instance
 * @param propertyKey {string} String representing the property name
 * @returns {PropertyDescriptor} Returns a new property descriptor object
 */
function buildInstancePropertyDescriptor(
  target: Object,
  propertyKey: PropertyKey
): PropertyDescriptor {
  const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {};

  return {
    get() {
      return descriptor.value;
    },
    set(value: unknown) {
      descriptor.value = value;
    },
  };
}
