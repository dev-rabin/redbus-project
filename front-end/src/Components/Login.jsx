import { NavLink,useNavigate } from "react-router-dom";
import Footer from "../Widgets/footer";
import "../App.css"
import { useState } from "react";
import { useAuth } from "../store/store";
const { Form, Button,} = require("react-bootstrap");
const LoginImage = require("../images/redbus1.png");


function Login() {

  const {storeToken} = useAuth();

const navigate = useNavigate();
const [login , setLogin] = useState({
    email : "",
    password : ""
})

const handleInputChange = (e) => {
    setLogin({...login, [e.target.name] : e.target.value});
}

const handleLogin = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/login", {
            method : "POST",
            headers :{
                "Content-Type": "application/json",
            },
            body : JSON.stringify(login)
        });
        if (response.ok) {
            const data = await response.json();
            setLogin({
                email : "",
                password : ""
            });
            storeToken(data.token);
            console.log("Login succesful");
           alert("Login Successfully !");
            navigate("/");
            console.log("USer login data :", data);
        }
    } catch (error) {
        console.error(error);
        alert(error);
    }
}

  return (
    <>
    <h1 className="text-center my-5 text-decoration-underline text-danger">Welcome to Redbus</h1>
    <div className="container col-lg-12 col-md-12 my-5 p-4 border shadow order-2">
        <div className="container my-4 d-flex justify-content-around">
          <div className="col-lg-5 col-md-5">
            <h3 className="text-decoration-underline">Login here</h3>
            <Form.Group
              className="my-3 col-lg-12 col-md-12"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control className="form-input"
                type="email"
                placeholder="Enter your email"
                name="email"
               value={login.email}
               onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 col-lg-12 col-md-12"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control className="form-input"
                type="password"
                placeholder="Enter your password"
                name="password"
                value={login.password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="danger" type="submit" 
            onClick={handleLogin}
            >
              Login
            </Button>
            <NavLink className="mx-3 text-decoration-none" to="/register">
              User Register Here
            </NavLink>
          </div>
          <div className="col-lg-5 col-md-5">
            <img className="img-fluid rounded order-1" src={LoginImage} alt="Not available" />
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Login;
