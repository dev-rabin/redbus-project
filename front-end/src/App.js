import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";
import Login from "./Components/Login";
import UserRegister from "./Components/UserRegister";

import Logout from "./Components/Logout";
import SearchBus from "./Components/SearchBus";
import BookTicket from "./Components/BookTicket";
import Bookings from "./Components/Bookings";
import AboutPage from "./Components/Aboout";

function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchBus/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/register" element={<UserRegister/>}/>
        <Route path="/searchbus" element={<SearchBus/>}/>
        <Route path="/bookticket" element={<BookTicket/>}/>
        <Route path="/bookings" element={<Bookings/>}/>
        <Route path="/about" element={<AboutPage/>} / >
      </Routes>
    </BrowserRouter>
  </>;
}

export default App;
