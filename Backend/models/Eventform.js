const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    customerName: { type: String, required: true },
    address: { type: String, required: true },
    taluka: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: false },
    eventDate: { type: Date, required: true },
    eventVenue: { type: String, required: true },
    eventDescription: { type: String, required: true },
    eventAmount: { type: Number, required: true },
    advanceAmount: { type: Number, required: false, default: 0 },
    remainingAmount: { type: Number, required: true },
    eventHoldersName: { type: String, required: true }
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
