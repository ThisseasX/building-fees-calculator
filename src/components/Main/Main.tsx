import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { connect, ConnectedProps } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { fees, addFee, clearFees } from 'models/building-fees';
import { RootState } from 'state';
import styles from './styles';

type Props = ConnectedProps<typeof connector>;

const Main = ({ fees, addFee, clearFees }: Props) => {
  const [reason, setReason] = useState('');
  const [amount, setAmount] = useState('');

  const handleReasonChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setReason(value);
  };

  const handleAmountChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(Number(value))) return;

    setAmount(value);
  };

  const handleAddFee = () => {
    addFee({
      id: uuid(),
      reason,
      amount: Number(amount),
      isForOwners: true,
    });
  };

  const handleClearFees = () => {
    clearFees();
  };

  return (
    <Box sx={styles.root}>
      <TextField
        size="small"
        label="Reason"
        value={reason}
        onChange={handleReasonChange}
      />

      <TextField
        size="small"
        label="Amount"
        value={amount}
        onChange={handleAmountChange}
      />

      <Button size="small" variant="contained" onClick={handleAddFee}>
        Add Fee
      </Button>

      <Button
        size="small"
        variant="contained"
        color="error"
        onClick={handleClearFees}
      >
        Clear Fees
      </Button>

      {fees.map(({ id, reason, amount, isForOwners }) => (
        <div key={id}>
          <div>Reason: {reason}</div>
          <div>Amount: {amount}</div>
          <div>Is for owners: {isForOwners ? 'Yes' : 'No'}</div>
        </div>
      ))}
    </Box>
  );
};

const connector = connect(
  (state: RootState) => ({
    fees: fees(state),
  }),
  {
    addFee,
    clearFees,
  },
);

export default connector(Main);
