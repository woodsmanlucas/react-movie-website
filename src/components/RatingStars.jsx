import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarSolid} from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

function RatingStars (props) {
    
    const [stars, setStars] = useState(props.rating || 0)
    const [starsArray, setStarsArray] = useState(getStarsArray(stars))

    useEffect(() => {    getStarsArray(stars)
        props.getStars(stars, props.id)}, [stars])

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

    function unrate(){
        props.getStars(stars, -props.id)
        getStarsArray(0)
    }

    return (
    <div>
        <button className="Rating" onClick={() => handleClick()} >
            {starsArray.map( (star, index) => {return (star) ? 
                 <FontAwesomeIcon key={index} icon={faStarSolid} color="black" />
                 :
                 <FontAwesomeIcon key={index} icon={faStarRegular} color="black" />
            })}
        </button>
        <button className="Rating" onClick={unrate}>Unrate</button>
   </div>
    )
}

export default RatingStars
