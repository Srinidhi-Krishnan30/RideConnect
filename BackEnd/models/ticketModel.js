// 10 . Schema to hold tickets raised
const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema({
  TicketId: {
    type: String,
    required: true,
    unique: true,
  },
  CustomerId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Customer',
    required: true,
  },
  IssueType: {
    type: String,
    required: true,
    enum: ['Technical', 'Billing', 'General Inquiry', 'Other'],
  },
  Description: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
    default: 'Open', 
  },
  ResolutionDate: {
    type: Date,
    default: null, 
  },
});

const SupportTicket = mongoose.model('SupportTicket', supportTicketSchema);

module.exports = SupportTicket;
