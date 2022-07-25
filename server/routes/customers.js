var express = require('express');
var router = express.Router();
var Customer = require('../database/Customer');
var SalesOpportunity = require('../database/SalesOpportunity');
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    let customers = await Customer.find();
    res.send(customers);
  } catch(err) {
      console.error(err);
      res.status(500).send('Something broke!')
  }
});

router.get('/:customerId', async function(req, res, next) {
  try {
    let customerId = req.params.customerId;
    let customer = await Customer.findOne({_id: customerId});
    res.send(customer);
  } catch(err) {
      console.error(err);
      res.status(500).send('Something broke!')
  }
});

router.get('/:customerId/sales-opportunities', async function(req, res, next) {
  try {
    let customerId = req.params.customerId;
    let salesOpps = await SalesOpportunity.find({customer: customerId});
    res.send(salesOpps);
  } catch(err) {
      console.error(err);
      res.status(500).send('Something broke!')
  }
});

router.post('/', function(req, res, next) {
  console.error("called post", req.body);
  let c = req.body;
  Customer.init();
  let customer = new Customer({ _id: mongoose.Types.ObjectId(), name: c.name, phoneNumber: c.phoneNumber, email: c.email, status: c.status });
  customer.save(err => {  
    if (err) {
      console.error(err);
      res.status(500).send('Something broke!')
    } else {
      res.send(customer);
    }

  });
});

router.put('/', async function(req, res, next) {
  try{
    let customer = await Customer.findOne({_id: req.body._id});
    customer.name = req.body.name;
    customer.phoneNumber = req.body.phoneNumber;
    customer.email = req.body.email;
    customer.status = req.body.status;
    customer.save(err => {
      if(err) {
        console.error(err);
        res.status(500).send('Something broke!')
      } else {
        res.send(customer);
      }
    });    
  } catch(e) {    
    console.error(e);
    res.status(500).send('Something broke!')
  }
});

router.delete('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
