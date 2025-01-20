import { ContactName } from '../models';

/**
 * Formats a contact's name with the following format: <Last, First Middle>
 * @param name
 * @returns
 */
export function formatNameLastFirstMiddle(name: ContactName): string {
  const { first, middle, last } = name;

  const formattedLast = last && first ? `${last}, ` : last ? last : '';
  const lastFirst = `${formattedLast}${first ? first : ''}`.trim();

  return `${lastFirst} ${middle ? middle : ''}`.trim();
}

/**
 * Formats a contact's name with the following format; <First, Middle, Last>
 * @param name
 * @returns
 */
export function formatNameFirstMiddleLast(name: ContactName): string {
  const { first, middle, last } = name;

  return `${first ?? ''} ${middle ?? ''} ${last ?? ''}`.trim();
}

/**
 * Formats a phone number based on the US phone number format: (area) 123-4567
 * @param phone
 * @returns
 */
export function formatPhoneNumber(phone: string): string {
  const notDigitRegEx = /\D/g;
  const nationalFormatRegEx = /^(\d{3})(\d{3})(\d{4})$/;
  const cleaned = ('' + phone).replace(notDigitRegEx, '');
  const match = cleaned.match(nationalFormatRegEx);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return phone;
}

/**
 * Transforms a string into a slug. For example, `hello world` transforms to `hello-world`.
 * @param value
 * @returns
 */
export function slugify(value: string) {
  return value
    .trim()
    .replace(/\W/g, ' ')
    .split(' ')
    .filter((v) => v.trim())
    .join('-')
    .toLowerCase();
}

/**
 * Transforms a contact name into a slug.
 * @param name
 * @returns
 */
export function slugifyName(name: ContactName) {
  const formattedName = formatNameFirstMiddleLast(name);

  return slugify(formattedName);
}
