var express = require('express');
var router = express.Router();
var SalesOpportunity = require('../database/SalesOpportunity');
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    let salesOpps = await SalesOpportunity.find();
    res.send(salesOpps);
  } catch(err) {
      console.log(err);
      res.status(500).send('Something broke!')
  }
});

router.get('/:salesOppId', async function(req, res, next) {
  try {
    let salesOppId = req.params.salesOppId;
    let salesOpp = await SalesOpportunity.findOne({_id: salesOppId});
    res.send(salesOpp);
  } catch(err) {
      console.log(err);
      res.status(500).send('Something broke!')
  }
});

router.post('/', function(req, res, next) {
  console.log("called post", req.body);
  try{
    let c = req.body;
    SalesOpportunity.init();
    let salesOpp = new SalesOpportunity({...req.body, _id: mongoose.Types.ObjectId() });
    salesOpp.save(err => {
      if (err) {
        console.log(err);
        res.status(500).send('Something broke!')
      } else {
        res.send(salesOpp);
      }
    });
  } catch(e) {
    console.log(e);
  }
 });

router.put('/', async function(req, res, next) {
  try{
    let salesOpp = await SalesOpportunity.findOne({_id: req.body._id});
    salesOpp.name = req.body.name;
    salesOpp.status = req.body.status;
    salesOpp.save(err => {
      if(err) {
        console.log(err);
        res.status(500).send('Something broke!')
      } else {
        res.send(salesOpp);
      }
    });
    
  } catch(e) {    
    console.log(e);
    res.status(500).send('Something broke!')
  }
});

router.delete('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
