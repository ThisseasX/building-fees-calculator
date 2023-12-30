import React from 'react';
import CachedIcon from '@mui/icons-material/Cached';
import { connect, ConnectedProps } from 'react-redux';
import { isSaving } from 'models/store';
import { RootState } from 'state';
import styles from './styles';

type Props = ConnectedProps<typeof connector>;

const SavingIndicator = ({ isSaving }: Props) =>
  isSaving && <CachedIcon sx={styles.root} fontSize="large" color="success" />;

const connector = connect((state: RootState) => ({
  isSaving: isSaving(state),
}));

export default connector(SavingIndicator);
