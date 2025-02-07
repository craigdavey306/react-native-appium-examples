import { todoScreen, welcomeScreen } from '../src/page-object-models';

describe('TO DO Workflows', () => {
  it('should navigate the user to the TO DO screen after logging in and pressing the TO DO tab', async () => {
    await expect(welcomeScreen.screenTitleElement).toBeDisplayed();
    await welcomeScreen.login();

    await Promise.all([
      expect(welcomeScreen.navigationTabs.contactsTabElement).toBeDisplayed(),
      expect(welcomeScreen.navigationTabs.todosTabElement).toBeDisplayed(),
    ]);

    await todoScreen.navigationTabs.pressTodosTab();

    expect(todoScreen.header.titleElement).toBeDisplayed();
  });
});
