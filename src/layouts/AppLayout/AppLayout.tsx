import React from 'react';
import Box from '@mui/material/Box';
import { SavingIndicator } from 'components';
import styles from './styles';

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => (
  <Box sx={styles.root}>
    {children}
    <SavingIndicator />
  </Box>
);

export default AppLayout;
