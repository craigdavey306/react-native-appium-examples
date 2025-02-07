import { PredicateStringComparators, XCUIElements } from '../../../utils/ios';

type IosPredicateProps = {
  elementType: XCUIElements;
  predicateComparator: PredicateStringComparators;
  predicateIdentifier: 'name' | 'label' | 'value';
  visibleElementsOnly?: boolean;
};

export function IosPredicateString({
  elementType,
  predicateComparator,
  predicateIdentifier,
  visibleElementsOnly = true,
}: IosPredicateProps) {
  return function IosPredicateStringHelper(
    target: Object,
    propertyKey: PropertyKey
  ) {
    if (!driver.isIOS) {
      return;
    }

    const predicate = {
      elementType,
      predicateComparator,
      predicateIdentifier,
      visibleElementsOnly,
    };

    const attributes: PropertyDescriptor =
      typeof target === 'function'
        ? buildStaticPropertyDescriptor(target, propertyKey, predicate)
        : buildInstancePropertyDescriptor(target, propertyKey, predicate);

    Object.defineProperty(target, propertyKey, {
      ...attributes,
    });
  };
}

function buildPredicateString({
  elementType,
  predicateComparator,
  predicateIdentifier,
  value,
  visibleElementsOnly,
}: IosPredicateProps & { value: string }) {
  const selectorType = '-ios predicate string';
  const selector = `${selectorType}:type = '${elementType}' && ${predicateIdentifier} ${predicateComparator} '${value}' AND visible == ${
    visibleElementsOnly ? 1 : 0
  }`;

  return selector;
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
  propertyKey: PropertyKey,
  predicate: IosPredicateProps
): PropertyDescriptor {
  const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {};

  return {
    get() {
      return buildPredicateString({ ...predicate, value: descriptor.value });
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
  propertyKey: PropertyKey,
  predicate: IosPredicateProps
): PropertyDescriptor {
  const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {};

  return {
    get() {
      return descriptor.value;
    },
    set(value: unknown) {
      descriptor.value = buildPredicateString({
        ...predicate,
        value: `${value}`,
      });
    },
  };
}
