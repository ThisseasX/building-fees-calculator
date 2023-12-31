import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { connect, ConnectedProps } from 'react-redux';
import {
  fees,
  overallTotal,
  ownerTotal,
  tenantTotal,
} from 'models/building-fees';
import { RootState } from 'state';

type Props = ConnectedProps<typeof connector>;

const Fees = ({ fees, tenantTotal, ownerTotal, overallTotal }: Props) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Reason</TableCell>
        <TableCell align="center">Amount</TableCell>
        <TableCell align="center">Owners</TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {fees.map(({ id, reason, amount, isForOwners }) => (
        <TableRow key={id}>
          <TableCell>{reason}</TableCell>
          <TableCell align="center">{amount}</TableCell>
          <TableCell align="center">{isForOwners ? 'Yes' : 'No'}</TableCell>
        </TableRow>
      ))}

      <TableRow>
        <TableCell>Tenant Total</TableCell>
        <TableCell />
        <TableCell align="center">{tenantTotal}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell>Owner Total</TableCell>
        <TableCell />
        <TableCell align="center">{ownerTotal}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell>Overall Total</TableCell>
        <TableCell />
        <TableCell align="center">{overallTotal}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

const connector = connect((state: RootState) => ({
  fees: fees(state),
  tenantTotal: tenantTotal(state),
  ownerTotal: ownerTotal(state),
  overallTotal: overallTotal(state),
}));

export default connector(Fees);
