import type { Resident } from '@types';

export const isAbsentTenant = ({ floor }: Resident) =>
  ['2nd', '5th'].includes(floor);

export const shouldShareFees = (resident: Resident) =>
  resident?.isOwner && !isAbsentTenant(resident);
