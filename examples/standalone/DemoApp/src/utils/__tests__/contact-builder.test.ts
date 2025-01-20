import { describe, it, expect } from '@jest/globals';
import { ContactBuilder } from '../contact-builder';
import { ContactName } from '../../models';

describe('Contact Builder Tests', () => {
  it('should always create a contact with a identifier', () => {
    const builder = new ContactBuilder();
    const contact = builder.build();

    expect(contact.id).toBeDefined();
  });

  it.each<ContactName>([
    { first: 'James', last: 'Jones' },
    { first: 'Anne', middle: 'Kathryn', last: 'Smith' },
    { first: 'Pat' },
    { middle: 'Sam' },
    { last: 'Newman' },
  ])(
    'should build the correct name regardless of the order or values',
    ({ first, middle, last }) => {
      const builder = new ContactBuilder();
      const contact = builder.named
        .withLastName(last ? last : '')
        .withFirstName(first ? first : '')
        .withMiddleName(middle ? middle : '')
        .build();

      expect(contact.name).toBeDefined();

      if (first) {
        expect(contact.name!.first).toBe(first);
      }

      if (middle) {
        expect(contact.name!.middle).toBe(middle);
      }

      if (last) {
        expect(contact.name!.last).toBe(last);
      }
    },
  );
});
