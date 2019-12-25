import React, { useEffect, useState } from 'react'
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
                setMovie(value); // <- your promise data exists here.
             })
            
        }


    return (
        <div className="wrapper"  style = {{backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
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
                </div>
             </div>
        </div>
    )
}