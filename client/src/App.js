import React from "react";
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

//https://stackoverflow.com/questions/69832748/error-error-a-route-is-only-ever-to-be-used-as-the-child-of-routes-element
//In react-router-dom version 6, we have to import Router, Routes, and Route.

import "semantic-ui-css/semantic.min.css";
//Always ensure that the dependencies semantic-ui-css/semantic.min.css" are installed on the right directory.

import "./App.css";

import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    //All the Router components needs to be enclosed within the Container.
    <Container>
    <Router>
      <Routes>
      <Route path = "/" element={<Home/>}/>
      <Route path = "/login" element={<Login/>}/>
      <Route path = "/register" element={<Register/>}/>
      </Routes>
      <MenuBar/>
    </Router>
    </Container>
  );
}

export default App;