import React from 'react';
import { Appbar, Surface } from 'react-native-paper';
import { styles } from './styles';
import { useTodoViewModel } from './todos-view-model';
import TodoList from './todo-list';
import { useAuth } from '../../core/auth';

const TodosView = (): React.JSX.Element => {
  const { todos } = useTodoViewModel();
  const { logout } = useAuth();

  return (
    <>
      <Appbar.Header statusBarHeight={0}>
        <Appbar.Content title="To Do List" testID="todos-container" />
        <Appbar.Action
          icon="logout-variant"
          onPress={logout}
          accessibilityLabel="Logout Button"
          testID="logout-btn"
        />
      </Appbar.Header>

      <Surface style={styles.container} elevation={0}>
        <TodoList todos={todos} />
      </Surface>
    </>
  );
};

export default TodosView;
