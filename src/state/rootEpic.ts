import { combineEpics } from 'redux-observable';
import { storeEpic } from 'models/store';

export default combineEpics(storeEpic);
