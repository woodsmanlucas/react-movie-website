import React, { useState, useEffect } from "react"
import "./App.css"
import Navigation from "./Navigation"
import Home from "./Home"
import Discover from "./Discover"
import About from "./About"
import { Movie } from './Movie'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Favorites from "./Favorites"
import Ratings from './Ratings'

function App(){
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || [])
    const [rated, setRated] = useState(JSON.parse(localStorage.getItem('StarObject')) || {})
    const [search, setSearch] = useState("")

    useEffect(() => {localStorage.setItem('favorites', JSON.stringify(favorites)) 
}, [favorites])

    useEffect(() => {
        localStorage.setItem('StarObject', JSON.stringify(rated))
    }, [rated])

    function getFavorites(id) {
        if(id > 0){
            if(favorites.indexOf(id) === -1){
                setFavorites([...favorites, id])
            }
        } else {
            setFavorites(favorites.filter((value) => { return value !== -id}))
        }
    }

    function storeStars(stars, id){
        if(id > 0){
            let tempObject = rated
            tempObject[id] = stars
            setRated(tempObject)
        } else if(id < 0){
            let tempObject = rated
            delete tempObject[-id]
            console.log(tempObject)
        }
        localStorage.setItem('StarObject', JSON.stringify(rated))
    }

    function getMovies(movie){
        setSearch(movie)
    }

    return(
        <Router>
            <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet" />            
            <div className="App black">
            <Navigation getValue={getMovies}/>
            <Switch>       
                <Route path="/about" component={About}/>
                <Route path="/discover" >
                    <Discover getValue={getFavorites} movies={rated} />
                </Route>
                <Route path="/movie/:id" >
                    <Movie getStars={storeStars} ratings={rated} />
                </Route>
                <Route path="/favorites" >
                    <Favorites movies={favorites} getValue={getFavorites} />
                </Route>
                <Route path="/ratings">
                    <Ratings movies={rated} getValue={getFavorites} getStars={storeStars} />
                </Route>
                <Route path="/:list">
                    <Home getValue={getFavorites} getSearch={search}/>
                </Route> 
                <Route default >
                    <Home getValue={getFavorites}/>
                </Route>
            </Switch>
            </div>            
        </Router>        
    )
}

export default App