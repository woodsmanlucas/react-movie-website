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
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About}/>
                <Route path="/discover" component={Discover} />
            </Switch>
            </div>            
        </Router>        
    )
}

export default App