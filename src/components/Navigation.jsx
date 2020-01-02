import React from "react"
import { Link } from "react-router-dom"
import SearchMovie from "./SearchMovie"

function Navigation(props){

    function getMovies(movies){
        props.getValue(movies)
    }

    function clearSearch(){
        getMovies("")
    }

    return(
        <div>
            <nav className="navbar navbar-light fixed-top flex-row-reverse bg-dark">
            <label htmlFor="btn-menu">&#9776;</label>
                <SearchMovie getValue={getMovies}/>
            </nav>
            <input type="checkbox" id="btn-menu"/>
            <nav className="navbar">                         
                <ul className="nav-links">
                    <Link to="/popular" onClick={clearSearch}><li>Popular</li></Link>
                    <Link to="/top_rated" onClick={clearSearch}><li>Top Rated</li></Link>
                    <Link to="/now_playing" onClick={clearSearch}><li>Now Playing</li></Link>
                    <Link to="/upcoming" onClick={clearSearch}><li>Upcoming Movies</li></Link>
                    <Link to="/about" ><li>About</li></Link>                        
                    <Link to="/discover"><li>Discover</li></Link>
                    <Link to="/favorites"><li>Favorites</li></Link>
                    <Link to="/ratings"><li>My Rated Movies</li></Link>                                     
                                     
                </ul>
            </nav>
        </div>        
    )
}

export default Navigation