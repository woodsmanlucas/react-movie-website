import React, { useState, useEffect } from "react"
import Moment from "moment"
import {useParams} from "react-router"
import axios from "axios"
import "./App.css"
import "../styles/bootstrap.min.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';


function Home(){

    const [movie, setMovie] = useState([])
    const [heart, setHeart] = useState({})
    let {list} = useParams()
    const apiKey = "47c4adc75b16f23db3cf78e4870a4296"
    
    useEffect(() => {
        fetchMovies()
        mapHearts()
    }, [list])

    const fetchMovies = async () => {
        if (list == null){
            list = 'popular'
        }
        const url = `https://api.themoviedb.org/3/movie/${list}?api_key=${apiKey}`
        const response = await axios.get(url)
        setMovie(response.data.results.slice(0,12))
    }

    function mapHearts(){
        let HeartMapped = {}
        movie.map(movie => {
            HeartMapped[movie.id] = false
        })
        setHeart(HeartMapped)
    }

    function handleClick(id){
        console.log(id)
        console.log(heart)
        let heartTemp = heart
        if(heartTemp[id]){
            heartTemp[id] = false
        }
        else{
            heartTemp[id] = true
        }
        setHeart(heartTemp)
    }

    return(
        <div className="main-container black">
            <div className="container">
            <div className="d-lg-flex flex-wrap justify-content-end">
                {movie.map(movie => (

                    <div className="col ml-auto" key = {movie.id}>
                        <div className="card mb-4  movie">
                            { (movie.poster_path == null) ? (<img src="https://www.nyfa.edu/student-resources/wp-content/uploads/2015/03/Blank-Movie-Poster1.jpg" alt="generic image" />)
                            : (<img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />) }
                            <div className="card-body">
                                <div className="date">
                                        <span>{Moment(movie.release_date).format('MMM d YYYY')}</span>
                                </div>
                                <ul className="menu-content">
                                     <li><button onClick={() => handleClick(movie.id)} >
                                        {(heart[movie.id]) ? (<FontAwesomeIcon icon={faHeartSolid} color="white" />) : (<FontAwesomeIcon icon={faHeartRegular} color="white" />)}</button></li>
                                     <li><span>{movie.vote_average}</span></li>
                                </ul>
                                </div>
                                <div className="card-text">
                                    <div className="content">
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