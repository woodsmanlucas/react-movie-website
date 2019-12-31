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

    useEffect(() => {localStorage.setItem('favorites', JSON.stringify(favorites))}, [favorites])

    function getFavorites(id) {
            if(id > 0){
                if(favorites.indexOf(id) === -1){
                    setFavorites([...favorites, id])
                }
            } else {
                // setFavorites(favorites.filter((value) => {return -id==value}))
                setFavorites(favorites.filter((value) => { return value !== -id}))
            }
            // console.log(favorites)                
    }

    return(
        <Router>            
            <div className="App black">
            <Navigation />
            {/* {console.log(favorites)}
            {console.log(localStorage.favorites)} */}
            <Switch>        
                <Route path="/about" component={About}/>
                <Route path="/discover" component={Discover} />
                <Route path="/movie/:id" component={Movie} />
                <Route path="/favorites" >
                    <Favorites movies={favorites} />
                </Route>
                <Route path="/:list"  >
                    <Home getValue={getFavorites} />
                </Route> 
                {/* <Route default >
                    <Home getValue={getFavorites} />
                </Route> */}
            </Switch>
            </div>            
        </Router>        
    )
}

export default App