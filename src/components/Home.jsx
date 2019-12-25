import React, { useState, useEffect } from "react"
import "./App.css"
import { Link } from "react-router-dom"
import Moment from "moment"
import {useParams} from "react-router"
import axios from "axios"

function Home(){

    const [movie, setMovie] = useState([])
    const {list} = useParams()
    const apiKey = "47c4adc75b16f23db3cf78e4870a4296"
    
    useEffect(() => {
        fetchMovies()
    }, [movie])

    const fetchMovies = async () => {
        const url = `https://api.themoviedb.org/3/movie/${list}?api_key=${apiKey}`
        const response = await axios.get(url)
        setMovie(response.data.results.slice(0,12))
    }

    return(
        <div className="main-container">
            <div className="container">
                {movie.map(movie => (
                    <div className="row" key = {movie.id}>
                        <div className="card">
                            <div className="wrapper" 
                                 style = {{backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                                           backgroundRepeat : "no-repeat",
                                           backgroundPosition: "center",
                                           backgroundSize : "cover"}}>
                                <div className="header">
                                    <div className="date">
                                        <span>{Moment(movie.release_date).format('MMM d YYYY')}</span>
                                    </div>
                                    <ul className="menu-content">
                                        <li><a href="#" className="fa fa-heart-o"><span>{movie.vote_average}</span></a></li>
                                    </ul>
                                </div>
                                <div className="data">
                                    <div className="content">
                                        <p className="text">{movie.overview}</p>
                                        <a href="#" className="button">Read more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home