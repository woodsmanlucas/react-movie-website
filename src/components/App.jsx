import React, { useState, useEffect } from "react"
import "./App.css"
import Navigation from "./Navigation"
import Home from "./Home"
import Discover from "./Discover"
import About from "./About"
import { Movie } from './Movie'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Favorites from "./Favorites"
import SearchMovie from "./SearchMovie"

function App(){
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || [])
    const [starObject, setStarObject] = useState(JSON.parse(localStorage.getItem('StarObject')) || {})

    useEffect(() => {localStorage.setItem('favorites', JSON.stringify(favorites)) 
}, [favorites])

    function getFavorites(id) {
            if(id > 0){
                if(favorites.indexOf(id) === -1){
                    setFavorites([...favorites, id])
                }
            } else {
                setFavorites(favorites.filter((value) => { return value !== -id}))
            }
    }

    function storeStars(star, id){
        let tempObject = starObject
        tempObject[id] = star
        localStorage.setItem('StarObject', JSON.stringify(tempObject))
    }

    return(
        <Router>
            <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet" />            
            <div className="App black">
            <Navigation />
            <Switch>       
                <Route path="/about" component={About}/>
                <Route path="/discover" component={Discover} />
                <Route path="/movie/:id" >
                    <Movie getStars={storeStars} ratings={starObject} />
                </Route>
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