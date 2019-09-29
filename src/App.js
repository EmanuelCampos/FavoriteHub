import React from "react";
import { Component } from "react";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/:name" component={Profile} />
      </Router>
    </div>
  );
}

export default App;
