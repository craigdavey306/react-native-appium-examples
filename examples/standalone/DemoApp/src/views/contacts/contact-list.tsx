import React from 'react';
import { FlatList } from 'react-native';
import { ContactInterface } from '../../models';
import { styles } from './styles';
import { useContactViewModel } from './contacts-view-model';
import ContactCard from './contact-card';
import { Spacer } from '../../components/spacer';

const INITIAL_NUMBER_TO_RENDER = 7;
const LIST_END_THRESHOLD = 5;
const ITEM_HEIGHT = 50;

interface ContactListProps {
  contacts: ContactInterface[];
  capacity: number;
  openEditModal: () => void;
}

const getItemLayout = (
  data: ArrayLike<ContactInterface> | null | undefined,
  index: number,
) => {
  return {
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  };
};

const ContactList = ({
  contacts,
  capacity,
  openEditModal,
}: ContactListProps): React.JSX.Element => {
  const { loadMore } = useContactViewModel();

  return (
    <FlatList
      data={contacts}
      renderItem={({ item }) => (
        <ContactCard item={item} openEditModal={openEditModal} />
      )}
      getItemLayout={getItemLayout}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={Spacer}
      initialNumToRender={INITIAL_NUMBER_TO_RENDER}
      onEndReached={() => loadMore(capacity)}
      onEndReachedThreshold={LIST_END_THRESHOLD}
      style={styles.listContainer}
    />
  );
};

ContactList.displayName = 'Contact List';

export default ContactList;
