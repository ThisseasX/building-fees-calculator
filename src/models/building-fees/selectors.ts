import type { RootState } from 'state';

export const buildingFees = (state: RootState) => state.buildingFees;
export const period = (state: RootState) => state.buildingFees.period;
export const fees = (state: RootState) => state.buildingFees.fees;
export const residents = (state: RootState) => state.buildingFees.residents;
