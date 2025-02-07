import { XCUIElements, PredicateStringComparators } from './ios-enums';

/**
 * Builds an iOS predicate string selector for finding elements.
 * For more information about the iOS selector, please see the following documentation link:
 *  https://webdriver.io/docs/selectors#ios-xcuitest-predicate-strings-and-class-chains
 *
 * This is an example of a function that could be created instead of using decorators.
 *
 * @param selectorString {string} String used for locating the
 * @param elementType
 * @param stringComparator
 * @param visibleElementsOnly
 * @returns
 */
export function createPredicateStringSelector({
  selectorString,
  elementType,
  stringComparator,
  predicateIdentifier,
  visibleElementsOnly = true,
}: {
  selectorString: string;
  elementType: XCUIElements;
  predicateIdentifier: 'name' | 'label' | 'value';
  stringComparator: PredicateStringComparators;
  visibleElementsOnly?: boolean;
}) {
  const selectorType = '-ios predicate string';
  const calculatedString = `type = '${elementType}' && ${predicateIdentifier} ${stringComparator} '${selectorString}' AND visible == ${
    visibleElementsOnly ? 1 : 0
  }`;

  return `${selectorType}:${calculatedString}`;
}

export const iosSelectAllStringSelector =
  '-ios predicate string:label == "Select All" AND name == "Select All" AND value == "Select All"';

export const iosCutStringSelector =
  '-ios predicate string:label == "Cut" AND name == "Cut" AND value == "Cut"';
