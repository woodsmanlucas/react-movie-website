import React from "react"
import { Link } from "react-router-dom"
import search from "../images/search.png"

function Navigation(){
    return(
        <div>
            <input type="checkbox" id="btn-menu"/>
            <nav className="navbar">   
                <label htmlFor="btn-menu">&#9776;</label>  
                <div className="search">
                    <form action="">
                        <input type="text" name="Search" size="20"/>
                        <button><img src={search} alt="search"/></button>
                    </form>
                </div>     
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