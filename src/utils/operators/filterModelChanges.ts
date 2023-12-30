import { __, eq, every, flow, map, negate, spread } from 'lodash/fp';
import { buildingFees } from 'models/building-fees';
import { filter } from 'rxjs';

const allModelSelectors = [buildingFees];

export const filterModelChanges = () =>
  filter(([prev, curr]) =>
    every(
      flow(
        map(__, [prev, curr]), //
        spread(negate(eq)),
      ),
    )(allModelSelectors),
  );
