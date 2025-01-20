import {
  createAsyncThunk,
  createSlice,
  nanoid,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { ContactInterface as Contact } from '../../models';
import { ContactService } from '../../services';
import { type RootState } from '../../core/store';

export interface ContactState {
  contacts: Contact[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
  currentContact?: Contact;
}

const initialState: ContactState = {
  contacts: [],
  status: 'idle',
};

const sliceName = 'contact';

/**
 * Fetches contacts via the ContactService.
 */
export const fetchContacts = createAsyncThunk(
  `${sliceName}/fetchContacts`,
  async (capacity: number, { rejectWithValue }) => {
    try {
      const response = await ContactService.fetchContacts(capacity);
      return response;
    } catch (err) {
      const message = 'Unable to load contacts';
      return rejectWithValue(message);
    }
  },
);

export const contactSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    /**
     * Adds a new contact to the contacts array. An identifier
     * is added to the contact object before adding to the store.
     */
    addContact: {
      reducer(state, action: PayloadAction<Contact>) {
        state.contacts.unshift(action.payload);
      },
      prepare(contact: Omit<Contact, 'id'>) {
        return {
          payload: { id: nanoid(), ...contact },
        };
      },
    },
    // remove a contact
    removeContact: (state, action: PayloadAction<Contact>) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload.id,
      );
    },
    // update a contact
    updateContact: (state, action: PayloadAction<Contact>) => {
      state.contacts = state.contacts.map((contact) => {
        if (contact.id === action.payload.id) {
          return { ...contact, ...action.payload };
        }

        return contact;
      });
    },
    updateCurrentContact: (
      state,
      action: PayloadAction<Contact | undefined>,
    ) => {
      state.currentContact = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contacts = state.contacts.concat(action.payload);
        state.status = 'idle';
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  addContact,
  removeContact,
  updateContact,
  updateCurrentContact,
} = contactSlice.actions;

export const selectContacts = (state: RootState) => state.contact.contacts;
export const selectContactsStatus = (state: RootState) => state.contact.status;
export const selectErrorMessage = (state: RootState) => state.contact.error;
export const selectCurrentContact = (state: RootState) =>
  state.contact.currentContact;
