import {
  ContactInformation,
  welcomeScreen,
  contactsScreen,
} from '../src/page-object-models';
import { VISIBLE_CONTACT_CARD_COUNT } from '../src/constants';
import { formatNameLastFirstMiddle } from '../src/utils/formatters';

const mockContact: ContactInformation = {
  firstName: 'Carl',
  middleName: 'A',
  lastName: 'Dillon',
  company: 'The Acme Company',
  phoneNumber: '5551234567',
};

/**
 * Workflow tests for adding a new contact.
 */
describe('New Contact Workflows', () => {
  const screen = contactsScreen;
  const contactHeader = screen.header;

  it('should navigate the user to the Contact screen after logging in to the app', async () => {
    await expect(welcomeScreen.screenTitleElement).toBeDisplayed();

    await welcomeScreen.login();

    await Promise.all([
      expect(contactHeader.titleElement).toBeDisplayed(),
      expect(welcomeScreen.navigationTabs.contactsTabElement).toBeDisplayed(),
      expect(welcomeScreen.navigationTabs.todosTabElement).toBeDisplayed(),
    ]);
  });

  describe('Cancel Contact Workflows', () => {
    const contact = screen.contact;

    it('should display the add contact modal when the add contact button is pressed', async () => {
      await Promise.all([
        expect(contactHeader.titleElement).toBeDisplayed(),
        expect(contactHeader.logoutButtonElement).toBeDisplayed(),
        expect(contactHeader.addContactButtonElement).toBeDisplayed(),
      ]);

      const cards = await screen.cardNames;
      await expect(cards.length).toBeGreaterThanOrEqual(
        VISIBLE_CONTACT_CARD_COUNT
      );

      await contactHeader.pressAddContactButton();

      await expect(contact.titleTextElement).toBeDisplayed();
    });

    it('should close the modal when the Cancel button is pressed', async () => {
      await expect(contact.cancelButtonElement).toBeDefined();

      await contact.pressCancelButton();

      await Promise.all([
        expect(contact.titleTextElement).not.toBeDisplayed(),
        expect(contactHeader.titleElement).toBeDisplayed(),
      ]);

      // make sure that the number of contacts does not change
      const cards = await screen.cardNames;
      await expect(cards.length).toBeGreaterThanOrEqual(
        VISIBLE_CONTACT_CARD_COUNT
      );
    });
  });

  describe('Save Contact Workflows', () => {
    const contact = screen.contact;

    it('should display an error when pressing save without entering any contact data', async () => {
      // open the contact modal
      await expect(contactHeader.addContactButtonElement).toBeDisplayed();
      let cards = await screen.cardNames;
      await expect(cards.length).toBeGreaterThanOrEqual(
        VISIBLE_CONTACT_CARD_COUNT
      );

      await contactHeader.pressAddContactButton();

      await Promise.all([
        expect(contact.titleTextElement).toBeDisplayed(),
        expect(contact.errorMessageElement).not.toBeDisplayed(),
      ]);

      // press save
      await contact.pressSaveButton();

      // confirm error displays
      await expect(contact.errorMessageElement).toBeDisplayed();

      // close modal for next test
      await contact.pressCancelButton();
      await expect(contact.titleTextElement).not.toBeDisplayed();

      // make sure the number of contact cards has not changed
      cards = await screen.cardNames;
      await expect(cards.length).toBeGreaterThanOrEqual(
        VISIBLE_CONTACT_CARD_COUNT
      );
    });

    it('should save a contact when information has been entered', async () => {
      const initialFirstCardName = 'Gibson Group';

      // new contact's information
      const newContact: ContactInformation = { ...mockContact };
      const formattedNewContactName = formatNameLastFirstMiddle(newContact);

      let cards = await screen.cardNames;
      const firstCardName = await cards[0].getText();

      expect(firstCardName).toBe(initialFirstCardName);

      // open the contact modal
      await expect(contactHeader.addContactButtonElement).toBeDisplayed();
      await contactHeader.pressAddContactButton();

      await Promise.all([
        expect(contact.titleTextElement).toBeDisplayed(),
        expect(contact.saveButtonElement).toBeDisplayed(),
      ]);

      // enter contact information and save
      await contact.inputContactInformation({ ...newContact });
      await contact.pressSaveButton();

      await Promise.all([
        expect(contact.titleTextElement).not.toBeDisplayed(),
        expect(screen.header.addContactButtonElement).toBeEnabled(),
        expect(screen.header.logoutButtonElement).toBeEnabled(),
      ]);

      // retrieve the card list again to check that the list has been updated
      cards = await screen.cardNames;

      await Promise.all([
        expect(await cards[0].getText()).toBe(formattedNewContactName),
        expect(await cards[1].getText()).toBe(initialFirstCardName),
      ]);
    });
  });
});

/**
 * Workflow tests for existing contacts. Already signed with the preceding tests so
 * no need to do that here since we are still signed in.
 */
describe('Existing Contact Workflow', () => {
  // const screen = new ContactScreen();
  const screen = contactsScreen;
  const contactHeader = screen.header;

  it('should not save edits when the cancel button is pressed', async () => {
    const existingContact: ContactInformation = {
      ...mockContact,
    };

    const contact = screen.contact;

    // make sure we are still on the contact screen by looking for the header elements
    await Promise.all([
      expect(contactHeader.titleElement).toBeDisplayed(),
      expect(contactHeader.logoutButtonElement).toBeDisplayed(),
      expect(contactHeader.addContactButtonElement).toBeDisplayed(),
    ]);

    let [cards, editButtons] = await Promise.all([
      screen.cardNames,
      screen.editContactButtons,
    ]);
    const firstContactName = await cards[0].getText();

    await Promise.all([
      expect(firstContactName).toBe(formatNameLastFirstMiddle(existingContact)),
      expect(cards.length).toBe(editButtons.length),
      expect(contactHeader.addContactButtonElement).toBeDisplayed(),
    ]);

    // open the contact modal from the edit contact button
    await editButtons[0].click();

    // update the contact's information
    const updatedContact: ContactInformation = {
      firstName: 'Carla',
    };
    await contact.updateContactInformation(updatedContact);
    await contact.pressCancelButton();

    cards = await screen.cardNames;
    const updatedContactName = await cards[0].getText();

    // nothing should have changed
    await expect(updatedContactName).toBe(firstContactName);
  });

  it('should save edits when the save button is pressed', async () => {
    const millisecondsPause = 5_000;
    const existingContact: ContactInformation = {
      ...mockContact,
    };

    const contact = screen.contact;

    // make sure we are still on the contact screen by looking for the header elements
    await Promise.all([
      expect(contactHeader.titleElement).toBeDisplayed(),
      expect(contactHeader.logoutButtonElement).toBeDisplayed(),
      expect(contactHeader.addContactButtonElement).toBeDisplayed(),
    ]);

    const [cards, editButtons] = await Promise.all([
      screen.cardNames,
      screen.editContactButtons,
    ]);
    const firstContactName = await cards[0].getText();

    await Promise.all([
      expect(firstContactName).toBe(formatNameLastFirstMiddle(existingContact)),
      expect(contactHeader.addContactButtonElement).toBeDisplayed(),
    ]);

    // open the contact modal from the edit contact button
    await editButtons[0].click();

    // update the contact's information
    const updatedContact: ContactInformation = {
      firstName: 'Sue',
    };
    await contact.updateContactInformation(updatedContact);
    await contact.pressSaveButton();

    // pausing here for the screen to rerender.
    await driver.pause(millisecondsPause);

    await expect(contactHeader.titleElement).toBeDisplayed();

    const updatedCards = await screen.cardNames;

    const updatedContactName = await updatedCards[0].getText();

    // first card should have the updated name
    await Promise.all([
      expect(updatedContactName).not.toBe(firstContactName),
      expect(updatedContactName).toBe(
        formatNameLastFirstMiddle({ ...existingContact, ...updatedContact })
      ),
    ]);
  });
});

// it.skip('placeholder test', async () => {
//   const welcome = new WelcomeScreen();
//   await welcome.login();
//   const screen = new ContactScreen();

//   await Promise.all([
//     expect(screen.header.titleElement).toBeDisplayed(),
//     expect(welcome.navigationTabs.contactsTabElement).toBeDisplayed(),
//     expect(welcome.navigationTabs.todosTabElement).toBeDisplayed(),
//   ]);

// const iosSelectAllStringSelector =
//   '-ios predicate string:label == "Select All" AND name == "Select All" AND value == "Select All"';

// const iosCutStringSelector =
//   '-ios predicate string:label == "Cut" AND name == "Cut" AND value == "Cut"';

// const [cards, editButtons] = await Promise.all([
//   screen.cardNames,
//   screen.editContactButtons,
// ]);

// await editButtons[0].click();

// await screen.contact.companyInputElement.click();
// await driver.waitUntil(async () => {
//   return screen.contact.companyInputElement.isEnabled();
// });

// await screen.contact.companyInputElement.doubleClick();
// await driver.waitUntil(async () => {
//   return $(iosSelectAllStringSelector).isDisplayed();
// });

// await $(iosSelectAllStringSelector).click();

// await driver.waitUntil(async () => {
//   return $(iosCutStringSelector).isDisplayed();
// });

// await $(iosCutStringSelector).click();

// await screen.contact.companyInputElement.setValue('Gortons Fisherman');

// await driver.pause(10_000);

//   const cards = await screen.cardNames;

//   for (let card of cards) {
//     console.log('>>> card', await card.getText());
//   }
// });
