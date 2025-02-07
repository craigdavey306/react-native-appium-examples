import React, { useState } from 'react';
import _ from 'lodash';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import { styles } from './styles';
import { ContactInterface, ContactName } from '../../models';
import { formatPhoneNumber, getAutomationID } from '../../utils';
import { Error } from '../../components/error';
import { isIos } from '../../constants';
import { View } from 'react-native';

const MAX_PHONE_LENGTH = 12;

interface ContactFormProps {
  contact?: Partial<ContactInterface>;
  title: string;
  mode: 'edit' | 'new';
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
  mode,
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
    let message =
      mode === 'new' ? 'Please enter a value' : 'Please make an edit';

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
      <View testID="contact-form-title">
        <Card.Title title={title} titleVariant="titleLarge" />
      </View>
      <Card.Content>
        <TextInput
          label="First Name"
          value={formState.contact.name?.first}
          onChangeText={(value) => updateNamePart({ namePart: 'first', value })}
          style={styles.modalFormItem}
          testID="contact-form-first-name"
        />
        <TextInput
          label="Middle Name"
          value={formState.contact.name?.middle}
          onChangeText={(value) =>
            updateNamePart({ namePart: 'middle', value })
          }
          style={styles.modalFormItem}
          testID="contact-form-middle-name"
        />
        <TextInput
          label="Last Name"
          value={formState.contact.name?.last}
          onChangeText={(value) => updateNamePart({ namePart: 'last', value })}
          style={styles.modalFormItem}
          testID="contact-form-last-name"
        />
        <TextInput
          label="Company"
          value={formState.contact.company}
          onChangeText={(value) => updateCompanyName(value)}
          style={styles.modalFormItem}
          testID="contact-form-company-name"
        />
        <TextInput
          label="Phone"
          value={formState.contact.phoneNumber}
          onChangeText={(value) => updatePhoneNumber(value)}
          inputMode="tel"
          maxLength={MAX_PHONE_LENGTH}
          style={styles.modalFormItem}
          testID="contact-form-phone-number"
        />
      </Card.Content>
      <Card.Actions style={{ padding: 20 }} testID="contact-form-btns">
        <Button onPress={handleCancel} testID="contact-form-cancel-btn">
          Cancel
        </Button>
        <Button onPress={handleSave} testID="contact-form-save-btn">
          Save
        </Button>
      </Card.Actions>
      {formState.error && <Error message={formState.error.message} />}
    </Card>
  );
};

ContactForm.displayName = 'Contact Form';

export default ContactForm;
