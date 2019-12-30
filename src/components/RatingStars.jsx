import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarSolid} from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

function RatingStars (props) {
    
    const [stars, setStars] = useState(props.rating)
    const [starsArray, setStarsArray] = useState(getStarsArray(stars))

    useEffect(() => {    getStarsArray(stars)
        localStorage.setItem('stars'+props.id, stars)}, [stars])

    function handleClick () {
        let temp = stars
        if(temp >= 5){
            setStars(0)
            temp = 0
        }
        else{
            temp++
            setStars(temp)
        }
        setStarsArray(getStarsArray(temp))
        props.getStars(stars, props.id)
    }

    function getStarsArray(NumberOfStars){

        let tempStars = []
        while(NumberOfStars > 0){
            tempStars.push(true)
            NumberOfStars--
        }
        let temp = 5 - tempStars.length
        while(temp > 0){
            tempStars.push(false)
            temp--
        }
        return tempStars
    }

    return (
    <li>
        <button className="Rating" onClick={() => handleClick()} >
            {starsArray.map( (star) => {return (star) ? 
                 <FontAwesomeIcon icon={faStarSolid} color="black" />
                 :
                 <FontAwesomeIcon icon={faStarRegular} color="black" />
            })}
    </button>
   </li>
    )
}

export default RatingStars
