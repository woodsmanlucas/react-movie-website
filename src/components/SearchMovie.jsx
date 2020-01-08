import React, { useState, useEffect } from "react"
import {Redirect} from "react-router"
import "./App.css"
import "../styles/bootstrap.min.css"

function SearchMovie(props){

    const [query, setQuery] = useState("")
    const [search, setSearch] = useState("")
    const [redirect, setRedirect] = useState(false)


    useEffect(() => {
        const handleSearch = () =>{
            props.getValue(search)
        };
        handleSearch();
    }, [search])

    const handleQuery = (event) =>{
            setQuery(event.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setRedirect(true)
        setSearch(query)
        props.getValue(search)
        setQuery("")
    }

    return(
        <form className="form-inline flex-nowrap" onSubmit={handleSubmit}>
            <input id="input" className="form-control mr-sm-2" type="search" placeholder="Search Movie" 
            aria-label="Search" name="search" value={query} onChange={handleQuery}/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" value="submit" >Search</button>
            {redirect && <Redirect to={{pathname: '/search', search: `?search=${search}`}} />}
        </form>
    )
}

export default SearchMovie