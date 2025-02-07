import { isIos } from '../constants';

/**
 * Generates an object with either the accessibilityLabel or testID key.
 * iOS devices will use the testID, and Android uses the accessibilityLabel.
 *
 * The new architecture in iOS maps the `testID` to the `accessibilityIdentifier` of
 * a native component. Please see https://github.com/facebook/react-native/issues/43648
 * for more information.
 *
 * @param automationId {string} String of the automation identifier.
 * @returns
 */
export function getAutomationID(automationId: string):
  | {
      accessibilityLabel: string;
    }
  | {
      testID: string;
      accessibilityLabel: string;
    } {
  return isIos
    ? { testID: automationId, accessibilityLabel: automationId }
    : { accessibilityLabel: automationId };
}
