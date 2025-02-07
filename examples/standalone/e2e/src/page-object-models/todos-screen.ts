import { AndroidResourceId, IosAccessibilityId } from '../decorators/property';
import { BottomNavigator } from './bottom-navigator';

class TodoHeader {
  /** Test ID used for the logout icon button. */
  @IosAccessibilityId
  @AndroidResourceId
  private static logoutButtonSelector = 'logout-btn';

  /** Text appearing in the header when on the Contacts screen. */
  @IosAccessibilityId
  @AndroidResourceId
  private static titleSelector = 'todos-container-title-text';

  // --------- getters ---------

  /**
   * Logout Icon Button element.
   */
  get logoutButtonElement() {
    return $(TodoHeader.logoutButtonSelector);
  }

  /**
   * Contact screen title element.
   */
  get titleElement() {
    return $(TodoHeader.titleSelector);
  }

  // --------- methods ---------

  /**
   * Schedules a command to press the logout icon button.
   */
  async pressLogout(): Promise<void> {
    await this.logoutButtonElement.click();
  }
}

class TodoScreen {
  /** Stores an instance of the TodoHeader object class allowing interactions with the header component. */
  public readonly header: TodoHeader;

  /** Stores an instance of the BottomNavigator object class allowing interaction with the bottom tabs. */
  public readonly navigationTabs: BottomNavigator;

  constructor(header = new TodoHeader(), tabs = new BottomNavigator()) {
    this.header = header;
    this.navigationTabs = tabs;
  }

  // --------- getters ---------

  // --------- methods ---------
}

export const todoScreen = new TodoScreen();
