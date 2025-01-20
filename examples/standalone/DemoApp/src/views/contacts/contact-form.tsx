import React, { useState } from 'react';
import { Button, Card, TextInput } from 'react-native-paper';
import _ from 'lodash';
import { styles } from './styles';
import { ContactInterface, ContactName } from '../../models';
import { formatPhoneNumber } from '../../utils';
import { Error } from '../../components/error';

const MAX_PHONE_LENGTH = 12;

interface ContactFormProps {
  contact?: Partial<ContactInterface>;
  title: string;
  handleCancelButtonPress: () => void;
  handleSaveButtonPress: (contact: ContactInterface) => void;
}

type ContactFormState = {
  isDirty: boolean;
  error?: {
    message: string;
  };
  contact: Partial<ContactInterface>;
};

const ContactForm = ({
  contact = {},
  title,
  handleCancelButtonPress,
  handleSaveButtonPress,
}: ContactFormProps) => {
  const [formState, setFormState] = useState<ContactFormState>({
    isDirty: false,
    contact: { ..._.cloneDeep(contact) },
  });

  const updateNamePart = ({
    namePart,
    value,
  }: {
    namePart: keyof ContactName;
    value: string;
  }): void => {
    setFormState((prev) => {
      const { contact: prevContact } = prev;
      return {
        ...prev,
        isDirty: true,
        contact: {
          ...prevContact,
          name: {
            ...prevContact.name,
            [namePart]: value,
          },
        },
      };
    });
  };

  const updateCompanyName = (company: string) => {
    setFormState((prev) => ({
      ...prev,
      isDirty: true,
      contact: { ...prev.contact, company },
    }));
  };

  const updatePhoneNumber = (phone: string) => {
    setFormState((prev) => ({
      ...prev,
      isDirty: true,
      contact: { ...prev.contact, phoneNumber: formatPhoneNumber(phone) },
    }));
  };

  const handleCancel = () => {
    handleCancelButtonPress();
  };

  const updateFormStateErrMsg = (message: string) => {
    setFormState((prev) => {
      return {
        ...prev,
        error: {
          message,
        },
      };
    });
  };

  const handleSave = (): void => {
    const { isDirty, contact } = formState;
    let message = 'Please enter a value';

    if (!isDirty || Object.keys(contact).length === 0) {
      updateFormStateErrMsg(message);
      return;
    }

    const unformattedPhone = contact.phoneNumber!.replace(/\W/g, '');

    if (unformattedPhone.length < 10) {
      message = 'Phone number must have 10 digits.';
      updateFormStateErrMsg(message);
      return;
    }

    handleSaveButtonPress(formState.contact as ContactInterface);
  };

  return (
    <Card contentStyle={{ height: '100%', padding: 16 }}>
      <Card.Title title={title} titleVariant="titleLarge" />
      <Card.Content>
        <TextInput
          label="First Name"
          value={formState.contact.name?.first}
          onChangeText={(value) => updateNamePart({ namePart: 'first', value })}
          style={styles.modalFormItem}
        />
        <TextInput
          label="Middle Name"
          value={formState.contact.name?.middle}
          onChangeText={(value) =>
            updateNamePart({ namePart: 'middle', value })
          }
          style={styles.modalFormItem}
        />
        <TextInput
          label="Last Name"
          value={formState.contact.name?.last}
          onChangeText={(value) => updateNamePart({ namePart: 'last', value })}
          style={styles.modalFormItem}
        />
        <TextInput
          label="Company"
          value={formState.contact.company}
          onChangeText={(value) => updateCompanyName(value)}
          style={styles.modalFormItem}
        />
        <TextInput
          label="Phone"
          value={formState.contact.phoneNumber}
          onChangeText={(value) => updatePhoneNumber(value)}
          inputMode="tel"
          maxLength={MAX_PHONE_LENGTH}
          style={styles.modalFormItem}
        />
      </Card.Content>
      <Card.Actions style={{ padding: 20 }}>
        <Button onPress={handleCancel}>Cancel</Button>
        <Button onPress={handleSave}>Save</Button>
      </Card.Actions>
      {formState.error && <Error message={formState.error.message} />}
    </Card>
  );
};

ContactForm.displayName = 'Contact Form';

export default ContactForm;
