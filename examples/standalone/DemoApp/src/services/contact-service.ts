import { faker } from '@faker-js/faker';
import { ContactBuilder } from '../utils';
import { ContactInterface } from '../models';

// Set a seed for consistent values.
const FAKER_SEED = 131;
faker.seed(FAKER_SEED);

/**
 * Logic for fetching contacts. In this demo app, contacts are
 * built in memory when the app loads. Using FakerJS since it
 * consistently returns the same data based on the provided seed value.
 *
 * @param capacity How many contacts to 'fetch'
 * @returns Returns an array of contacts
 */
function fetchContacts(capacity: number): Promise<ContactInterface[]> {
  if (capacity <= 0) {
    return Promise.resolve([]);
  }

  const contacts: ContactInterface[] = [];
  while (capacity > 0) {
    const builder = new ContactBuilder();
    builder.withPhoneNumber(faker.phone.number({ style: 'national' }));

    const isPerson = faker.helpers.arrayElement([true, false]);

    isPerson ? buildPerson(builder) : buildCompany(builder);

    // build contact and decrement counter
    contacts.push(builder.build());
    capacity--;
  }

  return Promise.resolve(contacts);
}

function buildPerson(builder: ContactBuilder): void {
  const sex = faker.person.sexType();
  let middle = '';
  if (faker.helpers.arrayElement([true, false])) {
    middle = faker.person.middleName(sex);
  }

  builder.named
    .withFirstName(faker.person.firstName(sex))
    .withLastName(faker.person.lastName(sex))
    .withMiddleName(middle);

  const hasCompany = faker.helpers.arrayElement([true, false]);
  if (hasCompany) {
    buildCompany(builder);
  }
}

function buildCompany(builder: ContactBuilder): void {
  builder.works.at(faker.company.name());
}

export const ContactService = { fetchContacts };
