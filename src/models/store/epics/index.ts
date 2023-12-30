import { combineEpics } from 'redux-observable';
import persistStore from './persistStore';

export const storeEpic = combineEpics(persistStore);
