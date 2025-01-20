import React from 'react';
import { Modal, Portal } from 'react-native-paper';
import _ from 'lodash';
import { styles } from './styles';

interface ModalProps {
  isVisible: boolean;
  onDismiss?: () => void;
  children: React.ReactNode;
}

const AppModal = ({
  isVisible,
  onDismiss,
  children,
}: ModalProps): React.JSX.Element => {
  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}>
        {children}
      </Modal>
    </Portal>
  );
};

export default AppModal;
