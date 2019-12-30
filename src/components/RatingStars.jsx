import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarSolid} from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

function RatingStars (props) {
    
    const [starsObject, setStarsObject] = useState(JSON.parse(localStorage.getItem('starsObject')) || {})
    const [star, setStar] = useState(getStar(starsObject, id))
    const [stars, setStars] = useState(getStarsArray(star))

    useEffect(() => {    getStarsArray(star)
        localStorage.setItem('stars'+props.id, star)}, [star])

    function handleClick () {
        let temp = star
        if(star >= 5){
            setStar(0)
            temp = 0
        }
        else{
            setStar((star + 1))
            temp++
        }
        setStars(getStarsArray(temp))
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
            {stars.map( (star) => {return (star) ? 
                 <FontAwesomeIcon icon={faStarSolid} color="black" />
                 :
                 <FontAwesomeIcon icon={faStarRegular} />
            })}
    </button>
   </li>
    )
}

export default RatingStars
