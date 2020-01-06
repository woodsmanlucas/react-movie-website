import React, { useState, useEffect } from "react"
import {useParams} from "react-router"
import axios from "axios"
import "./App.css"
import "../styles/bootstrap.min.css"
import { useLocation } from "react-router-dom";
import Card from "./Card"

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

function Home(props){

    let query = useQuery();
    const [movies, setMovies] = useState([])
    let {list, search} = useParams()

    list = list || 'popular'
    const apiKey = "47c4adc75b16f23db3cf78e4870a4296"

    useEffect(() => {fetchMovies()}, !props.getSearch ? [list] : [props.getSearch])

    const fetchMovies = async () => {
        let url

        url = `https://api.themoviedb.org/3/movie/${list}?api_key=${apiKey}`

        if(props.getSearch || query.get("search")){
            url = `https://api.themoviedb.org/3/search/movie?api_key=47c4adc75b16f23db3cf78e4870a4296&query=${props.getSearch || query.get("search")}`            
        }
        
        const response = await axios.get(url)
        setMovies(response.data.results.slice(0,12))
    }

    function getFavorites (favorites) {
        props.getValue(favorites)        
    }

    return(
        <div className="main-container black">
            {(movies.length !== 0) ? <Card cards={movies} getValue={getFavorites}/> : <h2 className="text-center">Sorry!!! There were no results for your search</h2>}  
        </div>
    )
}

export default Home