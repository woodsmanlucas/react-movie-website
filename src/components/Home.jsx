import React, { useState, useEffect } from "react"
import "./App.css"
import { Link } from "react-router-dom"
import Moment from "moment"

function Home(){
    
    useEffect(() => {
        fetchMovies()
    }, [])

    const [movies, setMovies] = useState([])

    const fetchMovies = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=47c4adc75b16f23db3cf78e4870a4296")
        const movies = await data.json()
        console.log(movies.results)
        setMovies(movies.results)
    }

    return(
        <div className="main-container">
            <div className="container">
                {movies.map(movie => (
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