import React, { useState, useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { connect, ConnectedProps } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { isEmpty, some } from 'lodash/fp';
import { addResident, clearResidents } from 'models/building-fees';
import { Residents } from 'components';
import styles from './styles';

type Props = ConnectedProps<typeof connector>;

const ResidentsArea = ({ addResident, clearResidents }: Props) => {
  const [name, setName] = useState('');
  const [floor, setFloor] = useState('');
  const [participation, setParticipation] = useState('');
  const [isOwner, setIsOwner] = useState(true);

  const isAddDisabled = useMemo(
    () => some(isEmpty)([name, floor, participation]),
    [name, floor, participation],
  );

  const handleNameChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setName(value);
    },
    [],
  );

  const handleFloorChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setFloor(value);
    },
    [],
  );

  const handleParticipationChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      if (Number.isNaN(Number(value))) return;

      setParticipation(value);
    },
    [],
  );

  const handleClearResidents = useCallback(() => {
    clearResidents();
  }, [clearResidents]);

  const handleToggleIsOwner = useCallback(() => {
    setIsOwner((prev) => !prev);
  }, []);

  const handleAddResident = useCallback(() => {
    addResident({
      id: uuid(),
      name,
      floor,
      participation: (Number(participation) || 0) / 100,
      isOwner,
    });
  }, [addResident, name, floor, participation, isOwner]);

  return (
    <Box sx={styles.root}>
      <TextField
        size="small"
        label="Name"
        value={name}
        onChange={handleNameChange}
      />

      <TextField
        size="small"
        label="Floor"
        value={floor}
        onChange={handleFloorChange}
      />

      <TextField
        size="small"
        label="Participation"
        value={participation}
        onChange={handleParticipationChange}
      />

      <FormControlLabel
        checked={isOwner}
        label="Owner"
        control={<Checkbox />}
        onChange={handleToggleIsOwner}
      />

      <Button
        size="small"
        variant="contained"
        onClick={handleAddResident}
        disabled={isAddDisabled}
      >
        Add Resident
      </Button>

      <Button
        size="small"
        variant="contained"
        color="error"
        onClick={handleClearResidents}
        disabled
      >
        Clear Residents
      </Button>

      <Residents />
    </Box>
  );
};

const connector = connect(undefined, {
  addResident,
  clearResidents,
});

export default connector(ResidentsArea);
