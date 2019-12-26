import React, { useEffect, useState } from 'react'
import '../styles/bootstrap.min.css'
import './App.css'
import Moment from 'moment'

export function Movie(props){
    const [movie, setMovie] = useState({})

    useEffect(() => {
        const id = props.match.params.id
        getMovie(id)
      }, [props])

      async function getMovie(id){
          const data = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=47c4adc75b16f23db3cf78e4870a4296&language=en-US`)
          data.json().then(function(value) {
                setMovie(value); 
                console.log(value)
            })
            
        }


    return (
        <div className="container">
        <div className="row">
            <div className="col align-self-center">
        <div className="card"> 
            <img class="card-img-top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <div className="card-body">
                <div className="row date info">
                    <span class="col">Release Date: {Moment(movie.release_date).format('MMM d YYYY')}</span>
                    <span class="col">Budget: {movie.budget}</span>
                    <span class="col">{movie.tagline}</span>
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
        </div>
        </div>
        </div>
        </div>
    )
}