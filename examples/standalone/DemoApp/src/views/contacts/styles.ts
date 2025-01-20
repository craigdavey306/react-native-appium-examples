import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  listContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  listItemName: {
    fontSize: 16,
  },
  listItemPhone: {
    fontSize: 12,
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '90%',
    height: '90%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  modalFormItem: {
    marginBottom: 8,
  },
  cardContainer: {
    margin: 5,
  },
  cardContent: {
    flex: 2,
    flexDirection: 'row',
    alignContent: 'center',
    gap: 16,
  },
  cardAvatar: {
    alignSelf: 'center',
  },
  cardText: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  cardActions: {
    justifyContent: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  cardActionIcon: {
    width: 25,
  },
});
