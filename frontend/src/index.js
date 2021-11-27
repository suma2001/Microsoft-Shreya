import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Routes } from "react-router-dom";

// core components
import Admin from "./layouts/Admin.js";
import Login from "./views/Login/Login.js";
import Signup from "./views/Signup/Signup";

import "./assets/css/material-dashboard-react.css?v=1.10.0";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/admin/*" element={<Admin/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
