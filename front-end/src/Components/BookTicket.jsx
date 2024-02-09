import React, { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import Footer from "../Widgets/footer";
import NavbarWidget from "../Widgets/navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../store/store";

function BookTicket() {
  const location = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const busData = location.state && location.state.busData;

  // Initialize ticket state with user and bus data
  const [ticket, setTicket] = useState({
    userId: user ? user.userId : "",
    busId: busData ? busData.busId : "",
    passengerName: "",
    bookedSeats: "",
    seatNo: "",
    busName : busData.busName,
    origin : busData.origin,
    destination : busData.destination,
    scheduleTime : busData.scheduleTime
  });

  const sendBusDataToBookings = () => {
    console.log("Send bus data to bookings log : ", busData);
    navigate("/bookings" , {
      state: { busData: busData }
    });
  }

  const handleTicketSubmit = async () => {
    try {
      console.log("Submitting ticket:", ticket);
      const response = await fetch("http://localhost:5000/api/createBooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticket),
      });
      const ticketData = await response.json();
      if (response.ok) {
        console.log("Ticket booking log : ", ticketData);
       setTicket(ticketData);
        alert(ticketData.message);
        sendBusDataToBookings();
        console.log("sendBusDataToBookings", sendBusDataToBookings());
      } else {
        alert(ticketData.message);
      }
    } catch (error) {
      console.error("Ticket booking error : ", error);
    }
  };

  const handleTicketInput = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  return (
    <>
      <NavbarWidget />
      <h1 className="text-center my-3 text-decoration-underline">
        Bus Details
      </h1>
      <Container className="shadow border">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Bus Id</th>
              <th>Bus Name</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>ScheduleTime</th>
              <th>Total Seats</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{busData?.busId}</td>
              <td>{busData?.busName}</td>
              <td>{busData?.origin}</td>
              <td>{busData?.destination}</td>
              <td>{busData?.scheduleTime}</td>
              <td>{busData?.totalSeats}</td>
            </tr>
          </tbody>
        </Table>
      </Container>
      <Container className="shadow border my-2">
        <div className="m-auto">
          <div className="my-4 col-lg-6 col-md-6 col-sm-12 col-12 mx-auto">
            <Form.Label>Passenger Name</Form.Label>
            <Form.Control
              type="text"
              name="passengerName"
              value={ticket.passengerName}
              onChange={handleTicketInput}
            />
          </div>
          <div className="my-4 col-lg-6 col-md-6 col-sm-12 col-12 mx-auto">
            <Form.Select
              aria-label="Default select example"
              name="seatNo"
              value={ticket.seatNo}
              onChange={handleTicketInput}
            >
              <option>Select seat with number</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
            </Form.Select>
          </div>
          <div className="my-4 col-lg-6 col-md-6 col-sm-12 col-12 mx-auto">
            <Form.Label>Enter Your Total Tickets</Form.Label>
            <Form.Control
              type="number"
              name="bookedSeats"
              value={ticket.bookedSeats}
              onChange={handleTicketInput}
            />
          </div>
          <div className="my-4 text-center">
            <Button variant="danger" onClick={handleTicketSubmit}>
              Book Ticket
            </Button>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default BookTicket;
