import React, { useState } from "react";
import { Container, Button, Table, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BusSeatingLayout.css"; // Import your custom CSS file for styling
import Form from "react-bootstrap/Form";
import Footer from "../Widgets/footer";
import { useAuth } from "../store/store";
import { useNavigate } from "react-router-dom";
import NavbarWidget from "../Widgets/navbar";
import Image1 from '../images/redbus1.png';
import Image2 from '../images/redbus2.jpg';
import Image3 from '../images/redbus3.jpg';


function SearchBus() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [searchBus, setSearchBus] = useState({
    origin: "",
    destination: "",
    scheduleTime: "",
  });

  const [busData, setBusData] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/buses?origin=${searchBus.origin}&destination=${searchBus.destination}&scheduleTime=${searchBus.scheduleTime}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const responseData = await response.json();
      console.log("Response data:", responseData);
      if (responseData.success) {
        setBusData(responseData.busdata); // Use responseData.busdata
      } else {
        alert(responseData.message);
      }
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show an error message to the user)
    }
  };
  
  const handleChange = (e) => {
    setSearchBus({ ...searchBus, [e.target.name]: e.target.value });
  };
  

  const handleBusTable = (busData) => {
   console.log("Bus id is : ", busData );
   navigate("/bookticket", {
    state: { busData: busData }
  })
  }

  return (
    <>
    <NavbarWidget/>
    
    <Carousel>
      <Carousel.Item style={{ height: '70vh'}}>
        <img
          className="d-block w-100"
          src={Image3}
          alt="Not available"
          style={{ height: '100%', objectFit: 'fit' }}
        />
      </Carousel.Item>
      <Carousel.Item style={{ height: '70vh'}}>
        <img
          className="d-block w-100"
          src={Image1}
          alt="Second slide"
          style={{ height: '100%', objectFit: 'fit' }}
        />
      </Carousel.Item>
      <Carousel.Item style={{ height: '70vh'}}>
        <img
          className="d-block w-100"
          src={Image2}
          alt="Third slide"
          style={{ height: '100%', objectFit: 'fit' }}
        />
      </Carousel.Item>
    </Carousel>

<h1 className="text-center my-4 text-decoration-underline text-danger">Book Your Bus</h1>
      <Container className="container border shadow col-6 d-flex justify-content-around my-5">
        <div className="container col-6 p-3 ">
          <h3 className="text-decoration-underline text-center">Enter your details</h3>
          <Form>
            <Form.Control
              type="text"
              name="origin"
              value={searchBus.origin}
              placeholder="Origin"
              className="my-4"
              onChange={handleChange}
            />
            <Form.Control
              type="text"
              name="destination"
              value={searchBus.destination}
              placeholder="Destination"
              className="my-4"
              onChange={handleChange}
            />
            <Form.Control
              type="date"
              name="scheduleTime" // Corrected to match state variable name
              value={searchBus.scheduleTime}
              placeholder="Date"
              className="my-4"
              onChange={handleChange}
            />
            <div className="text-center">
            <Button variant="danger" onClick={handleSubmit}>
              Submit
            </Button>
            </div>
          </Form>
        </div>
      </Container>
      <Container className="my-5 p-3">
      <div className="text-center">
        {busData ? <h1>{busData.message}</h1> : <h3>Please search your route</h3>}
      </div>
      <div className="mb-5 shadow">
      <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Id</th>
          <th>Bus Name</th>
          <th>Origin</th>
          <th>Destination</th>
          <th>ScheduleTime</th>
          <th>Total Seats</th>
        </tr>
      </thead>
          <tbody>
          {Array.isArray(busData) && busData.map((bus, index) => (
      <tr key={index} onClick={()=> handleBusTable(bus)}>
        <td>{bus.busId}</td>
        <td>{bus.busName}</td>
        <td>{bus.origin}</td>
        <td>{bus.destination}</td>
        <td>{bus.scheduleTime}</td>
        <td>{bus.totalSeats}</td>
        <td><Button variant="success">Book Ticket</Button></td>
  </tr>
))}

</tbody>

    </Table>
    </div>
      </Container>
      <Footer />
    </>
  );
}

export default SearchBus;
