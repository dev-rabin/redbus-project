import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function MyCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://via.placeholder.com/600x300?text=Slide%201"
          alt="First slide"
        />
        {/* <RedBus1/> */}
        <Carousel.Caption>
          <h3>Slide 1</h3>
          <p>Slide 1 Caption</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://via.placeholder.com/600x300?text=Slide%202"
          alt="Second slide"
        />
        {/* <RedBus1/> */}
        <Carousel.Caption>
          <h3>Slide 2</h3>
          <p>Slide 2 Caption</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://via.placeholder.com/600x300?text=Slide%203"
          alt="Third slide"
        />
        {/* <RedBus1/> */}
        <Carousel.Caption>
          <h3>Slide 3</h3>
          <p>Slide 3 Caption</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default MyCarousel;
