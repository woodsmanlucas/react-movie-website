import React, { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"
import "../styles/bootstrap.min.css"
import Select from "react-select";
import Checkbox from "./CheckboxButton"
import Card from "./Card"

function Discover(props){

    
    const [yearOptions, setYearOptions] = useState([])
    const [sortByOptions, setSortByOptions] = useState([])
    const [year, setYear] = useState({})
    const [sortBy, setSortBy] = useState("")
    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])
    const [checked, setChecked] = useState("")
    const [loading, setLoading] = useState(true)
    const apiKey = "47c4adc75b16f23db3cf78e4870a4296"


    useEffect(() => {lenghtOfTheArray()}, [])
    useEffect(() => {sortByOptionsDisplay()}, [])
    useEffect(() => {handleSelect()}, [checked, year, sortBy])

    const handleSelect = async () =>{
        
        let query
        console.log(sortBy)
        try{
            if(sortBy.value != "rated"){
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
                    const response = await axios.get(url);
                    setMovies(response.data.results.slice(0,12))
                    setLoading(false)
                } 
            }else if (sortBy.value == "rated"){
                setMovies([])
                Object.keys(props.movies).forEach(function (id, stars) {getMovie(id)});
            }
        }catch(e){
            console.log(e)
        }
    }

    async function getMovie(id){
        const data = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=47c4adc75b16f23db3cf78e4870a4296&language=en-US`)
        data.json().then(function(value) {    
        setMovies(movies => [...movies, value])
        console.log(value)
          })
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
            },
            {
                label: "My Rated",
                id: 4,
                value: "rated"
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
                        <p className="label">Year</p>            
                        <Select onChange={handleSelectYear} options={yearOptions} />
                    </div>
                    <div className="sort-by">
                        <p className="label">Sort</p>            
                        <Select onChange={handleSortBy} options={sortByOptions} />
                    </div>
                </div> 
            </div>
            {loading ? (<h2 className="text-center">Please Select an Option</h2>)
                :
                (
                    (movies.length !== 0) ? <Card cards={movies} getValue={getFavorites}/> 
                    : 
                    (<h2 className="text-center">No results found</h2>)
                )
            }             
        </div>
    )
}

export default Discover