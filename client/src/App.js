import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Container } from 'semantic-ui-react'

import "semantic-ui-css/semantic.min.css";
import './App.css';

import MenuBar from "./components/MenuBar";
import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  return (
    <Container>
      <Router>
      <MenuBar/>
      <Routes>
      <Route path = "/" element={<Home/>}/>
      <Route path = "/login" element={<Login/>}/>
      <Route path = "/register" element={<Register/>}/>
      </Routes>
    </Router>
    </Container>
  );
}

export default App;