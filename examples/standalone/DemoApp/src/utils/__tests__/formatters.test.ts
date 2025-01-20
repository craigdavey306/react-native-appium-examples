import { describe, it, expect } from '@jest/globals';
import { ContactName } from '../../models';
import { formatNameLastFirstMiddle, slugify } from '../formatters';

describe('formatNameLastFirstMiddle tests', () => {
  it('should format a name correctly without a middle name', () => {
    const expected = 'Smith, John';
    const name: ContactName = {
      first: 'John',
      last: 'Smith',
    };

    const formatted = formatNameLastFirstMiddle(name);
    expect(formatted).toBe(expected);
  });

  it('should format a name correctly with only a first name', () => {
    const expected = 'Jane';
    const name: ContactName = {
      first: 'Jane',
    };

    const formatted = formatNameLastFirstMiddle(name);
    expect(formatted).toBe(expected);
  });

  it('should format a name correctly with only a last name', () => {
    const expected = 'Smith';
    const name: ContactName = {
      last: 'Smith',
    };

    const formatted = formatNameLastFirstMiddle(name);
    expect(formatted).toBe(expected);
  });
});

describe('slugify tests', () => {
  it('should remove punctuation from the returned slug', () => {
    const original = "Alfred E. Newman, Esq. says: 'hello!'";
    const expectedSlug = 'alfred-e-newman-esq-says-hello';

    const slug = slugify(original);
    expect(slug).toBe(expectedSlug);
  });

  it('should return a slug without leading and trailing spaces', () => {
    const spacer = 5;
    const spaces = ' '.repeat(spacer);
    const original = `${spaces}HELLO WORLD${spaces}`;
    const expectedSlug = 'hello-world';

    const slug = slugify(original);

    expect(slug).toBe(expectedSlug);
  });
});
