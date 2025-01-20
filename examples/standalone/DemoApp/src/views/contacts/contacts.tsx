import React, { useState, useCallback } from 'react';
import { Appbar, Surface } from 'react-native-paper';
import { useContactViewModel } from './contacts-view-model';
import { styles } from './styles';
import { Error } from '../../components/error';
import ContactList from './contact-list';
import AddContactModal from './contact-add-modal';
import EditContactModal from './contact-edit-modal';
import { useAuth } from '../../core/auth';

const CONTACT_CAPACITY = 15;

const ContactsView = (): React.JSX.Element => {
  const {
    contacts,
    fetchData,
    status,
    errorMessage,
    getCurrentContact,
    setCurrentContact,
  } = useContactViewModel();
  const { logout } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNewContact, setIsNewContact] = useState(false);
  const currentContact = getCurrentContact();

  const toggleModal = useCallback(
    () => setIsModalVisible((prev) => !prev),
    [isModalVisible],
  );

  const toggleNewContactModal = useCallback(() => {
    setCurrentContact(undefined);
    toggleModal();
    setIsNewContact((prev) => !prev);
  }, [setCurrentContact, toggleModal, isNewContact]);

  const toggleEditContactModal = useCallback(() => {
    toggleModal();
    setIsNewContact(false);
  }, [toggleModal, setIsNewContact]);

  const handleAddNewContact = () => {
    toggleModal();
    setIsNewContact(true);
  };

  const getModalComponent = (): React.JSX.Element | null => {
    if (!isModalVisible) {
      return null;
    }

    if (isNewContact) {
      return <AddContactModal toggleModal={toggleNewContactModal} />;
    }

    if (!currentContact) {
      return null;
    }

    return (
      <EditContactModal
        toggleModal={toggleEditContactModal}
        contact={currentContact}
      />
    );
  };

  fetchData(CONTACT_CAPACITY);

  const modalComponent = getModalComponent();

  return (
    <>
      <Appbar.Header statusBarHeight={0}>
        <Appbar.Content title="Contacts" />
        <Appbar.Action
          icon="plus"
          onPress={handleAddNewContact}
          disabled={isModalVisible}
          accessibilityLabel="Add Contact Button"
          testID="add-contact"
        />
        <Appbar.Action
          icon="logout-variant"
          onPress={logout}
          disabled={isModalVisible}
          accessibilityLabel="Logout Button"
          testID="logout"
        />
      </Appbar.Header>
      <Surface style={styles.container} elevation={0}>
        {status === 'failed' ? (
          <Error
            message={errorMessage ?? 'Error encountered loading contacts'}
          />
        ) : (
          <ContactList
            contacts={contacts}
            capacity={CONTACT_CAPACITY}
            openEditModal={toggleEditContactModal}
          />
        )}
      </Surface>
      {modalComponent}
    </>
  );
};

ContactsView.displayName = 'Contacts View';

export default ContactsView;
