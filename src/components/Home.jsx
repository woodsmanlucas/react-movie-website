import React, { useState, useEffect } from "react"
import Moment from "moment"
import {useParams} from "react-router"
import axios from "axios"
import "./App.css"
import "../styles/bootstrap.min.css"
import FavoriteButton from './FavoriteButton'
import { tsPropertySignature } from "@babel/types"
import SearchMovie from "./SearchMovie"

function Home(props){

    const [movies, setMovies] = useState([])
    const [query, setQuery] = useState("")
    const [search, setSearch] = useState("")
    let {list} = useParams()
    const apiKey = "47c4adc75b16f23db3cf78e4870a4296"
    
    useEffect(() => {fetchMovies()},
    [list])

    const fetchMovies = async () => {
        let url

        if (list == null){
            list = 'popular'
        }
        console.log(search)
        if(search === ""){
            url = `https://api.themoviedb.org/3/movie/${list}?api_key=${apiKey}`
        }else{
            list = 'search'
            url = `https://api.themoviedb.org/3/search/movie?api_key=47c4adc75b16f23db3cf78e4870a4296&query=${search}`
        }
        
        const response = await axios.get(url)
        setMovies(response.data.results.slice(0,12))
        console.log(response.data.results.slice(0,12))
    }

    function getFavorites (favorites) {
        props.getValue(favorites)
        // console.log(favorites)
    }

    return(
        <div className="main-container black">
            <input type="text" value = {query} onChange = {event => setQuery(event.target.value)}/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick = {() => setSearch(query)}>Search</button>
            <div className="container">
                <div className="d-lg-flex flex-wrap justify-content-end">
                    {movies.map(movie => (
                        <div className="col ml-auto" key = {movie.id}>
                            <div className="card mb-4 movie">
                                { (movie.poster_path == null) ? (<img src="https://www.nyfa.edu/student-resources/wp-content/uploads/2015/03/Blank-Movie-Poster1.jpg" alt="generic image" />)
                                : (<img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />) }
                                <div className="card-body">
                                    <div className="date">
                                            <span>{Moment(movie.release_date).format('MMM d YYYY')}</span>
                                    </div>
                                    <ul className="menu-content">
                                        <FavoriteButton getValue={getFavorites} id={movie.id} />
                                        <li><span>{movie.vote_average}</span></li>
                                    </ul>
                                    </div>
                                    <div className="card-text">
                                        <div className="content">
                                            <h3>{movie.title}</h3>
                                            <p className="text">{movie.overview.substring(0, 120) + "..."}</p>
                                            <a href={`/movie/${movie.id}`} className="button">Read more</a>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home