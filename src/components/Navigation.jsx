import React from "react"
import { Link } from "react-router-dom"

function Navigation(){
    return(
        <div>
            <input type="checkbox" id="btn-menu"/>
            <nav className="navbar">   
                <label htmlFor="btn-menu">&#9776;</label>         
                <ul className="nav-links">
                    <Link to="/"><li>Home</li></Link>
                    <Link to="/about"><li>About</li></Link>                        
                    <Link to="/discover"><li>Discover</li></Link>                                     
                </ul>
            </nav>
        </div>        
    )
}

export default Navigation