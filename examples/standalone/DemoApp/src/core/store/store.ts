import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { contactSlice } from '../../views';
import { todoSlice } from '../../views/todos/todo-slice';

export const store = configureStore({
  reducer: {
    contact: contactSlice.reducer,
    todo: todoSlice.reducer,
  },
});

// Infer `RootState` and `AppDispatch` from the store.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
