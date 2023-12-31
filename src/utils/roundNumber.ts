export const roundNumber = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100;

export const roundNumberFixed = (num: number) =>
  (roundNumber(num) || 0).toFixed(2);
