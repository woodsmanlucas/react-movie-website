import React, { useState, useEffect } from "react"
import Moment from "moment"
import {useParams} from "react-router"
import axios from "axios"
import "./App.css"
import "../styles/bootstrap.min.css"
import FavoriteButton from './FavoriteButton'
import { tsPropertySignature } from "@babel/types"
import { useLocation } from "react-router-dom";
import SearchMovie from "./SearchMovie"
import Select from "react-select";
import Checkbox from "./CheckboxButton"

function Discover(props){

    const years = []
    const [yearOptions, setYearOptions] = useState([])
    const [year, setYear] = useState({})
    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])
    const [checked, setChecked] = useState("")
    const apiKey = "47c4adc75b16f23db3cf78e4870a4296"
    
    useEffect(() => {
        lenghtOfTheArray()
    }, [])

    useEffect(() => {handleSelect()}, [checked, year])

    const lenghtOfTheArray = async () => {
        let now = new Date()
        now = now.getFullYear()

        for (var i = 1920; i <= now; i++){
            years.push({
                label: i,
                id: i
            })
        }        
        setYearOptions(years)
    }

    const handleSelect = async () =>{
        if(checked != "" && Object.entries(year).length !== 0){
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_year=${year.id}&with_genres=${checked}`
            console.log(url)
            const response = await axios.get(url);
            setMovies(response.data.results.slice(0,12))
            console.log("I give up")
        } else if(checked != ""){
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${checked}`
            const response = await axios.get(url);
            setMovies(response.data.results.slice(0,12))
        } else if (Object.entries(year).length !== 0){
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_year=${year.id}`
            console.log(url)
            const response = await axios.get(url);
            setMovies(response.data.results.slice(0,12))
            console.log("it works...")
            console.log("               kind of")
        }
    }



    const handleSelectYear = async (selected) => {
        setYear(selected);
      }

    function getFavorites (favorites) {
        props.getValue(favorites)        
    }

    function getChecked (array){
        let tempChecked = []
        array.forEach((box, index) => {
            if(box){
                if(tempChecked == ""){
                    tempChecked = genres[index]
                }
                else{
                    tempChecked = tempChecked + "," + genres[index]
                }
            }
        })
        setChecked(tempChecked)
    }

    function getIds(Ids){
        setGenres(Ids)
    }

    return(
        <div className="main-container black">
            <div className="discover-menu">
                <div className="years">
                    <p className="years-label">Years</p>            
                    <Select onChange={handleSelectYear} options={yearOptions} />
                </div>
                <Checkbox getChecked={getChecked} getIds={getIds}/>
            </div>
            <div className="container">
                <div className="d-lg-flex flex-wrap justify-content-center">
                {(movies.length !== 0) ? 
                    movies.map(movie => (
                        <div className="col ml-auto" key = {movie.id}>
                            <div className="card mb-4 movie">
                                { (movie.poster_path == null) ? (<img src="https://www.nyfa.edu/student-resources/wp-content/uploads/2015/03/Blank-Movie-Poster1.jpg" alt="generic image" />)
                                : (<img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />) }
                                <div className="card-body">
                                    <div className="date">
                                            <span>{Moment(movie.release_date).format('MMM d YYYY')}</span>
                                    </div>
                                    <ul className="menu-content">
                                        <FavoriteButton getValue={getFavorites} id={movie.id} />
                                        <li><span>{movie.vote_average} / 10</span></li>
                                    </ul>
                                    </div>
                                    <div className="card-text">
                                        <div className="content">
                                            <h3 className="text-center">{movie.title}</h3>
                                            <p className="text">{movie.overview.substring(0, 120) + "..."}</p>
                                            <a href={`/movie/${movie.id}`} className="button mb-3">Read more</a>
                                        </div>
                                    </div>
                                </div>
                        </div> 
                    ))
                :
                    (<h2 className="text-center">Please Select an Option</h2>)
                }
                </div>
            </div>
        </div>
    )
}

export default Discover