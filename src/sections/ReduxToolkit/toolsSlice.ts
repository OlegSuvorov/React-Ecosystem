import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

const initialState: string[] = [];

export const toolsSlice = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
    },
    remove: (state, action: PayloadAction<string>) =>
      state.filter(tool => action.payload !== tool),
  },
})

export const { add, remove } = toolsSlice.actions

export const selectTools = (state: RootState) => state.tools;

export default toolsSlice.reducer;
