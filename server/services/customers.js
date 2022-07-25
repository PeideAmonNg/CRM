var Customer = require('../models/Customer');
var SalesOpportunity = require('../models/SalesOpportunity');
var mongoose = require('mongoose');

function getCustomers() {
  return Customer.find();
};

function getCustomerById(customerId) {
  return Customer.findOne({_id: customerId});
};

function createCustomer(customer) {
  Customer.init();
  let customerDoc = new Customer({ ...customer, _id: mongoose.Types.ObjectId() });
  return customerDoc.save();
};

function updateCustomer(customerNew) {
  return Customer.findOne({_id: customerNew._id}).then(customer => {
    customer.name = customerNew.name;
    customer.phoneNumber = customerNew.phoneNumber;
    customer.email = customerNew.email;
    customer.status = customerNew.status;
    return customer.save();
  });
};


module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer
};
