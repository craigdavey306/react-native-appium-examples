import React from 'react';
import { Surface, Text } from 'react-native-paper';
import { styles } from './styles';

export const ContactsView = (): React.JSX.Element => {
  return (
    <Surface style={styles.container} elevation={0}>
      <Text variant="displayLarge" testID="welcome-text">
        Contacts
      </Text>
    </Surface>
  );
};
