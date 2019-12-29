import React, { useState } from "react"
import "./App.css"
import Navigation from "./Navigation"
import Home from "./Home"
import Discover from "./Discover"
import About from "./About"
import { Movie } from './Movie'
import Favorites from './Favorites'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

function App(){

    const [favorites, setFavorites] = useState([])


    function getFavorites(id) {
        if(id > 0){
            setFavorites([...favorites, id])
        } else {
            setFavorites(favorites.filter((value) => {return (-id !=value)}))
        }
        console.log(favorites)
    }

    return(
        <Router>            
            <div className="App black">
            <Navigation />
            <Switch>       
                <Route path="/about" component={About}/>
                <Route path="/discover" component={Discover} />
                <Route path="/movie/:id" component={Movie} />
                <Route path="/favorites" >
                    <Favorites movies={favorites} getValue={getFavorites} />
                </Route>
                <Route path="/:list"  >
                    <Home getValue={getFavorites} />
                </Route> 
                <Route default >
                    <Home getValue={getFavorites} />
                </Route>             
            </Switch>
            </div>            
        </Router>        
    )
}

export default App