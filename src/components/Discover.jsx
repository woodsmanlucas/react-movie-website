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

    
    const [yearOptions, setYearOptions] = useState([])
    const [sortByOptions, setSortByOptions] = useState([])
    const [year, setYear] = useState({})
    const [sortBy, setSortBy] = useState("")
    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])
    const [checked, setChecked] = useState("")
    const apiKey = "47c4adc75b16f23db3cf78e4870a4296"


    useEffect(() => {lenghtOfTheArray()}, [])
    useEffect(() => {sortByOptionsDisplay()}, [])
    useEffect(() => {handleSelect()}, [checked, year, sortBy])

    const handleSelect = async () =>{
        
        let query

        if(checked != "" || Object.entries(year).length !== 0 || sortBy != ""){

            if(checked != "" && Object.entries(year).length !== 0 && sortBy != ""){

                query = `&primary_release_year=${year.id}&with_genres=${checked}&sort_by=${sortBy.value}`

            } else if(checked != "" && Object.entries(year).length !== 0){

                query = `&primary_release_year=${year.id}&with_genres=${checked}`

            }else if(checked != "" && sortBy != ""){

                query = `&with_genres=${checked}&sort_by=${sortBy.value}`

            }else if(Object.entries(year).length !== 0 && sortBy != ""){

                query = `&primary_release_year=${year.id}&sort_by=${sortBy.value}`

            }else if(checked != ""){

                query = `&with_genres=${checked}`

            }else if(Object.entries(year).length !== 0){

                query = `&primary_release_year=${year.id}`

            }else if (sortBy != ""){

                query = `&sort_by=${sortBy.value}`

            }

            const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey + query}`
            console.log(url)
            const response = await axios.get(url);
            setMovies(response.data.results.slice(0,12))
        }
    }


    const handleSelectYear = async (selected) => {
        setYear(selected);
    }

    const handleSortBy = async (selected) => {
        setSortBy(selected);
    }

    const sortByOptionsDisplay = async () =>{
        const sortByDisplay = []

        sortByDisplay.push(
            {
                label: "Release date ascending",
                id: 0,
                value: "release_date.asc"
            },
            {
                label: "Release date descending",
                id: 1,
                value: "release_date.desc"
            },
            {
                label: "Title (A-Z)",
                id: 2,
                value: "original_title.asc"
            },
            {
                label: "Title (Z-A)",
                id: 3,
                value: "original_title.desc"
            }
        )
        setSortByOptions(sortByDisplay)
    }

    const lenghtOfTheArray = async () => {
        const years = []
        let now = new Date()
        now = now.getFullYear()

        years.push({
            label: "None",
            id: ""
        })

        for (var i = now; i >= 1920; i--){
            years.push({
                label: i,
                id: i
            })
        }        
        setYearOptions(years)
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
            <div className="discover-main-menu">
                    <Checkbox getChecked={getChecked} getIds={getIds}/> 
                <div className="discover-menu">
                    <div className="years">
                        <p className="years-label">Year</p>            
                        <Select onChange={handleSelectYear} options={yearOptions} />
                    </div>
                    <div className="sort-by">
                        <p className="date-label">Sort</p>            
                        <Select onChange={handleSortBy} options={sortByOptions} />
                    </div>
                </div> 
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