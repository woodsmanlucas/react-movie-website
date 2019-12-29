import React, { useEffect, useState } from 'react'
import Moment from "moment"
import FavoriteButton from './FavoriteButton'
import './App.css'
import { array, object } from 'prop-types'

function Favorites (props){
    const [movies, setMovies] = useState([])


    useEffect(() => {
        createMoviesArray()
      }, [props])

    function createMoviesArray(){
        console.log(typeof props.movies)
        console.log(props.movies)
            props.movies.forEach(id => {
                getMovie(id)
                console.log(id)
            });

    }

    async function getMovie(id){
        const data = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=47c4adc75b16f23db3cf78e4870a4296&language=en-US`)
        data.json().then(function(value) {     
        setMovies(movies => [...movies, value])
          })
      }

    function getFavorites(favorite){
        props.getValue(favorite)
    }


    return (
        <div className="main-container black">
        <div className="container">
        <div className="d-lg-flex flex-wrap justify-content-end">
            {(movies != []) ?
            movies.map(movie => (
                <div className="col ml-auto" key = {movie.id}>
                    <div className="card mb-4  movie">
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
                                    <p className="text">{(movie.overview != undefined) && movie.overview.substring(0, 120) + "..."}</p>
                                    <a href={`/movie/${movie.id}`} className="button">Read more</a>
                                </div>
                            </div>
                            </div>
                        </div>
                    ))
                :
                (<h2>Sorry you have no favourited movies. Search for a movie to add to your favourites.</h2>)
            }
                </div>
        </div>
    </div>
    )
}

export default Favorites;