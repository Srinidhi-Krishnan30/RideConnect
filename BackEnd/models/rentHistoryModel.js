// 7. Schema to hold the renting history of each vehicle

const mongoose = require('mongoose');

const rentalHistorySchema = new mongoose.Schema({
  HistoryId: {
    type: String,
    required: true,
    unique: true,
  },
  CustomerId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Customer',
    required: true,
  },
  VehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
  RentalDuration: {
    type: Number, 
    required: true,
  },
  TotalSpent: {
    type: Number,
    required: true,
    min: 0,
  },
  Date: {
    type: Date,
    required: true,
    default: Date.now, 
  },
});

const RentalHistory = mongoose.model('RentalHistory', rentalHistorySchema);

module.exports = RentalHistory;
