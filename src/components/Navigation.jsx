import React from "react"
import { Link } from "react-router-dom"
import search from "../images/search.png"

function Navigation(){
    return(
        <div>
            <nav className="navbar navbar-light fixed-top flex-row-reverse bg-dark">
            <label htmlFor="btn-menu">&#9776;</label>
                <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </nav>
            <input type="checkbox" id="btn-menu"/>
            <nav className="navbar">                         
                <ul className="nav-links">
                    <Link to="/popular"><li>Popular</li></Link>
                    <Link to="/top_rated"><li>Top Rated</li></Link>
                    <Link to="/now_playing"><li>Now Playing</li></Link>
                    <Link to="/upcoming"><li>Upcoming Movies</li></Link>
                    <Link to="/about"><li>About</li></Link>                        
                    <Link to="/discover"><li>Discover</li></Link>
                    <Link to="/favorites"><li>Favorites</li></Link>                                     
                </ul>
            </nav>
        </div>        
    )
}

export default Navigation