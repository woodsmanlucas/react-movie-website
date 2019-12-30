import React, { useState, useEffect } from "react"
import {useParams} from "react-router"
import axios from "axios"
import "./App.css"
import "../styles/bootstrap.min.css"

function SearchMovie(props){

    const [search, setSearch] = useState("")

    const handleSearch = async(event) =>{
        setSearch(event.target.value)
    }

    const findMovie = async () => {

        const url = `https://api.themoviedb.org/3/search/movie?api_key=47c4adc75b16f23db3cf78e4870a4296&query=${search}`
        const response = await axios.get(url)
        setSearch(response.data.results.slice(0,12))
        console.log(response.data.results)
    }

    return(
        <form className="form-inline" onSubmit={findMovie}>
            <input className="form-control mr-sm-2" type="search" placeholder="Search Movie" 
            aria-label="Search" name="search" value={search}
            onChange = {handleSearch}/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
    )
}

export default SearchMovie