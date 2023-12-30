import type { RootState } from 'state';

export const isSaving = (state: RootState) => state.store.isSaving;
