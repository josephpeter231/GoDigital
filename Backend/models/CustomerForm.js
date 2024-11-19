const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    taluka: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: false },
    cast: { type: String, required: true },
    subcast: { type: String, required: false },
    gotra: { type: String, required: false },
    religion: { type: String, required: true },
    nationality: { type: String, required: true },
    referredBy: { type: String, required: false },
    employed: { type: Boolean, required: true },
    employmentType: { 
      type: String, 
      enum: ['student', 'business', 'self-employed', 'retired'], 
      required: true 
    },
    businessDetails: { 
      name: { type: String, required: false },
      address: { type: String, required: false },
      type: { type: String, required: false },
      contactNumber: { type: String, required: false }
    }
  },
  { timestamps: true }
);

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
