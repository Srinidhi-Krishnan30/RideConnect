// 4. Schema to store reports of damages in vehicles
const mongoose = require('mongoose');

const damageReportSchema = new mongoose.Schema({
  ReportId: {
    type: String,
    required: true,
    unique: true, 
  },
  VehicleId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Vehicle',
    required: true,
  },
  CustomerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  ReportDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  DamageDescription: {
    type: String,
    required: true,
  },
  RepairStatus: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'], 
    default: 'Pending', 
  },
});
const DamageReport = mongoose.model('DamageReport', damageReportSchema);

module.exports = DamageReport;
