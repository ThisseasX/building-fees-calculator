import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { connect, ConnectedProps } from 'react-redux';
import {
  residents,
  secondFloorDebt,
  fifthFloorDebt,
  tenantTotal,
  ownerTotal,
  overallTotal,
  normalTotal,
  ownersSharingFees,
  isAbsentTenant,
  shouldShareFees,
} from 'models/building-fees';
import { RootState } from 'state';
import { roundNumber } from 'utils';
import { find } from 'lodash/fp';
import { Resident } from '@types';

type Props = ConnectedProps<typeof connector>;

const FeesTable = ({
  residents,
  secondFloorDebt,
  fifthFloorDebt,
  tenantTotal,
  ownerTotal,
  overallTotal,
  normalTotal,
  ownersSharingFees,
}: Props) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell align="center">Floor</TableCell>
        <TableCell align="center">Participation</TableCell>
        <TableCell align="center">Normal Debt</TableCell>
        <TableCell align="center">2nd Floor Debt</TableCell>
        <TableCell align="center">5th Floor Debt</TableCell>
        <TableCell align="center">Total</TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {residents.map((resident) => {
        const { id, name, floor, participation, isOwner } = resident;

        const shouldShare = shouldShareFees(resident);

        const { participation: ownerParticipation = 0 } = (find({
          floor,
          isOwner: true,
        })(residents) ||
          (floor === "Ground B'" && find({ floor: '4th' })(residents)) ||
          {}) as Resident;

        const { participation: tenantParticipation = 0 } = (find({
          floor,
          isOwner: false,
        })(residents) ||
          (floor === '4th' && find({ floor: "Ground B'" })(residents)) ||
          {}) as Resident;

        const ownerDebt = ownerTotal * ownerParticipation;
        const ownerTenantDebt = tenantTotal * ownerParticipation;
        const tenantOwnerDebt = ownerTotal * tenantParticipation;
        const tenantDebt = tenantTotal * tenantParticipation;

        const firstOwnerDebt = roundNumber(
          floor === "Ground A'" && isOwner ? tenantOwnerDebt : 0,
        );

        const normalDebt = roundNumber(
          isOwner ? ownerDebt + ownerTenantDebt + tenantOwnerDebt : tenantDebt,
        );

        const debt2nd = roundNumber(
          shouldShare ? secondFloorDebt / ownersSharingFees : 0,
        );

        const debt5th = roundNumber(
          shouldShare ? fifthFloorDebt / ownersSharingFees : 0,
        );

        const totalDebt = isAbsentTenant(resident)
          ? 0
          : roundNumber((firstOwnerDebt || normalDebt) + debt2nd + debt5th);

        return (
          <TableRow key={id}>
            <TableCell>{name}</TableCell>
            <TableCell align="center">{floor}</TableCell>
            <TableCell align="center">
              {(participation * 100).toFixed(2)}%
            </TableCell>
            <TableCell align="center">
              {(firstOwnerDebt || normalDebt).toFixed(2)}
            </TableCell>
            <TableCell align="center">{debt2nd.toFixed(2)}</TableCell>
            <TableCell align="center">{debt5th.toFixed(2)}</TableCell>
            <TableCell align="center">{totalDebt.toFixed(2)}</TableCell>
          </TableRow>
        );
      })}

      <TableRow>
        <TableCell>Total</TableCell>
        <TableCell />
        <TableCell />
        <TableCell align="center">{normalTotal}</TableCell>
        <TableCell align="center">{secondFloorDebt}</TableCell>
        <TableCell align="center">{fifthFloorDebt}</TableCell>
        <TableCell align="center">{overallTotal}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

const connector = connect((state: RootState) => ({
  residents: residents(state),
  secondFloorDebt: secondFloorDebt(state),
  fifthFloorDebt: fifthFloorDebt(state),
  tenantTotal: tenantTotal(state),
  ownerTotal: ownerTotal(state),
  overallTotal: overallTotal(state),
  normalTotal: normalTotal(state),
  ownersSharingFees: ownersSharingFees(state),
}));

export default connector(FeesTable);
