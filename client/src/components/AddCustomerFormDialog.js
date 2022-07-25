import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

function AddCustomerFormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);


  const [name, setName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [customerStatus, setCustomerStatus] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickAddCustomer = (event) => {
    // disable submit buttons, create customer in backend, notify user result of operation.
    setLoading(true);
    setTimeout(function(){

      props.addCustomer({name, phoneNumber, email, status: customerStatus});

      setOpen(false);
      setLoading(false);
    }, 2000);
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        New Customer
      </Button>
      <Dialog open={open} onClose={handleClose} 
        fullWidth='true'
        maxWidth='sm'>
        <DialogTitle>New Customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(val) => {setName(val.target.value)}}
            value={name}
          />
          <TextField
            autoFocus
            margin="dense"
            id="phoneNumber"
            label="Phone"
            type="text"
            fullWidth
            variant="standard"
            onChange={(val) => {setPhoneNumber(val.target.value)}}
            value={phoneNumber}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(val) => {setEmail(val.target.value)}}
            value={email}
          />
          <CustomerStatusSelect setCustomerStatus={setCustomerStatus}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            onClick={handleClickAddCustomer}
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function CustomerStatusSelect(props) {
  const [cusomterStatus, setCusomterStatus] = React.useState('');

  const handleChange = (event) => {
    setCusomterStatus(event.target.value);
    props.setCustomerStatus(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, marginTop: '8px' }}>
      <FormControl fullWidth>
        <InputLabel id="cusomter-status-select-label" 
            margin="dense">Status</InputLabel>
        <Select
          labelId="cusomter-status-select-label"
          id="cusomter-status-select"
          value={cusomterStatus}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value='Active'>Active</MenuItem>
          <MenuItem value='Non-Active'>Non-Active</MenuItem>
          <MenuItem value='Lead'>Lead</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default AddCustomerFormDialog;