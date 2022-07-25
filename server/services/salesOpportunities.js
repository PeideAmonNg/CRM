var SalesOpportunity = require('../models/SalesOpportunity');
var mongoose = require('mongoose');

function getSalesOpportunities() {
  return SalesOpportunity.find();
};

function getCustomerSalesOpportunities(customerId) {
  return SalesOpportunity.find({customer: customerId});
};

function createSalesOpportunity(salesOpp) {
  SalesOpportunity.init();
  let salesOppDoc = new SalesOpportunity({...salesOpp, _id: mongoose.Types.ObjectId() });
  return salesOppDoc.save();
 };

function updateSalesOpportunity(salesOppNew) {
  return SalesOpportunity.findOne({_id: salesOppNew._id}).then(salesOpp => {
    salesOpp.name = salesOppNew.name;
    salesOpp.status = salesOppNew.status;
    return salesOpp.save();
  });
};

module.exports = {
  getSalesOpportunities,
  getCustomerSalesOpportunities,
  createSalesOpportunity,
  updateSalesOpportunity
};