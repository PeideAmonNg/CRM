import { Link } from "react-router-dom";
const axios = require('axios').default;

const columns = [
  { field: 'id', headerName: 'ID', width: 250 },
  {
    field: 'name',
    headerName: 'Name',
    width: 300,
    editable: true,
  },
  {
    field: 'phoneNumber',
    headerName: 'Phone',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 300,
    editable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    type: 'singleSelect',
    valueOptions: ['Active', 'Non-Active', 'Lead'],
    width: 110,
    editable: true,
  },
  {
    field: 'customerLink',
    headerName: 'Sales Opportunities',
    width: 150,
    renderCell: function(params) {
      return <Link to={"/customers/" + params.id} key={params.id}>View</Link>;
    }
  }
];

const rows = [
  { id: 1, name: 'Jon Snow', phoneNumber: '+64210233494', email: 'jonsnow@gmail.com', status: 'Active'},
  { id: 2, name: 'Tyrion Lannister', phoneNumber: '+642392347823', email: 'tylannister@gmail.com', status: 'Lead'},
];

async function getCustomers(filter) {
  filter = filter || {};
  try{
    let res = await axios.get('http://localhost:8000/customers');
    let customers = res.data;
    customers.forEach(element => element.id = element._id);
    return {columns, rows: customers};
  } catch(e) {
    return {columns, rows: []};
  }

}

async function getCustomerById(customerId) {
  try{
    let res = await axios.get('http://localhost:8000/customers/' + customerId);
    res.data.id = res.data._id;
    return res.data;
  } catch(e) {
    return {};
  }
}

async function createCustomer(customer) {
  // disable creat button. Once response comes back, add customer to state and close modal
  try {
    customer = customer || {};
    let res = await axios.post('http://localhost:8000/customers', customer);
    res.data.id = res.data._id;
    return res.data;
  } catch(e) {
    return {};
  }
}

async function updateCustomer(customer) {
  try {
    customer = customer || {};
    let res = await axios.put('http://localhost:8000/customers', customer);
    res.data.id = res.data._id;
    return res.data;
  } catch(e) {
    return {};
  }
}

export {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer
};