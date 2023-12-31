import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { connect, ConnectedProps } from 'react-redux';
import { residents } from 'models/building-fees';
import { RootState } from 'state';

type Props = ConnectedProps<typeof connector>;

const Residents = ({ residents }: Props) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell align="center">Floor</TableCell>
        <TableCell align="center">Participation</TableCell>
        <TableCell align="center">Owner</TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {residents.map(({ id, name, floor, participation, isOwner }) => (
        <TableRow key={id}>
          <TableCell>{name}</TableCell>
          <TableCell align="center">{floor}</TableCell>
          <TableCell align="center">{participation * 100}%</TableCell>
          <TableCell align="center">{isOwner ? 'Yes' : 'No'}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const connector = connect((state: RootState) => ({
  residents: residents(state),
}));

export default connector(Residents);
