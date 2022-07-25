import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useParams } from "react-router-dom";

import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import {getCustomerById} from '../services/Customer';
import {getSalesOpportunities, createSalesOpportunity, updateSalesOpportunity} from '../services/SalesOpportunity';

import AddSalesOpportunityFormDialog from '../components/AddSalesOpportunityFormDialog';

import '../Customer.css';

function Customer() {

  const [salesOpportunities, setSalesOpportunities] = useState({columns: [], rows: []});
  const [customer, setCustomer] = useState({});

  let params = useParams();
  useEffect(() => {
    getCustomerById(params.customerId).then(c => setCustomer(c));
    getSalesOpportunities(params.customerId).then(function(salesOpps) {
      setSalesOpportunities(salesOpps);
    });  
  }, []);

  function addSalesOpportunity(salesOpp) {
    createSalesOpportunity(salesOpp)
      .then(function (salesOpp) {
        setSalesOpportunities({columns: salesOpportunities.columns, rows: [...salesOpportunities.rows, salesOpp]});
      })
      .catch(function (error) {
        //notify user of error adding sales opportunity
      });
  }

  const mutateRow = React.useCallback(
    (salesOpp) => updateSalesOpportunity(salesOpp),
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

  return (
    <main className='App'>
      <h2>Customer</h2>  
      <table>
        <tr>
          <td><b>Id</b></td>
          <td>{customer._id}</td>
        </tr>
        <tr>
          <td><b>Name</b></td>
          <td>{customer.name}</td>
        </tr>
        <tr>
          <td><b>Phone</b></td>
          <td>{customer.phoneNumber}</td>
        </tr>
        <tr>
          <td><b>Email</b></td>
          <td>{customer.email}</td>
        </tr>
        <tr>
          <td><b>Status</b></td>
          <td>{customer.status}</td>
        </tr>
      </table>

      <h3>Sales Opportunities</h3>
      <AddSalesOpportunityFormDialog customer={customer} addSalesOpportunity={addSalesOpportunity}/>
      <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={salesOpportunities.rows}
        columns={salesOpportunities.columns}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        experimentalFeatures={{ newEditingApi: true }}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </Box>
    </main>
  );
}

export default Customer;