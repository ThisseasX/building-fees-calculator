import { Epic, combineEpics } from 'redux-observable';
import { map, merge, of, pairwise, filter, delay, switchMap } from 'rxjs';
import { negate } from 'lodash/fp';
import { filterModelChanges } from 'utils';
import { isSaving } from '../selectors';
import { startSaving, stopSaving } from '../actions';

const persistStoreEpic: Epic = (_, state$) =>
  state$.pipe(
    pairwise(),
    filterModelChanges(),
    switchMap(([, state]) =>
      merge(
        of(state).pipe(
          filter(negate(isSaving)),
          map(() => startSaving()),
        ),
        of(state).pipe(
          delay(1000),
          map((state) => {
            localStorage.setItem('state', JSON.stringify(state));

            return stopSaving();
          }),
        ),
      ),
    ),
  );

export default combineEpics(persistStoreEpic);
