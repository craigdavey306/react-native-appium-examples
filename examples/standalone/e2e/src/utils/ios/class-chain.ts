import { XCUIElements } from './ios-enums';

/**
 * Creates an iOS class chain selector.
 *
 * This is an example of a function that could be created instead of using decorators.
 * @param param0
 * @returns
 */
export function createIosClassChainSelector({
  elementType,
  selectorString,
}: {
  elementType: XCUIElements;
  selectorString: string;
}) {
  return `-ios class chain:**/${elementType}[${selectorString}]`;
}
