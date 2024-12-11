// 1. Imports and config
const express = require('express');
const Bookings = require('../models/bookingSystem.js');
const vehicle = require('../models/vehicleModel.js');
const router = express.Router();

// Mock Data
let vehicles = [
  {
    VehicleId: '1',
    Model: 'Civic',
    Make: 'Honda',
    Year: 2022,
    PricePerDay: 50,
    AvailabilityStatus: 'Available',
    Specifications: { color: 'Blue', seats: '5', fuel: 'Petrol' },
    ImageUrl: 'https://example.com/honda-civic.jpg',
  },
  {
    VehicleId: '2',
    Model: 'Corolla',
    Make: 'Toyota',
    Year: 2021,
    PricePerDay: 45,
    AvailabilityStatus: 'Available',
    Specifications: { color: 'White', seats: '5', fuel: 'Diesel' },
    ImageUrl: 'https://example.com/toyota-corolla.jpg',
  },
];

let bookings = [];

// 2. Get a list of vehicles
router.get('/vehicles', (req, res) => {
  res.status(200).json(vehicles);
});

// 3. Create a new booking
router.post('/bookings', async (req, res) => {
    const { vehicle: { VehicleId },PickupDate, ReturnDate, TotalPrice} = req.body;
    
    // Log the destructured variables to check the received data
    console.log(VehicleId, ReturnDate, PickupDate, TotalPrice);

    // Validate booking data
    if (!VehicleId || !PickupDate || !ReturnDate || !TotalPrice) {
      return res.status(400).json({ message: 'Invalid booking data.' });
    }

    try {
      const vehicle = await Vehicles.findById(VehicleId); 
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found.' });
      }

      if (vehicle.AvailabilityStatus !== 'Available') {
        return res.status(400).json({ message: 'Vehicle is not available.' });
      }

      // Create new booking object
      const newBooking = new Bookings({
        CustomerId,
        VehicleId,
        PickupDate: new Date(PickupDate), 
        ReturnDate: new Date(ReturnDate), 
        TotalPrice,
        Status: 'Active',
      });

      // Save the booking to the database
      await newBooking.save();
      // Status updation
      vehicle.AvailabilityStatus = 'Booked';
      await vehicle.save();

      bookings.push({
        BookingId: `${bookings.length + 1}`,
        VehicleId,
        UserName,
        BookingDate,
        PickupDate,
        ReturnDate,
        TotalPrice,
        Status: 'Active',
      });
      // Success response
      res.status(201).json({ message: 'Booking successful.', booking: newBooking });

    } catch (error) {
      console.error('Error processing booking:', error);
      res.status(500).json({ message: 'Server error occurred while processing the booking.' });
    }
});


module.exports = router;
