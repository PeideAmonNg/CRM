var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer
} = require('../services/customers');

var { getCustomerSalesOpportunities } = require('../services/salesOpportunities');

router.get('/', async function(req, res, next) {
  try {
    let customers = await getCustomers();
    res.send(customers);
  } catch(err) {
      console.error(err);
      res.status(500).send('Something broke!')
  }
});

router.get('/:customerId', async function(req, res, next) {
  try {
    let customer = await getCustomerById(req.params.customerId);
    res.send(customer);
  } catch(err) {
      console.error(err);
      res.status(500).send('Something broke!')
  }
});

router.get('/:customerId/sales-opportunities', async function(req, res, next) {
  try {
    let salesOpps = await getCustomerSalesOpportunities(req.params.customerId);
    res.send(salesOpps);
  } catch(err) {
      console.error(err);
      res.status(500).send('Something broke!')
  }
});

router.post('/', async function(req, res, next) {
  try {
    let customer = await createCustomer(req.body);
    console.log(customer);
    res.status(201).send(customer);
  } catch(e) {
    console.error(err);
    res.status(500).send('Something broke!')
  }
});

router.put('/', async function(req, res, next) {
  try{
    let customer = await updateCustomer(req.body);
    res.send(customer);
  } catch(e) {    
    console.error(e);
    res.status(500).send('Something broke!')
  }
});

module.exports = router;
