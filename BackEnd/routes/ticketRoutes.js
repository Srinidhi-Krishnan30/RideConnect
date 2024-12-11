// 1. Imports and config
const express = require('express');
const SupportTicket = require("../models/ticketModel");
const router = express.Router();

// 2. Retrieve all tickets
router.get('/', async (req, res) => {
    try {
        const tickets = await SupportTicket.find();
        res.json(tickets);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching tickets', error });
      }
});
module.exports = router;