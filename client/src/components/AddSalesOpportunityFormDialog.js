import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useParams } from "react-router-dom";

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

function SalesOppStatusSelect(props) {
  const [salesOppStatus, setSalesOppStatus] = React.useState('');

  const handleChange = (event) => {
    setSalesOppStatus(event.target.value);
    props.setSalesOppStatus(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, marginTop: '8px' }}>
      <FormControl fullWidth>
        <InputLabel id="sales-opp-status-select-label" 
            margin="dense">Status</InputLabel>
        <Select
          labelId="sales-opp-status-select-label"
          id="sales-opp-status-select"
          value={salesOppStatus}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value='New'>New</MenuItem>
          <MenuItem value='Closed Won'>Closed Won</MenuItem>
          <MenuItem value='Closed Lost'>Closed Lost</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

function AddSalesOpportunityFormDialog(props) {
  const [name, setName] = React.useState();
  const [status, setStatus] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [customerStatus, setCustomerStatus] = React.useState(false);
  const [loading, setLoading] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickAddSalesOpp = (event) => {
    setLoading(true);
    setTimeout(function(){
      props.addSalesOpportunity({customer: props.customer._id, name, status});
      setName('');
      setOpen(false);
      setLoading(false);
    }, 2000);
  }

  const handleChangeCustomerStatus = (event) => {
    setCustomerStatus(event.target.value);
  };

  function setSalesOppStatus(status) {
    setStatus(status);
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        New Sales Opportunity
      </Button>
      <Dialog open={open} onClose={handleClose} 
        fullWidth='true'
        maxWidth='sm'>
        <DialogTitle>New Sales Opportunity</DialogTitle>
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
          <SalesOppStatusSelect setSalesOppStatus={setSalesOppStatus}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            onClick={handleClickAddSalesOpp}
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

export default AddSalesOpportunityFormDialog;