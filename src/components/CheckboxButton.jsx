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

function Checkbox(){

    const [checkbox, setCheckbox] = useState([])
    const [box, setBox] = useState({})
    const apiKey = "47c4adc75b16f23db3cf78e4870a4296"
    const [checked, setChedked] = useState(false)

    useEffect(() => {
        fetchGenres()
    }, [])

    const fetchGenres = async () =>{
        const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
        const response = await axios.get(url);
        setCheckbox(response.data.genres)
        console.log(response.data.genres)
    }

    const handleCheckbox = (event) => {
        setCheckbox( 
            checkbox.map(box =>{
                
                if(event.target.id == box.id){
                    event.target.checked = !event.target.checked
                    console.log(event.target.checked)
                }    
            })
        ) 
    }


    return(
        <div className="genres">
            {checkbox.map(box => (
                <p className="checkbox" key={box.id}><input id={box.id} type="checkbox" checked={checked} onChange={handleCheckbox}/> {box.name}</p>
            ))
            }
        </div>
    )
}


export default Checkbox