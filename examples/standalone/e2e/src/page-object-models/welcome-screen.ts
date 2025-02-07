import { AndroidResourceId, IosAccessibilityId } from '../decorators/property';
import { BottomNavigator } from './bottom-navigator';

class WelcomeScreen {
  /** Text appearing for the start button. */
  @IosAccessibilityId
  @AndroidResourceId
  private static startButtonSelector = 'welcome-start-btn';

  /** Text appearing on the Welcome screen. */
  @IosAccessibilityId
  @AndroidResourceId
  private static titleSelector = 'welcome-text';

  public readonly navigationTabs: BottomNavigator;

  constructor(tabs: BottomNavigator = new BottomNavigator()) {
    this.navigationTabs = tabs;
  }

  // --------- getters ---------

  get startButtonElement() {
    return $(WelcomeScreen.startButtonSelector);
  }

  get screenTitleElement() {
    return $(WelcomeScreen.titleSelector);
  }

  // --------- methods ---------

  async login(): Promise<void> {
    await this.startButtonElement.click();
  }
}

export const welcomeScreen = new WelcomeScreen();
