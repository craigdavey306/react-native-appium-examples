import { BottomNavigationRoute } from 'react-native-paper';

export const appRoutes: ReadonlyArray<BottomNavigationRoute> = [
  {
    key: 'contacts',
    title: 'Contacts',
    focusedIcon: 'contacts',
    unfocusedIcon: 'contacts-outline',
    testID: 'contacts-tab',
    accessibilityLabel: 'Contacts',
  },
  {
    key: 'todos',
    title: 'To Do List',
    focusedIcon: 'view-list',
    unfocusedIcon: 'view-list-outline',
    testID: 'todos-tab',
    accessibilityLabel: 'To Do List',
  },
];
