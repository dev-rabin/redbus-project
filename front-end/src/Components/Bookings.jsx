import NavbarWidget from "../Widgets/navbar";
import "react-bootstrap";
import { Button, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./Bookings.css";
import Footer from "../Widgets/footer";

function Bookings() {

  const token = localStorage.getItem("token");
  const [myTickets, setMyTickets] = useState([]);
 
  const showTicket = async () => {
    try {
      console.log("Sending user id...: ,", token);
      const response = await fetch(
        `http://localhost:5000/api/usertickets`,
        {
          method: "GET",
          headers: {
           Authorization : token
          },
        }
      );
      const myTicketData = await response.json();
      if (response.ok) {
        console.log("Get ticket data in showTickets : ", myTicketData);
        setMyTickets(myTicketData);
      }
    } catch (error) {
      console.error("get ticket error");
    }
  };

  

  const handleCancelTicket = async (bookingId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cancelTicket?bookingId=${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log('Ticket cancelled successfully');
        alert("Your ticket has been deleted");
        showTicket();
      } else {
        console.error('Failed to cancel ticket');
      }
    } catch (error) {
      console.error('Error cancelling ticket:', error);
      alert("Error cancelling ticket. Please try again later.");
    }
  };
  
  useEffect(() => {
    showTicket();
  },[]);

  return (
    <>
      <NavbarWidget />
      <h1 className="text-danger text-center text-decoration-underline my-3">
        Your Bookings
      </h1>
      <Container className="col-4 my-5 shadow">
        {myTickets.userTickets ? (
          myTickets.userTickets.map((ticket) => (
            <div key={ticket.id}>
              <div className="ticket">
                <h2 className="ticket-header">Ticket Details</h2>
                <div className="ticket-info">
                      <p>
                        <strong>Ticket ID:</strong> {ticket.bookingId}
                      </p>
                      <p>
                        <strong>Passenger Name:</strong> {ticket.passengerName}
                      </p>
                      <p>
                        <strong>Seat Number:</strong> {ticket.seatNo}
                      </p>
                      <p>
                        <strong>Total booked seats:</strong>
                        {ticket.bookedSeats}
                      </p>
                  
                    <p>
                      <strong>Bus Name:</strong> {ticket.busName}
                    </p>
                    <p>
                      <strong>Origin:</strong> {ticket.origin}
                    </p>
                    <p>
                      <strong>Destination:</strong> {ticket.destination}
                    </p>
                    <p>
                      <strong>Schedule Time:</strong> {ticket.scheduleTime}
                    </p>
                    <p>
                      <strong>Time of booking:</strong> {ticket.time}
                    </p>
                  <Button variant="danger" onClick={()=>handleCancelTicket(ticket.bookingId)}>Cancel Ticket</Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No tickets found</p>
        )}
      </Container>
      <Footer/>
    </>
  );
}

export default Bookings;
