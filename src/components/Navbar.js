import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar(props){
    let location = useLocation();
    let navigate = useNavigate();
    let state;
    let [btns,setBtns] = useState(null)

    useEffect(()=>{
        state = localStorage.getItem('token');
        if (state==null){
            setBtns(<><Link name="" id="" className="btn btn-primary me-2" to="/login" role="button" >Login</Link>
            <Link name="" id="" className="btn btn-primary" to="/signup" role="button" >Signup</Link></>);
        }
        else {
            setBtns(<Link name="" id="" className="btn btn-primary btn-sm me-2" to="/logout" role="button" >Logout</Link>)
            if ((location.pathname==='/login')||(location.pathname==='/signup')) navigate('/');
        }
    },[location])
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary border">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">{props.title}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link className={`nav-link${(location.pathname==='/home')?' active':''}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                        <Link className={`nav-link${(location.pathname==='/about')?' active':''}`} to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                        <Link className={`nav-link${(location.pathname==='/notes')?' active':''}`} to="/notes">Notes</Link>
                        </li>
                        {!state && 
                            <div className="nav-item">
                                <Link className={`nav-link${(location.pathname==='/profile')?' active':''}`} to="/profile">Profile</Link>
                            </div> 
                        }
                    </ul>
                    {btns}
                </div>
            </div>
        </nav>
    )
}
export default Navbar;
