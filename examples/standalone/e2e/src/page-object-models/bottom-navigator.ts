import { AndroidResourceId, IosAccessibilityId } from '../decorators/property';

/**
 * Class representing the bottom navigation tabs.
 */
export class BottomNavigator {
  /** Selector text for the contacts tab. */
  @IosAccessibilityId
  @AndroidResourceId
  private static contactsTabSelector = 'contact-tab';

  /** Selector text for the todos tab. */
  @IosAccessibilityId
  @AndroidResourceId
  private static todosTabSelector = 'todos-tab';

  // --------- getters ---------

  /**
   * Contact tab in the bottom navigation.
   */
  get contactsTabElement() {
    return $(BottomNavigator.contactsTabSelector);
  }

  /**
   * To Dos tab in the bottom navigation.
   */
  get todosTabElement() {
    return $(BottomNavigator.todosTabSelector);
  }

  // --------- methods ---------

  /**
   * Schedules a command to press the Contacts tab in the bottom navigation.
   */
  async pressContactsTab(): Promise<void> {
    await this.contactsTabElement.click();
  }

  /**
   * Schedules a command to press the To Dos tab in the bottom navigation.
   */
  async pressTodosTab(): Promise<void> {
    await this.todosTabElement.click();
  }
}
