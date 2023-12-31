import React, { useState, useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { connect, ConnectedProps } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { isEmpty, some } from 'lodash/fp';
import { addFee, clearFees } from 'models/building-fees';
import { Fees } from 'components';
import styles from './styles';

type Props = ConnectedProps<typeof connector>;

const FeesArea = ({ addFee, clearFees }: Props) => {
  const [reason, setReason] = useState('');
  const [amount, setAmount] = useState('');
  const [isForOwners, setIsForOwners] = useState(false);

  const isAddDisabled = useMemo(
    () => some(isEmpty)([reason, amount]),
    [reason, amount],
  );

  const handleReasonChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setReason(value);
    },
    [],
  );

  const handleAmountChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      if (Number.isNaN(Number(value))) return;

      setAmount(value);
    },
    [],
  );

  const handleToggleIsForOwners = useCallback(() => {
    setIsForOwners((prev) => !prev);
  }, []);

  const handleAddFee = useCallback(() => {
    addFee({
      id: uuid(),
      reason,
      amount: Number(amount),
      isForOwners,
    });
  }, [addFee, reason, amount, isForOwners]);

  const handleClearFees = useCallback(() => {
    clearFees();
  }, [clearFees]);

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

      <FormControlLabel
        checked={isForOwners}
        label="Owners"
        control={<Checkbox />}
        onChange={handleToggleIsForOwners}
      />

      <Button
        size="small"
        variant="contained"
        onClick={handleAddFee}
        disabled={isAddDisabled}
      >
        Add Fee
      </Button>

      <Button
        size="small"
        variant="contained"
        color="error"
        onClick={handleClearFees}
        disabled
      >
        Clear Fees
      </Button>

      <Fees />
    </Box>
  );
};

const connector = connect(undefined, {
  addFee,
  clearFees,
});

export default connector(FeesArea);
