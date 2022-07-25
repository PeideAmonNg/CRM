import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import {getCustomers, createCustomer, updateCustomer} from '../services/Customer';

import '../App.css';

import AddCustomerFormDialog from '../components/AddCustomerFormDialog';

function Customers() {
  const [customers, setCustomers] = useState({columns: [], rows: []});
  const [isInitialised, setIsInitialised] = useState(false);

  useEffect(() => {
      getCustomers().then(customers => {
        setCustomers(customers);  
      });
  }, []);


  const mutateRow = React.useCallback(
    (customer) => updateCustomer(customer),
    [],
  );

  const processRowUpdate = React.useCallback(
    async (newRow) => {
      // Make the HTTP request to save in the backend
      const response = await mutateRow(newRow);
      return response;
    },
    [mutateRow],
  );

  const handleProcessRowUpdateError = React.useCallback((error) => {
    //notify user of error updating row
  });

  function addCustomer(customer) {
    createCustomer(customer).then(function (customer) {
        setCustomers({columns: customers.columns, rows: [...customers.rows, customer]});
      })
      .catch(function (error) {
        //notify user of error adding customer
      });;
  }

  return (
    <div className="App" id="App">
      <h1>Customers</h1>
      <AddCustomerFormDialog addCustomer={addCustomer}/>
      <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={customers.rows}
        columns={customers.columns}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        experimentalFeatures={{ newEditingApi: true }}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
    </div>
  );
}

export default Customers;
