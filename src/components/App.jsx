import React from 'react';
import '../styles/App.css';
import Home from './Home.jsx';
import About from './About.jsx';
import Discover from './Discover.jsx';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/Discover">
          <Discover />
        </Route>
        <Route exact path="/About">
          <About />
        </Route>
      </Router>
    </div>
  );
}

export default App;
