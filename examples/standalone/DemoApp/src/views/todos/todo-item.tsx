import React, { useEffect, useRef, useState } from 'react';
import { NativeSyntheticEvent, StyleSheet, View } from 'react-native';
import {
  Card,
  Text,
  TextInput,
  Checkbox,
  IconButton,
} from 'react-native-paper';
import { TodoItemInterface } from '../../models';
import { useTodoViewModel } from './todos-view-model';
import { ICON_SIZE } from '../../constants';
import { TextInputEndEditingEventData } from 'react-native';

interface TodoItemProps {
  item: TodoItemInterface;
}

const TodoItem = ({ item }: TodoItemProps) => {
  const { updateTodoItem, deleteTodoItem, setCurrentTodoItem, currentItem } =
    useTodoViewModel();
  const [isComplete, setIsComplete] = useState(item.completed);
  const [description, setDescription] = useState(item.description);
  const inputRef = useRef(null);
  const isEditable = item.id === currentItem?.id;

  const handleToggleCheckbox = () => {
    updateTodoItem({ ...item, completed: !isComplete });
    setIsComplete((prev) => !prev);
  };

  const handleDeleteItem = () => deleteTodoItem(item);

  const handleCardPress = () => {
    setCurrentTodoItem(undefined);
    // don't allow edits for completed items
    if (item.completed) {
      return;
    }

    setCurrentTodoItem(item);
  };

  const handleDescriptionEndEditing = (
    event: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => {
    if (!description) {
      return;
    }

    updateTodoItem({ ...item, description });
    setCurrentTodoItem(undefined);
  };

  return (
    <Card style={styles.itemContainer} onPress={handleCardPress}>
      <Card.Content style={styles.cardContainer}>
        <View style={styles.itemContent}>
          <Checkbox.Android
            status={isComplete ? 'checked' : 'unchecked'}
            onPress={handleToggleCheckbox}
            testID="todo-checkbox"
          />
          {!isEditable ? (
            <Text
              style={[isComplete && styles.textCompleted]}
              testID="todo-description">
              {description}
            </Text>
          ) : (
            <View
              style={{
                flex: 5,
                flexDirection: 'row',
                alignItems: 'flex-start',
                borderColor: 'red',
                borderWidth: 1,
              }}>
              <TextInput
                label="Update To Do Description"
                value={description}
                onChangeText={(value) => setDescription(value)}
                ref={inputRef}
                style={{ width: '100%' }}
                onEndEditing={handleDescriptionEndEditing}
              />
            </View>
          )}
          <View style={styles.cardActions}>
            <IconButton
              icon="trash-can"
              size={ICON_SIZE}
              style={styles.cardActionIcon}
              testID="delete-contact"
              onPress={handleDeleteItem}
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

TodoItem.displayName = 'Todo Item';

export default TodoItem;

const styles = StyleSheet.create({
  itemContainer: {
    margin: 5,
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  itemEdit: {
    width: '70%',
    flex: 1,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
  },
  cardContainer: {
    margin: 5,
  },
  cardContent: {
    flex: 2,
    flexDirection: 'row',
    alignContent: 'center',
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
