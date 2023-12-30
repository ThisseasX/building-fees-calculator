import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { findIndex } from 'lodash/fp';
import type { Fee, Resident } from '@types';

type InitialState = {
  period: string;
  fees: Fee[];
  residents: Resident[];
};

const initialState: InitialState = {
  period: '',
  fees: [],
  residents: [],
};

export const buildingFeesSlice = createSlice({
  name: 'buildingFees',
  initialState,
  reducers: {
    setPeriod: (state, { payload }: PayloadAction<string>) => {
      state.period = payload;
    },
    addFee: (state, { payload }: PayloadAction<Fee>) => {
      state.fees?.push(payload);
    },
    removeFee: (state, { payload }: PayloadAction<string>) => {
      const index = findIndex({ id: payload }, state.fees);
      state.fees?.splice(index, 1);
    },
    clearFees: (state) => {
      state.fees = initialState.fees;
    },
    addResident: (state, { payload }: PayloadAction<Resident>) => {
      state.residents?.push(payload);
    },
    removeResident: (state, { payload }: PayloadAction<string>) => {
      const index = findIndex({ id: payload }, state.residents);
      state.residents?.splice(index, 1);
    },
    clearResidents: (state) => {
      state.residents = initialState.residents;
    },
  },
});

export const { reducer: buildingFeesReducer } = buildingFeesSlice;
