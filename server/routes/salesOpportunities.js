var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var {
  getSalesOpportunities,
  createSalesOpportunity,
  updateSalesOpportunity
} = require('../services/salesOpportunities');

router.get('/', async function(req, res, next) {
  try {
    let salesOpps = await getSalesOpportunities();
    res.send(salesOpps);
  } catch(err) {
      console.log(err);
      res.status(500).send('Something broke!')
  }
});

router.post('/', async function(req, res, next) {
  try{
    let salesOpp = await createSalesOpportunity(req.body);
    res.status(201).send(salesOpp);
  } catch(e) {
    console.log(e);
    res.status(500).send('Something broke!')
  }
 });

router.put('/', async function(req, res, next) {
  try{
    let salesOpp = await updateSalesOpportunity(req.body);
    res.send(salesOpp);
  } catch(e) {    
    console.log(e);
    res.status(500).send('Something broke!')
  }
});

module.exports = router;
