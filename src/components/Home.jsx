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
    let {list} = useParams()
    list = list || 'popular'
    const apiKey = "47c4adc75b16f23db3cf78e4870a4296"
    
    useEffect(() => {fetchMovies()}, [list])

    const fetchMovies = async () => {
        
        console.log(list)
        let url
        url = `https://api.themoviedb.org/3/movie/${list}?api_key=${apiKey}`
        
        const response = await axios.get(url)
        setMovies(response.data.results.slice(0,12))
    }

    function getFavorites (favorites) {
        props.getValue(favorites)        
    }

    return(
        <div className="main-container black">
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
                                            <h3 className="text-center">{movie.title}</h3>
                                            <p className="text">{movie.overview.substring(0, 120) + "..."}</p>
                                            <a href={`/movie/${movie.id}`} className="button mb-3">Read more</a>
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