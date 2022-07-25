const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  phoneNumber: String,
  email: String,
  status: String,
  salesOpportunities: [{ type: Schema.Types.ObjectId, ref: 'SalesOpportunity' }]
}, { timestamps: true });

customerSchema.virtual('id').get(function() {
  return this._id;
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;