import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  title: '',
  content: '',
  onConfirm: null,
  onCancel: null,
};

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: (state, action) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.onConfirm = action.payload.onConfirm || null;
      state.onCancel = action.payload.onCancel || null;
    },
    closeDialog: (state) => {
      state.isOpen = false;
    },
  },
});

export const store = configureStore({
  reducer: {
    dialog: dialogSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
