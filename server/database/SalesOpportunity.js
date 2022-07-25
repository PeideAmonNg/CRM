const mongoose = require('mongoose');
const { Schema } = mongoose;

const salesOpportunitySchema = Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
  name: String,
  status: String
}, { timestamps: true });

const SalesOpportunity = mongoose.model('SalesOpportunity', salesOpportunitySchema);

module.exports = SalesOpportunity;