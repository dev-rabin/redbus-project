const express = require('express');
const bookingController = require('../controllers/bookingController');
const bookingRouter = express.Router();

bookingRouter.post("/createBooking", bookingController.createBooking);
bookingRouter.get("/usertickets", bookingController.getTicketByUser);
bookingRouter.delete("/cancelticket", bookingController.cancelTicket);


module.exports = bookingRouter;