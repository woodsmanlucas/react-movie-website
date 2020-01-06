import React, { useEffect, useState } from 'react'
import Moment from "moment"
import FavoriteButton from './FavoriteButton'
import './App.css'
import { array, object } from 'prop-types'
import Card from "./Card"

function Favorites (props){

    const [movies, setMovies] = useState([])

    useEffect(() => {
        createMoviesArray()
      }, [])

    function createMoviesArray(){
            props.movies.forEach(id => {
                getMovie(id)
            });

    }

    async function getMovie(id){
        const data = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=47c4adc75b16f23db3cf78e4870a4296&language=en-US`)
        try{
            data.json().then(function(value) {    
            setMovies(movies => [...movies, value])
            })
        }catch(e){
            console.log(e)
        }
      }

    function getFavorites(favorite){
        props.getValue(favorite)
    }

    return (
        <div className="main-container black">
            {(movies.length !== 0) ? <Card cards={movies} getValue={getFavorites}/> 
            : 
            <h2 className="text-center display-message">Sorry you have no favourited movies. Search for a movie to add to your favourites.</h2>} 
        </div>
    )
}

export default Favorites;