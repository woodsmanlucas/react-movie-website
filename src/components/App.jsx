import React from "react"
import "./App.css"
import Navigation from "./Navigation"
import Home from "./Home"
import Discover from "./Discover"
import About from "./About"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

function App(){
    return(
        <Router>            
            <div className="App">
            <Navigation />
            <Switch>    
                <Route exact path="/about" component={About}/>
                <Route exact path="/discover" component={Discover} /> 
                <Route exact path="/:list">
                    <Home />
                </Route>               
            </Switch>
            </div>            
        </Router>        
    )
}

export default App