import React, { useState, useEffect } from "react"
import Moment from "moment"
import {useParams} from "react-router"
import axios from "axios"
import "./App.css"
import "../styles/bootstrap.min.css"

function Home(){

    const [movie, setMovie] = useState([])
    let {list} = useParams()
    const apiKey = "47c4adc75b16f23db3cf78e4870a4296"
    
    useEffect(() => {
        fetchMovies()
    }, [list])

    const fetchMovies = async () => {
        if (list == null){
            list = 'popular'
        }
        const url = `https://api.themoviedb.org/3/movie/${list}?api_key=${apiKey}`
        const response = await axios.get(url)
        setMovie(response.data.results.slice(0,12))
    }

    return(
        <div className="main-container black">
            <div className="container">
            <div className="d-lg-flex flex-wrap">
                {movie.map(movie => (

                    <div className="col" key = {movie.id}>
                        <div className="card mb-4 movie">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <div className="card-body">
                                <div className="date">
                                        <span>{Moment(movie.release_date).format('MMM d YYYY')}</span>
                                </div>
                                <ul className="menu-content">
                                     <li><a href="#" className="fa fa-heart-o"><span>{movie.vote_average}</span></a></li>
                                </ul>
                                </div>
                                <div className="card-text">
                                    <div className="content">
                                        <p className="text">{movie.overview}</p>
                                    </div>
                                </div>
                                <a href={`/movie/${movie.id}`} className="button">Read more</a>
                                </div>
                            </div>
                ))}
                                        </div>
            </div>
        </div>
    )
}

export default Home