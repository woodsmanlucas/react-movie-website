import React, { useState, useEffect } from "react"
import {useParams} from "react-router"
import axios from "axios"
import "./App.css"
import "../styles/bootstrap.min.css"
import { Link } from "react-router-dom"

function SearchMovie(props){

    const [query, setQuery] = useState("")
    const [search, setSearch] = useState("")

    useEffect(() => {handleSearch()}, [search])

    const handleQuery = (event) =>{
        setQuery(event.target.value)
    }

    const handleSearch = () =>{
        setSearch(query)
        props.getValue(search)
        setQuery("")
    }

    return(
        <form className="form-inline">
            <input className="form-control mr-sm-2" type="search" placeholder="Search Movie" 
            aria-label="Search" name="search" value={query} onChange = {handleQuery}/>
            <Link to="/search"> 
                <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick = {handleSearch}>Search</button>
            </Link>
        </form>
    )
}

export default SearchMovie