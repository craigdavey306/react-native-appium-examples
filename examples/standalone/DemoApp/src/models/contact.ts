export interface ContactName {
  first?: string;
  middle?: string;
  last?: string;
}

export interface Address {
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  zipPostalCode?: string;
  county?: string;
  country?: string;
}

export interface ContactInterface {
  id: string;
  name?: ContactName;
  address?: Address;
  company?: string;
  birthdate?: Date;
  age?: number;
  phoneNumber: string;
  email?: string;
  notes?: string;
}
