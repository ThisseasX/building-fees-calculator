import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  isSaving: boolean;
};

const initialState: InitialState = {
  isSaving: false,
};

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    startSaving: (state) => {
      state.isSaving = true;
    },
    stopSaving: (state) => {
      state.isSaving = false;
    },
  },
});

export const { reducer: storeReducer } = storeSlice;
