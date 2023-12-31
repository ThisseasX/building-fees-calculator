import { createSelector } from '@reduxjs/toolkit';
import { filter, flow, map, sum } from 'lodash/fp';
import type { RootState } from 'state';

export const buildingFees = (state: RootState) => state.buildingFees;
export const period = (state: RootState) => state.buildingFees.period;
export const fees = (state: RootState) => state.buildingFees.fees;
export const residents = (state: RootState) => state.buildingFees.residents;

export const tenantTotal = (state: RootState) =>
  createSelector(fees, (fees) =>
    flow(
      filter({ isForOwners: false }), //
      map('amount'),
      sum,
    )(fees),
  )(state);

export const ownerTotal = (state: RootState) =>
  createSelector(fees, (fees) =>
    flow(
      filter({ isForOwners: true }), //
      map('amount'),
      sum,
    )(fees),
  )(state);

export const overallTotal = (state: RootState) =>
  createSelector(fees, (fees) =>
    flow(
      map('amount'), //
      sum,
    )(fees),
  )(state);
