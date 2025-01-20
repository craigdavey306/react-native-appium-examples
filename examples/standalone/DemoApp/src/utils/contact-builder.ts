import { nanoid } from '@reduxjs/toolkit';
import { ContactInterface } from '../models';
import { formatPhoneNumber } from './formatters';

type Contact = ContactInterface;

/**
 * Class for building contacts. The order in which the data is built does not matter.
 * The only caveat is that providing a birthdate will set the age, and using the `hasAge()`
 * function will set the birthdate to `undefined`.
 *
 * The `build()` function should be the last function called to return the contact.
 *
 * ```js
 * const builder = new ContactBuilder();
 * const contact = builder.lives
 * .inCity('Boston')
 * .withZipOrPostalCode('02114')
 * .atStreet('10 Main Street')
 * .inState('MA')
 * .works.at('The Boston Globe')
 * .hasBirthdate('1996-06-02')
 * .build();
 * ```
 */
export class ContactBuilder {
  protected contact: Contact;
  private addressBuilder!: ContactAddressBuilder;
  private companyBuilder!: ContactCompanyBuilder;
  private nameBuilder!: ContactNameBuilder;

  constructor(
    contact: Contact = {
      id: nanoid(),
      name: { first: '', last: '' },
      phoneNumber: '',
    },
  ) {
    this.contact = contact;
  }

  /** Builder for creating the contact's address. */
  get lives() {
    if (this.addressBuilder) {
      return this.addressBuilder;
    }

    return (this.addressBuilder = new ContactAddressBuilder(this.contact));
  }

  get named() {
    if (this.nameBuilder) {
      return this.nameBuilder;
    }

    return (this.nameBuilder = new ContactNameBuilder(this.contact));
  }

  get works() {
    if (this.companyBuilder) {
      return this.companyBuilder;
    }

    return (this.companyBuilder = new ContactCompanyBuilder(this.contact));
  }

  /**
   * Calculates an age based on a birthdate.
   * @param birthdate
   * @returns Returns the calculated age
   */
  private calculateAge(birthdate: Date): number {
    const today = new Date();
    // calculate the age in years
    let age = today.getFullYear() - birthdate.getFullYear();
    // calculate the number of months
    const months = today.getMonth() - birthdate.getMonth();
    // if months is negative or if today's date is less than the birthdate, then decrement the age.
    if (months < 0 || (months === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }

    return age;
  }

  hasBirthdate(birthdate: string | Date) {
    this.contact.birthdate =
      typeof birthdate === 'string' ? new Date(birthdate) : birthdate;
    this.contact.age = this.calculateAge(this.contact.birthdate);

    return this;
  }

  hasAge(age: number) {
    this.contact.age = Math.floor(age);
    // Remove the contact's birthdate if an age is provided.
    this.contact.birthdate = undefined;

    return this;
  }

  withPhoneNumber(phone: string) {
    this.contact.phoneNumber = formatPhoneNumber(phone);

    return this;
  }

  build(): Contact {
    return this.contact;
  }
}

class ContactAddressBuilder extends ContactBuilder {
  constructor(contact: Contact) {
    super(contact);

    // Create and initialize the address object.
    this.contact.address = {};
  }

  atStreet(street1: string, street2?: string) {
    this.contact.address!.street1 = street1;
    this.contact.address!.street2 = street2;

    return this;
  }

  inCity(city: string) {
    this.contact.address!.city = city;

    return this;
  }

  inState(state: string) {
    this.contact.address!.state = state;

    return this;
  }

  withZipOrPostalCode(code: string) {
    this.contact.address!.zipPostalCode = code;

    return this;
  }

  inCountry(country: string) {
    this.contact.address!.country = country;

    return this;
  }

  inCounty(county: string) {
    this.contact.address!.county = county;

    return this;
  }
}

class ContactCompanyBuilder extends ContactBuilder {
  constructor(contact: Contact) {
    super(contact);
  }

  at(companyName: string) {
    this.contact.company = companyName;

    return this;
  }
}

class ContactNameBuilder extends ContactBuilder {
  constructor(contact: Contact) {
    super(contact);

    this.contact.name = {
      first: '',
      last: '',
    };
  }

  withFirstName(first: string) {
    this.contact.name!.first = first;

    return this;
  }

  withMiddleName(middle: string) {
    this.contact.name!.middle = middle;

    return this;
  }

  withLastName(last: string) {
    this.contact.name!.last = last;

    return this;
  }
}
