import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import { TodoItemInterface as TodoItem } from '../../models';
import { RootState } from '../../core/store';

export interface TodoState {
  todos: TodoItem[];
  currentItem?: TodoItem;
}

const initialState: TodoState = {
  todos: [
    { id: nanoid(), description: 'Learn Appium', completed: false },
    { id: nanoid(), description: 'Write Appium Tests', completed: false },
  ],
};

const sliceName = 'todo';

export const todoSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action: PayloadAction<TodoItem>) {
        state.todos.push(action.payload);
      },
      prepare(item: Omit<TodoItem, 'id'>) {
        return {
          payload: { id: nanoid(), ...item },
        };
      },
    },
    // remove a todo item
    removeTodo: (state, action: PayloadAction<TodoItem>) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload.id);
    },
    // update todo item
    updateTodo: (state, action: PayloadAction<TodoItem>) => {
      state.todos = state.todos.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        }

        return item;
      });
    },
    setCurrentItem: (state, action: PayloadAction<TodoItem | undefined>) => {
      state.currentItem = action.payload;
    },
  },
});

export const { addTodo, removeTodo, updateTodo, setCurrentItem } =
  todoSlice.actions;
export const selectTodos = (state: RootState) => state.todo.todos;
export const selectCurrentItem = (state: RootState) => state.todo.currentItem;
