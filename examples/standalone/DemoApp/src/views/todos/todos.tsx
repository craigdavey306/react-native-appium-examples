import React, { useState } from 'react';
import { Appbar, Surface } from 'react-native-paper';
import { styles } from './styles';
import { useTodoViewModel } from './todos-view-model';
import TodoList from './todo-list';
import { useAuth } from '../../core/auth';

const TodosView = (): React.JSX.Element => {
  const { todos, setCurrentTodoItem } = useTodoViewModel();
  const { logout } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <Appbar.Header statusBarHeight={0}>
        <Appbar.Content title="To Do List" />
        <Appbar.Action
          icon="logout-variant"
          onPress={logout}
          disabled={isModalVisible}
          accessibilityLabel="Logout Button"
          testID="logout"
        />
      </Appbar.Header>

      <Surface style={styles.container} elevation={0}>
        <TodoList todos={todos} />
      </Surface>
    </>
  );
};

export default TodosView;
