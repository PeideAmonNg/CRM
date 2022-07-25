const axios = require('axios').default;

const columns = [
  { field: 'id', headerName: 'ID', width: 250 },
  {
    field: 'status',
    headerName: 'Status',
    type: 'singleSelect',
    valueOptions: ['New', 'Closed Won', 'Closed Lost'],
    width: 110,
    editable: true,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 400,
    editable: true,
  }
];

async function getSalesOpportunities(customerId) {
  try{
    let res = await axios.get('http://localhost:8000/customers/' + customerId  + '/sales-opportunities');
    console.log('sales opps res', res);
    let salesOpps = res.data;
    salesOpps.forEach(element => element.id = element._id);
    return {columns, rows: salesOpps};
  } catch(e) {
    return {columns, rows: []};
  }
}

async function createSalesOpportunity(salesOpp) {
  salesOpp = salesOpp || {};  
  try {
    let res = await axios.post('http://localhost:8000/sales-opportunities', salesOpp);
    console.log('res.data', res.data);
    res.data.id = res.data._id;
    return res.data;
  } catch(e) {
    return null;
  }
}

async function updateSalesOpportunity(salesOpp) {
  salesOpp = salesOpp || {};  
  try {
    let res = await axios.put('http://localhost:8000/sales-opportunities', salesOpp);
    console.log('res.data', res.data);
    res.data.id = res.data._id;
    return res.data;
  } catch(e) {
    return null;
  }
}


module.exports = {
  getSalesOpportunities,
  createSalesOpportunity,
  updateSalesOpportunity
};