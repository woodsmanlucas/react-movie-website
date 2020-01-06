import React, { useState, useEffect } from 'react'
import FavoriteButton from './FavoriteButton'
import RatingStars from './RatingStars'
import './App.css'
import '../styles/bootstrap.min.css'
import Moment from 'moment'

function Ratings(props) {
    const [movies, setMovies] = useState([])


    useEffect(() => {
        createMoviesArray()
      }, [props.movies])

    function createMoviesArray(){
            Object.keys(props.movies).forEach(function (id, stars) {getMovie(id)});
    }

    async function getMovie(id){
        const data = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=47c4adc75b16f23db3cf78e4870a4296&language=en-US`)
        console.log(id)
        data.json().then(function(value) {    
        setMovies(movies => [...movies, value])
          })
        console.log(movies)
      }

    function getFavorites(favorite){
        props.getValue(favorite)
    }

    function getStars (stars, id){
        props.getStars(stars, id)
    }

    return (
        <div className="main-container black">
        <div className="container">
        <div className="d-lg-flex flex-wrap justify-content-end">
            {(movies.length !== 0) ? 
                movies.map(movie => (
                    <div className="col ml-auto" key = {movie.id}>
                        <div className="card mb-4  movie">
            <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <div className="card-body">
                <div className="row date info">
                    <span className="col">{Moment(movie.release_date).format('MMM d YYYY')}</span>
                    <span className="col"><RatingStars id={movie.id} getStars={getStars} rating={props.movies[movie.id]} /></span>
                </div>
                <ul className="menu-content">
                    <FavoriteButton getValue={getFavorites} id={movie.id} />
                    <li><a href="#" className="fa fa-heart-o"><span>{movie.vote_average}</span></a></li>
                </ul>
            </div>
             <div className="card-text text-center">
                <div className="content">
                   <h3 className="text-center">{movie.title}</h3>
                    <p className="text">{movie.overview.substring(0, 120) + "..."}</p>
                    <a href={`/movie/${movie.id}`} className="badge badge-pill badge-info m-3">Read more</a>
                </div>
            </div>
        </div>
        </div>
                        ))                            
                        :
                            (<h2>Sorry you have no rated movies. Search for a movie to rate it.</h2>)
                        }
        </div>
        </div>
        </div>
    )
}

export default Ratings