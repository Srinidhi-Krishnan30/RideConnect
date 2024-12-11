// 1. Imports and config
const express = require('express');
const Booking = require("../models/bookingSystem.js");
const router = express.Router();

// 2. Retrieve all bookings from the database
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find();
        if (bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found' });
        }
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
});

// 3. Create a new booking 
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
      const { VehicleName, PickupDate, ReturnDate, Status } = req.body;
      const newBooking = new Booking({
        VehicleName: VehicleName,
        PickupDate :PickupDate,
        ReturnDate: ReturnDate,
        Status: Status,
      });
  
      await newBooking.save();
      res.status(201).json(newBooking);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Error creating booking' });
    }
  });
  
  


module.exports = router;