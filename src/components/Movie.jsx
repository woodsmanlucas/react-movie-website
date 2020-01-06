import React, { useEffect, useState } from 'react'
import {useParams} from "react-router"
import '../styles/bootstrap.min.css'
import './App.css'
import Moment from 'moment'
import FavoriteButton from './FavoriteButton'
import RatingStars from './RatingStars'
import NumberFormat from 'react-number-format'

export function Movie(props){
    const [movie, setMovie] = useState({})
    let {id} = useParams()
    const rated = (JSON.parse(localStorage.getItem('StarObject')) || {})
    const [displayrating, setDisplayRating] = useState(rated[id] || false)

    useEffect(() => {
        async function getMovie(id){
            const data = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=47c4adc75b16f23db3cf78e4870a4296&language=en-US`)
            data.json().then(function(value) {
                setMovie(value); 
            })            
        };
        getMovie(id);
      }, [props])

    function getStars (stars, id){
        props.getStars(stars, id)
        if(id < 0){
            setDisplayRating(false)
        }
    }

    function getFavorites (favorites) {
        props.getValue(favorites)
    }

    function handleClick () {
        setDisplayRating(true)
    }


    return (
        <div className="container mt-4">
        <div className="row ml-auto mr-auto">
            <div className="col align-self-right">
        <div className="card"> 
            <img className="card-img-top movie" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <div className="card-body">
                <div className="row date info">
                    <span className="col">Release Date: {Moment(movie.release_date).format('MMM d YYYY')}</span>
                    <span className="col">Budget: <NumberFormat value={movie.budget} displayType={'text'} thousandSeparator={true} prefix={'$'} /></span>
                    <span className="col">{movie.tagline}</span>
                </div>
                <ul className="menu-content">
                    <FavoriteButton getValue={getFavorites} id={id} />
                    <li><a href="#" className="fa fa-heart-o"><span>{movie.vote_average}</span></a></li>
                </ul>
            </div>
            {displayrating && (
                <RatingStars id={id} getStars={getStars} rating={props.ratings[id]} />
            )}
            <div className="movie-text card-text">
                <div className="content">
                    <p className="text">{movie.overview}</p>
                </div>
             </div>
             <div className="text-center">
                {!displayrating && (
                <button className="rate-button badge badge-pill badge-info m-3" onClick={() => handleClick()}>Rate</button>
                )}
             </div>            
        </div>
        </div>
        </div>
        </div>
    )
}