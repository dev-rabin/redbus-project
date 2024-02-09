const database = require("../conn_mysql");
const jwt = require ("jsonwebtoken");

const bookingController = {
  createBooking: (req, res) => {
    const { userId, busId, passengerName, seatNo, bookedSeats } = req.body;
    const checkQuery =
      "SELECT booking.* FROM booking WHERE booking.busId = ? AND booking.seatNo = ? ;";
    database.query(checkQuery, [busId, seatNo], (checkError, checkResult) => {
      if (checkError) {
        res.json({
          success: false,
          message: "Error checking seat availability:",
          error: checkError,
        });
        console.error("Error checking seat availability:", checkError);
      } else {
        if (checkResult.length > 0) {
          res.json({
            success: false,
            message:
              "The seat is already booked. Please select a different seat.",
          });
        } else {
          const query =
            "INSERT INTO booking (userId, busId, passengerName, seatNo, bookedSeats) VALUES (?, ?, ?, ?, ?)";
          database.query(
            query,
            [userId, busId, passengerName, seatNo, bookedSeats],
            (error, result) => {
              if (error) {
                res.json({
                  success: false,
                  message: "Error creating booking:",
                  error,
                });
                console.error("Ticket booking error : ", error);
              } else {
                res.json({
                  success: true,
                  message: "You booked a ticket",
                  data: result,
                });
                console.log("Created booking result:", result);
              }
            }
          );
        }
      }
    });
  },

  getTicketByUser: (req, res) => {
    const payload = jwt.decode(req.headers.authorization);
    const userId = payload.userId; // Accessing userId from query parameters
    const query = "SELECT * FROM booking WHERE userId = ?"; // Correcting SQL query syntax
    database.query(query, [userId], (error, result) => {
      if (error) {
        res.json({ success: false, message: error });
        console.error("get ticket by userId error :", error);
      } else {
        if (result.length === 0) {
          res.json({
            success: false,
            message: "No tickets found for this user.",
          });
        } else {
          const userTicketData = result;
          res.json({
            success: true,
            message: "Your tickets for this user",
            userTickets: userTicketData,
          });
          console.log("User ticket data:", userTicketData);
        }
      }
    });
  },

  cancelTicket: (req, res) => {
    const bookingIdToDelete = req.body.bookingId; // Access bookingId from request body
    const deleteQuery = `DELETE FROM booking WHERE bookingId = ?`; // Use DELETE instead of DROP
    database.query(deleteQuery, [bookingIdToDelete], (error, results) => {
      if (error) {
        console.error("Error deleting row:", error);
        res.status(500).json({ message: "Error deleting row" }); // Send error response
        return;
      }
      console.log("Row deleted successfully");
      res.json({ message: "Row deleted successfully" }); // Send success response
    });
  },
}  

module.exports = bookingController;
