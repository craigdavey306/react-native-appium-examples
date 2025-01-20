import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useTodoViewModel } from './todos-view-model';
import { TodoItemInterface } from '../../models';
import TodoItem from './todo-item';
import { Spacer } from '../../components/spacer';
import { styles } from './styles';

interface TodoListProps {
  todos: TodoItemInterface[];
}

const TodoList = ({ todos }: TodoListProps): React.JSX.Element => {
  const { saveTodoItem, setCurrentTodoItem } = useTodoViewModel();
  const [newToDoText, setNewToDoText] = useState('');

  const handleNewToDoTextChange = (text: string) => {
    setNewToDoText(text);
  };

  const handleAddNewToDoItem = () => {
    saveTodoItem({ description: newToDoText, completed: false });
    setNewToDoText('');
  };

  return (
    <View style={styles.todoListContainer}>
      <TextInput
        label="New To Do Item"
        testID="new-todo-item"
        onChangeText={handleNewToDoTextChange}
        onPress={() => setCurrentTodoItem(undefined)}
        onEndEditing={handleAddNewToDoItem}
        value={newToDoText}
        right={
          <TextInput.Icon
            icon="plus"
            disabled={!Boolean(newToDoText)}
            onPress={handleAddNewToDoItem}
          />
        }
      />
      <Spacer height={20} />
      <FlatList
        data={todos}
        renderItem={({ item }) => <TodoItem item={item} />}
        keyExtractor={(item) => item.id}
        testID="todo-list"
      />
    </View>
  );
};

export default TodoList;
