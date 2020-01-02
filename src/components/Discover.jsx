import React from "react"
import { Link } from "react-router-dom"


function Discover(){
    return(
        <div className="main-container">
            <div className="container">
                <div className="d-lg-flex flex-wrap">
                    <div className="col">
                        <div className="card mb-4" style={{backgroundColor: "#007bff"}}>
                            <Link to="/genres/Action" style={{color: "white"}}>
                                <h1 className="card-title">Action</h1>
                            </Link>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card mb-4" style={{backgroundColor: "#fd7e14"}}>
                            <Link to="/genres/Romance" style={{color: "white"}}>
                                <h1 className="card-title">Romance</h1>
                            </Link>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card mb-4">
                            <Link to="/genres/Comedy">
                                <h1 className="card-title">Comedy</h1>
                            </Link>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card mb-4">
                            <Link to="/genres/Drama">
                            <h1 className="card-title">Drama</h1>
                            </Link>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card mb-4">
                            <Link to="/genres/Documentary">
                                <h1 className="card-title">Documentary</h1>
                            </Link>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card mb-4">
                            <Link to="/genres/Thriller">
                                <h1 className="card-title">Thriller</h1>
                            </Link>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card mb-4">
                            <Link to="/genres/Horror">
                                <h1 className="card-title">Horror</h1>
                            </Link>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card mb-4">
                            <Link to="/genres/SciFi">
                                <h1 className="card-title">Science Fiction</h1>
                            </Link>
                        </div>
                    </div> 
                    <div className="col">
                        <div className="card">
                        <Link to="/genres/Adventure">
                            <h1 className="card-title">Adventure</h1>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Discover