import React, { useEffect, useState } from 'react'

export function Movie(props){
    useEffect(() => {
        const id = props.match.params.id
      }, [props])

      

    return (
        <h1>This is the movie with id {props.match.params.id}</h1>
    )
}