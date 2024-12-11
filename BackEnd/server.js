// 1. Imports and config
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectDB = require("./mongoDB/connect.js");


// 2. Admin Route Imports
const vehicleRoutes = require('./routes/vehicleRoutes');
const userRoutes = require('./routes/userManagement');
const reportRoutes = require("./routes/reportRoutes");
const authRoutes = require("./routes/authRoutes.js");


// 3. User Route Imports
const userVechicleRoutes = require("./routes/userVehicleRoutes.js");
const bookingRoutes = require("./routes/bookingRoutes.js");
const ticketRoutes = require("./routes/ticketRoutes.js");

const app = express();
const port = 3000;

// 4. Connection to DB
connectDB();

app.use(express.json());
app.use(cors());

// 5. Authentication Route config
app.use('/auth', authRoutes);

// 6. Admin Routes config
app.use('/admin/api/vehicles',vehicleRoutes);
app.use('/admin/api/users',userRoutes);
app.use('/admin/api/reports',reportRoutes);
app.use('/admin/api/bookings',bookingRoutes);
app.use('/admin/api/tickets',ticketRoutes);

// 7. User Routes config
app.use('/user/api',userVechicleRoutes);
app.use('/user/api/bookings',userVechicleRoutes);


// 8. Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});







