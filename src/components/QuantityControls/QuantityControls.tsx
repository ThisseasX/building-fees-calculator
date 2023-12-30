import React from 'react';
import { castArray } from 'lodash/fp';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { SxProps } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import styles from './styles';

type Props = {
  sx?: SxProps;
  value: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: number) => void;
};

const QuantityControls = ({ sx = {}, value, onChange }: Props) => {
  const increment = () => {
    onChange(value + 1);
  };

  const decrement = () => {
    onChange(value - 1);
  };

  return (
    <Box sx={[styles.root, ...castArray(sx)]}>
      <Button onClick={decrement} sx={styles.block}>
        <KeyboardArrowDownIcon />
      </Button>

      <Typography sx={styles.block}>{value}</Typography>

      <Button onClick={increment} sx={styles.block}>
        <KeyboardArrowUpIcon />
      </Button>
    </Box>
  );
};

QuantityControls.defaultProps = {
  sx: {},
};

export default QuantityControls;
