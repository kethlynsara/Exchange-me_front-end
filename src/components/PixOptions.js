import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import UserContext from '../contexts/UserContext';

export default function BasicSelect() {
  const { pix, setPix } = React.useContext(UserContext);

  const handleChange = (event) => {
    setPix(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Pix</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={pix}
          label="Pix"
          onChange={handleChange}
        >
          <MenuItem value={10}>CPF</MenuItem>
          <MenuItem value={20}>Email</MenuItem>
          <MenuItem value={30}>Telefone</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
