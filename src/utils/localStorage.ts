export const getLocalStorageValue = (key: string) => {
  try {
    const value = localStorage.getItem(key) || '';
    return JSON.parse(value);
  } catch {
    return undefined;
  }
};

export const setLocalStorageValue = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
