import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

function FavoriteButton (props) {
    console.log(props)
    const [heart, setHeart] = useState(false)

    function handleClick () {
        if(heart){
            setHeart(false)
            props.getValue(-props.id)
        }
        else{
            setHeart(true)
            props.getValue(props.id)
        }
    }

    return (
    <li>
        <button onClick={() => handleClick()} >
            {(heart) 
                ?
                 (<FontAwesomeIcon icon={faHeartSolid} color="white" />) 
                 : 
                 (<FontAwesomeIcon icon={faHeartRegular} color="white" />)
            }
    </button>
   </li>
    )
}

export default FavoriteButton
