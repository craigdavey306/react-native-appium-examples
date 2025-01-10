import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import { ContactsView, TodosView } from '../../views';
import { appRoutes } from '../../routers';

export const AuthorizedNavigator = (): React.JSX.Element => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([...appRoutes]);

  const renderScene = BottomNavigation.SceneMap({
    contacts: ContactsView,
    todos: TodosView,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ height: 80 }}
    />
  );
};
