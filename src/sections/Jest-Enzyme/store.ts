import { configureStore } from '@reduxjs/toolkit';
import toolReducer from './toolsSlice';

export const store = configureStore({
  reducer: {
    tools: toolReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
