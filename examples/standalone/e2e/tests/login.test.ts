import { welcomeScreen as welcome } from '../src/page-object-models';

/**
 * Workflows for logging into the app.
 */
describe('Signing in Workflow', () => {
  it('should start the app on the Welcome screen', async () => {
    await Promise.all([
      expect(welcome.screenTitleElement).toBeDisplayed(),
      expect(welcome.navigationTabs.contactsTabElement).not.toBeDisplayed(),
      expect(welcome.navigationTabs.todosTabElement).not.toBeDisplayed(),
    ]);
  });

  it('should log the user in after pressing the start button', async () => {
    await welcome.login();
    await expect(welcome.screenTitleElement).not.toBeDisplayed();
  });
});
