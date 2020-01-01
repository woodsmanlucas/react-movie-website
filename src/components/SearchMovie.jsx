import React, { useState, useEffect } from "react"
import {Redirect} from "react-router"
import "./App.css"
import "../styles/bootstrap.min.css"
import { Link } from "react-router-dom"

function SearchMovie(props){

    const [query, setQuery] = useState("")
    const [search, setSearch] = useState("")
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {handleSearch()}, [search])

    const handleQuery = (event) =>{
            setQuery(event.target.value)
    }

    const handleSearch = () =>{
        setSearch(query)
        props.getValue(search)
    }

    function handleSubmit() {
        handleSearch()
        setRedirect(true)
    }

    if(redirect){
        return(
            <form className="form-inline" onSubmit={handleSubmit}>
                <input className="form-control mr-sm-2" type="search" placeholder="Search Movie" 
                aria-label="Search" name="search" value={query} onChange={handleQuery}/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="button" >Search</button>
                <Redirect to={{
            pathname: '/search',
            search: `?search=${search}`
        }} />
            </form>
        )
    }

    return(
        <form className="form-inline" onSubmit={handleSubmit}>
            <input className="form-control mr-sm-2" type="search" placeholder="Search Movie" 
            aria-label="Search" name="search" value={query} onChange={handleQuery}/>
            <Link to="/search"> 
                <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick = {handleSearch}>Search</button>
            </Link>
        </form>
    )
}

export default SearchMovie