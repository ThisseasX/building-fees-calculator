import { createSelector } from '@reduxjs/toolkit';
import { defaultTo, filter, find, flow, get, map, size, sum } from 'lodash/fp';
import type { RootState } from 'state';
import { shouldShareFees } from './utils';

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

export const secondFloorDebt = (state: RootState) =>
  createSelector(overallTotal, residents, (overallTotal, residents) => {
    const secondFloorParticipation = flow(
      find({ floor: '2nd' }),
      get('participation'),
      defaultTo(0),
    )(residents);

    const secondFloorDebt = overallTotal * secondFloorParticipation;

    return secondFloorDebt;
  })(state);

export const fifthFloorDebt = (state: RootState) =>
  createSelector(overallTotal, residents, (overallTotal, residents) => {
    const fifthFloorParticipation = flow(
      find({ floor: '5th' }),
      get('participation'),
      defaultTo(0),
    )(residents);

    const fifthFloorDebt = overallTotal * fifthFloorParticipation;

    return fifthFloorDebt;
  })(state);

export const normalTotal = (state: RootState) =>
  createSelector(
    overallTotal,
    secondFloorDebt,
    fifthFloorDebt,
    (overallTotal, secondFloorDebt, fifthFloorDebt) =>
      overallTotal - secondFloorDebt - fifthFloorDebt,
  )(state);

export const ownersSharingFees = (state: RootState) =>
  createSelector(residents, (residents) =>
    flow(filter(shouldShareFees), size)(residents),
  )(state);
