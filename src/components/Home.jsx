import React, { useState, useEffect } from "react"
import "./App.css"
import { Link } from "react-router-dom"
import Moment from "moment"


function Home(){
    
    useEffect(() => {
        fetchMovies()
    }, [])

    const [moviesPerPage, setMoviesPerPage] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const [moviesEnd, setMoviesEnd] = useState(12)
    const [moviesStart, setMoviesStart] = useState(0)
    const [moviesArrayLength, setMoviesArrayLength] = useState(20)
    const [remain, setRemain] = useState()
    const [remainMovies, setRemainMovies] = useState()

    const fetchMovies = async () => {

        const data = await fetch(`https://api.themoviedb.org/3/movie/popular?page=${pageNumber}&api_key=47c4adc75b16f23db3cf78e4870a4296`)

        const movies = await data.json()

            setMoviesPerPage(movies.results.slice(moviesStart, moviesEnd))
    
    }

    const nextPage = async () => {

        const data = await fetch(`https://api.themoviedb.org/3/movie/popular?page=${pageNumber}&api_key=47c4adc75b16f23db3cf78e4870a4296`)

        const movies = await data.json()

        setPageNumber(pageNumber + 1)

        setRemain(moviesArrayLength - moviesEnd)        

        setRemainMovies(movies.results.slice(moviesEnd, moviesArrayLength))
        
        setMoviesEnd(moviesEnd - remain)

    }

    return(
        <div className="main-container">
            <div className="container">
                {moviesPerPage.map(movie => (
                    <div className="row" key = {movie.id}>
                        <div className="card">
                        <a href={`/movie/${movie.id}`} className="button">
                            <div className="wrapper" 
                                 style = {{backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                                           backgroundRepeat : "no-repeat",
                                           backgroundPosition: "center",
                                           backgroundSize : "cover"}}>
                                <div className="header">
                                    <div className="date">
                                        <span>{Moment(movie.release_date).format('MMM d YYYY')}</span>
                                    </div>
                                    <ul className="menu-content">
                                        <li><a href="#" className="fa fa-heart-o"><span>{movie.vote_average}</span></a></li>
                                    </ul>
                                </div>
                                <div className="data">
                                    <div className="content">
                                        <p className="text">{movie.overview}</p>
                                        <p>Read more</p>
                                    </div>
                                </div>
                            </div>
                            </a>
                        </div>
                    </div>
                ))}
                <Link to="/">
                <button className="next-page" onClick={()=>{nextPage()}}>Next {pageNumber}</button>
                </Link> 
            </div>                           
        </div>
    )
}

export default Home