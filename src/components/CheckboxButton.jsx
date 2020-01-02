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

function Checkbox(props){

    const [checkbox, setCheckbox] = useState([])
    const apiKey = "47c4adc75b16f23db3cf78e4870a4296"
    const [checked, setChecked] = useState([])

    useEffect(() => {
        fetchGenres()
    }, [])

    const fetchGenres = async () =>{
        const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
        const response = await axios.get(url);
        setCheckbox(response.data.genres)
        setupChecked(response.data.genres)
        props.getNames(response.data.genres.map((box) => (box.name)))
    }

    function setupChecked(list){
        let tempChecked = []
        list.forEach(() => tempChecked.push(false))
        setChecked(tempChecked)
        console.log(tempChecked)
    }

    const handleCheckbox = (event, index) => {
        let tempChecked = checked
        tempChecked[index] = event.target.checked
        setChecked(tempChecked)
        props.getChecked(checked)
    }


    return(
        <div className="genres">
            {checkbox.map((box, index) => (
                <p className="checkbox" key={box.id}><input id={box.id} type="checkbox" onChange={(e) => {handleCheckbox(e, index)}}/> {box.name}</p>
            ))
            }
        </div>
    )
}


export default Checkbox