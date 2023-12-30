export type Fee = {
  id: string;
  reason: string;
  amount: number;
  isForOwners: boolean;
};

export type Resident = {
  id: string;
  name: string;
  floor: string;
  participation: number;
  isOwner: boolean;
};
