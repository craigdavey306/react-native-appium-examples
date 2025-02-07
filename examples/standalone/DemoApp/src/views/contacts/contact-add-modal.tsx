import React, { useState } from 'react';
import { ContactInterface } from '../../models';
import { useContactViewModel } from './contacts-view-model';
import AppModal from '../../components/modal/modal';
import ContactForm from './contact-form';

export interface AddContactModalProps {
  toggleModal: () => void;
}

/**
 * Modal component for adding a new contact.
 * @param param0 {AddContactModalProps} Props for the AddContactModal component.
 * @returns Returns a JSX Element to be rendered
 */
const AddContactModal = ({ toggleModal }: AddContactModalProps) => {
  const { saveContact } = useContactViewModel();
  const [isVisible, setIsVisible] = useState(true);

  const onDismiss = () => {
    setIsVisible(false);
    toggleModal();
  };

  const handleCancel = () => {
    toggleModal();
  };

  const handleSave = (contact: ContactInterface) => {
    saveContact(contact);
    toggleModal();
  };

  return (
    <AppModal isVisible={isVisible} onDismiss={onDismiss}>
      <ContactForm
        title="Add Contact"
        mode="new"
        handleCancelButtonPress={handleCancel}
        handleSaveButtonPress={handleSave}
      />
    </AppModal>
  );
};

AddContactModal.displayName = 'Add Contact Modal';

export default AddContactModal;
