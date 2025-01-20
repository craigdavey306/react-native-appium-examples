import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Avatar, Card, IconButton, Text } from 'react-native-paper';
import { ContactInterface } from '../../models';
import {
  formatNameLastFirstMiddle,
  slugify,
  slugifyName,
} from '../../utils/formatters';
import { styles } from './styles';
import { useContactViewModel } from './contacts-view-model';
import { DEFAULT_AVATAR_SIZE, ICON_SIZE } from '../../constants';

/**
 * Helper function that extracts the initials from a contact's name or company name.
 * @param contact
 * @returns
 */
const getInitials = (contact: ContactInterface): string | undefined => {
  const { name, company } = contact;

  if (name?.first && name.last) {
    return `${name.first[0]}${name.last[0]}`;
  }

  if (name?.first) {
    return name.first[0];
  }

  if (name?.last) {
    return name.last[0];
  }

  if (name?.middle) {
    return name.middle[0];
  }

  if (company) {
    return company[0];
  }
};

interface ContactCardProps {
  item: ContactInterface;
  openEditModal: () => void;
}

/**
 * Card component for displaying contact information.
 * @param param0 {ContactCardProps} Props for the ContactCard component
 * @returns Returns a JSX Element to be rendered
 */
const ContactCard = ({
  item,
  openEditModal,
}: ContactCardProps): React.JSX.Element | null => {
  if (!item.name && !item.company) {
    return null;
  }

  const { deleteContact, setCurrentContact } = useContactViewModel();

  // don't memoize the 'handle' functions because it will cache the contact object
  const handleEditContact = () => {
    setCurrentContact(item);
    openEditModal();
  };

  const handleDeleteContact = () => deleteContact(item);

  const initials = getInitials(item);
  const formattedName =
    item.name && (item.name.first || item.name.last || item.name.middle)
      ? formatNameLastFirstMiddle(item.name)
      : item.company;
  const slugifiedName = item.name
    ? slugifyName(item.name)
    : item.company
    ? slugify(item.company)
    : 'Unknown';

  return (
    <Card style={styles.cardContainer} testID={`contact-card-${slugifiedName}`}>
      <Card.Content>
        <View style={styles.cardContent}>
          {initials && (
            <Avatar.Text
              size={DEFAULT_AVATAR_SIZE}
              label={initials}
              style={styles.cardAvatar}
            />
          )}
          <View style={styles.cardText}>
            <Text
              variant="titleMedium"
              accessibilityHint="Contact Name"
              testID="contact-name">
              {formattedName}
            </Text>
            <Text
              variant="labelMedium"
              accessibilityHint="Contact Phone Number"
              testID="contact-phone">
              {item.phoneNumber}
            </Text>
          </View>
          <View style={styles.cardActions}>
            <IconButton
              icon="pencil"
              size={ICON_SIZE}
              style={styles.cardActionIcon}
              testID="edit-contact"
              onPress={handleEditContact}
            />
            <IconButton
              icon="trash-can"
              size={ICON_SIZE}
              style={styles.cardActionIcon}
              testID="delete-contact"
              onPress={handleDeleteContact}
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

ContactCard.displayName = 'Contact Card';

export default ContactCard;
