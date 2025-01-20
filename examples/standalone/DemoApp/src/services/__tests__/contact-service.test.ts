import { describe, it, expect } from '@jest/globals';
import { ContactService } from '../contact-service';

describe('ContactService tests', () => {
  it('should fetch the correct number of contacts', async () => {
    const capacity = 10;
    const result = await ContactService.fetchContacts(capacity);
    expect(result.length).toBe(capacity);
  });

  it('should return an empty array when the capacity less than zero', async () => {
    const capacity = -1;
    const result = await ContactService.fetchContacts(capacity);
    expect(result.length).toBe(0);
  });

  it('should return an empty array when the capacity equals zero', async () => {
    const capacity = 0;
    const result = await ContactService.fetchContacts(capacity);
    expect(result.length).toBe(0);
  });
});
