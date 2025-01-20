import { useAppDispatch, useAppSelector } from '../../core/store';
import {
  selectTodos,
  addTodo,
  updateTodo,
  removeTodo,
  selectCurrentItem,
  setCurrentItem,
} from './todo-slice';
import { TodoItemInterface as TodoItem } from '../../models';

export const useTodoViewModel = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);
  const currentItem = useAppSelector(selectCurrentItem);

  const saveTodoItem = (item: Omit<TodoItem, 'id'>) => {
    dispatch(addTodo(item));
  };

  const deleteTodoItem = (item: TodoItem) => {
    dispatch(removeTodo(item));
  };

  const updateTodoItem = (item: TodoItem) => {
    dispatch(updateTodo(item));
  };

  const setCurrentTodoItem = (item: TodoItem | undefined) => {
    dispatch(setCurrentItem(item));
  };

  return {
    todos,
    currentItem,
    deleteTodoItem,
    saveTodoItem,
    updateTodoItem,
    setCurrentTodoItem,
  };
};
