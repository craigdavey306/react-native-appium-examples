import { ContactInformation } from '../../page-object-models';

/**
 * Formats a contact's name with the following format: <Last, First Middle>
 * @param contact
 * @returns
 */
export function formatNameLastFirstMiddle(contact: ContactInformation): string {
  const { firstName: first, middleName: middle, lastName: last } = contact;

  const formattedLast = last && first ? `${last}, ` : last ? last : '';
  const lastFirst = `${formattedLast}${first ? first : ''}`.trim();

  return `${lastFirst} ${middle ? middle : ''}`.trim();
}
