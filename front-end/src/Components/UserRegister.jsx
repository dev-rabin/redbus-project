import { Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import SignUpImage from "../images/redbus2.jpg";
import Footer from "../Widgets/footer";
import "../App.css";
import { useState } from "react";

function UserRegister() {
  const navigate = useNavigate();
  const [userCreate, setUserCreate] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setUserCreate({ ...userCreate, [e.target.name]: e.target.value });
  };

  const createUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCreate),
      });
      if (response.ok) {
        const data = await response.json();
        setUserCreate({
          name: "",
          email: "",
          password: "",
        });
        alert("You are registred successfully !");
        navigate("/login");
        console.log("Registred user data : ", data);
      }
    } catch (error) {
      console.error("Registraton user error : ", error);
    }
  };

  return (
    <>
      <h1 className="my-5 text-center text-decoration-underline text-danger">Welcome to Redbus</h1>
      <div className="container shadow border col-lg-12 col-md-12 my-5 p-3 d-flex justify-content-around">
        <div className="col-lg-5 col-md-5 align-items-center">
          <h3 className="text-decoration-underline my-1">Register Here</h3>
          <Form.Group
            className="mb-3 col-lg-12 col-md-12"
            controlId="exampleForm.ControlInput2"
          >
            <Form.Label>Name</Form.Label>
            <Form.Control
              className="form-input"
              type="text"
              placeholder="Enter your name"
              name="name"
              value={userCreate.name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group
            className="my-3 col-lg-12 col-md-12"
            controlId="exampleForm.ControlInput3"
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className="form-input"
              type="email"
              placeholder="name@example.com"
              name="email"
              value={userCreate.email}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group
            className="my-3 col-lg-12 col-md-12"
            controlId="exampleForm.ControlInput4"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="form-input"
              type="password"
              placeholder="Enter your password"
              name="password"
              value={userCreate.password}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button
            className="my-3"
            variant="danger"
            type="submit"
            onClick={createUser}
          >
            Register
          </Button>
          <NavLink to="/login" className="mx-3 text-decoration-none">
            Login Here
          </NavLink>
        </div>
        <div className="col-lg-5 col-md-5">
          <img
            className="img-fluid my-4 rounded"
            src={SignUpImage}
            alt="Not available"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserRegister;
