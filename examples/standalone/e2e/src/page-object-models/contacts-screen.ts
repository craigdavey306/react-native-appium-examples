import {
  AndroidResourceId,
  IosAccessibilityId,
  IosPredicateString,
} from '../decorators/property';
import { PredicateStringComparators, XCUIElements } from '../utils/ios';
import { clearValue } from '../utils/wrappers';
import { BottomNavigator } from './bottom-navigator';

export type ContactInformation = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  company?: string;
  phoneNumber?: string;
};

/**
 * Class representing the
 */
class ContactForm {
  /** Selector text for the Add Contact Modal title. */
  @IosAccessibilityId
  @AndroidResourceId
  private static titleSelector = 'contact-form-title';

  @IosAccessibilityId
  @AndroidResourceId
  private static errorMessageSelector = 'error-text';

  /** Selector text for the first name text input field. */
  @IosAccessibilityId
  @AndroidResourceId
  private static firstNameInputSelector = 'contact-form-first-name';

  /** Selector text for the middle name text input field. */
  @IosAccessibilityId
  @AndroidResourceId
  private static middleNameInputSelector = 'contact-form-middle-name';

  /** Selector text for the last name text input field. */
  @IosAccessibilityId
  @AndroidResourceId
  private static lastNameInputSelector = 'contact-form-last-name';

  /** Selector text for the company name text input field. */
  @IosAccessibilityId
  @AndroidResourceId
  private static companyInputSelector = 'contact-form-company-name';

  /** Selector text for the phone text input field. */
  @IosAccessibilityId
  @AndroidResourceId
  private static phoneInputSelector = 'contact-form-phone-number';

  /** Selector text for the cancel button. */
  @IosAccessibilityId
  @AndroidResourceId
  private static cancelButtonSelector = 'contact-form-cancel-btn';

  /** Selector text for the save button. */
  @IosAccessibilityId
  @AndroidResourceId
  private static saveButtonSelector = 'contact-form-save-btn';

  // --------- getters ---------

  /**
   * Add Contact modal's cancel button. Pressing this closes the modal.
   */
  get cancelButtonElement() {
    return $(ContactForm.cancelButtonSelector);
  }

  /**
   * Contact's company name text input.
   */
  get companyInputElement() {
    return $(ContactForm.companyInputSelector);
  }

  /**
   * Add Contact modal's error message. An error may be generated when saving.
   */
  get errorMessageElement() {
    return $(ContactForm.errorMessageSelector);
  }

  /**
   * Contact's first name text input.
   */
  get firstNameInputElement() {
    return $(ContactForm.firstNameInputSelector);
  }

  /**
   * Contact's last name text input.
   */
  get lastNameInputElement() {
    return $(ContactForm.lastNameInputSelector);
  }

  /**
   * Contact's middle name text input.
   */
  get middleNameInputElement() {
    return $(ContactForm.middleNameInputSelector);
  }

  /**
   * Contact's phone number text input.
   */
  get phoneInputElement() {
    return $(ContactForm.phoneInputSelector);
  }

  /**
   * Add Contact modal's save button. Pressing this performs error checking,
   * saves the contact, and closes the modal (if no errors).
   */
  get saveButtonElement() {
    return $(ContactForm.saveButtonSelector);
  }

  /**
   * Add Contact modal's title.
   */
  get titleTextElement() {
    return $(ContactForm.titleSelector);
  }

  // --------- methods ---------

  /**
   * Schedules a command to clear and set the contact fields.
   * @param param0
   */
  async inputContactInformation({
    firstName,
    middleName,
    lastName,
    company,
    phoneNumber,
  }: ContactInformation): Promise<void> {
    await Promise.all([
      this.firstNameInputElement.setValue(firstName ?? ''),
      this.middleNameInputElement.setValue(middleName ?? ''),
      this.lastNameInputElement.setValue(lastName ?? ''),
      this.companyInputElement.setValue(company ?? ''),
      this.phoneInputElement.setValue(phoneNumber ?? ''),
    ]);
  }

  /**
   * Schedules a command to update the fields provided in the argument.
   * @param param0
   */
  async updateContactInformation({
    firstName,
    middleName,
    lastName,
    company,
    phoneNumber,
  }: ContactInformation): Promise<void> {
    if (firstName) {
      await clearValue(this.firstNameInputElement);
      await this.firstNameInputElement.setValue(firstName);
    }

    if (middleName) {
      await clearValue(this.middleNameInputElement);
      await this.middleNameInputElement.setValue(middleName);
    }

    if (lastName) {
      await clearValue(this.lastNameInputElement);
      await this.lastNameInputElement.setValue(lastName);
    }

    if (company) {
      await clearValue(this.companyInputElement);
      await this.companyInputElement.setValue(company ?? '');
    }

    if (phoneNumber) {
      await clearValue(this.phoneInputElement);
      await this.phoneInputElement.setValue(phoneNumber ?? '');
    }
  }

  /**
   * Schedules a command to press the Cancel button on the Add Contact Modal screen.
   */
  async pressCancelButton(): Promise<void> {
    await this.cancelButtonElement.click();
  }

  /**
   * Schedules a command to press the Cancel button on the Add Contact Modal screen.
   */
  async pressSaveButton(): Promise<void> {
    await this.saveButtonElement.click();
  }
}

class ContactHeader {
  /** Test ID used for the add contact icon button. */
  @IosAccessibilityId
  @AndroidResourceId
  private static addContactButtonSelector = 'add-contact-btn';

  /** Test ID used for the logout icon button. */
  @IosAccessibilityId
  @AndroidResourceId
  private static logoutButtonSelector = 'logout-btn';

  /** Text appearing in the header when on the Contacts screen. */
  @IosAccessibilityId
  @AndroidResourceId
  private static titleSelector = 'contacts-container-title-text';

  // --------- getters ---------

  /**
   * Add Contact Icon Button element.
   */
  get addContactButtonElement() {
    return $(ContactHeader.addContactButtonSelector);
  }

  /**
   * Logout Icon Button element.
   */
  get logoutButtonElement() {
    return $(ContactHeader.logoutButtonSelector);
  }

  /**
   * Contact screen title element.
   */
  get titleElement() {
    return $(ContactHeader.titleSelector);
  }

  // --------- methods ---------

  /**
   * Schedules a command to press the add new contact icon button.
   */
  async pressAddContactButton(): Promise<void> {
    await this.addContactButtonElement.click();
  }

  /**
   * Schedules a command to press the logout icon button.
   */
  async pressLogout(): Promise<void> {
    await this.logoutButtonElement.click();
  }
}

class ContactScreen {
  /** Selector string for the contact's name. */
  @IosPredicateString({
    elementType: XCUIElements.StaticText,
    predicateComparator: PredicateStringComparators.Matches,
    predicateIdentifier: 'name',
    visibleElementsOnly: true,
  })
  @AndroidResourceId
  private static cardNameSelector = 'contact-name';

  /** Selector string for selecting the edit contact buttons. */
  @IosPredicateString({
    elementType: XCUIElements.Button,
    predicateComparator: PredicateStringComparators.Matches,
    predicateIdentifier: 'name',
    visibleElementsOnly: true,
  })
  @AndroidResourceId
  private static cardEditButtonSelector = 'edit-contact-btn';

  /** Selector string for selecting the delete contact buttons. */
  @IosPredicateString({
    elementType: XCUIElements.Button,
    predicateComparator: PredicateStringComparators.Matches,
    predicateIdentifier: 'name',
    visibleElementsOnly: true,
  })
  @AndroidResourceId
  private static cardDeleteButtonSelector = 'delete-contact-btn';

  /** Stores an instance of the ContactHeader object class allowing interactions with the header component. */
  public readonly header: ContactHeader;

  public readonly navigationTabs: BottomNavigator;

  constructor(header = new ContactHeader(), tabs = new BottomNavigator()) {
    this.header = header;
    this.navigationTabs = tabs;
  }

  // --------- getters ---------

  /**
   * Returns an array of visible contact names from the cards on the screen.
   */
  get cardNames() {
    const selector = ContactScreen.cardNameSelector;
    return $$(selector).getElements();
  }

  /**
   * Returns an array of visible edit contact icon buttons from the cards on the screen.
   */
  get editContactButtons() {
    const selector = ContactScreen.cardEditButtonSelector;
    return $$(selector).getElements();
  }

  /**
   * Returns an array of visible delete contact icon buttons from the cards on the screen.
   */
  get deleteContactButtons() {
    const selector = ContactScreen.cardDeleteButtonSelector;
    return $$(selector).getElements();
  }

  /**
   * Returns a new instance of the AddContact class for saving a new contact.
   */
  get contact(): ContactForm {
    return new ContactForm();
  }

  // --------- methods ---------
}

export const contactsScreen = new ContactScreen();
