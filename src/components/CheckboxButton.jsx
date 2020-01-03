import React, { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"
import "../styles/bootstrap.min.css"


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
        props.getIds(response.data.genres.map((box) => (box.id)))
    }

    function setupChecked(list){
        let tempChecked = []
        list.forEach(() => tempChecked.push(false))
        setChecked(tempChecked)
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