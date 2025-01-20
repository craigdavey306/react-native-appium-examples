import { useState } from 'react';
import _ from 'lodash';
import { ContactInterface } from '../../models';
import { useContactViewModel } from './contacts-view-model';
import AppModal from '../../components/modal/modal';
import ContactForm from './contact-form';

interface EditContactModalProps {
  contact: ContactInterface;
  toggleModal: () => void;
}

/**
 * Modal component for editing an existing contact.
 * @param param0 {EditContactModalProps} Props for the EditContactModal component.
 * @returns Returns a JSX Element to be rendered
 */
const EditContactModal = ({ contact, toggleModal }: EditContactModalProps) => {
  const { updateContactInfo, setCurrentContact } = useContactViewModel();
  const [isVisible, setIsVisible] = useState(true);

  const onDismiss = () => {
    setIsVisible(false);
    setCurrentContact(undefined);
    toggleModal();
  };

  const handleCancel = () => {
    setCurrentContact(undefined);
    toggleModal();
  };

  const handleSave = (editedContact: ContactInterface) => {
    updateContactInfo(editedContact);
    toggleModal();
    setCurrentContact(undefined);
  };

  return (
    <AppModal isVisible={isVisible} onDismiss={onDismiss}>
      <ContactForm
        contact={contact}
        title="Edit Contact"
        handleCancelButtonPress={handleCancel}
        handleSaveButtonPress={handleSave}
      />
    </AppModal>
  );
};

EditContactModal.displayName = 'Edit Contact Modal';

export default EditContactModal;
