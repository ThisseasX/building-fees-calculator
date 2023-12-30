import { buildingFeesSlice } from './slice';

export const {
  setPeriod,
  addFee,
  removeFee,
  clearFees,
  addResident,
  removeResident,
  clearResidents,
} = buildingFeesSlice.actions;
